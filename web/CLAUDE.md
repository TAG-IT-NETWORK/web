# TAG IT Network Website

## Project Overview
Blockchain-powered product authentication platform website with cyber-industrial minimalist aesthetic.

## Current Status: Multi-Page Rebuild
Converting from single-page to multi-page structure. See TODO.md for full plan.

## Tech Stack
- Static HTML/CSS/JS (multi-page site)
- Deployed on Vercel
- No build step required

## Design System

### Colors
```css
--deep-carbon: #0A0E14      /* Background */
--carbon-gray: #1A1F29      /* Cards/sections */
--electric-blue: #00D4FF    /* Primary accent, CTAs */
--circuit-green: #00FF88    /* Success states */
--neon-purple: #B84FFF      /* Secondary accent */
--danger-red: #FF4757       /* Alerts */
--warning-amber: #FFA502    /* Warnings */
--neutral-white: #F5F7FA    /* Text */
--muted-gray: #8B95A5       /* Secondary text */
```

### Typography
- Headings: Inter 700
- Body: Inter 400/500
- Code/Technical: JetBrains Mono

### Effects
- Glow shadows on hover
- Card lift on hover (translateY -5px)
- Circuit board SVG backgrounds
- Smooth scroll with scroll-padding-top: 100px

## File Structure (Target)
```
web/
├── index.html                 ← Home page
├── solutions/index.html       ← Solutions page
├── technology/index.html      ← Technology page
├── tokenomics/index.html      ← Tokenomics page
├── docs/index.html            ← Docs page
├── about/index.html           ← About page
├── css/
│   ├── shared.css             ← Shared styles
│   └── home.css               ← Home-specific
├── js/
│   ├── shared.js              ← Shared scripts
│   └── wallet.js              ← Wallet logic
├── assets/images/
│   ├── tagit_logo.svg         ← Main logo
│   ├── og-image.png           ← Social sharing image
│   └── favicon.svg            ← Browser favicon
└── vercel.json
```

## Code Style
- Use CSS variables for all colors
- Mobile-first responsive design
- Keep animations GPU-accelerated (transform, opacity)
- Maintain overflow-x: hidden for mobile
- DRY: Shared components in css/shared.css and js/shared.js

## Key Pages
1. **Home** - Hero with 3D cubes, trust stats, feature preview
2. **Solutions** - Industry use cases (6 sectors)
3. **Technology** - Life cycle, ORACULS stack, NFC explainer
4. **Tokenomics** - $TAGIT token, DAO governance
5. **Docs** - API reference, code examples
6. **About** - Mission, values, roadmap, contact

## Build Commands
```bash
# Local: Open with Live Server extension
# Deploy: git push origin main (Vercel auto-deploys)
```

## Assets
- Logo: assets/images/tagit_logo.svg (hexagon chip icon)
- OG Banner: assets/images/OG_baner.png (1200x630 social image)
