# CLAUDE.md — TAG IT Network Website (Next.js Migration)

**File-ID:** CLAUDE-WEB-001  
**Version:** v3.0  
**Date:** 2026-01-20  
**Status:** Active  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + GitHub + Vercel

---

## 🎯 PROJECT OVERVIEW

**Goal:** Migrate TAG IT Network website from static HTML to Next.js App Router for improved DX, performance, and scalability.

**Current State:** Static HTML/CSS/JS site deployed on Vercel. Home page is reference standard (95/100), subpages have inconsistencies.

**Target State:** Next.js 14 with TypeScript, Tailwind CSS, Framer Motion — all pages 95+/100 with unified cyberpunk aesthetic.

---

## 🚨 CRITICAL RULES

1. **Home page (index.html) is the DESIGN REFERENCE** — match its visual quality exactly
2. **Use exact design tokens** from the Design System section below
3. **TypeScript strict mode** — no `any` types, proper interfaces for all props
4. **App Router only** — no Pages Router patterns
5. **Tailwind CSS** — extend with custom design tokens, minimize custom CSS
6. **Framer Motion** — for all animations (replace current CSS animations)
7. **Mobile-first responsive** — test at 390px, 768px, 1024px, 1440px

---

## 📁 PROJECT STRUCTURE

```
tagit-web-next/
├── app/
│   ├── layout.tsx              # Root layout (nav, footer, modals)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + Tailwind
│   ├── solutions/page.tsx
│   ├── technology/page.tsx
│   ├── tokenomics/page.tsx
│   ├── docs/
│   │   ├── page.tsx            # Docs index
│   │   └── [...slug]/page.tsx  # Dynamic doc routes
│   ├── about/page.tsx
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustSignals.tsx
│   │   ├── Features.tsx
│   │   ├── RWAOpportunity.tsx
│   │   ├── HardwarePyramid.tsx
│   │   ├── SecurityLayers.tsx
│   │   ├── Roadmap.tsx
│   │   └── PageHero.tsx        # Reusable subpage hero
│   ├── animations/
│   │   ├── LoadingScreen.tsx
│   │   ├── CyberGrid.tsx
│   │   ├── ParallaxBackground.tsx
│   │   ├── BlockchainCubes.tsx
│   │   └── CircuitTraces.tsx
│   └── modals/
│       ├── WalletModal.tsx
│       ├── ContactModal.tsx
│       └── LegalModal.tsx
├── lib/
│   ├── constants.ts            # Design tokens
│   ├── animations.ts           # Framer Motion variants
│   └── utils.ts
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useWallet.ts
├── types/
│   └── index.ts
├── public/
│   └── images/                 # Copied from current /assets/images
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 🎨 DESIGN SYSTEM

### Colors (Tailwind Extension)

```typescript
// lib/constants.ts
export const colors = {
  // Base
  'deep-carbon': '#0A0E14',
  'carbon-gray': '#1A1F29',
  'electric-blue': '#00D4FF',
  'circuit-green': '#00FF88',
  'neon-purple': '#B84FFF',
  'danger-red': '#FF4757',
  'warning-amber': '#FFA502',
  'neutral-white': '#F5F7FA',
  'muted-gray': '#8B95A5',
}

// Opacity variants
export const colorOpacity = {
  'blue-5': 'rgba(0, 212, 255, 0.05)',
  'blue-10': 'rgba(0, 212, 255, 0.1)',
  'blue-15': 'rgba(0, 212, 255, 0.15)',
  'blue-20': 'rgba(0, 212, 255, 0.2)',
  'blue-30': 'rgba(0, 212, 255, 0.3)',
  'green-10': 'rgba(0, 255, 136, 0.1)',
  'green-20': 'rgba(0, 255, 136, 0.2)',
  'green-30': 'rgba(0, 255, 136, 0.3)',
  'purple-10': 'rgba(184, 79, 255, 0.1)',
  'purple-15': 'rgba(184, 79, 255, 0.15)',
  'purple-20': 'rgba(184, 79, 255, 0.2)',
}
```

### Spacing Scale

```typescript
export const spacing = {
  'xs': '8px',
  'sm': '16px',
  'md': '24px',
  'lg': '32px',
  'xl': '48px',
  '2xl': '64px',
  'section': '100px',
}
```

### Border Radius

```typescript
export const radius = {
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '20px',
}
```

### Typography

```typescript
export const fonts = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### Shadows / Glows

```typescript
export const glows = {
  blue: '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
  green: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
  purple: '0 0 20px rgba(184, 79, 255, 0.5), 0 0 40px rgba(184, 79, 255, 0.3)',
}
```

---

## 🎬 ANIMATION VARIANTS

```typescript
// lib/animations.ts
import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: 'easeOut',
      delay: delay * 0.15 
    }
  })
}
```

---

## 📄 PAGE STRUCTURE

### Home Page Sections (in order)
1. LoadingScreen (disappears after load)
2. Hero (with BlockchainCubes)
3. TrustSignals (partners + certifications)
4. Features (4 expandable cards)
5. RWAOpportunity (market stats + flow diagram)
6. HardwarePyramid (NFC chip tiers)
7. SecurityLayers (5-ring diagram)
8. Tokenomics teaser (link to full page)
9. About/CTA section
10. Roadmap

### Subpage Template
1. PageHero (title, subtitle, optional gradient)
2. Page-specific content sections
3. CTA section (optional)

---

## 🧩 COMPONENT PATTERNS

### Client vs Server Components

```typescript
// Server Component (default) - no 'use client'
// Use for: static content, SEO, data fetching
export default function PageHero({ title, subtitle }) {
  return (...)
}

// Client Component - add 'use client'
// Use for: interactivity, animations, hooks, browser APIs
'use client'
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  return (...)
}
```

### Animation Pattern

```typescript
'use client'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

export default function FeatureCard({ title, description }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="..."
    >
      {/* content */}
    </motion.div>
  )
}
```

### Expandable Card Pattern

```typescript
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExpandableCard({ title, preview, expanded }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <h3>{title}</h3>
      <p>{preview}</p>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {expanded}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## ✅ IMPLEMENTATION PHASES

### Phase 1: Foundation (Day 1)
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind with design tokens
- [ ] Set up project structure
- [ ] Create lib/constants.ts and lib/animations.ts
- [ ] Import fonts (Inter, JetBrains Mono)

### Phase 2: Layout (Day 1-2)
- [ ] Create Navbar component
- [ ] Create MobileMenu component
- [ ] Create Footer component
- [ ] Create root layout.tsx
- [ ] Add CyberGrid background

### Phase 3: Home Page (Day 2-3)
- [ ] Create LoadingScreen
- [ ] Create Hero with BlockchainCubes
- [ ] Create TrustSignals
- [ ] Create Features (expandable cards)
- [ ] Create RWAOpportunity
- [ ] Create HardwarePyramid
- [ ] Create SecurityLayers
- [ ] Create Roadmap

### Phase 4: Modals (Day 3)
- [ ] Create base Modal component
- [ ] Create WalletModal
- [ ] Create ContactModal
- [ ] Create LegalModal (Privacy, Terms, Cookie)
- [ ] Create BackToTopButton

### Phase 5: Subpages (Day 4-5)
- [ ] Create PageHero reusable component
- [ ] Create Solutions page
- [ ] Create Technology page
- [ ] Create Tokenomics page
- [ ] Create Docs index page
- [ ] Create About page
- [ ] Create 404 page

### Phase 6: Polish (Day 5-6)
- [ ] Add all SEO metadata
- [ ] Create sitemap.ts and robots.ts
- [ ] Performance optimization (images, fonts)
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

---

## 🧪 TESTING CHECKLIST

### Navigation
- [ ] Logo links to home on all pages
- [ ] All nav links work and highlight active page
- [ ] Mobile menu opens/closes correctly
- [ ] Mobile menu links work and close menu

### Modals
- [ ] Wallet modal opens from nav button
- [ ] Wallet modal closes on X, overlay, Escape
- [ ] Contact modal opens from footer
- [ ] Legal modals open from footer links

### Animations
- [ ] Loading screen shows then fades
- [ ] Hero elements reveal in sequence
- [ ] Scroll animations trigger once
- [ ] Expandable cards animate smoothly
- [ ] Parallax background moves on scroll

### Responsive (test all pages)
- [ ] 1440px — full desktop layout
- [ ] 1024px — adjusted spacing
- [ ] 768px — tablet layout, mobile nav
- [ ] 390px — mobile layout

### Performance
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 90+
- [ ] Lighthouse Best Practices: 90+
- [ ] Lighthouse SEO: 90+
- [ ] No console errors

---

## 📚 REFERENCE FILES

Design reference (copy visual patterns from):
- `/_archive/index.html` — Home page HTML
- `/_archive/css/shared.css` — All CSS styles
- `/_archive/js/shared.js` — All JavaScript

These files are archived for reference only. Do NOT modify them.

---

## ⚡ QUICK COMMANDS

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Preview production build
npm run start
```

---

## 🚀 DEPLOYMENT

**Platform:** Vercel  
**Repository:** GitHub (TAG-IT-NETWORK/tagit-web)  
**Branch:** main → Production  
**Preview:** All PRs get preview deployments

```bash
# Deploy (automatic on push to main)
git push origin main

# Manual deploy
vercel --prod
```

---

## 📝 NOTES

- Current HTML site archived in `/_archive/` for design reference
- All images already optimized, copy from `/_archive/assets/images/`
- Wallet connection is UI-only for now (no actual Web3 integration yet)
- Docs will eventually connect to headless CMS (Notion or Sanity)
