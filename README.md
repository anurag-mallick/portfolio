# Anurag Mallick | AI Product Architect Portfolio

A premium, high-performance portfolio website built with **Next.js 16**, **Tailwind CSS 4**, and **Framer Motion**. Designed to showcase professional expertise in Product Management, AI Integration, and Financial Infrastructure — fully responsive and mobile-optimized.

## 🚀 Live Preview

**[https://anurag-mallick.pages.dev](https://anurag-mallick.pages.dev)**

## 🛠️ Technical Stack

| Layer          | Technology                                                                            |
| -------------- | ------------------------------------------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                             |
| **Styling**    | [Tailwind CSS 4.0](https://tailwindcss.com/) with custom theming engine               |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) with `prefers-reduced-motion` support |
| **3D / Viz**   | Three.js (lazy-loaded), D3.js, Recharts, HTML5 Canvas                                 |
| **Security**   | CSP, HSTS, XSS headers, Honeypot bot protection, Rate limiting                        |
| **Icons**      | [Lucide React](https://lucide.dev/)                                                   |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/)                                     |

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

## 🎯 The Lab: 30+ Interactive Applications

### 💰 Fintech Toolkit

- Global Payroll What-If Studio — macro-economic stress-testing
- EOR Strategy Decision Engine — AI-driven expansion modeling
- LLM Document Intelligence — multi-doc audit & reconciliation
- Multi-Country Tax Calculator — cost comparison across 15+ countries

### 📦 Logistics & Supply Chain

- Last-Mile Route Optimizer — algorithm comparison (Nearest Neighbor, 2-Opt, Genetic)
- Returns Intelligence Lab — reverse logistics fraud detection & ML prediction
- 3PL Cost Comparator — multi-carrier rate optimization
- Food Delivery Express — real-time order tracking simulation

### 🏗️ Infrastructure & DevOps

- Load Balancer Simulator, Circuit Breaker, Rate Limiter, Feature Flag Manager
- DB Query Planner, Auto-Scaling Simulator, Git Branching Visualizer

### 🎮 Neon Games

- Tetris, Snake, Minesweeper, Asteroids, Space Invaders, 2048, Arkanoid, and more

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
