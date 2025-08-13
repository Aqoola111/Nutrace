'use client'
import {useCategories} from "@/app/admin/foods-management/categories/_services/use-category-queries";
import {useFoodsStore} from "@/app/admin/foods-management/foods/_libs/use-food-store";
import {
	foodFiltersDefaultValues,
	foodFiltersSchema,
	FoodFiltersSchema
} from "@/app/admin/foods-management/foods/_types/foodFilterSchema";
import {foodDefaultValues} from "@/app/admin/foods-management/foods/_types/foodSchema";
import {Button} from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@/components/ui/drawer";
import {DualRangeSlider} from "@/components/ui/dual-range-slider";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useDebounce} from "@/hooks/use-debounce";
import {orderByOptions, sortByOptions} from "@/lib/constants";
import {toStringSafe} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import equal from "fast-deep-equal/react";
import {FilterIcon} from "lucide-react";
import {useEffect, useMemo} from "react";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import {toast} from "sonner";

const FoodFilterDrawer = () => {
	
	const form = useForm<FoodFiltersSchema>({
		defaultValues: foodFiltersDefaultValues,
		resolver: zodResolver(foodFiltersSchema)
	})
	
	
	const {
		updateFoodFilters,
		foodFiltersDrawerOpen,
		updateFoodFiltersDrawerOpen,
		updateFoodFiltersSearchTerm,
		foodFilters
	} = useFoodsStore()
	
	const areFiltersModifies = useMemo(() => !equal(foodFilters, foodDefaultValues), [foodFilters])
	
	const searchTerm = useWatch({control: form.control, name: 'searchTerm'})
	const debouncedSearchTerm = useDebounce(searchTerm, 400)
	
	useEffect(() => {
		updateFoodFiltersSearchTerm(debouncedSearchTerm)
	}, [debouncedSearchTerm, updateFoodFiltersSearchTerm]);
	
	const categoriesQuery = useCategories()
	
	useEffect(() => {
		if (!foodFiltersDrawerOpen) {
			form.reset(foodFilters)
		}
	}, [foodFilters, foodFiltersDrawerOpen, form]);
	
	const onSubmit: SubmitHandler<FoodFiltersSchema> = (data) => {
		toast(`submitted filters: ${JSON.stringify(data)}`)
		updateFoodFilters(data)
		updateFoodFiltersDrawerOpen(false)
	}
	
	
	return (
		<Drawer open={foodFiltersDrawerOpen} onOpenChange={updateFoodFiltersDrawerOpen} direction='right' handleOnly>
			<Form {...form}>
				<div className='flex gap-2 w-full items-center '>
					<FormField
						control={form.control}
						name="searchTerm"
						render={({field}) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Type to search…" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<DrawerTrigger asChild>
						<Button variant='secondary' onClick={() => updateFoodFiltersDrawerOpen(true)}>
							Filters
							<FilterIcon/>
						</Button>
					</DrawerTrigger>
				</div>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>
							Filter Foods
						</DrawerTitle>
						<DrawerDescription>
							Use the filters below to narrow down your food search results.
						</DrawerDescription>
					</DrawerHeader>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-y-5 px-5'>
						<FormField control={form.control} name='categoryId' render={({field}) => (
							<FormItem>
								<FormLabel>
									Category
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder="Select category"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{
											categoriesQuery.data?.map(category => (
												<SelectItem key={category.id} value={toStringSafe(category.id)}>
													{category.name}
												</SelectItem>
											))
										}
									</SelectContent>
								</Select>
							</FormItem>
						)}/>
						<FormField control={form.control} name='sortBy' render={({field}) => (
							<FormItem>
								<FormLabel>
									Sort by
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder="Select category"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{
											sortByOptions.map(option => (
												<SelectItem key={option.label} value={option.value}>
													{option.label}
												</SelectItem>
											))
										}
									</SelectContent>
								</Select>
							</FormItem>
						)}/>
						<FormField control={form.control} name='sortOrder' render={({field}) => (
							<FormItem>
								<FormLabel>
									Order by
								</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder="Select category"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{
											orderByOptions.map(option => (
												<SelectItem key={option.label} value={option.value}>
													{option.label}
												</SelectItem>
											))
										}
									</SelectContent>
								</Select>
							</FormItem>
						)}/>
						<FormField
							control={form.control}
							name="caloriesRange"
							render={({field}) => (
								<FormItem className='p-2 pt-5'>
									<FormLabel className='mx-auto mb-5'>Calories (kcal)</FormLabel>
									<FormControl>
										<DualRangeSlider
											min={0}
											max={9999}
											step={1}
											value={field.value.map((v) => Number(v))}
											onValueChange={(val) => field.onChange(val.map((n) => String(n)))}
											labelPosition="top"
										/>
									</FormControl>
									<div className="mt-2 text-sm text-muted-foreground">
										{field.value?.[0]} — {field.value?.[1]} kcal
									</div>
								
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="proteinRange"
							render={({field}) => (
								<FormItem className='p-2 pt-5'>
									<FormLabel className='mx-auto mb-5'>Protein (Grams)</FormLabel>
									<FormControl>
										<DualRangeSlider
											min={0}
											max={9999}
											step={1}
											value={field.value.map((v) => Number(v))}
											onValueChange={(val) => field.onChange(val.map((n) => String(n)))}
											labelPosition="top"
										/>
									</FormControl>
									<div className="mt-2 text-sm text-muted-foreground">
										{field.value?.[0]} — {field.value?.[1]} Grams
									</div>
								
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-2 flex-col'>
							<DrawerClose asChild className='w-full'>
								<Button variant='secondary'
										className='w-full' type='button'>
									Cancel
								</Button>
							</DrawerClose>
							<Button className='w-full' type='submit'>
								Apply Filters
							</Button>
							<Button type='button' className='w-full' onClick={() => {
								form.reset(foodFiltersDefaultValues);
							}}>
								Reset Filters
							</Button>
						</div>
					</form>
				</DrawerContent>
			</Form>
		</Drawer>
	)
}
export default FoodFilterDrawer
