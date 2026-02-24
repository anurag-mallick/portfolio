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
    {
        title: "Food Delivery Express",
        description: "Comprehensive food ordering and delivery UI. Real-time order tracking simulation, restaurant browsing, and dynamic cart management.",
        icon: <Truck className="w-12 h-12" />,
        tech: "React, Framer Motion",
        link: "/apps/food-delivery",
        color: "#00f3ff",
        category: "Logistics"
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
