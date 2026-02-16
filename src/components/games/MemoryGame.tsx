"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Color = "red" | "green" | "blue" | "yellow";
const COLORS: Color[] = ["red", "green", "blue", "yellow"];

const COLOR_MAP = {
    red: { bg: "bg-red-500", glow: "shadow-[0_0_50px_rgba(239,68,68,0.5)]", active: "bg-red-400" },
    green: { bg: "bg-green-500", glow: "shadow-[0_0_50px_rgba(34,197,94,0.5)]", active: "bg-green-400" },
    blue: { bg: "bg-blue-500", glow: "shadow-[0_0_50px_rgba(59,130,246,0.5)]", active: "bg-blue-400" },
    yellow: { bg: "bg-yellow-500", glow: "shadow-[0_0_50px_rgba(234,179,8,0.5)]", active: "bg-yellow-400" },
};

export default function MemoryGame() {
    const [gameState, setGameState] = useState<"start" | "showing" | "input" | "gameover">("start");
    const [sequence, setSequence] = useState<Color[]>([]);
    const [userSequence, setUserSequence] = useState<Color[]>([]);
    const [activeColor, setActiveColor] = useState<Color | null>(null);
    const [score, setScore] = useState(0);

    const startLevel = () => {
        setGameState("showing");
        setUserSequence([]);
        const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const nextSequence = [...sequence, nextColor];
        setSequence(nextSequence);
        playSequence(nextSequence);
    };

    const playSequence = async (seq: Color[]) => {
        for (let i = 0; i < seq.length; i++) {
            await new Promise(r => setTimeout(r, 500));
            setActiveColor(seq[i]);
            await new Promise(r => setTimeout(r, 500));
            setActiveColor(null);
        }
        setGameState("input");
    };

    const handleInput = (color: Color) => {
        if (gameState !== "input") return;

        // Flash the clicked color temporarily
        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 200);

        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);

        if (color !== sequence[newUserSequence.length - 1]) {
            setGameState("gameover");
            return;
        }

        if (newUserSequence.length === sequence.length) {
            setScore(prev => prev + 1);
            setGameState("showing");
            setTimeout(startLevel, 1000);
        }
    };

    const initGame = () => {
        setScore(0);
        setSequence([]);
        setUserSequence([]);
        setGameState("start");
        // Actually start immediately after a tiny delay to reset properly
        setTimeout(() => {
            setSequence([]);
            startLevel();
        }, 100);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors z-50">
                <ArrowLeft size={20} />
                Back to Portfolio
            </Link>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                    PATTERN <span className="text-primary">LOCK</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Sequence Replication v2.0</p>
            </motion.div>

            <div className="relative">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    {COLORS.map((color) => (
                        <div
                            key={color}
                            onClick={() => handleInput(color)}
                            className={`
                                w-32 h-32 md:w-48 md:h-48 rounded-2xl cursor-pointer transition-all duration-100 ease-in-out border-4 border-transparent
                                ${activeColor === color ? `${COLOR_MAP[color].active} ${COLOR_MAP[color].glow} scale-95 border-white` : `${COLOR_MAP[color].bg} opacity-30 hover:opacity-50`}
                            `}
                        />
                    ))}
                </div>

                {/* Center Status */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md rounded-full w-24 h-24 flex items-center justify-center border border-white/10">
                        <span className="text-2xl font-black">{score}</span>
                    </div>
                </div>

                <AnimatePresence>
                    {gameState === "start" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-[-50px] bg-black/90 flex flex-col items-center justify-center backdrop-blur-sm z-20 rounded-xl"
                        >
                            <Button variant="neon" size="lg" onClick={initGame} className="bg-primary hover:bg-primary/80 border-primary">
                                <Play className="mr-2 h-4 w-4" />
                                UNLOCK
                            </Button>
                        </motion.div>
                    )}

                    {gameState === "gameover" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-[-50px] bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-20 rounded-xl"
                        >
                            <div className="text-center mb-6">
                                <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">ACCESS DENIED</h2>
                                <p className="text-secondary text-sm font-bold">SEQUENCE LENGTH: {score}</p>
                            </div>
                            <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                RETRY AUTH
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-16 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;Memory allocation is specific and sequential. Do not deviate.&quot;
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-muted-foreground">
                    <span className={`w-2 h-2 rounded-full ${gameState === 'showing' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}></span>
                    {gameState === 'showing' ? 'OBSERVING SEQUENCE...' : gameState === 'input' ? 'AWAITING INPUT' : 'SYSTEM IDLE'}
                </div>
            </div>
        </div>
    );
}
