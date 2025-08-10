import {CategoryCards} from "@/app/admin/foods-management/categories/_components/category-cards";
import {CategoryFormDialog} from "@/app/admin/foods-management/categories/_components/category-form-dialog";

const Page = () => {
	return (
		<div className='space-y-5 p-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>
					Categories Management
				</h1>
				<CategoryFormDialog/>
			</div>
			<CategoryCards/>
		</div>
	)
}
export default Page
