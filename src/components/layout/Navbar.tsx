"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Deployed", href: "#deployed-systems" },
    { name: "Skills", href: "#skills" },
    { name: "Impact", href: "#impact" },
    { name: "Articles", href: "#articles" },
    { name: "Connect", href: "#contact" },
];

export function Navbar() {
    const [activeTab, setActiveTab] = React.useState("");
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const scrollYRef = React.useRef(0);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
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

    // Smooth scroll function for navigation
    const smoothScroll = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        const targetId = href.replace(/^.*#/, '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Update URL without page reload
            window.history.pushState(null, '', href);
        }
        setActiveTab(navItems.find(item => item.href === href)?.name || "");
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]"
                style={{ scaleX }}
            />

            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 px-2 sm:px-4",
                    isScrolled ? "pt-2" : "pt-4"
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div
                    className={cn(
                        "theme-container flex items-center justify-between rounded-full border transition-all duration-500 pointer-events-auto w-full",
                        isScrolled
                            ? "glass border-primary/20 shadow-2xl backdrop-blur-md py-1"
                            : "border-transparent py-2"
                    )}
                >
                    <Link
                        href="#"
                        className="flex items-center justify-center min-h-[44px] px-3 sm:px-4 py-2 font-bold text-base sm:text-lg tracking-tighter text-foreground hover:text-primary transition-colors whitespace-nowrap"
                    >
                        ANURAG MALLICK
                    </Link>

                    <div className="h-6 w-px bg-white/10 mx-1 sm:mx-2 hidden md:block" />

                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    smoothScroll(e, item.href);
                                }}
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
                                    <span className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                )}
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

                    <div className="flex items-center gap-1 sm:gap-2">
                        <ThemeSwitcher />

                        {/* Resume Download Button - Desktop */}
                        <button
                            onClick={() => window.open('https://drive.google.com/file/d/1KmV8TzTGY9cDsypeo5xT9ZcNRcoKeg9F/view?usp=drive_link', '_blank', 'noopener,noreferrer')}
                            className="hidden md:flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-muted-foreground hover:text-primary transition-colors rounded-full active:bg-white/5"
                            aria-label="Download Resume"
                        >
                            <FileText size={20} />
                        </button>

                        {/* Resume Download Button - Mobile */}
                        <button
                            onClick={() => window.open('https://drive.google.com/file/d/1KmV8TzTGY9cDsypeo5xT9ZcNRcoKeg9F/view?usp=drive_link', '_blank', 'noopener,noreferrer')}
                            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-muted-foreground hover:text-primary transition-colors rounded-full active:bg-white/5"
                            aria-label="Download Resume"
                        >
                            <FileText size={20} />
                        </button>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-muted-foreground hover:text-primary transition-colors rounded-full active:bg-white/5"
                            aria-label="Toggle Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isMobileMenuOpen ? "close" : "open"}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
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
                                        onClick={(e) => {
                                            smoothScroll(e, item.href);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "text-3xl sm:text-4xl font-bold tracking-tighter transition-colors min-h-[44px] flex items-center",
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
