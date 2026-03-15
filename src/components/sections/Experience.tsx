"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Calendar, MapPin, ChevronRight, GraduationCap, Briefcase, BarChart3, Lightbulb, Zap, Target, Repeat, Milestone, Flag, TrendingUp, Presentation } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import { experiences, type ExperienceItem } from "@/lib/data/experience";
import { ImpactChart } from "@/components/charts/ImpactChart";

function ActionLoop() {
    return (
        <div className="relative w-40 h-40 mx-auto mb-8 hidden lg:flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.path
                    d="M 50,10 A 40,40 0 1,1 49.9,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/20"
                    strokeDasharray="4 2"
                />
                <motion.path
                    d="M 50,10 A 40,40 0 1,1 49.9,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-primary"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </svg>
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-6">
                <div className="flex flex-col items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-400/60" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-yellow-400/60" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-400/60" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Target className="w-4 h-4 text-green-400/60" />
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Repeat className="w-5 h-5 text-primary/40 animate-spin-slow" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-primary/40 uppercase tracking-widest whitespace-nowrap">
                Iterative Loop
            </div>
        </div>
    );
}

function StrategicRoadmap() {
    return (
        <div className="w-full h-12 relative items-center mb-8 md:mb-12 hidden md:flex">
            <div className="absolute w-full h-px bg-white/10" />
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80%' }}
                className="absolute h-px bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" 
            />
            
            {[
                { label: 'Discovery', pos: '10%' },
                { label: 'Planning', pos: '35%' },
                { label: 'Execution', pos: '60%' },
                { label: 'Growth', pos: '85%' }
            ].map((step, i) => (
                <div key={i} className="absolute flex flex-col items-center" style={{ left: step.pos }}>
                    <div className="w-2 h-2 rounded-full bg-primary mb-2 shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{step.label}</span>
                </div>
            ))}
            
            <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-[15%]"
            >
                <Flag className="w-4 h-4 text-primary" />
            </motion.div>
        </div>
    );
}

function GlobalConnectivityMap() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden grayscale">
            <svg viewBox="0 0 1000 500" className="w-full h-full object-cover">
                {/* Simplified World Map Shape */}
                <path
                    d="M150,150 L200,120 L280,130 L350,180 L400,220 L450,200 L550,180 L650,150 L750,170 L850,250 L800,350 L700,400 L550,420 L400,400 L250,380 L180,300 Z"
                    fill="currentColor"
                />
                <path
                    d="M600,100 L650,80 L720,90 L780,130 L750,180 L650,160 Z"
                    fill="currentColor"
                />
                
                {/* Connecting Lines */}
                {[
                    { from: [300, 200], to: [600, 150] },
                    { from: [300, 200], to: [450, 300] },
                    { from: [600, 150], to: [750, 250] },
                    { from: [450, 300], to: [750, 250] }
                ].map((line, i) => (
                    <motion.path
                        key={i}
                        d={`M ${line.from[0]} ${line.from[1]} Q ${(line.from[0] + line.to[0])/2} ${(line.from[1] + line.to[1])/2 - 50} ${line.to[0]} ${line.to[1]}`}
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    />
                ))}

                {/* Pulsing Dots */}
                {[[300, 200], [600, 150], [450, 300], [750, 250]].map((dot, i) => (
                    <motion.circle
                        key={i}
                        cx={dot[0]}
                        cy={dot[1]}
                        r="4"
                        fill="currentColor"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
                    />
                ))}
            </svg>
        </div>
    );
}

// Logo Component with Fallback
export function Logo({ src, domain, initial, color, className, bgClass = "bg-white" }: { src?: string, domain?: string, initial: string, color: string, className?: string, bgClass?: string }) {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    // Prioritize direct src, then domain (Clearbit), then fallback
    const logoSource = src || (domain ? `https://logo.clearbit.com/${domain}` : null);

    React.useEffect(() => {
        if (imgRef.current?.complete) {
            setLoaded(true);
        }
    }, [logoSource]);

    // Log errors for debugging
    const handleError = () => {
        console.warn(`Failed to load logo: ${logoSource}`);
        setError(true);
    };

    const handleLoad = () => {
        console.log(`Successfully loaded logo: ${logoSource}`);
        setLoaded(true);
    };

    if (!logoSource || error) {
        return (
            <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0",
                color,
                className
            )}>
                {initial}
            </div>
        );
    }

    return (
        <div className={cn("w-12 h-12 rounded-lg p-1 shadow-lg shrink-0 overflow-hidden flex items-center justify-center relative", bgClass, className)}>
            {!loaded && (
                <div className={cn("absolute inset-0 flex items-center justify-center text-white font-bold text-xl", color)}>
                    {initial}
                </div>
            )}
            <Image
                ref={imgRef}
                src={logoSource}
                alt={`${initial} company logo - Professional Experience at ${domain || initial}`}
                width={48}
                height={48}
                className={cn("w-full h-full object-contain transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
                onLoad={handleLoad}
                onError={handleError}
                unoptimized // Sourcing from external URLs and logos dir
            />
        </div>
    );
}

export function Experience() {
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');

    const workExperiences = experiences.filter(exp => exp.type === 'work');
    const educationExperiences = experiences.filter(exp => exp.type === 'education');

    return (
        <section id="experience" className="theme-section bg-background relative overflow-hidden">
            <GlobalConnectivityMap />
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

            <div className="theme-container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-foreground uppercase">
                            Professional <span className="text-primary">Experience</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2">
                            A journey of scaling platforms and financial infrastructure.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={cn(
                                "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]",
                                viewMode === 'timeline' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Timeline
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]",
                                viewMode === 'grid' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Grid
                        </button>
                    </div>
                </div>

                <StrategicRoadmap />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Action Loop Sidebar Sidebar Component */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                             <ActionLoop />
                             <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm mt-8">
                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Strategic Framework</h4>
                                <ul className="space-y-4">
                                    {[
                                        { icon: Milestone, text: "Product Strategy" },
                                        { icon: Target, text: "Business Alignment" },
                                        { icon: TrendingUp, text: "Market Positioning" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <item.icon className="w-4 h-4 text-primary/60" />
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                             </div>
                        </div>
                    </div>

                    {/* Professional Experience Section */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xl font-bold text-foreground mb-10 flex items-center gap-2 border-l-4 border-primary pl-4 uppercase tracking-wider">
                            Career Timeline
                        </h3>
                        <div className={cn(
                            "grid gap-8",
                            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                        )}>
                            {workExperiences.map((exp, index) => (
                                <ExperienceCard key={exp.id} exp={exp} index={index} viewMode={viewMode} />
                            ))}
                        </div>
                    </div>
                </div>

                <div id="education" className="mt-16 md:mt-32">
                    <div className="mb-10 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-foreground uppercase">
                           Academic <span className="text-secondary">Foundation</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2">
                            Educational background and specialized certifications.
                        </p>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-10 flex items-center gap-2 border-l-4 border-secondary pl-4 uppercase tracking-wider">
                        Education & Degrees
                    </h3>
                    <div className={cn(
                        "grid gap-8",
                        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                    )}>
                        {educationExperiences.map((exp, index) => (
                            <ExperienceCard key={exp.id} exp={exp} index={index} viewMode={viewMode} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExperienceCard({ exp, index, viewMode }: { exp: ExperienceItem, index: number, viewMode: 'grid' | 'timeline' }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(viewMode === 'timeline' ? "pl-6 sm:pl-8 border-l border-white/5 relative" : "")}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {viewMode === 'timeline' && (
                <div className={cn(
                    "absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full transition-all duration-300",
                    isExpanded ? "bg-primary shadow-[0_0_15px_rgba(0,243,255,1)] scale-125" : "bg-white/20"
                )} />
            )}

            <Card
                className={cn(
                    "theme-card group transition-all duration-500 overflow-hidden relative cursor-pointer",
                    isExpanded ? "ring-1 ring-primary/40 bg-primary/5 shadow-lg" : "hover:ring-1 hover:ring-primary/20"
                )}
            >
                <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <Logo
                                src={exp.logoUrl}
                                domain={exp.domain}
                                initial={exp.logoInitial}
                                color={exp.logoColor}
                                bgClass={exp.logoBg}
                                className={cn("transition-transform duration-500", isExpanded ? "scale-110" : "")}
                            />

                            <div className="min-w-0">
                                <h3 className={cn("text-lg sm:text-xl font-bold transition-colors duration-300 leading-tight", isExpanded ? "text-primary" : "text-foreground")}>
                                    {exp.role}
                                </h3>
                                <p className="text-secondary font-medium text-sm sm:text-base">{exp.company}</p>
                            </div>
                        </div>

                        {exp.type === 'education' ? (
                            <div className={cn("p-2 rounded-full hidden sm:block transition-colors shrink-0", isExpanded ? "bg-primary/20" : "bg-white/5")}>
                                <GraduationCap className={cn("w-5 h-5 transition-colors", isExpanded ? "text-primary" : "text-muted-foreground")} />
                            </div>
                        ) : (
                            <div className={cn("p-2 rounded-full hidden sm:block transition-colors shrink-0", isExpanded ? "bg-primary/20" : "bg-white/5")}>
                                <Briefcase className={cn("w-5 h-5 transition-colors", isExpanded ? "text-primary" : "text-muted-foreground")} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {exp.location}
                        </span>
                    </div>

                    <p className={cn(
                        "text-sm text-muted-foreground mb-4 leading-relaxed text-left transition-all duration-500",
                        isExpanded ? "" : "line-clamp-2"
                    )}>
                        {exp.description}
                    </p>

                    <AnimatePresence>
                        {(isExpanded && exp.achievements.length > 0) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="overflow-hidden"
                            >
                                <ul className="space-y-3 mt-4 text-sm text-gray-300 border-t border-white/10 pt-4 text-left">
                                    {exp.achievements.map((achievement, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex gap-2 items-start"
                                        >
                                            <span className="text-primary mt-1.5 text-xs">▹</span>
                                            <span 
                                                className="leading-relaxed"
                                                dangerouslySetInnerHTML={{ 
                                                    __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>') 
                                                }}
                                            />
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {exp.achievements.length > 0 && (
                        <div className={cn(
                            "mt-4 flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 min-h-[44px] items-center",
                            isExpanded ? "text-primary" : "text-muted-foreground/50"
                        )}>
                            {isExpanded ? "Collapse" : "Tap to Expand"} <ChevronRight className={cn("w-3 h-3 ml-1 transition-transform", isExpanded ? "rotate-90" : "")} />
                        </div>
                    )}

                    {/* D3.js Impact Visualizations */}
                    <AnimatePresence>
                        {isExpanded && exp.company === "Shiprocket" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mt-6"
                            >
                                <ImpactChart 
                                    title="Status Mismatch Reduction"
                                    unit="%"
                                    data={[
                                        { label: "Before", value: 15, color: "#94a3b8" },
                                        { label: "After", value: 0.5, color: "#f59e0b" }
                                    ]}
                                />
                            </motion.div>
                        )}
                        {isExpanded && exp.company === "Maharashtra Metro Rail" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mt-6"
                            >
                                <ImpactChart 
                                    title="Evaluation Efficiency"
                                    unit="x"
                                    data={[
                                        { label: "Legacy", value: 1, color: "#94a3b8" },
                                        { label: "Standardized", value: 2.5, color: "#8b5cf6" }
                                    ]}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </motion.div>
    );
}
