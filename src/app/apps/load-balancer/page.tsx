"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Network } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function LoadBalancerPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#infrastructure">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Network className="w-8 h-8 text-[#00f3ff]" />
                    <h1 className="text-3xl font-bold text-[#00f3ff]">Load Balancer Simulation</h1>
                </div>
                <Card className="p-8 bg-zinc-900/50">
                    <p className="text-muted-foreground">Full implementation coming soon. Will feature particle-based request flow, Round-robin/Least-connections/IP-hash algorithms, and health monitoring.</p>
                </Card>
            </div>
        </div>
    );
}
