"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Award,
  Code2,
  Globe2,
  ShieldCheck,
  Zap,
  Package,
  Briefcase,
  Repeat,
  Users,
  FileText,
  Search,
  BarChart3,
  TrendingUp,
  Handshake,
  Crown,
  PieChart,
  Lightbulb,
  Map,
  Cloud,
  Layers,
  Link as LinkIcon,
  Database,
  PenTool,
  LayoutGrid,
  BarChart,
  Calculator,
  Activity,
  MousePointer2,
  Trello,
  HelpCircle,
} from "lucide-react";

export const coreCompetencies = [
  {
    name: "Product Ownership",
    icon: Package,
    story:
      "When I first joined the team handling the Employer of Record (EOR) initiative at Wisestep, we were stepping into a lot of uncertainty in the US and EU markets. It wasn't just about building a tool; it was about understanding why global hiring was so painful for our clients. By focusing on those early pain points and iterating closely with our first few users, we managed to build a platform that eventually saw quite a lot of traction—scaling to over 500 clients—but it really started with just trying to solve one compliance headache at a time.",
  },
  {
    name: "Program Management",
    icon: Briefcase,
    story:
      "At Maharashtra Metro Rail, I found myself in the middle of a very complex puzzle. We had over 50 experts and dozens of pre-bid meetings for contracts worth ₹4,000 Cr. The challenge wasn't just the math; it was making sure everyone from engineering to legal was looking at the same map. By standardizing our reporting and really listening to the queries that kept coming up, we were able to cut down confusion significantly, which naturally made the whole evaluation process much smoother for everyone involved.",
  },
  {
    name: "Agile",
    icon: Repeat,
    story:
      "I’ve learned that a roadmap is only as good as the team’s ability to adapt. While building payroll platforms at Wisestep, things moved incredibly fast. We used Agile not just as a process, but as a way to stay sane—coordinating daily between Design and Engineering to make sure we weren't building features that nobody needed. It was rewarding to see that collaborative effort result in a platform that users genuinely trusted for their accurate (99.5%+) monthly payouts.",
  },
  {
    name: "User Experience (UX)",
    icon: Users,
    story:
      "During my time at 3M, I realized that data only tells half the story. To really understand what our healthcare customers needed, I had to look past the spreadsheets. By applying a design-thinking approach, we uncovered small feature gaps that, once addressed, we forecasted could significantly help the team’s sales. Later at Wisestep, I sat through over 50 interviews just to hear what users were struggling with; seeing their satisfaction scores climb afterward was a great validation of just listening better.",
  },
  {
    name: "Requirement Gathering",
    icon: FileText,
    story:
      "I bridge the gap between user needs and technical specs. At Shiprocket, I developed a custom logistics flow for Bestseller by mapping complex inventory requirements, which reduced status mismatches between systems from 15% to <0.5%.",
  },
  {
    name: "User Research",
    icon: Search,
    story:
      "I conducted 50+ user interviews at Wisestep, identifying pain points that boosted user satisfaction scores by 25%. It taught me that the best features aren't always the most complex ones, but the ones that solve the most persistent friction.",
  },
  {
    name: "Data Analytics",
    icon: BarChart3,
    story:
      "At Bluspring, we realized that with 85,000 associates, it was becoming very difficult for leadership to get a clear picture of payroll health in real-time. I worked closely with the IT and Finance teams to bridge that gap. We built out dashboards that didn't just show numbers, but told a story of where our variances were.",
  },
  {
    name: "Process Improvement",
    icon: TrendingUp,
    story:
      "I’ve always been curious about how we can take the 'boring' out of the workday. At Wisestep, our Ops and Finance teams were spending 15+ hours a week on manual reconciliation. I explored how we could use AI agents and n8n to automate the repetitive bits. It was a learning curve for all of us, but seeing the team reclaim 70% of their time was the real win.",
  },
  {
    name: "Stakeholder Alignment",
    icon: Handshake,
    story:
      "I've found that alignment is really about finding a common language. At Bluspring, I spent a lot of time bridging the gap between HR’s compliance needs and IT’s system constraints. It wasn't always easy, but by creating a shared roadmap, we were able to ensure that 85,000 people were paid accurately and on time, which was a huge collective relief.",
  },
  {
    name: "Leadership",
    icon: Crown,
    story:
      "For me, leadership was best defined during my time at Maharashtra Metro Rail. Managing contracts worth ₹4,000 Cr meant leading 20+ pre-bid meetings where every decision had a massive ripple effect. I learned that leading isn't about having all the answers, but about ensuring every expert in the room is heard so we can make the most informed choice for the project.",
  },
  {
    name: "Data Visualization",
    icon: PieChart,
    story:
      "I use data visualization not just to show results, but to drive decision-making. My dashboards at 3M and Bluspring were designed to highlight immediate action items, turning complex datasets into simple, actionable visual narratives.",
  },
  {
    name: "Design Thinking",
    icon: Lightbulb,
    story:
      "My first deep dive into design thinking was at 3M, where we didn't just look at product specs but really analyzed consumer behavior. By mapping out the actual journeys of healthcare workers, we identified feature gaps that we realized could solve real-world problems while also opening up new revenue streams.",
  },
  {
    name: "Product Roadmapping",
    icon: Map,
    story:
      "Roadmapping is a balancing act. At Wisestep, I owned the delivery of global payroll platforms by constantly balancing market opportunities with technical feasibility, ensuring we stayed competitive while remaining grounded in our technical capabilities.",
  },
  {
    name: "SaaS Solutions",
    icon: Cloud,
    story:
      "Deep experience in building and scaling SaaS platforms, specifically in the EOR and Fintech space, reaching €275,000+ ARR in 6 months by focusing on creating value through software.",
  },
  {
    name: "Cloud Integration",
    icon: Layers,
    story:
      "I’ve spent a lot of time thinking about how cloud infrastructure can make financial systems more resilient. When scaling our EOR platform at Wisestep, we had to ensure our integrations were robust enough to handle global compliance while remaining flexible enough for future growth.",
  },
  {
    name: "API Integration",
    icon: LinkIcon,
    story:
      "Led US payroll integration with Paychex and expanded Shiprocket’s logistics partners from 4 to 17+ through strategic API integrations, always focusing on seamless data flow.",
  },
];

export const technicalSkills = [
  {
    name: "Jira",
    icon: Trello,
    story:
      "I see Jira as a communication tool rather than just a tracking tool. When implementing hyperlocal delivery at Shiprocket, I used the backlog to keep our priorities transparent so that the engineering team always knew which technical hurdle was the most critical.",
  },
  {
    name: "Figma",
    icon: PenTool,
    story:
      "Whenever I'm proposing a new feature, I like to start with a prototype in Figma. It’s a great way to say, 'Is this what you meant?' to a stakeholder before we commit any code. It saves time and ensures alignment.",
  },
  {
    name: "SQL",
    icon: Database,
    story:
      "I enjoy digging into the data. Whether it’s using SQL to find an anomaly in a payroll run or to gather insights for a new feature, I use it to find the evidence needed for informed choices.",
  },
  {
    name: "Tableau",
    icon: LayoutGrid,
    story:
      "Built interactive dashboards that provide real-time visibility into payroll costs for 85,000+ associates, enabling data-driven decision-making at the highest levels.",
  },
  {
    name: "PowerBI",
    icon: BarChart,
    story:
      "Used PowerBI to visualize supply chain metrics and procurement performance at Metro Rail, identifying significant cost-saving opportunities.",
  },
  {
    name: "SPSS",
    icon: Calculator,
    story:
      "Applied K-means clustering in SPSS for Instagram user segmentation and built predictive models that reduced costs by 20% for a media start-up.",
  },
  {
    name: "QlikSense",
    icon: Activity,
    story:
      "Utilized QlikSense for complex financial reconciliation, reducing manual effort by 60% with 99.8% accuracy.",
  },
  {
    name: "Balsamiq",
    icon: MousePointer2,
    story:
      "Used for rapid low-fidelity wireframing during the requirement gathering phase to align with stakeholders quickly.",
  },
];

export const certifications = [
  "Lean Six Sigma Green Belt",
  "Advanced Google Analytics",
  "Design Thinking (Atyaasaa)",
];

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
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4"
          >
            <Zap className="w-3 h-3" /> SYSTEM_CAPABILITIES_v2.0
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
            Expertise & <span className="text-primary">Artifacts</span>
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto text-lg text-center">
            A specialized toolkit for scaling global financial platforms and
            driving product innovation.
            <span className="block text-sm mt-2 text-primary/60 font-mono italic">
              Click any skill to hear the story behind it.
            </span>
          </p>
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
                  {coreCompetencies.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onMouseEnter={() => setSelectedSkill(skill as any)}
                      onMouseLeave={() => setSelectedSkill(null)}
                      className="relative p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group/card overflow-hidden cursor-help"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/5 group-hover/card:bg-primary/10 transition-colors">
                          <skill.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-gray-400 group-hover/card:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <HelpCircle className="w-3 h-3 text-primary/40" />
                      </div>
                    </motion.div>
                  ))}
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
