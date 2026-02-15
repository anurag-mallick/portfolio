"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-black/50 py-12 backdrop-blur-md">
            <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-left">
                <div>
                    <h3 className="text-xl font-bold tracking-tighter text-foreground">
                        Anurag Mallick
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Architecting the future of financial infrastructure.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <Link href="/apps/ping-pong" className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/20 transition-all">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        NEON PONG
                    </Link>
                    <Link href="/apps/tetris" className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-bold text-secondary hover:bg-secondary/20 transition-all">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                        </span>
                        NEON TETRIS
                    </Link>
                    <div className="flex gap-6 ml-2">
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/anuragmallick901/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="mailto:anurag.mallick@iiml.org" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Anurag Mallick. All rights reserved.
                </p>
            </div>

            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none -z-10" />
        </footer>
    );
}
