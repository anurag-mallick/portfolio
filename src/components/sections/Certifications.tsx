"use client";

import { motion } from "framer-motion";
import {
  Award,
  Repeat,
  Gauge,
  BarChart3,
  Lightbulb,
  Presentation,
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
              <Repeat className="w-3 h-3" /> CREDENTIALS_v2.1
            </motion.div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 sm:mb-6">
              Professional <span className="text-primary">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Industry-recognized certifications demonstrating expertise in
              agile methodologies, technical leadership, data analytics, and
              design thinking.
              <span className="block text-xs sm:text-sm mt-2 text-primary/60 font-mono italic">
                Verified credentials for continuous professional development
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
              className="group relative flex flex-col items-center p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/20 hover:bg-card/40 transition-all duration-400 cursor-pointer transform hover:-translate-y-1"
            >
              {/* Certification Icon with Background Ring */}
              <div className="relative w-16 h-16 mb-6 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-primary/5 flex items-center justify-center">
                  {cert.icon === Repeat ? (
                    <Repeat className="w-6 h-6 text-primary" />
                  ) : cert.icon === Gauge ? (
                    <Gauge className="w-6 h-6 text-primary" />
                  ) : cert.icon === BarChart3 ? (
                    <BarChart3 className="w-6 h-6 text-primary" />
                  ) : cert.icon === Lightbulb ? (
                    <Lightbulb className="w-6 h-6 text-primary" />
                  ) : cert.icon === Presentation ? (
                    <Presentation className="w-6 h-6 text-primary" />
                  ) : (
                    <Award className="w-6 h-6 text-primary" />
                  )}
                </div>

                {/* Hover Ring Effect */}
                <div className="absolute inset-0 rounded-full border border-primary/0 hover:border-primary/20 transition-all duration-300" />
              </div>

              {/* Certification Details */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-bold text-foreground">
                  {cert.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {cert.issuer}
                </p>
                {cert.date && (
                  <p className="text-xs text-primary/60 font-mono">
                    {cert.date}
                  </p>
                )}
                {cert.credentialId && (
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-xs text-primary/40">ID:</span>
                    <span className="text-xs font-mono text-primary ml-1">{cert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Subtle Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-full pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 0 2px var(--primary),
                           0 0 8px 2px var(--primary/20),
                           0 0 16px 4px var(--primary/10)`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}