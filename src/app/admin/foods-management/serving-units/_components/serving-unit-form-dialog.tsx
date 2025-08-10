"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {
	servingUnitDefaultValues,
	servingUnitSchema,
	ServingUnitSchema
} from "@/app/admin/foods-management/serving-units/_types/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useServingUnitsStore} from "@/app/admin/foods-management/serving-units/_libs/useServingUnitsStore";
import {useServingUnit} from "@/app/admin/foods-management/serving-units/_services/useQueries";
import {
	useCreateServingUnit,
	useUpdateServingUnit
} from "@/app/admin/foods-management/serving-units/_services/useMutations";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useEffect} from "react";

interface ServingUnitFormDialogProps {
	smallTrigger?: boolean
}

export const ServingUnitFormDialog = ({smallTrigger}: ServingUnitFormDialogProps) => {
	const {
		selectedServingUnitId,
		updateServingUnitDialogOpen,
		servingUnitDialogOpen,
		updateSelectedServingUnitId
	} = useServingUnitsStore();
	
	const form = useForm<ServingUnitSchema>({
		defaultValues: servingUnitDefaultValues,
		resolver: zodResolver(servingUnitSchema)
	});
	
	const servingUnitQuery = useServingUnit();
	const createServingUnitMutation = useCreateServingUnit();
	const updateServingUnitMutation = useUpdateServingUnit();
	
	const isPending = createServingUnitMutation.isPending || updateServingUnitMutation.isPending;
	
	const handleDialogOpenChange = (open: boolean) => {
		updateServingUnitDialogOpen(open);
		
		if (!open) {
			updateSelectedServingUnitId(null);
			form.reset(servingUnitDefaultValues);
		}
	};
	
	const handleSuccess = () => handleDialogOpenChange(false);
	
	useEffect(() => {
		if (selectedServingUnitId && servingUnitQuery.data) {
			form.reset({
				...servingUnitQuery.data,
				action: "update",
				id: selectedServingUnitId
			});
		}
	}, [selectedServingUnitId, servingUnitQuery.data, form]);
	
	const onSubmit: SubmitHandler<ServingUnitSchema> = (data) => {
		if (data.action === "create") {
			createServingUnitMutation.mutate(data, {onSuccess: handleSuccess});
		} else {
			updateServingUnitMutation.mutate(data, {onSuccess: handleSuccess});
		}
	};
	
	return (
		<Dialog open={servingUnitDialogOpen} onOpenChange={handleDialogOpenChange}>
			<DialogTrigger asChild>
				{smallTrigger ? (
					<Button size={"icon"} variant={'ghost'} type={'button'}>
						<Plus/>
					</Button>
				) : (
					<Button size={"lg"} variant={'ghost'} type={'button'}>
						<Plus className='mr-2'/>
						New Serving Unit
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{selectedServingUnitId ? "Edit Serving Unit" : "Create Serving Unit"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<FormField
							control={form.control}
							name="name"
							render={({field}) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Serving Unit Name" {...field} />
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type={'submit'} disabled={isPending}>
								{selectedServingUnitId ? "Edit" : "Create"} Serving Unit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
