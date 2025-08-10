import {ServingUnitFormDialog} from "@/app/admin/foods-management/serving-units/_components/serving-unit-form-dialog";
import {ServingUnitCards} from "@/app/admin/foods-management/serving-units/_components/serving-unit-cards";

const Page = () => {
	return (
		<div className='space-y-5 p-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>
					Serving Units Management
				</h1>
				<ServingUnitFormDialog/>
			</div>
			<ServingUnitCards/>
		</div>
	);
};

export default Page;
