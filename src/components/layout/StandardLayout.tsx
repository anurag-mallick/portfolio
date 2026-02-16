"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Impact } from "@/components/sections/Impact";
import { Contact } from "@/components/sections/Contact";
import { Games } from "@/components/sections/Games";
import { Apps } from "@/components/sections/Apps";
import { FintechToolkit } from "@/components/sections/FintechToolkit";
import { LogisticsLab } from "@/components/sections/LogisticsLab";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Algorithms } from "@/components/sections/Algorithms";

export function StandardLayout() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Impact />
            <Contact />
            <Apps />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <FintechToolkit />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <LogisticsLab />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <Infrastructure />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <Algorithms />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <Games />
            <Footer />
        </main>
    );
}
