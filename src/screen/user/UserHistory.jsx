import React, { useState } from "react";

const UserHistory = () => {
    const [activeTab, setActiveTab] = useState("all");

    const historyData = [
        {
            id: 1,
            type: "roi",
            title: "ROI Income",
            amount: "+$25",
            date: "12 Feb 2026",
            status: "Success",
        },
        {
            id: 2,
            type: "withdraw",
            title: "Withdrawal",
            amount: "-$50",
            date: "10 Feb 2026",
            status: "Pending",
        },
    ];

    const filteredData =
        activeTab === "all"
            ? historyData
            : historyData.filter((item) => item.type === activeTab);

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-lg mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-white text-2xl font-bold">Income History</h1>
                    <p className="text-gray-400 text-sm">
                        Track your earnings & withdrawals
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-black/40 border border-[var(--primary-color)]/30 rounded-full p-1">
                    {["all", "roi", "withdraw"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 text-sm py-2 rounded-full transition ${activeTab === tab
                                    ? "bg-[var(--primary-color)] text-black font-semibold"
                                    : "text-gray-400"
                                }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* History List */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">

                    {filteredData.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No transactions found
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#121212] border border-[var(--primary-color)]/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(255,136,0,0.15)]"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-semibold text-sm">
                                            {item.title}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            {item.date}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p
                                            className={`font-bold ${item.amount.includes("+")
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                                }`}
                                        >
                                            {item.amount}
                                        </p>

                                        <p
                                            className={`text-xs ${item.status === "Success"
                                                    ? "text-green-400"
                                                    : item.status === "Pending"
                                                        ? "text-yellow-400"
                                                        : "text-red-500"
                                                }`}
                                        >
                                            {item.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserHistory;
