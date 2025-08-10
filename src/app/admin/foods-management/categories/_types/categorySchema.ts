import {z} from "zod";

export const createCategorySchema = z.intersection(z.object({
		name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
	}),
	z.discriminatedUnion('action', [
		z.object({action: z.literal('create')}),
		z.object({action: z.literal('update'), id: z.number().min(1)})
	])
)

export type CreateCategorySchema = z.infer<typeof createCategorySchema>

export const categoryDefaultValues: CreateCategorySchema = {
	'action': 'create',
	'name': '',
}
