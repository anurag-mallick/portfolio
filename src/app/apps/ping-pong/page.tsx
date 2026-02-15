"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 8;
const INITIAL_BALL_SPEED = 5;
const SPEED_INCREMENT = 0.2;
const MAX_BALL_SPEED = 12;
const WINNING_SCORE = 5;

export default function PingPongPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
    const [score, setScore] = useState({ player: 0, computer: 0 });
    const [winner, setWinner] = useState<"player" | "computer" | null>(null);

    // Refs for mutable game state to avoid stale closures in the loop
    const playerPaddleY = useRef(0);
    const computerPaddleY = useRef(0);
    const ballPos = useRef({ x: 0, y: 0 });
    const ballVel = useRef({ x: 0, y: 0 });
    const internalScore = useRef({ player: 0, computer: 0 });
    const animationFrameId = useRef<number>(0);

    const initGame = (canvas: HTMLCanvasElement) => {
        playerPaddleY.current = canvas.height / 2 - PADDLE_HEIGHT / 2;
        computerPaddleY.current = canvas.height / 2 - PADDLE_HEIGHT / 2;
        internalScore.current = { player: 0, computer: 0 };
        setScore({ player: 0, computer: 0 });
        resetBall(canvas);
    };

    const resetBall = (canvas: HTMLCanvasElement) => {
        ballPos.current = { x: canvas.width / 2, y: canvas.height / 2 };
        const angle = (Math.random() - 0.5) * Math.PI / 2; // Random angle between -45 and 45 deg
        const direction = Math.random() > 0.5 ? 1 : -1;
        ballVel.current = {
            x: direction * INITIAL_BALL_SPEED * Math.cos(angle),
            y: INITIAL_BALL_SPEED * Math.sin(angle)
        };
    };

    const update = (canvas: HTMLCanvasElement) => {
        if (gameState !== "playing") return;

        // Update ball position
        ballPos.current.x += ballVel.current.x;
        ballPos.current.y += ballVel.current.y;

        // Bounce off top and bottom
        if (ballPos.current.y <= BALL_SIZE) {
            ballPos.current.y = BALL_SIZE;
            ballVel.current.y *= -1;
        } else if (ballPos.current.y >= canvas.height - BALL_SIZE) {
            ballPos.current.y = canvas.height - BALL_SIZE;
            ballVel.current.y *= -1;
        }

        // Computer AI (Simple follow with some delay/limited speed)
        const computerMid = computerPaddleY.current + PADDLE_HEIGHT / 2;
        const aiSpeed = 5.2; // Slightly faster to keep it challenging
        if (computerMid < ballPos.current.y - 15) {
            computerPaddleY.current += aiSpeed;
        } else if (computerMid > ballPos.current.y + 15) {
            computerPaddleY.current -= aiSpeed;
        }

        // Keep computer paddle in bounds
        computerPaddleY.current = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, computerPaddleY.current));

        // Player collision
        if (ballPos.current.x <= PADDLE_WIDTH + 10 + BALL_SIZE && ballVel.current.x < 0) {
            if (ballPos.current.y >= playerPaddleY.current && ballPos.current.y <= playerPaddleY.current + PADDLE_HEIGHT) {
                // Hit player paddle
                const relativeIntersectY = (playerPaddleY.current + (PADDLE_HEIGHT / 2)) - ballPos.current.y;
                const normalizedRelativeIntersectionY = (relativeIntersectY / (PADDLE_HEIGHT / 2));
                const bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 3); // 60 deg max

                const currentSpeed = Math.sqrt(ballVel.current.x ** 2 + ballVel.current.y ** 2);
                const newSpeed = Math.min(MAX_BALL_SPEED, currentSpeed + SPEED_INCREMENT);

                ballVel.current.x = newSpeed * Math.cos(bounceAngle);
                ballVel.current.y = -newSpeed * Math.sin(bounceAngle);

                // Prevent sticking
                ballPos.current.x = PADDLE_WIDTH + 10 + BALL_SIZE + 1;
            }
        }

        // Computer collision
        if (ballPos.current.x >= canvas.width - PADDLE_WIDTH - 10 - BALL_SIZE && ballVel.current.x > 0) {
            if (ballPos.current.y >= computerPaddleY.current && ballPos.current.y <= computerPaddleY.current + PADDLE_HEIGHT) {
                // Hit computer paddle
                const relativeIntersectY = (computerPaddleY.current + (PADDLE_HEIGHT / 2)) - ballPos.current.y;
                const normalizedRelativeIntersectionY = (relativeIntersectY / (PADDLE_HEIGHT / 2));
                const bounceAngle = normalizedRelativeIntersectionY * (Math.PI / 3);

                const currentSpeed = Math.sqrt(ballVel.current.x ** 2 + ballVel.current.y ** 2);
                const newSpeed = Math.min(MAX_BALL_SPEED, currentSpeed + SPEED_INCREMENT);

                ballVel.current.x = -newSpeed * Math.cos(bounceAngle);
                ballVel.current.y = -newSpeed * Math.sin(bounceAngle);

                // Prevent sticking
                ballPos.current.x = canvas.width - PADDLE_WIDTH - 10 - BALL_SIZE - 1;
            }
        }

        // Out of bounds detection for scoring
        if (ballPos.current.x <= 0) {
            // Computer scores
            internalScore.current.computer += 1;
            const currentComputerScore = internalScore.current.computer;
            setScore({ ...internalScore.current });

            if (currentComputerScore >= WINNING_SCORE) {
                setWinner("computer");
                setGameState("gameover");
            } else {
                resetBall(canvas);
            }
        } else if (ballPos.current.x >= canvas.width) {
            // Player scores
            internalScore.current.player += 1;
            const currentPlayerScore = internalScore.current.player;
            setScore({ ...internalScore.current });

            if (currentPlayerScore >= WINNING_SCORE) {
                setWinner("player");
                setGameState("gameover");
            } else {
                resetBall(canvas);
            }
        }
    };

    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Clear canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw dotted line
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.stroke();
        ctx.setLineDash([]);

        // Paddles
        ctx.fillStyle = "#00f3ff"; // Primary neon
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f3ff";
        ctx.fillRect(10, playerPaddleY.current, PADDLE_WIDTH, PADDLE_HEIGHT);

        ctx.fillStyle = "#ff0080"; // Secondary neon
        ctx.shadowColor = "#ff0080";
        ctx.fillRect(canvas.width - PADDLE_WIDTH - 10, computerPaddleY.current, PADDLE_WIDTH, PADDLE_HEIGHT);

        // Ball
        ctx.fillStyle = "white";
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(ballPos.current.x, ballPos.current.y, BALL_SIZE, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Initial setup
        initGame(canvas);

        const loop = () => {
            update(canvas);
            draw(ctx, canvas);
            animationFrameId.current = requestAnimationFrame(loop);
        };

        const frameId = requestAnimationFrame(loop);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;
            playerPaddleY.current = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, mouseY - PADDLE_HEIGHT / 2));
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touchY = e.touches[0].clientY - rect.top;
            playerPaddleY.current = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, touchY - PADDLE_HEIGHT / 2));
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            cancelAnimationFrame(frameId);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchmove", handleTouchMove);
        };
    }, [gameState]); // Removed score dependency to avoid reset on score change

    const startGame = () => {
        setScore({ player: 0, computer: 0 });
        setWinner(null);
        setGameState("playing");
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
                className="text-center mb-8"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                    NEON <span className="text-primary">PONG</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">AI Challenge Module v1.0</p>
            </motion.div>

            <div className="relative border-4 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                {/* Score UI Overlay */}
                <div className="absolute top-4 left-0 right-0 flex justify-center gap-20 pointer-events-none z-10">
                    <div className="text-center">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Player</p>
                        <p className="text-4xl font-black">{score.player}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">CPU</p>
                        <p className="text-4xl font-black">{score.computer}</p>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="max-w-full h-auto bg-black block"
                />

                {/* Overlays */}
                <AnimatePresence>
                    {gameState === "start" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20"
                        >
                            <Button variant="neon" size="lg" onClick={startGame}>
                                START GAME
                            </Button>
                            <p className="mt-4 text-xs text-muted-foreground">Move mouse or drag to control paddle</p>
                        </motion.div>
                    )}

                    {gameState === "gameover" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-20"
                        >
                            {winner === "player" ? (
                                <div className="text-center mb-6">
                                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2 animate-bounce" />
                                    <h2 className="text-3xl font-bold text-white">SYSTEM DEFEATED</h2>
                                    <p className="text-primary text-sm font-bold">HUMANITY PREVAILS</p>
                                </div>
                            ) : (
                                <div className="text-center mb-6">
                                    <Cpu className="w-16 h-16 text-secondary mx-auto mb-2 opacity-50" />
                                    <h2 className="text-3xl font-bold text-white">AI DOMINANCE</h2>
                                    <p className="text-secondary text-sm font-bold">MISSION FAILED</p>
                                </div>
                            )}
                            <Button variant="neon" onClick={startGame} className="flex gap-2">
                                <RotateCcw size={18} />
                                REBOOT MATCH
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-12 max-w-2xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "This simple module demonstrates the responsiveness of the Edge runtime. Every paddle move and collision is handled with sub-millisecond precision."
                </p>
            </div>
        </div>
    );
}
