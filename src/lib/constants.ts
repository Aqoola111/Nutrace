import {Apple, LucideIcon, Ruler, Tags, Utensils} from "lucide-react";

export type SideBarItem = {
	href: string
	icon: LucideIcon
	label: string
	children?: SideBarItem[]
}

export const adminSideBarItems: SideBarItem[] = [
	{
		label: "Foods Management",
		href: "/Foods",
		icon: Utensils,
		children: [
			{
				label: "Foods",
				href: "/admin/foods",
				icon: Apple,
			},
			{
				label: "Categories",
				href: "/admin/categories",
				icon: Tags,
			},
			{
				label: "Serving Units",
				href: "/admin/serving-units",
				icon: Ruler,
			},
		],
	},
	{
		label: "Meals Management",
		href: "/meals",
		icon: Utensils,
		children: [],
	},
]