/* ============================================================
   INTERACTIONS — All init functions and animation helpers.
   No dependencies on other JS files.
   ============================================================ */

'use strict';

/** Eased cubic count-up animation for a single element. */
function animateCounter(el, target) {
  const duration = 1800;
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/** Add .revealed to .reveal / .reveal-left / .reveal-right elements on scroll. */
function initRevealObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => obs.observe(el));
}

/** Add .clip-revealed to .clip-reveal elements (How It Works step wipes). */
function initClipRevealObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('clip-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.clip-reveal').forEach(el => obs.observe(el));
}

/** Trigger count-up on .count-num elements when they enter the viewport. */
function initCounterObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target, parseInt(entry.target.dataset.target, 10));
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-num').forEach(el => obs.observe(el));
}

/**
 * Scroll-links .quote-text scale and opacity to scroll position.
 * JS drives this directly — no CSS transition on .quote-text.
 */
function initQuoteScrollEffect() {
  const quoteText = document.querySelector('.quote-text');
  if (!quoteText) return;

  function update() {
    const rect     = quoteText.getBoundingClientRect();
    const vh       = window.innerHeight;
    const progress = Math.max(0, Math.min(1, 1 - (rect.top - vh * 0.3) / (vh * 0.5)));
    quoteText.style.transform = `scale(${0.88 + progress * 0.12})`;
    quoteText.style.opacity   = Math.max(0.2, progress);
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // run once on init (in case user starts mid-page)
}

/** Toggle .scrolled on #navbar when scrollY > 20px. */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function update() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/** Shift the hero radial glow on scroll for a subtle parallax feel. */
function initHeroGlowParallax() {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;

  window.addEventListener('scroll', () => {
    glow.style.transform =
      `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }, { passive: true });
}

/** Inject randomly-placed floating particles into #hero-particles. */
function initHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.cssText = [
      `left: ${Math.random() * 100}%`,
      `top: ${Math.random() * 100}%`,
      `animation-duration: ${5 + Math.random() * 10}s`,
      `animation-delay: ${-Math.random() * 10}s`,
      `opacity: ${(0.08 + Math.random() * 0.15).toFixed(2)}`,
      `width: ${(1 + Math.random() * 3).toFixed(1)}px`,
      `height: ${(1 + Math.random() * 3).toFixed(1)}px`,
    ].join(';');
    container.appendChild(dot);
  }
}

/** Toggle mobile menu open/closed; auto-close on link click. */
function initMobileMenu() {
  const btn  = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
    });
  });
}

/**
 * Scroll-linked reveal for the About section split columns.
 * Takes over from the CSS IntersectionObserver system so the fade-in/slide-in
 * is tied to scroll position — scrolling back up reverses the effect.
 */
function initAboutScrollReveal() {
  const left    = document.querySelector('#about .about-left');
  const right   = document.querySelector('#about .about-right');
  const section = document.getElementById('about');
  if (!left || !right || !section) return;

  // Hand-off from CSS reveal system — disable transitions, set initial state
  left.classList.remove('reveal-left');
  right.classList.remove('reveal-right');
  left.style.cssText  += '; opacity: 0; transform: translateX(-48px); will-change: opacity, transform;';
  right.style.cssText += '; opacity: 0; transform: translateX(48px);  will-change: opacity, transform;';

  function update() {
    const rect     = section.getBoundingClientRect();
    const vh       = window.innerHeight;
    // progress 0 = section top just hit 85% from top of viewport; 1 = fully revealed
    const progress = Math.max(0, Math.min(1, (vh * 0.85 - rect.top) / (vh * 0.5)));
    const eased    = 1 - Math.pow(1 - progress, 2); // ease-out quad

    left.style.opacity   = eased;
    left.style.transform = `translateX(${(1 - eased) * -48}px)`;

    right.style.opacity   = eased;
    right.style.transform = `translateX(${(1 - eased) * 48}px)`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/** Smooth-scroll all same-page anchor links. */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
