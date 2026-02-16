"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

export function CompoundInterest() {
    const [principal, setPrincipal] = useState(10000);
    const [monthly, setMonthly] = useState(500);
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(20);

    // Calculate Data
    const data = [];
    let currentBalance = principal;
    const months = years * 12;

    for (let i = 0; i <= months; i++) {
        if (i % 12 === 0) {
            data.push({ year: i / 12, value: Math.round(currentBalance) });
        }
        currentBalance += monthly;
        currentBalance *= (1 + (rate / 100) / 12);
    }

    const totalInvested = principal + (monthly * months);
    const totalInterest = currentBalance - totalInvested;

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Control Panel */}
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md h-fit">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#00f3ff]">
                    <TrendingUp className="w-5 h-5" /> Parameters
                </h2>

                <div className="space-y-6">
                    <InputGroup
                        label="Initial Investment"
                        value={principal}
                        onChange={setPrincipal}
                        min={0} max={100000} step={1000}
                        icon={<DollarSign className="w-4 h-4" />}
                    />
                    <InputGroup
                        label="Monthly Contribution"
                        value={monthly}
                        onChange={setMonthly}
                        min={0} max={5000} step={100}
                        icon={<Calendar className="w-4 h-4" />}
                    />
                    <InputGroup
                        label="Interest Rate (%)"
                        value={rate}
                        onChange={setRate}
                        min={1} max={15} step={0.1}
                        icon={<Percent className="w-4 h-4" />}
                    />
                    <InputGroup
                        label="Time Period (Years)"
                        value={years}
                        onChange={setYears}
                        min={1} max={50} step={1}
                        icon={<Calendar className="w-4 h-4" />}
                    />
                </div>
            </Card>

            {/* Visualization Area */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 bg-zinc-900/50 border-white/10 backdrop-blur-md relative overflow-hidden min-h-[400px] flex flex-col">

                    <div className="flex flex-wrap gap-8 justify-between mb-12">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                            <h3 className="text-4xl font-bold text-[#00f3ff]">${Math.round(currentBalance).toLocaleString()}</h3>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
                            <h3 className="text-2xl font-bold text-white">${totalInvested.toLocaleString()}</h3>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                            <h3 className="text-2xl font-bold text-green-400">+${Math.round(totalInterest).toLocaleString()}</h3>
                        </div>
                    </div>

                    {/* Simple CSS Bar Graph Visualization for MVP */}
                    <div className="flex items-end justify-between gap-1 h-64 w-full">
                        {data.map((point, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group relative">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(point.value / currentBalance) * 100}%` }}
                                    className="bg-primary/50 rounded-t-sm group-hover:bg-primary transition-colors relative"
                                >
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black border border-white/10 p-2 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                                        Year {point.year}: ${point.value.toLocaleString()}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function InputGroup({ label, value, onChange, min, max, step, icon }: any) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                    {icon} {label}
                </label>
                <span className="text-sm font-mono text-white">{value.toLocaleString()}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00f3ff]"
            />
        </div>
    )
}
