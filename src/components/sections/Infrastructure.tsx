"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge, Database, Network, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const infrastructureApps = [
    {
        title: "API Rate Limit Visualizer",
        description: "Simulate different throttling strategies. Compare Token bucket vs Leaky bucket vs Fixed window with animated request queues.",
        icon: <Gauge className="w-10 h-10 text-[#ff0080]" />,
        tech: "Token Bucket",
        link: "/apps/rate-limiter",
        color: "border-[#ff0080]/20 hover:border-[#ff0080]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,128,0.2)]"
    },
    {
        title: "Load Balancer Simulation",
        description: "Compare load balancing algorithms. Particle-based request flow with Round-robin, Least-connections, and IP-hash strategies.",
        icon: <Network className="w-10 h-10 text-[#00f3ff]" />,
        tech: "Particle System",
        link: "/apps/load-balancer",
        color: "border-[#00f3ff]/20 hover:border-[#00f3ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]"
    },
];

export function Infrastructure() {
    return (
        <section id="infrastructure" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-[#ff0080]/20 bg-[#ff0080]/10 px-3 py-1 text-sm font-medium text-[#ff0080] backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-[#ff0080] mr-2 animate-pulse" />
                        DevOps & Architecture
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                        INFRASTRUCTURE <span className="text-[#ff0080]">SIMULATIONS</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                        System architecture demos, rate limiting strategies, and distributed systems
                        patterns visualized in real-time.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center">
                    {infrastructureApps.map((app, index) => (
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

                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#ff0080] transition-colors">
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
