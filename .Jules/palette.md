## 2024-05-18 - Missing ARIA Expansion State for Mobile Menus
**Learning:** React components containing expandable mobile menus or submenus frequently forget to include `aria-expanded` and `aria-controls` attributes, which are crucial for screen readers to understand the current state and what content the button controls.
**Action:** When working on navigation components, always check for missing `aria-expanded` attributes on toggle buttons and add `aria-controls` where possible.
