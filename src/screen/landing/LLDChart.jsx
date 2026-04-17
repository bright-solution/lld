import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const LLDChart = () => {
    const [range, setRange] = useState(7);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const ranges = [
        { label: "7D", value: 7 },
        { label: "1M", value: 30 },
        { label: "3M", value: 90 },
        { label: "1Y", value: 365 },
        { label: "2Y", value: 730 },
    ];

    const fetchChart = async (days) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/liberland-lld/market_chart?vs_currency=usd&days=${days}`
            );
            const data = await res.json();

            let formatted = [];

            if (days === 365) {
                const monthly = {};

                data.prices.forEach(([timestamp, price]) => {
                    const date = new Date(timestamp);
                    const month = date.toLocaleString("default", { month: "short" });

                    if (!monthly[month]) monthly[month] = [];
                    monthly[month].push(price);
                });

                formatted = Object.keys(monthly).map((month) => {
                    const prices = monthly[month];
                    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

                    return {
                        label: month,
                        price: Number(avg.toFixed(4)),
                    };
                });
            } else {
                formatted = data.prices.map(([timestamp, price]) => ({
                    label: new Date(timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                    }),
                    price,
                }));
            }

            setChartData(formatted);
            setLoading(false);
        } catch (err) {
            console.log("Chart error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChart(range);
    }, [range]);

    return (
        <section className="px-4 sm:px-6 py-16 sm:py-20 bg-[#020203]">
            <div className="max-w-6xl mx-auto">

                {/* ================= HEADER ================= */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center sm:text-left">
                        LLD Price Analytics
                    </h2>

                    {/* Responsive Tabs */}
                    <div className="flex flex-wrap justify-center sm:justify-end gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                        {ranges.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setRange(item.value)}
                                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${range === item.value
                                        ? "bg-purple-500 text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ================= CHART ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0f0f12] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 backdrop-blur-xl"
                >
                    {loading ? (
                        <p className="text-gray-400 text-center">Loading chart...</p>
                    ) : (
                        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    {/* 👇 Mobile fix: fewer ticks */}
                                        <XAxis
                                            dataKey="label"
                                            stroke="#888"
                                            tick={{ fontSize: 10 }}
                                            interval={Math.ceil(chartData.length / 6)}
                                        />
                                    <YAxis
                                        stroke="#888"
                                        tick={{ fontSize: 10 }}
                                        width={40}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#111",
                                            border: "1px solid #333",
                                            fontSize: "12px",
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#8b5cf6"
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default LLDChart;