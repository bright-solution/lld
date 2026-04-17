import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const routeTitles = {
    home: "Dashboard",
    team: "Team",
    history: "History",
    wallet: "Wallet",
    profile: "Profile",
};

const UserHeader = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    const baseRoute = pathSegments[2];
    const title = routeTitles[baseRoute] || "Dashboard";
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div
            className="bg-gradient-to-r from-[#111] to-[#1a1a2e] border-b-2 border-[var(--primary-color)]/40 px-4 py-4 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md rounded-b-2xl"
        >
            <div>
                <h1 className="text-white text-2xl font-bold tracking-wide">
                    {title}
                </h1>
                <p className="text-[var(--primary-color)] text-sm mt-1">
                    Welcome back, {user?.username || "User"}
                </p>
            </div>

            <IconButton
                onClick={handleLogout}
                sx={{
                    background: "rgba(255,137,4,0.1)",
                    border: "1px solid var(--primary-color)",
                    color: "var(--primary-color)",
                    "&:hover": {
                        background: "var(--primary-color)",
                        color: "#000",
                    },
                }}
            >
                <LogoutIcon />
            </IconButton>
        </div>
    );
};

export default UserHeader;
