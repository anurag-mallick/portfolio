"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
    ArrowRight, ChevronRight, Play, Download, ExternalLink, Calendar, MapPin, 
    Search, Linkedin, FileText, Zap, Mail, Terminal, MessageSquare, 
    GraduationCap, BarChart3, Lightbulb, Target, Repeat, Milestone, Flag, 
    TrendingUp, Presentation, Globe, Layers, Database, ShieldCheck
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import Image from "next/image";
import Link from "next/link";

// Import data from existing sections
import { experiences } from "@/lib/data/experience";
import { projects } from "@/components/sections/Projects";
import { technicalSkills, coreCompetencies } from "@/lib/data/skills";
import { metrics } from "@/components/sections/Impact";
import { apps } from "@/components/sections/Apps";
import { games } from "@/components/sections/Games";
import { FintechToolkit } from "@/components/sections/FintechToolkit";
import { LogisticsLab } from "@/components/sections/LogisticsLab";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Algorithms } from "@/components/sections/Algorithms";

// --- Global Apple Fluid Layout Shell ---
export function AppleGlassLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative">
            <GlassHeader />
            <main className="relative z-10 transition-colors duration-500">
                {children}
            </main>
            <footer className="py-24 text-center text-muted-foreground text-sm border-t border-border bg-background/50 backdrop-blur-md relative z-10">
                <div className="meta-label mb-6">Master Curation</div>
                <div className="flex justify-center gap-6 mb-8">
                    <Link href="https://linkedin.com/in/anuragmallick901" className="hover:text-primary transition-colors"><Linkedin size={20}/></Link>
                    <Link href="mailto:anurag@gmail.com" className="hover:text-primary transition-colors"><Mail size={20}/></Link>
                </div>
                <p className="font-medium tracking-tight">© {new Date().getFullYear()} Anurag Mallick. Architecting the future of AI-driven systems.</p>
            </footer>
        </div>
    );
}

// --- Homepage Content Wrapper ---
export function HomeSections() {
    return (
        <div className="flex flex-col">
            <GlassHero />
            <GlassImpact />
            <GlassExperience />
            <GlassEducation />
            <GlassProjects />
            <GlassApps />
            <GlassSkills />
            <FintechToolkit />
            <LogisticsLab />
            <Infrastructure />
            <Algorithms />
            <GlassGames />
            <GlassContact />
        </div>
    );
}

// --- Background Graphics ---
function Particle() {
    const [hasMounted, setHasMounted] = useState(false);
    const [style, setStyle] = useState({ width: 10, height: 10, top: "50%", left: "50%", duration: 5 });

    useEffect(() => {
        setHasMounted(true);
        setStyle({
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 10
        });
    }, []);

    if (!hasMounted) return null;

    return (
        <motion.div
            className="absolute bg-primary/10 rounded-full blur-xl pointer-events-none"
            style={{ width: style.width, height: style.height, top: style.top, left: style.left }}
            animate={{ y: [0, -100, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: style.duration, repeat: Infinity, ease: "linear" }}
        />
    );
}

// --- Apple Glass Header ---
function GlassHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Trajectory", href: "#glass-experience" },
        { name: "Impact", href: "#glass-impact" },
        { name: "Systems", href: "#glass-projects" },
        { name: "Solutions", href: "#glass-apps" },
        { name: "Skills", href: "#glass-skills" },
    ];

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                isScrolled 
                    ? "h-16 bg-background/80 backdrop-blur-2xl border-border shadow-lg" 
                    : "h-24 bg-transparent border-transparent"
            )}
        >
            <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black font-black text-xs rotate-3 group-hover:rotate-0 transition-transform">
                        AM
                    </div>
                    <span className="font-bold text-xl tracking-tighter text-foreground">Anurag Mallick</span>
                </Link>

                <nav className="hidden lg:flex items-center bg-muted/30 p-1.5 rounded-full border border-border/50">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all rounded-full hover:bg-primary/10"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <Button variant="outline" className="hidden sm:flex rounded-full border-primary/20 text-primary hover:bg-primary hover:text-black font-bold tracking-tighter">
                        HIRE PM
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}

// --- Specialized PM Components ---
function GlassHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                {[...Array(15)].map((_, i) => <Particle key={i} />)}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
            </div>
            
            <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="meta-label mb-4">Principal AI Product Manager</div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.85] mb-8">
                        ORCHESTRATING <br /> <span className="text-primary italic">INTELLIGENCE</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                        Scaling enterprise systems from 0 to 85k+ users with data-driven precision and architectural foresight.
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                <ChevronRight className="rotate-90" />
            </div>
        </section>
    );
}

function GlassImpact() {
    return (
        <section id="glass-impact" className="theme-section bg-background border-y border-border/50 relative overflow-hidden">
            {/* PM Graphic: The Growth Loop */}
            <div className="absolute -left-20 top-0 w-80 h-80 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow text-primary">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                    <path d="M 50 5 L 55 15 L 45 15 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {metrics.map((m, i) => (
                        <div key={i} className="text-center group border-l border-border/50 first:border-0 pl-12 lg:pl-0 lg:first:pl-0">
                            <div className="text-5xl md:text-7xl font-black text-foreground mb-3 tracking-tighter">
                                {m.prefix}{m.value}{m.suffix}
                            </div>
                            <div className="meta-label !mb-0 text-primary text-xs uppercase tracking-[0.3em] font-black">{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassExperience() {
    return (
        <section id="glass-experience" className="theme-section bg-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" className="text-primary">
                    <pattern id="roadmap" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#roadmap)" />
                </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="meta-label">Technical Trajectory</div>
                        <h2 className="h2-premium">EXPERIENCE <span className="text-primary">&</span> SCALE.</h2>
                    </div>
                    <div className="glass-pill h-fit">10+ Years Experience</div>
                </div>

                <div className="grid gap-12">
                    {experiences.filter(exp => exp.type === "work").map((exp, i) => (
                        <div key={i} className="theme-card theme-card-hover group p-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <Briefcase size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-foreground">{exp.role}</h3>
                                            <p className="text-primary font-black tracking-widest text-xs uppercase">{exp.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                                        {exp.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="glass-pill !bg-background !border-border mb-4">{exp.period}</div>
                                    <div className="flex flex-wrap justify-end gap-2 max-w-[200px]">
                                        {exp.achievements.slice(0, 3).map((a, j) => (
                                            <span key={j} className="text-[10px] bg-muted/50 px-2 py-1 rounded text-muted-foreground uppercase font-bold tracking-tighter">{a.split(' ')[0]}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassEducation() {
    return (
        <section id="glass-education" className="theme-section bg-background border-t border-border/30 relative">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="mb-20 text-center">
                    <div className="meta-label">Academic Pedigree</div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter">STRATEGIC <span className="text-primary italic">FOUNDATION</span>.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {experiences.filter(e => e.type === "education").map((edu, i) => (
                        <div key={i} className="theme-card p-12 group flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all">
                                <GraduationCap size={44} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{edu.role}</h3>
                                <p className="text-secondary font-black tracking-widest text-xs uppercase mb-6">{edu.company}</p>
                                <div className="space-y-3">
                                    {edu.achievements.slice(0, 2).map((ach, idx) => (
                                        <p key={idx} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-6 group-hover:border-primary transition-all">
                                            {ach}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassProjects() {
    return (
        <section id="glass-projects" className="theme-section bg-background">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="mb-24 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
                    <div className="max-w-2xl">
                        <div className="meta-label">System Architecture</div>
                        <h2 className="h2-premium">CORE <span className="text-primary italic">DEPLOYS</span>.</h2>
                    </div>
                    <Button variant="outline" className="rounded-full h-16 px-10 border-primary/20 text-primary group font-black tracking-[0.2em] text-xs">
                        EXPLORE REPOS <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((proj, i) => (
                        <div key={i} className="theme-card theme-card-hover p-10 min-h-[450px] flex flex-col justify-between group bg-muted/20">
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                        <Globe size={28} />
                                    </div>
                                    <span className="glass-pill !text-[10px] uppercase font-black tracking-widest border-primary/20">{proj.category}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-foreground mb-6 transition-colors tracking-tight">{proj.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg mb-8 line-clamp-3 group-hover:text-foreground transition-colors">{proj.description}</p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex flex-wrap gap-2">
                                    {proj.tech.map((t, idx) => (
                                        <span key={idx} className="text-[10px] font-black uppercase text-primary/60 tracking-widest border-b border-primary/10 pb-1">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassApps() {
    return (
        <section id="glass-apps" className="theme-section bg-background border-y border-border/30 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="mb-20 text-center">
                    <div className="meta-label">Product Suite</div>
                    <h2 className="h2-premium">PRODUCTION <span className="text-primary">ASSETS</span>.</h2>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
                    {apps.map((app, i) => (
                        <div key={i} className="min-w-[400px] snap-center p-12 theme-card theme-card-hover group flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 mb-8 border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all">
                                    <Layers size={32} />
                                </div>
                                <h3 className="text-3xl font-bold text-foreground mb-4">{app.title}</h3>
                                <p className="text-muted-foreground mb-12 text-lg leading-relaxed h-28 line-clamp-4">{app.description}</p>
                            </div>
                            <Button className="w-full h-14 bg-background border border-border text-foreground hover:bg-foreground hover:text-black font-black tracking-widest text-xs uppercase group-hover:border-primary transition-all">
                                INITIALIZE SOLUTION
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassSkills() {
    return (
        <section id="glass-skills" className="theme-section bg-background relative overflow-hidden">
            {/* PM Graphic: The Knowledge Graph */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%">
                    <circle cx="20%" cy="30%" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                    <circle cx="80%" cy="70%" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
                    <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" className="text-primary" />
                </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <div className="meta-label">Technical Stack</div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">MASTER <br /> <span className="text-primary">TOOLKIT</span>.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {coreCompetencies.map((skill, i) => (
                        <div key={i} className="theme-card p-6 flex flex-col justify-center items-center text-center group bg-muted/10 hover:bg-primary transition-all duration-500">
                            <div className="text-primary group-hover:text-black transition-colors mb-4">
                                <skill.icon size={28} />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest text-foreground group-hover:text-black transition-colors">{skill.name}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {technicalSkills.map((skill, i) => (
                        <div key={i} className="glass-pill !py-4 !px-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group hover:border-primary">
                            <skill.icon size={14} className="text-primary opacity-50 group-hover:opacity-100" />
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassGames() {
    return (
        <section id="glass-games" className="theme-section bg-background overflow-hidden border-t border-border/30 relative">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <div className="meta-label">Logic Labs</div>
                    <h2 className="h2-premium uppercase">SIMULATION <span className="text-secondary italic">MODELS</span>.</h2>
                    <p className="text-muted-foreground text-lg mt-6">Stress-testing recursive algorithms and state synchronization through interactive media.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game, i) => (
                        <Link key={i} href={game.link}>
                            <div className="theme-card theme-card-hover p-10 group flex flex-col justify-between min-h-[400px] cursor-pointer bg-muted/30">
                                <div>
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="p-4 rounded-2xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-500 shadow-lg group-hover:shadow-secondary/20">
                                            {game.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-secondary/60 tracking-widest">{game.tech}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">{game.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground transition-colors">{game.description}</p>
                                </div>
                                <div className="mt-12 flex items-center justify-between text-secondary font-black tracking-[0.2em] text-[10px] uppercase">
                                    <span>INITIALIZE CORE</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GlassContact() {
    return (
        <section id="glass-contact" className="theme-section bg-background relative overflow-hidden border-t border-border">
            {/* PM Graphic: Signal Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 border border-primary rounded-full animate-ping [animation-duration:3s]" />
                <div className="absolute inset-[20%] border border-primary/50 rounded-full animate-ping [animation-duration:4s]" />
                <div className="absolute inset-[40%] border border-primary/20 rounded-full animate-ping [animation-duration:5s]" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
                <div className="meta-label">Protocol: Communication</div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase leading-[0.8]">GET IN <br /> <span className="text-primary italic">TOUCH</span>.</h2>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <Link href="https://linkedin.com/in/anuragmallick901" target="_blank" className="flex-1 max-w-[300px]">
                        <Button className="w-full h-20 bg-primary text-black hover:bg-primary/90 rounded-2xl font-black tracking-widest uppercase text-xs">
                            LINKEDIN SECURE
                        </Button>
                    </Link>
                    <Link href="mailto:anurag@gmail.com" className="flex-1 max-w-[300px]">
                        <Button variant="outline" className="w-full h-20 border-primary/30 text-primary hover:bg-primary/10 rounded-2xl font-black tracking-widest uppercase text-xs">
                            EMAIL PAYLOAD
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
