# Visual Reference

The canonical visual reference for this project is the **live HTML prototype** bundled in this package at `../design/index.html`.

To view it:

```bash
# From the design_handoff_resilient_forest folder:
cd design
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Or simply open `design/index.html` directly in a browser (the image-slot web component and Tweaks panel require the `file://` protocol's local fetches, which most browsers allow for relative paths).

The prototype shows every section in its final state:

1. **Hero** — full-bleed cover with parallax + drifting leaves
2. **The Story** — drop-cap prose + 3D book mockup
3. **Meet the Brave Friends** — 5-column character grid with real book art
4. **The PRAC Skills** — dark moss section, four foundational TF-CBT skills
5. **A Look Inside** — four alternating chapter preview cards
6. **For Parents & Therapists** — paired guidance cards
7. **The Author** — Joshua Fisherkeller bio with Skills For Children badge
8. **Read It** — three buy cards + newsletter CTA

The live prototype captures animations, hover states, responsive breakpoints, and the painterly atmosphere far better than static PNGs ever could — please reference it directly while implementing.
