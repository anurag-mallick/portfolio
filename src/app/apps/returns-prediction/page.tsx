"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

const products = [
    { category: "Electronics", price: 599, history: "3 returns", probability: 35 },
    { category: "Clothing", price: 49, history: "0 returns", probability: 15 },
    { category: "Furniture", price: 1299, history: "1 return", probability: 45 },
    { category: "Books", price: 25, history: "0 returns", probability: 5 },
];

export default function ReturnsPredictionPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#logistics-lab">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Logistics Lab
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <TrendingDown className="w-8 h-8 text-[#ff6b6b]" />
                    <h1 className="text-3xl font-bold text-[#ff6b6b]">Returns Prediction Model</h1>
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-6">Product Return Probability</h3>
                    <div className="space-y-4">
                        {products.map((p, i) => (
                            <div key={i} className="p-4 bg-black/40 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <div className="font-bold text-lg">{p.category}</div>
                                        <div className="text-sm text-muted-foreground">${p.price} • {p.history}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-3xl font-bold ${p.probability > 30 ? "text-red-400" : p.probability > 15 ? "text-yellow-400" : "text-green-400"}`}>
                                            {p.probability}%
                                        </div>
                                        <div className="text-xs text-muted-foreground">Return Risk</div>
                                    </div>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                                    <div className={`h-2 rounded-full ${p.probability > 30 ? "bg-red-400" : p.probability > 15 ? "bg-yellow-400" : "bg-green-400"}`} style={{ width: `${p.probability}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Avg Return Rate</div>
                        <div className="text-3xl font-bold text-[#ff6b6b]">25%</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">High Risk Items</div>
                        <div className="text-3xl font-bold text-red-400">2</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Model Accuracy</div>
                        <div className="text-3xl font-bold text-green-400">87%</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
