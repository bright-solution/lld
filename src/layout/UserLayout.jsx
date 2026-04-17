import { Outlet, useLocation } from "react-router-dom";
import BottomTab from "../components/common/BottomTab";
import UserHeader from "../components/common/UserHeader";

const UserLayout = () => {
    const location = useLocation();
    const showBottomTab = location.pathname.startsWith("/user");

    return (
        <div className="min-h-screen shadow flex justify-center">
            <div
                className="relative w-full max-w-lg bg-black text-white shadow-xl pb-16"
                // style={{
                //     backgroundImage: 'url("https://i.pinimg.com/1200x/f2/5d/c1/f25dc1b49d4e41b98c16ba825099583b.jpg")',
                //     backgroundSize: "cover",
                //     backgroundPosition: "center",
                //     backgroundRepeat: "no-repeat",
                // }}
            >
                {showBottomTab && <UserHeader />}
                <Outlet />
                {showBottomTab && <BottomTab />}
            </div>
        </div>
    );
};

export default UserLayout;
