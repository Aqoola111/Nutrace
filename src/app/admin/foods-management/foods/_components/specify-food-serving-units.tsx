import {FoodSchema} from "@/app/admin/foods-management/foods/_types/foodSchema";
import {useServingUnits} from "@/app/admin/foods-management/serving-units/_services/useQueries";
import {Button} from "@/components/ui/button";
import {FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toStringSafe} from "@/lib/utils";
import {CirclePlus, Trash2, UtensilsCrossed} from "lucide-react";
import {useFieldArray, useFormContext} from "react-hook-form";

const SpecifyFoodServingUnits = () => {
	const {control} = useFormContext<FoodSchema>()
	const foodServingUnits = useFieldArray({control, name: 'foodServingUnits'})
	const servingUnitsQuery = useServingUnits()
	return (
		<div className='flex flex-col gap-4 rounded-md border p-4'>
			<div className='flex items-center justify-between'>
				<h3 className='text-sm font-bold'>
					Serving Units
				</h3>
				<Button size='sm' className='flex items-center gap-2' type='button' variant='outline'
						onClick={() => foodServingUnits.append({
							foodServingUnitId: "", grams: "0"
						})}
				>
					<CirclePlus className='size-4'/>
					Add Serving Unit
				</Button>
			</div>
			{foodServingUnits.fields.length === 0 ? (
				<div
					className="text-muted-foreground flex flex-col items-center justify-center rounded-md border border-dashed py-6 text-center">
					<UtensilsCrossed className="mb-2 size-10 opacity-50"/>
					<p>No serving units added yet</p>
					<p className="text-sm">
						Add serving units to help users measure this food
					</p>
				</div>
			) : (
				<div className='space-y-3'>
					{
						foodServingUnits.fields.map((field, index) => (
							<div className='grid grid-cols-[1fr_1fr_auto] items-end gap-3' key={field.id}>
								<div className=''>
									<FormField control={control} name={`foodServingUnits.${index}.foodServingUnitId`}
											   render={({field}) => (
												   <FormItem>
													   <Select onValueChange={field.onChange}
															   defaultValue={field.value}>
														   <FormControl>
															   <SelectTrigger>
																   <SelectValue placeholder="Select serving unit"/>
															   </SelectTrigger>
														   </FormControl>
														   <SelectContent>
															   {
																   servingUnitsQuery.data?.map(servingUnit => (
																	   <SelectItem key={servingUnit.id}
																				   value={toStringSafe(servingUnit.id)}>
																		   {servingUnit.name}
																	   </SelectItem>
																   ))
															   }
														   </SelectContent>
													   </Select>
												   </FormItem>
											   )}/>
								</div>
								<div>
									<FormField control={control} name={`foodServingUnits.${index}.grams`}
											   render={({field}) => (
												   <FormItem>
													   <FormControl>
														   <Input
															   type="text"
															   placeholder="0"
															   className="w-full rounded-md border"
															   {...field}
														   />
													   </FormControl>
												   </FormItem>
											   )}/>
								</div>
								<Button
									size="icon"
									variant="outline"
									type="button"
									onClick={() => {
										foodServingUnits.remove(index);
									}}
								>
									<Trash2/>
								</Button>
							
							</div>
						))
					}
				</div>
			)}
		</div>
	)
}
export default SpecifyFoodServingUnits
