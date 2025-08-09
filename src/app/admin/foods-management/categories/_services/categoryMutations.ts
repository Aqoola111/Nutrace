'use server'
import {executeAction} from "@/lib/execute-action";
import prisma from "@/lib/lib";

const deleteCategory = async (id: number) => {
	await executeAction({
		actionFn: () => prisma.category.delete({where: {id}})
	})
}

export {deleteCategory};