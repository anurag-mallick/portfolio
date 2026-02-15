"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Check } from "lucide-react";
import { useTheme, Theme } from "@/components/ThemeContext";
import { cn } from "@/lib/utils";

const themes: { id: Theme; name: string }[] = [
    { id: "terminal", name: "Terminal" },
    { id: "minimal", name: "Minimal Executive" },
    { id: "futuristic", name: "Futuristic AI" },
    { id: "glass", name: "Modern Glass" },
    { id: "creative", name: "Creative Portfolio" },
];

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                    isOpen
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50"
                )}
            >
                <Paintbrush size={16} />
                <span className="text-sm font-bold uppercase tracking-tighter">Theme</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-4 w-[320px] p-4 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                    className="group flex flex-col gap-2 text-left"
                                >
                                    <div className={cn(
                                        "relative w-full aspect-[140/90] rounded-2xl overflow-hidden border-2 transition-all duration-300 group-hover:scale-[1.03]",
                                        theme === t.id ? "border-primary shadow-[0_0_15px_rgba(0,243,255,0.3)]" : "border-white/10 group-hover:border-white/30"
                                    )}>
                                        {/* Dynamic Preview Thumbnail */}
                                        <ThemePreview type={t.id} />

                                        {theme === t.id && (
                                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full shadow-lg">
                                                <Check size={10} strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest pl-1 transition-colors",
                                        theme === t.id ? "text-primary" : "text-muted-foreground group-hover:text-white"
                                    )}>
                                        {t.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ThemePreview({ type }: { type: Theme }) {
    switch (type) {
        case "terminal":
            return (
                <div className="w-full h-full bg-[#050505] p-2 flex flex-col gap-1">
                    <div className="w-full h-1 bg-[#171717] rounded-full" />
                    <div className="flex gap-1 mt-1">
                        <div className="w-1 h-3 bg-[#00f3ff]" />
                        <div className="flex-1 space-y-1">
                            <div className="w-full h-1 bg-[#a3a3a3] rounded-full" />
                            <div className="w-2/3 h-1 bg-[#a3a3a3] rounded-full" />
                        </div>
                    </div>
                </div>
            );
        case "minimal":
            return (
                <div className="w-full h-full bg-white p-3 flex flex-col items-center">
                    <div className="w-full h-1.5 bg-[#404040] mb-2" />
                    <div className="w-full grid grid-cols-2 gap-1.5">
                        <div className="w-full h-6 bg-[#f5f5f5]" />
                        <div className="w-full h-6 bg-[#f5f5f5]" />
                    </div>
                </div>
            );
        case "futuristic":
            return (
                <div className="w-full h-full bg-[#020617] p-2 flex flex-col gap-2">
                    <div className="w-full h-full border border-[#38bdf8]/30 rounded-lg flex flex-col p-2 gap-1">
                        <div className="w-full h-2 bg-[#38bdf8] rounded-sm opacity-50" />
                        <div className="w-1/2 h-1.5 bg-[#818cf8] rounded-sm opacity-50" />
                        <div className="mt-auto flex justify-between">
                            <div className="w-4 h-4 rounded-full bg-[#c084fc] blur-[2px]" />
                            <div className="w-4 h-4 rounded-full bg-[#38bdf8] blur-[2px]" />
                        </div>
                    </div>
                </div>
            );
        case "glass":
            return (
                <div className="w-full h-full bg-[#0f172a] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 glass border-white/10 rounded-xl" />
                </div>
            );
        case "creative":
            return (
                <div className="w-full h-full bg-[#fdfcf7] p-2 flex flex-col">
                    <div className="text-[#1a1a1a] font-bold text-[8px] leading-tight">BOLD<br />HEADER</div>
                    <div className="mt-auto w-full h-8 bg-[#ff4d4d] rounded-2xl" />
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#ffb84d] rounded-full" />
                </div>
            );
        default:
            return <div className="w-full h-full bg-black" />;
    }
}
