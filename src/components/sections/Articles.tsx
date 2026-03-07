"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ExternalLink, BookOpen, Quote, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-[72px] left-0 right-0 h-1 bg-primary origin-left z-[100]"
            style={{ scaleX }}
        />
    );
}

function ThoughtPulse() {
    return (
        <div className="relative inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 rounded-2xl blur-md"
            />
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-primary/20 rounded-2xl border-dashed"
            />
            <Brain className="relative z-10 w-8 h-8" />
        </div>
    );
}

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
        <section id="articles" className="theme-section bg-background">
            <ReadingProgress />
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
                    <ThoughtPulse />
                    <div className="meta-label text-center">Thought Leadership</div>
                    <h2 className="h2-premium">
                        STRATEGIC <span className="text-primary">INSIGHTS</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg leading-relaxed">
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

                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                                    {article.readTime}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-all duration-500 leading-tight tracking-tight">
                                {article.title}
                            </h3>

                            <p className="text-foreground/70 mb-8 line-clamp-3 leading-relaxed flex-grow text-sm">
                                {article.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {article.tags.map((tag) => (
                                    <span key={tag} className="glass-pill">
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
                                <Button className="w-full group/btn bg-primary/10 hover:bg-primary text-primary hover:text-black border-primary/20 transition-all duration-500 font-bold tracking-widest text-[10px] h-12 uppercase">
                                    READ ARTICLE
                                    <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Button>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
