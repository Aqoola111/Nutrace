'use client'

import {CategoryFormDialog} from "@/app/admin/foods-management/categories/_components/category-form-dialog";
import {useCategoriesStore} from "@/app/admin/foods-management/categories/_libs/use-category-store";
import {useCategories} from "@/app/admin/foods-management/categories/_services/use-category-queries";
import SpecifyFoodServingUnits from "@/app/admin/foods-management/foods/_components/specify-food-serving-units";
import {useFoodsStore} from "@/app/admin/foods-management/foods/_libs/use-food-store";
import {useCreateFood, useUpdateFood} from "@/app/admin/foods-management/foods/_services/use-food-mutations";
import {useFood} from "@/app/admin/foods-management/foods/_services/use-food-queries";
import {foodDefaultValues, FoodSchema, foodSchema} from "@/app/admin/foods-management/foods/_types/foodSchema";
import {useServingUnitsStore} from "@/app/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toStringSafe} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {Plus} from "lucide-react";
import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";

const FoodFormDialog = () => {
	
	const form = useForm<FoodSchema>({
		defaultValues: foodDefaultValues,
		resolver: zodResolver(foodSchema),
	});
	
	const foodQuery = useFood()
	const categoriesQuery = useCategories()
	
	const createFoodMutation = useCreateFood()
	const updateFoodMutation = useUpdateFood()
	
	const isPending = createFoodMutation.isPending || updateFoodMutation.isPending
	
	const {selectedFoodId, updateFoodDialogOpen, updateSelectedFoodId, foodDialogOpen} = useFoodsStore()
	
	const {categoryDialogOpen} = useCategoriesStore()
	const {servingUnitDialogOpen} = useServingUnitsStore()
	
	useEffect(() => {
		if (!!selectedFoodId && foodQuery.data) {
			form.reset(foodQuery.data);
		}
	}, [foodQuery.data, selectedFoodId, form]);
	
	const handleDialogOpenChange = (open: boolean) => {
		updateFoodDialogOpen(open)
		
		if (!open) {
			updateSelectedFoodId(null)
			form.reset(foodDefaultValues)
			form.clearErrors();
		}
	}
	
	
	const handleSuccess = () => {
		handleDialogOpenChange(false)
		if (selectedFoodId) {
			toast.success('Food updated successfully')
		} else {
			toast.success('Food created successfully')
		}
		
	}
	
	const disableSubmit = isPending || categoryDialogOpen || servingUnitDialogOpen;
	
	const onSubmit: SubmitHandler<FoodSchema> = (data) => {
		if (data.action === 'create') {
			createFoodMutation.mutate(data, {
				onSuccess: handleSuccess
			})
		} else {
			updateFoodMutation.mutate(data, {
				onSuccess: handleSuccess
			})
		}
	}
	
	return (
		<Dialog open={foodDialogOpen} onOpenChange={handleDialogOpenChange}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2"/>
					New Food
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{selectedFoodId ? "Update Food" : "Create Food"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={disableSubmit ? undefined : form.handleSubmit(onSubmit)}
						  className='grid grid-cols-2 gap-4'>
						
						<FormField
							control={form.control}
							name={'name'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Food Name
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Apple'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						
						<div className='flex items-center gap-2'>
							<FormField control={form.control} name='categoryId' render={({field}) => (
								<FormItem>
									<FormLabel>
										Category
									</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select category"/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{
												categoriesQuery.data?.map(category => (
													<SelectItem key={category.id} value={toStringSafe(category.id)}>
														{category.name}
													</SelectItem>
												))
											}
										</SelectContent>
									</Select>
								</FormItem>
							)}/>
							<div className='mt-5'>
								<CategoryFormDialog smallTrigger={true}/>
							</div>
						</div>
						
						
						<FormField
							control={form.control}
							name={'calories'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Calories
									</FormLabel>
									<FormControl>
										<Input
											placeholder='kcal'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'protein'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Protein
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Grams'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						
						
						<FormField
							control={form.control}
							name={'carbohydrates'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Carbohydrates
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Grams'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'sugar'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Sugar
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Grams'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name={'fiber'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Fat
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Grams'
											{...field}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'fat'}
							render={({field}) => (
								<FormItem>
									<FormLabel>
										Fat
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Grams'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className='col-span-2'>
							<SpecifyFoodServingUnits/>
						</div>
						<DialogFooter className='col-span-2 flex items-center !justify-between'>
							<Button
								type='submit'
								disabled={disableSubmit}
								className='w-1/2'
							>
								{selectedFoodId ? "Update Food" : "Create Food"}
							</Button>
							<Button
								variant='secondary'
								onClick={() => handleDialogOpenChange(false)}
								disabled={disableSubmit}
								className='w-1/2'
							>
								Close
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
export default FoodFormDialog
