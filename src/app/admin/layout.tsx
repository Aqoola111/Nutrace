'use client'
import React from "react";
import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/navigation/app-sidebar";
import {adminSideBarItems} from "@/lib/constants";
import {CustomSidebarInset} from "@/components/navigation/custom-sidebar-inset";

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
	return (
		<SidebarProvider>
			<AppSidebar sideBarItems={adminSideBarItems} title={'Admin Dashboard'}/>
			<CustomSidebarInset>
				<div className='flex-1'>
					{children}
				</div>
			</CustomSidebarInset>
		</SidebarProvider>
	)
}
export default DashboardLayout
