/* ============================================================
   cities.js — City search filter + click-to-enquire
   ============================================================ */

const Cities = (() => {
  let cityCards = [];
  let pendingQuery = '';
  let rafId = 0;

  function applyFilter(query) {
    const q = query.toLowerCase().trim();
    cityCards.forEach((card) => {
      const cityName = (card.dataset.city || '').toLowerCase();
      card.style.display = (!q || cityName.includes(q)) ? '' : 'none';
    });
  }

  // ── Filter cities by search input ────────────────────────
  function filterCities(query) {
    pendingQuery = query || '';
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      applyFilter(pendingQuery);
      rafId = 0;
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
    cityCards = Array.from(document.querySelectorAll('.city-card'));
    const citySearch = document.getElementById('citySearch');

    // Attach click handlers to all city cards
    cityCards.forEach((card) => {
      card.addEventListener('click', () => handleCityClick(card));
    });

    if (citySearch) {
      citySearch.addEventListener('input', (e) => {
        filterCities(e.target.value);
      });
    }
  }

  init();

  // Expose filterCities globally so oninput="filterCities()" works in HTML
  return { filterCities };
})();

window.filterCities = Cities.filterCities;
