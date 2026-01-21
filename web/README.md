# TAG IT Network

**Blockchain-powered product authentication platform.**

🌐 **Live Site:** [tagit.network](https://tagit.network)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS + Framer Motion |
| **Deployment** | Vercel (auto-deploy from GitHub) |
| **Repository** | GitHub |

---

## About

TAG IT Network integrates NFC, AI, and blockchain technology for product authentication and tracking. The platform creates cryptographic digital twins for physical products, enabling:

- **Instant verification** via NFC tap
- **Immutable provenance** on blockchain
- **Supply chain traceability** from manufacturer to consumer
- **Anti-counterfeiting** protection for luxury goods, pharmaceuticals, and more

---

## Project Structure

```
tagit-web/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── layout/             # Navbar, Footer, MobileMenu
│   ├── ui/                 # Buttons, Cards, Modals
│   ├── sections/           # Page sections (Hero, Features, etc.)
│   ├── animations/         # Animation components
│   └── modals/             # Modal components
├── lib/                    # Utilities, constants, animation variants
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── _archive/               # Legacy HTML reference (design only)
```

---

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Deployment

Auto-deploys to Vercel on push to `main` branch.

**Manual deployment:**
```bash
vercel --prod
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| **[CLAUDE.md](./CLAUDE.md)** | Development instructions, design system, implementation guide |
| **[PRD-WEB-001.md](./PRD-WEB-001.md)** | Product requirements and project phases |

---

## Design Reference

The current static HTML site (in root and `_archive/`) serves as the design reference for the Next.js migration:

- `index.html` — Home page (reference standard, 95/100)
- `css/shared.css` — Complete design system with CSS variables
- `js/shared.js` — Animation patterns and interactions

---

## Links

- **Website:** [tagit.network](https://tagit.network)
- **Twitter/X:** [@TAGITNETWORK](https://x.com/TAGITNETWORK)
- **LinkedIn:** [TAG IT Network](https://www.linkedin.com/company/106815890)
- **YouTube:** [@TAGITNetwork](https://www.youtube.com/@TAGITNetwork)
- **GitHub:** [TAG-IT-NETWORK](https://github.com/TAG-IT-NETWORK)

---

## License

© 2026 TAG IT Network. All rights reserved.
