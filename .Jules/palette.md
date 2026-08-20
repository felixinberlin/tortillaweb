## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.

## 2025-02-12 - Missing ARIA Labels on Pagination Buttons
**Learning:** Pagination buttons containing only chevron icons (Prev/Next/First/Last) are frequently implemented without ARIA labels, making them ambiguous or entirely opaque to screen reader users who only encounter the raw HTML structures. While tooltips provide mouse-hover context, they do not inherently expose accessible names to assistive technology.
**Action:** When auditing list-based UI components (e.g. galleries, logs, timelines), explicitly check pagination controls for an `aria-label` alongside existing `title` tags.
