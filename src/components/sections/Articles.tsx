"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";

const articles = [
    {
        title: "From Chaos to Clarity: How We Solved Serviceability Issues for Major Brands",
        description: "An in-depth look at how we optimized logistics serviceability for top fashion and electronics brands, reducing order status mismatches and improving delivery TAT.",
        link: "https://www.linkedin.com/pulse/from-chaos-clarity-how-we-solved-serviceability-issues-anurag-mallick-etdvc/",
        date: "LinkedIn Article",
        readTime: "6 min read",
        tags: ["Logistics", "Operations", "Optimization"]
    },
    {
        title: "How Real-Time Dashboards Transformed Decision-Making at Shiprocket Omuni",
        description: "Exploring the impact of real-time data visualization on operational efficiency and strategic decision-making in high-scale logistics environments.",
        link: "https://www.linkedin.com/pulse/how-real-time-dashboards-transformed-decision-making-omuni-mallick-cmwdc/",
        date: "LinkedIn Article",
        readTime: "5 min read",
        tags: ["Data Analytics", "Product Management", "SaaS"]
    }
];

export function Articles() {
    return (
        <section id="articles" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -ml-48 -mb-48" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Thought Leadership
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                        STRATEGIC <span className="text-primary">INSIGHTS</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                        Deep dives into logistics optimization, data architecture, and
                        scaling product operations at industry-leading companies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/60 transition-all duration-500 hover:border-primary/30 h-full flex flex-col"
                        >
                            <div className="absolute top-8 right-8 text-white/5 group-hover:text-primary/10 transition-colors">
                                <Quote className="w-16 h-16" />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                    {article.date} • {article.readTime}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors leading-tight">
                                {article.title}
                            </h3>

                            <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed flex-grow">
                                {article.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {article.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto"
                            >
                                <Button className="w-full group/btn bg-white/5 hover:bg-primary hover:text-primary-foreground border-white/10 transition-all duration-300">
                                    READ ARTICLE
                                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Button>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
