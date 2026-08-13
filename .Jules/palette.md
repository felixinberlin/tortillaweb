## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.

## 2025-02-27 - Icon-only Interactive Elements
**Learning:** Found several instances of icon-only buttons (like modal close `<X />`, clear search, and active filter chips) that lacked `aria-label`s, rendering them inaccessible to screen readers. Also found clickable `<span>` tags acting as buttons.
**Action:** Added localized `aria-label`s to icon-only buttons. Converted clickable inline elements (like `<span>` with `onClick`) containing icons into proper `<button>` elements with `aria-label`s for screen reader access and keyboard navigability.
