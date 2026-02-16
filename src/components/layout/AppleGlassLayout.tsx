"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, Play, Download, ExternalLink, Calendar, MapPin, Search, Linkedin, FileText, Zap, Mail, Terminal, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import Image from "next/image";
import Link from "next/link";

// Import data from existing sections
import { experiences, Logo } from "@/components/sections/Experience";
import { projects } from "@/components/sections/Projects";
import { technicalSkills, coreCompetencies, certifications } from "@/components/sections/Skills";
import { metrics } from "@/components/sections/Impact";
import { apps } from "@/components/sections/Apps";
import { games } from "@/components/sections/Games";
import { FintechToolkit } from "@/components/sections/FintechToolkit";
import { LogisticsLab } from "@/components/sections/LogisticsLab";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Algorithms } from "@/components/sections/Algorithms";

function Particle() {
    const [style, setStyle] = useState({
        width: 10,
        height: 10,
        top: "50%",
        left: "50%",
        duration: 5
    });

    useEffect(() => {
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
            className="absolute bg-[#0071E3]/20 rounded-full blur-md"
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

// --- Apple Glass Header ---
function GlassHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
    const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Experience", href: "#glass-experience" },
        { name: "Education", href: "#glass-education" },
        { name: "Projects", href: "#glass-projects" },
        { name: "Solutions", href: "#glass-apps" },
        { name: "Contact", href: "#glass-contact" },
    ];

    return (
        <motion.header
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
            }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-black/5",
                isScrolled ? "h-16 shadow-sm" : "h-20"
            )}
        >
            <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-[#0071E3] transition-colors">
                        AM
                    </div>
                    <span className="font-semibold text-lg tracking-tight text-black/90 group-hover:text-[#0071E3] transition-colors">Anurag Mallick</span>
                </a>

                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-black/70 hover:text-[#0071E3] rounded-full hover:bg-black/5 transition-all"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <a href="https://www.linkedin.com/in/anuragmallick" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-sm font-medium text-black/60 hover:text-black transition-colors">
                        Values
                    </a>
                    <div className="w-px h-6 bg-black/10 hidden sm:block" />
                    <ThemeSwitcher />
                </div>
            </div>
        </motion.header>
    );
}

// --- Full Bleed Hero ---
function GlassHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#FAFAFA]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Soft Apple-style gradients */}
                <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-b from-[#0071E3]/5 to-transparent rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-t from-[#2997FF]/10 to-transparent rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-[#0071E3] text-xs font-semibold uppercase tracking-wide">
                        Product Architect
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#1D1D1F] leading-[1.05]">
                        Vision.<br />
                        Wait less.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#2997FF]">Build More.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#86868b] font-medium max-w-lg leading-relaxed">
                        Building Payroll Systems at Scale & Integrating AI into Financial Workflows.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="#glass-experience" className="px-8 py-4 rounded-full bg-[#0071E3] text-white font-medium text-lg hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                            Read My Story
                        </a>
                        <Link href="https://drive.google.com/file/d/1KmV8TzTGY9cDsypeo5xT9ZcNRcoKeg9F/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <button className="px-8 py-4 rounded-full bg-white text-[#1D1D1F] border border-black/10 font-medium text-lg hover:bg-[#F5F5F7] transition-all flex items-center gap-2">
                                Download Resume <Download size={18} />
                            </button>
                        </Link>
                        <Link href="https://www.linkedin.com/in/anuragmallick901/" target="_blank" rel="noopener noreferrer">
                            <button className="px-8 py-4 rounded-full bg-white text-[#1D1D1F] border border-black/10 font-medium text-lg hover:bg-[#F5F5F7] transition-all flex items-center gap-2">
                                Connect <Linkedin size={18} />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-[600px] lg:h-[800px] w-full hidden lg:block"
                >
                    {/* Abstract Phone/Glass representation */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[700px] bg-white rounded-[60px] border-8 border-[#F5F5F7] shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F7] to-white" />
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0071E3]/5 to-transparent" />

                        {/* Floating Cards inside phone */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-24 left-8 right-8 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#42A5F5]" />
                                <div className="space-y-2">
                                    <div className="w-32 h-3 bg-black/10 rounded-full" />
                                    <div className="w-20 h-2 bg-black/5 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-2 bg-black/5 rounded-full" />
                                <div className="w-full h-2 bg-black/5 rounded-full" />
                                <div className="w-2/3 h-2 bg-black/5 rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-80 left-8 right-8 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-[#1D1D1F]">Impact</span>
                                <span className="text-[#0071E3] font-bold">+275%</span>
                            </div>
                            <div className="h-32 flex items-end justify-between gap-2">
                                {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className="w-full bg-[#0071E3]/20 rounded-t-sm" />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Impact Section ---
function GlassImpact() {
    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {metrics.map((metric, i) => (
                        <div key={i} className="group relative p-8 bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-2 tracking-tight">
                                {metric.prefix}{typeof metric.value === 'number' && metric.value > 1000 ? `${(metric.value / 1000)}k` : metric.value}{metric.suffix}
                            </div>
                            <div className="text-sm font-semibold text-[#86868b] uppercase tracking-wide">{metric.label}</div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Experience Timeline ---
function GlassExperience() {
    const workExp = experiences.filter(e => e.type === "work");

    return (
        <section id="glass-experience" className="py-32 bg-[#F5F5F7]">
            <div className="max-w-[1000px] mx-auto px-6">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-6">Professional Journey.</h2>
                    <p className="text-xl text-[#86868b] max-w-2xl mx-auto">Leading digital transformation and scaling products across industries.</p>
                </div>

                <div className="space-y-16 relative before:absolute before:left-[27px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-black/10 before:-translate-x-1/2">
                    {workExp.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className={cn(
                                "relative flex flex-col md:flex-row gap-8 md:gap-20 items-stretch md:items-center",
                                i % 2 === 0 ? "md:flex-row-reverse text-left md:text-left" : "text-left md:text-right"
                            )}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-[27px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[#FAFAFA] border-4 border-[#0071E3] shadow-[0_0_0_4px_rgba(0,113,227,0.1)] z-10" />

                            <div className="flex-1 pl-16 md:pl-0 md:pr-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <Logo
                                        src={exp.logoUrl}
                                        initial={exp.logoInitial}
                                        color={exp.logoColor}
                                        bgClass={exp.logoBg}
                                        className="w-16 h-16"
                                    />
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-white border border-black/5 text-[#86868b] text-xs font-bold mb-2 shadow-sm">
                                            {exp.period}
                                        </span>
                                        <h3 className="text-2xl font-bold text-[#1D1D1F]">{exp.company}</h3>
                                    </div>
                                </div>
                                <p className="text-lg text-[#0071E3] font-medium mb-1">{exp.role}</p>
                                <p className="text-[#86868b] text-sm flex items-center gap-1 md:justify-end" style={{ justifyContent: i % 2 === 0 ? 'flex-start' : 'inherit' }}>
                                    <MapPin size={14} /> {exp.location}
                                </p>
                            </div>

                            <div className="flex-1 pl-16 md:pl-0">
                                <div className="p-8 bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                                    <p className="text-[#1D1D1F]/80 leading-relaxed mb-4">{exp.description}</p>
                                    <ul className="space-y-2">
                                        {exp.achievements.slice(0, 3).map((ach, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-[#86868b]">
                                                <span className="text-[#0071E3] mt-1">●</span>
                                                <span>{ach}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Education & Awards Grid ---
function GlassEducation() {
    const eduExp = experiences.filter(e => e.type === "education");

    return (
        <section id="glass-education" className="py-32 bg-[#FAFAFA]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F]">Academic Foundation.</h2>
                    <p className="text-[#86868b] uppercase tracking-widest font-bold text-sm">Excellence & Recognition</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eduExp.map((edu, i) => (
                        <div key={edu.id} className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <Logo
                                    src={edu.logoUrl}
                                    initial={edu.logoInitial}
                                    color={edu.logoColor}
                                    bgClass={edu.logoBg}
                                    className="w-14 h-14"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-1">{edu.role}</h3>
                                    <p className="text-[#0071E3] font-medium">{edu.company}</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-black/5">
                                {edu.achievements.slice(0, 3).map((ach, idx) => (
                                    <p key={idx} className="text-xs text-[#86868b] leading-relaxed">
                                        {ach}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Projects Matrix ---
function GlassProjects() {
    return (
        <section id="glass-projects" className="py-32 bg-[#1D1D1F] text-[#F5F5F7]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">System Deployments.</h2>
                    <p className="text-xl text-white/60">Architectural achievements and technical milestones.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((proj, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
                            <div className="p-10 min-h-[300px] flex flex-col justify-between">
                                <div>
                                    <span className="text-[#2997FF] font-bold tracking-wider text-xs uppercase mb-2 block">{proj.category}</span>
                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#2997FF] transition-colors">{proj.title}</h3>
                                    <p className="text-white/70 leading-relaxed text-lg">{proj.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-8">
                                    {proj.tech.map((t, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
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

// --- Enterprise Solutions (Apps) ---
function GlassApps() {
    return (
        <section id="glass-apps" className="py-32 bg-[#F5F5F7] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F]">Enterprise Solutions.</h2>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
                    {apps.map((app, i) => (
                        <div key={i} className="min-w-[350px] md:min-w-[400px] snap-center p-8 bg-white rounded-3xl shadow-sm border border-black/5 hover:shadow-2xl transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0071E3] to-[#2997FF] mb-8 shadow-lg flex items-center justify-center text-white">
                                <div className="text-2xl font-bold">{app.title.charAt(0)}</div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">{app.title}</h3>
                            <p className="text-[#86868b] leading-relaxed mb-8 h-20">{app.description}</p>
                            <button className="w-full py-4 rounded-xl bg-[#F5F5F7] text-[#0071E3] font-bold hover:bg-[#0071E3] hover:text-white transition-all">
                                Launch Solution
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Skills Grid ---
function GlassSkills() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#1D1D1F] mb-12 text-center">Expertise & Artifacts.</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {technicalSkills.map((skill, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#F5F5F7] hover:bg-[#0071E3] hover:text-white transition-all duration-300 group cursor-default">
                            {/* Icon would go here, simplified for text */}
                            <span className="font-semibold text-sm group-hover:text-white transition-colors">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Contact Form ---
function GlassContact() {
    return (
        <section id="glass-contact" className="py-32 bg-[#FAFAFA]">
            <div className="max-w-[600px] mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-[#1D1D1F] mb-6">Get in Touch.</h2>
                <p className="text-[#86868b] text-lg mb-12">Open for collaborations and product leadership roles.</p>

                <form className="space-y-4">
                    <input type="text" placeholder="Name" className="w-full p-4 rounded-2xl bg-white border border-black/5 focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none transition-all" />
                    <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-white border border-black/5 focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none transition-all" />
                    <textarea placeholder="Message" rows={4} className="w-full p-4 rounded-2xl bg-white border border-black/5 focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none transition-all resize-none" />
                    <button className="w-full py-5 rounded-2xl bg-[#0071E3] text-white font-bold text-lg hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-[#0071E3]/30">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

// --- Games Section ---
function GlassGames() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-6">Interactive Modules.</h2>
                    <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
                        Logic puzzles and simulations demonstrating React state management and Canvas rendering.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game, i) => (
                        <Link key={i} href={game.link}>
                            <div className="group p-8 bg-[#F5F5F7] rounded-3xl border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {game.icon}
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#86868b] border border-black/10 px-2 py-1 rounded">
                                        {game.tech}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-[#1D1D1F] mb-3 group-hover:text-[#0071E3] transition-colors">
                                    {game.title}
                                </h3>
                                <p className="text-sm text-[#86868b] leading-relaxed mb-6 flex-grow">
                                    {game.description}
                                </p>

                                <div className="flex items-center text-[#0071E3] text-sm font-semibold group-hover:gap-2 transition-all">
                                    Launch Module
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Main Layout Export ---
export function AppleGlassLayout() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">
            <GlassHeader />
            <main>
                <GlassHero />
                <GlassImpact />
                <GlassExperience />
                <GlassEducation />
                <GlassProjects />
                <GlassApps />
                <GlassSkills />
                <div id="fintech" className="bg-black"><FintechToolkit /></div>
                <div id="logistics-lab" className="bg-black"><LogisticsLab /></div>
                <div id="infrastructure" className="bg-black"><Infrastructure /></div>
                <div id="algorithms" className="bg-black"><Algorithms /></div>
                <GlassGames />
                <GlassContact />
            </main>
            <footer className="py-12 text-center text-[#86868b] text-sm border-t border-black/5 bg-white">
                <p>© {new Date().getFullYear()} Anurag Mallick. Designed with Apple Liquid Glass aesthetics.</p>
            </footer>
        </div>
    );
}
