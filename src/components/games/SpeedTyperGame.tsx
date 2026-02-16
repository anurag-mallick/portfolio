"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const WORDS = [
    "REACT", "NEXTJS", "TYPESCRIPT", "TAILWIND", "COMPONENT", "HOOK", "STATE", "EFFECT",
    "FUNCTION", "VARIABLE", "CONST", "LET", "ACYNC", "AWAIT", "PROMISE", "INTERFACE",
    "TYPE", "ENUM", "CLASS", "OBJECT", "ARRAY", "STRING", "NUMBER", "BOOLEAN", "VOID",
    "NULL", "UNDEFINED", "ANY", "NEVER", "UNKNOWN", "MODULE", "EXPORT", "IMPORT",
    "SERVER", "CLIENT", "API", "REST", "GRAPHQL", "DATABASE", "PRISMA", "DOCKER",
    "DEPLOY", "VERCEL", "GIT", "GITHUB", "BRANCH", "COMMIT", "PUSH", "PULL", "MERGE"
];

type Word = {
    id: number;
    text: string;
    x: number;
    y: number;
    speed: number;
};

export default function SpeedTyperGame() {
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
    const [score, setScore] = useState(0);
    const [input, setInput] = useState("");
    const [words, setWords] = useState<Word[]>([]);

    // Refs for mutable state in loop
    const wordsRef = useRef<Word[]>([]);
    const nextId = useRef(0);
    const scoreRef = useRef(0);
    const animationFrameId = useRef<number>(0);
    const lastSpawnTime = useRef(0);
    const spawnRate = useRef(2000);

    const initGame = () => {
        setScore(0);
        scoreRef.current = 0;
        setInput("");
        wordsRef.current = [];
        setWords([]);
        nextId.current = 0;
        spawnRate.current = 2000;
        setGameState("playing");
    };

    const spawnWord = () => {
        const text = WORDS[Math.floor(Math.random() * WORDS.length)];
        const x = Math.random() * 80 + 10; // 10% to 90% width
        const speed = 0.5 + Math.random() * 0.5 + (scoreRef.current / 500); // Speed scales with score

        const newWord: Word = {
            id: nextId.current++,
            text,
            x,
            y: -10,
            speed
        };

        wordsRef.current.push(newWord);
    };

    const update = (time: number) => {
        if (gameState !== "playing") return;

        // Spawn
        if (time - lastSpawnTime.current > spawnRate.current) {
            spawnWord();
            lastSpawnTime.current = time;
            spawnRate.current = Math.max(500, 2000 - scoreRef.current * 10);
        }

        // Move
        let gameOver = false;
        wordsRef.current.forEach(w => {
            w.y += w.speed;
            if (w.y > 100) { // Percentage based, > 100% height
                gameOver = true;
            }
        });

        if (gameOver) {
            setGameState("gameover");
            return;
        }

        setWords([...wordsRef.current]);
    };

    useEffect(() => {
        const loop = (time: number) => {
            if (gameState === "playing") {
                update(time);
            }
            animationFrameId.current = requestAnimationFrame(loop);
        };
        animationFrameId.current = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== "playing") return;

            // Only letters and backspace
            if (e.key === "Backspace") {
                setInput(prev => prev.slice(0, -1));
                return;
            }

            if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                setInput(prev => {
                    const next = (prev + e.key).toUpperCase();

                    // Check matches
                    const matchIndex = wordsRef.current.findIndex(w => w.text === next);
                    if (matchIndex !== -1) {
                        // Matched!
                        wordsRef.current.splice(matchIndex, 1);
                        scoreRef.current += 10;
                        setScore(scoreRef.current);
                        return ""; // Clear input
                    }

                    return next;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameState]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors z-50">
                <ArrowLeft size={20} />
                Back to Portfolio
            </Link>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 relative z-20"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                    SYNTAX <span className="text-secondary">DEFENSE</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Keyboard Input Verification v1.0</p>
            </motion.div>

            <div className="relative w-full max-w-3xl h-[600px] border-4 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,128,0.1)] bg-black/50 backdrop-blur-sm">
                <div className="absolute top-4 right-4 pointer-events-none z-10">
                    <div className="text-end">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Score</p>
                        <p className="text-2xl font-black">{score}</p>
                    </div>
                </div>

                {/* Game Area */}
                <div className="relative w-full h-full">
                    {words.map(word => (
                        <div
                            key={word.id}
                            className="absolute transform -translate-x-1/2 text-lg md:text-xl font-mono font-bold tracking-wider"
                            style={{
                                left: `${word.x}%`,
                                top: `${word.y}%`,
                                color: input && word.text.startsWith(input) ? "#ffffff" : "#00f3ff",
                                textShadow: input && word.text.startsWith(input) ? "0 0 10px #ffffff" : "0 0 5px #00f3ff"
                            }}
                        >
                            {/* Highlight matching part */}
                            <span className="text-[#ff0080]" style={{ textShadow: "0 0 10px #ff0080" }}>
                                {word.text.startsWith(input) ? input : ""}
                            </span>
                            <span className="opacity-70">
                                {word.text.startsWith(input) ? word.text.slice(input.length) : word.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Input Display (Center Bottom) */}
                <div className="absolute bottom-10 left-0 right-0 text-center">
                    <p className="text-muted-foreground text-xs uppercase mb-2 tracking-widest">Current Buffer</p>
                    <div className={`inline-block border-b-2 border-white/20 px-4 py-2 min-w-[200px] text-3xl font-mono ${input ? 'text-white' : 'text-white/20'}`}>
                        {input || "TYPE..."}
                    </div>
                </div>

                <AnimatePresence>
                    {gameState === "start" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-30"
                        >
                            <Button variant="neon" size="lg" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary">
                                <Play className="mr-2 h-4 w-4" />
                                INITIATE
                            </Button>
                            <p className="mt-6 text-xs text-muted-foreground">Type the falling words to verify syntax.</p>
                        </motion.div>
                    )}

                    {gameState === "gameover" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-30"
                        >
                            <div className="text-center mb-6">
                                <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">SYNTAX ERROR</h2>
                                <p className="text-secondary text-sm font-bold">LINES OF CODE: {score / 10}</p>
                            </div>
                            <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                DEBUG
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="mt-8 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;Your typing speed is a direct bottleneck to your creativity. Optimize it.&quot;
                </p>
            </div>
        </div>
    );
}
