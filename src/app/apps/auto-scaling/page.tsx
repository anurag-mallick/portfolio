"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function AutoScalingPage() {
    const [cpuThreshold, setCpuThreshold] = useState(70);
    const [currentCPU, setCurrentCPU] = useState(45);
    const [pods, setPods] = useState(3);

    const shouldScaleUp = currentCPU > cpuThreshold;
    const shouldScaleDown = currentCPU < (cpuThreshold - 20);

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#algorithms">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Algorithms
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <TrendingUp className="w-8 h-8 text-[#2ecc71]" />
                    <h1 className="text-3xl font-bold text-[#2ecc71]">Auto-Scaling Simulator</h1>
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2">CPU Threshold: {cpuThreshold}%</label>
                            <input type="range" min="50" max="90" value={cpuThreshold} onChange={(e) => setCpuThreshold(Number(e.target.value))} className="w-full" />
                        </div>
                        <div>
                            <label className="block text-sm mb-2">Current CPU: {currentCPU}%</label>
                            <input type="range" min="0" max="100" value={currentCPU} onChange={(e) => setCurrentCPU(Number(e.target.value))} className="w-full" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Scaling Decision</h3>
                    <div className="p-4 bg-black/40 rounded-lg">
                        {shouldScaleUp && (
                            <div className="text-lg text-red-400">⬆️ SCALE UP: CPU {currentCPU}% exceeds threshold {cpuThreshold}%</div>
                        )}
                        {shouldScaleDown && (
                            <div className="text-lg text-blue-400">⬇️ SCALE DOWN: CPU {currentCPU}% below {cpuThreshold - 20}%</div>
                        )}
                        {!shouldScaleUp && !shouldScaleDown && (
                            <div className="text-lg text-green-400">✓ STABLE: CPU within acceptable range</div>
                        )}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Current Pods</div>
                        <div className="text-3xl font-bold text-[#2ecc71]">{pods}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Target Pods</div>
                        <div className="text-3xl font-bold text-cyan-400">{shouldScaleUp ? pods + 2 : shouldScaleDown ? Math.max(1, pods - 1) : pods}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Monthly Cost</div>
                        <div className="text-3xl font-bold text-yellow-400">${(pods * 45).toFixed(2)}</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
