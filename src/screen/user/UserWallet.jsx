import React from "react";
import { ArrowUpRight, Network, Crown, TrendingUp } from "lucide-react";
import { Button } from "@mui/material";

const UserWallet = () => {
    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-lg mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-white text-2xl font-bold">Wallet</h1>
                    <p className="text-gray-400 text-sm">
                        Withdraw or reinvest your earnings
                    </p>
                </div>

                {/* Earnings Overview */}
                <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-5 space-y-4">

                    <h2 className="text-gray-300 font-semibold">Earnings Overview</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {/* ROI Income */}
                        <div className="bg-black/40 rounded-xl p-4 border border-[var(--primary-color)]/20">
                            <div className="flex items-center gap-2 text-[var(--primary-color)] text-sm">
                                <TrendingUp size={16} />
                                ROI Income
                            </div>
                            <p className="text-white text-xl font-bold mt-2">$0</p>
                        </div>

                        {/* Level Income */}
                        <div className="bg-black/40 rounded-xl p-4 border border-[var(--primary-color)]/20">
                            <div className="flex items-center gap-2 text-[var(--primary-color)] text-sm">
                                <Network size={16} />
                                Level Income
                            </div>
                            <p className="text-white text-xl font-bold mt-2">$0</p>
                        </div>

                        {/* Rank Income */}
                        <div className="bg-black/40 rounded-xl p-4 border border-[var(--primary-color)]/20 col-span-2">
                            <div className="flex items-center gap-2 text-[var(--primary-color)] text-sm">
                                <Crown size={16} />
                                Rank Income
                            </div>
                            <p className="text-white text-xl font-bold mt-2">$0</p>
                        </div>
                    </div>
                </div>

                {/* Withdrawal Rules */}
                <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-5">
                    <h2 className="text-[var(--primary-color)] font-semibold mb-2">
                        Withdrawal Rules
                    </h2>
                    <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                        <li>Minimum withdrawal: $5</li>
                        <li>Minimum reinvest: $5</li>
                    </ul>
                </div>

                {/* ROI Wallet */}
                <div className="bg-[#121212] border border-[var(--primary-color)]/40 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-white font-semibold flex items-center gap-2">
                            <ArrowUpRight size={16} className="text-[var(--primary-color)]" />
                            ROI Wallet
                        </h2>
                        <span className="text-gray-400 text-sm">
                            Balance: <span className="text-white">$0</span>
                        </span>
                    </div>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full bg-black/40 border border-gray-700 rounded-full px-4 py-3 text-white outline-none focus:border-[var(--primary-color)]"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="contained"
                            fullWidth
                            size="small"
                            className="!rounded-full"
                        >
                            Withdraw
                        </Button>

                        <button className="bg-black/50 border border-gray-700 text-white font-semibold py-3 rounded-full hover:bg-black/70 transition">
                            Reinvest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserWallet;
