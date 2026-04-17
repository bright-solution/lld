import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const sections = [
    {
        label: "LLD 01",
        title: "Seamless Global Payments Infrastructure Powered by Blockchain Technology",
        text: "LLD enables lightning-fast, secure, and borderless transactions across the globe. Whether you're sending funds internationally or making everyday payments, LLD eliminates intermediaries and reduces fees drastically. With blockchain-backed transparency and near-instant settlement, users experience a new era of financial freedom and efficiency in digital payments.",
        accent: "#8B5CF6",
    },
    {
        label: "LLD 02",
        title: "Advanced Staking & Passive Income Generation with High Yield Rewards",
        text: "LLD offers a powerful staking mechanism that allows users to earn consistent passive income. By locking your tokens into the ecosystem, you gain access to high-yield reward structures designed for long-term sustainability. With flexible staking options and real-time reward tracking, users can maximize their earnings while contributing to network stability.",
        accent: "#06B6D4",
    },
    {
        label: "LLD 03",
        title: "Decentralized Finance Ecosystem with Governance and Community Control",
        text: "The LLD ecosystem integrates DeFi utilities such as liquidity pools, token swaps, and decentralized governance. Token holders can actively participate in decision-making through voting mechanisms, ensuring a truly community-driven platform. This empowers users to shape the future of the ecosystem while benefiting from decentralized financial tools.",
        accent: "#F59E0B",
    },
    {
        label: "LLD 04",
        title: "Secure and Transparent Blockchain Infrastructure with Smart Contract Integrity",
        text: "Built on a robust blockchain network, LLD ensures every transaction is secure, verifiable, and tamper-proof. Smart contracts automate operations with precision while maintaining full transparency. This trustless system reduces risks and enhances user confidence in the ecosystem.",
        accent: "#10B981",
    },
    {
        label: "LLD 05",
        title: "Scalable Ecosystem Designed for Future Growth and Web3 Integration",
        text: "LLD is built with scalability in mind, allowing seamless integration with future Web3 applications including NFTs, metaverse platforms, and decentralized apps. As adoption grows, the ecosystem expands to support new utilities, ensuring long-term sustainability and innovation.",
        accent: "#EC4899",
    },
];

const EcosystemSection = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 🔥 smoother rotation
    const rotate = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -360]),
        { stiffness: 50, damping: 20 }
    );

    return (
        <div
            id="ecosystem"
            ref={containerRef}
            className="relative bg-[#020203]"
            style={{ height: `${sections.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">

                {/* 🔥 PREMIUM WHEEL */}
                <motion.div
                    style={{ rotate }}
                    className="absolute left-[-120px] md:left-[-200px] top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px]"
                >
                    {/* Outer Glow */}
                    <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-[80px]" />

                    {/* Outer Ring */}
                    <div className="absolute inset-0 border border-white/10 rounded-full" />

                    {/* Inner Ring */}
                    <div className="absolute inset-12 md:inset-16 border border-white/5 rounded-full" />

                    {/* Spokes */}
                    {[0, 72, 144, 216, 288].map((deg) => (
                        <div
                            key={deg}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transform: `rotate(${deg}deg)` }}
                        >
                            <div className="w-[1px] h-full bg-white/10" />
                        </div>
                    ))}

                    {/* Center Glow */}
                    <div className="absolute inset-[120px] md:inset-[200px] rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/10 blur-xl" />

                    {/* Center Core */}
                    <div className="absolute inset-[130px] md:inset-[210px] rounded-full bg-[#0f0f12] border border-white/10" />
                </motion.div>

                {/* 🔥 CONTENT */}
                <div className=" relative ml-[130px] md:ml-[420px] px-4 md:px-0 w-full max-w-4xl">

                    {sections.map((section, i) => {
                        const start = i / sections.length;
                        const end = (i + 1) / sections.length;

                        const opacity = useSpring(
                            useTransform(
                                scrollYProgress,
                                [start, start + 0.1, end - 0.1, end],
                                [0, 1, 1, 0]
                            ),
                            { stiffness: 80, damping: 20 }
                        );

                        const y = useSpring(
                            useTransform(
                                scrollYProgress,
                                [start, start + 0.1, end],
                                [60, 0, -60]
                            ),
                            { stiffness: 80, damping: 20 }
                        );

                        return (
                            <motion.div
                                key={i}
                                style={{ opacity, y }}
                                className="absolute top-1/2 md:left-20 -left-20 -translate-y-1/2 w-full"
                            >
                                {/* Accent */}
                                <div
                                    className="w-16 h-[3px] mb-6 rounded-full"
                                    style={{ background: section.accent }}
                                />

                                {/* Label */}
                                <p
                                    className="text-xs font-bold tracking-[0.3em] mb-3"
                                    style={{ color: section.accent }}
                                >
                                    {section.label}
                                </p>

                                {/* Title */}
                                <h2 className="text-3xl md:text-6xl font-bold text-white mb-5 leading-tight">
                                    {section.title}
                                </h2>

                                {/* Desc */}
                                <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8">
                                    {section.text}
                                </p>

                                {/* Button */}
                                <button
                                    className="px-6 py-2 border text-sm font-semibold rounded-full transition hover:scale-105"
                                    style={{
                                        borderColor: section.accent,
                                        color: section.accent,
                                    }}
                                >
                                    Explore →
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EcosystemSection;