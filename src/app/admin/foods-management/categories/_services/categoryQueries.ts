"use server"

import prisma from "@/lib/lib";

const getCategories = async () => {
	const res = await prisma.category.findMany()
	return res
}

export {getCategories}