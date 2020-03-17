import {
  mdiHome,
  mdiFolderDownloadOutline,
  mdiTagOutline,
  mdiAccountOutline,
  mdiGoogleAnalytics,
  mdiSale,
  mdiSettings
} from "@mdi/js";

export default {
  admin: [
    {
      title: "Home",
      link: "/dashboard",
      icon: mdiHome,
      subNav: []
    },
    {
      title: "Orders",
      link: "/dashboard/orders",
      icon: mdiFolderDownloadOutline,
      subNav: [
        {
          title: "Create Order",
          link: "/dashboard/orders/create-order"
        },
        {
          title: "All Orders",
          link: "/dashboard/orders"
        },
        {
          title: "Abandoned",
          link: "/dashboard/orders/abandoned"
        }
      ]
    },
    {
      title: "Products",
      link: "/dashboard/products",
      icon: mdiTagOutline,
      subNav: [
        {
          title: "Add Products",
          link: "/dashboard/products/add"
        },
        {
          title: "All Products",
          link: "/dashboard/products"
        }
      ]
    },
    {
      title: "Customers",
      link: "/dashboard/customers",
      icon: mdiAccountOutline,
      subNav: []
    },
    {
      title: "Analytics",
      link: "/dashboard/analytics",
      icon: mdiGoogleAnalytics,
      subNav: []
    },
    {
      title: "Discounts",
      link: "/dashboard/discounts",
      icon: mdiSale,
      subNav: []
    },
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: mdiSettings,
      subNav: []
    }
  ]
};
