"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, Scan, FileSearch, CheckCircle2, AlertTriangle, MessageSquare, RefreshCw, Layers, ShieldCheck, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const EXTRACTION_BASE = {
    employee: "Anurag Mallick",
    salary_gross: "€8,450.00",
    tax_deduction: "€2,120.50",
    net_pay: "€6,329.50",
    bank_account: "**** 8892",
    date: "Dec 31, 2025",
    vendor: "Avance Global",
    confidence: 99.8
};

export function PayrollDocIntel() {
    const [isDragging, setIsDragging] = useState(false);
    const [fileStatus, setFileStatus] = useState<'IDLE' | 'UPLOADING' | 'EXTRACTING' | 'DONE'>('IDLE');
    const [extracted, setExtracted] = useState<any>(null);
    const [prompt, setPrompt] = useState("");
    const [mismatches, setMismatches] = useState<string[]>([]);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        startSimulation();
    };

    const startSimulation = () => {
        setFileStatus('UPLOADING');
        setTimeout(() => {
            setFileStatus('EXTRACTING');
            setTimeout(() => {
                setExtracted(EXTRACTION_BASE);
                setFileStatus('DONE');
                setMismatches(["Net pay differs from bank statement by €0.50", "Address format mismatch in offer letter"]);
            }, 2000);
        }, 1500);
    };

    const handlePromptFix = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) return;
        setFileStatus('EXTRACTING');
        setTimeout(() => {
            if (prompt.toLowerCase().includes("name")) {
                setExtracted({ ...extracted, employee: "A. Mallick (Updated via LLM)" });
            }
            setFileStatus('DONE');
            setPrompt("");
        }, 1000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px] lg:h-[650px]">
            {/* Input & Dropzone */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <Card
                    className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed transition-all relative overflow-hidden bg-black/40 ${isDragging ? 'border-[#ff00ff] bg-[#ff00ff]/5' : 'border-white/10'
                        }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                >
                    <AnimatePresence mode="wait">
                        {fileStatus === 'IDLE' ? (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8">
                                <Upload className="w-12 h-12 mx-auto mb-4 text-[#ff00ff] opacity-40" />
                                <h4 className="font-bold mb-2">DROP PAYROLL DOCS</h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                                    Payslip, Offer Letter, or<br />Bank Statement (PDF/JPG)
                                </p>
                                <Button onClick={startSimulation} className="mt-6 bg-white/5 border-white/10 hover:bg-white/10 text-xs">
                                    LOAD SAMPLE AUDIT
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 rounded-full border-4 border-white/5 flex items-center justify-center">
                                        {fileStatus === 'UPLOADING' && <RefreshCw className="w-8 h-8 animate-spin text-[#00f3ff]" />}
                                        {fileStatus === 'EXTRACTING' && <Scan className="w-8 h-8 text-[#ff00ff] animate-pulse" />}
                                        {fileStatus === 'DONE' && <CheckCircle2 className="w-8 h-8 text-[#00ff99]" />}
                                    </div>
                                    {fileStatus === 'EXTRACTING' && (
                                        <motion.div
                                            initial={{ top: 0 }} animate={{ top: "100%" }} transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="absolute left-0 right-0 h-1 bg-[#ff00ff] shadow-[0_0_15px_#ff00ff] opacity-50"
                                        />
                                    )}
                                </div>
                                <h4 className="font-bold text-sm tracking-widest uppercase">{fileStatus}...</h4>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>

                <Card className="p-6 bg-zinc-900/60 border-white/10">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" /> FIX WITH PROMPT
                    </h4>
                    <form onSubmit={handlePromptFix} className="relative">
                        <input
                            placeholder="e.g. 'Update employee name from page 2'..."
                            className="bg-black/50 border border-white/10 rounded-lg p-3 pr-12 w-full text-xs focus:border-[#ff00ff] transition-all outline-none"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-2.5 text-[#ff00ff] hover:scale-110 transition-transform">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed italic">
                        The LLM refines extractions based on natural language overrides.
                    </p>
                </Card>
            </div>

            {/* Analysis Results */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <Card className="flex-1 p-6 bg-zinc-900/60 border-white/10 overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <FileSearch className="w-5 h-5 text-[#00f3ff]" />
                            STRUCTURED DATA EXTRACTION
                        </h3>
                        {extracted && (
                            <div className="text-[10px] font-bold px-2 py-1 bg-[#00ff99]/10 text-[#00ff99] rounded border border-[#00ff99]/20">
                                CONFIDENCE: {extracted.confidence}%
                            </div>
                        )}
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                        <DataField label="EMPLOYEE" value={extracted?.employee} />
                        <DataField label="VENDOR" value={extracted?.vendor} />
                        <DataField label="PAY DATE" value={extracted?.date} />
                        <DataField label="GROSS SALARY" value={extracted?.salary_gross} />
                        <DataField label="NET PAY" value={extracted?.net_pay} />
                        <DataField label="BANK ACCOUNT" value={extracted?.bank_account} />
                    </div>

                    <div className="mt-8">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">RECONCILIATION LOG</h4>
                        <div className="space-y-3">
                            {extracted ? mismatches.map((m, i) => (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                                    key={i} className="flex gap-3 items-start p-3 bg-red-500/5 border border-red-500/20 rounded-lg"
                                >
                                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-red-500 uppercase tracking-tight">Mismatch Detected</p>
                                        <p className="text-[10px] text-zinc-400">{m}</p>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="h-24 flex items-center justify-center border border-white/5 rounded-lg bg-black/20 text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                                    Waiting for document upload...
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Business Impact Box */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#9d50bb]/30 rounded-xl p-5 shadow-[0_0_20px_rgba(157,80,187,0.1)]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#9d50bb] animate-pulse" />
                        <span className="text-xs font-bold text-[#9d50bb] uppercase tracking-widest">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-retro">
                        99.8% accurate AI reconciliation – mirrors my <span className="text-white font-semibold underline decoration-[#9d50bb]/50">document intelligence system</span> at Avance.
                        Reduced manual effort by <span className="text-[#9d50bb]">60%</span> for Finance teams audit.
                    </p>
                </div>
            </div>
        </div>
    );
}

function DataField({ label, value }: any) {
    return (
        <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex flex-col gap-1 transition-all hover:border-white/20">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
            <div className={`text-xs font-mono font-bold ${value ? 'text-white' : 'text-zinc-700 italic'}`}>
                {value || "- EMPTY -"}
            </div>
        </div>
    );
}
