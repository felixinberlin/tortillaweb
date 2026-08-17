## Palette's Journal

## 2025-02-27 - PollComponent Accessibility
**Learning:** Found interactive poll options disguised as `div`s with `onClick` handlers. While they function for mouse users, they break keyboard navigation and screen readers don't understand their state.
**Action:** Replaced `div` with native `<button>`, implemented semantic layout preservation (`w-full text-left`), and added `aria-pressed` for screen readers alongside keyboard focus states.
## 2023-10-27 - Icon-Only Action Buttons in Builder
**Learning:** Found multiple instances in the interactive Builder components (SelectedIngredientsBar, StepInventory) where icon-only buttons (like `X` for clear search/remove and chevrons for expand/collapse) lacked `aria-label`s. Because these components are highly dynamic and update the UI immediately without page loads, missing labels make it impossible for screen reader users to understand what action they are performing or to perceive the state (e.g., expanded/collapsed) of UI sections. Relying only on `title` attributes (as was done for the remove ingredient button) is insufficient for accessibility, as `title` is not reliably announced by all screen readers and is inaccessible to keyboard-only users without a mouse.
**Action:** Always verify that every `<button>` and `<Button>` containing only an icon (e.g., Lucide React icons) includes an explicitly translated `aria-label`. For toggleable sections, ensure `aria-expanded` is bound to the state variable alongside the `aria-label` that describes the toggle action.
