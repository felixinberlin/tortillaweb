## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.

## 2025-05-18 - Card-style button toggles need explicit accessibility
**Learning:** When using custom `<button>` elements to create large, card-style toggles (like those used for selecting tortilla ingredients or doneness), it is critical to explicitly provide `aria-pressed` state and `focus-visible` styling. Without these, screen reader users cannot tell which option is active, and keyboard-only users cannot see which option they are currently focused on.
**Action:** Always ensure that custom button implementations that function as toggles or single-choice selectors have an `aria-pressed={isActive}` attribute and strong `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2` utility classes applied.