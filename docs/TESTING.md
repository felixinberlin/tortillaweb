# Testing Strategy & Verification Guide — tortilladepatatas.org

> **For Contributors, Maintainers, and Quality Assurance Specialists**

This document explains the automated testing strategy, execution framework, test suite organization, and culinary safety verification rules for `tortilladepatatas.org`.

---

## 🎯 1. Overview & Testing Philosophy

At `tortilladepatatas.org`, automated tests are not an afterthought — they are the **culinary and engineering backbone** of the platform. Because our project blends scientific rigor (food safety thresholds like **70°C for 2 minutes**) with encyclopedic cultural archives and dynamic interactive tools (the **Tortilla Builder** and **DNA Recipe Comparator**), tests ensure that:

1. **Food Safety Standards are Inviolable**: Critical microbiological parameters (e.g. pasteurization thresholds for *Salmonella Enteritidis*) can never be silently corrupted or removed.
2. **Content & Link Integrity**: Taxonomic tags, localized paths (`/es/`, `/en/`, `/de/`), and internal cross-references stay 100% valid.
3. **Mathematical Precision**: Ratios in the Tortilla Builder, pan size recommendations, and DNA normalization scale predictably regardless of batch size.
4. **Multilingual Completeness**: Translation keys, localized route maps, and i18n dictionaries stay in sync across Spanish, English, and German.

---

## 🧪 2. Test Architecture & Runner

The test suite runs on **Vitest** for fast unit and integration assertions, complemented by **Oxlint** for static analysis and **Astro Build Check** for compilation safety.

### Command Quick-Reference

| Command | Tool | Purpose |
| :--- | :--- | :--- |
| `npm test` | Vitest | Executes all 20+ test suites (97+ assertions) in headless mode. |
| `npm run lint` | Oxlint | Scans TypeScript/JSX/Astro code for unused imports, syntax errors, and anti-patterns. |
| `npm run build` | Astro / Vite | Validates full static site synthesis and bundle creation. |

---

## 📚 3. Test Suites Catalog ("Which Test & Why")

Our tests are organized inside the `/tests/` directory. Here is the full breakdown of every test module, what it tests, and why it is critical:

### A. Safety & Design System Verification
* **`tests/safetyRules.test.ts`**
  * **What it tests**: Scans the entire codebase (`src/`) to ensure the mandatory food safety standards (**70°C for 2 minutes**, **63°C for 20 seconds**, and **4 hours** ambient threshold) are explicitly documented and never omitted. Also verifies brand safety colors (`#B00020`, `#FFC107`, `#2E7D32`) and brand palette colors (`#FFB800`, `#F5E6BE`, `#8D6E63`).
  * **Why**: Food safety is our non-negotiable core value. Misinforming users on egg pasteurization poses actual health risks.

### B. Culinary Domain & Algorithm Testing
* **`tests/builderMath.test.ts`**
  * **What it tests**: Verifies ingredient scaling ratios (eggs, potatoes, onion, oil, salt) and pan sizing algorithms for 1, 2, 4, and 8 diners under different doneness preferences (`jugosa`, `betanzos`, `cuajada`).
  * **Why**: Prevents ratio drift in the interactive Tortilla Builder and ensures physical pan sizes match thermal mass realities.
* **`tests/tortillaDna.test.ts`**
  * **What it tests**: Verifies the normalization engine (`normalizeRecipe`), ratio scale invariance (e.g., 6 eggs/600g potato vs 12 eggs/1200g potato yield identical relative DNA signatures), and recipe classification (`eggDominant`, `potatoHeavy`, `rich`).
  * **Why**: The DNA system power-calculates comparative metrics across centuries of recipes. Normalization must be mathematically consistent.
* **`tests/comparator.test.ts`**
  * **What it tests**: Evaluates two-recipe comparison logic (`compareRecipes`), delta calculations, and structural side-by-side metric generation.
  * **Why**: Allows users and culinary historians to contrast traditional recipes against Michelin-starred variants accurately.
* **`tests/recipes.test.ts`**
  * **What it tests**: Validates recipe collection schema integrity, ingredient unit formatting, and step-by-step cooking timers.
  * **Why**: Guarantees all published recipes (from Betanzos to classic style) contain complete, actionable steps and correct schema markup.
* **`tests/builderIntegration.test.ts`**
  * **What it tests**: Full end-to-end flow from user configuration state -> profile generation -> recipe generation.
  * **Why**: Ensures the React builder components and pure TypeScript domain functions communicate seamlessly.

### C. Content, Taxonomy & Metadata
* **`tests/contentIntegrity.test.ts`**
  * **What it tests**: Validates that all content collections (recipes, taxonomies, science, history, ingredients, persons) adhere to required schema fields and multilingual frontmatter.
  * **Why**: Prevents runtime render errors caused by missing properties or broken Markdown meta tags.
* **`tests/taxonomy.test.ts` & `tests/hiddenTaxonomy.test.ts`**
  * **What it tests**: Checks taxonomy tag resolution (ingredients, styles, regions, factions, difficulties) and hidden/internal taxonomy mappings.
  * **Why**: The encyclopedia and recipe catalog rely on taxonomy relationships for cross-linking.
* **`tests/relatedContent.test.ts`**
  * **What it tests**: Tests related entity lookups (e.g., relating Betanzos style to Galician region and high egg-to-potato ratio techniques).
  * **Why**: Powers the "Explore Related Articles" widgets on encyclopedic pages.
* **`tests/factionsData.test.ts`**
  * **What it tests**: Verifies data validity for the fundamental culinary factions (*Concebollistas*, *Sconcebollistas*, *Betanceiros*, *Ajistas*, etc.).
  * **Why**: Faction pages are key entry points; missing metadata breaks interactive battle/faction comparisons.

### D. Routing, i18n & Navigation
* **`tests/routes.test.ts` & `tests/assertRoute.test.ts`**
  * **What it tests**: Validates static route generation across localized prefixes (`/es/`, `/en/`, `/de/`) and slug translation logic.
  * **Why**: Guarantees that no route returns a 404 error when toggling languages.
* **`tests/navigationResolver.test.ts`**
  * **What it tests**: Verifies breadcrumbs, header/footer navigation tree resolution, and canonical URL builders.
  * **Why**: Keeps navigation structured, accessible, and intuitive across all viewports.
* **`tests/i18n.test.ts`**
  * **What it tests**: Checks dictionary parity between `es.json`, `en.json`, and `de.json` to ensure no translation key is missing in any language.
  * **Why**: Prevents raw translation key placeholders (e.g., `nav.builder.title`) from displaying to end users.
* **`tests/linkIntegrity.test.ts`**
  * **What it tests**: Scans internal links across Markdown and JSON files to ensure zero broken relative or absolute links.
  * **Why**: Essential for user experience and crawling efficiency.

### E. User Interface & SEO Integration
* **`tests/contactForm.test.ts`**
  * **What it tests**: Validates contact form validation, email input sanitization, and message submission rules.
  * **Why**: Guarantees users can submit feedback, recipe suggestions, or inquiries reliably.
* **`tests/seo.test.ts`**
  * **What it tests**: Validates Open Graph tags, Twitter cards, canonical links, and JSON-LD structured data (e.g. `Recipe` and `Article` schemas).
  * **Why**: Maximizes search engine visibility and rich snippet representation.
* **`tests/creatorOptimizations.test.ts`**
  * **What it tests**: Verifies shareable URL state encoding and social image generation parameter builders for the Tortilla Builder.
  * **Why**: Users can share their customized tortilla configurations via permalinks; encoding must be reversible and robust.
* **`tests/assertEntity.test.ts`**
  * **What it tests**: Utility assertions for entity verification and ID sanity checks across the database collections.
  * **Why**: Provides reusable helper assertion primitives for developer tests.

---

## 🚀 4. How to Add a New Test

When adding new features or domain logic, follow this pattern:

1. **Create a Test File**: Add a new file in `/tests/` named `[feature].test.ts`.
2. **Import Vitest Globals**: Use `import { describe, it, expect } from 'vitest';`.
3. **Define Clear Invariants**: Write test cases that verify both standard behavior and boundary cases (e.g. minimum 1 diner, missing optional ingredients).
4. **Run Verification**: Run `npm test` and `npm run lint` before committing.
