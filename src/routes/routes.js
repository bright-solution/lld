import { BarChart2, BookOpen, FileText, LayoutDashboard, Users, Database, PieChart, Activity } from "lucide-react";

import Login from "../screen/auth/Login";
import Register from "../screen/auth/Register";

import UserHistory from "../screen/user/UserHistory";
import UserHome from "../screen/user/UserHome";
import UserProfile from "../screen/user/UserProfile";
import UserTeam from "../screen/user/UserTeam";
import UserWallet from "../screen/user/UserWallet";

import AdminDashboard from "../screen/admin/AdminDashboard";
import AllUsers from "../screen/admin/AllUsers";
import BuyLLD from "../screen/user/BuyLLD";


export const authRoutes = [
    {
        path: "/login",
        element: Login,
    },
    // {
    //     path: "/register",
    //     element: Register,
    // },
];



export const userRoutes = [
    {
        path: "/home",
        element: UserHome,
    },
    {
        path: "/profile",
        element: UserProfile,
    },
    {
        path: "/team",
        element: UserTeam,
    },
    {
        path: "/history",
        element: UserHistory,
    },
    {
        path: "/wallet",
        element: UserWallet,
    },
     {
        path: "/buy-lld",
        element: BuyLLD,
    }
];


export const adminRoutes = [
    {
        section: "Main",
        items: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" , element: AdminDashboard },
            { name: "Users", icon: BarChart2, path: "/users", element: AllUsers },
            // { name: "Invoice", icon: <FileText size={18} />, path: "/admin/invoice" },
            // { name: "CRM", icon: <Users size={18} />, path: "/admin/crm" },
            // { name: "Blog", icon: <BookOpen size={18} />, path: "/admin/blog" },
        ],
    },
];