"use server"

import {CreateCategorySchema} from "@/app/admin/foods-management/categories/_types/categorySchema";
import prisma from "@/lib/db";

const getCategories = async () => {
	const res = await prisma.category.findMany({orderBy: {id: 'asc'}})
	return res
}

const getCategoryById = async (id: number): Promise<CreateCategorySchema> => {
	const res = await prisma.category.findFirst({where: {id}})
	
	return {
		action: 'update',
		name: res?.name ?? '',
		id
	}
}

export {getCategories, getCategoryById}