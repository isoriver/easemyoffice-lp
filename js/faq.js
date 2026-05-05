/* ============================================================
   faq.js — FAQ accordion
   Exposed as window.FAQ so index.html onclick="FAQ.toggle()"
   ============================================================ */

const FAQ = (() => {
  /**
   * Toggle a FAQ item open/closed.
   * Closes all other items first (accordion behaviour).
   * @param {HTMLElement} triggerEl - the .faq-q div that was clicked
   */
  function toggle(triggerEl) {
    const item = triggerEl.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all items
    document.querySelectorAll('.faq-item').forEach((el) => {
      el.classList.remove('open');
      const chevron = el.querySelector('.faq-chevron');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    });

    // If it wasn't open before, open it now
    if (!isOpen) {
      item.classList.add('open');
      const chevron = item.querySelector('.faq-chevron');
      if (chevron) chevron.style.transform = 'rotate(90deg)';
    }
  }

  // Init: rotate chevron for any item that starts open in HTML
  function init() {
    document.querySelectorAll('.faq-item.open .faq-chevron').forEach((chevron) => {
      chevron.style.transform = 'rotate(90deg)';
    });
  }

  init();
  return { toggle };
})();

// Expose globally so onclick="FAQ.toggle(this)" works in HTML
window.FAQ = FAQ;
