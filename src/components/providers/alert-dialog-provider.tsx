import {useGlobalStore} from "@/lib/use-global-store";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";

const AlertDialogProvider = () => {
	const {alertConfig, alertOpen, updateAlertOpen} = useGlobalStore()
	
	if (!alertConfig) return null
	
	const handleConfirm = () => {
		if (alertConfig.onConfirm) alertConfig.onConfirm()
		updateAlertOpen(false)
	}
	
	const handleCancel = () => {
		if (alertConfig.onCancel) alertConfig.onCancel()
		updateAlertOpen(false)
	}
	
	return (
		<AlertDialog open={alertOpen} onOpenChange={updateAlertOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{alertConfig.title || 'Confirmation required'}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{alertConfig.description || 'Are you sure you want to proceed?'}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex justify-between'>
					<AlertDialogCancel onClick={handleCancel}>
						{alertConfig.cancelLabel || 'Cancel'}
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>
						{alertConfig.confirmLabel || 'Confirm'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
export {AlertDialogProvider}
