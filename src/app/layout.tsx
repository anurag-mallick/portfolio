import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Outfit,
  Fira_Code,
  Syncopate,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

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

export const metadata: Metadata = {
  title: "Anurag Mallick | AI Product Architect",
  description:
    "Building Payroll Systems at Scale & Integrating AI into Financial Workflows",
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
      </head>
      <body
        className={`
          ${inter.variable} 
          ${playfair.variable} 
          ${outfit.variable} 
          ${firaCode.variable} 
          ${syncopate.variable} 
          antialiased transition-colors duration-500
        `}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
