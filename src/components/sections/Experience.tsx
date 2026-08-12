"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Calendar, MapPin, ChevronRight, GraduationCap, Briefcase, BarChart3, Lightbulb, Zap, Target, Repeat, Milestone, Flag, TrendingUp, Presentation, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useCallback } from "react";
import { experiences, type ExperienceItem } from "@/lib/data/experience";
import { ImpactChart } from "@/components/charts/ImpactChart";
import { Reveal } from "@/components/ui/Reveal";

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
            <div className="absolute w-full h-px bg-border" />
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

// Logo Component with Fallback - Optimized Version
export function Logo({ src, domain, initial, color, className, bgClass = "bg-white" }: { src?: string, domain?: string, initial: string, color: string, className?: string, bgClass?: string }) {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const retryCountRef = React.useRef(0);

    // Prioritize direct src, then domain (Clearbit), then fallback
    const logoSource = src || (domain ? `https://logo.clearbit.com/${domain}` : null);

    // Cache for external logos to prevent repeated requests
    const getCachedLogo = useCallback((url: string): string | null => {
        if (!url.startsWith('http')) return url; // Local file

        try {
            const cached = localStorage.getItem(`logo_cache_${url}`);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (e) {
            // Ignore cache errors
        }
        return null;
    }, []);

    const cacheLogo = useCallback((url: string, data: string) => {
        if (!url.startsWith('http')) return;
        try {
            localStorage.setItem(`logo_cache_${url}`, JSON.stringify(data));
        } catch (e) {
            // Ignore cache errors
        }
    }, []);

    React.useEffect(() => {
        if (!logoSource) return;

        // Check cache first for external logos
        const cached = getCachedLogo(logoSource);
        if (cached) {
            if (imgRef.current) {
                imgRef.current.src = cached;
            }
            return;
        }

        // Reset state
        setLoaded(false);
        setError(false);
        setLoading(true);
        retryCountRef.current = 0;

        const handleImgLoad = () => {
            setLoaded(true);
            setLoading(false);
            if (logoSource.startsWith('http')) {
                cacheLogo(logoSource, logoSource);
            }
        };

        const handleImgError = () => {
            // Retry logic for external logos
            if (logoSource.startsWith('http') && retryCountRef.current < 2) {
                retryCountRef.current++;
                setTimeout(() => {
                    if (imgRef.current) {
                        imgRef.current.src = logoSource;
                    }
                }, 500 * retryCountRef.current); // Exponential backoff
            } else {
                setError(true);
                setLoading(false);
            }
        };

        if (imgRef.current) {
            imgRef.current.onload = handleImgLoad;
            imgRef.current.onerror = handleImgError;
        }

        return () => {
            if (imgRef.current) {
                imgRef.current.onload = null;
                imgRef.current.onerror = null;
            }
        };
    }, [logoSource, getCachedLogo, cacheLogo]);

    // Timeout for external requests
    React.useEffect(() => {
        if (!logoSource || !logoSource.startsWith('http')) return;

        const timeoutId = setTimeout(() => {
            if (!loaded && !error) {
                setError(true);
                setLoading(false);
            }
        }, 5000); // 5 second timeout

        return () => clearTimeout(timeoutId);
    }, [logoSource, loaded, error]);

    if (!logoSource) {
        return (
            <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0",
                color,
                className
            )} aria-label={`${initial} company logo`}>
                {initial}
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0",
                color,
                className
            )} aria-label={`${initial} company logo`}>
                {initial}
            </div>
        );
    }

    return (
        <div className={cn("w-12 h-12 rounded-lg p-1 shadow-lg shrink-0 overflow-hidden flex items-center justify-center relative", bgClass, className)}>
            {(!loaded && loading) || (!loaded && !error) ? (
                <div className={cn("absolute inset-0 flex items-center justify-center text-white font-bold text-xl", color)}>
                    {initial}
                </div>
            ) : null}
            <Image
                ref={imgRef}
                src={logoSource}
                alt={`${initial} company logo - Professional Experience at ${domain || initial}`}
                width={48}
                height={48}
                className={cn("w-full h-full object-contain transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
                priority={domain ? false : true} // Prioritize local logos
                // Note: onLoad/onError handled via useEffect above
                // unoptimized is needed for external domains
                unoptimized={logoSource.startsWith('http')}
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
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-16 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-foreground uppercase">
                            Professional <span className="text-primary">Experience</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2">
                            A journey of scaling platforms and financial infrastructure.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-muted/50 rounded-full p-1 border border-border backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={cn(
                                "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]",
                                viewMode === 'timeline' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Timeline
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]",
                                viewMode === 'grid' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-muted-foreground hover:text-foreground"
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

    // Define industry colors for the vertical accent bar
    const getIndustryColor = (company: string) => {
        if (company.includes('Payroll') || company.includes('EOR') || company.includes('Avance') || company.includes('Wisestep')) {
            return 'border-cyan-500';
        } else if (company.includes('Shiprocket')) {
            return 'border-amber-500';
        } else if (company.includes('Maharashtra')) {
            return 'border-amber-500';
        } else {
            return 'border-purple-500';
        }
    };

    const industryColor = getIndustryColor(exp.company);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
                "flex group cursor-pointer",
                viewMode === 'timeline' ? "pl-6 border-l-4 border-primary/20" : ""
            )}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ touchAction: "manipulation" }}
        >
            {/* Colored vertical accent bar */}
            <div className={cn("w-1", exp.type === 'work' ? industryColor : 'border-purple-500', "absolute left-0 top-0 bottom-0 rounded-r")} />

            <Card
                className={cn(
                    "theme-card w-full transition-all duration-300 overflow-hidden relative hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_4px_20px_rgba(var(--primary-rgb),0.15)]",
                    isExpanded ? "ring-1 ring-primary/40 bg-primary/5 shadow-lg" : "hover:ring-1 hover:ring-primary/20"
                )}
            >
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">
                        {/* Left side - Company logo and accent bar */}
                        <div className="flex flex-col items-center sm:items-start sm:w-16 sm:mr-4 mb-4 sm:mb-0">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl bg-primary mb-2">
                                {exp.logoInitial}
                            </div>
                            <div className={cn("w-1 h-full rounded-full", industryColor.replace('border-', 'bg-'))} />
                        </div>

                        {/* Right side - Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                                        {exp.role}
                                    </h3>
                                    <p className="text-secondary font-medium text-sm sm:text-base mb-2">
                                        {exp.company}
                                    </p>
                                </div>
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
                                "text-sm text-muted-foreground mb-4 leading-relaxed",
                                isExpanded ? "" : "line-clamp-2"
                            )}>
                                {exp.description}
                            </p>

                            <div className="mt-4">
                                <ul className="space-y-2">
                                    {exp.achievements.slice(0, 3).map((achievement, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-primary mt-1 mr-2 text-xs">▹</span>
                                            <span
                                                className="text-sm text-muted-foreground leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-bold">$1</strong>')
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {exp.achievements.map((achievement, i) => {
                                        // Extract skills from achievements (simplified - in a real implementation you'd parse this properly)
                                        const skills = ["Agile", "Jira", "SQL", "Figma", "Product Management"];
                                        return (
                                            <span key={i} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                                                {skills[i % skills.length]}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
