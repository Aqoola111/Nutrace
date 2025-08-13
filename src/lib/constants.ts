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
				href: "/admin/foods-management/foods",
				icon: Apple,
			},
			{
				label: "Categories",
				href: "/admin/foods-management/categories",
				icon: Tags,
			},
			{
				label: "Serving Units",
				href: "/admin/foods-management/serving-units",
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

export const patterns = {
	zeroTo9999: /^(|0|0\.\d{0,2}|[1-9]\d{0,3}(\.\d{0,2})?)$/,
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	minimumOneUpperCaseLetter: /[A-Z]/,
	minimumOneLowerCaseLetter: /[a-z]/,
	minimumOneDigit: /[0-9]/,
	minimumOneSpecialCharacter: /[@$!%*#?&]/,
	minEightCharacters: /^.{8,}$/,
};


export const sortByOptions = [
	{label: "Name", value: "name"},
	{label: "Calories", value: "calories"},
	{label: "Carbohydrates", value: "carbohydrates"},
	{label: "Fat", value: "fat"},
	{label: "Protein", value: "protein"},
] as const

export const orderByOptions = [
	{label: "Ascending", value: "asc"},
	{label: "Descending", value: "desc"},
]
