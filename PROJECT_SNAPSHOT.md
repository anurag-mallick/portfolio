# PROJECT SNAPSHOT: Anurag Mallick Portfolio

## Project Overview
A high-end personal portfolio built with Next.js, featuring 5 distinct, visually rich themes and interactive mini-games (Ping Pong, Tetris).

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, Vanilla CSS (globals.css)
- **Animations**: Framer Motion
- **Fonts**: Inter, Playfair Display, Outfit, Fira Code, Syncopate, Space Grotesk, Lexend (via `next/font/google`)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (Static Export)

## Infrastructure & Configuration
- **Theme System**: Custom `ThemeProvider` using `localStorage` and `data-theme` attribute on the HTML root.
- **Base Path**: `/portfolio` (required for GitHub Pages deployment).
- **GitHub Actions**: Automated build and deploy via `.github/workflows/deploy.yml`.

## Important Keys & Secrets
- **Web3Forms Access Key**: `cb8446b3-6c0b-4682-8bc8-795a973a033c` (Stored in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`).

## Current State & Recent Changes
- **Visual Overhaul**: Implemented proper font loading for all themes, enhanced button glows, and added dynamic background effects (Aurora).
- **Theme Switcher**: Refactored to a visual grid with live previews.
- **Themes**:
  1. **Terminal**: Matrix-green, monospace, centered.
  2. **Minimal Executive**: Clean white/gray, left-aligned, serif-touch.
  3. **Futuristic AI**: Blue/Cyan, glowing effects, intense blurs.
  4. **Modern Glass**: Frosted textures, subtle gradients.
  5. **Creative Portfolio**: High-contrast, bold typography, offset layouts.
- **Games**:
  - `PingPong.tsx`: Best of 5, AI-controlled opponent.
  - `NeonTetris.tsx`: Cyberpunk aesthetic, full scoring system.

## Key Files to Watch
- `src/app/globals.css`: Contains all theme variable definitions.
- `src/components/ThemeContext.tsx`: Manages theme state and persistence.
- `src/components/layout/Navbar.tsx`: Integrated theme switcher.
- `src/components/sections/`: All sections (Hero, Experience, etc.) are built to be theme-aware.

## Deployment Status
- **URL**: [https://anurag-mallick.github.io/portfolio/](https://anurag-mallick.github.io/portfolio/)
- **Branch**: `main`

## Instructions for Handoff
1. Ensure `npm install` has been run.
2. Verify `next.config.ts` has the correct `basePath` before building locally for deployment.
3. The theme switcher is located in the `Navbar`.
4. Themes are applied via CSS variables defined in `:root` and `[data-theme="..."]` blocks in `globals.css`.
