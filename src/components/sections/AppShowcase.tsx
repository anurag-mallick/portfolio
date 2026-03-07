"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { allApps, type AppDetail } from "@/lib/data/apps";

function SystemStatusTerminal() {
    const [logs, setLogs] = useState<string[]>(["INITIALIZING CORE V4.0...", "LATENCY_CHECK: 14ms", "AUTH_STATUS: VERIFIED"]);
    
    useEffect(() => {
        const messages = [
            "SCANNING_VULNERABILITIES...",
            "RECONCILING_FINANCIAL_DATA...",
            "OPTIMIZING_TRAFFIC_FLOW...",
            "UPDATING_PAYROLL_ENGINE...",
            "SYSCALL_READY"
        ];
        const timer = setInterval(() => {
            setLogs(prev => [...prev.slice(-4), messages[Math.floor(Math.random() * messages.length)]]);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute bottom-4 right-8 z-10 hidden md:block">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-3 font-mono text-[8px] text-primary/70 w-40 shadow-2xl">
                <div className="flex items-center gap-1.5 mb-2 border-b border-white/5 pb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    <span className="ml-auto text-[6px] opacity-40 uppercase tracking-tighter">sys_log</span>
                </div>
                <div className="space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="opacity-30">[{new Date().toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit'})}]</span>
                            <span className="truncate">{log}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ModularGridGlow() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-1 bg-primary/20 blur-xl rounded-3xl pointer-events-none z-0"
        />
    );
}

export function AppShowcase() {
    const [selectedApp, setSelectedApp] = useState<AppDetail>(allApps[0]);
    const categories = Array.from(new Set(allApps.map(app => app.category)));

    return (
        <section id="apps" className="py-24 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />

            {/* Dynamic Background Glow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedApp.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 70% 50%, ${selectedApp.color}, transparent 40%)`
                    }}
                />
            </AnimatePresence>

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                        Interactive Portfolio
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
                        THE <span className="text-primary italic">LAB</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[600px] text-lg">
                        A centralized showcase of enterprise tools, financial simulators,
                        and recursive logic games. Hover to investigate.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Pane: App List */}
                    <div className="lg:col-span-4 space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                        {categories.map((category) => (
                            <div key={category} className="space-y-3">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black px-2">
                                    {category}
                                </h3>
                                <div className="space-y-1">
                                    {allApps.filter(app => app.category === category).map((app) => (
                                        <motion.button
                                            key={app.title}
                                            onMouseEnter={() => setSelectedApp(app)}
                                            onClick={() => setSelectedApp(app)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group relative flex items-center justify-between ${selectedApp.title === app.title
                                                ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <span className="font-medium truncate mr-4">{app.title}</span>
                                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${selectedApp.title === app.title ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                                                }`} />

                                            {selectedApp.title === app.title && (
                                                <motion.div
                                                    layoutId="active-indicator"
                                                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Pane: Details */}
                    <div className="lg:col-span-8 sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedApp.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-zinc-900/40 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden group"
                            >
                                <ModularGridGlow />
                                <SystemStatusTerminal />
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500" style={{ color: selectedApp.color }}>
                                            {selectedApp.icon}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Architecture</span>
                                            <span className="text-white font-mono text-sm border border-white/10 px-3 py-1 rounded-full bg-black/50">
                                                {selectedApp.tech}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter">
                                        {selectedApp.title.split(' ').map((word, i) => (
                                            <span key={i} className={i === selectedApp.title.split(' ').length - 1 ? "text-primary" : ""}>
                                                {word}{' '}
                                            </span>
                                        ))}
                                    </h3>

                                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
                                        {selectedApp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link href={selectedApp.link} className="flex-1 min-w-[200px]">
                                            <Button className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] group">
                                                LAUNCH MODULE
                                                <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="h-14 px-8 border-white/10 hover:bg-white/5 text-white">
                                            VIEW DOCS
                                        </Button>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                                        <span>Status: Stable 2.4.0</span>
                                        <span>Latency: 14ms</span>
                                        <span>License: MIT Enterprise</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </section>
    );
}
