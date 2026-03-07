"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative border-t border-border bg-background py-8 sm:py-12 backdrop-blur-md overflow-hidden">
            <div className="theme-container flex flex-col items-center gap-6 px-4 text-center">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tighter text-foreground">
                        Anurag Mallick
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70 mt-1 uppercase tracking-wider font-medium">
                        Leading the future of AI-driven product innovation.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/anuragmallick901/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                        href="mailto:anurag.mallick@iiml.org"
                        className="text-muted-foreground hover:text-primary transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Email"
                    >
                        <Mail className="h-5 w-5" />
                    </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Anurag Mallick. All rights reserved.
                </p>
            </div>

            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none -z-10" />
        </footer>
    );
}
