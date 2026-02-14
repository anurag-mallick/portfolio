"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const skillClusters = [
    {
        id: "product",
        name: "Product & Strategy",
        x: 20, y: 30,
        skills: ["Product Ownership", "Roadmapping", "Agile/Scrum", "User Research", "Data Analytics", "Requirement Gathering", "Stakeholder Alignment", "Design Thinking"]
    },
    {
        id: "tech",
        name: "Technical Tools",
        x: 80, y: 30,
        skills: ["Jira", "Figma", "SQL", "Tableau", "PowerBI", "Balsamiq", "SPSS", "QlikSense", "Python (Basic)", "Linear", "Notion"]
    },
    {
        id: "domain",
        name: "Domain Expertise",
        x: 50, y: 70,
        skills: ["Payroll Systems", "Global EOR", "Tax Compliance", "Fintech Architecture", "AI Automation", "API Strategy", "SaaS Ecosystems"]
    },
    {
        id: "core",
        name: "Core Competencies",
        x: 50, y: 40, // Central node
        skills: ["Product Strategy", "Roadmapping", "Stakeholder Mgmt", "Agile Leadership", "System Design", "User Research", "Data Analytics"]
    }
];

export function Skills() {
    const [activeCluster, setActiveCluster] = useState<string | null>(null);

    return (
        <section id="skills" className="py-24 bg-background relative overflow-hidden min-h-[800px] flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <div className="container px-4 md:px-6 relative z-10 w-full h-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
                        Skills & <span className="text-primary">Competencies</span>
                    </h2>
                    <p className="text-muted-foreground mt-4">
                        Comprehensive toolkit spanning product, technology, and domain expertise.
                    </p>
                </div>

                <div className="relative w-full aspect-square max-w-[800px] mx-auto hidden md:block">
                    {/* SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M 20% 30% L 50% 40% L 80% 30% M 50% 40% L 50% 70%"
                            stroke="rgba(0, 243, 255, 0.2)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {activeCluster === "product" && (
                            <motion.path d="M 20% 30% L 50% 40%" stroke="rgba(0, 243, 255, 0.8)" strokeWidth="4" />
                        )}
                        {activeCluster === "tech" && (
                            <motion.path d="M 80% 30% L 50% 40%" stroke="rgba(0, 243, 255, 0.8)" strokeWidth="4" />
                        )}
                        {activeCluster === "domain" && (
                            <motion.path d="M 50% 70% L 50% 40%" stroke="rgba(0, 243, 255, 0.8)" strokeWidth="4" />
                        )}
                    </svg>

                    {skillClusters.map((cluster) => (
                        <div
                            key={cluster.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
                        >
                            <motion.div
                                className={cn(
                                    "relative w-24 h-24 rounded-full flex items-center justify-center text-center p-2 cursor-pointer transition-all duration-300 backdrop-blur-md glass border border-primary/30",
                                    activeCluster === cluster.id ? "scale-125 border-primary shadow-[0_0_30px_rgba(0,243,255,0.4)] bg-primary/20" : "hover:scale-110 hover:border-primary/60"
                                )}
                                onClick={() => setActiveCluster(activeCluster === cluster.id ? null : cluster.id)}
                                onHoverStart={() => setActiveCluster(cluster.id)}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                            >
                                <span className="text-xs font-bold">{cluster.name}</span>

                                {/* Orbiting particles */}
                                <div className="absolute inset-0 rounded-full animate-spin-slow border-t border-primary/50 opacity-0 hover:opacity-100 transition-opacity" />
                            </motion.div>

                            {/* Expanded Skills */}
                            {activeCluster === cluster.id && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full pt-4 w-80 pointer-events-none z-20">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-wrap justify-center gap-2 bg-black/80 p-4 rounded-lg border border-primary/20 backdrop-blur-xl"
                                    >
                                        {cluster.skills.map((skill, i) => (
                                            <span key={i} className="bg-primary/10 border border-primary/40 text-primary text-xs px-2 py-1 rounded-full shadow-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Fallback - Grid List */}
                <div className="grid grid-cols-1 md:hidden gap-6">
                    {skillClusters.map((cluster) => (
                        <div key={cluster.id} className="border border-white/10 p-6 rounded-lg bg-white/5">
                            <h3 className="text-lg font-bold mb-4 text-primary">{cluster.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cluster.skills.map((skill, i) => (
                                    <span key={i} className="bg-white/5 px-2 py-1 rounded text-sm text-muted-foreground">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
