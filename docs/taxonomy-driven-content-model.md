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

---

# Design Principles

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