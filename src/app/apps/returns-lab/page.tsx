"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import { ReturnsIntelligence } from "@/components/apps/enterprise/ReturnsIntelligence";

export default function ReturnsLabPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-black to-black opacity-40 pointer-events-none" />
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10 transition-colors hover:bg-white/5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>
            <div className="max-w-7xl mx-auto relative z-10 font-retro">
                <div className="flex items-center gap-4 mb-6">
                    <Box className="w-12 h-12 text-[#ff0080] drop-shadow-[0_0_10px_rgba(255,0,128,0.5)]" />
                    <h1 className="text-4xl font-bold text-[#ff0080] neon-text">Returns Intelligence Lab</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                    E-commerce fraud & quality audit. Classify unboxing anomalies, calculate NPS impact, and automate final verdicts for reverse logistics workflows.
                </p>

                <ReturnsIntelligence />
            </div>
        </div>
    );
}
