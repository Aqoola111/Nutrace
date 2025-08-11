'use client'
import {AlertDialogProvider} from "@/components/providers/alert-dialog-provider";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface ProvidersProps {
	children?: React.ReactNode;
}

const queryClient = new QueryClient()

export const Providers = ({children}: ProvidersProps) => {
	return (
		<ThemeProvider attribute="class"
					   defaultTheme="system"
					   enableSystem
					   disableTransitionOnChange>
			<QueryClientProvider client={queryClient}>
				<AlertDialogProvider/>
				{children}
			</QueryClientProvider>
		</ThemeProvider>
	)
};