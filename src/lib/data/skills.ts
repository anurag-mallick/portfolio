import {
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
