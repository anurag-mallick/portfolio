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
        logoColor: "bg-blue-600",
        logoInitial: "B",
        logoUrl: "https://www.bluspring.com/wp-content/uploads/2025/11/bluspring-logo-white.svg",
        logoBg: "bg-[#002f5d]", // Official dark blue background
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
        logoColor: "bg-orange-600",
        logoInitial: "W",
        logoUrl: "https://wisestep.com/wp-content/themes/wisestep/images/logo.png",
        logoBg: "bg-[#f8f9fa]",
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
        logoColor: "bg-[#7143e1]", // Shiprocket Purple
        logoInitial: "S",
        logoUrl: "https://www.shiprocket.in/wp-content/uploads/2021/04/shiprocket_dark.png",
        logoBg: "bg-white",
        achievements: [
            "Co-developed end-to-end integration of logistics aggregator Shiprocket & LMS, increasing logistics partners from 4 to 17+ and reducing serviceability issues by 95%.",
            "Developed same-day/next-day delivery features, increasing delivery TAT accuracy from 77% to >90%.",
            "Reduced order status mismatches between systems from 15% to <0.5%, and created a custom logistics flow for Bestseller with centralized inventory.",
            "Developed unboxing video capture feature for return orders, reducing bad returns by 30% and enabling claims within 24hrs.",
            "Revised sourcing logic post-checkout, increasing sales volume by 5% for fashion and 10% for electronics brands.",
            "Implemented hyperlocal delivery capabilities, resulting in an 83% reduction in Google Maps API costs."
        ],
        type: "work"
    },
    {
        id: "3m",
        role: "Summer Intern",
        company: "3M India Limited",
        period: "May 2020 – June 2020",
        location: "Bengaluru",
        description: "Consumer behavior analysis and data visualization for Healthcare Group.",
        logoColor: "bg-red-600",
        logoInitial: "3M",
        logoUrl: "https://multimedia.3m.com/mws/media/1053702O/3m-logo-red-png.png",
        logoBg: "bg-white",
        achievements: [
            "Applied design thinking to analyze consumer needs, forecasting 40% additional sales from recommended feature augmentations.",
            "Devised social media marketing and GTM lead generation strategies with a forecasted revenue of ₹8.06 Cr.",
            "Created a nationwide dashboard to track leads and spare parts inventory lack/excess.",
            "Built interactive Excel dashboards for managers to track and visualize employee KPIs, increasing overall productivity."
        ],
        type: "work"
    },
    {
        id: "mba",
        role: "MBA",
        company: "IIM, Lucknow",
        period: "2019 - 2021",
        location: "Lucknow",
        description: "Master of Business Administration (73.2%).",
        logoColor: "bg-[#0b5d1e]",
        logoInitial: "IIM",
        logoUrl: "https://www.iiml.ac.in/themes/awesome_zymphonies_theme/images/foot-logo.png",
        logoBg: "bg-white",
        achievements: [
            "Live Project (Artpillz): Developed predictive pricing model, reducing costs by 20% for a B2B media start-up.",
            "Advanced Market Research: Applied design thinking to suggest 5+ product design changes based on user pain points.",
            "K-means Clustering: Segmented Instagram user base and designed targeting strategies using marketing engineering software."
        ],
        type: "education"
    },
    {
        id: "metro",
        role: "Senior Section Engineer",
        company: "Maharashtra Metro Rail Corp. Ltd.",
        period: "Jun 2016 – Jun 2019",
        location: "Nagpur",
        description: "Managed ₹4,000+ Cr procurement and contracts.",
        logoColor: "bg-[#df2020]",
        logoInitial: "M",
        logoUrl: "https://www.mahametro.org/images/logo.svg",
        logoBg: "bg-white",
        achievements: [
            "Spearheaded 20+ Pre-bid meetings with 50+ experts, reducing pre-bid queries by 30% and saving ₹3.5+ Cr through contract optimization.",
            "Drafted 40+ tender documents amounting to ₹4,000+ Cr and reduced bid evaluation time by 50% (60 to 30 days).",
            "Implemented Government e-Marketplace (GeM), digitizing Purchase Order creation and saving ₹7 lakhs in procurement costs.",
            "Standardized Monthly Status Reporting protocols for the Prime Minister's Office and revamped billing, saving 15 days in processing time."
        ],
        type: "work"
    },
    {
        id: "nit",
        role: "B.Tech",
        company: "NIT, Nagpur",
        period: "2012 - 2016",
        location: "Nagpur",
        description: "Bachelor of Technology (7.52/10).",
        logoColor: "bg-[#8b0000]",
        logoInitial: "NIT",
        domain: "vnit.ac.in",
        logoBg: "bg-white",
        achievements: [],
        type: "education"
    },
    {
        id: "academic-projects",
        role: "Academic Projects",
        company: "IIM Lucknow",
        period: "2019 - 2021",
        location: "Lucknow",
        description: "Key projects in Market Research, Predictive Modeling, and Operations Management.",
        logoColor: "bg-indigo-600",
        logoInitial: "AP",
        logoBg: "bg-white",
        achievements: [
            "Predictive Pricing Model: Analyzed 90+ music studios to reduce costs by 20% for a B2B media start-up.",
            "Advanced Market Research: Suggested 5+ product design changes based on user pain points identified via primary research.",
            "Instagram Segmentation: Applied K-means clustering in SPSS to design 3+ targeting strategies.",
            "Service & Ops Management: Performed DEA analysis for 6 terminals to optimize investment and labor inputs."
        ],
        type: "education"
    },
    {
        id: "awards",
        role: "Awards & Recognition",
        company: "Professional Career",
        period: "2016 - 2023",
        location: "National",
        description: "Recognition for excellence in procurement, digital transformation, and professional development.",
        logoColor: "bg-yellow-500",
        logoInitial: "🏆",
        logoBg: "bg-white",
        achievements: [
            "Group Award: Finalizing 62 Tenders worth ₹2,234 Cr in 9 months (Metro Rail).",
            "Outstanding Performance: Successful implementation of Government e-Marketplace (GeM).",
            "MD's Award: Integration of E-tender portal with 5D-BIM (Maharashtra Metro).",
            "Lean Six Sigma Green Belt (Henry Harvin Education).",
            "Advanced Google Analytics & Digital Marketing (Google Academy/Unlocked)."
        ],
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
