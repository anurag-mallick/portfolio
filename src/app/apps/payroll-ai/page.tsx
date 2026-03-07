"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { PayrollDocIntel } from "@/components/apps/enterprise/PayrollDocIntel";

export default function PayrollAIPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black opacity-40 pointer-events-none" />
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10 transition-colors hover:bg-white/5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>
            <div className="max-w-7xl mx-auto relative z-10 font-retro">
                <div className="flex items-center gap-4 mb-6">
                    <Brain className="w-12 h-12 text-[#9d50bb] drop-shadow-[0_0_10px_rgba(157,80,187,0.5)]" />
                    <h1 className="text-4xl font-bold text-[#9d50bb] neon-text">Payroll Document Intelligence (LLM)</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                    AI-powered multi-document audit engine. Extract structured data from messy payslips, contracts, and bank statements with automated reconciliation and fraud detection.
                </p>

                <PayrollDocIntel />
            </div>
        </div>
    );
}
