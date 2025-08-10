'use client'
import {useCategories} from "@/app/admin/foods-management/categories/_services/use-category-queries";
import {useDeleteCategoryMutation} from "@/app/admin/foods-management/categories/_services/use-category-mutations";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Edit, Loader, Trash2Icon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {alert} from "@/lib/use-global-store";


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
						<CardTitle className='flex justify-between items-center font-bold text-2xl'>
							{category.name}
							<div className='flex gap-2 items-center'>
								<Button variant='default' size='icon'>
									<Edit/>
								</Button>
								<Button size='icon' variant='secondary'
										disabled={deleteCategoryMutation.isPending}
										onClick={() => {
											alert({
												onConfirm: () => deleteCategoryMutation.mutate(category.id),
												title: 'Delete Category',
												description: `Are you sure you want to delete the category`,
												confirmLabel: 'Delete',
												cancelLabel: 'Cancel',
											})
										}}>
									{deleteCategoryMutation.isPending ? <Loader className='animate-spin'/> :
										<Trash2Icon/>}
								</Button>
							</div>
						</CardTitle>
					</CardHeader>
				</Card>
			))}
		</div>
	)
};