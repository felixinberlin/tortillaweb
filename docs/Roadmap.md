# Product & Engineering Roadmap — tortilladepatatas.org

> **"The Master Blueprint for the World's First Interactive Spanish Omelette Ecosystem."**

---

## 📚 Specialized Strategy & Retrospective Documents
- **Complete Retrospective & Post-Mortem:** [`/docs/PROJECT_RETROSPECTIVE.md`](/docs/PROJECT_RETROSPECTIVE.md) (Architecture, debug cases, learnings, and solutions).
- **Knowledge Graph & Content Roadmap:** [`/docs/CONTENT_ROADMAP.md`](/docs/CONTENT_ROADMAP.md) (Archival research, CSIC science, and regional deep-dives).
- **SEO & Commerce Monetization Roadmap:** [`/docs/SEO_AND_COMMERCE_ROADMAP.md`](/docs/SEO_AND_COMMERCE_ROADMAP.md) (Programmatic SEO, affiliate gear, B2B escandallo, and certification).

---

## Phase 1: Foundations, Design System & Content Architecture (COMPLETED ✅)
- [x] **Astro 5 + React 18 Islands Setup**: High-performance static site generation with dynamic client hydration for interactive tools.
- [x] **"Kitchen Notebook" Design System**: Implemented skeuomorphic-modernist UI components, parchment card edges, Yolk Gold (`#FFB800`), Frit Cream (`#F5E6BE`), and Caramelized Umber (`#8D6E63`).
- [x] **Multilingual i18n Routing**: Native URL structures for Spanish (`/es`), English (`/en`), and German (`/de`).
- [x] **Content Collection & Taxonomy Engine**: Zod-validated collection schemas for recipes, regional styles, factions, ingredients, and historical personas.
- [x] **Food Safety Rules Engine**: Integrated **70°C for 2 minutes** gold pasteurization standard, **63°C for 20 seconds** runny yolk safety threshold, and **4 hours** max ambient exposure limits.

---

## Phase 2: Interactive Laboratorio, Dark Mode & Gaming Engine (COMPLETED ✅)
- [x] **Tortilla Builder / Constructor**: Ratio calculator adjusting egg-to-potato weight, oil temperature, salt precision, calorie estimations, and runniness index.
- [x] **Style Comparator**: Side-by-side analytical comparison matrix for Betanzos vs Clásica vs Vasca styles with radar charts.
- [x] **Plebiscitos & Polls**: Community voting system on onion debates, potato slicing styles, and oil varieties.
- [x] **Orthodoxy Test & Quizzes**: Interactive quiz engine determining faction allegiance (Concebollistas vs Puristas vs Betanceiros vs Vanguardistas).
- [x] **Trivia Challenge Game**: 200+ trivia questions with difficulty levels (Novato, Sartenero, Maestro, Leyenda) and instant explanations.
- [x] **WorldState Simulator & CLI**: Persistent real-time state engine in `localStorage` supporting direct action buttons (*Dance*, *Express Disappointment*, *Flip*, *Check Temp*) and embedded Terminal CLI (`tortilla dance`, `tortilla disappoint`, `tortilla status`, `tortilla log`).
- [x] **Skeuomorphic Dark Mode Engine**: Universal dark theme with FOUC prevention script, local storage persistence, top-nav & drawer toggles, and warm obsidian/umber dark palette (`#1C1917`, `#262220`).

---

## Phase 3: Media, Exporters, Sharing & Professional Suite (COMPLETED ✅)
- [x] **URL-Encoded Single-Source-of-Truth Sharing**:
  - Full parametric recipe state serialized into URL queries (`/builder?eggs=6&potatoes=600&onion=true...`), enabling instant sharing without user accounts.
  - Multi-platform sharing integration (WhatsApp, Telegram, Twitter, Email, Native Web Share) with deterministic canonical fallback.
- [x] **Printable Kitchen Prep Sheet (PDF Generator)**:
  - Client-side vectorized PDF export with parchment styling, exact gram scales, pan diameter diagrams, and microbiological safety warnings (**70°C for 2 minutes**).
- [x] **Cooklang Universal Export (`.cook`)**:
  - Direct conversion of any standard or custom recipe into plain-text Cooklang syntax for native cooking software.
- [x] **Static & Dynamic Vector SVG Studio**:
  - Pre-render SVG generation pipeline (`scripts/generateRecipeSvgs.ts`) running prior to builds.
  - Interactive SVG studio (`/laboratorio/svg-generator`) supporting cross-section, top-skillet, and technical blueprint views.
- [x] **Escandallo / Pro Food-Cost Calculator (`/escandallo`)**:
  - B2B cost tool for tapas bars calculating potato peel loss, oil absorption, energy, labor, and pincho profit margins.

---

## Phase 4: Hands-Free Kitchen Assistant & Programmatic SEO (IN PROGRESS 🚀)
- [x] **Interactive Cooking Timer & Hands-Free Audio Companion (`/asistente`, `/timer`)**:
  - Step-by-step pan flip audio assistant with Web Audio synthesized cues (metronome, flip chime, 3-2-1 acoustic countdown, step arpeggios), Web Speech voice guidance in ES, EN, and DE, Screen Wake Lock API to prevent screen sleeping, circular SVG countdown gauge, and microbiological safety verification (**70°C for 2 minutes**, **63°C for 20 seconds**, max **4 hours** ambient).
- [ ] **Programmatic Ratio Landing Matrix**:
  - High-intent programmatic routes (`/receta/tortilla-de-patatas-para-4-personas`) with auto-scaled ingredients and server-rendered `Recipe` JSON-LD.
- [ ] **Community WorldState Aggregator**:
  - Synchronized global counters tracking total pan flips, dances, and disappointments across all users.

---

## Phase 5: Commerce, Accreditation & Gastronomic Map (PLANNED 🔮)
- [ ] **Curated Kitchen Gear & Affiliate Integration**:
  - Seamless equipment recommendations for double-turner skillets, thermocouple food thermometers, Benriner mandolines, and monovarietal EVOO.
- [ ] **Gastronomic Bar & Restaurant Directory**:
  - Geocoded interactive map locator for authentic tortilla bars across Spain (Betanzos, Madrid, Bilbao, San Sebastián).
- [ ] **Digital Certification of Orthodoxy & Food Safety**:
  - Verification badge for bars complying with authentic techniques, olive oil standards, and thermal safety rules (**70°C for 2 minutes** or pasteurized eggs).
- [ ] **Open Tortilla API (`api.tortilladepatatas.org`)**:
  - REST and GraphQL endpoints delivering structured JSON for recipes, nutrition, trivia, and historical manuscripts.
