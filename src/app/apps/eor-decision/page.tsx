"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { EORDecisionEngine } from "@/components/apps/enterprise/EORDecisionEngine";

export default function EORDecisionPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-40 pointer-events-none" />
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10 transition-colors hover:bg-white/5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>
            <div className="max-w-7xl mx-auto relative z-10 font-retro">
                <div className="flex items-center gap-4 mb-6">
                    <Rocket className="w-12 h-12 text-[#ff00ff] drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
                    <h1 className="text-4xl font-bold text-[#ff00ff] neon-text">EOR Strategy Decision Engine</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed text-glow">
                    Strategic expansion modeling. Input your target workforce parameters and our engine identifies the optimal legal structure, cost flows, and compliance roadmap.
                </p>

                <EORDecisionEngine />
            </div>
        </div>
    );
}
