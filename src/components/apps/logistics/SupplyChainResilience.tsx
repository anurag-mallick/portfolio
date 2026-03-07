"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Ship, AlertTriangle, TrendingUp, Anchor, BarChart3, Wind, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Route {
    id: string;
    from: string;
    to: string;
    utilization: number;
    delay: number;
    risk: number;
}

const ROUTES: Route[] = [
    { id: '1', from: 'Shanghai', to: 'Los Angeles', utilization: 85, delay: 0, risk: 15 },
    { id: '2', from: 'Singapore', to: 'Rotterdam', utilization: 92, delay: 0, risk: 20 },
    { id: '3', from: 'Mumbai', to: 'Dubai', utilization: 78, delay: 0, risk: 10 },
    { id: '4', from: 'Santos', to: 'Hamina', utilization: 65, delay: 0, risk: 40 },
];

export function SupplyChainResilience() {
    const [scenario, setScenario] = useState<'normal' | 'storm' | 'port-closure' | 'congestion'>('normal');

    const simulatedRoutes = useMemo(() => {
        return ROUTES.map(route => {
            let delay = 0;
            let risk = route.risk;
            let utilization = route.utilization;

            if (scenario === 'storm' && (route.id === '2' || route.id === '4')) {
                delay = 48;
                risk += 30;
            } else if (scenario === 'port-closure' && route.id === '1') {
                delay = 120;
                risk = 100;
                utilization = 0;
            } else if (scenario === 'congestion') {
                delay = 24;
                utilization = Math.min(100, utilization + 15);
            }

            return { ...route, delay, risk, utilization };
        });
    }, [scenario]);

    const globalMetrics = useMemo(() => {
        const avgDelay = simulatedRoutes.reduce((acc, r) => acc + r.delay, 0) / ROUTES.length;
        const avgRisk = simulatedRoutes.reduce((acc, r) => acc + r.risk, 0) / ROUTES.length;
        const totalThroughput = simulatedRoutes.reduce((acc, r) => acc + (r.utilization > 0 ? 100 - r.delay / 2 : 0), 0) / ROUTES.length;

        return { avgDelay, avgRisk, totalThroughput };
    }, [simulatedRoutes]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Sidebar */}
            <Card className="lg:col-span-4 p-6 bg-zinc-900/50 border-white/10 flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-2 text-[#00ff99]">
                    <Globe className="w-6 h-6" />
                    <h2 className="font-bold text-lg uppercase tracking-wider">Supply Chain Digital Twin</h2>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Simulate global logistics disruptions and analyze the ripple effect on throughput and lead times.
                </p>

                <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Disruption Scenarios</label>
                    <button 
                        onClick={() => setScenario('normal')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${scenario === 'normal' ? 'bg-[#00ff99]/10 border-[#00ff99] text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}
                    >
                        <span className="text-sm font-bold">Standard Operations</span>
                        <Activity className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setScenario('storm')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${scenario === 'storm' ? 'bg-yellow-500/10 border-yellow-500 text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}
                    >
                        <span className="text-sm font-bold">Maritime Storm Warning</span>
                        <Wind className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setScenario('port-closure')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${scenario === 'port-closure' ? 'bg-red-500/10 border-red-500 text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}
                    >
                        <span className="text-sm font-bold">Major Port Closure</span>
                        <AlertTriangle className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-auto space-y-4 pt-6 border-t border-white/10 text-white">
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] uppercase font-bold opacity-50">Global Lead Time Delta</span>
                            <span className={`text-sm font-mono font-bold ${globalMetrics.avgDelay > 0 ? 'text-yellow-500' : 'text-[#00ff99]'}`}>
                                +{globalMetrics.avgDelay.toFixed(0)}h
                            </span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ width: `${Math.min(100, globalMetrics.avgDelay)}%` }}
                                className="h-full bg-current" 
                                style={{ color: globalMetrics.avgDelay > 24 ? '#ef4444' : '#00ff99'}}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Main Map/Grid Visualization */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {simulatedRoutes.map((route) => (
                        <Card key={route.id} className="p-4 bg-zinc-900/40 border-white/5 relative overflow-hidden group">
                            <div className="flex items-center gap-2 mb-3">
                                <Ship className={`w-4 h-4 group-hover:rotate-12 transition-transform ${route.delay > 48 ? 'text-red-500' : 'text-[#00ff99]'}`} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{route.from} → {route.to}</span>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-2xl font-black font-mono text-white">{route.utilization}%</span>
                                    <span className="text-[10px] font-bold opacity-50 uppercase">Capacity</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ width: `${route.utilization}%`, backgroundColor: route.risk > 50 ? '#ef4444' : '#00ff99' }}
                                        className="h-full" 
                                    />
                                </div>
                                {route.delay > 0 && (
                                    <div className="flex items-center gap-1 text-[#ff0055] font-bold text-[10px] uppercase animate-pulse">
                                        <AlertTriangle className="w-3 h-3" /> Delay: {route.delay}h
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="flex-1 bg-black/60 border-white/10 p-8 relative overflow-hidden min-h-[400px]">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 800 400">
                            <path d="M 50 200 Q 200 50, 400 200 T 750 200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                            <circle cx="50" cy="200" r="4" fill="white" />
                            <circle cx="750" cy="200" r="4" fill="white" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Lead-Time Volatility</h3>
                                <p className="text-xs text-muted-foreground">Monte Carlo simulation of arrival probabilities</p>
                            </div>
                            <Button className="bg-white/5 border-white/10 text-white text-[10px] font-bold">
                                RECALCULATE MODEL
                            </Button>
                        </div>

                        <div className="flex-1 flex items-end gap-2 pb-8">
                            {[40, 65, 30, 85, 45, 95, 70, 80, 55, 90, 60, 75, 50, 85, 40].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h * (globalMetrics.totalThroughput / 100)}%` }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex-1 bg-gradient-to-t from-[#00ff99]/20 to-[#00ff99] rounded-t-sm"
                                />
                            ))}
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Risk Exposure</div>
                                    <div className="text-xl font-bold text-white">{globalMetrics.avgRisk.toFixed(1)}%</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                                    <BarChart3 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Throughput Index</div>
                                    <div className="text-xl font-bold text-white">{globalMetrics.totalThroughput.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
