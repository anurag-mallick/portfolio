"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const COLORS = [
    null,
    "#00f3ff", // I - Cyan
    "#ff0080", // J - Pink
    "#ff8800", // L - Orange
    "#ffff00", // O - Yellow
    "#00ff00", // S - Green
    "#9900ff", // T - Purple
    "#ff0000", // Z - Red
];

const SHAPES = [
    [],
    [[1, 1, 1, 1]],
    [[2, 0, 0], [2, 2, 2]],
    [[0, 0, 3], [3, 3, 3]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0]],
    [[0, 6, 0], [6, 6, 6]],
    [[7, 7, 0], [0, 7, 7]],
];

export default function TetrisPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);

    const board = useRef<number[][]>([]);
    const piece = useRef<{ pos: { x: number, y: number }, shape: number[][], colorIndex: number } | null>(null);
    const dropCounter = useRef(0);
    const dropInterval = useRef(1000);
    const lastTime = useRef(0);
    const animationFrameId = useRef<number>(0);

    const createBoard = () => {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    };

    const resetPiece = () => {
        const index = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
        const shape = SHAPES[index];
        piece.current = {
            pos: { x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 },
            shape,
            colorIndex: index
        };

        if (collide()) {
            setGameState("gameover");
        }
    };

    const collide = () => {
        if (!piece.current) return false;
        const { pos, shape } = piece.current;
        for (let y = 0; y < shape.length; ++y) {
            for (let x = 0; x < shape[y].length; ++x) {
                if (shape[y][x] !== 0 &&
                    (board.current[y + pos.y] === undefined ||
                        board.current[y + pos.y][x + pos.x] === undefined ||
                        board.current[y + pos.y][x + pos.x] !== 0)) {
                    return true;
                }
            }
        }
        return false;
    };

    const merge = () => {
        if (!piece.current) return;
        piece.current.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    board.current[y + piece.current!.pos.y][x + piece.current!.pos.x] = piece.current!.colorIndex;
                }
            });
        });
    };

    const rotate = (dir: number) => {
        if (!piece.current) return;
        const matrix = piece.current.shape;
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        if (dir > 0) matrix.forEach(row => row.reverse());
        else matrix.reverse();

        // Wall kick
        const pos = piece.current.pos.x;
        let offset = 1;
        while (collide()) {
            piece.current.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > matrix[0].length) {
                rotate(-dir);
                piece.current.pos.x = pos;
                return;
            }
        }
    };

    const drop = () => {
        if (!piece.current) return;
        piece.current.pos.y++;
        if (collide()) {
            piece.current.pos.y--;
            merge();
            resetPiece();
            sweep();
        }
        dropCounter.current = 0;
    };

    const sweep = () => {
        let rowCount = 1;
        outer: for (let y = ROWS - 1; y >= 0; --y) {
            for (let x = 0; x < COLS; ++x) {
                if (board.current[y][x] === 0) {
                    continue outer;
                }
            }
            const row = board.current.splice(y, 1)[0].fill(0);
            board.current.unshift(row);
            ++y;

            setScore(prev => prev + rowCount * 10);
            rowCount *= 2;
        }

        const newLevel = Math.floor(score / 100) + 1;
        if (newLevel !== level) {
            setLevel(newLevel);
            dropInterval.current = Math.max(100, 1000 - (newLevel - 1) * 100);
        }
    };

    const move = (dir: number) => {
        if (!piece.current) return;
        piece.current.pos.x += dir;
        if (collide()) {
            piece.current.pos.x -= dir;
        }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        // Clear
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

        // Grid lines (subtle)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= COLS; i++) {
            ctx.beginPath();
            ctx.moveTo(i * BLOCK_SIZE, 0);
            ctx.lineTo(i * BLOCK_SIZE, ROWS * BLOCK_SIZE);
            ctx.stroke();
        }
        for (let i = 0; i <= ROWS; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * BLOCK_SIZE);
            ctx.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
            ctx.stroke();
        }

        // Board
        board.current.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    drawBlock(ctx, x, y, COLORS[value]!);
                }
            });
        });

        // Current piece
        if (piece.current) {
            piece.current.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        drawBlock(ctx, x + piece.current!.pos.x, y + piece.current!.pos.y, COLORS[piece.current!.colorIndex]!);
                    }
                });
            });
        }
    };

    const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

        // Gloss effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.fillRect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, BLOCK_SIZE - 10, 3);

        ctx.shadowBlur = 0;
    };

    const update = (time = 0) => {
        const deltaTime = time - lastTime.current;
        lastTime.current = time;

        if (gameState === "playing") {
            dropCounter.current += deltaTime;
            if (dropCounter.current > dropInterval.current) {
                drop();
            }
        }

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) draw(ctx);
        }

        animationFrameId.current = requestAnimationFrame(update);
    };

    const startGame = () => {
        board.current = createBoard();
        setScore(0);
        setLevel(1);
        dropInterval.current = 1000;
        resetPiece();
        setGameState("playing");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== "playing") return;
            if (e.key === "ArrowLeft") move(-1);
            else if (e.key === "ArrowRight") move(1);
            else if (e.key === "ArrowDown") drop();
            else if (e.key === "ArrowUp") rotate(1);
        };

        window.addEventListener("keydown", handleKeyDown);
        animationFrameId.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [gameState]);

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
                    NEON <span className="text-secondary">TETRIS</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Logic Processing Module v2.0</p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                <div className="relative border-4 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,128,0.1)]">
                    <canvas
                        ref={canvasRef}
                        width={COLS * BLOCK_SIZE}
                        height={ROWS * BLOCK_SIZE}
                        className="bg-black block"
                    />

                    <AnimatePresence>
                        {gameState === "start" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20"
                            >
                                <Button variant="neon" size="lg" onClick={startGame} className="bg-secondary hover:bg-secondary/80 border-secondary">
                                    <Play className="mr-2 h-4 w-4" />
                                    INITIATE
                                </Button>
                                <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-tighter text-center px-4">
                                    Use Arrows to Move & Rotate<br />Down Arrow to Soft Drop
                                </p>
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
                                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                                    <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Overflow Error</h2>
                                    <p className="text-secondary text-sm font-bold">SCORE: {score}</p>
                                </div>
                                <Button variant="neon" onClick={startGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                    <RotateCcw size={18} />
                                    RETRY MODULE
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-48">
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-1">Score</p>
                        <p className="text-3xl font-black">{score}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Level</p>
                        <p className="text-3xl font-black">{level}</p>
                    </div>

                    <div className="mt-4 hidden md:block">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-4">Controls</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded border border-white/5 text-[10px] uppercase">↑ Rotate</div>
                            <div className="p-2 rounded border border-white/5 text-[10px] uppercase">↓ Speed</div>
                            <div className="p-2 rounded border border-white/5 text-[10px] uppercase">← Left</div>
                            <div className="p-2 rounded border border-white/5 text-[10px] uppercase">→ Right</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden mt-8 gap-4">
                <button onClick={() => move(-1)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">←</button>
                <button onClick={() => rotate(1)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">↑</button>
                <button onClick={() => move(1)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">→</button>
                <button onClick={() => drop()} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 transition-colors">↓</button>
            </div>

            <div className="mt-12 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "Tetris is more than a game; it's an exercise in pattern recognition and cognitive load management. This implementation uses the same V8 Isolate optimization as the rest of this portfolio."
                </p>
            </div>
        </div>
    );
}
