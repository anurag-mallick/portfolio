"use client";

import { motion } from "framer-motion";
import {
  Award,
  Repeat,
  Gauge,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { certifications } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

export function Certifications() {
  return (
    <section id="certifications" className="theme-section bg-background relative overflow-hidden pt-16 sm:pt-24 md:pt-32">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="theme-container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10 sm:mb-16 md:mb-20 gap-8 sm:gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4"
            >
              <Award className="w-3 h-3" /> CREDENTIALS_v2.1
            </motion.div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 sm:mb-6">
              Professional <span className="text-primary">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Industry-recognized certifications demonstrating expertise in
              agile methodologies, technical leadership, data analytics, and
              design thinking.
              <span className="block text-xs sm:text-sm mt-2 text-primary/60 font-mono italic">
                Click any certification for details.
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-6 rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/40 hover:bg-card/40 transition-all duration-300 cursor-pointer"
            >
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                {cert.icon === Repeat ? (
                  <Repeat className="w-6 h-6 text-primary" />
                ) : cert.icon === Gauge ? (
                  <Gauge className="w-6 h-6 text-primary" />
                ) : cert.icon === BarChart3 ? (
                  <BarChart3 className="w-6 h-6 text-primary" />
                ) : cert.icon === Lightbulb ? (
                  <Lightbulb className="w-6 h-6 text-primary" />
                ) : (
                  <Award className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {cert.issuer}{cert.date ? ` · ${cert.date}` : ""}
                </p>
                {cert.credentialId && (
                  <p className="text-xs text-primary/60 font-mono mt-1">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}