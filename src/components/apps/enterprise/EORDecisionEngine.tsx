"use client";

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Network, FileText, CheckCircle2, AlertCircle, Clock, DollarSign, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const COUNTRY_LOGIC: any = {
    'Germany': { tax: 0.35, risk: 'Complex', timeline: '4-6 weeks', structure: 'EOR Preferred', fee: 599 },
    'India': { tax: 0.20, risk: 'Moderate', timeline: '2-4 weeks', structure: 'Direct / EOR', fee: 399 },
    'Singapore': { tax: 0.15, risk: 'Low', timeline: '1-2 weeks', structure: 'Direct / PEO', fee: 450 },
    'Brazil': { tax: 0.40, risk: 'High', timeline: '8-12 weeks', structure: 'EOR Only', fee: 750 },
    'United Kingdom': { tax: 0.25, risk: 'Low', timeline: '2-3 weeks', structure: 'Direct / PEO', fee: 499 },
};

export function EORDecisionEngine() {
    const [selectedCountries, setSelectedCountries] = useState<string[]>(['Germany', 'India']);
    const [headcount, setHeadcount] = useState(10);
    const [salary, setSalary] = useState(80000);
    const [showProposal, setShowProposal] = useState(false);

    const calc = useMemo(() => {
        let totalBase = headcount * salary;
        let totalBenefit = 0;
        let totalFees = 0;

        selectedCountries.forEach(c => {
            const data = COUNTRY_LOGIC[c];
            totalBenefit += (totalBase / selectedCountries.length) * data.tax;
            totalFees += data.fee * headcount;
        });

        return {
            base: totalBase,
            tax: totalBenefit,
            fees: totalFees,
            landed: totalBase + totalBenefit + totalFees,
            avgRisk: 'Moderate'
        };
    }, [selectedCountries, headcount, salary]);

    // Simple Sankey Implementation using SVG
    const Sankey = () => {
        const height = 300;
        const width = 800;
        const nodeWidth = 20;

        const flows = [
            { label: 'Total Budget', val: calc.landed, y: 50, h: 200, color: '#333' },
            { label: 'Base Salaries', val: calc.base, y: 50, h: 100, color: '#00f3ff' },
            { label: 'Tax & Benefits', val: calc.tax, y: 160, h: 60, color: '#ffff00' },
            { label: 'Service Fees', val: calc.fees, y: 230, h: 20, color: '#ff00ff' },
        ];

        return (
            <div className="w-full overflow-x-auto p-4 bg-black/40 rounded-xl border border-white/5">
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                    {/* Source Node */}
                    <rect x={50} y={50} width={nodeWidth} height={200} fill="#666" rx={2} />
                    <text x={40} y={150} fill="#888" fontSize="10" transform="rotate(-90, 40, 150)" textAnchor="middle">TOTAL BUDGET</text>

                    {/* Flow Paths */}
                    {flows.slice(1).map((f, i) => {
                        const startY = 50 + (i * 70); // simplistic positioning
                        return (
                            <g key={i}>
                                <path
                                    d={`M ${50 + nodeWidth} 150 C ${width / 2} 150, ${width / 2} ${f.y + f.h / 2}, ${width - 150} ${f.y + f.h / 2}`}
                                    fill="none"
                                    stroke={f.color}
                                    strokeWidth={Math.max(2, (f.val / calc.landed) * 100)}
                                    opacity={0.3}
                                />
                                <rect x={width - 150} y={f.y} width={nodeWidth} height={f.h} fill={f.color} rx={2} />
                                <text x={width - 120} y={f.y + f.h / 2 + 5} fill="white" fontSize="12" className="font-mono">
                                    {f.label} (${(f.val / 1000000).toFixed(1)}M)
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-4 p-6 bg-zinc-900/50 border-white/10 flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-[#ff00ff]" /> CONFIGURATION
                </h3>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-3">Target Countries</label>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(COUNTRY_LOGIC).map(c => (
                                <button
                                    key={c}
                                    onClick={() => {
                                        if (selectedCountries.includes(c)) setSelectedCountries(selectedCountries.filter(x => x !== c));
                                        else if (selectedCountries.length < 5) setSelectedCountries([...selectedCountries, c]);
                                    }}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${selectedCountries.includes(c)
                                            ? 'bg-[#ff00ff]/20 border-[#ff00ff] text-white shadow-[0_0_10px_rgba(255,0,255,0.3)]'
                                            : 'bg-white/5 border-white/10 text-muted-foreground'
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Control label="Headcount" value={headcount} min={1} max={100} onChange={setHeadcount} />
                    <Control label="Avg. Annual Salary ($)" value={salary} min={20000} max={250000} step={5000} onChange={setSalary} />
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <Button
                        onClick={() => setShowProposal(true)}
                        className="w-full bg-[#ff00ff] hover:bg-[#d900d9] text-white font-bold h-12 tracking-widest"
                    >
                        <FileText className="w-5 h-5 mr-2" /> CREATE EOR PROPOSAL
                    </Button>
                </div>
            </Card>

            <div className="lg:col-span-8 flex flex-col gap-6">
                <Card className="p-6 bg-zinc-900/50 border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Landed Cost Flow (Annualized)</h3>
                        <div className="text-2xl font-black text-[#00f3ff] font-mono">${(calc.landed / 1000000).toFixed(2)}M</div>
                    </div>
                    <Sankey />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResultCard
                        label="REC. STRUCTURE"
                        val={selectedCountries.length > 3 ? "ENTITY / EOR" : "EOR EXCLUSIVE"}
                        icon={<Network className="w-5 h-5 text-[#00f3ff]" />}
                    />
                    <ResultCard
                        label="COMPLIANCE RISK"
                        val={calc.avgRisk}
                        sub="3 Critical Red Flags"
                        icon={<AlertCircle className="w-5 h-5 text-[#ffff00]" />}
                        color="text-[#ffff00]"
                    />
                    <ResultCard
                        label="EST. SETUP TIME"
                        val="~6 Weeks"
                        sub="Optimized Fast-track"
                        icon={<Clock className="w-5 h-5 text-[#00ff99]" />}
                    />
                </div>

                {/* Impact Box */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#ff00ff]/30 rounded-xl p-5 shadow-[0_0_20px_rgba(255,0,255,0.1)]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse" />
                        <span className="text-xs font-bold text-[#ff00ff] uppercase tracking-widest">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                        Decision logic derived from my work on the <span className="text-white font-semibold underline decoration-[#ff00ff]/50">Avance EOR platform</span>.
                        Powered complex multi-country expansion models for clients, contributing to €275k ARR.
                    </p>
                </div>
            </div>

            {/* Proposal Modal Mock */}
            <AnimatePresence>
                {showProposal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }}
                            className="bg-zinc-900 border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-[#ff00ff]" /> STRATEGIC EOR PROPOSAL
                                </h2>
                                <button onClick={() => setShowProposal(false)} className="text-muted-foreground hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-12 overflow-y-auto font-serif text-zinc-300 leading-relaxed">
                                <div className="max-w-2xl mx-auto space-y-8">
                                    <div className="flex justify-between items-start border-b border-white/20 pb-8">
                                        <div>
                                            <div className="text-3xl font-black text-white mb-2">AVANCE</div>
                                            <div className="text-xs tracking-widest uppercase text-muted-foreground font-mono">Global Expansion Systems</div>
                                        </div>
                                        <div className="text-right text-sm font-mono">
                                            REF: EOR-{Math.floor(Math.random() * 9000) + 1000}<br />
                                            DATE: {new Date().toLocaleDateString()}
                                        </div>
                                    </div>

                                    <section>
                                        <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-tighter">1. EXECUTIVE SUMMARY</h4>
                                        <p>Based on your input of {headcount} employees across {selectedCountries.join(', ')}, we recommend a <strong>Hybrid Employment Strategy</strong>. For countries like {selectedCountries[0]}, a direct entity setup is justifiable, whereas {selectedCountries[1] || 'remaining regions'} should be handled via EOR to mitigate high compliance risks.</p>
                                    </section>

                                    <section className="bg-white/5 p-6 rounded-xl border border-white/10 font-mono">
                                        <h4 className="text-white font-bold text-sm mb-4">COST BREAKDOWN (USD)</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span>Annual Gross Pay:</span> <span>${calc.base.toLocaleString()}</span></div>
                                            <div className="flex justify-between"><span>Landed Employee Tax:</span> <span>${calc.tax.toLocaleString()}</span></div>
                                            <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-[#ff00ff]">
                                                <span>TOTAL CONTRACT VALUE:</span> <span>${calc.landed.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="text-center pt-8">
                                        <Button className="bg-[#ff00ff] text-white px-8 h-12 font-bold">
                                            DOWNLOAD FULL REPORT (PDF/SIGNED)
                                        </Button>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Control({ label, value, min, max, step = 1, onChange }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-[#ff00ff] font-mono">{value.toLocaleString()}</span>
            </div>
            <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff00ff]"
            />
        </div>
    );
}

function ResultCard({ label, val, sub, icon, color = "text-white" }: any) {
    return (
        <Card className="p-4 bg-zinc-900/40 border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
            </div>
            <div className={`text-lg font-black tracking-tighter ${color}`}>{val}</div>
            {sub && <div className="text-[10px] text-muted-foreground leading-none">{sub}</div>}
        </Card>
    );
}
