# Project Retrospective & Engineering Post-Mortem
**Platform:** `tortilladepatatas.org`  
**Date:** September 2026  
**Scope:** Architectural evolution, design system execution, problem resolutions, and key learnings.

---

## 1. Executive Summary & Vision

`tortilladepatatas.org` was conceived to address a pervasive deficiency in modern digital culinary media: the ubiquity of generic, unverified "AI-slop" recipe content, ungrounded folk myths, and superficial listicles. 

Instead of building another disposable recipe blog, the project set out to create:
1. **A Living Encyclopedia & Knowledge Graph:** Connecting ingredients, regional traditions, historical documentation, and scientific principles into a three-level entity hierarchy.
2. **A Rigorous Mathematical Constructor:** Replacing imprecise volumetric measurements ("a splash of oil", "a pinch of salt") with mass-based ratios, pan-diameter geometry, and thermal denaturation curves.
3. **An Uncompromising Microbiological Standard:** Formally embedding food safety parameters (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours** ambient threshold, **<8°C** refrigeration) into all consumer and professional calculations.
4. **A Skeuomorphic-Modernist "Kitchen Notebook" Aesthetic:** Combining tactile parchment textures, notebook card margins, and high-contrast typography with modern web performance (sub-100ms TTFB, zero-login persistence, and dark mode ergonomics).

---

## 2. Chronological Record of Accomplishments

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         EVOLUTIONARY TIMELINE                                │
└──────────────────────────────────────────────────────────────────────────────┘
  Phase 1: Foundations & Architecture
  ├── Astro 5 Static Site Generation + React 18 Hydration Islands
  ├── Trilingual i18n URL Routing (/es, /en, /de) with synchronized hreflang
  ├── Zod-validated Content Collections (Recipes, Factions, Ingredients, History)
  └── "Kitchen Notebook" Design System (Runny Yolk Gold, Frit Cream, Umber)

  Phase 2: Laboratorio & Mathematical Engines
  ├── Parametric Tortilla Builder (egg:potato ratio, pan size, runniness index)
  ├── Multi-Dimensional Recipe Comparator (radar charts, technical metrics)
  ├── 200+ Trivia Challenge Engine across 4 difficulty tiers
  ├── Faction Affinity Quiz & Political Alignment Engine
  └── WorldState Simulator with Local Storage CLI ("tortilla flip", "dance")

  Phase 3: Deep Integrations & Production Hardening
  ├── Universal Obsidian-Umber Dark Mode with Zero-FOUC inline script
  ├── Cooklang Export Engine (.cook) for digital recipe managers
  ├── Printable Kitchen Prep Sheet PDF Generator with safety notices
  ├── Static & Dynamic SVG Generation Pipeline for Skillets & Cross-Sections
  ├── Escandallo / Pro Cost Calculator for hospitality margins & yield
  └── URL-Encoded Single-Source-of-Truth Persistence (Zero-login sharing)
```

### Key Technical Implementations:

### A. The Parametric Tortilla Builder
- **Dynamic Physics & Math:** Converts raw ingredient weights into precise thermal mass calculations. Accounts for potato dry-matter starch absorption, oil uptake (~8-10% by mass during frying), and pan surface area based on skillet diameter (18cm to 28cm).
- **URL-Encoded State Engine:** Rather than forcing user accounts and databases, all builder parameters are serialized into clean URL queries (`?eggs=6&potatoes=600&onion=true...`). This delivers instant bookmarkability, zero server friction, and direct social sharing.

### B. Analytical Recipe Comparator
- Provides side-by-side technical breakdowns of iconic preparations:
  - **Betanzos Style:** Kennebec potato, high yolk-to-white ratio, liquid center, zero onion.
  - **Clásica sin Cebolla:** Pure potato, egg, and EVOO balance; medium curd firmness.
  - **Vanguardista / Modernist:** Low-temperature confit, potato chip siphons, or deconstructed warm emulsions.
  - **Vasca / Con Cebolla:** Long-poached caramelized onion sweetening, higher moisture retention.

### C. Escandallo & Professional Cost Engine (`/escandallo`)
- Designed for bars, restaurants, and catering services.
- Calculates ingredient food cost, waste/peeling loss percentage (15-20% on potatoes), energy consumption (induction vs. gas), labor overhead, portion yield (pinchos per tortilla), and target gross margins (65%–75%).

### D. Export Engines (Cooklang, PDF & Vector SVG)
- **Cooklang Exporter (`.cook`):** Standardizes recipes into plain-text markup for integration into native cooking apps.
- **Client-Side PDF Generator:** Produces vectorized, print-ready kitchen prep cards including microbiological food safety alerts.
- **SVG Generation Pipeline:** Pre-renders SVG cross-sections during build time (`scripts/generateRecipeSvgs.ts`) and provides a real-time vector studio in `/laboratorio/svg-generator`.

---

## 3. Comprehensive Log of Errors, Root Causes & Permanent Fixes

During the development and testing cycles across containerized preview environments (Cloud Run) and production static builds, several edge cases and critical bugs were uncovered and resolved:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DEBUGGING & LESSONS MATRIX                            │
├───────────────────────┬──────────────────────────┬──────────────────────────┤
│ Issue Encountered     │ Root Cause               │ Permanent Resolution     │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 1. 403 Forbidden on   │ Vite 6 host validation   │ Added server.allowedHosts│
│    Astro Islands      │ blocked *.run.app hosts  │ in astro.config.mjs      │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 2. Virtual Module 500 │ URL-encoded module IDs   │ Custom Vite middleware   │
│    on Hydration       │ broke Astro preambles    │ plugin intercepting IDs  │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 3. SSR Hydration      │ window.location href     │ Deterministic canonical  │
│    Mismatch in Share  │ differed server vs client│ URLs + useEffect mount   │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 4. Node.js FS in      │ Barrel file re-exported  │ Segregated build scripts │
│    Client Bundles     │ server-only generator    │ from domain modules      │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 5. Double Port Flag   │ Duplicate --port 3000    │ Cleaned npm dev script   │
│    in Container dev   │ caused process clash     │ in package.json          │
└───────────────────────┴──────────────────────────┴──────────────────────────┘
```

### Detailed Case Analyses:

#### 1. Vite `server.allowedHosts` Restriction
- **Symptom:** Astro client islands (`<Hero client:load />`, `<BuilderApp client:load />`) returned `403 Forbidden` in Cloud Run previews, preventing JavaScript execution.
- **Root Cause:** Modern Vite versions reject incoming HTTP requests whose `Host` header does not match `localhost` or explicitly allowed hosts. In reverse-proxied Cloud Run environments, the host header is dynamically assigned (`ais-dev-*.run.app`).
- **Fix:** Set `vite.server.allowedHosts: true` in `astro.config.mjs`.

#### 2. Virtual Module Preamble Failure (`before-hydration.js`)
- **Symptom:** Dev server console errors reported that `/@id/astro:scripts/before-hydration.js` was receiving HTML error responses instead of JavaScript.
- **Root Cause:** Vite's internal virtual file resolver did not recognize URL-encoded requests (`/@id/astro%3Ascripts/before-hydration.js`) routed through container proxy layers.
- **Fix:** Implemented a lightweight Vite development middleware plugin (`virtualModuleMiddlewarePlugin`) in `astro.config.mjs` that decodes requested URIs and directly streams valid JavaScript headers (`Content-Type: text/javascript; charset=utf-8`).

#### 3. React 18 SSR Hydration Attribute Mismatch
- **Symptom:** React hydration error in console on `<RecipeComparator>` and `<ShareButtons>`: server-rendered `href` attributes on WhatsApp, Twitter, and Email links did not match client attributes.
- **Root Cause:** The component evaluated `typeof window !== 'undefined' ? window.location.href : ''`. On the server during Astro pre-rendering, this fell back to an empty string, whereas on the client it resolved to the active browser URL.
- **Fix:** Refactored all sharing logic to construct deterministic canonical URLs (`https://tortilladepatatas.org/${lang}/...`) identical between server and client. Any dynamic runtime URL overrides are deferred to `useEffect` post-mount.

#### 4. Node.js Filesystem Pollution in Client Bundles
- **Symptom:** Client compilation errors when building client islands referencing SVG generators: `Module "node:fs" has been externalized for browser compatibility`.
- **Root Cause:** An index barrel file (`src/domain/svg/index.ts`) exported both browser-safe SVG template generators and Node CLI file-writing utilities (`generateRecipeSvgs.ts`).
- **Fix:** Strictly segregated CLI scripts into `/scripts/` and ensured all `/src/domain/` libraries contain zero Node-native runtime dependencies.

---

## 4. Key Learnings & Engineering Principles

1. **Astro + React Hybrid Strategy:**
   - Static-by-default is optimal for culinary and educational encyclopedias. Island hydration must only be applied where real-time interactivity is necessary (calculators, quizzes, simulators).
2. **Deterministic Server Rendering:**
   - Never query browser globals (`window`, `localStorage`, `navigator`, `document`) during component rendering. Initialize state with deterministic server defaults, and synchronize client-only state inside `useEffect`.
3. **URL as the Universal Database:**
   - In consumer-facing web tools, URL query serialization has significantly lower friction than user accounts and remote databases. It eliminates authentication barriers, enables frictionless sharing, and naturally supports browser history.
4. **Mandatory Safety Formatting:**
   - Regulatory food safety requirements (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours** ambient limit) must be visually emphasized and programmatically guarded across all recipes and calculator outputs.

---

*Document compiled and verified against project test suite (33 test suites, 203 unit tests passing).*
