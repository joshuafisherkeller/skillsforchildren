/* =========================================================
   Skills for Children — site.js
   Modules: theme toggle, sticky header, scroll reveal,
   copy-link toast, newsletter form, resource search/filter
   ========================================================= */

/* ---------- 1. STICKY HEADER SHADOW ---------- */
(function () {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ---------- 2. THEME TOGGLE ---------- */
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('sfk-theme', next); } catch (e) {}
  });
})();


/* ---------- 3. SCROLL REVEAL ---------- */
(function () {
  // Only animate when the user has not requested reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  document.documentElement.classList.add('js-anim');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
  // Elements already visible on first paint get 'is-in' immediately
  const vh = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll('.reveal').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) { el.classList.add('is-in'); }
    else { io.observe(el); }
  });
})();


/* ---------- 4. TOAST HELPER ---------- */
(function () {
  const toast = document.getElementById('toast');
  if (!toast) return;
  let timer;
  window.showToast = function (msg) {
    toast.textContent = msg || 'Copied to clipboard';
    toast.classList.add('is-show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('is-show'), 2200);
  };
})();


/* ---------- 5. COPY-LINK (delegated) ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.rcard-copy');
  if (!btn) return;
  const url = btn.dataset.copy || window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      btn.classList.add('is-copied');
      const orig = btn.textContent;
      btn.textContent = 'Copied ✓';
      if (window.showToast) showToast('Link copied');
      setTimeout(() => { btn.classList.remove('is-copied'); btn.textContent = orig; }, 1800);
    });
  }
});


/* ---------- 6. NEWSLETTER FORM ---------- */
// TODO: Wire this to Kit (ConvertKit) embed — data-uid="52934f03c9"
// src="https://skills-for-children.kit.com/52934f03c9/index.js"
// When Kit is wired, the form submit below can be removed and the Kit
// inline form script can take over. For now, this is a UX placeholder.
document.addEventListener('submit', (e) => {
  const form = e.target.closest('.newsletter-form');
  if (!form) return;
  // Only intercept if NOT handled by Kit
  if (form.dataset.kitHandled) return;
  e.preventDefault();
  const input = form.querySelector('input[type="email"]');
  if (input) input.value = '';
  if (window.showToast) showToast('You\u2019re on the list \u2713');
});


/* ---------- 7. RESOURCE SEARCH & FILTER ---------- */
(function () {
  const searchInput  = document.getElementById('searchInput');
  const audienceSel  = document.getElementById('audienceFilter');
  const formatSel    = document.getElementById('formatFilter');
  const sectionSel   = document.getElementById('sectionFilter');
  const clearBtn     = document.getElementById('clearFilters');

  // Nothing to do if there's no search bar on this page
  if (!searchInput && !audienceSel && !formatSel && !sectionSel) return;

  function normalize(str) {
    return (str || '').toLowerCase().trim();
  }

  function filterCards() {
    const query    = normalize(searchInput  ? searchInput.value  : '');
    const audience = normalize(audienceSel  ? audienceSel.value  : '');
    const format   = normalize(formatSel    ? formatSel.value    : '');
    const section  = normalize(sectionSel   ? sectionSel.value   : '');

    // Each .rcard carries data-* attrs set by Liquid in resource-card.html
    const cards = document.querySelectorAll('.rcard');
    let visible = 0;

    cards.forEach(card => {
      const cardAudience = normalize(card.dataset.audience || '');
      const cardFormat   = normalize(card.dataset.format   || '');
      const cardSection  = normalize(card.dataset.section  || '');
      const cardTitle    = normalize(card.dataset.title    || '');
      const cardDesc     = normalize(card.dataset.desc     || '');
      const cardSource   = normalize(card.dataset.source   || '');

      const matchSearch   = !query    || cardTitle.includes(query) || cardDesc.includes(query) || cardSource.includes(query);
      const matchAudience = !audience || cardAudience === audience;
      const matchFormat   = !format   || cardFormat   === format;

      // Section filter: design uses "Skills for Children" / "Childhood Trauma"
      // data-section stores "skills" or "trauma" (set on the wrapper)
      let matchSection = true;
      if (section) {
        if (section === 'skills for children') matchSection = cardSection === 'skills';
        else if (section === 'childhood trauma') matchSection = cardSection === 'trauma';
        else matchSection = cardSection === section;
      }

      const show = matchSearch && matchAudience && matchFormat && matchSection;
      card.closest('.rcard-wrapper, article.rcard') || card;
      // Show/hide the card wrapper if it exists, else the card itself
      const wrapper = card.closest('.rcard-wrapper') || card;
      wrapper.hidden = !show;

      if (show) visible++;
    });

    // Also show/hide empty pillars
    document.querySelectorAll('.pillar').forEach(pillar => {
      const visibleInPillar = pillar.querySelectorAll('.rcard:not([hidden]), .rcard-wrapper:not([hidden])').length;
      // Crude check — count wrappers that aren't hidden
      const wraps = pillar.querySelectorAll('.rcard-wrapper');
      let anyVisible = false;
      wraps.forEach(w => { if (!w.hidden) anyVisible = true; });
      if (wraps.length === 0) {
        // No wrappers — check cards directly
        const rcards = pillar.querySelectorAll('.rcard');
        rcards.forEach(r => { if (!r.hidden) anyVisible = true; });
      }
      pillar.hidden = !anyVisible;
    });

    // Update section banners
    document.querySelectorAll('.pillar-section').forEach(sec => {
      const anyPillarVisible = Array.from(sec.querySelectorAll('.pillar')).some(p => !p.hidden);
      sec.hidden = !anyPillarVisible;
    });
  }

  if (searchInput)  searchInput.addEventListener('input',  filterCards);
  if (audienceSel)  audienceSel.addEventListener('change', filterCards);
  if (formatSel)    formatSel.addEventListener('change',   filterCards);
  if (sectionSel)   sectionSel.addEventListener('change',  filterCards);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (audienceSel) audienceSel.selectedIndex = 0;
      if (formatSel)   formatSel.selectedIndex   = 0;
      if (sectionSel)  sectionSel.selectedIndex  = 0;
      document.querySelectorAll('.rcard-wrapper, .rcard, .pillar, .pillar-section').forEach(el => {
        el.hidden = false;
      });
    });
  }
})();


/* ---------- 8. QUICK EXIT (privacy) ---------- */
(function () {
  const btn = document.querySelector('.quick-exit');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace history entry so back button doesn't return to this site
    window.location.replace('https://www.weather.com');
  });
})();


/* ---------- FIREFLIES (dark theme ambient) ---------- */
(function () {
  const container = document.getElementById('fireflies');
  if (!container) return;

  let running = false;
  let timer = null;

  function spawnFirefly() {
    const el = document.createElement('div');
    el.className = 'firefly';
    const size = 1.5 + Math.random() * 2.5;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const driftX = (Math.random() - 0.5) * 160;
    const driftY = (Math.random() - 0.5) * 120;
    const dur = 5000 + Math.random() * 7000;
    el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;`;
    container.appendChild(el);
    el.animate([
      { opacity: 0, transform: 'translate(0,0)' },
      { opacity: 0.9, offset: 0.25 },
      { opacity: 0.6, offset: 0.75 },
      { opacity: 0, transform: `translate(${driftX}px,${driftY}px)` }
    ], { duration: dur, easing: 'ease-in-out' }).onfinish = () => el.remove();
  }

  function loop() {
    if (!running) return;
    spawnFirefly();
    timer = setTimeout(loop, 500 + Math.random() * 1000);
  }

  function start() {
    if (running) return;
    running = true;
    loop();
  }

  function stop() {
    running = false;
    clearTimeout(timer);
    container.innerHTML = '';
  }

  function syncToTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    isDark ? start() : stop();
  }

  // Watch for theme changes
  new MutationObserver(syncToTheme).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ['data-theme'] }
  );

  syncToTheme();
})();
