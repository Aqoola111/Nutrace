'use client'
import {ThemeProvider} from "@/components/providers/theme-provider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AlertDialogProvider} from "@/components/providers/alert-dialog-provider";

interface ProvidersProps {
	children?: React.ReactNode;
}

const queryClient = new QueryClient()

export const Providers = ({children}: ProvidersProps) => {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AlertDialogProvider/>
				{children}
			</QueryClientProvider>
		</ThemeProvider>
	)
};