"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, MessageSquare, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { experiences } from "@/lib/data/experience";
import { coreCompetencies, technicalSkills } from "@/lib/data/skills";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "initial",
            role: "assistant",
            content: "Hi! I'm Anurag's AI assistant. I can tell you about his projects, skills, or PM philosophy. What would you like to know?",
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const generateMockResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes("experience") || lowerQuery.includes("work")) {
            const latest = experiences[0];
            return `Anurag is currently a ${latest.role} at ${latest.company}, where he is ${latest.description.toLowerCase()}. He has extensive experience in scaling payroll systems and digital transformation.`;
        }
        
        if (lowerQuery.includes("skill") || lowerQuery.includes("tech")) {
            const skills = technicalSkills.map(s => s.name).slice(0, 5).join(", ");
            return `Anurag's technical toolkit includes ${skills}, among others. He specializes in AI-driven workflows and product strategy.`;
        }

        if (lowerQuery.includes("pm") || lowerQuery.includes("product manager")) {
            return "As a Product Manager, Anurag focuses on 'Impact-First' delivery. He has experience in B2B/B2C platforms, EOR/Global Payroll, and logistics aggregators like Shiprocket.";
        }

        if (lowerQuery.includes("education") || lowerQuery.includes("iim") || lowerQuery.includes("nit")) {
            return "Anurag holds an MBA from IIM Lucknow and a B.Tech from NIT Nagpur. This dual background allows him to bridge the gap between business strategy and technical execution.";
        }

        return "That's an interesting question! While I'm in 'Demo Mode' right now, I can tell you that Anurag specializes in scaling complex systems and integrating AI. Try asking about his work at Avance or Shiprocket!";
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: generateMockResponse(userMsg.content),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[320px] sm:w-[380px] h-[500px] bg-background/95 border border-primary/20 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden ring-1 ring-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-primary/10 bg-primary/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground">AI Assistant</h4>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Demo Mode</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-md transition-colors"
                            >
                                <X size={18} className="text-muted-foreground" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                        >
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                        msg.role === "user" 
                                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-[0_4px_12px_rgba(var(--primary-rgb),0.3)]" 
                                            : "bg-white/10 text-foreground rounded-tl-none border border-white/5"
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce" />
                                            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                            {["Experience", "Skills", "PM Philosophy"].map((action) => (
                                <button
                                    key={action}
                                    onClick={() => setInput(action)}
                                    className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-primary/10">
                            <div className="relative flex items-center">
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask anything..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="absolute right-2 p-1.5 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-4 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden ${
                    isOpen ? "bg-background border border-primary/20" : "bg-primary text-primary-foreground"
                }`}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    {isOpen ? <X size={24} /> : <Sparkles size={24} />}
                </motion.div>
                
                {/* Visual pulse for the button */}
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white rounded-full pointer-events-none"
                    />
                )}
            </motion.button>
        </div>
    );
}
