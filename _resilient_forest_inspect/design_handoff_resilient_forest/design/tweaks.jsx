// tweaks.jsx — Tweaks panel for A Journey of Brave Friends
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "forest",
  "leaves": true,
  "leafDensity": "gentle",
  "heroAlignment": "center",
  "cornerSoftness": 14,
  "showBookMockup": true
}/*EDITMODE-END*/;

const PALETTES = {
  forest: {
    label: "Forest at noon",
    swatch: ["#4d6b3a", "#d97b3a", "#f5ecd6"],
    vars: {
      "--ink": "#20281d",
      "--ink-soft": "#3d4a36",
      "--cream": "#f5ecd6",
      "--cream-deep": "#ead9b3",
      "--paper": "#fbf5e3",
      "--moss": "#4d6b3a",
      "--moss-deep": "#2f4524",
      "--leaf": "#6b8a47",
      "--meadow": "#b9cf7c",
      "--ember": "#d97b3a",
      "--ember-soft": "#e8a85c",
    },
  },
  dusk: {
    label: "Dusk by the lake",
    swatch: ["#3a4e6b", "#cf8b8b", "#ecdeca"],
    vars: {
      "--ink": "#1d2230",
      "--ink-soft": "#3a4356",
      "--cream": "#ecdeca",
      "--cream-deep": "#dec8a8",
      "--paper": "#f4ebd9",
      "--moss": "#3a4e6b",
      "--moss-deep": "#1f2c40",
      "--leaf": "#5a6f8c",
      "--meadow": "#a8b8c7",
      "--ember": "#cf8b8b",
      "--ember-soft": "#e0a8a8",
    },
  },
  autumn: {
    label: "Autumn meadow",
    swatch: ["#7a3a14", "#e6953d", "#f7ecd1"],
    vars: {
      "--ink": "#2a1f15",
      "--ink-soft": "#4a382a",
      "--cream": "#f7ecd1",
      "--cream-deep": "#ecd6ad",
      "--paper": "#fcf3df",
      "--moss": "#7a4d28",
      "--moss-deep": "#4a2d14",
      "--leaf": "#a8723a",
      "--meadow": "#e0bf78",
      "--ember": "#e6953d",
      "--ember-soft": "#f0b56e",
    },
  },
  morning: {
    label: "Morning mist",
    swatch: ["#5e7c8a", "#a8a06b", "#f0eee0"],
    vars: {
      "--ink": "#1f2730",
      "--ink-soft": "#3d4a55",
      "--cream": "#f0eee0",
      "--cream-deep": "#dfdcc6",
      "--paper": "#f7f5e8",
      "--moss": "#5e7c8a",
      "--moss-deep": "#34495a",
      "--leaf": "#7f9aa6",
      "--meadow": "#c8d2c5",
      "--ember": "#a8a06b",
      "--ember-soft": "#c4ba87",
    },
  },
};

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.forest;
  const root = document.documentElement;
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette
  useEffect(() => { applyPalette(t.palette); }, [t.palette]);

  // Toggle leaves
  useEffect(() => {
    const el = document.getElementById("leaves");
    if (el) el.style.display = t.leaves ? "" : "none";
  }, [t.leaves]);

  // Leaf density (approximated by adding a data attr; small effect)
  useEffect(() => {
    window.__leafDensity = t.leafDensity;
  }, [t.leafDensity]);

  // Hero alignment
  useEffect(() => {
    const hc = document.querySelector(".hero-content");
    const hero = document.querySelector("header.hero");
    if (!hc || !hero) return;
    if (t.heroAlignment === "left") {
      hc.style.textAlign = "left";
      hero.style.justifyContent = "flex-start";
      hc.style.paddingLeft = "8vw";
      hc.style.paddingRight = "8vw";
      // remove centering for eyebrow
      hc.querySelectorAll(".hero-eyebrow").forEach(e => e.style.justifyContent = "flex-start");
    } else {
      hc.style.textAlign = "center";
      hero.style.justifyContent = "center";
      hc.style.paddingLeft = "";
      hc.style.paddingRight = "";
      hc.querySelectorAll(".hero-eyebrow").forEach(e => e.style.justifyContent = "");
    }
  }, [t.heroAlignment]);

  // Corner softness
  useEffect(() => {
    document.querySelectorAll(".friend-card, .audience-card, .practice-card, .buy-card")
      .forEach(el => el.style.borderRadius = t.cornerSoftness + "px");
  }, [t.cornerSoftness]);

  // Book mockup visibility
  useEffect(() => {
    const m = document.querySelector(".book-mockup");
    const grid = document.querySelector(".story-grid");
    if (m) m.style.display = t.showBookMockup ? "" : "none";
    if (grid) grid.style.gridTemplateColumns = t.showBookMockup ? "1.1fr 0.9fr" : "1fr";
  }, [t.showBookMockup]);

  return (
    <TweaksPanel title="Tweaks · Resilient Forest">
      <TweakSection label="Palette" />
      <TweakRadio
        label="Mood"
        value={t.palette}
        options={[
          { label: "Forest", value: "forest" },
          { label: "Dusk", value: "dusk" },
          { label: "Autumn", value: "autumn" },
          { label: "Morning", value: "morning" },
        ]}
        onChange={(v) => setTweak("palette", v)}
      />

      <TweakSection label="Atmosphere" />
      <TweakToggle
        label="Drifting leaves"
        value={t.leaves}
        onChange={(v) => setTweak("leaves", v)}
      />
      <TweakRadio
        label="Hero text"
        value={t.heroAlignment}
        options={[
          { label: "Centered", value: "center" },
          { label: "Left", value: "left" },
        ]}
        onChange={(v) => setTweak("heroAlignment", v)}
      />

      <TweakSection label="Layout" />
      <TweakSlider
        label="Corner softness"
        value={t.cornerSoftness}
        min={0} max={28} step={1} unit="px"
        onChange={(v) => setTweak("cornerSoftness", v)}
      />
      <TweakToggle
        label="Show book mockup"
        value={t.showBookMockup}
        onChange={(v) => setTweak("showBookMockup", v)}
      />
    </TweaksPanel>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
