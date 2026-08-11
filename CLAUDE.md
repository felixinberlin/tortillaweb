# tortilladepatatas.org — Project Context

**Last verified against repo:** 2026-08-11 (`git log` HEAD `9e808a3`)

This file was previously wrong in ways that mattered — it described a `packages/` monorepo
with a physics engine and a Jest game-test suite that don't exist here. Everything below was
checked against the actual repo before being written. If you change structure, update this
file in the same commit; if you're unsure whether something below is still true, verify with
`find`/`grep` rather than trusting it blindly.

---

## What this is

An Astro static site about *Tortilla de Patatas* (Spanish omelette): recipes, food-safety
science, ingredient/cultivar reference, regional history, and a "faction" debate (onion vs.
no-onion — `puristas` vs `concebollistas`), plus a couple of interactive React tools
(recipe Builder, faction Comparator). Trilingual: `es` (default) / `en` / `de`. There is
**no game, no physics engine, no monorepo, no packages/ directory** — despite what an
earlier version of this file claimed.

## Stack

- **Astro 7** — SSG, every route pre-rendered per language to static HTML
- **React 19** — interactive islands only (`client:load`), via `@astrojs/react`
- **Tailwind CSS 4** (`@tailwindcss/vite`) + shadcn-style primitives on `@base-ui/react`,
  `class-variance-authority`, `lucide-react`, `motion`
- **i18next` / `react-i18next`** plus a hand-rolled routing/translation layer in `src/lib/`
- **Content**: Astro Content Collections (Zod-validated JSON/Markdown under `src/content/`,
  schema in `src/content.config.ts`) — not a headless CMS, not a database. Editors hand-edit
  files and commit them.
- **Test**: Vitest (`npm test`) — 11 spec files in `/tests`. **Not Jest.**
- **E2E**: Playwright (`npm run test:e2e`)
- **Lint**: oxlint (`npm run lint`)
- **Deploy**: static `dist/` — `netlify.toml` in repo root configures CSP/security headers
  for Netlify. (A move to Strato/TYPO3 hosting has been discussed but nothing in-repo
  reflects that yet — treat it as aspirational until it lands.)

## Project structure (verified)

```
src/
├── content/                # Content Collections — the actual data
│   ├── recipes/            # 16 JSON files — id, slug/title/description as {es,en,de}, ingredients, instructions, sources
│   ├── taxonomies/         # 41 JSON files — factions, ingredient categories, cross-refs
│   ├── ingredients/        # 21 Markdown files — cultivar/chemical detail pages
│   ├── persons/            # 1 JSON file — chef/persona entries
│   ├── history/            # 3 Markdown files
│   ├── science/            # 3 Markdown files — food-safety explainers
│   ├── pages/               # 19 JSON files — freeform page content (z.record, unvalidated shape)
│   ├── navigation/          # 2 JSON files
│   └── settings/            # 1 JSON file
├── content.config.ts        # Zod schemas — source of truth for content shape (READ FIRST before editing content/)
├── components/
│   ├── builder/              # Tortilla proportions Builder (React island)
│   ├── comparator/            # Faction/recipe Comparator
│   ├── factions/ techniques/  # Onion-debate + technique pages
│   ├── ingredients/           # Per-ingredient detail views (egg, garlic, ...)
│   ├── laboratorio/            # "Laboratorio" experimental tools incl. TortillaWorldstateSimulator
│   ├── trivia/ personas/ about/ contact/ legal/ navigation/ home/ layout/ ui/
├── layouts/                  # Base + page Astro layouts
├── lib/
│   ├── i18n.ts, translationLookup.ts, translationFinder.ts   # translation/locale resolution
│   ├── routes/ (registry.ts, resolver.ts, types.ts)          # canonical route table incl. localized slugs
│   ├── navigation/            # menus, breadcrumbs, links
│   ├── taxonomy.ts            # faction/technique taxonomy helpers
│   ├── recipes.ts, seo.ts, utils.ts
│   ├── builderMath.ts         # pure ingredient-scaling calculation for the Builder
│   └── worldstate/worldstateStore.ts
└── pages/[lang]/...           # Astro routes: index, recipes(.astro + [slug]), [taxonomyType]/[...slug],
                                # science, history, builder, comparador, laboratorio/*, enciclopedia/*,
                                # trivia, about/contact (+ localized aliases: kontakt, contacto), legal pages

tests/            # Vitest specs: builderMath, builderIntegration, recipes, taxonomy, factionsData,
                  # tortillaDna, comparator, i18n, seo, safetyRules, contentIntegrity
docs/             # Architecture.md / Arquitectura.md (ES), DESIGN_SYSTEM.md, ROUTING_ARCHITECTURE.md,
                  # taxonomy-driven-content-model.md, Roadmap.md, Security.md, SEO.md, Idea.md, research/,
                  # AGENT_LEARNINGS.md (dated log of empirical gotchas found while working here —
                  # append to it, don't just re-derive the same surprises next session)
```

Loose files at repo root (`egg.es.md`, `egg.en.md`, `egg.de.md`, `personas.txt`,
`aviso-legal.md`, `impressum.md`, `repomix-output.md`, a stray `Generated Image....jpg`) look
like source drafts that were never migrated into `src/content/` — check with the user before
assuming they're authoritative or safe to delete.

## Content model — read before editing `src/content/`

- Zod schemas live in `src/content.config.ts`; Astro mirrors them to
  `.astro/collections/*.schema.json` on build/dev — don't hand-edit the generated copies.
- Recipes, taxonomies, and persons use **inline multilingual fields**: e.g.
  `title: { es, en, de }` on one record, not one record per language. Match that shape.
- `recipes` schema already has an `author` field: `{ type: 'platform' | 'user', userId?, name }`.
  Nothing currently sets `type: 'user'` — all 16 recipes are platform-authored — but the shape
  exists, presumably for a future user-submitted-recipes feature. A static, git-committed
  content collection **cannot** support live third-party submissions without a rebuild+deploy
  per submission; if that feature is built, it needs a real backend (form handler + moderation
  + storage) in front of the static site, not just a schema field.
- `pages`, `navigation`, `settings` collections are schema-loose (`z.record(z.string(), z.any())`)
  — validate shape by reading the actual JSON files, not the Zod type.

## Routing / i18n

- Every page lives under `src/pages/[lang]/...`; localized slugs (e.g. `/es/facciones` vs
  `/en/factions` vs `/de/faktionen`) are defined centrally in `src/lib/routes/registry.ts` —
  add new routes there, don't hardcode slugs in components.
- `[taxonomyType]/[...slug].astro` is a generic taxonomy-driven route (factions, techniques,
  etc.) — check `src/lib/taxonomy.ts` and the registry's `canonicalType` field before adding
  a new taxonomy-backed section instead of writing a bespoke page.
- Some duplicate/legacy page files exist under URL-encoded paths (`src/pages/%5Blang%5D/...`)
  alongside the real `src/pages/[lang]/...` — verify which one Astro is actually serving
  before editing; don't assume the encoded copies are dead without checking.

## Food safety content

Egg-safety temperature/time thresholds (pasteurization ~70°C/2min, safe-runny ~63°C/20s, room-
temperature exposure limits) appear across `src/content/science/`, ingredient detail components
(`EggIngredientDetail.tsx`), the Builder, and `worldstateStore.ts`, and are covered by
`tests/safetyRules.test.ts`. Treat these as content-accuracy-sensitive: if you change a
threshold, update the test and cite a source.

## Design system

`docs/DESIGN_SYSTEM.md` and `AGENTS.md` define a "Kitchen Notebook" skeuomorphic-modernist
aesthetic (parchment textures, notebook-card edges) with a fixed brand palette (Yolk Gold
`#FFB800`, Parchment `#F5E6BE`, Umber `#8D6E63`, etc.) and mandatory bolding of safety figures
(**70°C**, **63°C**, **2 minutes**, **20 seconds**, **4 hours**) in copy. Follow `AGENTS.md`'s
rules for any user-facing content/UI change.

## Commands

```
npm run dev        # astro dev, :3000
npm run build       # astro build → dist/
npm run preview     # serve dist/ locally
npm test            # vitest run
npm run test:e2e    # playwright
npm run lint         # oxlint
```

## Before making changes

1. Read `src/content.config.ts` before touching anything in `src/content/`.
2. Read `src/lib/routes/registry.ts` before adding/renaming a route or localized slug.
3. Don't invent counts, test frameworks, or subsystems — verify with the repo, the way this
   file was rewritten.
