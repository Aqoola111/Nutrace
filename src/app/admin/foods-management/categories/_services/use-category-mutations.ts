import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCategory} from "@/app/admin/foods-management/categories/_services/categoryMutations";
import {toast} from "sonner";

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

export {useDeleteCategoryMutation}