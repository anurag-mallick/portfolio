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

                <div className="flex gap-6">
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

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Anurag Mallick. All rights reserved.
                </p>
            </div>

            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none -z-10" />
        </footer>
    );
}
