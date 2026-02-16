"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const GRID_SIZE = 20;
const TILE_COUNT = 20; // 400x400 canvas essentially (20 * 20)
const CANVAS_SIZE = 400; // Physical size 400px
const SPEED = 100; // ms

export default function SnakeGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
    const [score, setScore] = useState(0);

    // Game state refs
    const snake = useRef<{ x: number, y: number }[]>([{ x: 10, y: 10 }]);
    const food = useRef<{ x: number, y: number }>({ x: 15, y: 15 });
    const velocity = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const nextVelocity = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const initGame = () => {
        snake.current = [{ x: 10, y: 10 }];
        spawnFood();
        velocity.current = { x: 0, y: 0 };
        nextVelocity.current = { x: 0, y: 0 };
        setScore(0);
        setGameState("playing");
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        gameLoopRef.current = setInterval(gameLoop, SPEED);
    };

    const spawnFood = () => {
        food.current = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT),
        };
        // Ensure food doesn't spawn on snake
        snake.current.forEach(segment => {
            if (segment.x === food.current.x && segment.y === food.current.y) {
                spawnFood();
            }
        });
    };

    const gameLoop = () => {
        velocity.current = nextVelocity.current;
        if (velocity.current.x === 0 && velocity.current.y === 0) return;

        const head = { ...snake.current[0] };
        head.x += velocity.current.x;
        head.y += velocity.current.y;

        // Wall collision
        if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
            gameOver();
            return;
        }

        // Self collision
        for (let i = 0; i < snake.current.length; i++) {
            if (head.x === snake.current[i].x && head.y === snake.current[i].y) {
                gameOver();
                return;
            }
        }

        snake.current.unshift(head);

        // Food collision
        if (head.x === food.current.x && head.y === food.current.y) {
            setScore(prev => prev + 10);
            spawnFood();
        } else {
            snake.current.pop();
        }

        draw();
    };

    const gameOver = () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        setGameState("gameover");
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        const scale = CANVAS_SIZE / TILE_COUNT;

        // Draw Food
        ctx.fillStyle = "#ff0080";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff0080";
        ctx.fillRect(food.current.x * scale, food.current.y * scale, scale - 2, scale - 2);

        // Draw Snake
        ctx.fillStyle = "#00f3ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f3ff";
        snake.current.forEach((segment) => {
            ctx.fillRect(segment.x * scale, segment.y * scale, scale - 2, scale - 2);
        });
        ctx.shadowBlur = 0;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                    if (velocity.current.y === 1) break;
                    nextVelocity.current = { x: 0, y: -1 };
                    break;
                case "ArrowDown":
                    if (velocity.current.y === -1) break;
                    nextVelocity.current = { x: 0, y: 1 };
                    break;
                case "ArrowLeft":
                    if (velocity.current.x === 1) break;
                    nextVelocity.current = { x: -1, y: 0 };
                    break;
                case "ArrowRight":
                    if (velocity.current.x === -1) break;
                    nextVelocity.current = { x: 1, y: 0 };
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        // Initial draw
        if (gameState === "start") draw();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Mobile controls
    const move = (x: number, y: number) => {
        // Prevent reversing direction
        if (x !== 0 && velocity.current.x === -x) return;
        if (y !== 0 && velocity.current.y === -y) return;
        nextVelocity.current = { x, y };
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors z-50">
                <ArrowLeft size={20} />
                Back to Portfolio
            </Link>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                    NEON <span className="text-secondary">SNAKE</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Cyber Serpent Module v1.0</p>
            </motion.div>

            <div className="relative border-4 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                <div className="absolute top-4 right-4 pointer-events-none z-10">
                    <div className="text-end">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Score</p>
                        <p className="text-2xl font-black">{score}</p>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                    className="max-w-full h-auto bg-black block"
                />

                <AnimatePresence>
                    {gameState === "start" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20"
                        >
                            <Button variant="neon" size="lg" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary">
                                <Play className="mr-2 h-4 w-4" />
                                START GAME
                            </Button>
                            <p className="mt-6 text-xs text-muted-foreground">Arrows to Move</p>
                        </motion.div>
                    )}

                    {gameState === "gameover" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-20"
                        >
                            <div className="text-center mb-6">
                                <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">CONNECTION LOST</h2>
                                <p className="text-secondary text-sm font-bold">FINAL LENGTH: {score / 10}</p>
                            </div>
                            <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                REBOOT SYSTEM
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden mt-8 gap-4">
                <button onClick={() => move(-1, 0)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">←</button>
                <div className="flex flex-col gap-4">
                    <button onClick={() => move(0, -1)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">↑</button>
                    <button onClick={() => move(0, 1)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">↓</button>
                </div>
                <button onClick={() => move(1, 0)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">→</button>
            </div>

            <div className="mt-8 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;A recursive data structure visualization. Watch the array grow in real-time.&quot;
                </p>
            </div>
        </div>
    );
}
