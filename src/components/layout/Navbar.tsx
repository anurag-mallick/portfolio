"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
    { name: "Experience", href: "/#experience" },
    { name: "Education", href: "/#education" },
    { name: "Projects", href: "/#projects" },
    { name: "Deployed", href: "/#deployed-systems" },
    { name: "Skills", href: "/#skills" },
    { name: "Apps", href: "/#apps" },
    { name: "Articles", href: "/#articles" },
    { name: "Connect", href: "/#contact" },
];

export function Navbar() {
    const [activeTab, setActiveTab] = React.useState("");
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const scrollYRef = React.useRef(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        if (isMobileMenuOpen) {
            scrollYRef.current = window.scrollY;
            document.body.classList.add("scroll-locked");
            document.body.style.top = `-${scrollYRef.current}px`;
        } else {
            document.body.classList.remove("scroll-locked");
            document.body.style.top = "";
            window.scrollTo(0, scrollYRef.current);
        }

        return () => {
            document.body.classList.remove("scroll-locked");
            document.body.style.top = "";
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 transition-all duration-300 pointer-events-none px-2 sm:px-4",
                    isScrolled ? "pt-2 sm:pt-4" : "pt-4 sm:pt-6"
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
                        className="flex items-center justify-center min-h-[44px] px-3 sm:px-4 py-2 font-bold text-base sm:text-lg tracking-tighter text-foreground hover:text-primary transition-colors whitespace-nowrap"
                    >
                        ANURAG MALLICK
                    </Link>

                    <div className="h-6 w-px bg-white/10 mx-1 sm:mx-2 hidden sm:block" />

                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveTab(item.name)}
                                className={cn(
                                    "relative flex items-center justify-center min-h-[44px] px-3 lg:px-4 py-2 text-sm font-medium transition-colors hover:text-primary group",
                                    activeTab === item.name ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {activeTab === item.name ? (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                ) : (
                                    /* Hover Underline Sweep */
                                    <span className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                )}
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

                    <div className="flex items-center gap-1 sm:gap-2">
                        <ThemeSwitcher />

                        {/* Mobile Menu Trigger — 44px min touch target */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-muted-foreground hover:text-primary transition-colors rounded-full active:bg-white/5"
                            aria-label="Toggle Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                        <div className="flex flex-col items-center gap-6 sm:gap-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => {
                                            setActiveTab(item.name);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "text-2xl sm:text-3xl font-bold tracking-tighter transition-colors min-h-[44px] flex items-center",
                                            activeTab === item.name ? "text-primary" : "text-white/60 hover:text-primary active:text-primary"
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
