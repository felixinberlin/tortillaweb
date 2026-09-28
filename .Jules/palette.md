
## 2025-02-24 - Disclosure Pattern Accessibility
**Learning:** Found a disclosure pattern (expand/collapse) missing `aria-expanded` and `aria-controls` bindings.
**Action:** Always bind `aria-expanded` to the state and `aria-controls` to the ID of the collapsible content for expand/collapse buttons.
