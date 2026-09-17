# AI Agent Playbook & Knowledge Transfer — tortilladepatatas.org

> **For AI Agents & Developers in New Sessions**:  
> Read this document first before making structural, architectural, or configuration changes. It documents hard-won lessons, edge cases, debugging recipes, and architectural patterns discovered across development cycles.

---

## 1. Runtime Environment & Cloud Run Container Gotchas

### 🚨 Vite 6/8 `server.allowedHosts` & Astro 5+ `security.allowedDomains` (Crucial)
- **Problem**: Cloud Run / AI Studio preview proxies traffic through domains like `https://ais-dev-*.run.app` or `https://ais-pre-*.run.app`. Vite enforces host header verification, and Astro 5+ dev server (`secFetchMiddleware`) blocks any requests with `Sec-Fetch-Site: cross-site` unless `allowedDomains` is configured.
- **Symptom**: Pages render initial HTML, but every Astro island (`client:load`, `client:visible`) fails to hydrate with:  
  `[astro-island] Error hydrating ... Failed to fetch dynamically imported module: .../@id/astro:scripts/before-hydration.js` (returning HTTP 403 Forbidden: `Cross-origin request blocked`).
- **Solution**: In `astro.config.mjs`:
  1. Set `security: { checkOrigin: false, allowedDomains: [{}] }` to allow proxied cross-origin iframe preview requests.
  2. In `vite.server`, set `allowedHosts: true` and `cors: true`.
  3. In `virtualModuleMiddlewarePlugin`, unshift a middleware at the front of Vite's middleware stack to set CORS headers and normalize `sec-fetch-site` for the iframe preview environment.
- **Verification**: Test with:
  `curl -i -X GET -H "Host: ais-dev-...run.app" -H "Sec-Fetch-Site: cross-site" -H "Sec-Fetch-Mode: cors" -H "Origin: https://ais-dev-...run.app" http://localhost:3000/@id/astro:scripts/before-hydration.js` — it must return `HTTP/1.1 200 OK`.

### 🚨 Port 3000 & Host Binding
- The dev server and production server **MUST** bind to host `0.0.0.0` and port `3000`. The reverse proxy in the container only forwards external requests to port 3000.

---

## 2. Architecture & Tech Stack

- **Framework**: [Astro 5+](https://astro.build) with `@astrojs/react` for interactive islands.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`.
- **UI Components**: Radix/Base-UI primitives, Lucide icons (`lucide-react`), Motion (`motion/react`).
- **Linter**: `oxlint` (runs in ~50ms, checks 260+ files).
- **Test Suite**: Vitest (`npm run test`) and Playwright for e2e.
- **Build Step Sequence**:
  1. `npx tsx scripts/generateRecipeSvgs.ts`: Pre-renders canonical and custom recipe SVG representations into `public/images/recipes/svg/`.
  2. `astro build`: Compiles static pages into `dist/`.

---

## 3. Hydration & SSR Best Practices

### The Island Isolation Principle
- Astro pages (`/src/pages/[lang]/...`) are pre-rendered statically.
- React components run on both the server (during SSR) and the client (during hydration).
- **Never access browser globals at the root of a React component**:
  ```typescript
  // ❌ BAD: Crashes or causes hydration mismatch during SSR
  const currentUrl = window.location.href;

  // ✅ GOOD: Safe check with fallback
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  // Or inside useEffect / useMemo with window check
  ```
- Keep interactive state isolated inside client islands; keep informational layouts in Astro components to maximize performance and zero-JS footprint.

### 🚨 Never Re-Export Node-Only / CLI Scripts in Browser Barrels
- **Problem**: If an index/barrel file (e.g. `src/domain/svg/index.ts`) re-exports a module that imports `node:fs` or `node:path` (such as static generator scripts), any client island (e.g., `RecipeImage.tsx`) importing from that barrel will attempt to load the Node module in the browser.
- **Symptom**: `[astro-island] Error hydrating <Component>.tsx Failed to fetch dynamically imported module`. Vite stubs `node:fs` with a runtime proxy error (`Cannot access node:fs in client code`).
- **Solution**: Keep Node.js CLI/build-time scripts (like `recipeSvgStaticGenerator.ts`) separate and import them directly in Node tools or scripts (`scripts/generateRecipeSvgs.ts`), NEVER re-exporting them in client-facing barrels.

### 🛡️ Virtual Module URL Decoding in Dev Mode
- **Problem**: In Astro dev mode, React client islands load `astro:scripts/before-hydration.js` before hydration. If a browser, iframe, or reverse proxy requests the URL percent-encoded (`/@id/astro%3Ascripts/before-hydration.js`), Vite's dev server fails to match the virtual ID and falls back to serving the HTML index document with `Content-Type: text/html`. This causes the browser to reject dynamic module evaluation with `Failed to fetch dynamically imported module: .../@id/astro:scripts/before-hydration.js`.
- **Solution**: `astro.config.mjs` includes `virtualModuleMiddlewarePlugin`, which handles `before-hydration.js` directly with standard JavaScript MIME headers and normalizes `%3A` colons in virtual module paths.

---

## 4. Builder & DNA Serialization Architecture

### URL as the Primary Database (Zero-Login Persistence)
- The Tortilla Builder (`/src/components/builder/`) encodes the entire mathematical formula into query parameters:
  - `p`: Potato grams
  - `e`: Eggs count
  - `o`: Olive oil milliliters
  - `d`: Diners / servings
  - `pan`: Pan diameter (cm)
  - `tex`: Texture (`runny_betanzos`, `melosa_creamy`, `cuajada_firm`)
  - `onion`: Onion boolean/ratio
  - `heat`: Flame control level
  - `safety`: Thermal safety indicator
- **Synchronization**: Handled via `window.history.replaceState` in `src/domain/builder/dnaShareHelper.ts`.
- **User Messaging**: Always inform users that their recipe URL is permanent, shareable, and bookmarkable (**Ctrl+D** / **Cmd+D**) with zero accounts or cookies required.

---

## 5. Design System: The "Kitchen Notebook" Aesthetic

All pages must adhere to the design system in `docs/DESIGN_SYSTEM.md`:

### Palette
- **Parchment Card Background**: `#FAF6EE` / Dark: `#28231F`
- **Frit Potato Cream**: `#F5E6BE` / Dark: `#2A2420`
- **Caramelized Onion Umber**: `#8D6E63` / Dark: `#FFB800`
- **Runny Yolk Gold**: `#FFB800`
- **Borders**: `#E8E2D5` / Dark: `#3D352E`

### Typography & Spacing
- Display/Headings: Playfair / Serif heading aesthetic (`font-serif-heading`) paired with clean functional body typography.
- Border radius: Cap at `rounded-xl` or `rounded-2xl` (12–16px).
- Anti-Slop Directive: Ban generic purple-to-blue gradients, glowing AI boxes, and corporate buzzwords ("empower", "supercharge").

---

## 6. Food Safety & Regulatory Rules (Mandatory)

Whenever rendering cooking times, thermal targets, or microbiological safety advice:

1. **Mandatory Bolding**: Always bold critical metrics:
   - **70°C for 2 minutes** (Gold standard bactericidal core temperature for complete *Salmonella* inactivation).
   - **63°C for 20 seconds** (Commercial pasteurization equivalent).
   - **4 hours** (Absolute maximum ambient room-temperature storage window for runny/Betanzos tortillas before disposal).
   - **<8°C** (Refrigerated storage requirement).
2. **Safety Badges**:
   - `Safe`: Green (`#2E7D32`)
   - `Warning`: Amber (`#FFC107`)
   - `Danger`: Crimson (`#B00020` / `#D32F2F`)

---

## 7. i18n & Trilingual Structure

- Supported locales: `es` (Spanish, default), `en` (English), `de` (German).
- URL structure: `/[lang]/...` (e.g. `/es/builder`, `/en/builder`, `/de/builder`).
- Translation dictionaries are in `src/i18n/` and `src/lib/i18n.ts`.
- When adding new user-facing strings, provide translations for all 3 languages or fallback gracefully to Spanish/English.

---

## 8. Common Debugging & Quality Workflows

| Scenario | Command / Action |
| :--- | :--- |
| Quick lint check | `npm run lint` (or call `lint_applet`) |
| Full compilation & build | `npm run build` (or call `compile_applet`) |
| Unit tests | `npm run test` (Vitest) |
| Recipe SVGs out of date | `npm run generate:svgs` |
| Server stuck / 403 errors | Check `vite.server.allowedHosts` in `astro.config.mjs`, then call `restart_dev_server` |

---

## 9. Golden Rules for Subsequent AI Agents

1. **Preserve User Intent**: Build exactly what was asked. Avoid unsolicited sidebars, promotional popups, or phantom API integrations.
2. **Never break existing test suites**: Always verify `compile_applet` before finishing turns.
3. **Maintain editorial standards**: Keep fact vs. legend clear (Villanueva de la Serena 1798 vs. Zumalacárregui legend).

---

## 10. Vector SVG Engine & Zero-Raster Architecture

See `docs/SVG_SYSTEM_ARCHITECTURE.md` for full architectural specifications.
1. **Zero Raster Assets**: The active web client uses 100% SVG. Do not add `.jpg`, `.png`, or `.webp` assets to components or pages.
2. **SVG Build Step**: `npm run generate:svgs` pre-renders canonical SVGs to `public/images/recipes/generated/` and `public/images/ingredients/`.
3. **Dynamic Interactivity**: Components like `CozyKitchenLab.tsx` and `RecipeImage.tsx` generate inline SVGs via `generateTortillaSvg()`. Ensure all client SVG generation remains pure (no `node:fs` imports).
4. **Performance Impact**: Replacing raster photos with SVGs reduced page payloads from ~18MB to ~85KB (-99.5%), delivering near-instant FCP and 0 Cumulative Layout Shift (CLS).

---

## 11. Mono-Food Benchmark & Global Authority Strategy

The benchmark at `/[lang]/mono-food` and the homepage centerpiece article (`MonoFoodAuthorityArticle.tsx`) systematically evaluate `tortilladepatatas.org` against the world's 10 other famous single-dish culinary institutions (AVPN Neapolitan Pizza, Berlin's Dönermuseum, Tokyo's Shin-Yokohama Ramen Museum, Lalín's Cocido, Philadelphia's defunct Pizza Brain, etc.).

Key tenets of our hyper-vertical superiority:
1. **Audited Data & Facts**: Always contrast hard metrics:
   - **85 KB vs 14.8 MB**: Zero-ad, zero-tracker vector SVG rendering vs commercial recipe mills.
   - **Zero-Login Parametric URLs**: 100% of ingredient formulas and frying physics stored in stateless URL parameters.
   - **Archival Precision (1798 vs 1835)**: Rigorous documentation of Don Joseph de Tena Godoy's 1798 manuscript vs 1835 Carlist War folklore.
   - **Thermodynamic Science**: Protein denaturation curves (ovotransferrin at 62°C, ovalbumin at 80°C) with auditable food safety canons (**70°C for 2 minutes** / **63°C for 20 seconds**).
   - **Digital Permanence**: Serverless edge distribution immune to the commercial real estate failures that bankrupted physical novelty museums (Pizza Brain, Currywurst Museum).

---

## 12. Safety Canon Copy Hygiene & Anti-Boilerplate Directive

While adherence to microbiological food safety figures is a core pillar (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours ambient limit**, and **<8°C refrigeration**), **DO NOT MECHANICALLY PASTE SANITARY DISCLAIMER BANNERS ACROSS UNRELATED PAGES**.

Rules:
1. **Natural Contexts Only**: Safety figures belong in:
   - Dedicated Science & Physics pages (`/science`, `/laboratorio`).
   - Recipe cooking steps and timer callouts (`RecipeDetail`, `KitchenAssistantTimer`).
   - The interactive Builder texture step (`StepPreferences.tsx`).
   - The authoritative footer reference and safety tests (`tests/safetyRules.test.ts`).
2. **Forbidden Boilerplate Placements**:
   - Do NOT place clinical "bactericidal safety banners" on personality tests, community poll pages, video lists, or biographical directories.
   - Respect user curiosity: integrate safety organically where food temperature is actively discussed, without repeating robotic preambles.

---

## 13. The Cozy Kitchen Notebook Transformation & Editorial Warmth

In response to editorial and design refinements, the homepage and high-touch consumer touchpoints underwent a major UX and aesthetic shift: moving away from clinical database directories and SaaS-style dashboard layouts toward an authentic, warm, and inviting **"Cuaderno de Cocina Tradicional" (Kitchen Recipe Notebook)**.

### Key Architectural & Design Tenets

1. **Aesthetic Tone & Copywriting**:
   - **From Cold Metrics to Culinary Sensory Warmth**: Instead of cold terminology ("Knowledge Graph Protocol", "Thermodynamic Database"), copy celebrates the tactile, sensory beauty of Spanish cooking: slow-poached potatoes in Extra Virgin Olive Oil (*confitadas despacio a fuego suave*), rich velvety pasture egg yolk (*huevo campero de yema cremosa y melosa*), and the sizzle of the golden pan flip (*el volteo decidido con plato llano*).
   - **Handwritten Accents**: Handwritten annotations (`font-script`) simulate personal notes in a kitchen diary (*"El sabor de siempre, como en casa"*).

2. **The Core Homepage Components**:
   - **`Hero.tsx`**: Welcomes the home cook with warm neutral parchment tones, inviting primary actions ("Ver las Recetas Más Ricas" and "Calcular Mi Tortilla a Medida"), and tactile pill links for ingredients, doneness, and the onion debate.
   - **`AuthorityStatsBanner.tsx`**: Focuses on culinary pride: the 25 traditional recipes, 100% AOVE slow confit, the magic 10-minute egg rest, and the golden safety standard (**70°C for 2 minutes** / **63°C for 20 seconds**).
   - **`MainHubDirectory.tsx`**:
     - **Interactive Craving Selector (`activeCraving`)**: Allows users to filter by current culinary mood (runny yolk for dipping bread, sweet caramelized onion, purist potato & egg, 15-minute express chips, or rustic country ham & peppers).
     - **"Las Cuatro Grandes Joyas"**: Four spacious cards with prep time, ideal skillet diameter, recommended bread pairing, and direct links to step-by-step guides.
     - **"Los Tres Secretos de la Abuela"**: The three time-honored slow cooking rituals: gentle low-heat poach (130°C–140°C), warm egg soak (10-minute starch hydration), and the confident plate flip.
     - **"Notas al Margen de la Abuela"**: Notebook cards with decorative pins featuring practical wisdom (testing oil temperature with a potato slice, moistening the flipping plate, and warm food safety reminders).
     - **"Rincones del Cuaderno"**: Four clean doorways to the Custom Builder, Onion Debate, 1798 Manuscript, and the Kitchen Assistant & Timer.

3. **Natural Integration of Food Safety**:
   - Adheres strictly to the mandatory bolding rules (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours**, and **<8°C**) while phrasing advice with genuine kitchen care rather than regulatory jargon.


