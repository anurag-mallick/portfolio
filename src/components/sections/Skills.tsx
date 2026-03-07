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
          {/* AI Strategy Simulator - Removed */}


function RadarChart() {
  const levels = 5;
  const size = 200;
  const radius = 70;
  const centerX = size / 2;
  const centerY = size / 2;
  
  const data = [
    { label: "Product", value: 95 },
    { label: "Growth", value: 90 },
    { label: "AI/ML", value: 85 },
    { label: "Design", value: 80 },
    { label: "Strategy", value: 95 },
    { label: "Ops", value: 85 }
  ];

  const angleStep = (Math.PI * 2) / data.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  const points = data.map((d, i) => getCoordinates(i, d.value));
  const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 mx-auto mb-8 sm:mb-12 flex items-center justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-[0_0_15px_rgba(0,243,255,0.2)]">
        {/* Background Grids */}
        {[...Array(levels)].map((_, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={(radius / levels) * (i + 1)}
            className="fill-none stroke-white/10"
            strokeWidth="0.5"
          />
        ))}

        {/* Axis Lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              className="stroke-white/10"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data Path */}
        <motion.polygon
          points={pointsStr}
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Data Points and Pulsing Effect */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="2.5" className="fill-primary group-hover:fill-white transition-colors" />
            <motion.circle 
              cx={p.x} 
              cy={p.y} 
              r="5" 
              className="fill-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          </g>
        ))}

        {/* Labels relocated as text in SVG for better precision */}
        {data.map((d, i) => {
          const { x, y } = getCoordinates(i, 130);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[7px] font-bold fill-muted-foreground uppercase tracking-widest"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function DiscoveryFunnel() {
    return (
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-8 sm:mb-12 hidden sm:flex flex-col items-center justify-center">
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

            <div className="absolute -bottom-6 text-[8px] font-bold text-primary/60 uppercase tracking-[0.2em]">
                Product Strategy Funnel
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
      className="theme-section bg-background relative overflow-hidden pt-16 sm:pt-24 md:pt-32"
    >
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
              <Zap className="w-3 h-3" /> SYSTEM_CAPABILITIES_v2.1
            </motion.div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 sm:mb-6">
              Expertise & <span className="text-primary">Artifacts</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              A specialized toolkit for scaling global financial platforms and
              driving product innovation through structured discovery.
              <span className="block text-xs sm:text-sm mt-2 text-primary/60 font-mono italic">
                Tap any skill to hear the story behind it.
              </span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <RadarChart />
            <DiscoveryFunnel />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Core Competencies */}
          <div className="lg:col-span-12">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="theme-card p-6 sm:p-8 md:p-10 border-white/5 bg-white/[0.01]">
                <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-8 sm:mb-10 flex items-center gap-3 border-l-4 border-primary pl-4 uppercase tracking-[0.2em]">
                  <Globe2 className="text-primary w-6 h-6" /> CORE COMPETENCIES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                   {coreCompetencies.map((skill: any, i) => {
                     const isPMSkill = skill.category === "PRODUCT & GROWTH" || ["Product Ownership", "User Experience (UX)", "Data Analytics", "Design Thinking"].includes(skill.name);
                     return (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.02 }}
                         onClick={() => setSelectedSkill(skill as any)}
                         className={`relative p-5 rounded-2xl transition-all duration-300 group/card overflow-hidden cursor-pointer border ${
                           isPMSkill 
                             ? "bg-primary/5 border-primary/20 hover:border-primary/50 hover:bg-primary/10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)]" 
                             : "bg-white/[0.01] border-white/5 hover:border-secondary/30 hover:bg-secondary/5"
                         }`}
                       >
                         <div className="flex items-center gap-4">
                           <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                             isPMSkill ? "bg-primary/10 group-hover/card:bg-primary/20" : "bg-white/5 group-hover/card:bg-secondary/10"
                           }`}>
                             <skill.icon className={`w-5 h-5 ${isPMSkill ? "text-primary animate-pulse" : "text-muted-foreground group-hover/card:text-secondary"} transition-colors`} />
                           </div>
                           <span className={`text-sm font-semibold tracking-tight transition-colors ${
                             isPMSkill ? "text-white" : "text-muted-foreground group-hover/card:text-white"
                           }`}>
                             {skill.name}
                           </span>
                         </div>
                         {isPMSkill && (
                           <div className="absolute top-0 right-0 p-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
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
              <div className="theme-card p-4 sm:p-6 md:p-8 h-full">
                <h3 className="text-base sm:text-xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 border-l-4 border-primary pl-3 sm:pl-4 uppercase tracking-wider">
                  <Code2 className="text-primary w-5 h-5" /> TECHNICAL SKILLS & TOOLS
                </h3>
                <div className="flex flex-wrap gap-3">
                  {technicalSkills.map((tool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedSkill(tool as any)}
                      onTouchEnd={(e) => { e.stopPropagation(); setSelectedSkill(tool as any); }}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium hover:bg-primary hover:text-black transition-all cursor-pointer group/tool min-h-[44px]"
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
              <div className="theme-card p-4 sm:p-6 md:p-8 h-full overflow-hidden">
                <div className="absolute -top-6 -right-6 opacity-5 rotate-12 text-primary">
                  <Award className="w-24 sm:w-32 h-24 sm:h-32" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 border-l-4 border-primary pl-3 sm:pl-4 uppercase tracking-wider">
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
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all min-h-[44px]"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                        <cert.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-gray-300 text-sm font-medium leading-tight block">
                          {cert.name}
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground block mt-0.5">
                          {cert.issuer}{cert.date ? ` · ${cert.date}` : ""}
                        </span>
                      </div>
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
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedSkill(null)}
          >
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
