# Anurag Mallick | AI Product Architect Portfolio

A premium, high-performance portfolio website built with **Next.js 16**, **Tailwind CSS 4**, and **Framer Motion**. Designed to showcase professional expertise in Product Management, AI Integration, and Financial Infrastructure — fully responsive and mobile-optimized.

## 🚀 Live Preview

**[GitHub Pages](https://anurag-mallick.github.io/portfolio/)** · **[Cloudflare Mirror](https://anurag-mallick.pages.dev)**

## 🛠️ Technical Stack

| Layer          | Technology                                                                            |
| -------------- | ------------------------------------------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                             |
| **Styling**    | [Tailwind CSS 4.0](https://tailwindcss.com/) with custom theming engine               |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) with `prefers-reduced-motion` support |
| **3D / Viz**   | Three.js (lazy-loaded), D3.js, Recharts, HTML5 Canvas                                 |
| **Security**   | CSP, HSTS, XSS headers, Honeypot bot protection, Rate limiting                        |
| **Icons**      | [Lucide React](https://lucide.dev/)                                                   |
| **Deployment** | [GitHub Pages (Primary)](https://anurag-mallick.github.io/portfolio/) & [Cloudflare (Mirror)](https://pages.cloudflare.com/) |

## ✨ Key Features

### 📱 Mobile-First & Responsive

- Progressive typography scaling (`text-4xl` → `text-9xl`)
- Touch-friendly interactions: tap-to-expand cards, 44px min touch targets
- Body scroll lock on mobile menu, `100svh` hero viewport
- Reduced particles & disabled 3D on mobile for performance
- `prefers-reduced-motion` accessibility support
- Safe-area insets for notched phones

### 🎨 Theming Engine

- **2 premium themes**: Futuristic & Midnight — with real-time CSS variable switching
- Smooth theme transitions with `localStorage` persistence

### 🔒 Security Hardened

- Middleware-enforced CSP, HSTS, and XSS protection
- Honeypot bot verification & 30s rate limiting on contact form

### 🧩 Interactive Sections

- **Hero**: Canvas particle network + Three.js 3D (desktop), lazy-loaded
- **Experience**: Timeline/Grid toggle with tap-to-expand achievement cards
- **Skills**: SVG Radar Chart, Discovery Funnel, tap-to-reveal skill stories
- **Certifications**: 5 industry certifications with icons (Skillsoft, Google, etc.)
- **Contact**: Web3Forms integration with bot protection

## 🎯 The Lab: 18+ Interactive High-Performance Apps

### 🤖 AI & Automation

- AI Agent Orchestrator — multi-agent autonomous task decomposition visualizer
- LLM Payroll Document Intel — multi-doc AI audit & reconciliation engine
- LLM Cost Optimizer — token cost analysis across GMT-4, Claude, and Gemini

### 💰 Fintech Toolkit

- Sentinel Fraud Intelligence — real-time transaction stream & anomaly scoring
- Global Payroll What-If Studio — macro-economic stress-testing for workforces
- EOR Strategy Decision Engine — AI-driven expansion & flow modeling
- Multi-Country Tax Calculator — comparative cost analysis for 15+ regions
- Invoice Anomaly Detector — ML-powered payment & fraud validation

### 📦 Logistics & Supply Chain

- Supply Chain Digital Twin — global resilience & shock impact simulator
- Last-Mile Route Optimizer — animated TSP algorithm comparison
- Returns Intelligence Lab — reverse logistics fraud detection & NPS impact
- Returns Prediction Model — ML-based return probability scoring
- Food Delivery Express — real-time order tracking & cart simulation

### 🏗️ Algorithms & Architecture

- Pathfinding Visualizer — interactive BFS discovery with drag-to-draw walls
- Git Branching Strategy — D3.js force-directed graph for repository operations
- Circuit Breaker Pattern — microservices resilience state machine
- Auto-Scaling Simulator — horizontal pod autoscaling & cost metrics

## 📜 Certifications

| Certification                               | Issuer                 | Date     |
| ------------------------------------------- | ---------------------- | -------- |
| Agile Project Management & Tools for PMs    | Skillsoft              | Jan 2026 |
| Technical PM: Leadership & Stakeholder Mgmt | Skillsoft              | Dec 2025 |
| Lean Six Sigma Green Belt                   | Henry Harvin Education | —        |
| Advanced Google Analytics                   | Google Academy         | —        |
| Design Thinking                             | Atyaasaa Online        | Mar 2023 |

## ⚙️ Local Development

```bash
# Clone
git clone https://github.com/anurag-mallick/portfolio.git
cd portfolio

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Theme engine (CSS variables, responsive utilities)
│   └── layout.tsx          # Root layout with font loading & theme provider
├── components/
│   ├── layout/             # Navbar, Footer, LayoutWrapper
│   ├── sections/           # Hero, Experience, Skills, Contact, etc.
│   ├── apps/               # 30+ interactive mini-applications
│   ├── charts/             # D3.js & Recharts visualizations
│   └── ui/                 # Button, Card, reusable primitives
└── lib/
    ├── data/               # Experience, Skills, Apps data
    └── hooks/              # useMediaQuery, useReducedMotion
```

---

Developed by **Anurag Mallick** · [LinkedIn](https://www.linkedin.com/in/anuragmallick901/) · [Email](mailto:anurag.mallick@iiml.org)
