import {
  mdiHome,
  mdiFolderDownloadOutline,
  mdiTagOutline,
  mdiAccountOutline,
  mdiGoogleAnalytics,
  mdiBullhornOutline,
  mdiSale
} from "@mdi/js";

export default {
  admin: [
    {
      title: "Home",
      link: "/",
      icon: mdiHome,
      subNav: []
    },
    {
      title: "Orders",
      link: "/orders",
      icon: mdiFolderDownloadOutline,
      subNav: [
        { title: "Create Order" },
        { title: "All Orders" },
        { title: "Drafts" },
        { title: "Abandoned" }
      ]
    },
    {
      title: "Products",
      link: "/products",
      icon: mdiTagOutline,
      subNav: [
        { title: "All Products" },
        { title: "Add Products" },
        { title: "Edit Product" }
      ]
    },
    {
      title: "Customers",
      link: "/customers",
      icon: mdiAccountOutline,
      subNav: []
    },
    {
      title: "Analytics",
      link: "/analytics",
      icon: mdiGoogleAnalytics,
      subNav: []
    },
    {
      title: "Marketing",
      link: "/marketing",
      icon: mdiBullhornOutline,
      subNav: []
    },
    {
      title: "Discounts",
      link: "/discounts",
      icon: mdiSale,
      subNav: []
    }
  ]
};
