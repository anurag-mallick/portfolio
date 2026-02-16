"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Impact } from "@/components/sections/Impact";
import { Contact } from "@/components/sections/Contact";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { Articles } from "@/components/sections/Articles";

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
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <AppShowcase />
            <Articles />
            <Footer />
        </main>
    );
}
