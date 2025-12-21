# Palette's Journal

## 2024-05-22 - Accessibility First with Standard Components
**Learning:** Using standard UI components like Radix UI primitives (via shadcn/ui) automatically solves many accessibility issues (like `role="progressbar"`) that custom `div` implementations miss.
**Action:** Always check if a standard component exists before building a custom UI element, especially for interactive or stateful widgets.

## 2024-05-24 - RTL Progress Bar Pattern
**Learning:** For directional components like Progress bars in RTL layouts, CSS transform `scale-x-[-1]` is a robust, logic-free solution that preserves the component's internal state logic.
**Action:** Use `scale-x-[-1]` for simple LTR->RTL visual mirroring of progress indicators.
