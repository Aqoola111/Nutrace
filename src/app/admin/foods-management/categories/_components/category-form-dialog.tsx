'use client'
import {SubmitHandler, useForm} from "react-hook-form";
import {
	categoryDefaultValues,
	createCategorySchema,
	CreateCategorySchema
} from "@/app/admin/foods-management/categories/_types/categorySchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCategoriesStore} from "@/app/admin/foods-management/categories/_libs/use-category-store";
import {useCategoryById} from "@/app/admin/foods-management/categories/_services/use-category-queries";
import {
	useCreateCategory,
	useUpdateCategory
} from "@/app/admin/foods-management/categories/_services/use-category-mutations";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useEffect} from "react";


interface CategoryFormDialogProps {
	smallTrigger?: boolean
	
}

export const CategoryFormDialog = ({smallTrigger}: CategoryFormDialogProps) => {
	const {
		selectedCategoryId,
		updateCategoryDialogOpen,
		categoryDialogOpen,
		updateSelectedCategoryId
	} = useCategoriesStore()
	
	const form = useForm<CreateCategorySchema>({
		defaultValues: categoryDefaultValues,
		resolver: zodResolver(createCategorySchema)
	})
	
	const categoryQuery = useCategoryById();
	const createCategoryMutation = useCreateCategory()
	const updateCategoryMutation = useUpdateCategory()
	
	const isPending = createCategoryMutation.isPending || updateCategoryMutation.isPending
	
	const handleDialogOpenChange = (open: boolean) => {
		updateCategoryDialogOpen(open)
		
		if (!open) {
			updateSelectedCategoryId(null)
			form.reset(categoryDefaultValues)
		}
	}
	
	const handleSuccess = () => handleDialogOpenChange(false)
	
	useEffect(() => {
		if (!!selectedCategoryId && categoryQuery.data) {
			form.reset(categoryQuery.data);
		}
	}, [categoryQuery.data, form, selectedCategoryId]);
	
	const onSubmit: SubmitHandler<CreateCategorySchema> = (data) => {
		if (data.action === 'create') {
			createCategoryMutation.mutate(data, {
				onSuccess: handleSuccess,
			})
		} else {
			updateCategoryMutation.mutate(data, {onSuccess: handleSuccess})
		}
	}
	
	return (
		<Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
			<DialogTrigger asChild>
				{smallTrigger ? (
					<Button size={"icon"} variant={'ghost'} type={'button'}>
						<Plus/>
					</Button>
				) : (
					<Button size={"lg"} variant={'ghost'} type={'button'}>
						<Plus className='mr-2'/>
						New Category
					</Button>
				)
				}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{selectedCategoryId ? "Edit Category" : "Create Category"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form} >
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<FormField
							control={form.control}
							name="name"
							render={({field}) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Category Name" {...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type={'submit'} disabled={isPending}>
								{!!selectedCategoryId ? "Edit" : "Create"} Category
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
};