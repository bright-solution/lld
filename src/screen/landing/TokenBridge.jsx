import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";

const TokenBridge = () => {
    const levels = [
        {
            level: "Layer 1",
            percent: "5%",
            title: "Direct Influence",
            desc: "High-impact rewards for direct ecosystem growth.",
            color: "from-blue-500 to-cyan-400"
        },
        {
            level: "Layer 2",
            percent: "3%",
            title: "Network Effect",
            desc: "Secondary rewards from your growing community.",
            color: "from-purple-500 to-pink-400"
        },
        {
            level: "Layer 3",
            percent: "2%",
            title: "Passive Legacy",
            desc: "Long-tail revenue from deep network activity.",
            color: "from-emerald-500 to-teal-400"
        },
        {
            level: "Admin",
            percent: "5%",
            title: "Platform Core",
            desc: "Powering audits, security, and 24/7 uptime.",
            color: "from-orange-500 to-red-400"
        },
    ];

    return (
        <section id="plan" className="bg-[#020617] text-white py-24 px-6 lg:px-20 relative overflow-hidden">

            {/* --- ELITE BACKGROUND ELEMENTS --- */}
            {/* <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" /> */}
            <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/85/e4/64/85e464a5fee76804ab5b4275fc329466.jpg')] opacity-20 pointer-events-none bg-no-repeat bg-cover" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-4"
                        >
                            <span className="h-[1px] w-8 bg-indigo-500"></span>
                            MULTI-TIER REWARDS
                        </motion.div>
                        <h2 className="text-5xl font-bold tracking-tighter leading-[0.9]">
                            MAXIMIZE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                AFFILIATE POWER
                            </span>
                        </h2>
                    </div>
                    <p className="text-gray-300 text-md max-w-sm border-l border-white/10 pl-6">
                        A decentralized commission structure engineered for sustainable scaling and high-volume participation.
                    </p>
                </div>

                {/* --- COMMISSION BENTO GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {levels.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-px rounded-[2rem] overflow-hidden bg-white/5 hover:bg-white/10 transition-all shadow-2xl"
                        >
                            {/* Border Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity`} />

                            <div className="relative bg-[#0b1120] rounded-[1.9rem] p-8 h-full flex flex-col justify-between border border-white/5">
                                <div>
                                    <div className="flex justify-between items-start mb-10">
                                        <span className="px-3 py-1 rounded-full border border-white/30 text-xs font-mono uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">
                                            {item.level}
                                        </span>
                                        <ArrowUpRight className="text-gray-300 group-hover:text-white transition-all transform group-hover:rotate-45" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                                <div className={`text-6xl font-black mt-8 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                                    {item.percent}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- BOTTOM DASHBOARD VIEW --- */}
                <div className="mt-20 grid lg:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="lg:col-span-1 p-8 rounded-[2rem] bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col justify-center items-center text-center shadow-indigo-500/20 shadow-2xl"
                    >
                        <p className="text-indigo-100/80 font-medium mb-2 uppercase text-xs tracking-widest">Total Payout Pool</p>
                        <h4 className="text-5xl font-black italic">15%</h4>
                        <p className="mt-4 text-sm text-indigo-100/70">Calculated per transaction, distributed instantly via smart contract.</p>
                    </motion.div>

                    {/* Features Detail */}
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500/20 rounded-lg"><Zap size={18} className="text-indigo-400" /></div>
                                <h5 className="font-bold">Growth Logic</h5>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-center gap-2"> <div className="h-1 w-1 bg-indigo-500 rounded-full" /> Direct Rewards (Layer 1)</li>
                                <li className="flex items-center gap-2"> <div className="h-1 w-1 bg-indigo-500 rounded-full" /> Scalable Depth (Layer 2 - Layer 3)</li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-500/20 rounded-lg"><ShieldCheck size={18} className="text-emerald-400" /></div>
                                <h5 className="font-bold">Security Layer</h5>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-center gap-2"> <div className="h-1 w-1 bg-emerald-500 rounded-full" /> Immutable Code</li>
                                <li className="flex items-center gap-2"> <div className="h-1 w-1 bg-emerald-500 rounded-full" /> Multi-Chain Ready</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TokenBridge;