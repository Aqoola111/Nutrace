import React from "react";
import {SidebarProvider} from "@/components/ui/sidebar"
import {CustomSidebarInset} from "@/components/navigation/custom-sidebar-inset";

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
	return (
		<SidebarProvider>
			{/*<AppSidebar sideBarItems={adminSideBarItems} title={'Dashboard'}/>*/}
			<CustomSidebarInset>
				{children}
			</CustomSidebarInset>
		</SidebarProvider>
	)
}
export default DashboardLayout
