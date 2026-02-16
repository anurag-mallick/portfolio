"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, TrendingDown, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const logisticsApps = [
    {
        title: "Last-Mile Route Optimizer",
        description: "Visual comparison of routing algorithms. Compare Nearest Neighbor vs 2-Opt vs Genetic Algorithm with animated path rendering.",
        icon: <Truck className="w-10 h-10 text-[#00ff99]" />,
        tech: "TSP Algorithms",
        link: "/apps/route-optimizer",
        color: "border-[#00ff99]/20 hover:border-[#00ff99]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,255,153,0.2)]"
    },
    {
        title: "Delivery Density Heatmap",
        description: "Simulate how order clustering affects per-unit cost. Interactive grid with density color-coding and cost metrics.",
        icon: <MapPin className="w-10 h-10 text-[#ffff00]" />,
        tech: "Heatmap, Voronoi",
        link: "/apps/delivery-heatmap",
        color: "border-[#ffff00]/20 hover:border-[#ffff00]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]"
    },
    {
        title: "Returns Prediction Model",
        description: "ML model predicting return probability based on product category, price, and customer history with confidence scores.",
        icon: <TrendingDown className="w-10 h-10 text-[#ff6b6b]" />,
        tech: "ML, Prediction",
        link: "/apps/returns-prediction",
        color: "border-[#ff6b6b]/20 hover:border-[#ff6b6b]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,107,107,0.2)]"
    },
    {
        title: "3PL Cost Comparator",
        description: "Compare shipping costs across carriers (FedEx, UPS, DHL, USPS) with zone-based pricing and bulk discounts.",
        icon: <Package className="w-10 h-10 text-[#00d4ff]" />,
        tech: "Cost Analysis",
        link: "/apps/3pl-comparator",
        color: "border-[#00d4ff]/20 hover:border-[#00d4ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
    },
];

export function LogisticsLab() {
    return (
        <section id="logistics-lab" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-[#00ff99]/20 bg-[#00ff99]/10 px-3 py-1 text-sm font-medium text-[#00ff99] backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-[#00ff99] mr-2 animate-pulse" />
                        Supply Chain Optimization
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                        LOGISTICS <span className="text-[#00ff99]">LAB</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                        Advanced routing algorithms, delivery optimization, and returns analytics
                        from Shiprocket experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center">
                    {logisticsApps.map((app, index) => (
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

                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00ff99] transition-colors">
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
