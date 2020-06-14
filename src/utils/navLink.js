import {
	mdiHome,
	mdiFolderDownloadOutline,
	mdiTagOutline,
	mdiAccountOutline,
	mdiGoogleAnalytics,
  mdiSale,
  mdiAccount,
} from "@mdi/js";

export default {
	admin: [
		{
			title: "Home",
			link: "/dashboard",
			icon: mdiHome,
			subNav: [],
		},
		{
			title: "Transactions",
			link: "/dashboard/transactions",
			icon: mdiGoogleAnalytics,
			subNav: [],
		},
		{
			title: "Orders",
			link: "/dashboard/orders",
			icon: mdiFolderDownloadOutline,
			subNav: [
				{
					title: "All Orders",
					link: "/dashboard/orders",
				},
				{
					title: "Create Order",
					link: "/dashboard/orders/create-order",
				},
				// {
				//   title: "Abandoned",
				//   link: "/dashboard/orders/abandoned"
				// }
			],
		},
		{
			title: "Products",
			link: "/dashboard/products",
			icon: mdiTagOutline,
			subNav: [
				{
					title: "All Products",
					link: "/dashboard/products",
				},
				{
					title: "Add Products",
					link: "/dashboard/products/add",
				},
			],
		},
		{
			title: "Customers",
			link: "/dashboard/customers",
			icon: mdiAccountOutline,
			subNav: [],
		},
		// {
		//   title: "Analytics",
		//   link: "/dashboard/analytics",
		//   icon: mdiGoogleAnalytics,
		//   subNav: []
		// },

		{
			title: "Admin Users",
			link: "/dashboard/users",
			icon: mdiAccount,
			subNav: [
				{
					title: "All Users",
					link: "/dashboard/users",
				},
				{
					title: "Create User",
					link: "/dashboard/users/create-user",
				},
			],
		},

		{
			title: "Discounts",
			link: "/dashboard/discounts",
			icon: mdiSale,
			subNav: [
				{
					title: "All Discounts",
					link: "/dashboard/discounts",
				},
				{
					title: "Add Discounts",
					link: "/dashboard/discounts/add",
				},
			],
		},
		// {
		// 	title: "Settings",
		// 	link: "/dashboard/settings",
		// 	icon: mdiSettings,
		// 	subNav: [],
		// },
	],
	// admin: [
	// 	{
	// 		title: "Home",
	// 		link: "/dashboard",
	// 		icon: mdiHome,
	// 		subNav: [],
	// 	},
	// 	{
	// 		title: "Transactions",
	// 		link: "/dashboard/transactions",
	// 		icon: mdiGoogleAnalytics,
	// 		subNav: [],
	// 	},
	// 	{
	// 		title: "Orders",
	// 		link: "/dashboard/orders",
	// 		icon: mdiFolderDownloadOutline,
	// 		subNav: [
	// 			{
	// 				title: "All Orders",
	// 				link: "/dashboard/orders",
	// 			},
	// 			{
	// 				title: "Create Order",
	// 				link: "/dashboard/orders/create-order",
	// 			},
	// 			// {
	// 			//   title: "Abandoned",
	// 			//   link: "/dashboard/orders/abandoned"
	// 			// }
	// 		],
	// 	},
	// 	{
	// 		title: "Products",
	// 		link: "/dashboard/products",
	// 		icon: mdiTagOutline,
	// 		subNav: [
	// 			{
	// 				title: "All Products",
	// 				link: "/dashboard/products",
	// 			},
	// 			{
	// 				title: "Add Products",
	// 				link: "/dashboard/products/add",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		title: "Customers",
	// 		link: "/dashboard/customers",
	// 		icon: mdiAccountOutline,
	// 		subNav: [],
	// 	},
	// 	// {
	// 	//   title: "Analytics",
	// 	//   link: "/dashboard/analytics",
	// 	//   icon: mdiGoogleAnalytics,
	// 	//   subNav: []
	// 	// },
	// 	{
	// 		title: "Discounts",
	// 		link: "/dashboard/discounts",
	// 		icon: mdiSale,
	// 		subNav: [
	// 			{
	// 				title: "All Discounts",
	// 				link: "/dashboard/discounts",
	// 			},
	// 			{
	// 				title: "Add Discounts",
	// 				link: "/dashboard/discounts/add",
	// 			},
	// 		],
	// 	},
	// 	// {
	// 	//   title: "Settings",
	// 	//   link: "/dashboard/settings",
	// 	//   icon: mdiSettings,
	// 	//   subNav: []
	// 	// }
	// ],
};
