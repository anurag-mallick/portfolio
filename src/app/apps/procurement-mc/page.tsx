"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, PieChart } from "lucide-react";
import { ProcurementMC } from "@/components/apps/enterprise/ProcurementMC";

export default function ProcurementMCPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black opacity-40 pointer-events-none" />
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10 transition-colors hover:bg-white/5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>
            <div className="max-w-7xl mx-auto relative z-10 font-retro">
                <div className="flex items-center gap-4 mb-6">
                    <PieChart className="w-12 h-12 text-[#ffff00] drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]" />
                    <h1 className="text-4xl font-bold text-[#ffff00] neon-text">Procurement Risk Monte Carlo</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                    Probabilistic tender evaluation. Run 5,000+ simulation iterations to identify the most likely winner and analyze the sensitivity of technical vs. financial weighting on the final award.
                </p>

                <ProcurementMC />
            </div>
        </div>
    );
}
