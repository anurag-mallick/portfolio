export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    logoColor: string;
    logoInitial: string;
    logoUrl?: string;
    logoBg?: string;
    domain?: string;
    achievements: string[];
    type: 'work' | 'education';
}

export const experiences: ExperienceItem[] = [
    {
        id: "bluspring",
        role: "Product Manager - Digital Initiatives",
        company: "Bluspring Enterprises Ltd.",
        period: "June 2025 – Present",
        location: "Bangalore",
        description: "Leading digital transformation for payroll and finance workflows.",
        logoColor: "bg-blue-600",
        logoInitial: "B",
        logoUrl: "/logos/bluspring-logo-white.svg",
        logoBg: "bg-[#002f5d]", // Official dark blue background
        achievements: [
            "**Automated 85,000+ associate payrolls** by leading the rollout of a compliant in-house system, ensuring accurate processing across 5 business units.",
            "**Streamlined employee onboarding** by integrating Salesforce CRM with internal systems, automating user management and ensuring cross-functional data integrity.",
            "**Standardized nationwide payroll workflows** in collaboration with HR/Finance/IT, creating a scalable foundation for earnings, deductions, and statutory approvals.",
            "**Launched real-time analytics dashboards** for payroll and finance, enabling data-driven visibility into costs, variances, and operational metrics."
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
        logoUrl: "/logos/avance.jpg",
        logoBg: "bg-white",
        achievements: [
            "**Generated €275,000+ ARR in 6 months** by architecting a no-code EOR and global payroll platform, scaling to 500+ clients and reducing compliance risk by 40%.",
            "**Reduced payroll processing time by 40%** and improved accuracy to 99.5%+ through automated B2B/B2C platforms and strategic roadmap leadership.",
            "**Cut US payroll processing time by 50%** by leading a high-impact integration with Paychex while ensuring strict cross-border compliance.",
            "**Saved 15+ hours/week for Ops & Finance** through ML-assisted reconciliation workflows, reducing manual effort by 60% with 99.8% accuracy.",
            "**Eliminated 70% of manual scheduling and payment tasks** via custom n8n automation and AI agent deployment.",
            "**Boosted recruiter efficiency by 30%** by integrating ChatGPT with ATS for intelligent candidate assessment and NLP-enhanced search.",
            "**Increased user satisfaction scores by 25%** through 50+ user interviews and iterative A/B testing on core UI/UX flows.",
            "**Expanded global user base by 15%** in 6 months by identifying new market opportunities and performing rigorous competitive benchmarking."
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
        logoUrl: "/logos/shiprocket.png",
        logoBg: "bg-white",
        achievements: [
            "**Increased logistics partners by 325%** (4 to 17+) and reduced serviceability issues by 95% via end-to-end integration of Shiprocket & LMS.",
            "**Boosted delivery TAT accuracy to >90%** from 77% by developing same-day and next-day delivery intelligence features.",
            "**Achieved <0.5% order mismatch rate** (down from 15%) by revamping cross-system synchronization and inventory flows.",
            "**Reduced bad returns by 30%** via an innovative unboxing video capture feature, enabling claims processing within 24 hours.",
            "**Increased sales volume by 10%** for electronics and 5% for fashion brands by re-engineering post-checkout sourcing logic.",
            "**Cut Google Maps API costs by 83%** through optimized hyperlocal delivery and address normalization capabilities."
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
        logoUrl: "/logos/3m.jpg",
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
        logoUrl: "/logos/iiml.png",
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
        logoUrl: "/logos/mahametro-logo.svg",
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
        logoUrl: "/logos/nit.jpg",
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
        role: "Awards & Certifications",
        company: "Professional Career",
        period: "2016 - 2026",
        location: "National",
        description: "Recognition for excellence in procurement, digital transformation, and continuous professional development through industry certifications.",
        logoColor: "bg-yellow-500",
        logoInitial: "🏆",
        logoBg: "bg-white",
        achievements: [
            "🏅 Group Award: Finalizing 62 Tenders worth ₹2,234 Cr in 9 months (Metro Rail).",
            "⭐ Outstanding Performance: Successful implementation of Government e-Marketplace (GeM).",
            "🏆 MD's Award: Integration of E-tender portal with 5D-BIM (Maharashtra Metro).",
            "📜 Agile Project Management and Tools for Product Managers (Skillsoft, Jan 2026).",
            "📜 Technical Product Management: Leadership & Stakeholder Management (Skillsoft, Dec 2025).",
            "📜 Lean Six Sigma Green Belt (Henry Harvin Education).",
            "📜 Advanced Google Analytics & Digital Marketing (Google Academy).",
            "📜 Design Thinking Certificate (Atyaasaa Online, Mar 2023)."
        ],
        type: "education"
    }
];
