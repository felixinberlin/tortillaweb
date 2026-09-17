# Master Documentation Index — tortilladepatatas.org

Welcome to the comprehensive documentation index for **`tortilladepatatas.org`** — the living encyclopedia, culinary science laboratory, and cultural knowledge graph dedicated to the authentic Spanish Omelette (*Tortilla de Patatas*).

All canonical documentation, architectural designs, research papers, and data schemas reside in the [`/docs/`](./docs/) directory.

---

## 🧭 Reading Pathways

| Persona | Recommended Starting Point | Next Steps |
| :--- | :--- | :--- |
| **New Developers** | [Developer Guide](./docs/DEVELOPER_GUIDE.md) | [Architecture](./docs/Architecture.md) → [Testing Strategy](./docs/TESTING.md) |
| **UI/UX Designers** | [Design System](./docs/DESIGN_SYSTEM.md) | [AI Agent Playbook](./docs/AI_AGENT_PLAYBOOK.md) |
| **Culinary Writers & Editors** | [Editorial Strategy](./docs/EDITORIAL_STRATEGY.md) | [Content Roadmap](./docs/CONTENT_ROADMAP.md) → [Taxonomy Model](./docs/taxonomy-driven-content-model.md) |
| **Food Scientists & Historians** | [Research Archive](./docs/research/) | [Culinary Science Dataset](./docs/03_Culinary_Science_and_Safety.json) → [References](./docs/REFERENCES.md) |
| **Platform Engineers / DevOps** | [AI Agent Playbook](./docs/AI_AGENT_PLAYBOOK.md) | [Security & Thermal Posture](./docs/Security.md) → [SEO Strategy](./docs/SEO.md) |

---

## 📑 Complete Document Directory

### 1. Technical Architecture & Engineering Specifications
Foundational blueprints, rendering pipelines, state simulation models, and mathematical engines:

- **[System Architecture (EN)](./docs/Architecture.md)**: Full architecture breakdown — Astro 5 Static Site Generation (SSG), React 18 Islands hydration, Tailwind CSS v4, WorldState Simulator engine, Vitest, and Playwright suites.
- **[Arquitectura del Sistema (ES)](./docs/Arquitectura.md)**: Especificación técnica completa en español con diagramas de componentes, flujos de datos y diseño modular.
- **[Internationalized Routing Architecture](./docs/ROUTING_ARCHITECTURE.md)**: Tri-lingual static routing model (`/es/`, `/en/`, `/de/`), URL generation, language switcher synchronization, and 404 handling.
- **[Tortilla DNA & Comparator Architecture](./docs/TORTILLA_DNA_AND_COMPARATOR_ARCHITECTURE.md)**: Mathematical specification of the DNA hash encoding algorithm, ingredient ratios (egg-to-potato mass, hydration, runniness index), and the multi-style visual comparator.
- **[Taxonomy-Driven Content Model](./docs/taxonomy-driven-content-model.md)**: Structured Astro content collections, Zod validation schemas, entity relationships, and the 6 master trivia categories.

---

### 2. Developer Guides, Workflows & Operational Playbooks
Onboarding instructions, deployment standards, local testing patterns, and agent operations:

- **[Developer Guide](./docs/DEVELOPER_GUIDE.md)**: Complete developer setup, Node.js toolchains, npm command reference, CLI tools, and production build verification.
- **[AI Agent Playbook](./docs/AI_AGENT_PLAYBOOK.md)**: Production engineering playbook, Cloud Run reverse proxy configurations (`server.allowedHosts`), Astro 5 cross-origin hydration security (`secFetchMiddleware`), and vector SVG generation.
- **[Testing & Quality Assurance](./docs/TESTING.md)**: Unit, integration, and end-to-end testing matrix using Vitest and Playwright. Covers food safety mathematical boundaries and assertion suites.
- **[Security & Food Safety Posture](./docs/Security.md)**: Technical security guidelines, CSP headers, XSS prevention in client state, vulnerability disclosures, and critical thermal standards (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours** limit).
- **[SEO & Internationalization Strategy](./docs/SEO.md)**: Search Engine Optimization setup: schema.org `Recipe` metadata, alternate `hreflang` tags, dynamic Open Graph banners, and XML sitemaps.

---

### 3. Design System & Editorial Intelligence
Visual styling tokens, typography scales, voice standards, and knowledge curation principles:

- **[Design System: "Kitchen Notebook"](./docs/DESIGN_SYSTEM.md)**: The official skeuomorphic-modernist UI identity. Defines parchment textures, notebooks tabs, elevation rules, responsive spacing, and brand color tokens:
  - *Runny Yolk Gold*: `#FFB800`
  - *Frit Potato Cream*: `#F5E6BE`
  - *Caramelized Onion Umber*: `#8D6E63`
  - *Pilot Light Blue*: `#00A3FF`
  - *Safety Threshold Orange*: `#FF8A00`
  - *Bactericidal Crimson*: `#D32F2F`
- **[Editorial Strategy & Content Directives](./docs/EDITORIAL_STRATEGY.md)**: Standards for voice, curiosity, humor, and rigour. Strict differentiation between **Fact** (documented history), **Legend** (oral folklore), and **Opinion** (culinary debates). Zero tolerance for AI-generated filler.

---

### 4. Vision, Strategy, Roadmaps & Retrospectives
Long-term aspirations, milestones, business horizons, and engineering post-mortems:

- **[Project Idea & Core Philosophy](./docs/Idea.md)**: The original manifesto: why the Spanish Omelette deserves an authoritative, interactive cultural archive free of commercial fluff.
- **[Product & Engineering Roadmap](./docs/Roadmap.md)**: Complete 5-phase roadmap tracking foundational features, interactive laboratories, optimization phases, and community milestones.
- **[Content Research Roadmap](./docs/CONTENT_ROADMAP.md)**: Expansion roadmap detailing upcoming CSIC archival investigations, regional culinary custom documentation, and deep-dive timelines.
- **[SEO & Commerce Monetization Roadmap](./docs/SEO_AND_COMMERCE_ROADMAP.md)**: Long-term sustainability blueprint: programmatic regional recipe pages, artisanal gear curation, B2B restaurant calculators (*escandallo*), and certification systems.
- **[Project Engineering Retrospective](./docs/PROJECT_RETROSPECTIVE.md)**: Architectural analysis, solved engineering edge cases, performance benchmarks, and post-mortem insights.

---

### 5. Research Archives, Cultural History & Datasets
Academic citations, primary sources, raw multilingual transcripts, and structured trivia compendiums:

- **[Research Archive Folder (`/docs/research/`)](./docs/research/)**:
  - `facciones-es.txt`, `facciones-en.txt`, `facciones-de.txt`: Multilingual analysis of the onion (*concebollista*) vs. non-onion (*sincebollista*) and runny (*jugosa*) vs. firm (*cuajada*) cultural schisms.
  - `historia-es.txt`, `historia-en.txt`, `historia-de.txt`: Archival timelines from the 1798 Villanueva de la Serena treatises to General Zumalacárregui legends and 20th-century national competitions.
  - `personas.txt`: Detailed user personas and culinary profiles.
  - `stories.txt`: Narrative field stories, regional anecdotes, and kitchen folklore.
- **[The Ultimate Vault of Omelette Secrets (200 Trivia Items)](./docs/200-ultimate-tortilla-trivia-en.md)**: 200 vetted facts and curiosities.
- **[Supplementary Trivia & Verification Notes (100 Trivia Items)](./docs/100-extra-trivia-en.md)**: Additional 100 deep-dive verified entries.
- **Master Category Trivia Datasets**: Exported structured JSON and CSV collections:
  - `00_Master_Category_Overview` (`.json` / `.csv`)
  - `01_History_and_Foundations` (`.json` / `.csv`)
  - `02_Regional_Traditions` (`.json` / `.csv`)
  - `03_Culinary_Science_and_Safety` (`.json` / `.csv`)
  - `04_Pop_Culture_and_Media` (`.json` / `.csv`)
  - `05_World_Records_and_Events` (`.json` / `.csv`)
  - `06_Factions_and_Debates` (`.json` / `.csv`)
  - `All_Trivia_By_6_Big_Categories` (`.json` / `.csv`)
  - `trivia_veracity_report_201_300.csv`
- **[References & Bibliography](./docs/REFERENCES.md)**: Comprehensive academic citations, food chemistry literature, CSIC studies, and historical culinary treatises.

---

### 6. Legal, Compliance & Open Source Licensing
Regulatory declarations and software rights:

- **[License](./docs/License.md)**: Software licensed under MIT License; culinary research text and educational data licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
- **[Aviso Legal](./docs/Aviso-Legal.md)**: Mandatory Spanish legal notice in accordance with Law 34/2002 (LSSI-CE).
- **[Impressum](./docs/Impressum.md)**: Legal disclosure pursuant to § 5 of the German Digital Services Act (DDG).
