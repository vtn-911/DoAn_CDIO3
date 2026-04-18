# Design System Strategy: The Academic Curator

## 1. Overview & Creative North Star
The "Academic Curator" is the Creative North Star for this design system. We are moving away from the "industrial utility" of typical school management software toward an editorial, high-end experience that feels like a premium digital publication. 

The goal is to instill **Trust through Clarity**. We break the "template" look by utilizing intentional white space, high-contrast typography scales, and a layered surface architecture. Instead of a rigid, boxed-in grid, we use "Tonal Z-Space" to guide the administrator’s eye. The interface shouldn't feel like a database; it should feel like a well-organized, prestigious institution.

## 2. Colors & Surface Architecture
This system utilizes a sophisticated palette derived from the primary brand blues and functional success/error tones, but applied with "High-End Editorial" restraint.

### The "No-Line" Rule
To achieve a premium feel, **1px solid borders are strictly prohibited for sectioning.** We define boundaries through background color shifts.
*   **Background (`#fcf9f8`)**: Use as the base canvas for the entire application.
*   **Surface Container Low (`#f6f3f2`)**: Use for secondary sidebars or grouping related content.
*   **Surface Container Lowest (`#ffffff`)**: Use for primary content "sheets" or cards to make them pop against the background.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Level 0 (Base):** `surface`
*   **Level 1 (Sections):** `surface-container-low`
*   **Level 2 (Interactive Cards):** `surface-container-lowest`
*   **Level 3 (Floating Menus):** `surface-bright` with Glassmorphism.

### The Glass & Gradient Rule
For main Call-to-Actions (CTAs) and Hero KPI backgrounds, use a subtle linear gradient:
*   **Direction:** 135°
*   **From:** `primary` (#005daa)
*   **To:** `primary_container` (#0075d5)
This adds "soul" and depth that prevents the dashboard from looking like a flat Bootstrap template.

## 3. Typography: The Editorial Voice
We use **Inter** as the primary typeface. The hierarchy is designed to mimic a high-end broadsheet, where information density is high but readability is effortless.

*   **Display Scale:** Use `display-md` (2.75rem) for high-level enrollment numbers or financial totals. It commands authority.
*   **Headline Scale:** Use `headline-sm` (1.5rem) for page titles. Bold weight.
*   **Title Scale:** Use `title-md` (1.125rem) for card headers. This is the "Anchor" of your layout.
*   **Body Scale:** Use `body-md` (0.875rem) for all data table entries and descriptions.
*   **Label Scale:** Use `label-md` (0.75rem) for table headers and metadata, always in `on_surface_variant` (#404753) to reduce visual noise.

**The Editorial Rule:** Always pair a `display` or `headline` element with a `label-md` uppercase descriptor above it to create an "asymmetric" vertical rhythm.

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. Place a `surface-container-lowest` card (Pure White) on a `surface-container-low` section (Off-white). This creates a soft, natural lift that mimics fine stationery.

### Ambient Shadows
For floating elements (Modals, Dropdowns), use the following shadow specification:
*   **Blur:** 24px - 40px
*   **Opacity:** 4% - 6%
*   **Color:** Use a tinted version of `on_surface` (#1c1b1b). Avoid pure black shadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in a high-density data table), use a **Ghost Border**:
*   **Token:** `outline_variant` (#c0c7d6)
*   **Opacity:** 20%
*   **Weight:** 1px

## 5. Components

### KPI Cards (The Signature Component)
*   **Structure:** No borders. Use `surface-container-lowest` (#ffffff).
*   **Rounding:** `DEFAULT` (8px).
*   **Visual Interest:** A subtle 4px vertical accent bar on the left using the `primary` or `secondary` token to denote category.
*   **Hierarchy:** Label (Top-Left), Value (Center-Left), Trend Indicator (Bottom-Right).

### Buttons
*   **Primary:** Gradient (Primary to Primary Container), white text, `DEFAULT` (8px) rounding.
*   **Secondary:** `surface-container-highest` background with `on_surface` text. No border.
*   **Tertiary:** Ghost style. `primary` text, no background.

### Data Tables
*   **Header:** `surface-container-high` background. No vertical dividers.
*   **Rows:** Alternate between `surface` and `surface-container-low` for zebra striping.
*   **Typography:** Use `body-md` for row content. Ensure `on_surface` has a high contrast ratio against the background.

### Inputs & Fields
*   **Style:** Filled style using `surface-container-highest`.
*   **Active State:** 2px bottom-border using `primary`.
*   **Error:** Background shifts to `error_container` with `on_error_container` text.

### High-End Contextual Components
*   **Status Pills:** Use `secondary_fixed` for success and `error_container` for alerts. Use high-contrast text for legibility.
*   **Attendance Heatmaps:** Use tonal shifts from `surface-container` to `secondary` (Green) rather than harsh outlines.

## 6. Do’s and Don’ts

### Do:
*   **DO** use the Spacing Scale strictly. Gaps of `8` (2rem) between major sections and `4` (1rem) between cards.
*   **DO** use `surface-tint` sparingly to highlight active navigation states.
*   **DO** leave at least 24px of padding inside all cards to let the data "breathe."

### Don't:
*   **DON'T** use 1px solid black or grey borders to separate sections. Use tonal shifts.
*   **DON'T** use pure black (#000000) for text. Always use `on_surface` (#1c1b1b).
*   **DON'T** crowd the KPI cards. If the data is complex, use a "Secondary Sheet" (surface-container-low) to hide details behind a click.
*   **DON'T** use standard "Drop Shadows" on every card. Reserve elevation for elements that actually float or move.