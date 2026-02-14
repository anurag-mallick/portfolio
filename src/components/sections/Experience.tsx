"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Calendar, MapPin, ChevronRight, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Logo Component with Fallback
function Logo({ src, domain, initial, color, className, bgClass = "bg-white" }: { src?: string, domain?: string, initial: string, color: string, className?: string, bgClass?: string }) {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Prioritize direct src, then domain (Clearbit), then fallback
    const logoSource = src || (domain ? `https://logo.clearbit.com/${domain}` : null);

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
            <img
                src={logoSource}
                alt={`${initial} Logo`}
                className={cn("w-full h-full object-contain transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </div>
    );
}

const experiences = [
    {
        id: "bluspring",
        role: "Product Manager - Digital Initiatives",
        company: "Bluspring Enterprises Ltd.",
        period: "June 2025 – Present",
        location: "Bangalore",
        description: "Leading digital transformation for payroll and finance workflows.",
        logoColor: "bg-blue-500",
        logoInitial: "B",
        logoUrl: "https://www.bluspring.com/wp-content/uploads/2025/11/bluspring-logo-white.svg",
        logoBg: "bg-blue-900", // Dark background for white logo
        achievements: [
            "Initiated rollout of an in-house India payroll system, enabling accurate and compliant payroll processing for 85,000+ associates across five business units.",
            "Integrated Salesforce CRM and internal systems to streamline employee onboarding, automate user management, and ensure data integrity across Sales & Finance workflows.",
            "Collaborated with HR, Finance, and IT teams to map and standardize end-to-end payroll workflows (earnings, deductions, statutory components, approvals), creating a scalable and compliance-ready foundation.",
            "Developed and deployed initial payroll and finance analytics dashboards, providing real-time visibility into payroll costs, variances, and operational metrics to support data-driven decision-making."
        ],
        type: "work"
    },
    {
        id: "avance",
        role: "Associate Product Manager",
        company: "Avance Consulting Services (Wisestep)",
        period: "Sep 2023 – June 2025",
        location: "Hyderabad",
        description: "Built EOR/Global Payroll platforms and AI-driven workflows.",
        logoColor: "bg-orange-500",
        logoInitial: "W",
        logoUrl: "https://avanceservices.com/wp-content/uploads/2023/01/Group-4.svg",
        achievements: [
            "Built a no-code Employer of Record (EOR) and global payroll platform supporting US and EU markets, achieving €275,000+ ARR in 6 months. Reduced compliance risk by 40%, cut onboarding time by 30%, and scaled to 500+ clients.",
            "Led development of B2B/B2C payroll platforms, reducing payroll processing time by 40% through automation and improving payroll accuracy to 99.5%+. Partnered with Engineering, Design, Sales, and Customer Success to own roadmap and delivery.",
            "Led US payroll integration with Paychex, reducing payroll processing time by 50% while ensuring compliance, correctness, and seamless payroll execution for global customers.",
            "Built ML-assisted payroll and financial reconciliation workflows, reducing manual effort by 60%, achieving 99.8% accuracy, and saving 15+ hours per week for Ops and Finance teams.",
            "Implemented n8n automation solution with AI agents for scheduling, emails, and payments reducing manual tasks by 70%.",
            "Integrated ChatGPT with ATS, cutting recruiter workload by 30% and improving candidate assessment efficiency by 25%. Leveraged NLP to enhance search functionality.",
            "Conducted 50+ user interviews, identifying pain points that boosted user satisfaction scores by 25%. Implemented A/B testing to optimize UI/UX.",
            "Identified new market opportunities, expanding the platform’s user base by 15% in 6 months. Conducted competitive benchmarking to refine product strategy."
        ],
        type: "work"
    },
    {
        id: "shiprocket",
        role: "Assistant Product Manager",
        company: "Shiprocket Omuni Ltd.",
        period: "May 2021 – Sep 2023",
        location: "Bengaluru",
        description: "Owned logistics solutions, scaling partners and revenue.",
        logoColor: "bg-purple-600",
        logoInitial: "S",
        logoUrl: "https://omuni.com/wp-content/uploads/2024/03/shiprocket_logo-1.svg",
        achievements: [
            "Owned product lifecycle for logistics solutions, achieving 95% serviceability improvement and 80% fewer customer cancellations in 12 months. Used data analytics to prioritize features.",
            "Expanded logistics partners from 4 to 17+ in 6 months, driving 15% revenue growth and 200% service coverage. Implemented API integrations for real-time tracking.",
            "Reduced order mismatches from 20% to <0.5%, saving ₹1.5+ Crores annually. Built a dashboard to monitor KPIs like delivery accuracy and SLA compliance.",
            "Implemented advanced analytics to track KPIs, cutting operational costs by 10% and improving efficiency by 20%. Conducted root-cause analysis to resolve bottlenecks."
        ],
        type: "work"
    },
    {
        id: "mba",
        role: "MBA",
        company: "IIM, Lucknow",
        period: "2019 - 2021",
        location: "Lucknow",
        description: "Master of Business Administration.",
        logoColor: "bg-green-700",
        logoInitial: "IIM",
        logoUrl: "https://www.iiml.ac.in/themes/awesome_zymphonies_theme/images/foot-logo.png",
        logoBg: "bg-white",
        achievements: [],
        type: "education"
    },
    {
        id: "metro",
        role: "Senior Section Engineer",
        company: "Maharashtra Metro Rail Corp. Ltd.",
        period: "Jun 2016 – Jun 2019",
        location: "Nagpur",
        description: "Managed ₹4,000+ Cr procurement and contracts.",
        logoColor: "bg-orange-600",
        logoInitial: "M",
        logoUrl: "https://www.mahametro.org/images/logo.svg",
        achievements: [
            "Led ₹4,000+ Crores metro rail procurement, managing 30+ stakeholders and 40+ tender documents. Used Agile methodologies to track progress.",
            "Saved ₹3.5+ Crores via contract optimization and halved bid time (60 days → 30 days). Conducted risk assessments to mitigate delays.",
            "Implemented GeM portal, saving ₹7 lakhs in office supplies and improving compliance by 30%. Automated workflows using Python scripts.",
            "Streamlined billing processes, reducing payment processing time by 20%. Developed a vendor management system to track KPIs.",
            "Managed a team of 5+ procurement specialists, achieving 95% on-time delivery. Conducted training on contract negotiation and risk management."
        ],
        type: "work"
    },
    {
        id: "nit",
        role: "B.Tech",
        company: "NIT, Nagpur",
        period: "2012 - 2016",
        location: "Nagpur",
        description: "Bachelor of Technology.",
        logoColor: "bg-red-700",
        logoInitial: "NIT",
        // Skipping 3M URL as it seems incorrect for NIT. Using fallback or previous domain logic if any.
        domain: "vnit.ac.in",
        achievements: [],
        type: "education"
    }
];

export function Experience() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');

    return (
        <section id="experience" className="py-24 bg-black relative">
            <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                            Experience <span className="text-primary">& Education</span>
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            A journey of scaling platforms and financial infrastructure.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                viewMode === 'timeline' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Timeline
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                viewMode === 'grid' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Grid
                        </button>
                    </div>
                </div>

                <div className={cn(
                    "grid gap-8",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(viewMode === 'timeline' ? "md:pl-8 md:border-l border-primary/20 relative" : "")}
                        >
                            {viewMode === 'timeline' && (
                                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,243,255,0.8)] hidden md:block" />
                            )}

                            <Card
                                className={cn(
                                    "cursor-pointer group hover:bg-white/5 transition-all duration-300 overflow-hidden",
                                    activeId === exp.id ? "ring-1 ring-primary/50 bg-white/5" : ""
                                )}
                                onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-start gap-4">
                                            {/* Logo / Initials Placeholder */}
                                            <Logo
                                                src={exp.logoUrl}
                                                domain={exp.domain}
                                                initial={exp.logoInitial}
                                                color={exp.logoColor}
                                                bgClass={exp.logoBg}
                                            />

                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-secondary font-medium">{exp.company}</p>
                                            </div>
                                        </div>

                                        {exp.type === 'education' ? (
                                            <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
                                                <GraduationCap className="w-5 h-5 text-primary" />
                                            </div>
                                        ) : (
                                            <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
                                                <Briefcase className="w-5 h-5 text-primary" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {exp.period}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {exp.location}
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                                        {exp.description}
                                    </p>

                                    <AnimatePresence>
                                        {activeId === exp.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="space-y-3 mt-4 text-sm text-gray-300 border-t border-white/10 pt-4">
                                                    {exp.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex gap-2 items-start">
                                                            <span className="text-primary mt-1.5 text-xs">▹</span>
                                                            <span className="leading-relaxed">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="mt-4 flex items-center text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                        {activeId === exp.id ? "Show Less" : "View Details"} <ChevronRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
