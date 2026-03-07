"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, CheckCircle, AlertTriangle, Scale, Upload, ScanLine, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLoader } from '@/components/ui/AppLoader';

export function AITenderMatrix() {
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [weights, setWeights] = useState({ technical: 40, financial: 40, pastPerf: 20 });

    // Mock Parsed Data
    const bidders = [
        { id: 1, name: "Nexus Infrastructure", technical: 85, financial: 92, pastPerf: 78, tags: ["ISO 9001", "High Cap"] },
        { id: 2, name: "Global Corp Ltd.", technical: 95, financial: 60, pastPerf: 98, tags: ["Top Tier", "Expensive"] },
        { id: 3, name: "Alpha Builders", technical: 70, financial: 88, pastPerf: 65, tags: ["Local", "Budget"] },
    ];

    const calculateScore = (bidder: any) => {
        return ((bidder.technical * weights.technical) + (bidder.financial * weights.financial) + (bidder.pastPerf * weights.pastPerf)) / 100;
    };

    const sorted = [...bidders].sort((a, b) => calculateScore(b) - calculateScore(a));

    const handleUpload = () => {
        setAnalyzing(true);
        setProgress(0);
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 10;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setAnalyzing(false), 500);
            }
            setProgress(p);
        }, 200);
    };

    if (loading) {
        return <AppLoader appName="AI Tender Matrix" onLoadComplete={() => setLoading(false)} />;
    }

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#ffff00]">
                        <Upload className="w-5 h-5" /> Ingestion
                    </h2>

                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#ffff00]/50 transition-colors cursor-pointer" onClick={handleUpload}>
                        <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drag & Drop Tender Documents (PDF/Excel)</p>
                        <Button className="mt-4 w-full bg-[#ffff00] text-black hover:bg-yellow-400">
                            {analyzing ? "Parsing..." : "Analyze Docs"}
                        </Button>
                    </div>

                    {analyzing && (
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs text-[#ffff00]">
                                <span>Scanning entities...</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#ffff00]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                                &gt; Extracting Financials... OK<br />
                                &gt; Verifying Compliance... OK<br />
                                &gt; Normalizing Scores...
                            </div>
                        </div>
                    )}
                </Card>

                <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md">
                    <h3 className="font-bold mb-4 border-b border-white/10 pb-2">Weighting Criteria</h3>
                    <div className="space-y-4">
                        <Range label="Technical" val={weights.technical} change={(v: number) => setWeights({ ...weights, technical: v })} />
                        <Range label="Financial" val={weights.financial} change={(v: number) => setWeights({ ...weights, financial: v })} />
                        <Range label="History" val={weights.pastPerf} change={(v: number) => setWeights({ ...weights, pastPerf: v })} />
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-2">
                <Card className="p-8 bg-zinc-900/50 border-white/10 backdrop-blur-md min-h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Scale className="w-6 h-6 text-[#ffff00]" /> Ranked Analysis
                        </h2>
                        <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                            AI Confidence: 98.4%
                        </span>
                    </div>

                    <div className="space-y-4">
                        {sorted.map((b, i) => (
                            <motion.div
                                layout
                                key={b.id}
                                className={`p-4 rounded-lg border ${i === 0 ? 'border-[#ffff00] bg-[#ffff00]/5' : 'border-white/5 bg-white/5'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-[#ffff00] text-black' : 'bg-white/10'}`}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{b.name}</h3>
                                            <div className="flex gap-2 mt-1">
                                                {b.tags.map((t: string) => <span key={t} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">{t}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold font-mono text-[#ffff00]">{calculateScore(b).toFixed(1)}</div>
                                        <div className="text-xs text-muted-foreground">Weighted Score</div>
                                    </div>
                                </div>

                                {/* Mini Radar/Bar Viz */}
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    <Bar label="Tech" val={b.technical} max={100} color="bg-blue-500" />
                                    <Bar label="Fin" val={b.financial} max={100} color="bg-green-500" />
                                    <Bar label="Hist" val={b.pastPerf} max={100} color="bg-purple-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

const Range = ({ label, val, change }: any) => (
    <div>
        <div className="flex justify-between text-xs mb-1">
            <span>{label}</span>
            <span className="text-[#ffff00]">{val}%</span>
        </div>
        <input type="range" value={val} onChange={e => change(Number(e.target.value))} className="w-full accent-[#ffff00] h-1 bg-white/10 rounded-lg cursor-pointer" />
    </div>
);

const Bar = ({ label, val, max, color }: any) => (
    <div className="bg-black/20 rounded p-1.5 border border-white/5">
        <div className="flex justify-between text-[10px] mb-1">
            <span className="opacity-70">{label}</span>
            <span>{val}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${(val / max) * 100}%` }} />
        </div>
    </div>
);
