"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Network } from "lucide-react";

export default function LogisticsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black opacity-40 pointer-events-none" />
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <Network className="w-12 h-12 text-[#ff0080]" />
                    <h1 className="text-4xl font-bold text-[#ff0080]">Supply Chain Neuro-Network</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-12">
                    Node-based simulation of logistics networks with real-time package routing and disruption handling.
                </p>

                <div className="p-12 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm text-center">
                    <div className="animate-pulse mb-4 inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                        ESTABLISHING LINK
                    </div>
                    <p className="text-muted-foreground">Connecting to the logistics simulation grid. Route optimization algorithms are starting up...</p>
                </div>
            </div>
        </div>
    );
}
