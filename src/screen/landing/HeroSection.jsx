import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {

    const texts = [
        "Next-Gen DeFi Revolution",
        "Earn Passive Income",
        "Secure. Fast. Scalable",
        // "Built on Binance Smart Chain"
    ];

    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);

    useEffect(() => {
        if (forward) {
            if (subIndex < texts[index].length) {
                setTimeout(() => {
                    setDisplayText((prev) => prev + texts[index][subIndex]);
                    setSubIndex(subIndex + 1);
                }, 50);
            } else {
                setTimeout(() => setForward(false), 1500);
            }
        } else {
            if (subIndex > 0) {
                setTimeout(() => {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setSubIndex(subIndex - 1);
                }, 30);
            } else {
                setForward(true);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        }
    }, [subIndex, index, forward]);

    return (
        <section
            id="home"
            className="relative min-h-screen bg-[#020203] overflow-hidden md:pt-16 px-6 flex items-center justify-center">
            <motion.div
                className="absolute top-[5%] left-[-15%] md:left-[-13%] w-[600px] h-[600px] pointer-events-none md:opacity-60 opacity-10 blur-[1px] mix-blend-screen hidden md:block"
                style={{
                    backgroundImage: `url('https://i.pinimg.com/736x/d0/09/6a/d0096acc11c6af20a457d10602f9004e.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '50%'
                }}
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Right Purple/Blue Glow */}
            <motion.div
                className="absolute top-[8%] right-[-28%] md:right-[-8%] w-[600px] h-[600px] pointer-events-none md:opacity-60 blur-[1px] mix-blend-screen hidden md:block rotate-180"
                style={{
                    backgroundImage: `url('https://i.pinimg.com/736x/d0/09/6a/d0096acc11c6af20a457d10602f9004e.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '50%'
                }}
                animate={{
                    y: [0, 25, 0],
                    x: [0, -15, 0],
                    scale: [1, 1.06, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />


            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div
                    className="w-[50rem] h-96 opacity-40"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/1200x/8f/cc/c0/8fccc021037e5e70ba3f5c604263ece6.jpg')",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        WebkitMaskImage:
                            "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
                        maskImage:
                            "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">LLD Coin Ecosystem</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                >
                    The People's <br className="hidden md:block" />
                    Crypto LLD Coin <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-orange-600">
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-4xl mb-8 font-light"
                >
                    LLD Coin is a powerful decentralized token built on BSC that offers
                    high ROI opportunities, secure transactions, and a scalable ecosystem
                    for the next generation of investors.
                </motion.p>

                {/* Main CTA Button with Glow */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="relative px-8 py-3 rounded-full font-semibold text-white overflow-hidden group"
                >

                    {/* Outer Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>

                    {/* Inner Background */}
                    <div className="absolute inset-[2px] rounded-full bg-black"></div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                    {/* Text */}
                    <Link to="/auth/login" className="relative z-10 flex items-center gap-2">
                        Buy LLD Coin
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.button>
            </div>
        </section>
    );
};

export default HeroSection;