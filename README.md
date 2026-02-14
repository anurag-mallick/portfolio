# Anurag Mallick | AI Product Architect Portfolio

A premium, high-performance portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. Designed to showcase professional expertise in Product Management, AI Integration, and Financial Infrastructure.

## 🚀 Live Preview
The site is live at: **[https://anurag-mallick.pages.dev](https://anurag-mallick.pages.dev)**

## 🛠️ Technical Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Edge Runtime)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [Web3Forms](https://web3forms.com/) (Serverless Email Delivery)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

## ✨ Key Features

- **Dynamic Hero Section**: High-impact personal branding and call-to-actions.
- **Interactive Skills System**: Icon-rich categorization of Core Competencies and Technical Skills.
- **Professional Timeline**: Detailed Experience and Education history with brand-synced logos.
- **Fully Responsive**: Optimized for all devices from mobile to desktop.
- **Dark Mode Aesthetic**: Premium "Cyber-Professional" design with glassmorphism and ambient lighting effects.
- **Contact Integration**: Zero-backend email delivery system.

## ⚙️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anurag-mallick/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the project.

## 🌐 Deployment (Cloudflare Pages)

1. Connect your GitHub repository to Cloudflare Pages.
2. Set the `Build command` to `npm run build`.
3. Set the `Build output directory` to `.vercel/output/static`.
4. Add the following **Environment Variable** in the Cloudflare Dashboard:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`: Your Web3Forms Access Key.
5. Deploy!

---
Developed by Anurag Mallick.
