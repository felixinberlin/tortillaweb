# Taxonomy-Driven Content Architecture

## Overview

The TortilladePatatas.org platform uses a taxonomy-driven content architecture designed to scale from a recipe website into a structured culinary knowledge platform.

The objective is to separate:

- Content entities (recipes, articles, guides)
- Taxonomies (factions, ingredients, techniques, regions, people, etc.)
- Localization
- Presentation logic

This approach follows headless CMS principles used by systems such as TYPO3, Drupal, Contentful, Sanity, and similar structured content platforms.

The architecture avoids hardcoded categories and allows the website to grow without requiring structural changes.

## 2. Trivia & Verification Compendium (6 Master Categories)

Trivia entries are stored in `src/content/pages/trivia/` split across **6 master categories** to optimize page payload and maintain modularity:

1. **`01_History_and_Foundations.json`**: 18th-century agricultural treatises, CSIC archival discoveries, earliest written records, and historic military legends.
2. **`02_Regional_Traditions.json`**: Día de la Tortilla celebrations, Jueves Lardero picnics, Santa Juana pilgrimages, and municipal customs across Spain.
3. **`03_Culinary_Science_and_Safety.json`**: Maillard reaction, thermal coagulation of egg proteins, starch gelatinization, pasteurization, and thermal safety rules (**70°C for 2 minutes**, **63°C for 20 seconds**, **4 hours** exposure limit).
4. **`04_Pop_Culture_and_Media.json`**: Spanish cinema (Airbag), Mortadelo y Filemón comic gags, literature, and television archives.
5. **`05_World_Records_and_Events.json`**: Giant tortilla attempts (Vitoria-Gasteiz, Melide), Guinness World Record claims, and notarized events.
6. **`06_Factions_and_Debates.json`**: Concebollistas vs Sincebollistas, CIS national polls, and Michelin chefs statements.

Master summaries and full datasets are also exported as clean JSON in `public/data/` and `docs/`.


## 1. Recipes are independent entities

Recipes are the primary content objects.

A recipe does not belong to a single category.

Instead, recipes reference multiple taxonomies.

Example:

```json
{
  "id": "classic-home",
  "taxonomyIds": [
    "faction:concebollistas",
    "ingredient:onion",
    "technique:slow-cooking"
  ]
}