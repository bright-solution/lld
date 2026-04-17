import { motion } from "framer-motion";
import {
    Coins,
    ArrowRight,
    Twitter,
    Github,
    Send,
    MessageSquare
} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Ecosystem",
            links: ["LLD Wallet", "Smart Staking", "Governance", "Block Explorer"]
        },
        {
            title: "Resources",
            links: ["Documentation", "Whitepaper", "API Reference", "Media Kit"]
        },
        {
            title: "Company",
            links: ["About Liberland", "Careers", "Privacy Policy", "Terms"]
        }
    ];

    const socialLinks = [
        { icon: Twitter, href: "#" },
        { icon: MessageSquare, href: "#" },
        { icon: Send, href: "#" },
        { icon: Github, href: "#" }
    ];

    return (
        <footer className="relative bg-[#020203] pt-20 pb-10 px-4 md:px-6 overflow-hidden border-t border-white/10">

            {/* 🔥 Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-purple-600/10 blur-[150px]" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* 🔥 TOP SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-5"
                    >
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.5)]">
                                <Coins className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-white">LLD Coin</span>
                        </div>

                        {/* Desc */}
                        <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                            LLD Coin is powering the next generation of decentralized finance
                            with secure, scalable, and transparent blockchain solutions.
                            Join the ecosystem and be part of the future.
                        </p>

                        {/* Newsletter */}
                        <div className="relative max-w-md group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition"></div>

                            <div className="relative flex items-center bg-[#0f0f12] rounded-xl border border-white/10 p-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none"
                                />

                                <button className="bg-white text-black px-5 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-105 transition">
                                    Subscribe <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* 🔥 LINKS */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {footerLinks.map((column, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <h4 className="text-white font-semibold mb-6">
                                    {column.title}
                                </h4>

                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-gray-500 hover:text-purple-400 transition"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 🔥 DIVIDER */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Copyright */}
                    <p className="text-sm text-gray-500">
                        © {currentYear} LLD Coin. All rights reserved.
                    </p>

                    {/* 🔥 SOCIAL ICONS */}
                    <div className="flex gap-4">
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500 hover:border-purple-500 transition-all duration-300"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 🔥 EXTRA LINE (Premium feel) */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    Built with ❤️ for the future of Web3
                </p>
            </div>
        </footer>
    );
};

export default Footer;