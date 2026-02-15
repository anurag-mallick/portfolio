"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Cpu, Database, Globe } from "lucide-react";

const projects = [
    {
        title: "AI-Powered Reconciliation System",
        category: "Fintech Automation",
        icon: <Cpu className="w-6 h-6 text-primary" />,
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
        <section id="projects" className="py-24 md:py-32 bg-black relative overflow-hidden">
            {/* Background Scanner Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] animate-scan" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="mb-16 mt-8 md:mt-0">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                        System <span className="text-primary">Deployments</span>
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        High-impact technical projects and platform builds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card neon className="h-full group hover:bg-primary/5 transition-all duration-500 flex flex-col">
                                <div className="p-6 md:p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors">
                                            {project.icon}
                                        </div>
                                        <div className="text-xs font-mono text-primary/70 border border-primary/20 px-2 py-1 rounded">
                                            SYS_ACTIVE
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
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
