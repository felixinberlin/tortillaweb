## 2026-08-01 - Add aria-pressed and aria-expanded to interactive elements
**Learning:** Found that custom selection buttons and mobile toggles lacked proper ARIA attributes to indicate their active/expanded state for screen readers, and were missing keyboard focus indicators.
**Action:** Added aria-pressed for option selectors, aria-expanded for toggles, and focus-visible Tailwind classes for accessibility.
