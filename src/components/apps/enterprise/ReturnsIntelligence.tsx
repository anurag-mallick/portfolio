"use client";

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Activity, AlertTriangle, ShieldCheck, HeartPulse, History, Package, Image as ImageIcon, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Frames (using colorful gradients as placeholders for "video frames")
const FRAMES = [
    { id: 1, type: 'OK', label: 'Seal Intact', color: 'from-cyan-500 to-blue-500' },
    { id: 2, type: 'ISSUE', label: 'Wrong Item', color: 'from-orange-500 to-red-500' },
    { id: 3, type: 'ISSUE', label: 'Damaged Box', color: 'from-pink-500 to-purple-500' },
    { id: 4, type: 'OK', label: 'Product OK', color: 'from-green-500 to-emerald-500' },
    { id: 5, type: 'ISSUE', label: 'Used / Dirty', color: 'from-yellow-500 to-amber-500' },
];

export function ReturnsIntelligence() {
    const [selectedFrame, setSelectedFrame] = useState(0);
    const [classifications, setClassifications] = useState<any>({});
    const [badReturnRate, setBadReturnRate] = useState(12.5);

    const handleClassify = (type: string) => {
        setClassifications({ ...classifications, [selectedFrame]: type });
        if (type === 'FRAUD') setBadReturnRate(r => r + 1.2);
    };

    const npsImpact = useMemo(() => {
        const count = Object.values(classifications).filter(v => v === 'FRAUD' || v === 'DAMAGE').length;
        return Math.max(-100, 45 - (count * 8));
    }, [classifications]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px] lg:h-[650px]">
            {/* Visual Audit Section */}
            <Card className="lg:col-span-8 p-0 border-white/10 bg-zinc-900/40 relative overflow-hidden flex flex-col">
                <div className="bg-black/40 border-b border-white/5 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-[#ff0080]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">REVERSE LOGISTICS INSPECTOR</span>
                    </div>
                    <div className="flex gap-1">
                        {FRAMES.map((_, i) => (
                            <div key={i} className={`h-1 w-8 rounded-full ${i === selectedFrame ? 'bg-[#ff0080]' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative flex items-center justify-center p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedFrame}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className={`w-full max-w-xl aspect-video bg-gradient-to-br ${FRAMES[selectedFrame].color} rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex items-center justify-center`}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                                <Package className="w-24 h-24 mb-4 stroke-[1]" />
                                <span className="font-mono text-4xl font-black">FRAME #{selectedFrame + 1}</span>
                            </div>

                            {/* Scanning Overlay */}
                            <motion.div
                                initial={{ top: 0 }} animate={{ top: "100%" }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-white opacity-40 shadow-[0_0_20px_white]"
                            />

                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono border border-white/10">
                                    AUTO-TAG: {FRAMES[selectedFrame].label}
                                </div>
                                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono border border-white/10 text-[#ff0080]">
                                    VERDICT: {classifications[selectedFrame] || 'PENDING'}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="p-6 bg-black/40 border-t border-white/5">
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={() => handleClassify('CLEAN')}
                            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 border border-emerald-500/50 px-6 h-12 font-bold"
                        >
                            <ShieldCheck className="w-5 h-5 mr-3" /> CLEAN RETURN
                        </Button>
                        <Button
                            onClick={() => handleClassify('DAMAGE')}
                            className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 border border-orange-500/50 px-6 h-12 font-bold"
                        >
                            <AlertTriangle className="w-5 h-5 mr-3" /> QA ISSUE
                        </Button>
                        <Button
                            onClick={() => handleClassify('FRAUD')}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 px-6 h-12 font-bold"
                        >
                            <AlertTriangle className="w-5 h-5 mr-3" /> COUNTERFEIT
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-1/2 left-4 -translate-y-1/2 flex flex-col gap-2">
                    <Button variant="ghost" className="rounded-full w-10 h-10 p-0 hover:bg-white/10" onClick={() => setSelectedFrame(p => Math.max(0, p - 1))}>
                        <ChevronRight className="rotate-180" />
                    </Button>
                </div>
                <div className="absolute bottom-1/2 right-4 -translate-y-1/2 flex flex-col gap-2">
                    <Button variant="ghost" className="rounded-full w-10 h-10 p-0 hover:bg-white/10" onClick={() => setSelectedFrame(p => Math.min(4, p + 1))}>
                        <ChevronRight />
                    </Button>
                </div>
            </Card>

            {/* Analytics Section */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <Card className="flex-1 p-6 bg-zinc-900/60 border-white/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
                            <Activity className="w-5 h-5 text-[#ff0080]" />
                            IMPACT METRICS
                        </h3>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <span>Bad Return Rate</span>
                                    <span className="text-red-500">{badReturnRate.toFixed(1)}%</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: `${badReturnRate * 3}%` }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <span>NPS Impact</span>
                                    <span className={npsImpact > 0 ? 'text-emerald-500' : 'text-red-500'}>{npsImpact}</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20" />
                                    <div
                                        className={`h-full ${npsImpact > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                        style={{
                                            width: `${Math.abs(npsImpact)}%`,
                                            marginLeft: npsImpact > 0 ? '50%' : `${50 - Math.abs(npsImpact)}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 text-white/60 mb-4">
                            <History className="w-4 h-4" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">Historical Audit Logs</span>
                        </div>
                        <div className="space-y-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between text-[9px] font-mono p-2 bg-white/5 rounded">
                                    <span className="text-zinc-500">2026-02-16 14:0{i}</span>
                                    <span className="text-[#ff0080]">AUTO-VERDICT: PENDING</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Business Impact Box */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#ff0080]/30 rounded-xl p-5 shadow-[0_0_20px_rgba(255,0,128,0.1)]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#ff0080] animate-pulse" />
                        <span className="text-xs font-bold text-[#ff0080] uppercase tracking-widest">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-retro">
                        Derived from the <span className="text-white font-semibold underline decoration-[#ff0080]/50">Shiprocket Returns CRM</span> I owned.
                        Optimization led to <span className="text-[#ff0080]">+35% NPS</span> and a <span className="text-[#ff0080]">-30% reduction</span> in fraudulent returns.
                    </p>
                </div>
            </div>
        </div>
    );
}
