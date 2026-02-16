"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SHIP_SIZE = 20;

type GameObject = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    radius: number;
    active: boolean;
    type: 'ship' | 'asteroid' | 'bullet';
};

export default function AsteroidsGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
    const [score, setScore] = useState(0);

    const ship = useRef<GameObject>({ x: 0, y: 0, vx: 0, vy: 0, angle: 0, radius: SHIP_SIZE, active: true, type: 'ship' });
    const bullets = useRef<GameObject[]>([]);
    const asteroids = useRef<GameObject[]>([]);
    const keys = useRef<Record<string, boolean>>({});

    const animationFrameId = useRef<number>(0);

    const createAsteroid = (x: number, y: number, size: number): GameObject => {
        const speed = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        return {
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            angle: 0,
            radius: size,
            active: true,
            type: 'asteroid'
        };
    };

    const initGame = () => {
        ship.current = {
            x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2,
            vx: 0, vy: 0,
            angle: -Math.PI / 2,
            radius: 15,
            active: true,
            type: 'ship'
        };
        bullets.current = [];
        asteroids.current = [];

        // Spawn initial asteroids
        for (let i = 0; i < 5; i++) {
            let x, y;
            // Ensure not too close to ship
            do {
                x = Math.random() * CANVAS_WIDTH;
                y = Math.random() * CANVAS_HEIGHT;
            } while (Math.hypot(x - ship.current.x, y - ship.current.y) < 150);

            asteroids.current.push(createAsteroid(x, y, 40));
        }

        setScore(0);
        setGameState("playing");
    };

    const update = () => {
        if (gameState !== "playing") return;

        // Ship Controls
        if (keys.current["ArrowLeft"]) ship.current.angle -= 0.1;
        if (keys.current["ArrowRight"]) ship.current.angle += 0.1;
        if (keys.current["ArrowUp"]) {
            ship.current.vx += Math.cos(ship.current.angle) * 0.1;
            ship.current.vy += Math.sin(ship.current.angle) * 0.1;
        }

        // Apply Friction to Ship
        ship.current.vx *= 0.99;
        ship.current.vy *= 0.99;

        // Move Ship
        ship.current.x += ship.current.vx;
        ship.current.y += ship.current.vy;

        // Screen Wrap Ship
        if (ship.current.x < 0) ship.current.x += CANVAS_WIDTH;
        if (ship.current.x > CANVAS_WIDTH) ship.current.x -= CANVAS_WIDTH;
        if (ship.current.y < 0) ship.current.y += CANVAS_HEIGHT;
        if (ship.current.y > CANVAS_HEIGHT) ship.current.y -= CANVAS_HEIGHT;

        // Move Bullets
        bullets.current.forEach(b => {
            b.x += b.vx;
            b.y += b.vy;

            // Wrap bullets? Or destroy? Destroy for now.
            if (b.x < 0 || b.x > CANVAS_WIDTH || b.y < 0 || b.y > CANVAS_HEIGHT) b.active = false;
        });

        // Move Asteroids
        asteroids.current.forEach(a => {
            a.x += a.vx;
            a.y += a.vy;

            if (a.x < -a.radius) a.x += CANVAS_WIDTH + a.radius * 2;
            else if (a.x > CANVAS_WIDTH + a.radius) a.x -= CANVAS_WIDTH + a.radius * 2;
            if (a.y < -a.radius) a.y += CANVAS_HEIGHT + a.radius * 2;
            else if (a.y > CANVAS_HEIGHT + a.radius) a.y -= CANVAS_HEIGHT + a.radius * 2;
        });

        // Collision: Bullet <-> Asteroid
        bullets.current.forEach(b => {
            if (!b.active) return;
            asteroids.current.forEach(a => {
                if (!a.active) return;
                const dist = Math.hypot(b.x - a.x, b.y - a.y);
                if (dist < a.radius) {
                    b.active = false;
                    a.active = false;
                    setScore(prev => prev + 100);

                    // Split asteroid
                    if (a.radius > 20) {
                        asteroids.current.push(createAsteroid(a.x, a.y, a.radius / 2));
                        asteroids.current.push(createAsteroid(a.x, a.y, a.radius / 2));
                    }
                }
            });
        });

        // Collision: Ship <-> Asteroid
        asteroids.current.forEach(a => {
            if (!a.active) return;
            const dist = Math.hypot(ship.current.x - a.x, ship.current.y - a.y);
            if (dist < ship.current.radius + a.radius) {
                setGameState("gameover");
            }
        });

        // Cleanup
        bullets.current = bullets.current.filter(b => b.active);
        asteroids.current = asteroids.current.filter(a => a.active);

        // Level up / Respawn asteroids if cleared
        if (asteroids.current.length === 0) {
            for (let i = 0; i < 5; i++) {
                let x = Math.random() * CANVAS_WIDTH;
                let y = Math.random() * CANVAS_HEIGHT;
                asteroids.current.push(createAsteroid(x, y, 40));
            }
        }
    };

    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Ship
        ctx.save();
        ctx.translate(ship.current.x, ship.current.y);
        ctx.rotate(ship.current.angle);
        ctx.strokeStyle = "#00f3ff";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f3ff";
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-10, -10);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Draw Asteroids
        ctx.strokeStyle = "#ff0080";
        ctx.shadowColor = "#ff0080";
        asteroids.current.forEach(a => {
            ctx.beginPath();
            ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Draw Bullets
        ctx.fillStyle = "#ffff00";
        ctx.shadowColor = "#ffff00";
        bullets.current.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.shadowBlur = 0;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const loop = () => {
            update();
            draw(ctx, canvas);
            animationFrameId.current = requestAnimationFrame(loop);
        };

        animationFrameId.current = requestAnimationFrame(loop);

        const handleKeyDown = (e: KeyboardEvent) => {
            keys.current[e.key] = true;
            if (e.key === " " && gameState === "playing") {
                bullets.current.push({
                    x: ship.current.x,
                    y: ship.current.y,
                    vx: Math.cos(ship.current.angle) * 10,
                    vy: Math.sin(ship.current.angle) * 10,
                    angle: 0,
                    radius: 2,
                    active: true,
                    type: 'bullet'
                });
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keys.current[e.key] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    VECTOR <span className="text-secondary">VOID</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Trajectory Simulation v1.0</p>
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
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="max-w-full h-auto bg-black block"
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
                            <Button variant="neon" size="lg" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary">
                                <Play className="mr-2 h-4 w-4" />
                                LAUNCH SHIP
                            </Button>
                            <p className="mt-6 text-xs text-muted-foreground">Arrows to Steer • Space to Fire</p>
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
                                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">HULL BREACH</h2>
                                <p className="text-secondary text-sm font-bold">FINAL SCORE: {score}</p>
                            </div>
                            <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                RESPAWN
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="mt-8 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;Rendering vector graphics in real-time. Navigate the chaos.&quot;
                </p>
            </div>
        </div>
    );
}
