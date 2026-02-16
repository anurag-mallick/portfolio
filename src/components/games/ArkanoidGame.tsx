"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 6;
const BRICK_ROW_COUNT = 5;
const BRICK_COLUMN_COUNT = 8;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 35;
const BRICK_WIDTH = (CANVAS_WIDTH - (BRICK_OFFSET_LEFT * 2) - (BRICK_PADDING * (BRICK_COLUMN_COUNT - 1))) / BRICK_COLUMN_COUNT;
const BRICK_HEIGHT = 20;

const INITIAL_LIVES = 3;

export default function ArkanoidGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover" | "victory">("start");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(INITIAL_LIVES);

    const paddleX = useRef(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2);
    const ballPos = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30 });
    const ballVel = useRef({ x: 4, y: -4 });
    const bricks = useRef<{ x: number, y: number, status: number }[][]>([]);
    const animationFrameId = useRef<number>(0);

    const initBricks = () => {
        const newBricks: { x: number, y: number, status: number }[][] = [];
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            newBricks[c] = [];
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                newBricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        bricks.current = newBricks;
    };

    const resetBall = () => {
        ballPos.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30 };
        ballVel.current = { x: 4 * (Math.random() > 0.5 ? 1 : -1), y: -4 };
        paddleX.current = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
    };

    const update = (canvas: HTMLCanvasElement) => {
        if (gameState !== "playing") return;

        // Move ball
        ballPos.current.x += ballVel.current.x;
        ballPos.current.y += ballVel.current.y;

        // Wall collision
        if (ballPos.current.x + ballVel.current.x > canvas.width - BALL_RADIUS || ballPos.current.x + ballVel.current.x < BALL_RADIUS) {
            ballVel.current.x = -ballVel.current.x;
        }
        if (ballPos.current.y + ballVel.current.y < BALL_RADIUS) {
            ballVel.current.y = -ballVel.current.y;
        } else if (ballPos.current.y + ballVel.current.y > canvas.height - BALL_RADIUS) {
            // Ball lost
            if (lives > 1) {
                setLives(prev => prev - 1);
                resetBall();
            } else {
                setLives(0);
                setGameState("gameover");
            }
        }

        // Paddle collision
        if (ballPos.current.y + ballVel.current.y > canvas.height - BALL_RADIUS - PADDLE_HEIGHT - 5) {
            if (ballPos.current.x > paddleX.current && ballPos.current.x < paddleX.current + PADDLE_WIDTH) {
                // Calculate bounce angle based on where it hit the paddle
                let hitPoint = ballPos.current.x - (paddleX.current + PADDLE_WIDTH / 2);
                hitPoint = hitPoint / (PADDLE_WIDTH / 2);

                const speed = Math.sqrt(ballVel.current.x ** 2 + ballVel.current.y ** 2);
                const angle = hitPoint * (Math.PI / 3); // Max 60 degrees

                ballVel.current.x = speed * Math.sin(angle);
                ballVel.current.y = -speed * Math.cos(angle);
            }
        }

        // Brick collision
        let activeBricks = 0;
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                const b = bricks.current[c][r];
                if (b.status === 1) {
                    activeBricks++;
                    if (ballPos.current.x > b.x && ballPos.current.x < b.x + BRICK_WIDTH && ballPos.current.y > b.y && ballPos.current.y < b.y + BRICK_HEIGHT) {
                        ballVel.current.y = -ballVel.current.y;
                        b.status = 0;
                        setScore(prev => prev + 10);
                    }
                }
            }
        }

        if (activeBricks === 0) {
            setGameState("victory");
        }
    };

    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Clear
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Paddle
        ctx.fillStyle = "#00f3ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f3ff";
        ctx.fillRect(paddleX.current, canvas.height - PADDLE_HEIGHT - 5, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.shadowBlur = 0;

        // Ball
        ctx.beginPath();
        ctx.arc(ballPos.current.x, ballPos.current.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ffffff";
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;

        // Bricks
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                if (bricks.current[c][r].status === 1) {
                    const brickX = (c * (BRICK_WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT;
                    const brickY = (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP;
                    bricks.current[c][r].x = brickX;
                    bricks.current[c][r].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
                    // Gradient colors for rows
                    const colors = ["#ff0080", "#ff00ff", "#8000ff", "#0000ff", "#0080ff"];
                    ctx.fillStyle = colors[r % colors.length];
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = ctx.fillStyle;
                    ctx.fill();
                    ctx.closePath();
                    ctx.shadowBlur = 0;
                }
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (bricks.current.length === 0) initBricks();

        const loop = () => {
            update(canvas);
            draw(ctx, canvas);
            animationFrameId.current = requestAnimationFrame(loop);
        };

        const frameId = requestAnimationFrame(loop);

        const handleMouseMove = (e: MouseEvent) => {
            const relativeX = e.clientX - canvas.getBoundingClientRect().left;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX.current = relativeX - PADDLE_WIDTH / 2;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX.current = relativeX - PADDLE_WIDTH / 2;
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            cancelAnimationFrame(frameId);
            document.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchmove", handleTouchMove);
        };
    }, [gameState, lives]); // eslint-disable-line react-hooks/exhaustive-deps

    const startGame = () => {
        setScore(0);
        setLives(INITIAL_LIVES);
        initBricks();
        resetBall();
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
                    NEON <span className="text-secondary">ARKANOID</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Brick Breaker Module v1.0</p>
            </motion.div>

            <div className="relative border-4 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,128,0.1)]">
                <div className="absolute top-4 left-0 right-0 flex justify-center gap-20 pointer-events-none z-10">
                    <div className="text-center">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Score</p>
                        <p className="text-2xl font-black">{score}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">Lives</p>
                        <p className="text-2xl font-black">{lives}</p>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="max-w-full h-auto bg-black block cursor-none"
                    style={{ maxHeight: '70vh' }}
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
                                START GAME
                            </Button>
                            <p className="mt-6 text-xs text-muted-foreground">Mouse to move paddle</p>
                        </motion.div>
                    )}

                    {(gameState === "gameover" || gameState === "victory") && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-20"
                        >
                            <div className="text-center mb-6">
                                <Trophy className={`w-16 h-16 mx-auto mb-2 ${gameState === "victory" ? "text-yellow-400" : "text-gray-500"}`} />
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
                                    {gameState === "victory" ? "STAGE CLEARED" : "GAME OVER"}
                                </h2>
                                <p className="text-secondary text-sm font-bold">FINAL SCORE: {score}</p>
                            </div>
                            <Button variant="neon" onClick={startGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                RESTART
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;A classic reconstructed with modern web technologies. Demonstrating smooth canvas rendering and physics logic.&quot;
                </p>
            </div>
        </div>
    );
}
