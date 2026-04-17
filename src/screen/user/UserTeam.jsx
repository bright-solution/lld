import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLevelWiseTeam } from "../../api/user.api";
import { Users } from "lucide-react";

const UserTeam = () => {
    const [activeLevel, setActiveLevel] = useState(null);
    const defaultLevels = [1, 2, 3];

    const { data, isLoading, error } = useQuery({
        queryKey: ["team"],
        queryFn: getLevelWiseTeam,
        staleTime: 1000 * 60 * 60,
    });

    const response = data?.data || [];

    const formattedData = defaultLevels.map((level) => {
        const found = response.find((item) => item.level === level);
        return (
            found || {
                level,
                totalUsers: 0,
                users: [],
            }
        );
    });

    // 🔄 Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading team...
            </div>
        );
    }

    // ❌ Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Something went wrong!
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-lg mx-auto space-y-6">

                {/* ---------------- TEAM STRUCTURE ---------------- */}
                <div className="bg-[#121212] border border-[var(--primary-color)]/60 rounded-2xl p-5">
                    <h2 className="text-white font-semibold mb-4 flex items-center gap-2 ">
                        <Users size={20} className="text-[var(--primary-color)]" /> My Team Structure
                    </h2>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {formattedData?.map((team) => (
                            <div
                                key={team.level}
                                className="bg-black/40 border border-[var(--primary-color)]/30 rounded-xl px-4 py-3"
                            >
                                {/* Top Row */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[var(--primary-color)] text-black flex items-center justify-center text-sm font-bold">
                                            {team.level}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-semibold">
                                                Layer {team.level}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {team.totalUsers} members
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setActiveLevel(
                                                activeLevel === team.level
                                                    ? null
                                                    : team.level
                                            )
                                        }
                                        className="text-xs bg-black/60 border border-gray-700 px-3 py-1 rounded-full text-gray-300 hover:bg-black/80 transition"
                                    >
                                        {activeLevel === team.level
                                            ? "Hide"
                                            : "View"}
                                    </button>
                                </div>

                                {/* Users List */}
                                {activeLevel === team.level && (
                                    <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto">
                                        {team.users?.length > 0 ? (
                                            team.users.map((user) => (
                                                <div
                                                    key={user._id}
                                                    className="flex justify-between items-center bg-black/60 hover:bg-black/80 transition rounded-lg p-4 text-sm"
                                                >
                                                    <div>
                                                        <p className="text-white font-medium text-sm">
                                                            {user.username}
                                                        </p>
                                                        <p className="text-gray-400 ">
                                                            Team:{" "}
                                                            {user.teamCount} |
                                                            Business:{" "}
                                                            {
                                                                user.totalBusiness
                                                            }
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full ${user.isVerified
                                                                ? "bg-green-500/20 text-green-400"
                                                                : "bg-red-500/20 text-red-400"
                                                            }`}
                                                    >
                                                        {user.isVerified
                                                            ? "Verified"
                                                            : "Unverified"}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 text-center text-xs">
                                                No users found
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserTeam;