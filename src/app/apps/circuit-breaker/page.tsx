"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function CircuitBreakerPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#algorithms">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Zap className="w-8 h-8 text-[#ffff00]" />
                    <h1 className="text-3xl font-bold text-[#ffff00]">Circuit Breaker Pattern</h1>
                </div>
                <Card className="p-8 bg-zinc-900/50">
                    <p className="text-muted-foreground">Full implementation coming soon. Will feature state machine visualization (Closed/Open/Half-open), request flow animation, failure detection, and metrics dashboard.</p>
                </Card>
            </div>
        </div>
    );
}
