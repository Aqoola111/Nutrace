"use server";

import {ServingUnitSchema} from "@/app/admin/foods-management/serving-units/_types/schema";
import {executeAction} from "@/lib/execute-action";
import prisma from "@/lib/lib";

const createServingUnit = async (data: ServingUnitSchema) => {
	await executeAction({
		actionFn: () =>
			prisma.servingUnit.create({
				data: {
					name: data.name,
				},
			}),
	});
};

const updateServingUnit = async (data: ServingUnitSchema) => {
	if (data.action === "update") {
		await executeAction({
			actionFn: () =>
				prisma.servingUnit.update({
					where: {id: data.id},
					data: {
						name: data.name,
					},
				}),
		});
	}
};

const deleteServingUnit = async (id: string) => {
	await executeAction({
		actionFn: () => prisma.servingUnit.delete({where: {id}}),
	});
};

const getServingUnits = async () => {
	return await prisma.servingUnit.findMany({orderBy: {id: 'asc'}});
};

const getServingUnit = async (id: string): Promise<ServingUnitSchema> => {
	const res = await prisma.servingUnit.findFirst({
		where: {id},
	});
	
	return {
		...res,
		action: "update",
		name: res?.name ?? "",
		id,
	};
};

export {
	createServingUnit,
	getServingUnit,
	getServingUnits,
	deleteServingUnit,
	updateServingUnit,
};