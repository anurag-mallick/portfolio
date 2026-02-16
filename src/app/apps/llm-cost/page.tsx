"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const models = [
    { name: "GPT-4", inputCost: 30, outputCost: 60, color: "#10a37f" },
    { name: "Claude 3 Opus", inputCost: 15, outputCost: 75, color: "#d97757" },
    { name: "Gemini Pro", inputCost: 0.5, outputCost: 1.5, color: "#4285f4" },
    { name: "GPT-3.5", inputCost: 0.5, outputCost: 1.5, color: "#74aa9c" },
];

export default function LLMCostPage() {
    const [tokens, setTokens] = useState(1000000);
    const [ratio, setRatio] = useState(0.5);

    const inputTokens = tokens * ratio;
    const outputTokens = tokens * (1 - ratio);

    const costs = models.map(m => ({
        name: m.name,
        cost: (inputTokens / 1000000 * m.inputCost) + (outputTokens / 1000000 * m.outputCost)
    }));

    const chartData = {
        labels: models.map(m => m.name),
        datasets: [{
            label: "Cost ($)",
            data: costs.map(c => c.cost),
            backgroundColor: models.map(m => m.color),
        }]
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#fintech">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Brain className="w-8 h-8 text-[#ffff00]" />
                    <h1 className="text-3xl font-bold text-[#ffff00]">LLM Cost Optimizer</h1>
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm mb-2">Total Tokens: {tokens.toLocaleString()}</label>
                            <input type="range" min="100000" max="10000000" step="100000" value={tokens} onChange={(e) => setTokens(Number(e.target.value))} className="w-full" />
                        </div>
                        <div>
                            <label className="block text-sm mb-2">Input/Output Ratio: {(ratio * 100).toFixed(0)}% / {((1 - ratio) * 100).toFixed(0)}%</label>
                            <input type="range" min="0" max="1" step="0.1" value={ratio} onChange={(e) => setRatio(Number(e.target.value))} className="w-full" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <h3 className="text-xl font-bold mb-4">Cost Comparison</h3>
                    <Bar data={chartData} options={{ plugins: { legend: { labels: { color: "#fff" } } }, scales: { y: { ticks: { color: "#fff" } }, x: { ticks: { color: "#fff" } } } }} />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {costs.map((c, i) => (
                        <Card key={i} className="p-4 bg-zinc-900/50">
                            <div className="text-sm text-muted-foreground mb-2">{c.name}</div>
                            <div className="text-3xl font-bold" style={{ color: models[i].color }}>${c.cost.toFixed(2)}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
