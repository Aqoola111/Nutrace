import {foodFiltersSchema, FoodFiltersSchema} from "@/app/admin/foods-management/foods/_types/foodFilterSchema";
import {FoodSchema} from "@/app/admin/foods-management/foods/_types/foodSchema";
import {Prisma} from "@/generated/prisma";
import prisma from "@/lib/db";
import {PaginatedResult} from "@/lib/types/paginatedResult";
import {toStringSafe} from "@/lib/utils";

type FoodWithServingUnit = Prisma.FoodGetPayload<{
	include: {
		foodServingUnits: true
	}
}>

const getFoods = async (filters: FoodFiltersSchema): Promise<PaginatedResult<FoodWithServingUnit>> => {
	const validatedFilters = foodFiltersSchema.parse(filters)
	
	const {
		searchTerm,
		sortBy = 'name',
		proteinRange,
		caloriesRange,
		sortOrder,
		page,
		pageSize,
		categoryId
	} = validatedFilters
	
	const [minCalories, maxCalories] = caloriesRange
	const numericMinCalories = minCalories === '' ? undefined : Number(minCalories)
	const numericMaxCalories = maxCalories === '' ? undefined : Number(maxCalories)
	
	const [minProtein, maxProtein] = proteinRange
	const numericMinProtein = minProtein === '' ? undefined : Number(minProtein)
	const numericMaxProtein = maxProtein === '' ? undefined : Number(maxProtein)
	
	
	const where: Prisma.FoodWhereInput = {}
	
	if (searchTerm) where.name = {contains: searchTerm}
	
	if (numericMinCalories !== undefined || numericMaxCalories !== undefined) {
		if (numericMinCalories !== undefined) where.calories = {gte: numericMinCalories}
		if (numericMaxCalories !== undefined) where.calories = {lte: numericMaxCalories}
	}
	
	if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
		if (numericMinProtein !== undefined) where.protein = {gte: numericMinProtein}
		if (numericMaxProtein !== undefined) where.protein = {lte: numericMaxProtein}
	}
	
	const numericCategoryId = categoryId ? Number(categoryId) : undefined
	
	if (numericCategoryId !== undefined && numericCategoryId !== 0) where.category = {id: numericCategoryId}
	
	const skip = (page - 1) * pageSize
	
	const [total, data] = await Promise.all([prisma.food.count({where}), prisma.food.findMany({
		where,
		orderBy: {[sortBy]: sortOrder},
		skip,
		take: pageSize,
		include: {
			foodServingUnits: true
		}
	})])
	
	return {
		data,
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize),
	}
}

const getFood = async (id: string): Promise<FoodSchema | null> => {
	const res = await prisma.food.findFirst({
		where: {id},
		include: {
			foodServingUnits: true
		}
	})
	
	if (!res) return null
	
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
		foodServingUnits:
			res.foodServingUnits.map((item) => ({
				foodServingUnitId: toStringSafe(item.servingUnitId),
				grams: toStringSafe(item.grams),
			})) ?? [],
	};
	
}

export {getFood, getFoods}