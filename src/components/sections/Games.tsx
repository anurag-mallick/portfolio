"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, MousePointerClick, Gamepad2, Brain, Disc, Keyboard, Zap, Lock, Grid } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const games = [
    {
        title: "Neon Tetris",
        description: "Classic pattern recognition logic. Stack blocks efficiently.",
        icon: <LayoutGrid className="w-10 h-10 text-[#00f3ff]" />,
        tech: "React, Canvas",
        link: "/apps/tetris",
        color: "border-[#00f3ff]/20 hover:border-[#00f3ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]"
    },
    {
        title: "Neon Pong",
        description: "High-speed reflex testing. Defeat the AI opponent.",
        icon: <Zap className="w-10 h-10 text-[#ff0080]" />,
        tech: "Physics Engine",
        link: "/apps/ping-pong",
        color: "border-[#ff0080]/20 hover:border-[#ff0080]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,128,0.2)]"
    },
    {
        title: "Neon Arkanoid",
        description: "Ballistics simulation. Destroy all blocks.",
        icon: <MousePointerClick className="w-10 h-10 text-[#ffff00]" />, // Placeholder icon
        tech: "Collision Logic",
        link: "/apps/arkanoid",
        color: "border-[#ffff00]/20 hover:border-[#ffff00]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]"
    },
    {
        title: "Cyber Serpent",
        description: "Recursive data structure visualization. Grow the array.",
        icon: <Gamepad2 className="w-10 h-10 text-[#00ff99]" />,
        tech: "Queue Logic",
        link: "/apps/snake",
        color: "border-[#00ff99]/20 hover:border-[#00ff99]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,255,153,0.2)]"
    },
    {
        title: "Void Defender",
        description: "Standard firewall protocols. Eliminate incoming packets.",
        icon: <Zap className="w-10 h-10 text-[#ff0000]" />,
        tech: "Object Pooling",
        link: "/apps/space-invaders",
        color: "border-[#ff0000]/20 hover:border-[#ff0000]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,0,0.2)]"
    },
    {
        title: "Data Merge 2048",
        description: "Binary accumulation. Merge data packets to overflow.",
        icon: <Brain className="w-10 h-10 text-[#ff00ff]" />,
        tech: "Grid State",
        link: "/apps/2048",
        color: "border-[#ff00ff]/20 hover:border-[#ff00ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]"
    },
    {
        title: "Vector Void",
        description: "Trajectory simulation. Navigate the zero-gravity field.",
        icon: <Disc className="w-10 h-10 text-[#00f3ff]" />,
        tech: "Vector Math",
        link: "/apps/asteroids",
        color: "border-[#00f3ff]/20 hover:border-[#00f3ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]"
    },
    {
        title: "Syntax Defense",
        description: "Input verification. Type fast to prevent buffer overflow.",
        icon: <Keyboard className="w-10 h-10 text-[#ffff00]" />,
        tech: "Event Listeners",
        link: "/apps/speed-typer",
        color: "border-[#ffff00]/20 hover:border-[#ffff00]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]"
    },
    {
        title: "Pattern Lock",
        description: "Sequence authentication. Replicate the memory key.",
        icon: <Lock className="w-10 h-10 text-[#ff0080]" />,
        tech: "Async/Await",
        link: "/apps/memory",
        color: "border-[#ff0080]/20 hover:border-[#ff0080]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(255,0,128,0.2)]"
    },
    {
        title: "Logic Grid",
        description: "Hazard detection algorithm. Flag the corruption.",
        icon: <Grid className="w-10 h-10 text-[#9900ff]" />,
        tech: "Recursion",
        link: "/apps/minesweeper",
        color: "border-[#9900ff]/20 hover:border-[#9900ff]/50",
        shadow: "hover:shadow-[0_0_30px_rgba(153,0,255,0.2)]"
    },
];

export function Games() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/5 via-black to-black opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                        INTERACTIVE <span className="text-secondary">MODULES</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[800px] mx-auto text-lg">
                        A collection of logic puzzles and simulations built to demonstrate
                        React state management, Canvas rendering, and complex event handling.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-content-center">
                    {games.map((game, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`group bg-white/5 border backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${game.color} ${game.shadow}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-lg bg-white/5 group-hover:scale-110 transition-transform duration-300">
                                    {game.icon}
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground border border-white/10 px-2 py-1 rounded">
                                    {game.tech}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                                {game.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                                {game.description}
                            </p>

                            <Link href={game.link} className="block">
                                <Button className="w-full bg-white/5 hover:bg-white/10 border-white/10 text-white group-hover:border-white/30">
                                    INITIALIZE MODULE
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
