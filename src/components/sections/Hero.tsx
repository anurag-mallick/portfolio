"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

function Particle() {
    const [style, setStyle] = useState({
        width: 10,
        height: 10,
        top: "50%",
        left: "50%",
        duration: 5
    });

    useEffect(() => {
        // Use requestAnimationFrame to defer state update and avoid synchronous layout thrashing/cascading renders
        const frame = requestAnimationFrame(() => {
            setStyle({
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                duration: Math.random() * 5 + 5
            });
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <motion.div
            className="absolute bg-primary/30 rounded-full blur-md"
            style={{
                width: style.width,
                height: style.height,
                top: style.top,
                left: style.left,
            }}
            animate={{
                y: [0, -50, 0],
                x: [0, 20, 0],
                opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
                duration: style.duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Aurora Effect (Subtle for non-terminal themes) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none opacity-50" />

            {/* Floating Particles */}
            {[...Array(30)].map((_, i) => (
                <Particle key={i} />
            ))}


            <div className="theme-container theme-section relative z-10">
                <div className="flex flex-col space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm self-center"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                        Open for Innovation
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-foreground leading-tight"
                    >
                        ANURAG MALLICK
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="h-auto md:h-12 overflow-hidden flex flex-col"
                    >
                        <div className="animate-slide-up text-lg md:text-3xl font-light text-muted-foreground flex flex-col md:block items-center gap-1 md:gap-0">
                            <span className="text-primary">Product Manager</span>
                            <span className="hidden md:inline mx-2">•</span>
                            <span className="text-secondary">Digital Initiatives</span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="max-w-[800px] mx-auto text-muted-foreground md:text-xl px-4"
                    >
                        Scaling Global Payroll Infrastructure & Integrating AI into Financial Workflows.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto"
                        style={{ justifyContent: 'var(--layout-align)' }}
                    >
                        <Button variant="neon" size="lg" className="group w-full sm:w-auto" onClick={() => scrollToSection('experience')}>
                            Enter Portfolio
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Link href="https://drive.google.com/file/d/1KmV8TzTGY9cDsypeo5xT9ZcNRcoKeg9F/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                View Resume
                            </Button>
                        </Link>
                        <Link href="https://www.linkedin.com/in/anuragmallick901/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full">
                                <Linkedin className="mr-2 h-4 w-4" />
                                Connect
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <motion.div
                style={{ y }}
                className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-background to-transparent z-0"
            />
        </section>
    );
}
