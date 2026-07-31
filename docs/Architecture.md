# Technical Architecture — tortilladepatatas.org

> *Note: For the detailed Spanish documentation, please see [Arquitectura.md](./Arquitectura.md).*

## Tech Stack Overview

`tortilladepatatas.org` is built using the **React Islands pattern on Astro 5**:

* **Core Framework**: [Astro 5](https://astro.build/) (Static Site Generation + i18n Routing).
* **Interactive Islands**: [React 18](https://react.dev/) (Tortilla Recipe Builder, Faction Comparator, Safety Monitor).
* **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/) + "Kitchen Notebook" Design System (`#FFB800` Yolk Gold, `#F5E6BE` Parchment, `#8D6E63` Umber).
* **Validation**: [Zod](https://zod.dev/) Zod schema validation for Astro Content Collections.
* **Testing**: [Vitest](https://vitest.dev/) for unit and integration testing.

---

## Directory Organization

```
/
├── docs/                             # Project Documentation
│   ├── Idea.md                       # Vision, philosophy & project pillars
│   ├── Arquitectura.md               # Technical architecture (Spanish)
│   ├── Architecture.md               # Technical architecture (English summary)
│   ├── DESIGN_SYSTEM.md              # Style guide & "Kitchen Notebook" theme
│   ├── taxonomy-driven-content-model.md # Data model & taxonomy documentation
│   └── research/                     # Informative & research background docs
│       ├── facciones-es.txt / en / de
│       ├── historia-es.txt / en / de
│       ├── personas.txt
│       └── stories.txt
│
├── src/
│   ├── components/                   # React Components & Interactive Islands
│   ├── content/                      # Content Collections (Recipes, Taxonomies, Pages)
│   ├── layouts/                      # Astro Layouts
│   ├── lib/                          # Data engines (taxonomy.ts, i18n.ts, safety)
│   └── pages/                        # Astro Localized Routes ([lang]/...)
└── tests/                            # Vitest Test Suites
```

---

## Key Technical Subsystems

1. **Taxonomy & Content System**:
   * Content collections defined in `src/content.config.ts`.
   * Cross-linking between recipes and factions via taxonomy tags (`faction:puristas`, `faction:concebollistas`, etc.).

2. **Multilingual i18n Strategy**:
   * Native support for Spanish (`es`), English (`en`), and German (`de`) under `src/pages/[lang]/`.

3. **Food Safety Engine**:
   * Strict temperature & exposure rules: **70°C for 2 minutes** (fully cooked / pasteurized yolk), **63°C for 20 seconds** (safe runny yolk), and max **4 hours** room temperature threshold.
