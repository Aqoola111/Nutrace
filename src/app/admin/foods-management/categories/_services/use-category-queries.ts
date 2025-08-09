import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/app/admin/foods-management/categories/_services/categoryQueries";

const useCategories = () => {
	return useQuery(
		{
			queryKey: ["categories"],
			queryFn: getCategories
		}
	)
}

export {useCategories}