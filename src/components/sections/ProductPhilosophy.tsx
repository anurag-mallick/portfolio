"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, BarChart3, Target, Repeat, Zap } from "lucide-react";

export function ProductPhilosophy() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Product <span className="text-primary">Philosophy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How I approach building products: balancing business goals, user
            needs, and technical feasibility to deliver maximum impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Graphic 1: The PM Sweet Spot (Venn Diagram) */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-64 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* Venn Diagram Circles */}
                <div className="absolute top-0 left-1/4 w-40 h-40 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center backdrop-blur-sm -translate-x-4">
                  <span className="text-xs font-bold text-blue-400 -translate-y-8">
                    BUSINESS
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xs font-bold text-purple-400 -translate-x-8 translate-y-8">
                    TECH
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xs font-bold text-pink-400 translate-x-8 translate-y-8">
                    USER
                  </span>
                </div>
                {/* Center Intersection */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] z-10"
                >
                  <span className="text-sm font-black text-primary-foreground">
                    PM
                  </span>
                </motion.div>
              </motion.div>
            </div>
            <h3 className="text-xl font-bold mb-4">The Sweet Spot</h3>
            <p className="text-sm text-muted-foreground">
              Operating at the intersection of viability, feasibility, and
              desirability to find the most impactful path forward.
            </p>
          </div>

          {/* Graphic 2: The Action Loop */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.path
                  d="M 50,10 A 40,40 0 1,1 49.9,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary/30"
                  strokeDasharray="4 2"
                />
                <motion.path
                  d="M 50,10 A 40,40 0 1,1 49.9,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-8">
                <div className="flex flex-col items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Data
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Insight
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Action
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Target className="w-6 h-6 text-green-400 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    Result
                  </span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Repeat className="w-8 h-8 text-primary animate-spin-slow" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">The Feedback Loop</h3>
            <p className="text-sm text-muted-foreground">
              Continuous iteration based on real-world usage and performance
              metrics to drive sustainable growth.
            </p>
          </div>

          {/* Graphic 3: Priority Matrix */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-64 mb-8 bg-card border border-border rounded-xl p-4 overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-border/50 bg-green-500/5 flex items-center justify-center p-2">
                  <span className="text-[10px] text-green-500 font-bold">
                    QUICK WINS
                  </span>
                </div>
                <div className="border-b border-border/50 bg-primary/10 flex items-center justify-center p-2">
                  <span className="text-[10px] text-primary font-bold">
                    BIG BETS
                  </span>
                </div>
                <div className="border-r border-border/50 bg-muted/5 flex items-center justify-center p-2">
                  <span className="text-[10px] text-muted-foreground font-bold">
                    FILL INS
                  </span>
                </div>
                <div className="bg-red-500/5 flex items-center justify-center p-2">
                  <span className="text-[10px] text-red-500/50 font-bold uppercase">
                    Avoid
                  </span>
                </div>
              </div>
              {/* Axis Labels */}
              <div className="absolute left-1 top-1/2 -rotate-90 origin-left -translate-y-1/2 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                Impact
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                Complexity
              </div>
              {/* Priority Bubbles */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[20%] right-[20%] w-4 h-4 rounded-full bg-primary/80 blur-sm"
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-green-500/80 blur-[2px]"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">Ruthless Prioritization</h3>
            <p className="text-sm text-muted-foreground">
              Maximizing ROI by focusing on high-impact initiatives and
              effectively managing technical complexity.
            </p>
          </div>
        </div>

        {/* Bottom Quote or Concept */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-background to-primary/10 border border-primary/20 text-center"
        >
          <p className="text-xl italic font-serif text-foreground/80">
            "Product management is about{" "}
            <span className="text-primary font-bold">solving problems</span>,
            not just shipping features."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
