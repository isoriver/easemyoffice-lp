# EaseMyOffice — Virtual Office Landing Page

Standalone static landing page for `/lp/virtual-office/`.  
Completely independent of WordPress. Hosted on Cloudflare Pages.

---

## Project Structure

```
easemyoffice-lp/
├── index.html          ← Page HTML (sections & content)
├── _headers            ← Cloudflare Pages cache + security headers
├── README.md           ← This file
│
├── css/
│   ├── base.css        ← Design tokens, reset, typography
│   ├── components.css  ← Reusable UI: buttons, cards, form, nav
│   ├── sections.css    ← Per-section layout styles
│   └── responsive.css  ← All media queries
│
├── js/
│   ├── faq.js          ← FAQ accordion
│   ├── form.js         ← Lead form submission (Web3Forms)
│   ├── cities.js       ← City search filter + click handler
│   └── animations.js   ← Scroll-triggered fade-in animations
│
└── assets/             ← Local images (if any)
```

---

## Quick Start (VS Code)

```bash
# 1. Open in VS Code
code .

# 2. Install Live Server extension (first time only)
# VS Code → Extensions → search "Live Server" → Install

# 3. Right-click index.html → "Open with Live Server"
# Browser auto-refreshes on every file save
```

---

## Form Setup (Web3Forms)

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email → get a free `access_key`
3. Open `index.html`
4. Find this line:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY">
   ```
5. Replace `YOUR_WEB3FORMS_KEY` with your actual key
6. Form submissions will arrive in your email instantly

**Free tier:** 250 submissions/month. Upgrade at web3forms.com if needed.

---

## Google Ads Conversion Tracking

Open `js/form.js` and uncomment the `fireConversion()` block:

```js
function fireConversion() {
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXX', // ← your conversion ID
    });
  }
}
```

Also add your GA4 / GTM script in `index.html` where indicated:
```html
<!-- Google Analytics / GTM — paste your tag here -->
```

---

## Deployment (Cloudflare Pages)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/YOUR_ORG/easemyoffice-lp
git push -u origin main

# 2. Cloudflare Dashboard
# Pages → Create project → Connect GitHub → select repo
# Build command:     (leave empty — it's static)
# Output directory:  /  (root)
# → Save and Deploy

# Done — live in ~60 seconds
```

### Route `/lp/virtual-office/` to this page (Cloudflare Worker)

In Cloudflare Dashboard → Workers & Pages → Create Worker:

```js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/lp/virtual-office')) {
      return fetch('https://YOUR-PROJECT.pages.dev' + url.pathname, request);
    }
    return fetch(request); // Everything else → WordPress
  }
}
```

Set route: `easemyoffice.in/lp/virtual-office/*`

---

## Editing with Claude Code

```bash
# Install Claude Code (once)
npm install -g @anthropic-ai/claude-code

# Open project folder in VS Code terminal
claude
```

### Example prompts for Claude Code

```
> add a sticky mobile CTA bar at the bottom that shows
  "Get Free Quote" and disappears when the hero form is visible

> add WhatsApp click tracking — fire a GA4 event when
  someone clicks the floating WhatsApp button

> add a price calculator where user selects city and plan,
  shows final price including 18% GST

> make the FAQ searchable with a live filter input above the list

> add an exit intent popup on desktop when mouse moves to top of browser
```

---

## Where to edit what

| I want to change...            | File to edit              |
|-------------------------------|---------------------------|
| Colours / fonts / spacing     | `css/base.css`            |
| Button styles                 | `css/components.css`      |
| Section layout / spacing      | `css/sections.css`        |
| Mobile breakpoints            | `css/responsive.css`      |
| Page content / copy           | `index.html`              |
| FAQ questions & answers       | `index.html` (FAQ section)|
| City list + prices            | `index.html` (city cards) |
| Plan features / pricing       | `index.html` (plans section)|
| Form behaviour                | `js/form.js`              |
| FAQ accordion behaviour       | `js/faq.js`               |
| City search / click behaviour | `js/cities.js`            |
| Scroll animations             | `js/animations.js`        |
| Cache / security headers      | `_headers`                |

---

## Performance Targets (Google Ads Quality Score)

| Metric             | Target  |
|--------------------|---------|
| PageSpeed Mobile   | 90+     |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |

Run PageSpeed Insights: https://pagespeed.web.dev
