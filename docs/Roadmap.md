# Product & Engineering Roadmap — tortilladepatatas.org

This document outlines the strategic roadmap for `tortilladepatatas.org`, organizing key milestones into executed foundation phases and upcoming expansion initiatives.

---

## Roadmap Overview

```
Phase 1: Foundation & Content Engine [COMPLETED]
   └── Core Astro 5 Setup, Multi-language Routing (ES/EN/DE), Skeuomorphic Design System

Phase 2: Interactive Tools & Faction Experience [COMPLETED]
   └── Tortilla DNA Builder, Faction Matrix & Comparator, Food Safety Temperature Monitor

Phase 3: Observability, Security & Production Hardening [IN PROGRESS / NEXT]
   └── Sentry Integration, Security Headers & CSP, Automated Content Testing CI/CD

Phase 4: Community Engagement & Crowd Faction Voting [PLANNED]
   └── Faction Loyalty Polls, User Recipe Submissions, Interactive Cook Timer

Phase 5: Progressive Web App & Offline Field Companion [PLANNED]
   └── PWA Support, Offline Kitchen Mode, Print-Ready "Recipe Cards" & PDF Export
```

---

## Phase Breakdown

### Phase 1: Core Foundation & Content Engine ✅ (Completed)
* [x] **Astro 5 & React 18 Architecture**: Blazing fast static site generation with dynamic client islands.
* [x] **Native Multilingual Routing**: Full i18n support for Spanish (`es`), English (`en`), and German (`de`).
* [x] **"Kitchen Notebook" Design System**: Custom Tailwind palette with Yolk Gold (`#FFB800`), Parchment (`#F5E6BE`), and Umber (`#8D6E63`).
* [x] **Taxonomy-Driven Data Collections**: Type-safe Zod schemas for recipes, factions, ingredients, techniques, and regions.
* [x] **Food Safety Standards Integration**: Hardcoded pasteurization parameters (**70°C for 2 min**, **63°C for 20 sec**, **<4h** threshold).

### Phase 2: Interactive Culinary Islands ✅ (Completed)
* [x] **Tortilla DNA Builder**: Dynamic slider-based calculator adjusting egg-to-potato ratios, pan diameters, and salt scaling.
* [x] **Faction Matrix & Comparator**: Side-by-side comparative analysis of Puristas, Concebollistas, Pimientistas, Ajistas, and 'Con Cosas'.
* [x] **Safety Temperature Inspector**: Real-time thermal gauge validating cook time and ambient exposure risks.
* [x] **Rich Hero Media Layouts**: Full-width faction hero images and responsive recipe grids.

### Phase 3: Observability, Error Monitoring & Security 🔄 (Current Milestone)
* [ ] **Sentry Monitoring Integration**:
  * Install `@sentry/astro` or `@sentry/react` for real-time error reporting and client exception tracking.
  * Configure environment-aware error reporting (Development vs. Production).
  * Capture client-side calculation errors in the Builder & Safety Monitor islands.
* [ ] **Content Security Policy (CSP) & HTTP Headers**:
  * Configure strict header rules for frame protection, XSS mitigation, and referrer policy (`no-referrer` for external media).
* [ ] **Automated CI/CD Quality Gates**:
  * Integrate GitHub Actions to run `npm run lint` and `vitest run` on pull requests.

### Phase 4: Community & Crowd Faction Voting 🔮 (Q3 2026)
* [ ] **Interactive Faction Census**:
  * Anonymous crowd voting for users to pledge allegiance to their preferred faction (Purista vs. Concebollista).
* [ ] **User Recipe Submissions**:
  * Open-source JSON contribution workflow allowing community chefs to submit new regional recipes.
* [ ] **Interactive Kitchen Step Timer**:
  * Voice-assisted or audio-cued flipping timer guiding home cooks through frying, resting, and flipping (*vuelta a la tortilla*).

### Phase 5: PWA & Offline Kitchen Companion 🔮 (Q4 2026)
* [ ] **Progressive Web App (PWA)**:
  * Service worker caching for offline access to recipes and safety temperature guides in low-connectivity kitchens.
* [ ] **Printable "Recipe Notebook Cards"**:
  * Styled CSS `@media print` sheets formatted like vintage index cards.
* [ ] **Expanded Regional Taxonomies**:
  * In-depth regional deep dives into Basque (*Tortilla de Donostia*), Galician (*Betanzos*), Andalusian (*Tortilla Paisana*), and Madrid variations.
