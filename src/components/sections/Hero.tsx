"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, Linkedin } from "lucide-react";
import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Lazy load 3D component — skip entirely on mobile
const ProductCore3D = lazy(() =>
    import("@/components/viz/ProductCore3D").then((m) => ({ default: m.ProductCore3D }))
);

// ── Tagline words for the rotating animation ──
const TAGLINES = ["Architect", "Builder", "Strategist", "Optimizer"];

// ======================
//  TaglineWordSwap
// ======================
function TaglineWordSwap() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TAGLINES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center gap-1 text-sm sm:text-base font-medium text-muted-foreground tracking-wide">
            <span className="text-primary/70">I</span>
            <span className="relative inline-block min-w-[100px] sm:min-w-[120px] text-center">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={TAGLINES[index]}
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="inline-block text-primary font-semibold"
                    >
                        {TAGLINES[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
            <span className="text-primary/50 mx-1">·</span>
            <span className="text-primary/70">Systems Builder</span>
        </div>
    );
}

// ======================
//  TerminalCard
// ======================
function TerminalCard({ reducedMotion }: { reducedMotion: boolean }) {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.2,
                staggerChildren: 0.4,
                // delayChildren removed, not part of the base type, handled by parent
            },
        },
    };

    const lineVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 },
        },
    };

    const bootLines = [
        { prefix: \">\", text: \"initializing: anurag.mallick.portfolio\" },
        { prefix: \">\", text: \"role: AI Product Architect\" },
        { prefix: \">\", text: \"stack: fintech | EOR | LLM | global payroll\" },
        { prefix: \">\", text: \"status: OPEN TO SENIOR PM ROLES █\" },
    ];

    if (reducedMotion) {
        return (
            <div className="mt-8 p-4 sm:p-5 rounded-lg bg-background/40 backdrop-blur-md border border-primary/10 max-w-lg mx-auto font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/10">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    </div>
                    <span className="text-muted-foreground text-xs ml-2">bash — anurag@portfolio</span>
                </div>
                {bootLines.map((line, i) => (
                    <div key={i} className="flex gap-2 text-primary/80">
                        <span className="text-primary/40 select-none shrink-0">{line.prefix}</span>
                        <span>{line.text}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 p-4 sm:p-5 rounded-lg bg-background/40 backdrop-blur-md border border-primary/10 max-w-lg mx-auto font-mono text-xs sm:text-sm"
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/10">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
                <span className="text-muted-foreground text-xs ml-2">bash — anurag@portfolio</span>
            </div>

            {/* Boot lines */}
            {bootLines.map((line, i) => (
                <motion.div
                    key={i}
                    variants={lineVariants}
                    className="flex gap-2 text-primary/80 mb-1"
                >
                    <span className="text-primary/40 select-none shrink-0">{line.prefix}</span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 + i * 0.4, duration: 0.2 }}
                    >
                        {line.text}
                        {i === bootLines.length - 1 && (
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="inline-block ml-0.5"
                            >
                                █
                            </motion.span>
                        )}
                    </motion.span>
                </motion.div>
            ))}
        </motion.div>
    );
}

// ======================
//  AIIntelligenceHub (Particle Network)
// ======================
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

                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx!.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx!.beginPath();
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(p2.x, p2.y);
                        ctx!.stroke();
                    }
                }

                // Mouse interaction
                const mDx = mouseRef.current.x - p.x;
                const mDy = mouseRef.current.y - p.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDist < 200) {
                    ctx!.beginPath();
                    ctx!.moveTo(p.x, p.y);
                    ctx!.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx!.stroke();
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

// ======================
//  Particle (Floating dots)
// ======================
function Particle({ index }: { index: number }) {
    return (
        <motion.div
            className="absolute bg-primary/20 rounded-full blur-sm"
            style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                top: `${(index * 37) % 100}%`,
                left: `${(index * 53) % 100}%`,
            }}
            animate={{
                y: [0, -30, 0],
                x: [0, 15, -10, 0],
                opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
            }}
        />
    );
}

// ======================
//  StatusBadge
// ======================
function StatusBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm self-center"
        >
            <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">
                Open to Senior PM Roles
            </span>
        </motion.div>
    );
}

// ======================
//  Main Hero Component
// ======================
export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Reduce animation complexity on mobile for performance
    const particleCount = isMobile ? 5 : 15;

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-background"
        >
            {/* ── Background Grid ── */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* ── Particle Network Canvas (desktop only) ── */}
            {!isMobile && !reducedMotion && <AIIntelligenceHub />}

            {/* ── 3D Product Core ── */}
            {!isMobile && !reducedMotion && (
                <motion.div
                    style={{
                        opacity,
                        scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.2]),
                    }}
                    className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
                >
                    <Suspense fallback={null}>
                        <ProductCore3D />
                    </Suspense>
                </motion.div>
            )}

            {/* ── Aurora Blobs ── */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full mix-blend-screen animate-pulse pointer-events-none opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full mix-blend-screen animate-pulse pointer-events-none opacity-50" />

            {/* ── Floating Particles ── */}
            {!reducedMotion &&
                [...Array(particleCount)].map((_, i) => (
                    <Particle key={i} index={i} />
                ))}

            {/* ── Grain/Noise Texture Overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ── Main Content ── */}
            <motion.div
                style={{ opacity, scale, y }}
                className="theme-container relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-20 sm:pt-24"
            >
                <div className="flex flex-col items-center max-w-4xl mx-auto">
                    {/* ── Status Badge (Above role) ── */}
                    <StatusBadge />

                    {/* ── Role + Specialization ── */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-6 text-sm sm:text-base md:text-lg font-medium tracking-[0.15em] uppercase text-muted-foreground/80"
                    >
                        Senior Product Manager · AI &amp; Fintech
                    </motion.p>

                    {/* ── Name (Monumental) ── */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 font-[var(--font-syne)] font-black tracking-tighter text-foreground leading-[0.85] uppercase"
                        style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
                    >
                        ANURAG
                        <br />
                        <span className="text-primary italic">MALLICK</span>
                    </motion.h1>

                    {/* ── Tagline Word Swap ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4"
                    >
                        <TaglineWordSwap />
                    </motion.div>

                    {/* ── One-line Proof Point ── */}
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                        Built EOR platforms for <strong className="text-foreground font-semibold">500+ clients</strong> ·
                        Reduced payroll ops effort by <strong className="text-foreground font-semibold">60%</strong> ·
                        <span className="inline-flex items-center gap-1.5 ml-1">
                            MBA, <span className="text-primary font-medium">IIM Lucknow</span>
                        </span>
                    </motion.p>

                    {/* ── Terminal Card ── */}
                    <TerminalCard reducedMotion={!!reducedMotion} />

                    {/* ── CTA Buttons ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center items-center"
                    >
                        <Button
                            variant="neon"
                            size="lg"
                            className="group w-full sm:w-auto min-h-[48px] text-sm sm:text-base"
                            onClick={() => scrollToSection("experience")}
                        >
                            Enter Portfolio
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto min-h-[48px] text-sm sm:text-base group"
                            onClick={() =>
                                window.open(
                                    "https://drive.google.com/file/d/1KmV8TzTGY9cDsypeo5xT9ZcNRcoKeg9F/view?usp=drive_link",
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto min-h-[48px] text-sm sm:text-base group"
                            onClick={() =>
                                window.open(
                                    "https://www.linkedin.com/in/anuragmallick901/",
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                        >
                            <Linkedin className="mr-2 h-4 w-4" />
                            Connect
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Bottom Fade ── */}
            <motion.div
                style={{ y }}
                className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-background to-transparent z-0"
            />
        </section>
    );
}
