"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Award, Code2, Globe2, ShieldCheck, Zap } from "lucide-react";

const coreCompetencies = [
    "Product Ownership", "Program Management", "Agile", "User Experience (UX)",
    "Requirement Gathering", "User Research", "Data Analytics", "Process Improvement",
    "Stakeholder Alignment", "Leadership", "Data Visualization", "Design Thinking",
    "Product Roadmapping", "SaaS Solutions", "Cloud Integration", "API Integration"
];

const technicalSkills = [
    { name: "Jira", level: 95 },
    { name: "Figma", level: 85 },
    { name: "SQL", level: 90 },
    { name: "Tableau", level: 88 },
    { name: "PowerBI", level: 85 },
    { name: "SPSS", level: 80 },
    { name: "QlikSense", level: 75 },
    { name: "Balsamiq", level: 90 }
];

const certifications = [
    "Lean Six Sigma Green Belt",
    "Advanced Google Analytics",
    "Design Thinking (Atyaasaa)"
];

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4"
                    >
                        <Zap className="w-3 h-3" /> SYSTEM_CAPABILITIES_v2.0
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                        Expertise & <span className="text-primary">Artifacts</span>
                    </h2>
                    <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
                        A specialized toolkit for scaling global financial platforms and driving product innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Core Competencies */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-[#050505] border border-white/10 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Globe2 className="text-primary w-5 h-5" /> Core Competencies
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {coreCompetencies.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-2 group/item"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                                            <span className="text-sm text-gray-400 group-hover/item:text-white transition-colors">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Certifications Card */}
                        <div className="relative group">
                            <div className="relative bg-[#050505] border border-white/10 p-8 rounded-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Award className="w-24 h-24 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <ShieldCheck className="text-primary w-5 h-5" /> Certifications
                                </h3>
                                <div className="space-y-4">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                                            <span className="text-gray-300 text-sm">{cert}</span>
                                            <span className="text-[10px] font-mono text-primary/60 uppercase">VERIFIED_AUTH</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Technical Tools */}
                    <div className="lg:col-span-5">
                        <div className="relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-purple-500/20 rounded-2xl blur opacity-20 transition duration-1000"></div>
                            <div className="relative bg-[#050505] border border-white/10 p-8 rounded-2xl h-full">
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                    <Code2 className="text-primary w-5 h-5" /> Technical Stack
                                </h3>
                                <div className="space-y-8">
                                    {technicalSkills.map((skill, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">{skill.name}</span>
                                                <span className="text-primary/60 font-mono text-xs">{skill.level}%</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-4 rounded-lg bg-primary/5 border border-primary/10">
                                    <p className="text-[10px] font-mono text-primary/70 leading-relaxed uppercase tracking-wider">
                                        Data-driven product management workflow enabled.
                                        Systems optimized for accuracy and scale.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
