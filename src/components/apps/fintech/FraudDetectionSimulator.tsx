"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Activity, DollarSign, MapPin, AlertCircle, TrendingUp, History } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Transaction {
    id: string;
    amount: number;
    location: string;
    type: string;
    score: number;
    status: 'safe' | 'flagged' | 'blocked';
    timestamp: string;
}

const LOCATIONS = ['New York, US', 'London, UK', 'Mumbai, IN', 'Dubai, AE', 'Tokyo, JP', 'Lagos, NG', 'Moscow, RU'];
const TYPES = ['Wire Transfer', 'POS Purchase', 'ATM Withdrawal', 'Online Payment'];

export function FraudDetectionSimulator() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [stats, setStats] = useState({ totalProcessed: 0, flagged: 0, accuracy: 99.8 });
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of transaction feed
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transactions]);

    const generateTransaction = () => {
        const isSuspicious = Math.random() > 0.85;
        const amount = isSuspicious ? Math.floor(Math.random() * 50000) + 10000 : Math.floor(Math.random() * 2000) + 50;
        const score = isSuspicious ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 20);
        
        const tx: Transaction = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            amount,
            location: isSuspicious && Math.random() > 0.5 ? 'Unknown / Tor Nodes' : LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
            type: TYPES[Math.floor(Math.random() * TYPES.length)],
            score,
            status: score > 85 ? 'blocked' : score > 60 ? 'flagged' : 'safe',
            timestamp: new Date().toLocaleTimeString(),
        };

        setTransactions(prev => [...prev.slice(-15), tx]);
        setStats(prev => ({
            totalProcessed: prev.totalProcessed + 1,
            flagged: prev.flagged + (tx.status !== 'safe' ? 1 : 0),
            accuracy: 99.8 + (Math.random() * 0.1 - 0.05)
        }));
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isSimulating) {
            interval = setInterval(generateTransaction, 1500);
        }
        return () => clearInterval(interval);
    }, [isSimulating]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Monitor Header */}
            <div className="lg:col-span-12 flex justify-between items-center bg-zinc-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Sentinel Fraud Intelligence</h2>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-[#00ff99] animate-pulse' : 'bg-red-500'}`} />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                                {isSimulating ? 'Live Feed Active' : 'System Standby'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button 
                        onClick={() => setIsSimulating(!isSimulating)}
                        className={`h-11 px-6 font-bold tracking-widest ${isSimulating ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-primary text-black hover:bg-primary/90'}`}
                    >
                        {isSimulating ? 'PAUSE MONITOR' : 'START SIMULATION'}
                    </Button>
                </div>
            </div>

            {/* Main Stats */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard label="Total Processed" value={stats.totalProcessed} icon={<TrendingUp className="w-4 h-4" />} color="text-white" />
                    <StatCard label="Accuracy Rate" value={`${stats.accuracy.toFixed(2)}%`} icon={<Activity className="w-4 h-4" />} color="text-[#00f3ff]" />
                    <StatCard label="Flagged High-Risk" value={stats.flagged} icon={<ShieldAlert className="w-4 h-4" />} color="text-red-500" />
                </div>

                {/* Live Feed */}
                <Card className="flex-1 bg-black/40 border-white/10 p-6 flex flex-col min-h-[400px]">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                        <History className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Real-Time Transaction Stream</span>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        <AnimatePresence mode='popLayout'>
                            {transactions.map((tx) => (
                                <motion.div
                                    key={tx.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                        tx.status === 'blocked' ? 'bg-red-500/10 border-red-500/30' : 
                                        tx.status === 'flagged' ? 'bg-yellow-500/10 border-yellow-500/30' : 
                                        'bg-white/5 border-white/10'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${
                                            tx.status === 'blocked' ? 'bg-red-500/20 text-red-500' : 
                                            tx.status === 'flagged' ? 'bg-yellow-500/20 text-yellow-500' : 
                                            'bg-white/10 text-white'
                                        }`}>
                                            {tx.status === 'blocked' ? <ShieldAlert className="w-5 h-5" /> : 
                                             tx.status === 'flagged' ? <AlertCircle className="w-5 h-5" /> : 
                                             <ShieldCheck className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <div className="font-mono text-xs font-bold text-white">{tx.id}</div>
                                            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <MapPin className="w-2 h-2" /> {tx.location} • {tx.type}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <div className="font-mono font-bold text-white">${tx.amount.toLocaleString()}</div>
                                        <div className={`text-[10px] font-bold uppercase ${
                                            tx.score > 80 ? 'text-red-500' : tx.score > 50 ? 'text-yellow-500' : 'text-[#00ff99]'
                                        }`}>
                                            Risk Score: {tx.score}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </Card>
            </div>

            {/* Sidebar / Logic */}
            <Card className="lg:col-span-4 p-6 bg-zinc-900/50 border-white/10 flex flex-col gap-8">
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-primary" /> Active Ruleset
                    </h3>
                    <div className="space-y-4">
                        <RuleItem label="Velocity Check" status="Enabled" active />
                        <RuleItem label="Geo-Anomaly" status="Enabled" active />
                        <RuleItem label="Sanction Screening" status="Enabled" active />
                        <RuleItem label="Large Amount Verification" status="Enabled" active />
                    </div>
                </div>

                <div className="mt-auto bg-gradient-to-br from-zinc-950 to-black border border-primary/20 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Logic Insight</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                        Demonstrates heuristic and behavioral analysis for high-value fintech transactions. 
                        Similar to frameworks used for multi-country payment reconciliation and AML compliance.
                    </p>
                </div>
            </Card>
        </div>
    );
}

function StatCard({ label, value, icon, color }: any) {
    return (
        <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                {icon} <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-2xl font-black font-mono ${color}`}>{value}</div>
        </Card>
    );
}

function RuleItem({ label, status, active }: any) {
    return (
        <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
            <span className="text-xs text-white/80">{label}</span>
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded ${active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                {status}
            </span>
        </div>
    );
}
