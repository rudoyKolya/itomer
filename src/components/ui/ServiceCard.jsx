import { useState } from "react";
import { motion } from "framer-motion";

function ServiceCard({ service, index }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    if (!service) return null;

    const { icon: Icon, title, description } = service;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#2d2621]/5 bg-white p-8 transition-all duration-500 lg:hover:-translate-y-2 lg:hover:border-[#dcc19a]/50 lg:hover:shadow-[0_20px_40px_-15px_rgba(220,193,154,0.3)]"
            onMouseMove={handleMouseMove}
        >
            <div
                className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(220,193,154,0.12), transparent 40%)`,
                }}
            />

            <div className="relative z-10">
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f1ee] text-[#2d2621] transition-all duration-500 lg:group-hover:bg-[#dcc19a] lg:group-hover:text-white lg:group-hover:shadow-md">
                    <Icon
                        strokeWidth={1.5}
                        size={28}
                        className="transition-transform duration-500 lg:group-hover:scale-110"
                    />
                </div>

                <h3 className="mb-4 font-serif text-2xl leading-tight text-[#2d2621]">
                    {title}
                </h3>

                <p className="text-[1.05rem] leading-relaxed text-[#6d655d] transition-colors duration-300 lg:group-hover:text-[#2d2621]/90">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export default ServiceCard;