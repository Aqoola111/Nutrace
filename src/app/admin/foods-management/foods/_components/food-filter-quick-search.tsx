'use client'
import {useFoodsStore} from "@/app/admin/foods-management/foods/_libs/use-food-store";
import {FoodFiltersSchema} from "@/app/admin/foods-management/foods/_types/foodFilterSchema";
import {FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useDebounce} from "@/hooks/use-debounce";
import {useEffect} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {toast} from "sonner";

const FoodFilterQuickSearch = () => {
	
	const {
		updateFoodFiltersSearchTerm,
		foodFilters
	} = useFoodsStore()
	const {control} = useFormContext<FoodFiltersSchema>();
	const searchTerm = useWatch({control, name: "searchTerm"}) ?? ""; // string
	const debouncedSearchTerm = useDebounce(searchTerm, 400)
	
	useEffect(() => {
		updateFoodFiltersSearchTerm(debouncedSearchTerm);
		toast(foodFilters.searchTerm)
	}, [debouncedSearchTerm, updateFoodFiltersSearchTerm]);
	
	return (
		<FormField
			control={control}
			name="searchTerm"
			render={({field}) => (
				<FormItem>
					<FormControl>
						<Input placeholder="Type to search…" {...field} />
					</FormControl>
				</FormItem>
			)}
		/>
	
	)
}
export default FoodFilterQuickSearch
