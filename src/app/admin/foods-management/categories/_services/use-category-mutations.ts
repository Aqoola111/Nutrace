import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
	createCategory,
	deleteCategory,
	updateCategory
} from "@/app/admin/foods-management/categories/_services/categoryMutations";
import {toast} from "sonner";
import {CreateCategorySchema} from "@/app/admin/foods-management/categories/_types/categorySchema";

const useCreateCategory = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (data: CreateCategorySchema) => {
			await createCategory(data);
		},
		onSuccess: () => {
			toast.success("Category created successfully.");
			queryClient.invalidateQueries({queryKey: ["categories"]});
		},
	});
};

const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (data: CreateCategorySchema) => {
			await updateCategory(data);
		},
		onSuccess: () => {
			toast.success(`Category updated successfully.`);
			queryClient.invalidateQueries({queryKey: ["categories"]});
		},
	});
};


const useDeleteCategoryMutation = () => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (id: number) => {
			await deleteCategory(id)
		},
		onSuccess: () => {
			toast.success("Category deleted successfully.")
			queryClient.invalidateQueries({queryKey: ['categories']})
		},
		onError: () => {
			toast.error("Failed to delete category. Please try again.")
		}
	})
}

export {useDeleteCategoryMutation, useUpdateCategory, useCreateCategory}