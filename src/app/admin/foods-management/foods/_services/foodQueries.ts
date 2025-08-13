'use server'

import {foodFiltersSchema, FoodFiltersSchema} from "@/app/admin/foods-management/foods/_types/foodFilterSchema";
import {FoodSchema} from "@/app/admin/foods-management/foods/_types/foodSchema";
import {Prisma} from "@/generated/prisma";
import prisma from "@/lib/db";
import {PaginatedResult} from "@/lib/types/paginatedResult";
import {toStringSafe} from "@/lib/utils";

type FoodWithServingUnit = Prisma.FoodGetPayload<{
	include: { foodServingUnits: true }
}>

const getFoods = async (filters: FoodFiltersSchema): Promise<PaginatedResult<FoodWithServingUnit>> => {
	const {
		searchTerm,
		sortBy = 'name',
		proteinRange,
		caloriesRange,
		sortOrder,
		page,
		pageSize,
		categoryId
	} = foodFiltersSchema.parse(filters);
	
	const [minCalories, maxCalories] = caloriesRange.map(v => v === '' ? undefined : Number(v));
	const [minProtein, maxProtein] = proteinRange.map(v => v === '' ? undefined : Number(v));
	
	const numericCategoryId = categoryId ? Number(categoryId) : undefined;
	
	const where: Prisma.FoodWhereInput = {
		...(searchTerm && {name: {contains: searchTerm}}),
		...(minCalories !== undefined || maxCalories !== undefined
			? {calories: {...(minCalories !== undefined && {gte: minCalories}), ...(maxCalories !== undefined && {lte: maxCalories})}}
			: {}),
		...(minProtein !== undefined || maxProtein !== undefined
			? {protein: {...(minProtein !== undefined && {gte: minProtein}), ...(maxProtein !== undefined && {lte: maxProtein})}}
			: {}),
		...(numericCategoryId ? {category: {id: numericCategoryId}} : {})
	};
	
	const skip = (page - 1) * pageSize;
	
	const [total, data] = await Promise.all([
		prisma.food.count({where}),
		prisma.food.findMany({
			where,
			orderBy: {[sortBy]: sortOrder},
			skip,
			take: pageSize,
			include: {foodServingUnits: true}
		})
	]);
	
	return {
		data,
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize)
	};
};

const getFood = async (id: string): Promise<FoodSchema | null> => {
	const res = await prisma.food.findFirst({
		where: {id},
		include: {foodServingUnits: true}
	});
	
	if (!res) return null;
	
	return {
		action: "update" as const,
		id: Number(res.id),
		name: toStringSafe(res.name),
		calories: toStringSafe(res.calories),
		carbohydrates: toStringSafe(res.carbohydrates),
		fat: toStringSafe(res.fat),
		fiber: toStringSafe(res.fiber),
		protein: toStringSafe(res.protein),
		sugar: toStringSafe(res.sugar),
		categoryId: toStringSafe(res.categoryId),
		foodServingUnits: res.foodServingUnits.map(item => ({
			foodServingUnitId: toStringSafe(item.servingUnitId),
			grams: toStringSafe(item.grams),
		}))
	};
};

export {getFood, getFoods};
