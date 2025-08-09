'use client'
import {useCategories} from "@/app/admin/foods-management/categories/_services/use-category-queries";
import {useDeleteCategoryMutation} from "@/app/admin/foods-management/categories/_services/use-category-mutations";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Edit, Loader, Trash2Icon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";


export const CategoryCards = () => {
	const categories = useCategories()
	const deleteCategoryMutation = useDeleteCategoryMutation()
	
	if (categories.isLoading) {
		return (
			<div className='flex flex-wrap mx-auto items-center gap-4'>
				{[...Array(4)].map((_, idx) => (
					<Skeleton key={idx} className='w-full md:w-[300px] h-[120px]'/>
				))}
			</div>
		);
	}
	
	return (
		<div className='flex flex-wrap mx-auto  items-center gap-4'>
			{categories.data?.map((category) => (
				<Card key={category.id} className='w-full md:w-[300px]'>
					<CardHeader>
						<CardTitle>
							{category.name}
						</CardTitle>
					</CardHeader>
					<CardFooter className='flex items-center justify-between'>
						<Button variant='default'>
							Edit
							<Edit/>
						</Button>
						<Button variant='destructive'
								disabled={deleteCategoryMutation.isPending}
								onClick={() => {
									deleteCategoryMutation.mutate(category.id)
								}}>
							{deleteCategoryMutation.isPending ? 'Deleting...' : 'Delete'}
							{deleteCategoryMutation.isPending ? <Loader className='animate-spin'/> : <Trash2Icon/>}
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	)
};