# Handoff: Resilient Forest — Book Marketing Site

## Overview

A single-page marketing website for **_A Journey of Brave Friends_**, Book One of the *Tales of the Resilient Forest* series by Joshua Fisherkeller, MSW. The book is a Trauma-Focused Cognitive Behavioral Therapy (TF-CBT) companion for children ages 5–10, structured around the four PRAC skills (Psychoeducation, Relaxation, Affective expression & modulation, Cognitive coping).

The site introduces the book, its five animal characters (Timothy the Turtle, Rex the Rabbit, Kiki the Koala, Bella the Bear, Olive the Owl), previews each of the four chapters with passages and illustrations from the book, explains the TF-CBT lineage, addresses parents and therapists separately, and routes readers to purchase channels.

The aesthetic is a **painterly Ghibli-inspired forest**: deep mossy greens, warm autumnal embers, cream-paper backgrounds, italic display serifs, and gentle ambient motion (drifting leaves, parallax, scroll-reveal).

## About the Design Files

The files in this bundle (`design/index.html`, `design/tweaks.jsx`, etc.) are **design references created in HTML** — a working prototype that documents the intended look, layout, copy, and behavior. They are **not production code to copy verbatim**.

The task is to **recreate these designs in the target codebase's existing environment** (React/Next.js, Astro, Vue/Nuxt, plain HTML/CSS, etc.) using its established patterns, component library, and conventions. If no codebase exists yet, the recommended stack is **Astro + Tailwind** (static-first, image-heavy site with minimal JS — Astro's strengths) or **Next.js (App Router)** if a CMS, blog, or commerce flow is planned.

Notes on what to bring forward vs. rebuild:

- **Bring forward verbatim:** all copy, all character descriptions, all chapter summaries, all book passages used as pull-quotes, the author bio, the design tokens table below, and all the illustration assets in `design/assets/`.
- **Rebuild idiomatically:** the layout, the Tweaks panel (it was a design-tool affordance for the author to preview palette variations — not a production feature), the React-via-Babel scripting, and the `<image-slot>` web component (those were placeholder drop-targets for prototyping; the production site should just embed final images).

## Fidelity

**High-fidelity.** This is a pixel-targeted mockup with final colors, typography, spacing, copy, illustrations, and interactions. A developer should aim to match the look closely. The CSS variables, font stacks, and exact hex values in the **Design Tokens** section below are the source of truth.

The one section that should be **interpreted, not copied pixel-by-pixel** is the Tweaks panel (bottom-right of viewport when toolbar toggle is on) — it was a prototyping tool, not a production feature. Omit it from the production site.

## Screens / Views

The site is **a single long-scroll page** with eight sections, plus a fixed top nav and a global drifting-leaves overlay.

### Top Nav (`<nav class="top">`)

- Fixed, full-width, z-index 50
- Transparent over the hero (light cream text, soft text-shadow for legibility against the painted cover)
- On scroll past 80px: gains a blurred cream background (`rgba(251, 245, 227, 0.85)` + `backdrop-filter: blur(12px) saturate(1.1)`) and switches text color to dark moss
- Padding: `18px 36px`
- **Left:** Brand block — "Tales of the Resilient Forest" in italic Cormorant Garamond (20px), with "Book One" uppercase eyebrow underneath (10px, letter-spacing 0.22em)
- **Right:** Six anchor links (Story, Brave Friends, PRAC, Chapters, Author, Read It), uppercase, 13px, letter-spacing 0.06em, gap 32px
- Hides nav links on viewports < 980px (mobile shows only the brand mark — no hamburger menu is implemented in the design; if needed, add one in production)

### 01 Hero (`<header class="hero">`)

- Full viewport height, min-height 720px
- **Background:** the book cover painting (`assets/cover.png`) at `background-size: cover`, `background-position: center 30%`, extended `-8%` above the viewport so the parallax scroll never reveals an edge
- **Parallax:** on scroll, the bg translates down `scrollY * 0.35px` and scales up slightly (`1 + scrollY * 0.0002`). JS handler is in the inline `<script>` near the bottom of `index.html`.
- **Vignette overlay** (z-index -1): a vertical gradient that's transparent up top and darkens to `rgba(32, 40, 29, 0.7)` at the bottom for text legibility
- **Hero grain** (z-index -1): two soft radial gradients (warm cream top-left, ember orange bottom-right) with `mix-blend-mode: soft-light` for a painted feel
- **Hero content** (bottom-anchored, centered):
  - Eyebrow: "Book One · Tales of the Resilient Forest" — 11px, letter-spacing 0.36em, uppercase, flanked by 36px hairlines (`::before`/`::after`)
  - Title: "A Journey of / Brave Friends" — Cormorant Garamond italic 500, `clamp(48px, 8vw, 116px)`, line-height 0.95, line-break after "of"
  - Subtitle: italic Cormorant 19–22px, max-width 640px
  - Byline: "— a book by Joshua Fisherkeller" — Caveat (handwritten), `clamp(22px, 2vw, 28px)`, color `var(--ember-soft)`
  - CTAs: "Read the Book" (primary ember button) and "Begin the Journey" (ghost button with cream border)
- **Scroll cue** at bottom center: "Step into the forest" with a 1px vertical hairline below it, bobs in a 3s ease-in-out infinite animation

### 02 The Story (`<section class="story">`)

Cream paper background with a subtle 24px dot-grid texture overlay (radial-gradient pattern at 4% opacity).

Two-column grid (1.1fr / 0.9fr), gap 80px, max-width 1180px container.

**Left column — long-form prose:**
- Section eyebrow "The Story" with 32px ember hairline
- Section title "A path through the forest, hand in hand." — italic Cormorant `clamp(36px, 5vw, 64px)`, moss-deep color
- Three paragraphs (17px Nunito, line-height 1.75, ink-soft color) — first paragraph has a `::first-letter` drop cap (5.4em, italic Cormorant, ember color)
- Pull-quote in the middle: book's dedication — "*To therapists, child welfare professionals, and foster parents who stand as steadfast oaks…*" — italic Cormorant 26px with 2px ember left border, cited "— Dedication" in Caveat

**Right column — book mockup:**
- 3D book cover rendered in CSS: tilted with `transform: rotateY(-8deg) rotateX(2deg)`, aspect-ratio 3/4
- Multi-layered box-shadow for depth (drop shadow + soft glow + inset shadow simulating page edge)
- "Pages" element: a 14px-wide gradient strip on the right edge simulating book pages
- On hover the cover lifts slightly (`rotateY(-3deg)` + `translateY(-6px)`, 0.6s cubic-bezier)
- Title/byline text is overlaid on top of the cover image (italic Cormorant 20–32px, Caveat byline)

### 03 Meet the Brave Friends (`<section class="friends">`)

Background: a radial meadow-green wash at the top transitioning into a deeper cream below.

5-column grid of character cards (collapses to 2 columns < 980px, 1 column < 540px).

**Each `.friend-card`:**
- Cream background, 14px border-radius, layered subtle shadow
- On hover: lifts `translateY(-6px)` and gains a deeper shadow (0.4s ease)
- **Top:** `.friend-art` — aspect-ratio 4/5, holds an `<img>` of the character painting from the book. On card hover, image scales to 1.04 (0.8s).
- **Body** (22px padding): name in italic Cormorant 28px, species in Caveat 18px ember, role tag in 11px uppercase letter-spaced ink-soft, then a 14.5px description

**The five cards** (exact content):

| Name | Species | Role | Description |
|------|---------|------|-------------|
| Timothy | the Turtle | Chapter 1 · Psychoeducation | A brave little turtle who lives in a peaceful pond. After a big storm, the world outside his shell feels a lot scarier than before — and he begins to learn that what he feels is okay. |
| Rex | the Rabbit | Chapter 2 · Relaxation | Quick on his feet, but sometimes his heart races faster than his paws. After a tumble in the stream, Rex learns that a big breath can be braver than a big leap. |
| Kiki | the Koala | Chapter 2 · Relaxation | High in the eucalyptus trees, Kiki is known for her peacefulness no matter what is happening around her. She teaches her friends to find the still place inside. |
| Bella | the Bear | Chapter 3 · Affective Expression | Strong and brave on the outside, with a storm of feelings inside. Bella learns that naming a feeling — in words, drawings, or even a slow, heavy dance — makes it easier to carry. |
| Olive | the Owl | Chapter 4 · Cognitive Coping | Wise eyes for the dark hours. Olive helps the friends notice their thoughts — the ones that are true and the ones that only pretend to be — and gently tell the difference. |

Images: `assets/characters/{timothy,rex,kiki,bella,olive}.jpg`.

### Forest Divider

Between Friends and PRAC: 80px-tall row of three pine-tree SVG glyphs separated by dots, color `var(--moss)` at 50% opacity.

### 04 The PRAC Skills (`<section class="approach">`)

**Dark moss-green section** — provides the strongest tonal contrast in the page.

- Background: layered radial gradients (moss-tinted top-left, ember-tinted bottom-right) over `var(--moss-deep)` (`#2f4524`)
- Text: cream, section title in cream, eyebrow in ember-soft
- Section eyebrow: "The PRAC Skills"
- Title: "Four foundational skills, told as four small stories."
- Lede explains TF-CBT begins with PRAC and the book walks each one

**4-column grid of `.practice-card`s:**

Each card: translucent cream background (`rgba(245, 236, 214, 0.06)`), 1px translucent border, 12px radius, 28px padding, backdrop-blur. Hovers lift `translateY(-3px)` and brighten.

- Big letter (P / R / A / C) in italic Cormorant 500, 56px, color `var(--ember-soft)`
- Heading: Cormorant 600 22px cream
- Body: 14px rgba cream 78%

Content (exact):
1. **P — Psychoeducation:** "A brave friend learns that what happened wasn't their fault — and that the way a small body reacts to big things is something every creature in the forest carries."
2. **R — Relaxation:** "Timothy the Turtle moves slowly on purpose. The friends learn his slow-lake breath: in for the mountain, out for the moon — a body that knows how to soften."
3. **A — Affective expression & modulation:** "Naming feelings in colors and weather, until even the biggest ones become small enough to hold — and the body learns it can ride them out."
4. **C — Cognitive coping:** "Olive the Owl helps the friends notice their thoughts — the ones that are true, and the ones that only pretend to be — and tell the gentle difference between them."

**Series note** (after the cards): dashed-border callout in faint cream/ember explaining that "Book One" covers only the foundational PRAC skills — the full TF-CBT arc continues in future volumes.

**Lineage credit** (bottom of section): "Built on the pioneering work of" eyebrow followed by *Judith A. Cohen, MD · Esther Deblinger, PhD · Anthony Mannarino, PhD* in italic Cormorant 18px.

### 05 Chapter Previews (`<section class="chapters">`)

Cream background with subtle radial-gradient washes (moss top-left, ember bottom-right).

A vertical stack of **four alternating chapter cards**, gap 40px.

**Each `.chapter-card`:**
- Two-column grid 1.1fr/1fr (reversed every other card via `.reverse` class)
- Cream background, 18px radius, layered shadow, hairline moss border
- **Left/right side:** `.chapter-image` — aspect-ratio 4/5, min-height 480px, full background-image of the chapter's painting from the book. A subtle 135° gradient overlay darkens the inner corner for visual depth.
- **Other side:** `.chapter-body` (48px 44px padding):
  - **Chapter tag:** 26px circular ember badge with the chapter number in italic Cormorant, followed by "Chapter X · [Skill]" in 10px uppercase letter-spaced ember
  - **Title:** italic Cormorant 500, `clamp(28px, 3vw, 40px)`, moss-deep
  - **Skill line:** Caveat 22px ember, prefixed with em-dash
  - **Passage:** italic Cormorant 18px, 2px meadow left-border, 20px left-padding — actual quote from the book
  - **Summary:** 14.5px Nunito ink-soft

**The four chapters** (exact content, with the book passages):

1. **Timothy the Turtle and the Big Storm** — Psychoeducation. Image: `assets/characters/timothy.jpg`. Passage: *"Timothy, you went through something really scary, and feeling scared is okay. It's normal to feel different after something like that. But remember, it's okay to talk about it, and it's okay to ask for help."*
2. **Rex the Rabbit and Kiki the Koala Take a Big Breath** — Relaxation (reverse). Image: `assets/characters/kiki.jpg`. Passage: *"In the heart of the forest, high up in the eucalyptus trees, lived a calm koala bear named Kiki. She was known for her peacefulness no matter what was happening around her."*
3. **Bella the Bear and the Storm Inside** — Affective Expression. Image: `assets/characters/bella.jpg`. Passage: *"Olive," Bella started, "sometimes I feel like there's a storm inside me, but I don't know how to share it. Sometimes I even say mean things, and I don't know why!"*
4. **Olive the Owl and the Helpful Thoughts** — Cognitive Coping (reverse). Image: `assets/scenes/owl-flight.jpg`. Passage: *"Just because I didn't do it the first time doesn't mean I can't do it at all."*

Mobile (< 980px): cards collapse to single column with image on top (16/9 aspect-ratio instead of 4/5).

### 06 For Parents & For Therapists (`<section class="audiences">`)

Plain paper background. Two-column grid of cards, gap 28px.

**Parents card** (left): cream background, ember circular icon (heart SVG), title "For parents & caregivers", body copy, dashed-divider, 4 bulleted feature lines. Bullets use a tiny CSS-shape "petal" marker (radial ember gradient, rotated 45°, leaf-like).

**Therapists card** (right): subtle gradient cream variant, moss circular icon (checkmark SVG), title "For therapists & clinicians", same structure. Bullet markers are moss/meadow petals.

Exact bullet content:

*Parents:*
- Gentle, age-appropriate language for ages 5–10
- Each chapter opens with *Notes for Trusted Adults*
- Discussion prompts to guide meaningful conversation
- Never asks a child to disclose; only to feel accompanied

*Therapists:*
- Chapter-by-chapter PRAC skill alignment
- Clinician notes printable and ready to use
- Caregiver handouts in plain language
- Designed for individual, group, and conjoint settings

### 07 Author (`<section class="author">`)

Cream-to-paper gradient background.

Two-column grid (280px portrait / flex body), gap 56px.

**Left — portrait:** Circular 1:1 area with a dark moss gradient background. Behind any author photo, an **SVG "Skills For Children · Books and Videos" badge** is drawn: a 2.5px cream ring with curved text top and bottom (using `<textPath>` on top and bottom semicircle arcs), and a simple jumping-child silhouette in the center. The `<image-slot>` placeholder sits above it at z-index 2 — in production, just use a real `<img>` here (the user said the slot is fine for now).

**Right — bio:**
- Eyebrow "The Author"
- H2 "Joshua Fisherkeller" — italic Cormorant `clamp(36px, 4.4vw, 56px)`, moss-deep
- Credentials in Caveat 22px ember: "MSW · helping children & families · Kentucky"
- Three paragraphs of bio (verbatim copy in `index.html`)
- Closing handwritten line in Caveat 22px: *"In his free time, he spends time in the Resilient Forest with his son, Maximilian, and his wife, Julia."*
- The bio includes a dotted-underline link to `https://skillsforchildren.com` in ember color

### 08 Read It (`<section class="buy">`)

Radial ember-washed cream background, centered text.

- Section eyebrow centered: "Bring the Book Home"
- Title: "Read it together, by the lake or the lamp."
- Lede about hardcover/paperback availability and that a portion supports children's mental health programs

**Buy grid** (3 columns, max-width 720px, gap 16px). Each `.buy-card`:
- Paper background, 1.5px translucent moss border, 14px radius, 26px 20px padding
- Centered: 12px ember uppercase "price" label, then italic Cormorant 22px destination ("Amazon" / "Bookshop.org" / "Order direct"), then 12px ink-soft micro-description
- Hover: lifts -3px, shadow deepens, border turns ember

Below the grid: a 56px gap then an outlined moss button "Join the newsletter for Book Two →".

### Footer (`<footer class="foot">`)

- Background: `var(--moss-deep)`, padding 64px 32px 36px, centered
- Big mark "Tales of the Resilient Forest" in italic Cormorant 26px cream
- Small line: "A series by Joshua Fisherkeller · Skills for Children"
- Links row (centered, gap 28px) including a link to `skillsforchildren.com`
- Copyright: "© 2024 Joshua A. Fisherkeller · All rights reserved · Illustrations from the book are used with permission."

## Interactions & Behavior

- **Smooth-scroll** via `html { scroll-behavior: smooth; }` for the in-page anchor nav.
- **Scroll-triggered nav:** When `window.scrollY > 80`, the top nav gains `.scrolled` class (cream blurred background, dark text). Transition: 0.4s ease.
- **Hero parallax:** On scroll inside the hero (while `scrollY < window.innerHeight`), the hero background translates `scrollY * 0.35px` down and scales `1 + scrollY * 0.0002`.
- **Reveal-on-scroll:** Every element with class `.reveal` starts at `opacity: 0; transform: translateY(24px)` and transitions to `opacity: 1; transform: translateY(0)` over 1s when it enters the viewport (IntersectionObserver, threshold 0.12, rootMargin `0px 0px -8% 0px`). Stagger via `.delay-1` … `.delay-4` (100ms increments).
- **Drifting leaves overlay:** A `position: fixed; z-index: 30; pointer-events: none` container that spawns small leaf SVGs (4 variants in moss/ember/meadow colors) at random horizontal positions, drifting down with rotation. Each leaf uses the Web Animations API (`element.animate()`) over 9–18 seconds with cubic-bezier easing. Spawn cadence: every 1.4–3.6 seconds. Paused on `document.visibilitychange` when tab hidden.
- **Book mockup hover:** 0.6s cubic-bezier transition to a less-tilted, slightly lifted state.
- **Friend card hover:** Lifts -6px and inner image scales to 1.04 (0.8s on the image, 0.4s on the card).
- **Buy card hover:** Lifts -3px, border switches to ember.
- **Scroll cue bob:** 3s ease-in-out infinite, oscillates 6px down and changes opacity from 0.7 to 1.

No client-side routing, no modals, no form validation. The site is a single static page.

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| ≥ 980px | Full layout as described |
| < 980px | Top-nav links hide; Story grid stacks; Friends grid → 2 columns; Practice grid → 2 columns; Audience grid stacks; Author grid stacks (portrait centered, max 220px); Buy grid stacks; Chapter cards stack (image on top, 16/9 aspect); section padding drops from `120px 32px` to `80px 24px` |
| < 540px | Friends and Practice grids → 1 column; top-nav padding tightens to `14px 18px` |

## Design Tokens

All declared as CSS custom properties at `:root` in `index.html`:

### Colors

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#20281d` | Primary text, dark forest |
| `--ink-soft` | `#3d4a36` | Body copy, secondary text |
| `--cream` | `#f5ecd6` | Cream for dark sections / hero text |
| `--cream-deep` | `#ead9b3` | Deeper cream for gradients |
| `--paper` | `#fbf5e3` | Page background / paper feel |
| `--moss` | `#4d6b3a` | Mid-tone forest green (icons, borders) |
| `--moss-deep` | `#2f4524` | Dark forest green (PRAC section, footer) |
| `--leaf` | `#6b8a47` | Leaf green accent |
| `--meadow` | `#b9cf7c` | Light meadow green |
| `--ember` | `#d97b3a` | Warm primary orange (CTA, accents) |
| `--ember-soft` | `#e8a85c` | Soft ember for highlights |
| `--sky` | `#8fb9d6` | Pale sky blue (unused but available) |
| `--sky-deep` | `#5a8bb0` | Deeper sky |
| `--stone` | `#7d8a8e` | Neutral stone gray |
| `--rose` | `#cf8b8b` | Muted dusty rose |

### Typography

| Token | Family | Weights loaded | Use |
|---|---|---|---|
| `--font-display` | Cormorant Garamond | 400, 500, 600, 700; italic 400, 500, 600 | All headings, hero title, pull-quotes, character names |
| `--font-body` | Nunito | 300, 400, 500, 600, 700 | All body copy, nav, eyebrows, buttons |
| `--font-hand` | Caveat | 400, 500, 600 | Bylines, sub-labels, handwritten accents |

Loaded via Google Fonts in the `<head>`. Always pair `font-display=swap`.

**Type scale used:**

- Hero title: `clamp(48px, 8vw, 116px)`, line-height 0.95
- Section titles: `clamp(36px, 5vw, 64px)`, line-height 1.05
- Author H2: `clamp(36px, 4.4vw, 56px)`
- Chapter title: `clamp(28px, 3vw, 40px)`
- Character name: 28px
- Friend card body: 14.5px
- Story prose: 17px / line-height 1.75
- Eyebrows: 10–11px, letter-spacing 0.22em–0.36em, uppercase
- Buttons: 14px, letter-spacing 0.04em
- Pull-quote: 26px italic / 1.35

### Spacing

- Page max-width: **1180px**
- Section vertical padding: **120px** (desktop) / **80px** (mobile)
- Section horizontal padding: **32px** / **24px** (mobile)
- Grid gaps: 80px (story), 28px (audience), 22px (friends), 18px (practice), 16px (buy), 40px (chapter list)
- Card padding: 22px (friend body), 28px 22px 26px (practice), 44px 44px 40px (audience), 48px 44px (chapter body), 26px 20px (buy)

### Radii

- 14px: friend cards, buy cards, badges
- 12px: practice cards
- 16px: audience cards
- 18px: chapter cards
- 4px/6px asymmetric: book cover frame (left-edge spine effect)
- 999px / full: buttons

### Shadows

- Card resting: `0 1px 0 rgba(255,255,255,0.8) inset, 0 2px 4px rgba(32,40,29,0.04), 0 18px 32px -20px rgba(32,40,29,0.18)`
- Card hover: `… 0 28px 50px -24px rgba(32,40,29,0.28)`
- Book mockup: `0 30px 80px -20px rgba(32,40,29,0.45), 0 60px 120px -40px rgba(77,107,58,0.35), inset 8px 0 18px -10px rgba(0,0,0,0.45), inset -2px 0 0 rgba(255,255,255,0.2)`
- Chapter card: `0 1px 0 rgba(255,255,255,0.8) inset, 0 24px 50px -28px rgba(32,40,29,0.28)`
- Author portrait: `0 24px 50px -20px rgba(32,40,29,0.35)`

## State Management

None required. The site is fully static — no form state, no auth, no client-side data. Replace inline `<script>` blocks with idiomatic framework patterns:

- The nav scroll-state and hero parallax → a single scroll listener in a layout-level hook
- Reveal-on-scroll → an `IntersectionObserver` hook (or a CSS-only `animation-timeline: view()` if browser support allows)
- Drifting leaves → a small client-only component that spawns leaf elements on a `setTimeout` loop; pause via the Page Visibility API

## Assets

All assets live in `design/assets/`. They are the **real, final** illustrations from the book — use them in production.

```
assets/
├── cover.png                       # Hero background, book mockup
├── characters/
│   ├── timothy.jpg                 # Timothy the Turtle portrait
│   ├── rex.jpg                     # Rex the Rabbit portrait
│   ├── kiki.jpg                    # Kiki the Koala portrait
│   ├── bella.jpg                   # Bella the Bear portrait
│   └── olive.jpg                   # Olive the Owl portrait
└── scenes/
    ├── chapter1.jpg
    ├── misty-forest.jpg
    ├── group.jpg
    ├── owl-flight.jpg              # Used as Chapter 4 hero image
    ├── sunset.jpg
    └── title-page.jpg
```

Originals are book interior pages exported from the SVG manuscript provided by the author. Optimize for web before shipping (target ~200–400KB each via `sharp` or `next/image`); the cover should remain high-res for retina hero display.

The **Skills For Children · Books and Videos** logo is currently drawn inline as SVG inside the author portrait — see lines `<svg viewBox="0 0 200 200">` in `index.html`. If the author has an official logo file, swap that in.

## Files

In `design/`:

- `index.html` — the entire prototype. ~1450 lines. Inline styles, inline `<script>`, two `<script type="text/babel">` tags for the Tweaks panel.
- `tweaks.jsx` — the Tweaks app (prototyping-only, omit in production).
- `tweaks-panel.jsx` — the Tweaks shell (prototyping-only, omit in production).
- `image-slot.js` — `<image-slot>` web component (prototyping-only — replace with plain `<img>`).
- `assets/` — all illustrations.

## Implementation Suggestions

1. **Recommended stack:** Astro + Tailwind. The site is content-heavy, JS-light, image-heavy — Astro's island architecture is the right shape. Tailwind can express the design tokens above as theme extensions.
2. **Component split (for any React-flavored stack):**
   - `<TopNav />` (handles scroll state)
   - `<Hero />` (handles parallax)
   - `<StorySection />`
   - `<FriendsGrid />` driven by a `friends` JSON array
   - `<PracSection />` driven by a `pracSkills` JSON array
   - `<ChapterList />` driven by a `chapters` JSON array, alternates orientation on odd indices
   - `<AudienceCards />`
   - `<AuthorSection />`
   - `<BuyGrid />` driven by a `vendors` JSON array
   - `<Footer />`
   - `<DriftingLeaves />` (client-only, mounts once at the page root)
3. **Font loading:** Use `@font-source` (Fontsource) or self-host the three Google Fonts for performance. Preload Cormorant Garamond italic since the hero title uses it.
4. **Image performance:** Generate AVIF + WebP + JPEG fallbacks. Lazy-load everything below the fold. The cover image is LCP — preload it.
5. **Accessibility audit:** All section eyebrows should remain decorative; titles are the real `<h2>` anchors. The cream-on-moss-deep combinations in the PRAC section meet WCAG AA on body copy at the sizes used (verified). The `aria-hidden="true"` on decorative SVGs is already in the prototype — preserve those.
6. **SEO:** Add real meta tags, OG image (use `cover.png`), structured `Book` schema with author, ISBN, publisher (Skills for Children), and audience. The current `<title>` is good as a starting point.
7. **Buy links** are currently `href="#"` — wire them to real Amazon / Bookshop / direct-order URLs from the author.

## What NOT to Carry Forward

- React loaded via Babel-standalone — fine for prototyping, never for production.
- The Tweaks panel and its persistence protocol.
- The `<image-slot>` web component.
- Inline `<style>` and inline `<script>` (extract to CSS files and proper component modules).
- The `data-screen-label` attributes (prototyping affordance).
