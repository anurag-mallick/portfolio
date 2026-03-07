"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const metrics = [
    {
        label: "ARR Generated",
        value: 275000,
        prefix: "€",
        suffix: "+",
        description: "Revenue from New EOR Platform"
    },
    {
        label: "Cost Savings",
        value: 3.5,
        prefix: "₹",
        suffix: " Cr+",
        description: "Via Contract Optimization"
    },
    {
        label: "Payroll Accuracy",
        value: 99.8,
        prefix: "",
        suffix: "%",
        description: "Across Global Operations"
    },
    {
        label: "Associates Supported",
        value: 85000,
        prefix: "",
        suffix: "+",
        description: "On Indian Payroll Systems"
    }
];

function Sparkline({ delay = 0, color = "primary" }: { delay?: number, color?: string }) {
    const points = [40, 35, 45, 30, 55, 40, 60, 50, 75];
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * 12.5} ${100 - p}`).join(' ');

    return (
        <div className="w-full h-8 mt-4 overflow-hidden opacity-50">
            <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className={cn(
                        color === "primary" ? "text-primary" : "text-secondary"
                    )}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}

function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const springValue = useSpring(from, {
        mass: 1,
        stiffness: 50,
        damping: 15, // Smoother transition
        duration: 2000
    });

    useEffect(() => {
        if (inView) {
            springValue.set(to);
        }
    }, [inView, springValue, to]);

    const displayValue = useTransform(springValue, (current) => {
        // Determine formatting based on the target 'to' value logic
        if (to % 1 !== 0) { // Check for decimals
            return prefix + current.toFixed(1) + suffix;
        }
        return prefix + Math.floor(current).toLocaleString() + suffix;
    });

    return (
        <motion.span ref={ref} className="text-4xl md:text-6xl font-bold text-white tracking-tighter tabular-nums">
            {displayValue}
        </motion.span>
    );
}

export function Impact() {
    return (
        <section className="py-24 bg-black relative border-y border-white/10">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
                        Measurable <span className="text-primary">Impact</span>
                    </h2>
                    <p className="text-muted-foreground">Driving efficiency and growth through systems.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Replaced original div with a Card-like structure */}
                            <div className="theme-card p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors w-full flex flex-col items-center text-center">
                                <div className="mb-4">
                                    <Counter from={0} to={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                                </div>
                                <h3 className="text-lg font-medium text-primary mb-2">{metric.label}</h3>
                                <p className="text-sm text-muted-foreground">{metric.description}</p>
                                <Sparkline delay={index * 0.2} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
