"use client";

import { motion } from "framer-motion";
import { Award, Code2, Globe2, ShieldCheck, Zap } from "lucide-react";

const coreCompetencies = [
    "Product Ownership", "Program Management", "Agile", "User Experience (UX)",
    "Requirement Gathering", "User Research", "Data Analytics", "Process Improvement",
    "Stakeholder Alignment", "Leadership", "Data Visualization", "Design Thinking",
    "Product Roadmapping", "SaaS Solutions", "Cloud Integration", "API Integration"
];

const technicalSkills = [
    "Jira", "Figma", "SQL", "Tableau", "PowerBI", "SPSS", "QlikSense", "Balsamiq"
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
                    {/* Core Competencies */}
                    <div className="lg:col-span-12">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-[#050505] border border-white/10 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
                                    <Globe2 className="text-primary w-5 h-5" /> CORE COMPETENCIES
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {coreCompetencies.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.02 }}
                                            className="relative p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group/card"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/card:bg-primary transition-colors" />
                                                <span className="text-sm font-medium text-gray-400 group-hover/card:text-white transition-colors">
                                                    {skill}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Tools */}
                    <div className="lg:col-span-7">
                        <div className="relative group h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-2xl blur opacity-20"></div>
                            <div className="relative bg-[#050505] border border-white/10 p-8 rounded-2xl h-full">
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
                                    <Code2 className="text-primary w-5 h-5" /> TECHNICAL SKILLS & TOOLS
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {technicalSkills.map((tool, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 text-primary text-sm font-medium hover:bg-primary hover:text-black transition-all cursor-default"
                                        >
                                            {tool}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="lg:col-span-5">
                        <div className="relative group h-full">
                            <div className="relative bg-[#050505] border border-white/10 p-8 rounded-2xl h-full overflow-hidden">
                                <div className="absolute -top-6 -right-6 opacity-5 rotate-12">
                                    <Award className="w-32 h-32 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
                                    <ShieldCheck className="text-primary w-5 h-5" /> CERTIFICATIONS
                                </h3>
                                <div className="space-y-4">
                                    {certifications.map((cert, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex flex-col space-y-1"
                                        >
                                            <span className="text-gray-300 text-sm font-medium">{cert}</span>
                                            <span className="text-[10px] font-mono text-primary/40 uppercase tracking-tighter">verified_credential_secured</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 flex items-center justify-center pt-8 border-t border-white/5"
                >
                    <div className="bg-primary/5 px-6 py-3 rounded-full border border-primary/10 backdrop-blur-sm">
                        <p className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] text-center">
                            Full Stack Product Management • Scalable Architecture • Financial Compliance • AI Integration
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
