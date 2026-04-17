const StatCard = ({
    title,
    value,
    subText,
    icon,
    colorVar = "primary",  // "primary" | "accent" | "success" | "danger" | "secondary"
}) => {
    const colorMap = {
        primary: {
            value: "var(--primary-color)",
            border: "var(--border-primary)",
            shadow: "var(--shadow-teal)",
            glow: "var(--glow-teal)",
            iconBorder: "var(--border-primary)",
            bg: "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(0, 240, 255, 0.02))",
        },

        accent: {
            value: "var(--accent-color)",
            border: "var(--border-accent)",
            shadow: "var(--shadow-gold)",
            glow: "var(--glow-gold)",
            iconBorder: "var(--border-accent)",
            bg: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.02))",
        },

        success: {
            value: "var(--success-color)",
            border: "var(--border-success)",
            shadow: "var(--shadow-emerald)",
            glow: "var(--glow-emerald)",
            iconBorder: "var(--border-success)",
            bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.02))",
        },

        danger: {
            value: "var(--danger-color)",
            border: "var(--border-danger)",
            shadow: "var(--shadow-rose)",
            glow: "var(--glow-rose)",
            iconBorder: "var(--border-danger)",
            bg: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(244, 63, 94, 0.02))",
        },

        secondary: {
            value: "var(--secondary-color)",
            border: "var(--border-secondary)",
            shadow: "var(--shadow-violet)",
            glow: "var(--glow-violet)",
            iconBorder: "var(--border-secondary)",
            bg: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.02))",
        },
    };

    const c = colorMap[colorVar] ?? colorMap.primary;

    return (
        <div
            style={{
                border: c.border,
                // boxShadow: c.shadow,
                background: c.bg
            }}
            className="
                relative h-full flex flex-col justify-between
                bg-[var(--bg-card)]
                rounded-[var(--radius-xl)] p-4
                transition-all duration-300
                hover:-translate-y-1
                overflow-hidden
                min-h-[120px]
            "
        >
            {/* Top */}
            <div className="relative z-10 flex justify-between items-start gap-2 mb-3">
                <span className="
                    text-[var(--text-muted)] text-[12px] font-bold
                    tracking-widest uppercase leading-tight flex-1
                ">
                    {title}
                </span>

                <div
                    className="
                        w-10 h-10 flex-shrink-0
                        flex items-center justify-center
                         border border-[var(--primary-color)]/30 rounded-lg
                    "
                >
                    {icon}
                </div>
            </div>

            {/* Bottom */}
            <div className="relative z-10 mt-auto">
                <h2
                    className="text-2xl font-bold tracking-tight leading-none"
                    style={{ color: c.value }}
                >
                    {value}
                </h2>
                <p className="text-[var(--text-muted)] text-xs mt-1">
                    {subText}
                </p>
            </div>
        </div>
    );
};


export default StatCard;