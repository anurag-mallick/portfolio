"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Cpu, Database, Globe, Users, Code, PenTool, BarChart, HardHat, Share2 } from "lucide-react";

function StakeholderNetwork() {
    return (
        <div className="relative w-48 h-48 mx-auto mb-12 hidden lg:flex items-center justify-center">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-primary/20 rounded-full" 
            />
            <div className="relative z-10 w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
            </div>
            
            {[
                { icon: Code, label: "Eng", angle: 0 },
                { icon: PenTool, label: "Design", angle: 90 },
                { icon: BarChart, label: "Sales", angle: 180 },
                { icon: HardHat, label: "Leadership", angle: 270 }
            ].map((node, i) => {
                const x = Math.cos((node.angle * Math.PI) / 180) * 70;
                const y = Math.sin((node.angle * Math.PI) / 180) * 70;
                return (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="absolute flex flex-col items-center"
                        style={{ x, y }}
                    >
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                            <node.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-[8px] font-bold text-muted-foreground uppercase mt-1">{node.label}</span>
                    </motion.div>
                );
            })}
            
            {/* Connection Lines (Simplified) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-0 w-full h-px bg-primary/30" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-primary/30" />
            </div>
        </div>
    );
}

export const projects = [
    {
        title: "AI-Powered Reconciliation System",
        category: "Fintech Automation",
        icon: <Cpu className="w-6 h-6 text-primary" />,
        priority: "Big Bet",
        metrics: [
            { label: "Accuracy", value: "99.8%" },
            { label: "Effort Reduction", value: "60%" }
        ],
        description: "ML-based reconciliation tool for payroll and financial data. Integrated LLM for automated transaction details extraction from uploaded documents.",
        tech: ["Python", "Machine Learning", "LLM", "Data Processing"]
    },
    {
        title: "EOR Platform Development",
        category: "Global Payroll",
        icon: <Globe className="w-6 h-6 text-secondary" />,
        priority: "Big Bet",
        metrics: [
            { label: "ARR", value: "€275,000+" },
            { label: "Compliance Risk", value: "-40%" }
        ],
        description: "Built a no-code Employer of Record (EOR) and global payroll platform supporting US & EU markets. Scaled to 500+ clients.",
        tech: ["SaaS", "Compliance", "Global Payroll", "No-Code"]
    },
    {
        title: "Logistics Solutions Delivery",
        category: "Supply Chain",
        icon: <Database className="w-6 h-6 text-accent" />,
        priority: "Core Ops",
        metrics: [
            { label: "Serviceability", value: "95%" },
            { label: "Order Mismatch", value: "<0.5%" }
        ],
        description: "Owned product lifecycle for logistics solutions at Shiprocket, achieving significant serviceability improvement and cost savings.",
        tech: ["Logistics", "API Integration", "Analytics", "Operations"]
    },
    {
        title: "Hyperlocal Delivery Opt.",
        category: "Logistics",
        icon: <ArrowUpRight className="w-6 h-6 text-green-400" />,
        priority: "Quick Win",
        metrics: [
            { label: "Map API Costs", value: "-83%" },
            { label: "Monthly Saving", value: "₹5 Lakhs" }
        ],
        description: "Optimized Google Maps API usage for a fashion retailer, significantly cutting operational costs while maintaining high service standards.",
        tech: ["Cost Optimization", "Google Maps API", "Performance"]
    },
    {
        title: "Returns CRM Tool",
        category: "Customer Experience",
        icon: <ArrowUpRight className="w-6 h-6 text-blue-400" />,
        priority: "Quick Win",
        metrics: [
            { label: "NPS", value: "+35%" },
            { label: "Bad Returns", value: "-30%" }
        ],
        description: "Custom returns management tool with unboxing video integration to validate returns and improve customer trust scores.",
        tech: ["CRM", "UX Optimization", "Video Integration"]
    }
];

export function Projects() {
    return (
        <section id="projects" className="theme-section bg-background relative overflow-hidden">
            {/* Background Scanner Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] animate-scan" />

            <div className="theme-container relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                            System <span className="text-primary">Deployments</span>
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            High-impact technical projects and platform builds, prioritized for maximum ROI.
                        </p>
                    </div>
                    <StakeholderNetwork />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="theme-card h-full group hover:bg-primary/5 transition-all duration-500 flex flex-col">
                                <div className="p-6 md:p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-4">
                                            <div className="bg-muted p-3 rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                                                {project.icon}
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                                                    {project.priority}
                                                </div>
                                                <div className="text-xs font-mono text-muted-foreground/60">
                                                    SYS_ACTIVE
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:text-primary transition-colors">
                                            <Share2 className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-primary mb-4">{project.category}</p>

                                    <p className="text-muted-foreground mb-6 flex-grow min-h-[80px]">
                                        {project.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i} className="bg-black/40 p-3 rounded border border-white/5">
                                                <div className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</div>
                                                <div className="text-xl font-bold text-white">{metric.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-[10px] uppercase bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
