"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Code, Copy } from "lucide-react";
import { Card } from "@/components/ui/Card";

const templates = [
    { name: "Code Review", prompt: "Review the following code for bugs, security issues, and best practices:\n\n```\n{CODE}\n```" },
    { name: "Data Analysis", prompt: "Analyze this dataset and provide insights:\n\n{DATA}" },
    { name: "Creative Writing", prompt: "Write a {STYLE} story about {TOPIC} in {WORDS} words." },
];

export default function PromptLabPage() {
    const [prompt, setPrompt] = useState(templates[0].prompt);
    const [tokens, setTokens] = useState(0);

    const countTokens = (text: string) => {
        return Math.ceil(text.split(/\s+/).length * 1.3);
    };

    React.useEffect(() => {
        setTokens(countTokens(prompt));
    }, [prompt]);

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/#fintech">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-8">
                    <Code className="w-8 h-8 text-[#a855f7]" />
                    <h1 className="text-3xl font-bold text-[#a855f7]">Prompt Engineering Lab</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {templates.map((t, i) => (
                        <Button key={i} onClick={() => setPrompt(t.prompt)} className="bg-white/10 hover:bg-white/20">
                            {t.name}
                        </Button>
                    ))}
                </div>

                <Card className="p-6 bg-zinc-900/50 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Prompt Editor</h3>
                        <Button className="bg-[#a855f7]" onClick={() => navigator.clipboard.writeText(prompt)}>
                            <Copy className="w-4 h-4 mr-2" /> Copy
                        </Button>
                    </div>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-64 p-4 bg-black/40 border border-white/20 rounded-lg text-white font-mono text-sm"
                        placeholder="Enter your prompt here..."
                    />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Estimated Tokens</div>
                        <div className="text-3xl font-bold text-[#a855f7]">{tokens}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Est. Cost (GPT-4)</div>
                        <div className="text-3xl font-bold text-green-400">${(tokens / 1000 * 0.03).toFixed(4)}</div>
                    </Card>
                    <Card className="p-4 bg-zinc-900/50">
                        <div className="text-sm text-muted-foreground mb-2">Character Count</div>
                        <div className="text-3xl font-bold text-cyan-400">{prompt.length}</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
