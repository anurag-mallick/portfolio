"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import { RouteOptimizer } from "@/components/apps/route-optimizer/RouteOptimizer";

export default function RouteOptimizerPage() {
    return (
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <Link href="/#logistics-lab">
                    <Button variant="ghost" className="text-muted-foreground hover:text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Logistics Lab
                    </Button>
                </Link>
                <div className="flex items-center gap-3">
                    <Truck className="w-8 h-8 text-[#00ff99]" />
                    <h1 className="text-2xl md:text-3xl font-bold text-[#00ff99]">Last-Mile Route Optimizer</h1>
                </div>
            </div>

            <RouteOptimizer />
        </div>
    );
}
