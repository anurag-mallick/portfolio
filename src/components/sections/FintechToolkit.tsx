"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, FileSearch, Calendar, Brain, Code } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const fintechApps = [
    {
        title: "Multi-Country Tax Calculator",
        description: "Compare employer costs across 15 countries. Interactive tax breakdown with pie charts and social security calculations.",
        icon: <DollarSign className="w-10 h-10 text-[#00f3ff]" />,
        tech: "Chart.js, Tax Data",
        link: "/apps/tax-calculator",
        color: "border-[#00f3ff]/20 hover:border-[#00f3ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]"
    },
    {
        title: "FX Hedging Simulator",
        description: "Model currency risk for payroll exposures. Monte Carlo simulations with 95% VaR calculation and hedging cost analysis.",
        icon: <TrendingUp className="w-10 h-10 text-[#ff00ff]" />,
        tech: "Monte Carlo, Canvas",
        link: "/apps/fx-hedging",
        color: "border-[#ff00ff]/20 hover:border-[#ff00ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]"
    },
];

export function FintechToolkit() {
    return (
        <section id="fintech" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                        Financial Intelligence
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                        FINTECH <span className="text-primary">TOOLKIT</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                        AI-powered financial calculators, tax optimization tools, and compliance trackers
                        for global payroll and fintech operations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center">
                    {fintechApps.map((app, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`group bg-zinc-900/50 border backdrop-blur-xl rounded-xl p-6 transition-all duration-300 ${app.color} ${app.shadow} flex flex-col h-full`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-lg bg-white/5 group-hover:scale-110 transition-transform duration-300">
                                    {app.icon}
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground border border-white/10 px-2 py-1 rounded self-start">
                                    {app.tech}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                                {app.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow">
                                {app.description}
                            </p>

                            <Link href={app.link} className="block mt-auto">
                                <Button className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-white group-hover:border-white/30">
                                    LAUNCH TOOL
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
