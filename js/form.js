/* ============================================================
   form.js — Lead form submission
   Uses Web3Forms API (free, no backend needed)

   SETUP:
   1. Go to https://web3forms.com
   2. Enter your email → get a free access key
   3. Replace YOUR_WEB3FORMS_KEY in index.html with that key
   ============================================================ */

const LeadForm = (() => {
  const FORM_ID   = 'leadForm';
  const BTN_ID    = 'submitBtn';
  const MSG_ID    = 'formMsg';
  const API_URL   = 'https://api.web3forms.com/submit';

  // ── Helpers ──────────────────────────────────────────────
  function setMsg(text, type = '') {
    const el = document.getElementById(MSG_ID);
    if (!el) return;
    el.textContent = text;
    el.className = 'form-privacy' + (type ? ` ${type}` : '');
  }

  function setBtn(text, disabled = false) {
    const btn = document.getElementById(BTN_ID);
    if (!btn) return;
    btn.textContent = text;
    btn.disabled = disabled;
  }

  // ── Google Ads conversion tracking (optional) ─────────────
  // Uncomment and replace with your actual conversion label
  // after setting up a Google Ads conversion action
  function fireConversion() {
    // if (typeof gtag === 'function') {
    //   gtag('event', 'conversion', {
    //     send_to: 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXX',
    //   });
    // }
  }

  // ── Submit handler ────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    const name  = e.target.querySelector('[name="name"]').value.trim();
    const email = e.target.querySelector('[name="email"]').value.trim();
    const phone = e.target.querySelector('[name="phone"]').value.trim();

    if (!name || !email || !phone) {
      setMsg('Please fill in Name, Email, and Phone.', 'error');
      return;
    }

    setBtn('Sending...', true);
    setMsg('');

    try {
      const formData = new FormData(e.target);
      const res  = await fetch(API_URL, { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        setMsg('✅ Thank you! Our team will call you within 30 minutes.', 'success');
        e.target.reset();
        fireConversion();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Form error:', err);
      setMsg('❌ Something went wrong. Please call us directly at 888-273-5038.', 'error');
    } finally {
      setBtn('Submit Details', false);
    }
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    const form = document.getElementById(FORM_ID);
    const ctaButton = document.getElementById('scrollToLeadBtn');
    if (!form) return;
    form.addEventListener('submit', handleSubmit);

    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Delay focus until scroll settles to avoid synchronous layout pressure.
        setTimeout(() => {
          const nameInput = form.querySelector('[name="name"]');
          if (nameInput) nameInput.focus();
        }, 450);
      });
    }
  }

  init();
  return {};
})();
