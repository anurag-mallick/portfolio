"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, Pause, RefreshCw } from "lucide-react";

interface Request {
    id: number;
    timestamp: number;
    status: "pending" | "accepted" | "rejected";
    y: number;
}

export function RateLimiter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [bucketSize, setBucketSize] = useState(10);
    const [refillRate, setRefillRate] = useState(2);
    const [requestPattern, setRequestPattern] = useState<"steady" | "burst">("steady");
    const [isRunning, setIsRunning] = useState(false);
    const [tokens, setTokens] = useState(10);
    const [requests, setRequests] = useState<Request[]>([]);
    const [stats, setStats] = useState({ accepted: 0, rejected: 0 });
    const requestIdRef = useRef(0);
    const animationRef = useRef<number | undefined>(undefined);

    const generateRequest = (): Request => {
        return {
            id: requestIdRef.current++,
            timestamp: Date.now(),
            status: "pending",
            y: Math.random() * 400,
        };
    };

    const processRequest = (currentTokens: number): { newTokens: number; accepted: boolean } => {
        if (currentTokens >= 1) {
            return { newTokens: currentTokens - 1, accepted: true };
        }
        return { newTokens: currentTokens, accepted: false };
    };

    useEffect(() => {
        if (!isRunning) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        let lastRefill = Date.now();
        let lastRequest = Date.now();

        const animate = () => {
            const now = Date.now();

            // Refill tokens
            if (now - lastRefill >= 1000) {
                setTokens(prev => Math.min(bucketSize, prev + refillRate));
                lastRefill = now;
            }

            // Generate requests based on pattern
            const requestInterval = requestPattern === "steady" ? 500 : (Math.random() < 0.3 ? 100 : 1000);
            if (now - lastRequest >= requestInterval) {
                const newReq = generateRequest();
                setRequests(prev => [...prev, newReq]);
                lastRequest = now;

                // Process request
                setTokens(currentTokens => {
                    const { newTokens, accepted } = processRequest(currentTokens);

                    setTimeout(() => {
                        setRequests(reqs =>
                            reqs.map(r => r.id === newReq.id ? { ...r, status: accepted ? "accepted" : "rejected" } : r)
                        );
                        setStats(s => ({
                            accepted: s.accepted + (accepted ? 1 : 0),
                            rejected: s.rejected + (accepted ? 0 : 1),
                        }));

                        // Remove old requests
                        setTimeout(() => {
                            setRequests(reqs => reqs.filter(r => r.id !== newReq.id));
                        }, 2000);
                    }, 100);

                    return newTokens;
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isRunning, bucketSize, refillRate, requestPattern]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw token bucket
        const bucketX = 50;
        const bucketY = 50;
        const bucketWidth = 100;
        const bucketHeight = 300;

        ctx.strokeStyle = "#ff0080";
        ctx.lineWidth = 3;
        ctx.strokeRect(bucketX, bucketY, bucketWidth, bucketHeight);

        // Fill level
        const fillHeight = (tokens / bucketSize) * bucketHeight;
        const gradient = ctx.createLinearGradient(0, bucketY + bucketHeight - fillHeight, 0, bucketY + bucketHeight);
        gradient.addColorStop(0, "#ff0080");
        gradient.addColorStop(1, "#ff008040");
        ctx.fillStyle = gradient;
        ctx.fillRect(bucketX, bucketY + bucketHeight - fillHeight, bucketWidth, fillHeight);

        // Token count
        ctx.fillStyle = "#fff";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${tokens.toFixed(1)}`, bucketX + bucketWidth / 2, bucketY + bucketHeight / 2);
        ctx.font = "12px sans-serif";
        ctx.fillText("tokens", bucketX + bucketWidth / 2, bucketY + bucketHeight / 2 + 20);

        // Draw requests
        requests.forEach(req => {
            const x = 250 + (Date.now() - req.timestamp) * 0.3;

            if (req.status === "pending") {
                ctx.fillStyle = "#ffff00";
            } else if (req.status === "accepted") {
                ctx.fillStyle = "#00ff99";
            } else {
                ctx.fillStyle = "#ff0000";
            }

            ctx.beginPath();
            ctx.arc(x, req.y, 8, 0, Math.PI * 2);
            ctx.fill();

            // Arrow
            if (req.status === "pending") {
                ctx.strokeStyle = "#ffff00";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x - 15, req.y);
                ctx.lineTo(x - 5, req.y);
                ctx.stroke();
            }
        });

        // Labels
        ctx.fillStyle = "#888";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Token Bucket", bucketX, bucketY - 10);
        ctx.fillText("Incoming Requests →", 250, 30);

    }, [tokens, requests, bucketSize]);

    const reset = () => {
        setIsRunning(false);
        setTokens(bucketSize);
        setRequests([]);
        setStats({ accepted: 0, rejected: 0 });
        requestIdRef.current = 0;
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-6 text-[#ff0080]">Configuration</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Bucket Size: {bucketSize}</label>
                        <input
                            type="range"
                            min="5"
                            max="50"
                            value={bucketSize}
                            onChange={(e) => {
                                setBucketSize(Number(e.target.value));
                                setTokens(Number(e.target.value));
                            }}
                            disabled={isRunning}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Refill Rate: {refillRate}/sec</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={refillRate}
                            onChange={(e) => setRefillRate(Number(e.target.value))}
                            disabled={isRunning}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Request Pattern</label>
                        <select
                            value={requestPattern}
                            onChange={(e) => setRequestPattern(e.target.value as "steady" | "burst")}
                            disabled={isRunning}
                            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white"
                        >
                            <option value="steady">Steady</option>
                            <option value="burst">Bursty</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={() => setIsRunning(!isRunning)}
                        className="bg-[#ff0080] hover:bg-[#d10069] text-white"
                    >
                        {isRunning ? <><Pause className="w-4 h-4 mr-2" /> Pause</> : <><Play className="w-4 h-4 mr-2" /> Start</>}
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

            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-4 text-[#ff0080]">Token Bucket Visualization</h2>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-auto bg-black/40 rounded-lg"
                />

                <div className="flex gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#ffff00] rounded-full"></div>
                        <span>Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#00ff99] rounded-full"></div>
                        <span>Accepted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#ff0000] rounded-full"></div>
                        <span>Rejected</span>
                    </div>
                </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-4 text-[#ff0080]">Statistics</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                        <div className="text-sm text-muted-foreground mb-2">Accepted Requests</div>
                        <div className="text-3xl font-bold text-[#00ff99]">{stats.accepted}</div>
                    </div>

                    <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                        <div className="text-sm text-muted-foreground mb-2">Rejected Requests</div>
                        <div className="text-3xl font-bold text-[#ff0000]">{stats.rejected}</div>
                    </div>

                    <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                        <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
                        <div className="text-3xl font-bold text-[#00f3ff]">
                            {stats.accepted + stats.rejected > 0
                                ? ((stats.accepted / (stats.accepted + stats.rejected)) * 100).toFixed(1)
                                : 0}%
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
