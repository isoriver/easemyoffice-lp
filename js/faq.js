/* ============================================================
   faq.js — FAQ accordion
   Exposed as window.FAQ so index.html onclick="FAQ.toggle()"
   ============================================================ */

const FAQ = (() => {
  let items = [];
  let currentOpen = null;

  function setChevron(item, open) {
    const chevron = item?.querySelector('.faq-chevron');
    if (chevron) chevron.style.transform = open ? 'rotate(90deg)' : 'rotate(0deg)';
  }

  /**
   * Toggle a FAQ item open/closed.
   * Closes all other items first (accordion behaviour).
   * @param {HTMLElement} triggerEl - the .faq-q div that was clicked
   */
  function toggle(triggerEl) {
    const item = triggerEl.closest('.faq-item');
    if (!item) return;

    const isOpen = item === currentOpen;
    if (currentOpen) {
      currentOpen.classList.remove('open');
      setChevron(currentOpen, false);
      currentOpen = null;
    }

    if (!isOpen) {
      item.classList.add('open');
      setChevron(item, true);
      currentOpen = item;
    }
  }

  // Init: rotate chevron for any item that starts open in HTML
  function init() {
    items = Array.from(document.querySelectorAll('.faq-item'));
    currentOpen = items.find((item) => item.classList.contains('open')) || null;
    if (currentOpen) setChevron(currentOpen, true);

    document.querySelectorAll('.faq-q').forEach((triggerEl) => {
      triggerEl.addEventListener('click', () => toggle(triggerEl));
    });
  }

  init();
  return { toggle };
})();

// Expose globally so onclick="FAQ.toggle(this)" works in HTML
window.FAQ = FAQ;
