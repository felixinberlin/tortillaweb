## 2026-08-01 - Add aria-pressed and aria-expanded to interactive elements
**Learning:** Found that custom selection buttons and mobile toggles lacked proper ARIA attributes to indicate their active/expanded state for screen readers, and were missing keyboard focus indicators.
**Action:** Added aria-pressed for option selectors, aria-expanded for toggles, and focus-visible Tailwind classes for accessibility.
=======
## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.