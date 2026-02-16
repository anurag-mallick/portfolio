"use client";

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, TrendingUp, Info, AlertTriangle, BarChart3, Users, Scale, Trophy, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Mock Bidders
const BIDDERS = [
    { name: 'Quantum Infrastructure', tech: 88, bid: 4200, history: 90 },
    { name: 'Global Metro Corp', tech: 92, bid: 4500, history: 95 },
    { name: 'Neo-Builders Ltd', tech: 75, bid: 3800, history: 60 },
];

export function ProcurementMC() {
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [techWeight, setTechWeight] = useState(70);

    const runSimulation = () => {
        setRunning(true);
        setTimeout(() => {
            const wins: any = { 'Quantum Infrastructure': 0, 'Global Metro Corp': 0, 'Neo-Builders Ltd': 0 };
            const finWeight = 100 - techWeight;

            // Run 5000 simulations
            for (let i = 0; i < 5000; i++) {
                let bestScore = -1;
                let winner = '';

                BIDDERS.forEach(b => {
                    // Random noise in evaluation (+/- 5%)
                    const noise = 0.95 + (Math.random() * 0.1);
                    const techScore = b.tech * (techWeight / 100) * noise;

                    // Inverse bid score (lower bid = higher score)
                    const minBid = 3800;
                    const finScore = (minBid / b.bid) * 100 * (finWeight / 100) * noise;

                    const total = techScore + finScore;
                    if (total > bestScore) {
                        bestScore = total;
                        winner = b.name;
                    }
                });
                wins[winner]++;
            }

            setResults(wins);
            setRunning(false);
        }, 1500);
    };

    const chartData = useMemo(() => {
        if (!results) return null;
        return {
            labels: Object.keys(results),
            datasets: [
                {
                    label: 'Win Probability (%)',
                    data: Object.values(results).map((v: any) => (v / 5000) * 100),
                    backgroundColor: [
                        'rgba(0, 243, 255, 0.5)',
                        'rgba(255, 0, 255, 0.5)',
                        'rgba(255, 255, 0, 0.5)',
                    ],
                    borderColor: ['#00f3ff', '#ff00ff', '#ffff00'],
                    borderWidth: 1,
                },
            ],
        };
    }, [results]);

    const chartOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { family: 'Share Tech Mono' },
                bodyFont: { family: 'Share Tech Mono' },
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#888', font: { family: 'Share Tech Mono' } }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#fff', font: { family: 'Share Tech Mono', size: 10 } }
            },
        },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px] lg:h-[650px]">
            <Card className="lg:col-span-4 p-6 bg-zinc-900/60 border-white/10 flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-[#ffff00]" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Model Inputs</h3>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-muted-foreground">Technical Weight</span>
                            <span className="text-[#ffff00]">{techWeight}%</span>
                        </div>
                        <input
                            type="range" min={0} max={100} value={techWeight}
                            onChange={(e) => setTechWeight(parseInt(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ffff00]"
                        />
                        <div className="flex justify-between text-[8px] text-muted-foreground">
                            <span>QCBS (30:70)</span>
                            <span>L1 (0:100)</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Bidders</span>
                        {BIDDERS.map((b, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-lg flex justify-between items-center">
                                <span className="text-[10px] font-bold text-white truncate w-1/2">{b.name}</span>
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <div className="text-[8px] text-muted-foreground">TECH</div>
                                        <div className="text-[10px] font-mono">{b.tech}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[8px] text-muted-foreground">BID</div>
                                        <div className="text-[10px] font-mono">${(b.bid / 1000).toFixed(1)}M</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={runSimulation}
                    disabled={running}
                    className="w-full bg-[#ffff00]/20 hover:bg-[#ffff00]/30 text-[#ffff00] border border-[#ffff00]/50 h-14 font-bold tracking-widest"
                >
                    {running ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    RUN 5,000 SIMULATIONS
                </Button>
            </Card>

            <div className="lg:col-span-8 flex flex-col gap-6">
                <Card className="flex-1 p-6 bg-zinc-900/60 border-white/10 overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[#00f3ff]" />
                            <h3 className="font-bold text-white uppercase tracking-tighter">Award Probability Distribution</h3>
                        </div>
                        {results && <Trophy className="w-5 h-5 text-[#ffff00] animate-bounce" />}
                    </div>

                    <div className="flex-1 min-h-0">
                        {chartData ? (
                            <Bar data={chartData} options={chartOptions} />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-black/20 text-muted-foreground">
                                <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
                                <span className="text-xs uppercase tracking-widest font-bold">Waiting for model execution...</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                            <div className="text-[10px] text-muted-foreground uppercase mb-1">Sensitivity Analysis</div>
                            <p className="text-xs text-white/70">The tender is <span className="text-[#ffff00]">High</span>ly sensitive to technical score variations.</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                            <div className="text-[10px] text-muted-foreground uppercase mb-1">Risk of Litigation</div>
                            <p className="text-xs text-white/70">Probability of "Neo-Builders" protest: <span className="text-red-500">12.4%</span></p>
                        </div>
                    </div>
                </Card>

                {/* Business Impact Box */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#ffff00]/30 rounded-xl p-5 shadow-[0_0_20px_rgba(255,255,0,0.1)]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#ffff00] animate-pulse" />
                        <span className="text-xs font-bold text-[#ffff00] uppercase tracking-widest">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-retro">
                        Modeled after <span className="text-white font-semibold underline decoration-[#ffff00]/50">₹4,000+ Cr procurement processes</span> at Delhi Metro Rail.
                        Ensures selection objectivity and mitigates legal risk during complex government awards.
                    </p>
                </div>
            </div>
        </div>
    );
}
