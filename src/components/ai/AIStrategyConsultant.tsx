"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Sparkles, Send, Bot, User, RefreshCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_RESPONSES = [
    "Based on current market trends, I suggest focusing on LLM-driven payroll automation. This could reduce manual overhead by 40%.",
    "Integrating real-time anomaly detection in financial workflows can mitigate risk by up to 25%. Focus on structured JSON output validation.",
    "Your product roadmap should prioritize 'Human-in-the-loop' AI interactions to build trust in high-stakes financial environments.",
    "Strategic insight: Leverage agentic workflows for vendor management. This aligns with your experience at Maharashtra Metro Rail."
];

export function AIStrategyConsultant() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI "Streaming" response
        setTimeout(() => {
            const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
            setMessages(prev => [...prev, { role: 'bot' as const, content: randomResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto theme-card p-6 bg-card/40 backdrop-blur-md rounded-2xl border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                    <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-foreground">AI Strategy Simulator</h3>
                    <p className="text-xs text-muted-foreground">Architecting intelligent product solutions</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500 opacity-50" />
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
            </div>

            <div className="h-[300px] overflow-y-auto mb-6 flex flex-col gap-4 p-2 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                        <Bot className="w-12 h-12 mb-4" />
                        <p className="text-sm">Ask about AI roadmap, scaling, or financial workflows.</p>
                    </div>
                )}
                <AnimatePresence>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                                "flex items-start gap-3 max-w-[85%]",
                                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                m.role === 'user' ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                            )}>
                                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={cn(
                                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                m.role === 'user' ? "bg-accent/10 rounded-tr-none text-right" : "bg-primary/5 rounded-tl-none text-left"
                            )}>
                                {m.content}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-primary opacity-50 text-xs italic"
                        >
                            <RefreshCcw className="w-3 h-3 animate-spin" />
                            Consultant is processing...
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe a product challenge..."
                    className="w-full bg-background/50 border border-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={isTyping || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
