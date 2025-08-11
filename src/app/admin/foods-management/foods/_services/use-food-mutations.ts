import {createFood, deleteFood, updateFood,} from "@/app/admin/foods-management/foods/_services/foodMutations";
import {FoodSchema} from "@/app/admin/foods-management/foods/_types/foodSchema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

const useCreateFood = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (data: FoodSchema) => {
			await createFood(data);
		},
		onSuccess: () => {
			toast.success("Food created successfully.");
			queryClient.invalidateQueries({queryKey: ["foods"]});
		},
	});
};

const useUpdateFood = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (data: FoodSchema) => {
			await updateFood(data);
		},
		onSuccess: () => {
			toast.success("Food updated successfully.");
			queryClient.invalidateQueries({queryKey: ["foods"]});
		},
	});
};

const useDeleteFood = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: async (id: string) => {
			await deleteFood(id);
		},
		onSuccess: () => {
			toast.success("Food deleted successfully.");
			queryClient.invalidateQueries({queryKey: ["foods"]});
		},
	});
};

export {useCreateFood, useDeleteFood, useUpdateFood};