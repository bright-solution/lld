import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, History, User, Wallet } from "lucide-react";

const BottomTab = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const tabs = [
        { label: "Home", path: "/user/home", icon: Home },
        { label: "Team", path: "/user/team", icon: Users },
        { label: "History", path: "/user/history", icon: History },
        { label: "Wallet", path: "/user/wallet", icon: Wallet },
        { label: "Profile", path: "/user/profile", icon: User },
    ];
    return (
        <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 bg-gradient-to-r from-[#111] to-[#1a1a2e] border-t-2 border-[var(--primary-color)]/40 px-4 py-4 flex justify-between items-center backdrop-blur-md rounded-t-2xl">
            {tabs.map((tab) => {
                const active = location.pathname === tab.path;
                const Icon = tab.icon;

                if (tab.center) {
                    return (
                        <button
                            key={tab.path}
                            onClick={() => navigate(tab.path)}
                            className="absolute left-1/2 -translate-x-1/2 -top-6"
                        >
                            <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center shadow-xl border-4 border-black">
                                <Icon size={24} className="text-black" />
                            </div>
                        </button>
                    );
                }

                return (
                    <button
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        className="flex flex-col items-center flex-1"
                    >
                        <Icon
                            size={20}
                            className={`${active
                                ? "text-[var(--primary-color)]"
                                : "text-gray-500"
                                }`}
                        />
                        <span
                            className={`text-[11px] mt-1 ${active
                                ? "text-[var(--primary-color)] font-semibold"
                                : "text-gray-500"
                                }`}
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomTab;
