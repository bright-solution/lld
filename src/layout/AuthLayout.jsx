import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full bg-[#0d2429] text-white">
            <Outlet />
        </div>
    );
};

export default AuthLayout;