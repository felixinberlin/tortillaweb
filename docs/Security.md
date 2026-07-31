# Security & Reliability Policy — tortilladepatatas.org

This document describes the security model, data integrity controls, error monitoring plans, and food safety risk policies for `tortilladepatatas.org`.

---

## 1. Static Architecture & Attack Surface Reduction

`tortilladepatatas.org` is architected primarily as a **Static Site Generated (SSG)** application served via static CDN edge instances.

* **No Persistent Backend Server**: The site does not maintain a server-side relational database or user session store, eliminating SQL injection vectors, session hijacking, and remote database exploitation risks.
* **Client-Side Calculations**: All interactive tools (Tortilla Builder, Faction Comparator, Safety Monitor) compute outputs entirely in the user's browser using client-side JavaScript/TypeScript.

---

## 2. Input Validation & Type Safety

All static data and client inputs are strictly validated:

* **Zod Content Schemas**: All JSON content collections (`recipes`, `taxonomies`, `pages`) are validated at build time using Zod schemas (`src/content.config.ts`). Build pipelines fail instantly if malformed data or unauthorized schema properties are detected.
* **Client Input Bounds**: Interactive inputs (sliders, temperature inputs, time duration fields) in React components strictly clamp numerical values to prevent out-of-bounds calculations, integer overflows, or NaN states.

---

## 3. Sentry Error Monitoring Plan (Upcoming Integration)

As part of Phase 3, error tracking and performance monitoring will be introduced using **Sentry**:

### Planned Setup Configuration
1. **SDK**: `@sentry/astro` and `@sentry/react`.
2. **Scope**:
   * **Client Islands**: Capturing unhandled JavaScript exceptions in interactive React components.
   * **Build Pipeline**: Capturing Astro page generation errors and asset loading failures.
3. **Data Privacy & Anonymization**:
   * PII (Personally Identifiable Information) stripping enabled by default.
   * IP addresses anonymized (`sendDefaultPii: false`).
   * No user search query or personal data transmitted to Sentry logs.

---

## 4. HTTP Security Headers & Content Security Policy (CSP)

The deployment container and reverse proxy layer enforce standard web security headers:

* `Content-Security-Policy`: Restricts script and style execution to trusted origins.
* `X-Frame-Options: SAMEORIGIN`: Prevents clickjacking in unapproved iframe contexts.
* `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing.
* `Referrer-Policy: no-referrer`: Ensures third-party image assets (e.g. external media) do not leak user referrer paths.

---

## 5. Food Safety Policy & Disclaimer

`tortilladepatatas.org` takes public health and food safety seriously:

* **Scientific Basis**: All temperature recommendations adhere to established food pasteurization guidelines for *Salmonella* reduction:
  * **70°C for 2 minutes**: Complete bacterial pasteurization.
  * **63°C for 20 seconds**: Minimum thermal lethality threshold for runny yolks.
  * **4 Hours**: Absolute maximum ambient room temperature exposure limit.
* **Disclaimer**: Recommendations provided by the Safety Monitor are for educational purposes. Commercial caterers and restaurants must comply with local municipal health regulation standards (e.g., AESAN in Spain, EFSA in Europe, FDA Food Code in the US).
