"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, FileSearch, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";

const sampleInvoices = [
    { id: "INV-001", vendor: "Acme Corp", amount: 5000, date: "2024-01-15", status: "normal" },
    { id: "INV-002", vendor: "TechSupply Inc", amount: 12500, date: "2024-01-16", status: "normal" },
    { id: "INV-003", vendor: "Acme Corp", amount: 5000, date: "2024-01-17", status: "duplicate", anomaly: "Duplicate payment detected" },
    { id: "INV-004", vendor: "Office Depot", amount: 850, date: "2024-01-18", status: "normal" },
    { id: "INV-005", vendor: "TechSupply Inc", amount: 45000, date: "2024-01-19", status: "anomaly", anomaly: "300% price increase from avg" },
    { id: "INV-006", vendor: "Cloud Services", amount: 2200, date: "2024-01-20", status: "normal" },
];

export default function InvoiceAnomalyPage() {
    const [selectedFilter, setSelectedFilter] = useState<"all" | "anomaly" | "normal">("all");

    const filtered = sampleInvoices.filter(inv =>
        selectedFilter === "all" ? true : inv.status === selectedFilter || (selectedFilter === "anomaly" && inv.status === "duplicate")
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#fintech">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Fintech Toolkit
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <FileSearch className="w-8 h-8 text-[#ff6b00]" />
                    <h1 className="text-3xl font-bold text-[#ff6b00]">Invoice Anomaly Detector</h1>
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <div className="flex gap-4 mb-6">
                        <Button onClick={() => setSelectedFilter("all")} className={selectedFilter === "all" ? "bg-[#ff6b00]" : "bg-white/10"}>All Invoices</Button>
                        <Button onClick={() => setSelectedFilter("anomaly")} className={selectedFilter === "anomaly" ? "bg-red-500" : "bg-white/10"}>Anomalies Only</Button>
                        <Button onClick={() => setSelectedFilter("normal")} className={selectedFilter === "normal" ? "bg-green-500" : "bg-white/10"}>Normal</Button>
                    </div>

                    <div className="space-y-4">
                        {filtered.map(inv => (
                            <div key={inv.id} className={`p-4 rounded-lg border ${inv.status === "normal" ? "border-white/10" : "border-red-500/50 bg-red-500/10"}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-lg">{inv.id} - {inv.vendor}</div>
                                        <div className="text-sm text-muted-foreground">{inv.date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">${inv.amount.toLocaleString()}</div>
                                        {inv.status !== "normal" && (
                                            <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                                                <AlertTriangle className="w-4 h-4" />
                                                {inv.anomaly}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 bg-zinc-900/50">
                    <h3 className="text-xl font-bold mb-4">Detection Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-black/40 rounded-lg">
                            <div className="text-sm text-muted-foreground">Total Invoices</div>
                            <div className="text-3xl font-bold">{sampleInvoices.length}</div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-lg">
                            <div className="text-sm text-muted-foreground">Anomalies Detected</div>
                            <div className="text-3xl font-bold text-red-400">{sampleInvoices.filter(i => i.status !== "normal").length}</div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-lg">
                            <div className="text-sm text-muted-foreground">Detection Rate</div>
                            <div className="text-3xl font-bold text-[#ff6b00]">33%</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
