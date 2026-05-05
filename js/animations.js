/* ============================================================
   animations.js — Scroll-triggered fade-in animations
   Uses IntersectionObserver (no library, built into browser)
   ============================================================ */

const Animations = (() => {
  // Elements to animate — add more selectors here as needed
  const SELECTORS = [
    '.plan-card',
    '.space-card',
    '.hiw-card',
    '.why-feat',
    '.test-card',
    '.city-card',
    '.brand-pill',
    '.stat-item',
  ].join(', ');

  const ANIMATION_CSS = {
    opacity:    '0',
    transform:  'translateY(16px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  function animateIn(el) {
    el.style.opacity   = '1';
    el.style.transform = 'translateY(0)';
  }

  function init() {
    // Skip animation for users who prefer reduced motion (accessibility)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateIn(entry.target);
            // Stop observing once animated — no need to re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(SELECTORS).forEach((el) => {
      // Apply initial hidden state
      Object.assign(el.style, ANIMATION_CSS);
      observer.observe(el);
    });
  }

  init();
  return {};
})();
