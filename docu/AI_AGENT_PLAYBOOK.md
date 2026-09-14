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

All pages must adhere to the design system in `docu/DESIGN_SYSTEM.md`:

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
