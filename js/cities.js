/* ============================================================
   cities.js — City search filter + click-to-enquire
   ============================================================ */

const Cities = (() => {
  // ── Filter cities by search input ────────────────────────
  function filterCities(query) {
    const q = query.toLowerCase().trim();

    document.querySelectorAll('.city-card').forEach((card) => {
      const cityName = (card.dataset.city || '').toLowerCase();
      // Show card if query is empty OR city name includes query
      card.style.display = (!q || cityName.includes(q)) ? '' : 'none';
    });
  }

  // ── City card click: scroll to form and pre-fill location ─
  function handleCityClick(card) {
    const cityName = card.querySelector('.city-name')?.textContent || '';

    // Pre-fill the location field in the hero form
    const locationInput = document.querySelector('#leadForm [name="location"]');
    if (locationInput) {
      locationInput.value = cityName;
    }

    // Scroll to hero form
    const form = document.getElementById('leadForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the name field after scrolling
      setTimeout(() => {
        const nameInput = form.querySelector('[name="name"]');
        if (nameInput) nameInput.focus();
      }, 600);
    }
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    // Attach click handlers to all city cards
    document.querySelectorAll('.city-card').forEach((card) => {
      card.addEventListener('click', () => handleCityClick(card));
    });
  }

  init();

  // Expose filterCities globally so oninput="filterCities()" works in HTML
  return { filterCities };
})();

window.filterCities = Cities.filterCities;
