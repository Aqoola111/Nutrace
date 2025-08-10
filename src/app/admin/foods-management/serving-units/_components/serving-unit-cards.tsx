"use client";

import {useServingUnitsStore} from "@/app/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import {useDeleteServingUnit} from "@/app/admin/foods-management/serving-units/_services/useMutations";
import {useServingUnits} from "@/app/admin/foods-management/serving-units/_services/useQueries";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {alert} from "@/lib/use-global-store";
import {Edit, Loader, Trash} from "lucide-react";
import {ServingUnitFormDialog} from "@/app/admin/foods-management/serving-units/_components/serving-unit-form-dialog";
import {Skeleton} from "@/components/ui/skeleton";

export const ServingUnitCards = () => {
	const servingUnitsQuery = useServingUnits();
	const deleteServingUnitMutation = useDeleteServingUnit();
	const {updateSelectedServingUnitId, updateServingUnitDialogOpen} = useServingUnitsStore();
	
	if (servingUnitsQuery.isLoading) {
		return (
			<div className='flex flex-wrap mx-auto items-center gap-4'>
				{[...Array(4)].map((_, idx) => (
					<Skeleton key={idx} className='w-full md:w-[300px] h-[120px]'/>
				))}
			</div>
		);
	}
	
	if (servingUnitsQuery.error) {
		return (
			<div className='text-red-500 text-center'>
				<p>Error loading serving units: {servingUnitsQuery.error.message}</p>
			</div>
		);
	}
	
	if (!servingUnitsQuery.data || servingUnitsQuery.data.length === 0) {
		return (
			<div className='text-center flex-1 flex flex-col gap-2 w-full items-center justify-start text-gray-500'>
				<p className='text-3xl font-semibold'>No Serving Units found</p>
				<ServingUnitFormDialog/>
			</div>
		);
	}
	
	return (
		<div className='flex flex-1 flex-wrap mx-auto items-center gap-4'>
			{servingUnitsQuery.data.map((unit) => (
				<Card key={unit.id} className='w-full md:w-[300px]'>
					<CardHeader>
						<CardTitle className='flex justify-between items-center font-bold text-2xl'>
							{unit.name}
							<div className='flex gap-2 items-center'>
								<Button
									variant='default'
									size='icon'
									onClick={() => {
										updateSelectedServingUnitId(unit.id);
										updateServingUnitDialogOpen(true);
									}}
								>
									<Edit/>
								</Button>
								<Button
									size='icon'
									variant='secondary'
									disabled={deleteServingUnitMutation.isPending}
									onClick={() => {
										alert({
											onConfirm: () => deleteServingUnitMutation.mutate(unit.id),
											title: 'Delete Serving Unit',
											description: `Are you sure you want to delete this serving unit?`,
											confirmLabel: 'Delete',
											cancelLabel: 'Cancel',
										});
									}}
								>
									{deleteServingUnitMutation.variables === unit.id && deleteServingUnitMutation.isPending
										? <Loader className='animate-spin'/>
										: <Trash/>}
								</Button>
							</div>
						</CardTitle>
					</CardHeader>
				</Card>
			))}
		</div>
	);
};
