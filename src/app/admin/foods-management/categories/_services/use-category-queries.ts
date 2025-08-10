import {useQuery} from "@tanstack/react-query";
import {getCategories, getCategoryById} from "@/app/admin/foods-management/categories/_services/categoryQueries";
import {useCategoriesStore} from "@/app/admin/foods-management/categories/_libs/use-category-store";

const useCategories = () => {
	return useQuery(
		{
			queryKey: ["categories"],
			queryFn: getCategories
		}
	)
}

const useCategoryById = () => {
	const {selectedCategoryId} = useCategoriesStore()
	return useQuery(
		{
			queryKey: ["categories", {selectedCategoryId}],
			queryFn: () => getCategoryById(selectedCategoryId!),
			enabled: !!selectedCategoryId
		}
	)
}

export {useCategories, useCategoryById}