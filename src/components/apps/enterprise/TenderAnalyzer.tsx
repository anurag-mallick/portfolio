"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { ShieldAlert, CheckCircle, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export function TenderAnalyzer() {
    const [techScore, setTechScore] = useState(75);
    const [financialBid, setFinancialBid] = useState(60); // Lower is better usually, but here simulating "score"
    const [pastPerf, setPastPerf] = useState(80);
    const [compliance, setCompliance] = useState(90);
    const [riskScore, setRiskScore] = useState(0);

    useEffect(() => {
        // Simple weighted calculation
        // Risk increases if any score is low
        const avgScore = (techScore + financialBid + pastPerf + compliance) / 4;
        const risk = Math.max(0, 100 - avgScore);
        setRiskScore(Math.round(risk));
    }, [techScore, financialBid, pastPerf, compliance]);

    const data = {
        labels: ['Technical Capability', 'Financial Health', 'Past Performance', 'Compliance', 'Resource Availability'],
        datasets: [
            {
                label: 'Current Vendor Assessment',
                data: [techScore, financialBid, pastPerf, compliance, (techScore + pastPerf) / 2], // Resource is derived
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                borderColor: '#ffff00',
                borderWidth: 2,
                pointBackgroundColor: '#ffff00',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ffff00',
            },
            {
                label: 'Minimum Qualified Threshold',
                data: [60, 50, 60, 80, 50],
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#666',
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 0,
            }
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: '#aaa', font: { size: 12 } },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: { display: false, backdropColor: 'transparent' }
            },
        },
        plugins: {
            legend: {
                labels: { color: '#fff' },
                position: 'bottom' as const,
            },
        },
        maintainAspectRatio: false,
    };

    const getRecommendation = () => {
        if (riskScore > 40) return { text: 'REJECT BID', color: 'text-[#ff0055]', icon: <ShieldAlert className="w-5 h-5" /> };
        if (riskScore > 20) return { text: 'REQUIRE REVIEW', color: 'text-[#ffff00]', icon: <AlertTriangle className="w-5 h-5" /> };
        return { text: 'RECOMMEND AWARD', color: 'text-[#00ff99]', icon: <CheckCircle className="w-5 h-5" /> };
    }

    const rec = getRecommendation();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px] lg:h-[600px]">
            {/* Chart Section */}
            <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md relative flex flex-col items-center justify-center">
                <div className="w-full h-full min-h-[300px] relative">
                    <Radar data={data} options={options} />
                </div>

                {/* Risk Overlay */}
                <div className="absolute top-4 right-4 flex flex-col items-end">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Risk Score</div>
                    <div className={`text-3xl font-bold font-mono ${riskScore > 40 ? 'text-[#ff0055]' : riskScore > 20 ? 'text-[#ffff00]' : 'text-[#00ff99]'}`}>
                        {riskScore}/100
                    </div>
                </div>
            </Card>

            {/* Controls Section */}
            <div className="flex flex-col gap-6">
                <Card className="flex-1 p-6 bg-zinc-900/50 border-white/10">
                    <h3 className="font-bold text-[#ffff00] mb-6 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Evaluation Parameters
                    </h3>

                    <div className="space-y-6">
                        <SliderControl label="Technical Score" value={techScore} onChange={setTechScore} />
                        <SliderControl label="Financial Bid Score" value={financialBid} onChange={setFinancialBid} />
                        <SliderControl label="Past Performance" value={pastPerf} onChange={setPastPerf} />
                        <SliderControl label="Compliance Check" value={compliance} onChange={setCompliance} />
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">AI Recommendation:</span>
                        </div>
                        <div className={`flex items-center gap-3 text-xl font-bold ${rec.color} p-4 rounded bg-white/5 border border-white/5`}>
                            {rec.icon}
                            {rec.text}
                        </div>
                    </div>
                </Card>

                {/* Business Impact Box */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#ffff00]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(255,255,0,0.1)]">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#ffff00] animate-pulse" />
                        <span className="text-xs font-bold text-[#ffff00] uppercase tracking-wider">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                        Based on my work managing <span className="text-white font-semibold">₹4,000+ Cr</span> procurement at Delhi Metro Rail.
                        Algorithms like this reduced bid evaluation time by <span className="text-[#ffff00]">3 weeks</span> per tender.
                    </p>
                </div>
            </div>
        </div>
    );
}

function SliderControl({ label, value, onChange }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-white font-mono">{value}</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ffff00]"
            />
        </div>
    )
}
