'use client'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import {ChevronDown} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {SideBarItem} from "@/lib/constants";


interface AppSidebarProps {
	title: string
	sideBarItems: SideBarItem[]
}

export function AppSidebar({sideBarItems, title}: AppSidebarProps) {
	const {open} = useSidebar()
	
	return (
		<Sidebar collapsible="icon">
			{open && (
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>{title}</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
			)}
			<SidebarContent>
				{sideBarItems.map((item) => {
					return item.children && item.children.length > 0 ? (
						<Collapsible key={item.href} defaultOpen className="group/collapsible">
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger>
										{item.label}
										<ChevronDown
											className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										{item.children.map((subItem) => (
											<SidebarMenuButton className='text-emerald-700' key={subItem.href} asChild>
												<a href={subItem.href}>
													<subItem.icon/>
													<span>{subItem.label}</span>
												</a>
											</SidebarMenuButton>
										))}
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					) : (
						<SidebarGroup key={item.href}>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuButton asChild>
										<a href={item.href}>
											<item.icon/>
											<span>{item.label}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					)
				})}
			</SidebarContent>
			<SidebarFooter/>
		</Sidebar>
	)
}