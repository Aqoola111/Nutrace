import {useFoodsStore} from "@/app/admin/foods-management/foods/_libs/use-food-store";
import {getFood, getFoods,} from "@/app/admin/foods-management/foods/_services/foodQueries";
import {toStringSafe} from "@/lib/utils";
import {useQuery} from "@tanstack/react-query";

const useFoods = () => {
	const {foodFilters} = useFoodsStore();
	
	return useQuery({
		queryKey: ["foods", foodFilters],
		queryFn: () => getFoods(foodFilters),
	});
};

const useFood = () => {
	const {selectedFoodId} = useFoodsStore();
	
	return useQuery({
		queryKey: ["foods", {selectedFoodId}],
		queryFn: () => getFood(toStringSafe(selectedFoodId!)),
		enabled: !!selectedFoodId,
	});
};

export {useFoods, useFood};