"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, RefreshCw, MapPin } from "lucide-react";

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
                    // Reverse segment
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
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

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

        // Clear
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
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

        // Draw route
        if (route.length > 1) {
            ctx.strokeStyle = "#00ff99";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(points[route[0]].x, points[route[0]].y);
            for (let i = 1; i < route.length; i++) {
                ctx.lineTo(points[route[i]].x, points[route[i]].y);
            }
            ctx.stroke();

            // Draw arrows
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

        // Draw points
        points.forEach((point, idx) => {
            ctx.fillStyle = idx === 0 ? "#00f3ff" : "#ffff00";
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#000";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(idx.toString(), point.x, point.y);
        });

    }, [points, route]);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <h2 className="text-xl font-bold text-[#00ff99]">Delivery Map</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{points.length}/20 stops placed</span>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    onClick={handleCanvasClick}
                    className="w-full h-auto bg-black/40 rounded-lg cursor-crosshair border-2 border-white/10 hover:border-[#00ff99]/30 transition-colors"
                />

                <p className="text-sm text-muted-foreground mt-4 text-center">
                    Click on the map to place delivery stops (max 20)
                </p>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-4 text-[#00ff99]">Algorithm Selection</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Button
                        onClick={() => setAlgorithm("nearest")}
                        className={`h-20 ${algorithm === "nearest" ? "bg-[#00ff99] text-black" : "bg-white/10"}`}
                    >
                        <div className="text-center">
                            <div className="font-bold">Nearest Neighbor</div>
                            <div className="text-xs opacity-70">Greedy approach - Fast</div>
                        </div>
                    </Button>

                    <Button
                        onClick={() => setAlgorithm("2opt")}
                        className={`h-20 ${algorithm === "2opt" ? "bg-[#00ff99] text-black" : "bg-white/10"}`}
                    >
                        <div className="text-center">
                            <div className="font-bold">2-Opt Optimization</div>
                            <div className="text-xs opacity-70">Iterative improvement</div>
                        </div>
                    </Button>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={runOptimization}
                        disabled={points.length < 2 || isAnimating}
                        className="flex-1 bg-[#00ff99] hover:bg-[#00cc77] text-black"
                    >
                        <Play className="w-4 h-4 mr-2" /> Optimize Route
                    </Button>

                    <Button
                        onClick={reset}
                        variant="outline"
                        className="border-white/20"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                </div>
            </Card>

            {route.length > 0 && (
                <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    <h2 className="text-xl font-bold mb-4 text-[#00ff99]">Route Metrics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="text-sm text-muted-foreground mb-2">Total Distance</div>
                            <div className="text-3xl font-bold text-[#00ff99]">{distance.toFixed(0)} units</div>
                        </div>

                        <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="text-sm text-muted-foreground mb-2">Stops</div>
                            <div className="text-3xl font-bold text-[#ffff00]">{points.length}</div>
                        </div>

                        <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="text-sm text-muted-foreground mb-2">Algorithm</div>
                            <div className="text-xl font-bold text-[#00f3ff]">{algorithm === "nearest" ? "Nearest" : "2-Opt"}</div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
