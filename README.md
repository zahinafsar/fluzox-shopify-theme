# FLUZOX — Shopify Theme

A custom Shopify storefront for **FLUZOX**, an everything-store concept. Built on top of the Horizon-style theme baseline, then stripped to four pages and re-skinned with a clean, editorial aesthetic.

> One catalog, every category. Clothing, home, tech, kitchen, gifts.

## What ships

- **Homepage** — full-bleed hero, two product grids, story card.
- **Catalog** (`/collections/all`) — left sidebar with search, sort, dynamic filters from `collection.filters` (skips Availability), pagination at 24/page.
- **Product detail** — large hero image, click-to-swap thumbnail strip, variant pickers (pill buttons), price + add-to-cart that posts straight to `/cart/add`.
- **Cart** — two-column layout (items + summary), server-side qty updates via `/cart/change.js`, sticky summary, single Check Out CTA.
- **Stub pages** — 404, blog, article, page, contact, search, list-collections all minimized to a single CTA back to the catalog.

## Design

- **Palette** — pure white surfaces, ink black `#14110f`, racing red `#c8202a` accent.
- **Type** — Lilita One (display, via Google Fonts) for headings; Inter for body.
- **Motion** — GSAP + ScrollTrigger loaded from CDN, wired in `assets/throttle-haus.js`. Hero entry timeline, story stagger, product card reveal-on-scroll.
- **Imagery** — hero, story, and product fallbacks pulled from Pexels (URLs hardcoded; swap in theme editor or `templates/index.json`).

## File map

```
sections/
  throttle-hero.liquid          full-bleed hero w/ Pexels bg + pill CTA
  throttle-story.liquid         rounded story card, gradient overlay, pill CTA
  throttle-products.liquid      4-col product grid w/ Pexels fallbacks
  throttle-product.liquid       PDP: gallery, thumbs, variants, add-to-cart
  throttle-cart.liquid          cart items + summary, AJAX qty
  throttle-collection.liquid    catalog w/ left sidebar (search, sort, filters)
  throttle-collection-header.liquid
  throttle-stub.liquid          minimal CTA stub for unused templates
  header-group.json             header config (logo left, menu center, sticky)
  footer-group.json             keep
  header.liquid, footer.liquid  baseline (re-skinned via CSS)
assets/
  throttle-haus.css             theme tokens, color-scheme overrides, card/cart/header re-skin
  throttle-haus.js              GSAP loader + animations
templates/
  index.json                    home composition
  collection.json               → throttle-collection
  product.json                  → throttle-product + related grid
  cart.json                     → throttle-cart + related grid
  blog/article/page/page.contact/search/list-collections/404.json   stubs
snippets/
  stylesheets.liquid            includes throttle-haus.css
  scripts.liquid                includes throttle-haus.js, syncs cart count
  header-actions.liquid         drawer disabled, cart icon links to /cart
  cart-bubble.liquid            re-skinned (red bubble)
```

## Local development

Requires the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install).

```bash
shopify theme dev   # live preview against your dev store
shopify theme push  # push to a theme on the connected store
shopify theme pull  # pull current settings from the store
```

## Customizing the brand

Most edits happen in two places:

1. **Theme editor** (Online Store → Themes → Customize) — hero copy + image, story copy + image, product grid headings, collection picks.
2. **Code** — color tokens in `assets/throttle-haus.css` (`:root` block), Pexels fallback URLs in `sections/throttle-products.liquid`, default copy in `sections/throttle-hero.liquid` / `throttle-story.liquid`.

To change the wordmark in the header: either upload a logo image in Theme Settings → Logo, or rename the shop in **Shopify Admin → Settings → Store details** (the header falls back to `shop.name` styled with the display font).

## Filters on the catalog

The sidebar reads `collection.filters` from Shopify's Storefront Filtering API. To populate the list, install the **Shopify Search & Discovery** app and configure filters per collection. Without setup, only Search + Sort render.

## Notes

- Drawer cart is disabled (`snippets/header-actions.liquid` — `{% if false %}`). The cart icon always links to `/cart`.
- A page-load script in `snippets/scripts.liquid` syncs `sessionStorage['cart-count']` with the server cart, so the bubble can't go stale.
- Quantity changes on the cart page hit `/cart/change.js` and reload — no client-side cart state to drift.

## License

Private. All rights reserved.
