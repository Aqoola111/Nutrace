'use client'
import {ThemeProvider} from "@/components/providers/theme-provider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface ProvidersProps {
	children?: React.ReactNode;
}

const queryClient = new QueryClient()

export const Providers = ({children}: ProvidersProps) => {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</ThemeProvider>
	)
};