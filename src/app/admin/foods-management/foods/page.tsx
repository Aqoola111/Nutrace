import FoodCards from "@/app/admin/foods-management/foods/_components/food-cards";
import FoodFilterDrawer from "@/app/admin/foods-management/foods/_components/food-filter-drawer";
import FoodFormDialog from "@/app/admin/foods-management/foods/_components/food-form-dialog";

const Page = () => {
	return (
		<div className='space-y-5 p-4 flex flex-col h-full'>
			<div className='flex items-center justify-between w-full'>
				<FoodFormDialog/>
				<div className='flex gap-2 items-center'>
					<FoodFilterDrawer/>
				</div>
			</div>
			<div className='flex-1'>
				<FoodCards/>
			</div>
		</div>
	)
}
export default Page
