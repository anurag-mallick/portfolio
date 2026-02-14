"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Connect", href: "#contact" },
];

export function Navbar() {
    const [activeTab, setActiveTab] = React.useState("");
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-300 pointer-events-none",
                isScrolled ? "pt-4" : "pt-6"
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div
                className={cn(
                    "flex items-center gap-1 rounded-full border border-transparent px-2 py-2 transition-all duration-300 pointer-events-auto",
                    isScrolled
                        ? "glass border-white/10 bg-black/50 shadow-lg backdrop-blur-md"
                        : ""
                )}
            >
                <Link
                    href="#"
                    className="px-4 py-2 font-bold text-lg tracking-tighter text-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                    ANURAG MALLICK
                </Link>

                <div className="h-6 w-px bg-white/10 mx-2" />

                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                                activeTab === item.name ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {activeTab === item.name && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden flex items-center ml-2">
                    <span className="text-xs text-muted-foreground px-2">Menu</span>
                </div>
            </div>
        </motion.nav>
    );
}
