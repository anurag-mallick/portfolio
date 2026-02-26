"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, Linkedin, Database, Layout, PieChart, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

function AIIntelligenceHub() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number, y: number, vx: number, vy: number, size: number }[] = [];
        const particleCount = 40;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: particleCount }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                const mDx = mousePos.x - p.x;
                const mDy = mousePos.y - p.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 pointer-events-none opacity-30 z-0"
        />
    );
}

function PMIcon({ icon: Icon, delay, initialPos }: { icon: any, delay: number, initialPos: { top: string, left?: string, right?: string } }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: [0.1, 0.3, 0.1], 
                scale: [1, 1.2, 1],
                y: [0, -20, 0],
                x: [0, 10, 0]
            }}
            transition={{ 
                duration: 4, 
                delay, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            className="absolute text-primary/20 pointer-events-none hidden lg:block"
            style={{ 
                top: initialPos.top, 
                left: initialPos.left,
                right: initialPos.right
            }}
        >
            <Icon size={48} strokeWidth={1} />
        </motion.div>
    );
}

function PMSweetSpot() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20 hidden xl:block">
            <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 2 }}
                className="relative w-full h-full"
            >
                {/* Venn Circles */}
                <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full border border-primary/30 bg-primary/5 backdrop-blur-[2px] flex items-start justify-center pt-8">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Business</span>
                </div>
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-[2px] flex items-end justify-start pl-8 pb-8">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Technology</span>
                </div>
                <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full border border-accent/30 bg-accent/5 backdrop-blur-[2px] flex items-end justify-end pr-8 pb-8">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">User Experience</span>
                </div>
                
                {/* Center Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-primary/50 bg-background/80 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                    <div className="text-center">
                        <div className="text-[8px] font-bold text-primary/60 tracking-widest uppercase">Center</div>
                        <div className="text-xl font-black text-primary">PM</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function Particle() {
// ... existing Particle logic
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            <AIIntelligenceHub />

            {/* PM Visual Language Elements */}
            <PMSweetSpot />
            <PMIcon icon={Database} delay={0} initialPos={{ top: '15%', left: '10%' }} />
            <PMIcon icon={Layout} delay={1} initialPos={{ top: '25%', right: '15%' }} />
            <PMIcon icon={PieChart} delay={2} initialPos={{ top: '65%', left: '15%' }} />
            <PMIcon icon={TrendingUp} delay={1.5} initialPos={{ top: '75%', right: '12%' }} />
            <PMIcon icon={Users} delay={0.5} initialPos={{ top: '10%', right: '25%' }} />

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
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-[0.85] uppercase"
                    >
                        ANURAG <br className="hidden md:block" />
                        <span className="text-primary italic">MALLICK</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-3 text-lg md:text-2xl font-medium tracking-tight"
                    >
                        <span className="px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">Product Manager</span>
                        <span className="hidden md:block text-muted-foreground/30">•</span>
                        <span className="px-4 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary">Digital Initiatives</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="max-w-[800px] mx-auto text-muted-foreground md:text-xl px-4"
                    >
                        Scaling Global Payroll Systems & Integrating AI into Financial Workflows.
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
