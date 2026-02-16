"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Calendar, Bell } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { format, addDays } from "date-fns";

const deadlines = [
    { country: "US", task: "Federal Tax Filing", date: addDays(new Date(), 15), priority: "high" },
    { country: "UK", task: "VAT Return", date: addDays(new Date(), 7), priority: "high" },
    { country: "DE", task: "Social Security Report", date: addDays(new Date(), 30), priority: "medium" },
    { country: "FR", task: "Payroll Declaration", date: addDays(new Date(), 45), priority: "low" },
    { country: "SG", task: "CPF Contribution", date: addDays(new Date(), 10), priority: "high" },
];

export default function ComplianceTrackerPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#fintech">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Calendar className="w-8 h-8 text-[#00ff99]" />
                    <h1 className="text-3xl font-bold text-[#00ff99]">Compliance Deadline Tracker</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Upcoming (7 days)</div>
                        <div className="text-4xl font-bold text-red-400">{deadlines.filter(d => (d.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 7).length}</div>
                    </Card>
                    <Card className="p-6 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">This Month</div>
                        <div className="text-4xl font-bold text-yellow-400">{deadlines.filter(d => (d.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 30).length}</div>
                    </Card>
                    <Card className="p-6 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Total Tracked</div>
                        <div className="text-4xl font-bold text-[#00ff99]">{deadlines.length}</div>
                    </Card>
                </div>

                <Card className="p-6 bg-zinc-900/50">
                    <h3 className="text-xl font-bold mb-6">Upcoming Deadlines</h3>
                    <div className="space-y-4">
                        {deadlines.sort((a, b) => a.date.getTime() - b.date.getTime()).map((deadline, i) => {
                            const daysLeft = Math.ceil((deadline.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            return (
                                <div key={i} className={`p-4 rounded-lg border ${deadline.priority === "high" ? "border-red-500/50 bg-red-500/10" : "border-white/10"}`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold">{deadline.country}</span>
                                                <span className="font-bold text-lg">{deadline.task}</span>
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-2">{format(deadline.date, "MMM dd, yyyy")}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${daysLeft <= 7 ? "text-red-400" : daysLeft <= 30 ? "text-yellow-400" : "text-green-400"}`}>
                                                {daysLeft} days
                                            </div>
                                            <Button className="mt-2 bg-[#00ff99] text-black hover:bg-[#00cc77]">
                                                <Bell className="w-4 h-4 mr-2" /> Set Reminder
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
}
