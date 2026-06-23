# Bundle Builder — Frontend Take-Home

A two-column bundle builder: a multi-step accordion on the left, a live review panel on the right.

---

## Getting started

Requires **Node 18+** and **pnpm**.

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

```bash
pnpm build      # type-check + production bundle
pnpm preview    # serve the production build locally
```

---

## Architecture

### Feature-Sliced Design (FSD)

The project follows FSD layering — `app → pages → widgets → features → entities → shared`. Each layer can only import from layers below it. No circular dependencies.

```
src/
  app/
    providers/       # ThemeContext + ThemeProvider + useTheme
    styles/          # global CSS + design tokens
  pages/
    bundle-builder/  # BundleBuilderPage (layout composition only)
  widgets/
    builder/         # accordion steps, step cards, layout
    review-panel/    # ReviewPanel + all review sub-components
  features/
    change-quantity/ # ChangeQuantityControl
    select-variant/  # SelectVariantControl
    checkout/        # createCheckoutPayload + CheckoutButton
    save-system/     # SaveSystemActions
  entities/
    bundle/          # BundleCart zustand store + cart summary builder + selectors
    product/         # shared product types + ProductPrice + ProductHero
  shared/
    ui/              # Button, Accordion, DarkModeToggle
    lib/             # cn, formatCurrency, useDarkMode
```

### State

All cart state lives in a single **Zustand store** (`bundleCart.store.ts`). A pure `buildBundleCart` function derives the review summary (grouped lines, totals, savings) from raw store state and the JSON catalog — no derived state is stored.

Persistence is opt-in via Zustand's `persist` middleware writing to `localStorage`. Only activated when the user clicks **Save my system for later**. Clear the saved copy via the **Clear saved system** button that replaces it.

### Design tokens

All colors, radii, shadows, and type scales live in `globals.css` as CSS custom properties inside `@theme`. Tailwind 4 picks them up automatically — no `tailwind.config` needed. Both light and dark themes are defined there; the `.dark` class is toggled on `<html>` by `ThemeProvider`.

### Checkout payload

The checkout button logs a minimal server-ready payload:

```json
{
  "items": [
    { "productId": "...", "variantId": "...", "quantity": 1, "lineTotal": 34.98 }
  ],
  "planId": "plan-home-plus",
  "protectionId": "protection-accidental-damage",
  "total": 132.93
}
```

The server is expected to look up names, prices, and catalog details by ID.

---

## Decisions & tradeoffs

**Variant quantities are tracked per `productId::variantId` key.** Switching a card's active color does not zero out other variants — each variant holds its own count. The review panel renders every variant with `quantity > 0` as its own line, which is what the spec required.

**No accessories section.** The task brief lists Cameras, Sensors, Accessories, and Plan. The provided data has no accessories, so the section is omitted rather than rendered empty.

**Dark mode.** Not in the spec — added as an enhancement. Defaults to the OS preference and persists to `localStorage`.

---

## Not finished

- **Product images** — all `src` paths are defined in the JSON (e.g. `/images/cameras/wyze-cam-v4-white.png`) but the image files are not included. Cards fall back to an inline SVG glyph (camera or sensor icon).
- **Variant thumbnails** — same situation; the color-chip swatch falls back to the first letter of the variant label.
- **Review-panel thumbnails** — fall back to a `CAM` / `SNS` text chip.
- **Fast Shipping truck icon and the satisfaction-guarantee badge** — rendered as placeholder SVG / styled `div`. The spec didn't provide assets.
- **"Learn More" links** — anchor tags with no `href`; the spec has no destination for them.
- **Checkout** — logs the payload to the console. No actual payment or navigation flow.
- **Backend / API** — data is served from local JSON files under `src/data/`. The spec listed a backend as a bonus; it was not implemented.

