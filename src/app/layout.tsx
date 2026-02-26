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
      </body>
    </html>
  );
}
