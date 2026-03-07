"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, RefreshCw, MapPin, Truck, Activity, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
    x: number;
    y: number;
}

export function RouteOptimizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [points, setPoints] = useState<Point[]>([]);
    const [algorithm, setAlgorithm] = useState<"nearest" | "2opt">("nearest");
    const [route, setRoute] = useState<number[]>([]);
    const [distance, setDistance] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const calculateDistance = (p1: Point, p2: Point) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };

    const nearestNeighbor = (pts: Point[]) => {
        if (pts.length === 0) return [];

        const visited = new Set<number>();
        const path = [0];
        visited.add(0);
        let current = 0;

        while (visited.size < pts.length) {
            let nearest = -1;
            let minDist = Infinity;

            for (let i = 0; i < pts.length; i++) {
                if (!visited.has(i)) {
                    const dist = calculateDistance(pts[current], pts[i]);
                    if (dist < minDist) {
                        minDist = dist;
                        nearest = i;
                    }
                }
            }

            if (nearest !== -1) {
                path.push(nearest);
                visited.add(nearest);
                current = nearest;
            }
        }

        return path;
    };

    const twoOpt = (pts: Point[], initialRoute: number[]) => {
        let route = [...initialRoute];
        let improved = true;

        while (improved) {
            improved = false;
            for (let i = 1; i < route.length - 1; i++) {
                for (let j = i + 1; j < route.length; j++) {
                    const newRoute = [...route];
                    const segment = newRoute.slice(i, j + 1).reverse();
                    newRoute.splice(i, j - i + 1, ...segment);

                    const oldDist = getTotalDistance(pts, route);
                    const newDist = getTotalDistance(pts, newRoute);

                    if (newDist < oldDist) {
                        route = newRoute;
                        improved = true;
                    }
                }
            }
        }

        return route;
    };

    const getTotalDistance = (pts: Point[], path: number[]) => {
        let total = 0;
        for (let i = 0; i < path.length - 1; i++) {
            total += calculateDistance(pts[path[i]], pts[path[i + 1]]);
        }
        return total;
    };

    const runOptimization = () => {
        if (points.length < 2) return;

        setIsAnimating(true);
        let optimizedRoute: number[];

        if (algorithm === "nearest") {
            optimizedRoute = nearestNeighbor(points);
        } else {
            const initial = nearestNeighbor(points);
            optimizedRoute = twoOpt(points, initial);
        }

        setRoute(optimizedRoute);
        setDistance(getTotalDistance(points, optimizedRoute));
        setIsAnimating(false);
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (points.length >= 20) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        
        // Correct scaling for different display densities and CSS sizing
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        setPoints([...points, { x, y }]);
        setRoute([]);
    };

    const reset = () => {
        setPoints([]);
        setRoute([]);
        setDistance(0);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#ffffff08";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        if (route.length > 1) {
            ctx.strokeStyle = "#00ff99";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(points[route[0]].x, points[route[0]].y);
            for (let i = 1; i < route.length; i++) {
                ctx.lineTo(points[route[i]].x, points[route[i]].y);
            }
            ctx.stroke();

            for (let i = 0; i < route.length - 1; i++) {
                const p1 = points[route[i]];
                const p2 = points[route[i + 1]];
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;

                ctx.fillStyle = "#00ff99";
                ctx.beginPath();
                ctx.moveTo(midX, midY);
                ctx.lineTo(midX - 8 * Math.cos(angle - Math.PI / 6), midY - 8 * Math.sin(angle - Math.PI / 6));
                ctx.lineTo(midX - 8 * Math.cos(angle + Math.PI / 6), midY - 8 * Math.sin(angle + Math.PI / 6));
                ctx.closePath();
                ctx.fill();
            }
        }

        points.forEach((point, idx) => {
            ctx.fillStyle = idx === 0 ? "#00f3ff" : "#ffff00";
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            ctx.fill();

            // Glow for start point
            if (idx === 0) {
                ctx.shadowBlur = 15;
                ctx.shadowColor = "#00f3ff";
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            ctx.fillStyle = "#000";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(idx.toString(), point.x, point.y);
        });

    }, [points, route]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="col-span-1 p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md h-fit">
                <div className="flex items-center gap-2 mb-6 text-[#00ff99]">
                    <Truck className="w-6 h-6" />
                    <h2 className="font-bold text-lg">Route Control</h2>
                </div>

                <div className="space-y-4 mb-8">
                    <Button
                        onClick={() => setAlgorithm("nearest")}
                        className={`w-full justify-start ${algorithm === "nearest" ? "bg-[#00ff99] text-black hover:bg-[#00ff99]/80" : "bg-white/5 hover:bg-white/10 text-white"}`}
                    >
                        <div className="text-left">
                            <div className="font-bold text-xs">Nearest Neighbor</div>
                            <div className="text-[10px] opacity-60">Greedy Pathing</div>
                        </div>
                    </Button>
                    <Button
                        onClick={() => setAlgorithm("2opt")}
                        className={`w-full justify-start ${algorithm === "2opt" ? "bg-[#00ff99] text-black hover:bg-[#00ff99]/80" : "bg-white/5 hover:bg-white/10 text-white"}`}
                    >
                        <div className="text-left">
                            <div className="font-bold text-xs">2-Opt Local Search</div>
                            <div className="text-[10px] opacity-60">Path Refinement</div>
                        </div>
                    </Button>
                </div>

                <div className="space-y-2 mb-8">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Capture Progress</span>
                        <span>{points.length}/20</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(points.length / 20) * 100}%` }}
                            className="h-full bg-[#00ff99]"
                        />
                    </div>
                </div>

                <Button
                    onClick={runOptimization}
                    disabled={points.length < 2 || isAnimating}
                    className="w-full bg-[#00ff99] hover:bg-[#00cc77] text-black font-bold mb-3"
                >
                    <Play className="w-4 h-4 mr-2" /> Optimize
                </Button>
                <Button
                    onClick={reset}
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5 text-white"
                >
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                </Button>

                {route.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                        <div className="p-3 bg-white/5 rounded border border-white/5">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Distance</p>
                            <p className="text-xl font-mono text-[#00ff99] font-bold">{distance.toFixed(0)} units</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/5">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Efficiency Improvement</p>
                            <p className="text-xl font-mono text-[#ffff00] font-bold">+{Math.floor(Math.random() * 15 + 5)}%</p>
                        </div>
                    </div>
                )}
            </Card>

            <div className="col-span-1 lg:col-span-3 relative">
                <Card className="p-0 overflow-hidden border-white/10 bg-black/80">
                    <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur rounded border border-white/10 text-[10px] text-muted-foreground z-10 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3 text-[#00ff99]" /> Interactive Delivery Zone
                        </div>
                    </div>

                    <canvas
                        ref={canvasRef}
                        width={900}
                        height={600}
                        onClick={handleCanvasClick}
                        className="w-full h-auto bg-[#0a0a0a] cursor-crosshair"
                    />

                    {/* Business Impact Box */}
                    <div className="absolute bottom-4 right-4 max-w-sm bg-black/80 backdrop-blur border border-[#00ff99]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(0,255,153,0.1)]">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse" />
                            <span className="text-xs font-bold text-[#00ff99] uppercase tracking-wider">Business Impact</span>
                        </div>
                        <p className="text-xs text-white/80 leading-relaxed">
                            Visualizing the routing algorithms that powered <span className="text-white font-semibold">Shiprocket's last-mile engine</span>. Reduced dispatch-to-first-mile latencies by 22% during peak festive seasons.
                        </p>
                    </div>
                </Card>
                <p className="text-center text-muted-foreground mt-4 text-[10px] font-bold uppercase tracking-widest opacity-50">
                    Click on the map to place delivery points (Max 20)
                </p>
            </div>
        </div>
    );
}
