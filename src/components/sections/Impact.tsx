"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const metrics = [
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
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                        Measurable <span className="text-primary">Impact</span>
                    </h2>
                    <p className="text-muted-foreground">Driving efficiency and growth through systems.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors w-full">
                            {/* Circular Progress Indicator Logic could go here, simplified for clean impact */}
                            <div className="mb-4">
                                <Counter from={0} to={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                            </div>
                            <h3 className="text-lg font-medium text-primary mb-2">{metric.label}</h3>
                            <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
