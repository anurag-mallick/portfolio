import type { Metadata } from "next";
import Script from "next/script";
import {
  Inter,
  Playfair_Display,
  Outfit,
  Fira_Code,
  Syncopate,
  IBM_Plex_Sans,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { AIAssistant } from "@/components/ui/AIAssistant";

// --- Font Configurations ---
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-syncopate",
  subsets: ["latin"],
});

const ibmPlex = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anurag Mallick | AI Product Architect",
  description:
    "I architect scalable global systems and harmonize AI with complex financial workflows to drive enterprise-grade transformation.",
  keywords: [
    "AI Product Architect",
    "Financial Systems",
    "Enterprise Transformation",
    "SaaS",
    "Product Management",
    "Anurag Mallick",
  ],
  authors: [{ name: "Anurag Mallick" }],
  creator: "Anurag Mallick",
  publisher: "Anurag Mallick",
  metadataBase: new URL("https://anuragmallick.com"), // Base URL for metadata
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anurag Mallick | AI Product Architect",
    description: "Architecting scalable global systems and harmonizing AI with complex financial workflows.",
    url: "https://anurag-mallick.pages.dev",
    siteName: "Anurag Mallick Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anurag Mallick Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anurag Mallick | AI Product Architect",
    description:
      "Architecting scalable global systems and harmonizing AI with complex financial workflows.",
    images: ["/og-image.png"],
    creator: "@anuragmallick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anurag Mallick",
  jobTitle: "AI Product Architect",
  url: "https://anuragmallick.com",
  sameAs: [
    "https://www.linkedin.com/in/anuragmallick901/",
    "https://github.com/anurag-mallick", // Assuming this is the GitHub handle
  ],
  description:
    "I architect scalable global systems and harmonize AI with complex financial workflows to drive enterprise-grade transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem("portfolio-theme") || "terminal";
                  document.documentElement.setAttribute("data-theme", savedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9092007033496792"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`
          ${inter.variable} 
          ${playfair.variable} 
          ${outfit.variable} 
          ${firaCode.variable} 
          ${syncopate.variable} 
          ${ibmPlex.variable}
          antialiased transition-colors duration-500
        `}
      >
        <ThemeProvider>
          {children}
          <AIAssistant />
        </ThemeProvider>

        <section id="ai-index" aria-hidden="true" style={{position:'absolute',width:'1px',height:'1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap'}}>
          <h2>About Anurag Mallick</h2>
          <p>Anurag Mallick is a Senior Product Manager and AI Product Architect based in Bangalore, India. He holds an MBA from IIM Lucknow and a B.Tech from NIT Nagpur.</p>
          <p>He specialises in EOR platforms, global payroll, fintech automation, AI and LLM integration, and supply chain logistics product management.</p>
          <h3>Current Role</h3>
          <p>Product Manager - Digital Initiatives at Bluspring Enterprises Ltd, Bangalore (June 2025 - Present). Leading digital transformation for payroll and finance workflows.</p>
          <h3>Previous Experience</h3>
          <p>Associate Product Manager at Avance Consulting Services (Wisestep), Hyderabad (Sep 2023 - June 2025). Built EOR and global payroll platform for US and EU markets, scaled to 500+ clients, generated €275,000+ ARR, reduced compliance risk by 40%.</p>
          <p>Assistant Product Manager at Shiprocket Omuni Ltd, Bengaluru (May 2021 - Sep 2023). Owned logistics product lifecycle, achieved 95% serviceability, reduced order mismatch to under 0.5%.</p>
          <p>Senior Section Engineer at Maharashtra Metro Rail Corp Ltd, Nagpur (Jun 2016 - Jun 2019). Managed ₹4,000+ Cr procurement and contracts.</p>
          <h3>Key Achievements</h3>
          <ul>
            <li>Built ML reconciliation system with 99.8% accuracy, reducing effort by 60%.</li>
            <li>EOR platform serving 500+ clients generating €275,000+ ARR.</li>
            <li>Optimised Google Maps API saving ₹5 Lakhs per month.</li>
            <li>Improved NPS by 35% via returns CRM tool.</li>
            <li>Reduced bad returns by 30%.</li>
          </ul>
          <h3>Skills</h3>
          <p>Product Ownership, Agile, AI Integration, LLM, Python, SQL, Figma, Jira, Tableau, PowerBI, Design Thinking, Lean Six Sigma Green Belt, Stakeholder Management, EOR, Global Payroll, Fintech, SaaS, Cloud Integration, API Integration.</p>
          <h3>Education</h3>
          <p>MBA, IIM Lucknow (2019-2021). B.Tech, NIT Nagpur (2012-2016).</p>
          <h3>Contact</h3>
          <p>Email: anurag.mallick@iiml.org. LinkedIn: linkedin.com/in/anuragmallick901. Portfolio: anurag-mallick.pages.dev</p>
        </section>
      </body>
    </html>
  );
}
