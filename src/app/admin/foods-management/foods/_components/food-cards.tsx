'use client'
import FoodFormDialog from "@/app/admin/foods-management/foods/_components/food-form-dialog";
import {useFoodsStore} from "@/app/admin/foods-management/foods/_libs/use-food-store";
import {useDeleteFood} from "@/app/admin/foods-management/foods/_services/use-food-mutations";
import {useFoods} from "@/app/admin/foods-management/foods/_services/use-food-queries";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Pagination} from "@/components/ui/pagination";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import {alert} from "@/lib/use-global-store";
import {Edit, Trash} from "lucide-react";


const FoodCards = () => {
	const {
		updateSelectedFoodId,
		updateFoodDialogOpen,
		selectedFoodId,
		foodFilters,
		updateFoodFiltersPage,
	} = useFoodsStore();
	
	const foodsQuery = useFoods();
	
	const deleteFoodMutation = useDeleteFood();
	
	const totalPages = foodsQuery.data?.totalPages;
	
	if (foodsQuery.error) {
		return (
			<div className='text-red-500 text-center'>
				<p>Error loading Foods : {foodsQuery.error.message}</p>
			</div>
		)
	}
	
	if (totalPages === 0) {
		return (
			<div className='text-center flex-1 flex flex-col gap-2 w-full items-center justify-start text-gray-500'>
				<p className='text-3xl font-semibold'>No Foods found</p>
				<FoodFormDialog/>
			</div>
		);
	}
	
	if (foodsQuery.isLoading) {
		return (
			<div className='flex flex-wrap mx-auto items-center gap-4'>
				{[...Array(6)].map((_, idx) => (
					<Skeleton key={idx} className='w-full md:w-[300px] h-[120px]'/>
				))}
			</div>
		)
	}
	return (
		<div className='flex flex-col h-full justify-between pb-10'>
			<div className='flex flex-wrap mx-auto md:mx-0 p-4 gap-4 '>
				{
					foodsQuery.data?.data.map((food) => (
						<Card key={food.id} className='w-full h-fit rounded-sm md:w-[400px]'>
							<CardHeader>
								<CardTitle className='flex items-center justify-between'>
									<h1>
										{food.name}
									</h1>
									<div>
										
										<Button
											className="size-6"
											variant="ghost"
											size="icon"
											onClick={() => {
												updateSelectedFoodId(food.id);
												updateFoodDialogOpen(true);
											}}
										>
											<Edit/>
										</Button>
										<Button
											className="size-6"
											variant="ghost"
											size="icon"
											onClick={() => {
												alert({
													onConfirm: () => deleteFoodMutation.mutate(food.id),
												});
											}}
										>
											<Trash/>
										</Button>
									</div>
								</CardTitle>
								<CardDescription className='py-2'>
									<Separator/>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 gap-y-2'>
									<div className='flex flex-col gap-2'>
										<h1 className='text-sm font-bold'>Calories</h1>
										<p className='text-xs font-semibold text-muted-foreground'>{food.calories}</p>
									</div>
									
									<div className='flex flex-col gap-2'>
										<h1 className='text-sm font-bold'>Protein</h1>
										<p className='text-xs font-semibold text-muted-foreground'>{food.protein}</p>
									</div>
									
									<div className='flex flex-col gap-2'>
										<h1 className='text-sm font-bold'>Carbohydrates</h1>
										<p className='text-xs font-semibold text-muted-foreground'>{food.carbohydrates}</p>
									</div>
									
									<div className='flex flex-col gap-2'>
										<h1 className='text-sm font-bold'>Sugar</h1>
										<p className='text-xs font-semibold text-muted-foreground'>{food.sugar}</p>
									</div>
									
									
									<div className='flex flex-col gap-2'>
										<h1 className='text-sm font-bold'>Fat</h1>
										<p className='text-xs font-semibold text-muted-foreground'>{food.fat}</p>
									</div>
									
									<div className='flex flex-col gap-2'>
										<h1 className='text-sm font-bold'>Fiber</h1>
										<p className='text-xs font-semibold text-muted-foreground'>{food.fiber}</p>
									</div>
								
								
								</div>
							</CardContent>
						</Card>
					))
				}
			</div>
			<Pagination
				className='fixed bottom-0 left-0 w-full  p-4 z-50'
				currentPage={foodFilters.page}
				totalPages={totalPages}
				updatePage={updateFoodFiltersPage}
			/>
		</div>
	)
}

export default FoodCards
