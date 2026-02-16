"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const PROJECTILE_SIZE = 4;
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 20;
const ENEMY_ROWS = 4;
const ENEMY_COLS = 8;
const ENEMY_PADDING = 20;

export default function SpaceInvadersGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"start" | "playing" | "gameover" | "victory">("start");
    const [score, setScore] = useState(0);

    const playerX = useRef(CANVAS_WIDTH / 2);
    const projectiles = useRef<{ x: number, y: number, active: boolean, type: 'player' | 'enemy' }[]>([]);
    const enemies = useRef<{ x: number, y: number, active: boolean }[][]>([]);
    const enemyDir = useRef(1);
    const enemySpeed = useRef(1);
    const animationFrameId = useRef<number>(0);
    const lastTime = useRef(0);
    const fireCooldown = useRef(0);

    const initGame = () => {
        playerX.current = CANVAS_WIDTH / 2;
        projectiles.current = [];
        enemyDir.current = 1;
        enemySpeed.current = 1;

        // Init enemies
        const newEnemies: { x: number, y: number, active: boolean }[][] = [];
        for (let r = 0; r < ENEMY_ROWS; r++) {
            newEnemies[r] = [];
            for (let c = 0; c < ENEMY_COLS; c++) {
                newEnemies[r][c] = {
                    x: 100 + c * (ENEMY_WIDTH + ENEMY_PADDING),
                    y: 50 + r * (ENEMY_HEIGHT + ENEMY_PADDING),
                    active: true
                };
            }
        }
        enemies.current = newEnemies;

        setScore(0);
        setGameState("playing");
    };

    const update = (time: number) => {
        if (gameState !== "playing") return;
        const deltaTime = time - lastTime.current;
        lastTime.current = time;

        // Move Player Projectiles
        projectiles.current.forEach(p => {
            if (p.active) {
                p.y += p.type === 'player' ? -5 : 3;
                if (p.y < 0 || p.y > CANVAS_HEIGHT) p.active = false;
            }
        });

        // Move Enemies
        let hitWall = false;
        let activeEnemyCount = 0;

        enemies.current.forEach(row => {
            row.forEach(enemy => {
                if (enemy.active) {
                    activeEnemyCount++;
                    enemy.x += enemyDir.current * enemySpeed.current;
                    if (enemy.x <= 0 || enemy.x + ENEMY_WIDTH >= CANVAS_WIDTH) {
                        hitWall = true;
                    }

                    // Enemy shooting (randomly)
                    if (Math.random() < 0.001) {
                        projectiles.current.push({ x: enemy.x + ENEMY_WIDTH / 2, y: enemy.y + ENEMY_HEIGHT, active: true, type: 'enemy' });
                    }
                }
            });
        });

        if (hitWall) {
            enemyDir.current *= -1;
            enemies.current.forEach(row => {
                row.forEach(enemy => {
                    if (enemy.active) enemy.y += 20;
                });
            });
        }

        if (activeEnemyCount === 0) {
            setGameState("victory");
            return;
        }

        // Collision Detection
        projectiles.current.forEach(p => {
            if (!p.active) return;

            if (p.type === 'player') {
                // Hit Enemy?
                enemies.current.forEach(row => {
                    row.forEach(enemy => {
                        if (enemy.active && p.active) {
                            if (p.x > enemy.x && p.x < enemy.x + ENEMY_WIDTH &&
                                p.y > enemy.y && p.y < enemy.y + ENEMY_HEIGHT) {
                                enemy.active = false;
                                p.active = false;
                                setScore(prev => prev + 100);
                            }
                        }
                    });
                });
            } else {
                // Hit Player?
                if (p.x > playerX.current && p.x < playerX.current + PLAYER_WIDTH &&
                    p.y > CANVAS_HEIGHT - 40 && p.y < CANVAS_HEIGHT - 40 + PLAYER_HEIGHT) {
                    setGameState("gameover");
                }
            }
        });

        // Start cleanup
        projectiles.current = projectiles.current.filter(p => p.active);

        // Check if enemies reached bottom
        enemies.current.forEach(row => {
            row.forEach(enemy => {
                if (enemy.active && enemy.y > CANVAS_HEIGHT - 50) {
                    setGameState("gameover");
                }
            });
        });
    };

    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Clear
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Player
        ctx.fillStyle = "#00f3ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f3ff";
        ctx.fillRect(playerX.current, CANVAS_HEIGHT - 40, PLAYER_WIDTH, PLAYER_HEIGHT);
        // Turret
        ctx.fillRect(playerX.current + PLAYER_WIDTH / 2 - 2, CANVAS_HEIGHT - 50, 4, 10);
        ctx.shadowBlur = 0;

        // Enemies
        ctx.fillStyle = "#ff0080";
        enemies.current.forEach(row => {
            row.forEach(enemy => {
                if (enemy.active) {
                    ctx.fillRect(enemy.x, enemy.y, ENEMY_WIDTH, ENEMY_HEIGHT);
                }
            });
        });

        // Projectiles
        projectiles.current.forEach(p => {
            if (p.active) {
                ctx.fillStyle = p.type === 'player' ? "#ffff00" : "#ff0000";
                ctx.fillRect(p.x, p.y, PROJECTILE_SIZE, PROJECTILE_SIZE * 3);
            }
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const loop = (time: number) => {
            update(time);
            draw(ctx, canvas);
            animationFrameId.current = requestAnimationFrame(loop);
        };

        animationFrameId.current = requestAnimationFrame(loop);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== "playing") return;
            if (e.key === "ArrowLeft") playerX.current = Math.max(0, playerX.current - 15);
            if (e.key === "ArrowRight") playerX.current = Math.min(CANVAS_WIDTH - PLAYER_WIDTH, playerX.current + 15);
            if (e.key === " ") {
                if (Date.now() - fireCooldown.current > 300) {
                    projectiles.current.push({ x: playerX.current + PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 50, active: true, type: 'player' });
                    fireCooldown.current = Date.now();
                }
            }
        };

        // Touch controls are tricky here without on-screen buttons, sticking to simple tap to fire/move logic would be complex. 
        // For this iteration, we'll rely on keyboard or simple mouse follow for player x
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            playerX.current = Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_WIDTH, x - PLAYER_WIDTH / 2));
        };

        const handleClick = () => {
            if (gameState === "playing" && Date.now() - fireCooldown.current > 300) {
                projectiles.current.push({ x: playerX.current + PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 50, active: true, type: 'player' });
                fireCooldown.current = Date.now();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener("keydown", handleKeyDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("click", handleClick);
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
                    VOID <span className="text-secondary">DEFENDER</span>
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs">Security Protocol v4.0</p>
            </motion.div>

            <div className="relative border-4 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,128,0.1)]">
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
                    className="max-w-full h-auto bg-black block cursor-crosshair"
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
                                ENGAGE SYSTEMS
                            </Button>
                            <p className="mt-6 text-xs text-muted-foreground">Mouse to Move • Click/Space to Fire</p>
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
                                    {gameState === "victory" ? "THREAT NEUTRALIZED" : "BREACH DETECTED"}
                                </h2>
                                <p className="text-secondary text-sm font-bold">FINAL SCORE: {score}</p>
                            </div>
                            <Button variant="neon" onClick={initGame} className="bg-secondary hover:bg-secondary/80 border-secondary flex gap-2">
                                <RotateCcw size={18} />
                                RESTART MISSION
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 max-w-xl text-center">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &quot;Standard firewall protocols visualized. Eliminate incoming packets.&quot;
                </p>
            </div>
        </div>
    );
}
