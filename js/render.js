/* ============================================================
   RENDER — Builds HTML from data arrays and injects into DOM.
   Depends on: data.js (must load first)
   ============================================================ */

'use strict';

/** Renders program cards into #programs-grid. */
function renderPrograms() {
  const grid = document.getElementById('programs-grid');
  if (!grid) return;

  grid.innerHTML = PROGRAMS.map((prog, i) => `
    <div class="prog-card reveal${i > 0 ? ' delay-' + i : ''}">
      <div class="prog-card-number" aria-hidden="true">${prog.num}</div>
      <div class="prog-card-icon-wrap">
        <i data-lucide="${prog.icon}"></i>
      </div>
      <h3 class="prog-card-title">${prog.title}</h3>
      <p class="prog-card-desc">${prog.desc}</p>
      <div class="prog-tags">
        ${prog.tags.map(tag => `<span>${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Renders How It Works steps into #hiw-steps-row.
 * The static .hiw-connector div is already in HTML; steps are appended.
 */
function renderSteps() {
  const row = document.getElementById('hiw-steps-row');
  if (!row) return;

  STEPS.forEach(step => {
    const el = document.createElement('div');
    el.className = 'hiw-step reveal';
    if (step.delay > 0) el.style.transitionDelay = step.delay + 's';
    const label = parseInt(step.num, 10) + '.';
    el.innerHTML = `
      <div class="hiw-point-dot" aria-hidden="true"></div>
      <div class="hiw-point-num">${label}</div>
      <h3 class="hiw-step-title">${step.title}</h3>
    `;
    row.appendChild(el);
  });
}

/**
 * Renders stat items + dividers into #stats-band-inner.
 * Numeric targets get a .count-num span for the counter animation.
 */
function renderStats() {
  const band = document.getElementById('stats-band-inner');
  if (!band) return;

  band.innerHTML = STATS.map((stat, i) => {
    const numHtml = stat.suffix === '%' && stat.target === 100
      ? `<span>${stat.target}${stat.suffix}</span>`
      : `<span class="count-num" data-target="${stat.target}">0</span>
         ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}`;

    const divider = i < STATS.length - 1
      ? '<div class="stat-divider" aria-hidden="true"></div>'
      : '';

    return `
      <div class="stat-item">
        <div class="stat-num-wrap">${numHtml}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
      ${divider}
    `;
  }).join('');
}

/** Renders contact cards into #contact-cards-row. */
function renderContacts() {
  const row = document.getElementById('contact-cards-row');
  if (!row) return;

  row.innerHTML = CONTACTS.map((contact, i) => {
    const valueHtml = contact.isLink
      ? `<a href="${contact.href}" class="contact-card-value">${contact.detail}</a>`
      : `<span class="contact-card-value">${contact.detail}</span>`;

    return `
      <div class="contact-card reveal${i > 0 ? ' delay-' + i : ''}">
        <div class="contact-card-icon-circle">
          <i data-lucide="${contact.icon}"></i>
        </div>
        <div class="contact-card-body">
          <div class="contact-card-label">${contact.label}</div>
          ${valueHtml}
        </div>
      </div>
    `;
  }).join('');
}
