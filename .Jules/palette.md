## 2024-05-15 - Localized Accessible Disclosure Patterns
**Learning:** Found that localized apps often miss translations for `aria-label`s on expand/collapse buttons (disclosure patterns), and may miss `aria-expanded` and `aria-controls` bindings which screen reader users rely on to understand state.
**Action:** Always ensure disclosure buttons have `aria-expanded` matching state, `aria-controls` pointing to the content ID, and that their `aria-label`s use the same `isEs` / `isDe` localization logic as the visible text.
