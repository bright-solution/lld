import { motion } from "framer-motion";
import { UserPlus, Wallet, TrendingUp, ChevronRight, Play, Target } from "lucide-react";
import { useState } from "react";

const HowItsWork = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const videoUrl = "https://www.youtube.com/embed/bN7_KpXGvPk?hl=en-GB&origin=https%3A%2F%2Fliberland.org&autoplay=1&mute=1&loop=1&controls=0&disablekb=1&fs=0&rel=0&playsinline=1&cc_load_policy=0&iv_load_policy=3&playlist=bN7_KpXGvPk&start=0&end=59";

    const steps = [
        {
            step: '01',
            title: 'Create Your E-Residency',
            description: 'Join the Liberland ecosystem by setting up your secure digital identity.',
            icon: UserPlus,
            color: 'from-orange-600 to-yellow-500',
            glowColor: 'bg-orange-500/20',
            features: ['Blockchain Identity', 'Secure Auth', 'Fast Approval']
        },
        {
            step: '02',
            title: 'Fund Your Wallet',
            description: 'Acquire LLD coins to participate in the decentralized economy and governance.',
            icon: Wallet,
            color: 'from-purple-600 to-blue-500',
            glowColor: 'bg-purple-500/20',
            features: ['Cross-chain Swaps', 'Polkadot Network', 'Zero Hidden Fees']
        },
        {
            step: '03',
            title: 'Stake & Trade',
            description: 'Use your LLD to stake, earn rewards, or trade on the open market.',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-400',
            glowColor: 'bg-green-500/20',
            features: ['Smart Staking', 'Validator Rewards', 'Real-time Analytics']
        }
    ];

    return (
        <section id="how it works" className="relative px-6 py-32 bg-[#020203] overflow-hidden">

            {/* Background Texture & Subtle Glows */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* --- Header Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6"
                    >
                        <Target className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Get Started</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
                        Enter Liberland in <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400">
                            3 Simple Steps
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Discover how easy it is to become a part of the world's first blockchain-powered nation.
                    </p>
                </motion.div>

                {/* --- Steps Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative mb-32">

                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                    {steps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="relative group w-full h-full"
                        >
                            {/* OUTER GLOW EFFECT (Same as StatsSection) */}
                            <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-[34px] blur opacity-10 group-hover:opacity-30 transition duration-700`}></div>

                            <div className="relative h-full bg-[#0f0f12]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl overflow-hidden flex flex-col justify-between">

                                {/* INTERNAL GLOW BLOB (Same as StatsSection) */}
                                <div className={`absolute -top-24 -left-24 w-48 h-48 ${item.glowColor} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition duration-700`} />

                                <div className="relative z-10 flex-1">
                                    {/* Large Faded Background Number */}
                                    <div className="absolute -top-4 -right-2 text-8xl font-black text-white/[0.03] group-hover:text-white/[0.08] transition-colors pointer-events-none">
                                        {item.step}
                                    </div>

                                    {/* Icon Box */}
                                    <div className="mb-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 p-[1px]`}>
                                            <div className="w-full h-full bg-[#0f0f12] rounded-2xl flex items-center justify-center">
                                                <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Phase {item.step}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400 mb-8 font-light leading-relaxed text-sm">{item.description}</p>
                                </div>

                                <div className="relative z-10 bg-black/50 p-5 rounded-2xl border border-white/5 space-y-3 mt-auto">
                                    {item.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color}`} />
                                            <span className="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Animated Arrow between steps */}
                            {index < 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + (index * 0.2) }}
                                    className="hidden lg:flex absolute top-[100px] -right-8 w-16 justify-center z-20"
                                >
                                    <ChevronRight className="w-8 h-8 text-white/20" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* --- Video Presentation Section (Unchanged) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl rounded-full opacity-50" />

                    <div className="relative bg-[#0f0f12]/90 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/10 overflow-hidden group">

                        <div className="text-center mb-10 relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">See the ecosystem in action</h3>
                            <p className="text-gray-400 max-w-2xl mx-auto font-light">
                                Watch our official guide to understanding the Liberland economy and LLD.
                            </p>
                        </div>

                        {/* Video Container */}
                        <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">

                            {!isVideoPlaying ? (
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                                    onClick={() => setIsVideoPlaying(true)}
                                >
                                    <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/9c/84/3d/9c843d328e08b71d0ca9f2f351ff6ada.jpg')] bg-cover bg-center group-hover/play:opacity-50 transition-opacity group-hover/play:scale-105 duration-700" />
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="relative z-10 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover/play:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-500"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500 opacity-20 animate-spin-slow" />
                                        <Play className="w-10 h-10 text-white fill-white ml-2" />
                                    </motion.div>
                                </div>
                            ) : (
                                <iframe
                                    src={videoUrl}
                                    title="Platform Presentation"
                                    className="w-full h-full object-cover"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default HowItsWork;