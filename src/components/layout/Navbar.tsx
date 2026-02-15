"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
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
                        "theme-container flex items-center justify-between rounded-full border transition-all duration-300 pointer-events-auto w-full",
                        isScrolled || isMobileMenuOpen
                            ? "glass border-border shadow-lg"
                            : "border-transparent"
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

                    <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

                    <div className="flex items-center gap-2">
                        <ThemeSwitcher />

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden flex items-center p-2 text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => {
                                            setActiveTab(item.name);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "text-3xl font-bold tracking-tighter transition-colors",
                                            activeTab === item.name ? "text-primary" : "text-white/60 hover:text-primary"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
