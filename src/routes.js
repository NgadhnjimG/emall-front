import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import PostDetailsList from "views/PostDetailsList.jsx";
import WishList from "views/WishList";
import Cashier from "views/Cashier";
import Invoices from "views/Invoices";
import CancelledInvoices from "views/CancelledInvoices";
import InvoiceDetails from "views/InvoiceDetails";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "pe-7s-graph",
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/user",
        name: "User Profile",
        icon: "pe-7s-user",
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "/table",
        name: "Table List",
        icon: "pe-7s-note2",
        component: TableList,
        layout: "/admin"
    },
    {
        path: "/typography",
        name: "Typography",
        icon: "pe-7s-news-paper",
        component: Typography,
        layout: "/admin"
    },
    {
        path: "/icons",
        name: "Icons",
        icon: "pe-7s-science",
        component: Icons,
        layout: "/admin"
    },
    {
        path: "/maps",
        name: "Maps",
        icon: "pe-7s-map-marker",
        component: Maps,
        layout: "/admin"
    },
    {
        path: "/notifications",
        name: "Notifications",
        icon: "pe-7s-bell",
        component: Notifications,
        layout: "/admin"
    },
    {
        path: "/post-details",
        name: "Post Details",
        icon: "pe-7s-bell",
        component: PostDetailsList,
        layout: "/admin",
        hidden: true
    },
    {
        path: "/favorites",
        name: "Favorites",
        icon: "pe-7s-shopbag",
        component: WishList,
        layout: "/admin",
    },
    {
        path: "/cashier",
        name: "Arka",
        icon: "pe-7s-shopbag",
        component: Cashier,
        layout: "/employee",
    }, {
        path: "/invoices",
        name: "Invoices",
        icon: "pe-7s-news-paper",
        component: Invoices,
        layout: "/employee",
    },
    {
        path: "/cancelled-invoices",
        name: "Cancelled Invoices",
        icon: "pe-7s-close",
        component: CancelledInvoices,
        layout: "/employee",
    },
    {
        path: "/invoice-details/:invoiceid",
        name: "Invoices Details",
        icon: "pe-7s-close",
        component: InvoiceDetails,
        layout: "/employee",
        hidden: true
    },
    //InvoiceDetails

    // {
    //   upgrade: true,
    //   path: "/upgrade",
    //   name: "Upgrade to PRO",
    //   icon: "pe-7s-rocket",
    //   component: Upgrade,
    //   layout: "/admin"
    // }
];

export default dashboardRoutes;
