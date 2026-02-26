"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Award,
  Code2,
  Globe2,
  ShieldCheck,
  Zap,
  HelpCircle,
  Filter,
} from "lucide-react";
import { coreCompetencies, technicalSkills, certifications } from "@/lib/data/skills";

function DiscoveryFunnel() {
    return (
        <div className="relative w-48 h-48 mx-auto mb-12 hidden lg:flex flex-col items-center justify-center">
            {/* Funnel Layers */}
            <motion.div 
                initial={{ width: 120 }}
                animate={{ width: [120, 130, 120] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="h-8 bg-primary/20 border border-primary/40 rounded-t-xl flex items-center justify-center mb-1"
            >
                <span className="text-[8px] font-bold text-primary/60 uppercase">Discovery</span>
            </motion.div>
            <motion.div 
                initial={{ width: 90 }}
                animate={{ width: [90, 100, 90] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="h-8 bg-primary/30 border border-primary/50 flex items-center justify-center mb-1"
            >
                <span className="text-[8px] font-bold text-primary/70 uppercase">Validation</span>
            </motion.div>
            <motion.div 
                initial={{ width: 60 }}
                animate={{ width: [60, 70, 60] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="h-8 bg-primary/40 border border-primary/60 rounded-b-xl flex items-center justify-center"
            >
                <span className="text-[8px] font-bold text-primary/80 uppercase">Build</span>
            </motion.div>
            
            {/* Output Arrow */}
            <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-2 text-primary"
            >
                <Filter className="w-4 h-4" />
            </motion.div>

            <div className="absolute -bottom-6 text-[8px] font-bold text-primary/40 uppercase tracking-widest">
                Product Discovery Funnel
            </div>
        </div>
    );
}

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    story: string;
    icon: any;
  } | null>(null);

  return (
    <section
      id="skills"
      className="theme-section bg-background relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="theme-container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4"
            >
              <Zap className="w-3 h-3" /> SYSTEM_CAPABILITIES_v2.1
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
              Expertise & <span className="text-primary">Artifacts</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A specialized toolkit for scaling global financial platforms and
              driving product innovation through structured discovery.
              <span className="block text-sm mt-2 text-primary/60 font-mono italic">
                Click any skill to hear the story behind it.
              </span>
            </p>
          </div>
          <DiscoveryFunnel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Core Competencies */}
          <div className="lg:col-span-12">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="theme-card p-8">
                <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2 border-b border-border pb-4">
                  <Globe2 className="text-primary w-5 h-5" /> CORE COMPETENCIES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {coreCompetencies.map((skill: any, i) => {
                     const isPMSkill = skill.category === "PRODUCT & GROWTH";
                     return (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.02 }}
                         onMouseEnter={() => setSelectedSkill(skill as any)}
                         onMouseLeave={() => setSelectedSkill(null)}
                         className={`relative p-4 rounded-xl transition-all group/card overflow-hidden cursor-help border ${
                           isPMSkill 
                             ? "bg-primary/10 border-primary/40 hover:border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]" 
                             : "bg-white/[0.02] border-white/5 hover:border-primary/30 hover:bg-primary/[0.02]"
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-lg transition-colors ${
                             isPMSkill ? "bg-primary/20" : "bg-primary/5 group-hover/card:bg-primary/10"
                           }`}>
                             <skill.icon className={`w-4 h-4 text-primary ${isPMSkill ? "animate-pulse" : ""}`} />
                           </div>
                           <span className={`text-sm font-medium transition-colors ${
                             isPMSkill ? "text-white" : "text-gray-400 group-hover/card:text-white"
                           }`}>
                             {skill.name}
                           </span>
                         </div>
                         {isPMSkill && (
                           <div className="absolute -top-1 -right-1">
                             <div className="w-4 h-4 bg-primary rotate-45 translate-x-1/2 -translate-y-1/2" />
                           </div>
                         )}
                         <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                           <HelpCircle className="w-3 h-3 text-primary/40" />
                         </div>
                       </motion.div>
                     );
                   })}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Tools */}
          <div className="lg:col-span-7">
            <div className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-2xl blur opacity-20"></div>
              <div className="theme-card p-8 h-full">
                <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2 border-b border-border pb-4">
                  <Code2 className="text-primary w-5 h-5" /> TECHNICAL SKILLS &
                  TOOLS
                </h3>
                <div className="flex flex-wrap gap-3">
                  {technicalSkills.map((tool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onMouseEnter={() => setSelectedSkill(tool as any)}
                      onMouseLeave={() => setSelectedSkill(null)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 text-primary text-sm font-medium hover:bg-primary hover:text-black transition-all cursor-help group/tool"
                    >
                      <tool.icon className="w-3.5 h-3.5 group-hover/tool:scale-110 transition-transform" />
                      {tool.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-5">
            <div className="relative group h-full">
              <div className="theme-card p-8 h-full overflow-hidden">
                <div className="absolute -top-6 -right-6 opacity-5 rotate-12 text-primary">
                  <Award className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2 border-b border-border pb-4">
                  <ShieldCheck className="text-primary w-5 h-5" />{" "}
                  CERTIFICATIONS
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col space-y-1"
                    >
                      <span className="text-gray-300 text-sm font-medium">
                        {cert}
                      </span>
                      <span className="text-[10px] font-mono text-primary/40 uppercase tracking-tighter">
                        verified_credential_secured
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex items-center justify-center pt-8 border-t border-white/5"
        >
          <div className="bg-primary/5 px-6 py-3 rounded-full border border-primary/10 backdrop-blur-sm">
            <p className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] text-center">
              Full Stack Product Management • Scalable Architecture • Financial
              Compliance • AI Integration
            </p>
          </div>
        </motion.div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-card border border-primary/20 rounded-2xl p-8 shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <selectedSkill.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold tracking-tight text-foreground">
                    {selectedSkill.name}
                  </h4>
                  <p className="text-xs font-mono text-primary uppercase tracking-widest">
                    Experience Story
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg italic">
                &ldquo;{selectedSkill.story}&rdquo;
              </p>

              <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12">
                <selectedSkill.icon className="w-40 h-40 text-primary" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
