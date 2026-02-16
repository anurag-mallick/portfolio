"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { CompoundInterest } from "@/components/apps/compound/CompoundInterest";

export default function CompoundPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <Link href="/#apps">
                        <Button variant="ghost" className="text-muted-foreground hover:text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-[#00f3ff]" />
                        <h1 className="text-2xl md:text-3xl font-bold text-[#00f3ff]">Compound Interest Simulator</h1>
                    </div>
                </div>

                <CompoundInterest />
            </div>
        </div>
    );
}
