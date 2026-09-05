# sofra.com.bd

Website and management platform for **Sofra** — an Anatolian (Turkish) restaurant in Dhaka.

- Architecture overview: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Editing text, menu, photos, contact details: [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)

## Status

**Phase 1 — static public website (this repo root).** No build step, no backend; deployable to any static host or cPanel `public_html`.

| Page | File |
|---|---|
| Home | `index.html` |
| Menu (à la carte, filters, EN/বাংলা) | `menu.html` |
| About | `about.html` |
| Gallery | `gallery.html` |
| Book a table (WhatsApp / email) | `reservations.html` |

Bilingual: English + Bangla toggle in the top bar, remembered per visitor. All copy lives in `assets/js/i18n.js`; the menu in `assets/js/menu-data.js`; contact details in `assets/js/site-config.js`.

Design follows the Rüya (Dubai) pattern — centred logo bar with drawer navigation, full-bleed photography, thin tracked-caps headings — in the Sofra brand palette (maroon / gold / charcoal from the logo sheet). The logo is `assets/img/logo.svg` (vector, recoloured via CSS `currentColor`).

Motion (`assets/js/effects.js`, libraries from CDN): Lenis inertia scrolling and parallax as on Passalacqua, Rüya-style fading sliders and fade-up reveals, a hero carousel with arrows and dots as on The Pods and Greenway. All of it degrades to a static page without the CDN or under reduced-motion.

Photos: 53 optimised web images in `assets/img/photos/` (plus `-sm` thumbnails). The original 85 full-size photos and the logo PDF are kept in `_source/` (git-ignored). Contact details in `assets/js/site-config.js` are still placeholders.

Later phases (see architecture doc): `admin.sofra.com.bd` dashboard and `api.sofra.com.bd` backend with MySQL, media storage and channel integrations.

## Run locally

```
python -m http.server 8080
```

Open <http://localhost:8080/>.

## Surfaces

| Surface | Host |
|---|---|
| Public website | https://sofra.com.bd (domain not yet pointed) |
| Demo (GitHub Pages, branch `main`, root) | https://th3iatech.github.io/sofra.com.bd/ |
| Admin dashboard | https://admin.sofra.com.bd (planned) |
| Backend / API | https://api.sofra.com.bd (planned) |

## License

GPL-3.0 — see [LICENSE](LICENSE).
