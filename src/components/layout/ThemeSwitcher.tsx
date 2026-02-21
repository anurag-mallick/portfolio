"use client";

import React, { useState } from "react";
import { 
    Terminal, User, Zap, Box, Palette, Laptop, Moon, 
    ChevronDown, Check, Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, Theme } from "@/components/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const themeConfig = [
    { id: "terminal", name: "Terminal", icon: Terminal, color: "#00ff41", desc: "Classic Matrix" },
    { id: "minimal", name: "Executive", icon: User, color: "#111111", desc: "Clean & Serif" },
    { id: "futuristic", name: "Futuristic", icon: Zap, color: "#00f3ff", desc: "Neon & Glow" },
    { id: "glass", name: "Modern Glass", icon: Box, color: "#38bdf8", desc: "Frosted Effects" },
    { id: "creative", name: "Creative", icon: Palette, color: "#f87171", desc: "Bold & Loud" },
    { id: "apple-glass", name: "Apple Glass", icon: Laptop, color: "#0071E3", desc: "Premium Light" },
    { id: "midnight", name: "Midnight", icon: Moon, color: "#8b5cf6", desc: "Deep & Vibrant" },
] as const;

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const currentTheme = themeConfig.find(t => t.id === theme) || themeConfig[0];

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                    "glass border-white/10 hover:border-primary/50 group"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <currentTheme.icon size={16} className="text-primary group-hover:animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">{currentTheme.name}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/20"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-64 glass border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="px-3 py-2 border-b border-white/5 mb-2">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Monitor size={10} /> Aesthetics Module v2.4
                                </p>
                            </div>
                            <div className="space-y-1">
                                {themeConfig.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setTheme(t.id as Theme);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between p-2.5 rounded-xl transition-all group",
                                            theme === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-1.5 rounded-lg border transition-colors",
                                                theme === t.id ? "bg-primary/20 border-primary/30" : "bg-white/5 border-white/10 group-hover:border-white/20"
                                            )}>
                                                <t.icon size={14} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold tracking-tight">{t.name}</p>
                                                <p className="text-[10px] opacity-50 font-medium">{t.desc}</p>
                                            </div>
                                        </div>
                                        {theme === t.id && (
                                            <motion.div layoutId="active-check">
                                                <Check size={14} />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
