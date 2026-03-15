"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, Linkedin, Database, Layout, PieChart, TrendingUp, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Lazy load 3D component — skip entirely on mobile
const ProductCore3D = lazy(() =>
    import("@/components/viz/ProductCore3D").then((m) => ({ default: m.ProductCore3D }))
);

function AIIntelligenceHub() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
        const particleCount = 40;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: particleCount }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 243, 255, 0.2)";
            ctx.strokeStyle = "rgba(0, 243, 255, 0.05)";

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
                const mDx = mouseRef.current.x - p.x;
                const mDy = mouseRef.current.y - p.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-30 z-0"
        />
    );
}

function PMIcon({ icon: Icon, delay, initialPos }: { icon: LucideIcon; delay: number; initialPos: { top: string; left?: string; right?: string } }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
                y: [0, -20, 0],
                x: [0, 10, 0],
            }}
            transition={{
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute text-primary/20 pointer-events-none hidden lg:block"
            style={{
                top: initialPos.top,
                left: initialPos.left,
                right: initialPos.right,
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
    const [style, setStyle] = useState({
        width: 10,
        height: 10,
        top: "50%",
        left: "50%",
        duration: 5,
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setStyle({
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                duration: Math.random() * 5 + 5,
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
    const isMobile = useIsMobile();
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Reduce particles on mobile for performance
    const particleCount = isMobile ? 8 : 30;

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-background"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Canvas network — desktop only for performance */}
            {!isMobile && !reducedMotion && <AIIntelligenceHub />}

            {/* 3D Product Core Experience — desktop only */}
            {!isMobile && !reducedMotion && (
                <motion.div 
                    style={{ 
                        opacity, 
                        scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.2]),
                        rotateY: useTransform(scrollYProgress, [0, 1], [0, 45]),
                    }}
                    className="absolute inset-0 z-0 flex items-center justify-center opacity-40"
                >
                    <Suspense fallback={null}>
                        <ProductCore3D />
                    </Suspense>
                </motion.div>
            )}

            {/* Aurora Effect */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow pointer-events-none opacity-50" />

            {/* Floating Particles — reduced on mobile */}
            {!reducedMotion &&
                [...Array(particleCount)].map((_, i) => (
                    <Particle key={i} />
                ))}

            <div className="theme-container theme-section relative z-10 px-4 sm:px-6">
                <motion.div
                    style={reducedMotion ? {} : { opacity, scale, y: yHero }}
                    className="flex flex-col space-y-6 sm:space-y-8"
                >
                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary backdrop-blur-sm self-center"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                        Open to Senior PM Roles
                    </motion.div>

                    <motion.h1
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-foreground leading-[0.85] uppercase"
                    >
                        ANURAG <br className="hidden sm:block" />
                        <span className="text-primary italic">MALLICK</span>
                    </motion.h1>

                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg md:text-2xl font-medium tracking-tight"
                    >
                        <span className="px-3 sm:px-4 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm sm:text-base font-bold uppercase tracking-widest">
                            AI Product Architect
                        </span>
                        <span className="hidden sm:block text-muted-foreground/30">•</span>
                        <span className="px-3 sm:px-4 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-sm sm:text-base font-medium">
                            Digital Transformation
                        </span>
                    </motion.div>

                    <motion.p
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="max-w-[800px] mx-auto text-muted-foreground text-base sm:text-lg md:text-xl px-2 sm:px-4"
                    >
                        Built EOR platforms for 500+ clients · Cut payroll ops effort by 60%
                    </motion.p>

                    <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center items-center"
                    >
                        <Button variant="neon" size="lg" className="group w-full sm:w-auto min-h-[44px] hover:scale-[1.03] hover:brightness-110 transition-all duration-150" onClick={() => scrollToSection("experience")}>
                            Enter Portfolio
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <a href="/resume.pdf" download className="w-full sm:w-auto hover:scale-[1.03] hover:brightness-110 transition-all duration-150">
                            <Button variant="outline" size="lg" className="w-full min-h-[44px]">
                                <FileText className="mr-2 h-4 w-4" />
                                View Resume
                            </Button>
                        </a>
                        <Link href="https://www.linkedin.com/in/anuragmallick901/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto hover:scale-[1.03] hover:brightness-110 transition-all duration-150">
                            <Button variant="outline" size="lg" className="w-full min-h-[44px]">
                                <Linkedin className="mr-2 h-4 w-4" />
                                Connect
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                style={{ y: yHero }}
                className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-background to-transparent z-0"
            />
        </section>
    );
}
