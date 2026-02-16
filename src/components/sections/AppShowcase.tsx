"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe, Rocket, Brain, PieChart, Activity, TrendingUp, GitBranch,
    LayoutGrid, Zap, MousePointerClick, Gamepad2, Disc, Keyboard, Lock, Grid,
    DollarSign, FileSearch, Calendar, Code, Gauge, Database, Network, Flag,
    Truck, MapPin, TrendingDown, Package, Shield, ExternalLink, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface AppDetail {
    title: string;
    description: string;
    icon: React.ReactNode;
    tech: string;
    link: string;
    color: string;
    category: string;
}

const allApps: AppDetail[] = [
    // Enterprise Solutions
    {
        title: "Global Payroll What-If Studio",
        description: "Macro-economic stress-testing for global workforces. Model FX volatility, tax law shifts, and headcount growth across 150+ countries.",
        icon: <Globe className="w-12 h-12" />,
        tech: "Three.js, Scenario Modeling",
        link: "/apps/payroll-whatif",
        color: "#00f3ff",
        category: "Enterprise"
    },
    {
        title: "EOR Strategy Decision Engine",
        description: "AI-driven expansion modeling. Identify optimal legal structures and visualize complex money flows with custom Sankey diagrams.",
        icon: <Rocket className="w-12 h-12" />,
        tech: "Sankey Flow, Logic Engine",
        link: "/apps/eor-decision",
        color: "#ff00ff",
        category: "Enterprise"
    },
    {
        title: "LLM Payroll Document Intel",
        description: "Multi-doc AI audit engine. Automated extraction and 99.8% accurate reconciliation across payslips, contracts, and bank statements.",
        icon: <Brain className="w-12 h-12" />,
        tech: "LLM Simulator, OCR Logic",
        link: "/apps/payroll-ai",
        color: "#9d50bb",
        category: "Enterprise"
    },
    {
        title: "Procurement Risk Monte Carlo",
        description: "Probabilistic tender evaluation. Run 5,000+ simulations to analyze award sensitivity and mitigate government contract litigation risk.",
        icon: <PieChart className="w-12 h-12" />,
        tech: "Chart.js, Monte Carlo",
        link: "/apps/procurement-mc",
        color: "#ffff00",
        category: "Enterprise"
    },
    {
        title: "Returns Intelligence Lab",
        description: "Reverse logistics fraud detection. Visual unboxing audits paired with real-time NPS impact and bad return rate analytics.",
        icon: <Activity className="w-12 h-12" />,
        tech: "Frame Sequencer, NPS Logic",
        link: "/apps/returns-lab",
        color: "#ff0080",
        category: "Enterprise"
    },
    {
        title: "Compound Interest Simulator",
        description: "High-fidelity financial projection tool. Adjust principal, rate, and time sliders to trigger particle effects for exponential wealth generation.",
        icon: <TrendingUp className="w-12 h-12" />,
        tech: "Canvas API, Finance.js",
        link: "/apps/compound",
        color: "#00f3ff",
        category: "Enterprise"
    },
    // Fintech
    {
        title: "Multi-Country Tax Calculator",
        description: "Compare employer costs across 15 countries. Interactive tax breakdown with pie charts and social security calculations.",
        icon: <DollarSign className="w-12 h-12" />,
        tech: "Chart.js, Tax Data",
        link: "/apps/tax-calculator",
        color: "#00f3ff",
        category: "Fintech"
    },
    {
        title: "FX Hedging Simulator",
        description: "Model currency risk for payroll exposures. Monte Carlo simulations with 95% VaR calculation and hedging cost analysis.",
        icon: <TrendingUp className="w-12 h-12" />,
        tech: "Monte Carlo, Canvas",
        link: "/apps/fx-hedging",
        color: "#ff00ff",
        category: "Fintech"
    },
    {
        title: "Invoice Anomaly Detector",
        description: "ML-powered invoice validation detecting duplicate payments, pricing anomalies, and vendor fraud patterns.",
        icon: <FileSearch className="w-12 h-12" />,
        tech: "ML, Pattern Recognition",
        link: "/apps/invoice-anomaly",
        color: "#ff6b00",
        category: "Fintech"
    },
    {
        title: "Compliance Deadline Tracker",
        description: "Multi-country compliance calendar with automated reminders for tax filings, audits, and regulatory deadlines.",
        icon: <Calendar className="w-12 h-12" />,
        tech: "date-fns, Notifications",
        link: "/apps/compliance-tracker",
        color: "#00ff99",
        category: "Fintech"
    },
    {
        title: "LLM Cost Optimizer",
        description: "Compare GPT-4, Claude, Gemini costs across 1M+ tokens with caching strategies and batch processing savings.",
        icon: <Brain className="w-12 h-12" />,
        tech: "Cost Analysis, Charts",
        link: "/apps/llm-cost",
        color: "#ffff00",
        category: "Fintech"
    },
    {
        title: "Prompt Engineering Lab",
        description: "Interactive playground for testing prompts with token counting, cost estimation, and response comparison.",
        icon: <Code className="w-12 h-12" />,
        tech: "Monaco Editor, API",
        link: "/apps/prompt-lab",
        color: "#a855f7",
        category: "Fintech"
    },
    // Logistics
    {
        title: "Last-Mile Route Optimizer",
        description: "Visual comparison of routing algorithms. Compare Nearest Neighbor vs 2-Opt vs Genetic Algorithm with animated path rendering.",
        icon: <Truck className="w-12 h-12" />,
        tech: "TSP Algorithms",
        link: "/apps/route-optimizer",
        color: "#00ff99",
        category: "Logistics"
    },
    {
        title: "Returns Prediction Model",
        description: "ML model predicting return probability based on product category, price, and customer history with confidence scores.",
        icon: <TrendingDown className="w-12 h-12" />,
        tech: "ML, Prediction",
        link: "/apps/returns-prediction",
        color: "#ff6b6b",
        category: "Logistics"
    },
    {
        title: "Delivery Density Heatmap",
        description: "Simulate how order clustering affects per-unit cost. Interactive grid with density color-coding and cost metrics.",
        icon: <MapPin className="w-12 h-12" />,
        tech: "Heatmap, Voronoi",
        link: "/apps/delivery-heatmap",
        color: "#ffff00",
        category: "Logistics"
    },
    {
        title: "3PL Cost Comparator",
        description: "Compare shipping costs across carriers (FedEx, UPS, DHL, USPS) with zone-based pricing and bulk discounts.",
        icon: <Package className="w-12 h-12" />,
        tech: "Cost Analysis",
        link: "/apps/3pl-comparator",
        color: "#00d4ff",
        category: "Logistics"
    },
    // Infrastructure
    {
        title: "API Rate Limit Visualizer",
        description: "Simulate different throttling strategies. Compare Token bucket vs Leaky bucket vs Fixed window with animated request queues.",
        icon: <Gauge className="w-12 h-12" />,
        tech: "Token Bucket",
        link: "/apps/rate-limiter",
        color: "#ff0080",
        category: "Infrastructure"
    },
    {
        title: "Load Balancer Simulation",
        description: "Compare load balancing algorithms. Particle-based request flow with Round-robin, Least-connections, and IP-hash strategies.",
        icon: <Network className="w-12 h-12" />,
        tech: "Particle System",
        link: "/apps/load-balancer",
        color: "#00f3ff",
        category: "Infrastructure"
    },
    {
        title: "Database Query Planner",
        description: "Visualize SQL query execution plans with index usage, join strategies, and performance cost estimates.",
        icon: <Database className="w-12 h-12" />,
        tech: "SQL, Visualization",
        link: "/apps/db-query-planner",
        color: "#9b59b6",
        category: "Infrastructure"
    },
    {
        title: "Feature Flag Impact Calculator",
        description: "Simulate feature rollout strategies with A/B testing, gradual rollout percentages, and impact metrics.",
        icon: <Flag className="w-12 h-12" />,
        tech: "A/B Testing",
        link: "/apps/feature-flag",
        color: "#e74c3c",
        category: "Infrastructure"
    },
    // Algorithms
    {
        title: "Git Branching Strategy Game",
        description: "Interactive Git repository visualizer. D3 force-directed graph with commit, branch, merge, and rebase operations.",
        icon: <GitBranch className="w-12 h-12" />,
        tech: "D3.js Graph",
        link: "/apps/git-branching",
        color: "#ff00ff",
        category: "Algorithms"
    },
    {
        title: "Pathfinding Visualizer",
        description: "Interactive shortest-path algorithm visualizer. Draw walls and watch BFS explore the grid in real-time with animated path discovery.",
        icon: <Grid className="w-12 h-12" />,
        tech: "BFS Algorithm",
        link: "/apps/pathfinding",
        color: "#ff0080",
        category: "Algorithms"
    },
    {
        title: "Circuit Breaker Pattern",
        description: "Microservices resilience pattern demo. State machine visualization with request flow animation and failure detection.",
        icon: <Zap className="w-12 h-12" />,
        tech: "State Machine",
        link: "/apps/circuit-breaker",
        color: "#ffff00",
        category: "Algorithms"
    },
    {
        title: "Auto-Scaling Simulator",
        description: "Visualize horizontal pod autoscaling with CPU/memory metrics, scale-up/down delays, and cost optimization.",
        icon: <TrendingUp className="w-12 h-12" />,
        tech: "K8s, Metrics",
        link: "/apps/auto-scaling",
        color: "#2ecc71",
        category: "Algorithms"
    },
    {
        title: "Multi-Tenant Data Isolation",
        description: "Compare database isolation strategies: shared schema, separate schema, and separate database with security analysis.",
        icon: <Shield className="w-12 h-12" />,
        tech: "Security, DB",
        link: "/apps/multi-tenant",
        color: "#3498db",
        category: "Algorithms"
    },
    // Games
    {
        title: "Neon Tetris",
        description: "Classic pattern recognition logic. Stack blocks efficiently in a high-fidelity cyberpunk environment.",
        icon: <LayoutGrid className="w-12 h-12" />,
        tech: "React, Canvas",
        link: "/apps/tetris",
        color: "#00f3ff",
        category: "Games"
    },
    {
        title: "Neon Pong",
        description: "High-speed reflex testing. Defeat the AI opponent in a zero-latency physics-simulated arena.",
        icon: <Zap className="w-12 h-12" />,
        tech: "Physics Engine",
        link: "/apps/ping-pong",
        color: "#ff0080",
        category: "Games"
    },
    {
        title: "Neon Arkanoid",
        description: "Ballistics simulation. Destroy all blocks using a physics-driven paddle and ball mechanism.",
        icon: <MousePointerClick className="w-12 h-12" />,
        tech: "Collision Logic",
        link: "/apps/arkanoid",
        color: "#ffff00",
        category: "Games"
    },
    {
        title: "Cyber Serpent",
        description: "Recursive data structure visualization. Grow the array without colliding with the grid boundaries.",
        icon: <Gamepad2 className="w-12 h-12" />,
        tech: "Queue Logic",
        link: "/apps/snake",
        color: "#00ff99",
        category: "Games"
    },
    {
        title: "Void Defender",
        description: "Standard firewall protocols. Eliminate incoming packets to protect the system core.",
        icon: <Zap className="w-12 h-12" />,
        tech: "Object Pooling",
        link: "/apps/space-invaders",
        color: "#ff0000",
        category: "Games"
    },
    {
        title: "Data Merge 2048",
        description: "Binary accumulation. Merge data packets to overflow the stack and reach the maximum value.",
        icon: <Brain className="w-12 h-12" />,
        tech: "Grid State",
        link: "/apps/2048",
        color: "#ff00ff",
        category: "Games"
    },
    {
        title: "Vector Void",
        description: "Trajectory simulation. Navigate the zero-gravity field and avoid system debris.",
        icon: <Disc className="w-12 h-12" />,
        tech: "Vector Math",
        link: "/apps/asteroids",
        color: "#00f3ff",
        category: "Games"
    },
    {
        title: "Syntax Defense",
        description: "Input verification. Type fast to prevent buffer overflow and secure the terminal.",
        icon: <Keyboard className="w-12 h-12" />,
        tech: "Event Listeners",
        link: "/apps/speed-typer",
        color: "#ffff00",
        category: "Games"
    },
    {
        title: "Pattern Lock",
        description: "Sequence authentication. Replicate the memory key to bypass the security encryption.",
        icon: <Lock className="w-12 h-12" />,
        tech: "Async/Await",
        link: "/apps/memory",
        color: "#ff0080",
        category: "Games"
    },
    {
        title: "Logic Grid",
        description: "Hazard detection algorithm. Flag the corruption in the recursive grid simulation.",
        icon: <Grid className="w-12 h-12" />,
        tech: "Recursion",
        link: "/apps/minesweeper",
        color: "#9900ff",
        category: "Games"
    }
];

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
