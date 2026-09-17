# Cuaderno de Cocina: The Cozy Kitchen Notebook Architecture

> **Document Type**: UX & Editorial Architecture Guide  
> **Target**: `tortilladepatatas.org`  
> **Last Updated**: 2026-09-15  

---

## 1. Overview & Vision

`tortilladepatatas.org` combines historical and scientific rigor with the emotional warmth of home cooking. While the platform houses comprehensive scientific databases (denaturation curves, microbiological inactivation, historical transcripts from 1798), the user interface—especially the homepage—is intentionally styled as a **tactile, lovingly curated Kitchen Recipe Notebook ("El Cuaderno de la Abuela")**.

This prevents the website from feeling like a cold academic repository or a generic SaaS application. Instead, it feels like opening an heirloom cooking journal splattered with olive oil and annotated with handwritten margin notes.

---

## 2. Core Visual & Editorial Principles

### A. Sensory Copywriting Over Corporate / Tech Jargon
- **Forbidden**: "Knowledge graph database", "Parametric ingestion pipeline", "Deep learning optimization", "SaaS dashboard".
- **Encouraged**:
  - *Confitado lento en aceite de oliva virgen extra* (Slow poaching in EVOO).
  - *Yema cremosa y desbordante para mojar pan* (Creamy, runny yolk asking to dip crusty bread).
  - *El reposo sagrado de 10 minutos* (The sacred 10-minute warm egg soak).
  - *El volteo decidido con plato llano* (The confident flip with a wide flat plate).

### B. The Notebook Aesthetic System
- **Backgrounds**: Soft warm parchment tones (`#FAF7F0` in light mode, `#1C1917` in dark mode).
- **Cards**: `card-notebook` with subtle border lines, rounded-3xl corners (16–24px), stacked parchment elevation, and decorative elements (push-pins 📌, tape marks, script annotations).
- **Typography Pairing**:
  - Display & Headings: Classical warm serif (`font-serif-heading`).
  - Marginalia & Notes: Tactile handwriting script (`font-script`).
  - Functional Metadata: Crisp, legible sans-serif with bold figures.

---

## 3. Homepage Component Architecture

```
/src/pages/[lang]/index.astro
│
├── <Hero lang={currentLang} client:load />
│   └── Warm welcome banner, tactile CTA buttons, ingredient & doneness pills,
│       and interactive skillet visualizer (<InteractiveHeroTortilla />).
│
├── <AuthorityStatsBanner lang={currentLang} recipeCount={recipeCount} client:load />
│   └── 4 culinary pride pillars: 25 authentic recipes, 100% AOVE slow confit,
│       the 10-minute egg soak, and the 70°C for 2 minutes / 63°C for 20 seconds standard.
│
└── <MainHubDirectory lang={currentLang} client:load />
    ├── 1. Interactive Craving Selector & Four Canonical Recipe Cards
    │      Filter by mood: runny/melosa, sweet onion, purist classic, express chips, or country ham.
    │      Cards display prep time, ideal skillet diameter, and bread/drink pairings.
    │
    ├── 2. "Los Tres Secretos de la Abuela" (The Slow Kitchen Ritual)
    │      Step 01: Low-temp confit (130°C–140°C).
    │      Step 02: Warm egg soak (10 minutes for starch hydration).
    │      Step 03: Confident flat-plate flip.
    │
    ├── 3. "Notas al Margen de la Abuela" (Notebook Margin Cards)
    │      Practical heirloom wisdom: the potato bubble test, the damp plate trick,
    │      and food safety guidance framed as family care.
    │
    └── 4. "Rincones del Cuaderno" (Four Kitchen Doorways)
           Custom Builder, Onion Debate, 1798 Manuscript, and the Kitchen Assistant & Timer.
```

---

## 4. Food Safety Integration Matrix

Food safety is woven into the narrative as care and craftsmanship:

| Target Temperature / Duration | Narrative Context | Safety Standard |
| :--- | :--- | :--- |
| **70°C for 2 minutes** | Picnics, lunchboxes, leftovers, or vulnerable diners | Complete bactericidal inactivation of *Salmonella* |
| **63°C for 20 seconds** | Jugosa / Betanzos style | Commercial pasteurization equivalent; consume immediately warm |
| **4 hours** | Ambient room temperature limit | Safe window before disposal of runny tortillas |
| **<8°C** | Refrigeration threshold | Safe chilled storage |

---

## 5. Trilingual Parity (`es`, `en`, `de`)

All components must maintain localized sensory vocabulary:
- **Spanish (`es`)**: *Desbordante y melosa*, *para mojar pan*, *confitada a fuego lento*.
- **English (`en`)**: *Runny and velvety*, *crusty bread dipping*, *slowly poached in olive oil*.
- **German (`de`)**: *Goldener Schmelz*, *flüssiger Kern zum Eintauchen*, *sanft geschmorte Kartoffeln*.

---

## 6. Testing & Quality Checklist

1. `npm run lint`: Verify zero syntax or unused import warnings.
2. `compile_applet`: Verify successful static pre-rendering in all 3 language routes (`/es`, `/en`, `/de`).
3. `tests/safetyRules.test.ts`: Ensure all mandatory bolded figures (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours**, **<8°C**) pass verification tests.
