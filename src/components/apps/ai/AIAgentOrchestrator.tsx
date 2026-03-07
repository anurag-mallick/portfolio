"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, CreditCard, Calendar, LucideIcon, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface SubTask {
    id: string;
    agent: string;
    task: string;
    status: 'pending' | 'working' | 'done';
    icon: LucideIcon;
    color: string;
}

const AGENTS = [
    { id: 'orchestrator', label: 'Orchestrator', icon: Brain, color: '#00f3ff' },
    { id: 'researcher', label: 'Researcher', icon: Search, color: '#a855f7' },
    { id: 'booking', label: 'Booking Agent', icon: CreditCard, color: '#ff00ff' },
    { id: 'calendar', label: 'Scheduler', icon: Calendar, color: '#00ff99' },
];

export function AIAgentOrchestrator() {
    const [query, setQuery] = useState("Plan a business trip to Tokyo next month.");
    const [phase, setPhase] = useState<'idle' | 'analyzing' | 'executing' | 'completed'>('idle');
    const [subTasks, setSubTasks] = useState<SubTask[]>([]);

    const startExecution = () => {
        setPhase('analyzing');
        setSubTasks([]);

        setTimeout(() => {
            setPhase('executing');
            const tasks: SubTask[] = [
                { id: '1', agent: 'researcher', task: 'Search for flights & hotels', status: 'pending', icon: Search, color: '#a855f7' },
                { id: '2', agent: 'booking', task: 'Check availability & pricing', status: 'pending', icon: CreditCard, color: '#ff00ff' },
                { id: '3', agent: 'calendar', task: 'Add to corporate calendar', status: 'pending', icon: Calendar, color: '#00ff99' },
            ];
            setSubTasks(tasks);

            // Simulate sequence
            tasks.forEach((task, i) => {
                setTimeout(() => {
                    setSubTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'working' } : t));
                    setTimeout(() => {
                        setSubTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done' } : t));
                        if (i === tasks.length - 1) setPhase('completed');
                    }, 2000);
                }, (i + 1) * 2500);
            });
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
            {/* Control Panel */}
            <Card className="lg:col-span-4 p-6 bg-zinc-900/50 border-white/10 flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-[#00f3ff]">
                    <Brain className="w-6 h-6" />
                    <h2 className="font-bold text-lg uppercase tracking-wider">Agent Orchestrator</h2>
                </div>

                <div className="space-y-4 mb-8">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Natural Language Query</label>
                    <textarea 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors h-32 resize-none"
                    />
                </div>

                <Button 
                    onClick={startExecution}
                    disabled={phase !== 'idle' && phase !== 'completed'}
                    className="w-full bg-[#00f3ff] hover:bg-[#00f3ff]/80 text-black font-bold tracking-widest h-12"
                >
                    {phase === 'idle' || phase === 'completed' ? 'EXECUTE WORKFLOW' : 'WORKFLOW IN PROGRESS'}
                </Button>

                <div className="mt-auto pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-2 text-[#00f3ff]">
                        <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                        <span className="text-xs font-bold uppercase">System Status</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed italic">
                        Visualizing multi-agent task decomposition and autonomous execution. 
                        Inspired by LangChain & AutoGPT architectures.
                    </p>
                </div>
            </Card>

            {/* Visualizer Area */}
            <Card className="lg:col-span-8 bg-black/40 border-white/10 relative overflow-hidden flex flex-col p-8">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                <div className="relative z-10 flex flex-col items-center justify-center flex-1">
                    {/* Primary Agent (Orchestrator) */}
                    <motion.div 
                        animate={phase === 'analyzing' ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-24 h-24 rounded-full bg-[#00f3ff]/20 border-2 border-[#00f3ff] flex items-center justify-center mb-16 shadow-[0_0_30px_rgba(0,243,255,0.3)]"
                    >
                        <Brain className="w-12 h-12 text-[#00f3ff]" />
                    </motion.div>

                    {/* Sub-Tasks Container */}
                    <div className="w-full max-w-2xl space-y-4">
                        <AnimatePresence>
                            {subTasks.map((task, idx) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="relative flex items-center gap-6"
                                >
                                    {/* Connection Line */}
                                    <div className="absolute -top-16 left-12 w-0.5 h-16 bg-gradient-to-b from-[#00f3ff] to-transparent opacity-20" />
                                    
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 shadow-xl`} 
                                         style={{ 
                                             borderColor: `${task.color}50`, 
                                             backgroundColor: `${task.color}10`,
                                             boxShadow: task.status === 'working' ? `0 0 20px ${task.color}40` : 'none'
                                         }}>
                                        <task.icon className="w-6 h-6" style={{ color: task.color }} />
                                    </div>

                                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm flex justify-between items-center">
                                        <div>
                                            <div className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-1" style={{ color: task.color }}>
                                                {task.agent.toUpperCase()}
                                            </div>
                                            <div className="text-sm font-medium text-white">{task.task}</div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            {task.status === 'done' ? (
                                                <CheckCircle className="w-5 h-5 text-[#00ff99]" />
                                            ) : task.status === 'working' ? (
                                                <Loader2 className="w-5 h-5 text-white animate-spin opacity-50" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {phase === 'analyzing' && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 text-[#00f3ff] font-mono text-xs animate-pulse"
                        >
                            DECOMPOSING QUERY...
                        </motion.div>
                    )}

                    {phase === 'completed' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 bg-[#00ff99]/20 border border-[#00ff99]/50 text-[#00ff99] px-6 py-2 rounded-full text-xs font-bold"
                        >
                            TASK SUCCESSFULLY AGGREGATED
                        </motion.div>
                    )}
                </div>
            </Card>
        </div>
    );
}
