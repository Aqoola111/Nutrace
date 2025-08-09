'use client'
import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarTrigger,} from "@/components/ui/sidebar"
import React from "react";
import {ThemeSwitcher} from "@/components/navigation/theme-switcher";
import {UserButton} from "@/components/shared/user-button";

interface CustomSidebarInsetProps {
	children: React.ReactNode
}

export const CustomSidebarInset = ({children}: CustomSidebarInsetProps) => {
	return (
		<SidebarInset>
			<header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-5">
				<SidebarTrigger className="-ml-1"/>
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<div className='flex items-center gap-3'>
					<ThemeSwitcher/>
					<UserButton/>
				</div>
			</header>
			<main className='flex flex-col w-full h-full'>
				{children}
			</main>
		</SidebarInset>
	)
};