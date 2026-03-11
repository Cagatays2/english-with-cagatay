/* ============================================================
   BOOT — DOMContentLoaded entry point.
   Depends on: data.js, render.js, interactions.js (all loaded before this)
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Render data-driven sections first so their DOM exists
  renderPrograms();
  renderSteps();
  renderStats();
  renderContacts();

  // 2. Init Lucide icons — must run after render so newly injected icons are picked up
  if (window.lucide?.createIcons) window.lucide.createIcons();

  // 3. Wire up all interactions and scroll observers
  initNavbarScroll();
  initHeroParticles();
  initHeroGlowParallax();
  initRevealObserver();
  initClipRevealObserver();
  initCounterObserver();
  initQuoteScrollEffect();
  initMobileMenu();
  initSmoothScroll();
  initAboutScrollReveal();

  // 4. Trigger hero load animations (tiny delay lets browser paint first)
  setTimeout(() => document.body.classList.add('loaded'), 50);
});
