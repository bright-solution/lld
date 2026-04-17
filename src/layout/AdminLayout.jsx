import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/common/DashboardHeader";
import { useState } from "react";

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Main Section */}
            <div className="flex flex-col flex-1 bg-gray-100">

                {/* Header FIXED */}
                <div className="shrink-0">
                    <DashboardHeader
                        onMenuClick={() => {
                            setIsOpen(true);
                            setIsCollapsed(false);
                        }}
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
