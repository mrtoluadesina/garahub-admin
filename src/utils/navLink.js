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
        { 
          title: 'Create Order',
          link: '/orders/create-order'
        },
        { 
          title: 'All Orders',
          link: '/orders'
        },
        { 
          title: 'Abandoned',
          link: '/orders/abandoned' 
        },
      ],
    },
    {
      title: "Products",
      link: "/products",
      icon: mdiTagOutline,
      subNav: [
        { 
          title: "All Products",
          link: "/products"
         },
        { 
          title: "Add Products",
          link: "/products/add"
         },
        { 
          title: "Edit Product",
          link: "/products/edit" 
        },
        { 
          title: "Gift Cards",
          link: "/products/gift" 
        }
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
