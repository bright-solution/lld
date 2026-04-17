import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Coins,
    Activity,
    Info
} from 'lucide-react';

const StatsSection = () => {
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCoin = async () => {
        try {
            const res = await fetch("https://api.coingecko.com/api/v3/coins/liberland-lld");
            const data = await res.json();
            setCoin(data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching coin:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoin();
        const interval = setInterval(fetchCoin, 30000);
        return () => clearInterval(interval);
    }, []);

    const isPositive = coin?.market_data?.price_change_percentage_24h >= 0;

    return (
        <section className="relative px-6 py-20 bg-[#020203] overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* ==================== LEFT SIDE - INFO ==================== */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-xl lg:sticky lg:top-28"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                            <Info className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">Discover LLD</span>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white ">
                            What is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                                LLD Coin?
                            </span>
                        </h2>

                        <div className="space-y-6 text-gray-400 font-light leading-relaxed text-[17px]">
                            <p>
                                The Liberland Dollar (LLD) is the official cryptocurrency of the Free Republic of Liberland.
                                Designed to power the nation's decentralized economy, LLD serves as a fast, secure, and transparent
                                medium of exchange.
                            </p>
                            <p>
                                Unlike traditional fiat currencies, LLD operates on blockchain technology, ensuring that every
                                transaction is verifiable and free from centralized manipulation.
                            </p>
                        </div>

                        {/* Quick Info */}
                        <div className="mt-10 flex gap-8 border-t border-white/10 pt-8">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Ecosystem</p>
                                <p className="font-bold text-white">Polkadot / Substrate</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Purpose</p>
                                <p className="font-bold text-white">Utility & Governance</p>
                            </div>
                        </div>

                        {/* Description from API */}
                        <div className="mt-8 text-sm text-gray-400 leading-relaxed">
                            {coin?.description?.en
                                ? coin.description.en.split(". ")[0] + "."
                                : "Loading description..."}
                        </div>

                        {/* Small Stats Grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-xs text-gray-400 mt-10">
                            <div>
                                <span className="block text-gray-500 mb-1">7d Change</span>
                                <span className="text-white font-medium">
                                    {coin?.market_data?.price_change_percentage_7d?.toFixed(2) || "--"}%
                                </span>
                            </div>
                            <div>
                                <span className="block text-gray-500 mb-1">30d Change</span>
                                <span className="text-white font-medium">
                                    {coin?.market_data?.price_change_percentage_30d?.toFixed(2) || "--"}%
                                </span>
                            </div>
                            <div>
                                <span className="block text-gray-500 mb-1">Last Updated</span>
                                <span className="text-white font-medium">
                                    {coin?.last_updated?.slice(0, 10) || "--"}
                                </span>
                            </div>
                            <div>
                                <span className="block text-gray-500 mb-1">Origin</span>
                                <span className="text-white font-medium">Liberland</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ==================== RIGHT SIDE - CARDS ==================== */}
                    <div className="grid grid-cols-1 gap-6 lg:gap-8">

                        {/* Card 1 - Market Alert */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative group h-full"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-[34px] blur opacity-20 group-hover:opacity-40 transition duration-700" />

                            <div className="relative bg-[#0f0f12]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl h-full flex flex-col">
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition duration-700" />

                                <div className="relative z-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                                                <TrendingUp size={18} />
                                            </div>
                                            <span className="text-gray-300 font-medium">LLD Market Alert</span>
                                        </div>

                                        <span className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full 
                                            ${isPositive ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"}`}>
                                            {loading ? "..." : `${isPositive ? "+" : ""}${coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%`}
                                            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        </span>
                                    </div>

                                    <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex-1">
                                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                            {coin?.image?.small ? (
                                                <img
                                                    src={coin.image.small}
                                                    alt="LLD"
                                                    className="w-12 h-12 rounded-full shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-purple-500 flex items-center justify-center">
                                                    <Coins className="text-white w-6 h-6" />
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <h4 className="font-bold text-white text-lg">{coin?.name || "Liberland LLD"}</h4>
                                                <p className="text-xs text-gray-400">Rank #{coin?.market_cap_rank || "--"}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 mb-1">Current Price</p>
                                                <p className="text-xl font-bold text-white">
                                                    {loading ? "..." : `$${coin?.market_data?.current_price?.usd?.toLocaleString() || "0.00"}`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mt-6">
                                            <div>
                                                <span className="block text-gray-500 mb-1">Market Cap</span>
                                                <span className="text-white font-medium">
                                                    ${coin?.market_data?.market_cap?.usd?.toLocaleString() || "--"}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-500 mb-1">24h Volume</span>
                                                <span className="text-white font-medium">
                                                    ${coin?.market_data?.total_volume?.usd?.toLocaleString() || "--"}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-500 mb-1">Circulating Supply</span>
                                                <span className="text-white font-medium">
                                                    {coin?.market_data?.circulating_supply?.toLocaleString() || "--"}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-500 mb-1">Total Supply</span>
                                                <span className="text-white font-medium">
                                                    {coin?.market_data?.total_supply?.toLocaleString() || "--"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2 - Market Stats */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative group h-full"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-[34px] blur opacity-20 group-hover:opacity-40 transition duration-700" />

                            <div className="relative bg-[#0f0f12]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl h-full flex flex-col">
                                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition duration-700" />

                                <div className="relative z-10 flex-1 flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 font-medium">Market Stats</span>
                                        <Activity className="w-5 h-5 text-purple-400" />
                                    </div>

                                    <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex-1">
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">All Time High</p>
                                                <p className="text-white font-medium">
                                                    ${coin?.market_data?.ath?.usd?.toLocaleString() || "--"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">All Time Low</p>
                                                <p className="text-white font-medium">
                                                    ${coin?.market_data?.atl?.usd?.toLocaleString() || "--"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">24h Price Change</p>
                                                <p className={`${isPositive ? 'text-green-400' : 'text-red-400'} font-medium`}>
                                                    ${coin?.market_data?.price_change_24h?.toFixed(4) || "--"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">Fully Diluted Val</p>
                                                <p className="text-white font-medium">
                                                    ${coin?.market_data?.fully_diluted_valuation?.usd?.toLocaleString() || "--"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-center justify-between p-6">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Symbol</p>
                                            <p className="text-xl font-black text-white uppercase tracking-wider">
                                                {coin?.symbol || "LLD"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-purple-400 mb-1">Genesis Date</p>
                                            <p className="text-sm font-medium text-white">
                                                {coin?.genesis_date || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;