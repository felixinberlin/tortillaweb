## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.

## 2026-08-15 - Filter Tag Accessibility
**Learning:** Found interactive remove icons (X marks) in active filter tags functioning directly on SVG elements with `onClick`. This prevents screen readers from announcing them as interactable and removes keyboard navigability.
**Action:** Wrapped the SVGs in native `<button>` elements with descriptive `aria-label` attributes and proper `focus-visible` states for keyboard navigation.
