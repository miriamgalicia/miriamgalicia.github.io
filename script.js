'use strict';

const nav = document.querySelector('#primary-nav');
const menuButton = document.querySelector('.menu-toggle');

if (nav && menuButton) {
  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }));
}

const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (!target) return;
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    target.classList.add('active');
  });
}, { rootMargin: '-20% 0px -65% 0px', threshold: 0 }) : null;
if (observer) document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));

const details = {
  consumer: {
    kicker: 'MARKET & CONSUMER ANALYTICS',
    title: 'Finding patterns in market behavior',
    description: 'Using card-transaction, consumer-panel and e-receipt data to support market and commercial analyses. This is a professional focus area, not a published client case study.',
    bullets: [
      'Market share, share-of-wallet and competitive benchmarking',
      'Retention and cohort analyses',
      'Business-focused storytelling for cross-functional audiences'
    ]
  },
  engineering: {
    kicker: 'DATA INGESTION & ANALYTICS ENGINEERING',
    title: 'From raw data to reusable insights',
    description: 'My work spans building data pipelines and self-service analytical tools in Snowflake and Databricks. The staircase animation represents ingestion conceptually, not a specific client pipeline.',
    bullets: [
      'SQL and PySpark pipelines across large datasets',
      'Reusable Python and Streamlit analytics workflows',
      'Quality checks and automation that reduce manual research'
    ]
  },
  shopper: {
    kicker: 'SHOPPER & RETAIL ANALYTICS',
    title: 'Understanding the people behind the data',
    description: 'Connecting panel data, transaction records and business context to understand consumer decisions. The shopping cart is a visual metaphor, not client-specific research.',
    bullets: [
      'Consumer purchase patterns and shopper analytics',
      'Product classification and brand / merchant comparisons',
      'Clear visualizations and actionable recommendations'
    ]
  }
};
const dialog = document.querySelector('#project-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  const closeButton = dialog.querySelector('.dialog-close');
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const item = details[button.dataset.project];
    if (!item) return;
    dialog.querySelector('#dialog-kicker').textContent = item.kicker;
    dialog.querySelector('#dialog-title').textContent = item.title;
    dialog.querySelector('#dialog-description').textContent = item.description;
    dialog.querySelector('#dialog-list').replaceChildren(...item.bullets.map(bullet => {
      const li = document.createElement('li');
      li.textContent = bullet;
      return li;
    }));
    dialog.showModal();
  }));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}
const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();


// Simple accessible day/night switch; the default remains the original light design.
const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyPortfolioTheme(mode) {
  const dark = mode === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (themeMeta) themeMeta.setAttribute('content', dark ? '#101113' : '#ffffff');
}
applyPortfolioTheme(document.documentElement.dataset.theme);
if (themeToggle) themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyPortfolioTheme(next);
  try { localStorage.setItem('mg-portfolio-theme', next); } catch (e) {}
});
