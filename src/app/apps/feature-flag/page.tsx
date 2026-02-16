"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Flag } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function FeatureFlagPage() {
    const [rollout, setRollout] = useState(50);
    const totalUsers = 10000;
    const enabledUsers = Math.floor(totalUsers * (rollout / 100));

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#infrastructure">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Flag className="w-8 h-8 text-[#e74c3c]" />
                    <h1 className="text-3xl font-bold text-[#e74c3c]">Feature Flag Impact Calculator</h1>
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Rollout Configuration</h3>
                    <div>
                        <label className="block text-sm mb-2">Rollout Percentage: {rollout}%</label>
                        <input type="range" min="0" max="100" value={rollout} onChange={(e) => setRollout(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="mt-6 p-4 bg-black/40 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-sm text-muted-foreground">Enabled Users</div>
                                <div className="text-2xl font-bold text-[#e74c3c]">{enabledUsers.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Disabled Users</div>
                                <div className="text-2xl font-bold text-gray-400">{(totalUsers - enabledUsers).toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Total Users</div>
                        <div className="text-3xl font-bold text-white">{totalUsers.toLocaleString()}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">A/B Split</div>
                        <div className="text-3xl font-bold text-[#e74c3c]">{rollout}/{100 - rollout}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Risk Level</div>
                        <div className="text-3xl font-bold text-yellow-400">{rollout < 25 ? "Low" : rollout < 75 ? "Medium" : "High"}</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
