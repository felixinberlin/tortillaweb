# Recipe.org Schema.org & Cooklang Translator

A standalone, zero-dependency TypeScript library for translating raw recipe objects, culinary models, and dynamic user calculator configurations into:
1. Compliant **Schema.org `Recipe` JSON-LD** structured data for **Google Rich Results** and SEO search engines.
2. Standard **Cooklang v1** markup format (`.cook`) for recipe markup interoperability across recipe apps.

---

## Features

- 🌐 **Independent & Reusable**: Zero external runtime dependencies. Works in Node.js, Browser, React, Next.js, Astro, Vue, Express, or any TypeScript/JavaScript environment.
- 📐 **Schema.org Compliant**: Generates valid `@type: "Recipe"` objects with complete support for `@context`, `author`, `recipeIngredient`, `recipeInstructions` (`HowToStep`), ISO 8601 durations (`PT20M`, `PT1H30M`), yields, categories, cuisines, and nutrition objects.
- 🍳 **Cooklang Exporter**: Formats recipes into standard Cooklang v1 format (`@ingredient{amount%unit}`, `#cookware{size%unit}`, `~{time%unit}`, `>> metadata: value`).
- ⏱️ **ISO 8601 Durations**: Built-in bidirectional formatting and parsing between minutes and ISO 8601 duration strings (`formatIsoDuration`, `parseIsoDuration`).
- ✅ **Google Rich Snippet Validator**: Includes `validateRecipeSchema()` to verify your JSON-LD payloads against Google's structured data requirements prior to publishing.
- 📜 **Safe Script Tag Export**: `exportToJsonLdScript()` securely outputs JSON-LD `<script>` tags escaping inline HTML characters (`<` to `\u003c`) to prevent XSS vulnerabilities.

---

## Installation

Simply copy or import the `translator` module directory into your project:

```ts
import {
  translateToRecipeSchema,
  exportToCooklang,
  exportTortillaConfigToCooklang,
  formatCooklangIngredient,
  formatCooklangCookware,
  formatCooklangTimer,
  validateRecipeSchema,
  exportToJsonLdScript,
} from './translator';
```

---

## Usage Examples

### 1. Basic Schema.org Recipe Translation

Translate any standard recipe object into Schema.org `Recipe` JSON-LD:

```typescript
import { translateToRecipeSchema } from './translator';

const schema = translateToRecipeSchema({
  name: 'Tortilla Clásica de Patatas',
  description: 'Traditional Spanish omelette made with potatoes, eggs, olive oil, and salt.',
  image: '/images/recipes/clasica.jpg',
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  yieldServings: 4,
  ingredients: [
    '600g Monalisa Potatoes',
    '6 Large Fresh Eggs',
    '150ml Extra Virgin Olive Oil',
    '6g Salt',
  ],
  instructions: [
    { step: 'Step 1', text: 'Peel and slice potatoes finely.' },
    { step: 'Step 2', text: 'Confit in olive oil at medium-low heat until tender.' },
    { step: 'Step 3', text: 'Whisk eggs with salt and combine with drained potatoes.' },
    { step: 'Step 4', text: 'Cook in pan until desired creaminess is achieved.' },
  ],
}, {
  baseUrl: 'https://myrecipesite.com',
  defaultAuthorName: 'My Culinary Org',
});

console.log(schema);
```

---

### 2. Cooklang Standard Export (.cook)

Export any standard recipe or calculator state to standard **Cooklang** markup format:

```typescript
import { exportToCooklang } from './translator';

const cooklangOutput = exportToCooklang({
  name: 'Tortilla Clásica de Patatas',
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  yieldServings: 4,
  ingredients: [
    '600g Patatas Monalisa',
    '6 Huevos camperos',
    '150ml Aceite de oliva virgen extra',
    '6g Sal fina',
  ],
  instructions: [
    'Pelar y cortar las patatas en láminas finas.',
    'Confitar las patatas en el aceite a fuego medio.',
    'Mezclar con los huevos batidos y la sal.',
    'Cuajar en la sartén hasta obtener la textura deseada.',
  ],
});

console.log(cooklangOutput);
```

**Cooklang Output (`.cook` format):**

```cooklang
>> title: Tortilla Clásica de Patatas
>> servings: 4
>> prep time: 15 minutes
>> cook time: 20 minutes
>> author: tortilladepatatas.org

-- Ingredients
@Patatas Monalisa{600%g}
@Huevos camperos{6}
@Aceite de oliva virgen extra{150%ml}
@Sal fina{6%g}

-- Instructions
Paso 1: Pelar y cortar las patatas en láminas finas.
Paso 2: Confitar las patatas en el aceite a fuego medio.
Paso 3: Mezclar con los huevos batidos y la sal.
Paso 4: Cuajar en la sartén hasta obtener la textura deseada.
```

---

### 3. Dynamic Calculator (Builder) Cooklang Export

Export a user's custom calculator configuration (`TortillaConfiguration`) directly to Cooklang:

```typescript
import { exportTortillaConfigToCooklang } from './translator';

const cooklangText = exportTortillaConfigToCooklang(userTortillaConfig, {
  lang: 'es',
  authorName: 'Tortilla Creator',
});

console.log(cooklangText);
```

**Output:**

```cooklang
>> title: Tortilla Personalizada (6 raciones)
>> servings: 6
>> prep time: 15 minutes
>> cook time: 20 minutes
>> pan size: 28 cm
>> category: Main Course
>> cuisine: Spanish
>> author: Tortilla Creator

-- Ingredients
@Huevos{10%XL}
@Patatas{850%g}
@Aceite de Oliva Virgen Extra{200%ml}
@Panceta / Bacon crujiente{60%g}
@Sal{8%g}

-- Cookware
#Sartén antiadherente{28%cm}

-- Instructions
-- Proporción: Equilibrio Clásico (100g patata/huevo). Textura: jugosa.
Paso 1: Pocha los 850g de patatas en 200ml de AOVE...
Paso 2: Dora la panceta antes para extraer la grasa...
```

---

### 4. Cooklang Utility Formatters

Easily format individual recipe elements into valid Cooklang syntax:

```typescript
import {
  formatCooklangIngredient,
  formatCooklangCookware,
  formatCooklangTimer,
} from './translator';

formatCooklangIngredient('Patatas Monalisa', 600, 'g');
// Returns: "@Patatas Monalisa{600%g}"

formatCooklangIngredient('Huevos camperos', 6);
// Returns: "@Huevos camperos{6}"

formatCooklangCookware('Sartén antiadherente', 24, 'cm');
// Returns: "#Sartén antiadherente{24%cm}"

formatCooklangTimer(20, 'minutes');
// Returns: "~{20%minutes}"
```

---

## API Reference

### Cooklang Export Options (`CooklangExportOptions`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `includeMetadata` | `boolean` | `true` | Include metadata header lines (`>> key: value`) |
| `includeCookware` | `boolean` | `true` | Include cookware tags (e.g. `#Sartén antiadherente{24%cm}`) |
| `lang` | `'es' \| 'en' \| 'de'` | `'es'` | Primary language code for ingredient names & advice |
| `authorName` | `string` | `'tortilladepatatas.org'` | Custom author name for recipe header |
| `sourceUrl` | `string` | `undefined` | Source link for recipe header |

---

## Running Unit Tests

To run the unit tests associated with this module:

```bash
npx vitest run tests/recipeSchemaTranslator.test.ts tests/cooklangExporter.test.ts
```

---

## License

MIT - Free for open-source and commercial usage in any culinary project.
