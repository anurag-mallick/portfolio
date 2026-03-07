import {
    Globe, Rocket, Brain, PieChart, Activity, TrendingUp, GitBranch,
    LayoutGrid, Zap, MousePointerClick, Gamepad2, Disc, Keyboard, Lock, Grid,
    DollarSign, FileSearch, Calendar, Code, Shield, ExternalLink, ArrowRight,
    Truck, MapPin, TrendingDown, Package, Gauge, Network, Flag
} from "lucide-react";
import React from 'react';

export interface AppDetail {
    title: string;
    description: string;
    icon: React.ReactNode;
    tech: string;
    link: string;
    color: string;
    category: string;
}

export const allApps: AppDetail[] = [
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
    // Fintech
    {
        title: "Sentinel Fraud Intelligence",
        description: "Real-time transaction stream analysis. Heuristic and behavioral scoring to flag high-risk transfers and AML anomalies.",
        icon: <Shield className="w-12 h-12" />,
        tech: "Recharts, Logic Engine",
        link: "/apps/fraud-detection",
        color: "#00f3ff",
        category: "Fintech"
    },
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
        title: "Invoice Anomaly Detector",
        description: "ML-powered invoice validation detecting duplicate payments, pricing anomalies, and vendor fraud patterns.",
        icon: <FileSearch className="w-12 h-12" />,
        tech: "ML, Pattern Recognition",
        link: "/apps/invoice-anomaly",
        color: "#ff6b00",
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
    // Logistics
    {
        title: "Supply Chain Digital Twin",
        description: "Global logistics resilience simulator. Analyze the ripple effect of maritime storms, port closures, and route congestion.",
        icon: <Globe className="w-12 h-12" />,
        tech: "SVG Maps, Resilience Logic",
        link: "/apps/supply-chain-twin",
        color: "#00ff99",
        category: "Logistics"
    },
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
    }
,
];
