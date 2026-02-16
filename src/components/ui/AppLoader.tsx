"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppLoaderProps {
    onLoadComplete: () => void;
    appName: string;
}

export function AppLoader({ onLoadComplete, appName }: AppLoaderProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment between 1 and 5
                return Math.min(100, prev + Math.random() * 8);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(onLoadComplete, 500); // Short delay before unmounting
        }
    }, [progress, onLoadComplete]);

    return (
        <div className="absolute inset-0 z-50 flexflex-col items-center justify-center bg-black/90 backdrop-blur-xl flex flex-col">
            <div className="w-64 space-y-4 text-center">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">{appName}</h2>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
                    <span>INITIALIZING MODULES...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
}
