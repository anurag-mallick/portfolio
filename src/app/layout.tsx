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
  title: "Anurag Mallick | AI Product Manager",
  description:
    "I architect scalable global systems and harmonize AI with complex financial workflows to drive enterprise-grade transformation.",
  metadataBase: new URL("https://anurag-mallick.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anurag Mallick | AI Product Manager",
    description: "Architecting scalable systems and harmonizing AI with complex financial workflows.",
    url: "https://anurag-mallick.pages.dev",
    siteName: "Anurag Mallick Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anurag Mallick | AI Product Manager",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anurag Mallick | AI Product Manager",
    description: "Architecting scalable systems and harmonizing AI with complex financial workflows.",
    images: ["/og-image.png"],
  },
};

import { AppleGlassLayout } from "@/components/layout/AppleGlassLayout";

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
                  const savedTheme = localStorage.getItem("portfolio-theme") || "futuristic";
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
          <AppleGlassLayout>
            {children}
            <AIAssistant />
          </AppleGlassLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
