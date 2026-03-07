"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RefreshCw, Play } from "lucide-react";

interface SimulationPath {
    values: number[];
}

export function FXHedging() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [exposure, setExposure] = useState(1000000);
    const [currencyPair, setCurrencyPair] = useState("USD/EUR");
    const [timeHorizon, setTimeHorizon] = useState(90);
    const [volatility, setVolatility] = useState(15);
    const [isRunning, setIsRunning] = useState(false);
    const [var95, setVar95] = useState(0);
    const [paths, setPaths] = useState<SimulationPath[]>([]);

    const runSimulation = () => {
        setIsRunning(true);
        const numPaths = 50;
        const numSteps = timeHorizon;
        const dt = 1 / 252; // Daily steps
        const vol = volatility / 100;
        const initialRate = 1.0;

        const simulatedPaths: SimulationPath[] = [];

        for (let i = 0; i < numPaths; i++) {
            const path: number[] = [initialRate];
            let currentRate = initialRate;

            for (let j = 0; j < numSteps; j++) {
                const randomShock = (Math.random() - 0.5) * 2; // Simplified random walk
                const drift = 0;
                const change = drift * dt + vol * Math.sqrt(dt) * randomShock;
                currentRate = currentRate * (1 + change);
                path.push(currentRate);
            }

            simulatedPaths.push({ values: path });
        }

        setPaths(simulatedPaths);

        // Calculate 95% VaR
        const finalValues = simulatedPaths.map(p => p.values[p.values.length - 1]);
        finalValues.sort((a, b) => a - b);
        const var95Index = Math.floor(finalValues.length * 0.05);
        const var95Value = Math.abs(finalValues[var95Index] - initialRate) * exposure;
        setVar95(var95Value);

        setIsRunning(false);
    };

    useEffect(() => {
        if (paths.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = "#ffffff10";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = (canvas.height / 10) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Find min/max for scaling
        let minVal = Infinity;
        let maxVal = -Infinity;
        paths.forEach(path => {
            path.values.forEach(val => {
                minVal = Math.min(minVal, val);
                maxVal = Math.max(maxVal, val);
            });
        });

        const range = maxVal - minVal;
        const padding = range * 0.1;

        // Draw paths
        paths.forEach((path, idx) => {
            ctx.strokeStyle = `rgba(255, 0, 255, ${0.3 + (idx / paths.length) * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            path.values.forEach((val, i) => {
                const x = (canvas.width / (path.values.length - 1)) * i;
                const y = canvas.height - ((val - minVal + padding) / (range + 2 * padding)) * canvas.height;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();
        });

        // Draw initial rate line
        ctx.strokeStyle = "#00f3ff";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        const initialY = canvas.height - ((1.0 - minVal + padding) / (range + 2 * padding)) * canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, initialY);
        ctx.lineTo(canvas.width, initialY);
        ctx.stroke();
        ctx.setLineDash([]);

    }, [paths]);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-6 text-[#ff00ff]">Simulation Parameters</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Exposure Amount (USD)</label>
                        <input
                            type="number"
                            value={exposure}
                            onChange={(e) => setExposure(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-[#ff00ff] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Currency Pair</label>
                        <select
                            value={currencyPair}
                            onChange={(e) => setCurrencyPair(e.target.value)}
                            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-[#ff00ff] focus:outline-none"
                        >
                            <option>USD/EUR</option>
                            <option>USD/GBP</option>
                            <option>USD/JPY</option>
                            <option>EUR/GBP</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Time Horizon (days): {timeHorizon}</label>
                        <input
                            type="range"
                            min="30"
                            max="365"
                            value={timeHorizon}
                            onChange={(e) => setTimeHorizon(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Volatility (%): {volatility}</label>
                        <input
                            type="range"
                            min="5"
                            max="50"
                            value={volatility}
                            onChange={(e) => setVolatility(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <Button
                        onClick={runSimulation}
                        disabled={isRunning}
                        className="bg-[#ff00ff] hover:bg-[#d10069] text-white"
                    >
                        <Play className="w-4 h-4 mr-2" /> Run Monte Carlo
                    </Button>
                    <Button
                        onClick={() => setPaths([])}
                        variant="outline"
                        className="border-white/20"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold mb-4 text-[#ff00ff]">FX Rate Simulation (50 Paths)</h2>
                <canvas
                    ref={canvasRef}
                    width={1000}
                    height={400}
                    className="w-full h-auto bg-black/40 rounded-lg"
                />
            </Card>

            {paths.length > 0 && (
                <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    <h2 className="text-xl font-bold mb-4 text-[#ff00ff]">Risk Metrics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="text-sm text-muted-foreground mb-2">95% Value at Risk</div>
                            <div className="text-3xl font-bold text-[#ff0080]">${var95.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>

                        <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="text-sm text-muted-foreground mb-2">Simulated Paths</div>
                            <div className="text-3xl font-bold text-[#00f3ff]">{paths.length}</div>
                        </div>

                        <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                            <div className="text-sm text-muted-foreground mb-2">Time Steps</div>
                            <div className="text-3xl font-bold text-[#ffff00]">{timeHorizon}</div>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4">
                        💡 VaR represents the maximum expected loss at 95% confidence level over the specified time horizon.
                    </p>
                </Card>
            )}
        </div>
    );
}
