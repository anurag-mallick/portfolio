"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BadgeDollarSign, Building2, User, Globe, Calculator, Info, ArrowRightLeft, LayoutGrid, Map } from 'lucide-react';
import { AppLoader } from '@/components/ui/AppLoader';

// Enhanced Mock Data
const PAYROLL_DATA: Record<string, { currency: string, employerTax: number, employeeTax: number, socialSecurity: number, benefits: number, region: string }> = {
    "USA": { currency: "USD", employerTax: 7.65, employeeTax: 22, socialSecurity: 6.2, benefits: 15, region: "Americas" },
    "UK": { currency: "GBP", employerTax: 13.8, employeeTax: 20, socialSecurity: 12, benefits: 5, region: "Europe" },
    "Germany": { currency: "EUR", employerTax: 20, employeeTax: 35, socialSecurity: 19, benefits: 10, region: "Europe" },
    "France": { currency: "EUR", employerTax: 45, employeeTax: 15, socialSecurity: 20, benefits: 8, region: "Europe" },
    "India": { currency: "INR", employerTax: 12, employeeTax: 15, socialSecurity: 12, benefits: 8, region: "APAC" },
    "Singapore": { currency: "SGD", employerTax: 17, employeeTax: 10, socialSecurity: 20, benefits: 5, region: "APAC" },
    "Australia": { currency: "AUD", employerTax: 10, employeeTax: 32, socialSecurity: 0, benefits: 10, region: "APAC" },
    "Canada": { currency: "CAD", employerTax: 10, employeeTax: 25, socialSecurity: 5, benefits: 8, region: "Americas" },
    "Brazil": { currency: "BRL", employerTax: 20, employeeTax: 27.5, socialSecurity: 8, benefits: 12, region: "Americas" },
    "UAE": { currency: "AED", employerTax: 0, employeeTax: 0, socialSecurity: 12.5, benefits: 20, region: "EMEA" },
};

export function GlobalPayroll() {
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState("USA");
    const [compareCountry, setCompareCountry] = useState<string | null>(null);
    const [salary, setSalary] = useState(100000);
    const [view, setView] = useState<'employer' | 'employee'>('employer');

    // Helper to calculate metrics
    const getMetrics = (country: string, baseSalary: number) => {
        const data = PAYROLL_DATA[country];
        const employerCost = Math.round(baseSalary * (1 + (data.employerTax + data.benefits) / 100));
        const netSalary = Math.round(baseSalary * (1 - (data.employeeTax + data.socialSecurity) / 100));
        const taxAmount = Math.round(baseSalary * (data.employerTax / 100));
        const benefitsAmount = Math.round(baseSalary * (data.benefits / 100));
        const employeeTaxAmount = Math.round(baseSalary * (data.employeeTax / 100));
        const socialSecAmount = Math.round(baseSalary * (data.socialSecurity / 100));

        return { data, employerCost, netSalary, taxAmount, benefitsAmount, employeeTaxAmount, socialSecAmount };
    };

    const primary = getMetrics(selectedCountry, salary);
    const secondary = compareCountry ? getMetrics(compareCountry, salary) : null;

    if (loading) {
        return <AppLoader appName="Global Payroll & Tax" onLoadComplete={() => setLoading(false)} />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel */}
            <Card className="col-span-1 lg:col-span-4 p-6 bg-zinc-900/50 border-white/10 backdrop-blur-md h-fit">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#00f3ff]">
                    <Globe className="w-5 h-5" /> Global Configurator
                </h2>

                <div className="space-y-8">
                    {/* Primary Region Select */}
                    <div>
                        <label className="block text-sm text-muted-foreground mb-2">Primary Location</label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-[#00f3ff] outline-none"
                        >
                            {Object.keys(PAYROLL_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Comparison Toggle */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm text-muted-foreground">Comparison Mode</label>
                            <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${compareCountry ? 'bg-[#00f3ff] text-black' : 'bg-white/10 text-muted-foreground'}`}>
                                {compareCountry ? 'ON' : 'OFF'}
                            </div>
                        </div>
                        <select
                            value={compareCountry || ""}
                            onChange={(e) => setCompareCountry(e.target.value || null)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-[#00f3ff] outline-none"
                        >
                            <option value="">None (Single View)</option>
                            {Object.keys(PAYROLL_DATA).filter(c => c !== selectedCountry).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Salary Slider */}
                    <div>
                        <label className="block text-sm text-muted-foreground mb-2">Annual Base Salary (USD Equivalent)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="10000"
                                max="500000"
                                step="5000"
                                value={salary}
                                onChange={(e) => setSalary(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00f3ff]"
                            />
                            <span className="font-mono text-[#00f3ff] min-w-[80px] text-right font-bold">
                                ${salary.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="p-1 bg-white/5 rounded-lg flex">
                        <button
                            onClick={() => setView('employer')}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${view === 'employer' ? "bg-[#00f3ff] text-black shadow-lg" : "text-muted-foreground hover:text-white"}`}
                        >
                            Employer Cost
                        </button>
                        <button
                            onClick={() => setView('employee')}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${view === 'employee' ? "bg-[#00f3ff] text-black shadow-lg" : "text-muted-foreground hover:text-white"}`}
                        >
                            Net Pay
                        </button>
                    </div>
                </div>
            </Card>

            {/* Visualization Area */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">

                {/* Primary Card */}
                <PayrollCard
                    data={primary}
                    view={view}
                    baseSalary={salary}
                    isPrimary={true}
                />

                {/* Secondary Card (Comparison) */}
                <AnimatePresence>
                    {compareCountry && secondary && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <PayrollCard
                                data={secondary}
                                view={view}
                                baseSalary={salary}
                                isPrimary={false}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Insights */}
                {compareCountry && secondary && (
                    <Card className="p-4 bg-zinc-900/50 border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                            <div className="text-sm text-muted-foreground">
                                Cost Delta: <span className="text-white font-bold">${Math.abs(primary.employerCost - secondary.employerCost).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="text-sm">
                            Cheaper Option: <span className="text-[#00f3ff] font-bold">{primary.employerCost < secondary.employerCost ? selectedCountry : compareCountry}</span>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}

function PayrollCard({ data, view, baseSalary, isPrimary }: any) {
    const { data: countryData, employerCost, netSalary, taxAmount, benefitsAmount, employeeTaxAmount, socialSecAmount } = data;
    const total = view === 'employer' ? employerCost : netSalary;
    const color = isPrimary ? "text-[#00f3ff]" : "text-purple-400";
    const bgBar = isPrimary ? "bg-[#00f3ff]" : "bg-purple-400";

    return (
        <Card className={`p-8 bg-zinc-900/50 border backdrop-blur-md relative overflow-hidden transition-all ${isPrimary ? 'border-primary/20' : 'border-purple-500/20'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        {isPrimary && <BadgeDollarSign className="w-5 h-5 text-[#00f3ff]" />}
                        <h3 className="text-2xl font-bold text-white">{countryData.currency} - {view === 'employer' ? "Total Cost" : "Net Pay"}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wider">{Object.keys(PAYROLL_DATA).find(key => PAYROLL_DATA[key] === countryData)} ({countryData.region})</p>
                </div>
                <div className="text-right">
                    <div className={`text-4xl font-bold tracking-tighter ${color}`}>
                        {countryData.currency} {total.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Exch. Rate applied (Mock)
                    </div>
                </div>
            </div>

            {/* Bar Viz */}
            <div className="h-12 w-full bg-white/5 rounded-lg overflow-hidden flex relative mb-6">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(baseSalary / employerCost) * 100}%` }}
                    className={`h-full ${bgBar} flex items-center justify-center text-black font-bold text-xs opacity-80`}
                >
                    Base
                </motion.div>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((employerCost - baseSalary) / employerCost) * 100}%` }}
                    className={`h-full bg-white/20 flex items-center justify-center text-white font-bold text-xs`}
                >
                    {view === 'employer' ? "Tax + Bens" : "Deductions"}
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Stat item="Base Salary" val={baseSalary} cur={countryData.currency} />
                <Stat item={view === 'employer' ? "Employer Tax" : "Income Tax"} val={view === 'employer' ? taxAmount : employeeTaxAmount} cur={countryData.currency} />
                <Stat item={view === 'employer' ? "Benefits" : "Social Security"} val={view === 'employer' ? benefitsAmount : socialSecAmount} cur={countryData.currency} />
                <div className={`p-3 rounded bg-white/5 border border-white/5`}>
                    <p className="text-xs text-muted-foreground mb-1">Effective Rate</p>
                    <p className={`text-lg font-bold font-mono ${view === 'employer' ? "text-red-400" : "text-green-400"}`}>
                        {((Math.abs(total - baseSalary) / baseSalary) * 100).toFixed(1)}%
                    </p>
                </div>
            </div>
        </Card>
    )
}

function Stat({ item, val, cur }: any) {
    return (
        <div className="p-3 rounded bg-white/5 border border-white/5">
            <p className="text-xs text-muted-foreground mb-1">{item}</p>
            <p className="text-lg font-bold text-white font-mono">{cur} {val.toLocaleString()}</p>
        </div>
    )
}
