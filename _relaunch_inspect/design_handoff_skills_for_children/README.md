# Handoff: Skills for Children — Marketing Site

## Overview

This is a hi-fi design handoff for **Skills for Children**, a free, evidence-based resource library for parents, educators, and therapists supporting children's well-being, self-regulation, and trauma recovery (author: Joshua Fisherkeller).

The bundle contains three fully-designed pages:

1. **Home** (`index.html`) — Hero, featured weekly resource, curated resource library (organized into "pillars" via collapsible accordions), help-us-grow CTA, featured book, and newsletter.
2. **Books** (`books.html`) — Featured book hero, full bookshelf grid (including upcoming/coming-soon states), praise/testimonials, newsletter.
3. **Blog** (`blog.html`) — Featured + standard article cards in a main column, sticky sidebar with categories, newsletter card, and tag cloud.

All three pages share one stylesheet (`design/site.css`) and one set of brand assets.

---

## About the Design Files

The files in `design/` are **design references created in HTML/CSS** — high-fidelity prototypes showing the intended visual treatment, layout, and interaction behavior of every page.

**They are not production code to copy directly.** The job is to **recreate these designs in the target codebase using its established patterns and libraries** (Next.js, Astro, SvelteKit, plain HTML/CSS, a CMS theme — whatever the production environment is). If no environment exists yet, choose the most appropriate framework and implement the designs there.

That said: the CSS is reasonably clean and the design tokens (custom properties) are worth lifting wholesale. The HTML structure can serve as a structural blueprint, even if the rendering layer changes (e.g. into React components or an Astro `.astro` template).

---

## Fidelity

**High-fidelity (hifi).** Pixel-perfect intent — final colors, typography scale, spacing, radii, shadows, and interaction states are all locked in. Recreate the UI pixel-perfectly using the codebase's component patterns.

A handful of areas are intentionally placeholder and need real content:
- Hero image (currently a remote GitHub raw URL — see Assets section)
- Book covers (`book-cover-frame` with `.book-placeholder-label`)
- Blog post hero images (`post-thumb` with `.post-thumb-label`)
- Some "pillar" accordion bodies are empty in the HTML (only the first two pillars are populated as demonstrations). The full library lists 207 resources across 17 pillars — content for the remaining pillars needs to come from the site owner.

---

## Design System

### Color tokens (light mode — `:root`)

```css
/* Surface */
--cream:    #f6f4ef;   /* page background */
--paper:    #fbf9f4;   /* card surface */
--paper-2:  #efece4;   /* recessed surface */

/* Ink */
--ink:      #1a3a2e;   /* primary text, primary button bg */
--ink-soft: #2d4f43;   /* secondary text */

/* Brand greens */
--sage:      #3d6b5a;  /* primary accent (eyebrows, links on hover) */
--sage-soft: #6b9080;

/* Brand tans */
--tan:      #c9a96e;   /* secondary accent (highlight under hero em, CTAs) */
--tan-soft: #e2cda1;

/* Neutrals (in oklch) */
--muted:         oklch(0.55 0.015 110);
--muted-2:       oklch(0.7  0.012 110);
--border:        oklch(0.9  0.008 100);
--border-strong: oklch(0.82 0.012 100);

/* Soft accent washes (used for badge backgrounds, icon pads, hero photo bg) */
--wash-sage:  oklch(0.94 0.022 160);
--wash-tan:   oklch(0.94 0.028 80);
--wash-cream: oklch(0.965 0.012 90);
```

### Color tokens (dark mode — `[data-theme="dark"]`)

```css
--cream:    #131815;   /* warm green-black page bg */
--paper:    #1a201d;
--paper-2:  #242b27;
--ink:      #ecefe9;   /* light text + inverse surface */
--ink-soft: #c3c9c1;
--sage:     #8fc9b1;   /* brighter for dark surfaces */
--sage-soft:#5d8d77;
--tan:      #d9b878;
--tan-soft: #8e7846;
--border:        rgba(255, 255, 255, 0.07);
--border-strong: rgba(255, 255, 255, 0.14);
--wash-sage:  oklch(0.28 0.04 160);
--wash-tan:   oklch(0.30 0.04 80);
--wash-cream: oklch(0.20 0.015 90);
```

Theme is toggled via `<html data-theme="light|dark">`. An inline script in `<head>` reads `localStorage['sfk-theme']` (or `prefers-color-scheme` as fallback) and sets the attribute before paint to avoid FOUC.

### Typography

Loaded from Google Fonts in each page's `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
--font-display: "DM Sans", ui-sans-serif, system-ui, ...;   /* headings, buttons, brand */
--font-body:    "Inter",   ui-sans-serif, system-ui, ...;   /* body, paragraphs */
--font-mono:    "JetBrains Mono", ui-monospace, ...;        /* eyebrows, meta, badges */
```

Type scale (with fluid clamp where applicable):
- `h1`: `clamp(40px, 6.4vw, 84px)`, weight 500, letter-spacing −0.035em, line-height 1.08
- `h2`: `clamp(28px, 3.6vw, 48px)`, weight 500, letter-spacing −0.028em
- `h3`: `clamp(20px, 2vw, 26px)`, weight 500, letter-spacing −0.02em
- `h4`: 17px, weight 600, letter-spacing −0.01em
- Body: 16px, line-height 1.55, `font-feature-settings: "ss01", "cv11"` for Inter stylistic alternates
- `.eyebrow`: 12px JetBrains Mono, uppercase, letter-spacing 0.18em, sage color, with a 18px wide horizontal rule before the text (`::before` pseudo)

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.

### Spacing & radii

```css
--gutter:    clamp(20px, 4vw, 48px);       /* container padding-inline */
--section-y: clamp(64px, 9vw, 128px);      /* vertical section padding */
--max-w:     1240px;                       /* container max-width */

--r-xs:  8px;
--r-sm:  12px;
--r-md:  18px;
--r-lg:  24px;
--r-xl:  32px;
--r-2xl: 48px;
--r-pill: 999px;
```

### Shadows

```css
--shadow-1:    0 1px 2px rgba(26,58,46,0.04), 0 1px 1px rgba(26,58,46,0.03);
--shadow-2:    0 2px 4px rgba(26,58,46,0.04), 0 6px 16px -8px rgba(26,58,46,0.10);
--shadow-3:    0 4px 10px rgba(26,58,46,0.05), 0 20px 40px -20px rgba(26,58,46,0.14);
--shadow-glow: 0 0 0 1px rgba(26,58,46,0.04), 0 30px 60px -30px rgba(26,58,46,0.22);
```

Shadows in dark mode use pure black with higher opacity (see `[data-theme="dark"]` block in `site.css`).

### Background ambient gradients

The page body gets two soft radial gradients (warm tan top-right, sage soft top-left) via `body::before`, with `mix-blend-mode: multiply` (light) / `screen` (dark) at ~0.55–0.7 opacity. This is what gives the page its subtle "warmth" — implement it as a fixed full-viewport overlay behind content.

---

## Components

A short catalogue of every reusable element. See `design/site.css` for exact CSS — class names listed here.

### Header (`.site-header`)
Sticky, 14px vertical padding (10px when `.is-scrolled`). Backdrop-blurred semi-transparent cream. Three regions: `.brand` (logo + wordmark), `.nav-links` (pill-shaped active state), `.nav-cta` (theme toggle + Subscribe button).

### Buttons (`.btn`)
- `.btn--primary` — dark green (`--ink`), cream text
- `.btn--ghost` — transparent, bordered
- `.btn--tan` — tan bg, ink text
- `.btn--sm` — smaller padding/font
- All have hover `translateY(-1px)` and a `.arrow` SVG that slides 3px on hover

### Quick exit (`.quick-exit`)
Fixed bottom-right button linking to weather.com. Has a pulsing tan dot. Trauma-safety pattern — let users abandon the page fast. **Keep this.**

### Hero (`.hero`)
Two-column grid (collapses on `<980px`). Left: eyebrow → h1 (with `<em>` highlighted in sage with a tan underline behind via `::after`) → lede → CTA row → trust dots row. Right: tall aspect-ratio photo with two floating cards (`.hero-floater--tl`, `.hero-floater--br`) gently bobbing via `@keyframes floatY`.

### Stats strip (`.stats`)
Horizontal-rule-bracketed row of 4 stats. Collapses to 2×2 on mobile.

### Featured resource (`.featured`)
Large paper card with a soft radial blob in the top-right corner. Left: tag chip → h3 → description → bulleted feature list (each bullet has a sage-ringed dot) → CTA. Right: 16:10 YouTube embed.

### Coffee strip (`.coffee`)
Small paper card with an icon, dual-line message, and a tan CTA. Used for "buy me a coffee" appeal.

### Resource browser
- `.resources-intro` — gradient banner with explainer text + CTA
- `.search-bar` — sticky, blurred, grid of (search input | 3 dropdown chips | clear button)
- `.pillar-section` — groups of pillars, with a header showing section title + resource count chip
- `.pillar` — collapsible `<details>` with a 4-column summary grid: icon pad | title/desc | count chip | chevron. `[open]` rotates the chevron and inverts its background.
- `.pillar-body` — auto-fill grid of resource cards
- `.rcard` — resource card: top row (badge + format label) → h4 → desc → source (mono) → border-topped action row (link + copy button)
- `.rcard--video` — variant with a 16:9 iframe at top
- Badges: `.badge--children` (tan wash), `.badge--caregivers` (sage wash), `.badge--professionals` (ink wash), `.badge--teens` (sage wash)
- `.def-card` — explainer card for the trauma intro section (icon + text)

### Duo grid (`.duo-grid` + `.duo-card`)
Two large cards side-by-side for "Suggest / Request a resource" and praise quotes.

### Book feature (`.book-feature`)
Two-column hero for a single book: tall 3:4 cover frame on the left, copy + CTAs on the right. Soft sage radial blob in the bottom-right corner.

### Book cards (`.book-card`, in `.books-grid` of `repeat(3, 1fr)`)
Each card has a 3:4 cover frame, title, meta line (mono), description, and an action row. Cards for upcoming books use `opacity: 0.7` and a striped placeholder background. There's also a "submit a topic" card variant that uses the soft sage/tan gradient.

### Newsletter (`.newsletter`)
Full-width dark ink section with two radial blobs (tan bottom-left, sage top-right). Two-column inner: eyebrow + h2 on the left, paragraph + pill-shaped inline form on the right (`<input>` and tan `.btn` inside a single bordered pill).

### Blog (`.blog-grid` of `1.5fr | 1fr`)
- `.post-card` — 200px thumb + content, hover lifts and shadows
- `.post-card--featured` — single-column variant, wider thumb (16:8), gradient background
- `.post-meta` — mono row of category chip + date + read time + author
- `.blog-sidebar` — sticky, with `.sidebar-card` blocks for categories list, newsletter signup, and `.tag-cloud`

### Footer (`.site-footer`)
4-column grid: brand col (1.4fr) + 3 link cols (1fr each). Mono uppercase `h5` headers. Bottom bar with copyright and `.footer-socials` icon row.

### Toast (`.toast`)
Fixed bottom-center, ink pill, slides up from below. Triggered by `window.showToast(msg)`.

---

## Interactions & Behavior

All implemented in inline `<script>` at the end of each page. Re-implement in the target framework's idioms (React effects, Astro client directives, etc.).

1. **Theme toggle** — `<html data-theme>` attribute, persisted to `localStorage['sfk-theme']`. Inline FOUC-prevention script in `<head>` sets the attribute before first paint.
2. **Sticky header shadow** — `.site-header` gets `.is-scrolled` class when `window.scrollY > 12`.
3. **Scroll reveal** — Elements with `.reveal` start at `opacity: 0; translateY(16px)` and animate to visible when they enter the viewport (IntersectionObserver with `rootMargin: '0px 0px -60px 0px'`, threshold 0.05). Items already in the initial viewport are revealed immediately. Animation is **opt-in via the `html.js-anim` class** so no-JS or pre-observer paint stays visible — see the `@media (prefers-reduced-motion: no-preference)` block.
4. **Resource pillars** — Native `<details>`/`<summary>`. The chevron rotates 180° via CSS on `[open]`.
5. **Copy link button** — Delegated click handler on `.rcard-copy`. Reads `data-copy` attribute, writes to clipboard via `navigator.clipboard.writeText`, briefly swaps button text to "Copied ✓", and shows the toast.
6. **Newsletter form** — Inline `onsubmit` handler that just clears the input and shows a "You're on the list ✓" toast. **Wire to a real list (ConvertKit / Buttondown / Mailchimp) in production.**
7. **Hero floaters** — CSS `@keyframes floatY` (6s ease-in-out infinite, 3s offset between the two cards).
8. **Quick exit** — Standard `<a href="https://www.weather.com">`. Pulsing dot via `@keyframes pulse`. (Consider opening in a new tab and/or `window.location.replace` for true privacy.)
9. **Theme toggle hover** — 15° rotation; sun/moon icons cross-fade via opacity + transform on `[data-theme="dark"]`.

---

## Responsive breakpoints

- `<980px`: hero collapses to single column, photo becomes 4:3, floaters hide. Featured grid, stats grid (2 cols), duo grid, book feature, newsletter inner, footer (2 cols), blog grid, books grid all become single-column or 2-up. Blog sidebar becomes static.
- `<640px`: nav links hide (no mobile menu in the design — **add a hamburger in production**), search bar stacks, stats 2×2, pillar summary drops the count chip, footer 2 cols, books 1 col, sections tighten.

A real production build should include a proper mobile nav (the current design has none — flag for the team).

---

## State Management

Minimal:
- `theme` (`'light' | 'dark'`) — persisted in `localStorage`
- Resource search/filter values — currently the inputs/selects are not wired. Production should:
  - Maintain a source-of-truth resource list (probably as JSON or via CMS)
  - Filter cards client-side by search query (title/source/topic), audience, format, section
  - Reset on "Clear" button
- Newsletter subscription — wire to email provider API
- Copy-to-clipboard — fire-and-forget, with a toast and a transient "Copied" state on the button

---

## Assets

Located in `design/`:

| File | Purpose |
|---|---|
| `sfk logo white background.png` | Brand logo used in header and footer (36×36 circle) |
| `sfk logo transparent.png` | Transparent-bg variant |
| `Skills for children White Logo transparent.png` | White logo for dark backgrounds |

**External assets referenced in the HTML:**
- Hero image: `https://raw.githubusercontent.com/joshuafisherkeller/skillsforchildren/main/SFK%20HERO.png` — re-host this in the production project's image pipeline (avoid pulling from a raw GitHub URL in prod).
- YouTube embeds: `https://www.youtube.com/embed/fITPTH62DAo` (Try Something New), `https://www.youtube.com/embed/_mZbzDOpylA` (belly breathing example)
- Google Fonts: DM Sans, Inter, JetBrains Mono (see Typography section)
- Affiliate book links: `https://amzn.to/4qLZztE`, `https://amzn.to/3MYO02Q`

**Missing assets (placeholders in the design):**
- Real book cover artwork (3 books currently use placeholder frames)
- Blog post hero images (6 posts use placeholder frames)
- Hero image needs to be re-hosted

---

## Pages — Page-by-page notes

### `index.html` (Home)
Section order:
1. Quick exit (fixed, top-level)
2. Header
3. Hero
4. Stats strip
5. Featured Resource ("Resource spotlight")
6. Coffee strip
7. Resources library (`#resources`)
   - Resources intro banner
   - Search bar (sticky)
   - Skills for Children pillar section (8 pillars)
   - Childhood Trauma pillar section (with a `.def-card` intro + 9 pillars)
8. Help us grow (`#submit`) — duo grid
9. Books feature (`#books`)
10. Newsletter (`#newsletter`)
11. Footer

Only 2 of the 17 pillars have their bodies populated with sample `rcard`s — the rest are intentionally empty pending real content.

### `books.html`
1. Page hero
2. Featured book hero
3. Bookshelf grid (3 published + 2 upcoming + 1 "submit a topic" card)
4. Praise duo
5. Newsletter
6. Footer

### `blog.html`
1. Page hero
2. Blog grid: 6 article cards (1 featured + 5 standard) + sticky sidebar with categories list, newsletter card (gradient bg), and tag cloud
3. Footer

---

## Recommendations for the production rebuild

1. **Framework**: Astro fits this content-heavy, mostly-static site well (per-page islands for the theme toggle / IO reveal / copy buttons). Next.js works too — these pages would map cleanly to `app/page.tsx`, `app/books/page.tsx`, `app/blog/page.tsx` with a shared `layout.tsx`.
2. **Move the resource library to data**: Author the 207 resources as YAML/JSON/MDX (or back them with a CMS like Sanity, Notion, or Decap). Render the pillars by mapping over the data. This removes the empty pillar bodies and unlocks real search/filter.
3. **Component the obvious things**: `<Header>`, `<Footer>`, `<Newsletter>`, `<ResourceCard>`, `<PillarSection>`, `<Pillar>` (probably a `<details>` still, or a Radix/headless Accordion if you want better animation), `<BookCard>`, `<PostCard>`, `<QuickExit>`, `<ThemeToggle>`, `<Toast>`.
4. **Keep the CSS custom properties** — they're a clean little design system. If you adopt Tailwind, port them into `theme.extend` or expose them via `@theme` (Tailwind v4). If you keep CSS Modules / vanilla CSS, lift `site.css` and componentize the section blocks.
5. **Add a mobile nav** — the current design has none. A hamburger that opens a sheet/drawer matches the soft, friendly tone.
6. **Wire the newsletter** — pick a provider (ConvertKit, Buttondown, Mailchimp, Loops) and hook the form.
7. **Replace remote hero image** — bring SFK HERO.png into the project's image pipeline (Astro `<Image>`, Next.js `<Image>`).
8. **Accessibility check** — the design already includes `aria-label`s on icon-only controls, `:focus-visible` outlines, and a skip-link could be added at the top of `<main>` for keyboard users.
9. **Trauma-safety**: the Quick Exit is a deliberate trauma-informed pattern. Confirm with stakeholder whether it should replace history (`window.location.replace`) and open in a new tab.

---

## Files in this bundle

```
design_handoff_skills_for_children/
├── README.md                                       (you are here)
└── design/
    ├── index.html                                  Home page reference
    ├── books.html                                  Books page reference
    ├── blog.html                                   Blog page reference
    ├── site.css                                    Shared stylesheet — design tokens + all component styles
    ├── sfk logo white background.png               Brand logo (header/footer)
    ├── sfk logo transparent.png                    Logo, transparent bg
    └── Skills for children White Logo transparent.png   White logo for dark surfaces
```

Open any of the `.html` files in a browser to see the live design. Resize the window to verify the responsive behavior. Toggle the moon/sun icon in the top-right to verify dark mode.
