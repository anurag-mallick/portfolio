"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, CheckCircle, AlertTriangle, FileText, Scan, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Ledger Data
const mockLedger = [
    { id: 'INV-001', vendor: 'Acme Corp', amount: 12500.00, date: '2023-10-15', status: 'PAID' },
    { id: 'INV-002', vendor: 'Global Logistics', amount: 3420.50, date: '2023-10-18', status: 'PENDING' },
    { id: 'INV-003', vendor: 'TechSolutions Inc', amount: 8900.00, date: '2023-10-20', status: 'PENDING' },
];

export function InvoiceReconciler() {
    const [dragging, setDragging] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [scannedData, setScannedData] = useState<any>(null);
    const [matchResult, setMatchResult] = useState<any>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        simulateProcess();
    };

    const simulateProcess = () => {
        setProcessing(true);
        setScannedData(null);
        setMatchResult(null);

        // Simulation steps
        setTimeout(() => {
            setScannedData({
                vendor: 'TechSolutions Inc',
                amount: 8900.00,
                date: '2023-10-20',
                invoiceId: 'INV-003',
                confidence: 99.8
            });

            setTimeout(() => {
                setMatchResult({
                    status: 'MATCH',
                    message: 'Perfect match found in ledger.',
                    ledgerId: 'INV-003'
                });
                setProcessing(false);
            }, 1500);
        }, 2000);
    };

    const reset = () => {
        setScannedData(null);
        setMatchResult(null);
        setProcessing(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            {/* Left: Upload / Invoice View */}
            <Card className="p-0 overflow-hidden bg-zinc-900/50 border-white/10 relative flex flex-col">
                <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#ff00ff]" />
                        Document Input
                    </h3>
                    {scannedData && <Button variant="ghost" size="sm" onClick={reset}><RefreshCw className="w-4 h-4" /></Button>}
                </div>

                <div
                    className={`flex-1 flex flex-col items-center justify-center transition-all bg-[url('/grid.svg')] bg-center ${dragging ? 'bg-[#ff00ff]/10 border-2 border-dashed border-[#ff00ff]' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!scannedData && !processing ? (
                        <div className="text-center p-8">
                            <Layers className="w-16 h-16 mx-auto mb-4 text-[#ff00ff] opacity-50" />
                            <p className="text-xl font-bold text-white mb-2">Drag Invoice PDF Here</p>
                            <p className="text-muted-foreground mb-6">or click to browse sample files</p>
                            <Button onClick={simulateProcess} className="bg-[#ff00ff]/20 hover:bg-[#ff00ff]/30 text-[#ff00ff] border border-[#ff00ff]/50">
                                LOAD SAMPLE INVOICE
                            </Button>
                        </div>
                    ) : (
                        <div className="relative w-full h-full p-8 flex items-center justify-center">
                            {/* Simulated PDF View */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-[300px] h-[400px] bg-white text-black p-6 rounded shadow-2xl relative"
                            >
                                <div className="flex justify-between items-start border-b pb-4 mb-4">
                                    <div className="font-bold text-lg">INVOICE</div>
                                    <div className="text-right text-xs text-gray-500">
                                        #INV-003<br />
                                        Oct 20, 2023
                                    </div>
                                </div>
                                <div className="text-sm mb-8">
                                    Billed To:<br />
                                    <strong>Anurag's Enterprise</strong>
                                </div>
                                <div className="space-y-2 mb-8">
                                    <div className="flex justify-between text-sm border-b border-gray-200 pb-1">
                                        <span>Cloud Services Q3</span>
                                        <span>$8,900.00</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 right-6 text-xl font-bold">
                                    Total: $8,900.00
                                </div>

                                {/* Scanning Line Animation */}
                                {processing && (
                                    <motion.div
                                        initial={{ top: 0 }}
                                        animate={{ top: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-[#ff00ff] shadow-[0_0_15px_#ff00ff] z-10 opacity-70"
                                    />
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Right: AI Analysis & Ledger Match */}
            <div className="flex flex-col gap-6">
                <Card className="flex-1 p-6 bg-zinc-900/50 border-white/10 relative overflow-hidden">
                    <h3 className="font-bold flex items-center gap-2 mb-6">
                        <Scan className="w-4 h-4 text-[#00f3ff]" />
                        Extraction & Matching Analysis
                    </h3>

                    <div className="space-y-6">
                        {/* Extraction Steps */}
                        <div className="space-y-4">
                            <ExtractionItem label="Vendor Name" value={scannedData?.vendor} processing={processing} delay={0.2} />
                            <ExtractionItem label="Invoice Date" value={scannedData?.date} processing={processing} delay={0.5} />
                            <ExtractionItem label="Total Amount" value={scannedData?.amount ? `$${scannedData.amount.toLocaleString()}` : null} processing={processing} delay={0.8} />
                            <ExtractionItem label="Confidence" value={scannedData?.confidence ? `${scannedData.confidence}%` : null} processing={processing} delay={1.1} highlight />
                        </div>

                        {/* Visual Ledger Match */}
                        <AnimatePresence>
                            {matchResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 rounded-xl border border-[#00ff99]/30 bg-[#00ff99]/10"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <CheckCircle className="w-6 h-6 text-[#00ff99]" />
                                        <span className="font-bold text-[#00ff99] text-lg">RECONCILIATION SUCCESSFUL</span>
                                    </div>
                                    <p className="text-sm text-[#00ff99]/80 ml-9">
                                        Matched against Ledger Entry <strong>#{matchResult.ledgerId}</strong> with 100% accuracy.
                                        Auto-approved for payment.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Card>

                {/* Business Impact Box */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-[#ff00ff]/30 rounded-xl p-4 shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse" />
                        <span className="text-xs font-bold text-[#ff00ff] uppercase tracking-wider">Business Impact</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                        99.8% extraction accuracy on complex invoices. <span className="text-[#ff00ff]">60% reduction</span> in manual reconciliation effort – mirrors my AI system deployed for Finance teams.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ExtractionItem({ label, value, processing, delay, highlight }: any) {
    if (!processing && !value) {
        return (
            <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5 opacity-50">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm text-muted-foreground">--</span>
            </div>
        )
    }

    return (
        <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5 transition-all">
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="relative">
                {processing ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: delay }}
                        className="w-24 h-4 bg-white/10 rounded"
                    />
                ) : (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`font-mono font-bold ${highlight ? 'text-[#00f3ff]' : 'text-white'}`}
                    >
                        {value}
                    </motion.span>
                )}
            </div>
        </div>
    );
}
