"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { PayrollDocIntel } from "@/components/apps/enterprise/PayrollDocIntel";

export default function PayrollAIPage() {
    return (
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10 transition-colors hover:bg-white/5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Enterprise Solutions
                </Button>
            </Link>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <Brain className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                    <h1 className="text-4xl font-bold text-foreground">Payroll Document Intelligence (LLM)</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                    AI-powered multi-document audit engine. Extract structured data from messy payslips, contracts, and bank statements with automated reconciliation and fraud detection.
                </p>

                <PayrollDocIntel />
            </div>
        </div>
    );
}
