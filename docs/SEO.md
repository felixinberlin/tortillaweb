# SEO & Internationalization (i18n) Strategy — tortilladepatatas.org

This document outlines the Search Engine Optimization (SEO) and internationalization architecture implemented across `tortilladepatatas.org`.

---

## 1. Internationalization Architecture & Hreflang Tags

The platform serves three localized markets:
* **Spanish (`es`)**: Primary locale (`/es/...`)
* **English (`en`)**: English locale (`/en/...`)
* **German (`de`)**: German locale (`/de/...`)

### Hreflang Implementation
Every generated page automatically injects bidirectional `<link rel="alternate" hreflang="..." />` tags to communicate alternate language versions to search engine crawlers:

```html
<link rel="alternate" hreflang="es" href="https://tortilladepatatas.org/es/recipes/clasica/" />
<link rel="alternate" hreflang="en" href="https://tortilladepatatas.org/en/recipes/clasica/" />
<link rel="alternate" hreflang="de" href="https://tortilladepatatas.org/de/recipes/clasica/" />
<link rel="alternate" hreflang="x-default" href="https://tortilladepatatas.org/es/recipes/clasica/" />
```

---

## 2. Structured Data (JSON-LD Schemas)

To maximize Rich Snippet visibility in Google Search results, `tortilladepatatas.org` injects schema.org JSON-LD structured data on all key pages:

### A. Recipe Schema (`https://schema.org/Recipe`)
Injected on recipe pages (`/[lang]/recipes/[id]`):
* `name`, `description`, `image`, `recipeYield`, `prepTime`, `cookTime`
* `recipeCategory`: "Spanish Omelette / Tortilla de Patatas"
* `recipeIngredient`: Array of localized ingredient amounts.
* `recipeInstructions`: HowToStep array detailing step-by-step preparation.

### B. HowTo Schema (`https://schema.org/HowTo`)
Injected on safety guides and culinary builder results.

### C. WebSite & Organization Schema
Injected on the homepage with `publisher` credentials and site search targets.

---

## 3. Metadata, Canonical URLs & Open Graph Social Cards

Every page includes customized meta headers rendered by `src/layouts/Layout.astro`:

* **Canonical URL**: `<link rel="canonical" href="..." />` pointing to the definitive locale URL.
* **Open Graph (OG) Tags**:
  * `og:title`, `og:description`, `og:image`, `og:type`, `og:locale`
* **Twitter Cards**: `summary_large_image` format with high-resolution hero imagery.

---

## 4. Automated Sitemap & Robots.txt

* **Astro Sitemap Integration**: `@astrojs/sitemap` automatically scans all generated localized routes during build time and updates `sitemap-index.xml`.
* **Robots.txt**: Located in `/public/robots.txt`, directing crawlers to the sitemap index while allowing full indexing of all language variants.

---

## 5. Performance & Core Web Vitals Targets

* **Lighthouse Target**: 95+ score across Performance, Accessibility, Best Practices, and SEO.
* **Image Optimization**: Responsive web-optimized JPG/WEBP assets served with appropriate `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
