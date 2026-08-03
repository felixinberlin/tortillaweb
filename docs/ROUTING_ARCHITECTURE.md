# Routing Architecture & Navigation Abstraction

## Overview

The routing system for `tortilladepatatas.org` is completely decoupled from UI components. No component, menu, or page hardcodes localized route paths, URL translation tables, or manual language prefixes.

All URL creation and resolution flow through a strict, single-source hierarchy:

```
                  Content Entity / Route Target
                               |
                               v
                         Route Resolver
                               |
           -----------------------------------------
           |                                       |
           v                                       v
    Route Registry                          Navigation Layer
                                                   |
                                                   v
                                              UI Components
                                  (RouteLink / EntityLink / ExternalLink)
```

---

## Structure

```
src/lib/routes/
  ├── types.ts          # Central type definitions (RouteId, CanonicalType, ContentEntity, NavigationTarget)
  ├── registry.ts       # Single source of truth for static routes and localized slug mappings
  ├── resolver.ts       # Core URL resolution, entity link calculation, language switching, and canonical links
  └── index.ts          # Barrel re-export for the routes package

src/lib/navigation/
  ├── breadcrumbs.ts    # Breadcrumb structure generation from localized paths
  ├── menus.ts          # Central header and footer navigation models
  ├── links.ts          # Re-export of primitive link components & helpers
  └── index.ts          # Barrel re-export for navigation helpers

src/components/navigation/
  └── LocalizedLink.tsx # Exported RouteLink, EntityLink, ExternalLink & LocalizedLink primitives
```

---

## Core Principles & Rules

1. **Zero UI URL Knowledge**: UI components never construct `/es/ingredientes` or `/de/zutaten` strings manually.
2. **Explicit Link Primitives**:
   - `<RouteLink routeId="ingredients" lang="es">` for static app routes.
   - `<EntityLink entity={ingredient} lang="de">` for content entities.
   - `<ExternalLink href="https://...">` for external outbound URLs (automatically sets `target="_blank"` and `rel="noopener noreferrer"`).
3. **Type-Safe Discriminated Unions**: `LocalizedLink` enforces mutually exclusive props so `routeId` and `entity` cannot be combined ambiguously.
4. **Canonical Entity Mapping**:
   - Entities (`recipe`, `faction`, `ingredient`, `technique`, `person`, `restaurant`, `region`, `style`) automatically resolve through `CanonicalType` mapping in `resolver.ts`.
5. **Multi-Locale Ready**: Adding a new language only requires registering its localized slug mapping in `registry.ts`. Components update automatically without code changes.

---

## API Usage Examples

### 1. Static Route Link
```tsx
import { RouteLink } from '@/components/navigation/LocalizedLink';

<RouteLink routeId="ingredients" lang="es">
  Ver Ingredientes
</RouteLink>
```

### 2. Entity Link
```tsx
import { EntityLink } from '@/components/navigation/LocalizedLink';

<EntityLink entity={ingredientEntity} lang="en">
  View Potato Details
</EntityLink>
```

### 3. Language Switcher Helper
```ts
import { switchLanguage } from '@/lib/routes';

const newPath = switchLanguage(currentPathname, 'de');
// Converts "/es/ingredientes" -> "/de/zutaten"
```

### 4. Canonical URL Resolution
```ts
import { getCanonicalUrl } from '@/lib/routes';

const canonical = getCanonicalUrl(pathname, 'es');
// Returns "https://tortilladepatatas.org/es/ingredientes/patata"
```
