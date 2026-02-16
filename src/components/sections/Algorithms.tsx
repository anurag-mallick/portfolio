"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Zap, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const algorithmApps = [
    {
        title: "Git Branching Strategy Game",
        description: "Interactive Git repository visualizer. D3 force-directed graph with commit, branch, merge, and rebase operations.",
        icon: <GitBranch className="w-10 h-10 text-[#ff00ff]" />,
        tech: "D3.js Graph",
        link: "/apps/git-branching",
        color: "border-[#ff00ff]/20 hover:border-[#ff00ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]"
    },
    {
        title: "Circuit Breaker Pattern",
        description: "Microservices resilience pattern demo. State machine visualization with request flow animation and failure detection.",
        icon: <Zap className="w-10 h-10 text-[#ffff00]" />,
        tech: "State Machine",
        link: "/apps/circuit-breaker",
        color: "border-[#ffff00]/20 hover:border-[#ffff00]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]"
    },
];

export function Algorithms() {
    return (
        <section id="algorithms" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-[#ff00ff]/20 bg-[#ff00ff]/10 px-3 py-1 text-sm font-medium text-[#ff00ff] backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-[#ff00ff] mr-2 animate-pulse" />
                        Advanced Concepts
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                        ALGORITHM <span className="text-[#ff00ff]">VISUALIZERS</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                        Complex computer science concepts brought to life through interactive
                        visualizations and simulations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center">
                    {algorithmApps.map((app, index) => (
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

                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#ff00ff] transition-colors">
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
