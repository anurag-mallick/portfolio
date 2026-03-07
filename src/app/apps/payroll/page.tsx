"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";
import { GlobalPayroll } from "@/components/apps/payroll/GlobalPayroll";

export default function PayrollPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-40 pointer-events-none" />
            <Link href="/#apps">
                <Button variant="ghost" className="mb-8 relative z-10">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <Globe className="w-12 h-12 text-[#00f3ff]" />
                    <h1 className="text-4xl font-bold text-[#00f3ff]">Global Payroll & Tax Visualizer</h1>
                </div>
                <p className="text-xl text-muted-foreground mb-12">
                    Interactive 3D visualization of international employment costs, net salary calculations, and compliance heatmaps.
                </p>

                <div className="p-12 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm text-center">
                    <div className="animate-pulse mb-4 inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                        SYSTEM INITIALIZING
                    </div>
                    <p className="text-muted-foreground">The Global Payroll module is currently being compiled. Compliance data and tax logic are loading...</p>
                </div>
            </div>
        </div>
    );
}
