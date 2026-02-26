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
        logoUrl: "/logos/avance.jpg",
        logoBg: "bg-white",
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
        logoUrl: "/logos/shiprocket.png",
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
