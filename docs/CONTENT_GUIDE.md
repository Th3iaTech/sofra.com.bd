# Sofra — Content Guide

How to change what the site says and shows, without touching layout code.

## Where things live

| What | File |
|---|---|
| Phone, WhatsApp, email, map link, social URLs | `assets/js/site-config.js` |
| Every piece of UI text, English **and** Bangla | `assets/js/i18n.js` |
| Menu sections, dishes, prices, allergen codes | `assets/js/menu-data.js` |
| Photos | `assets/img/` |
| Colours, fonts, spacing | `assets/css/style.css` (the `:root` block at the top) |

Pages: `index.html` (home), `menu.html`, `about.html`, `gallery.html`, `reservations.html`.

## 1. Contact details

Open `assets/js/site-config.js` and replace the placeholders:

```js
phoneDisplay: "+880 1XXX-XXXXXX",  // shown on the page
phone: "+8801XXXXXXXXX",           // used for tel: links
whatsapp: "8801XXXXXXXXX",         // digits only, no + — used for wa.me links
email: "hello@sofra.com.bd",
reservationsEmail: "reservations@sofra.com.bd",
mapUrl: "https://maps.google.com/…",
```

Every page reads from this file, so you edit it once. Leave a social URL empty (`""`) to hide that icon.

## 2. Text (English + Bangla)

`assets/js/i18n.js` has two blocks, `en` and `bn`, with the same keys. Edit the value, keep the key.

```js
"hero.title": "Where Anatolia meets Dhaka",
```

The site picks Bangla automatically for Bangla-language browsers, and remembers the visitor's toggle choice.
If a Bangla key is missing, the English text is shown as a fallback.

The address is `contact.address` / the Bangla equivalent. Opening hours are the `top.hours`, `res.hours.*` and `footer.hours.*` keys.

## 3. The menu

`assets/js/menu-data.js` is a list of sections. Each section has an `id`, a Turkish title (`tr`) and a title in both languages. Each dish:

```js
{ n: { en: "Adana Kebap", bn: "আদানা কাবাব" },
  d: { en: "hand-minced lamb with chili…", bn: "হাতে কিমা করা খাসি…" },
  p: 950,            // price in BDT, number only
  c: "G/S",          // allergen / diet codes, see below
  tag: "chef" }      // optional: "local" | "chef" | "new"
```

Codes: `G` gluten · `D` dairy · `TN` tree nuts · `SS` sesame · `E` egg · `F` fish · `MO` molluscs · `SOY` soy · `V` vegetarian · `VG` vegan · `S` spicy.

The **Vegetarian / Vegan / Gluten-free** filters on the menu page are computed from these codes, so keep them accurate.

To add a section, copy an existing block and give it a new `id` (letters only). The section tabs are generated automatically.

**Signature dishes on the home page** are picked from the menu by `data-highlights` on `index.html`:

```html
<div class="dishes" data-highlights="kebap:0,kebap:4,kebap:8,sicak:2" data-images="…">
```

`kebap:0` = first dish of the `kebap` section. Change the pairs to feature different dishes; `data-images` lists one photo per pick, in the same order.

**Two prices (platter / non-platter).** Give a dish `p` (platter) and `p2` (non-platter) and the menu page prints both, labelled with the `menu.platter` / `menu.nonplatter` strings from `i18n.js`. Leave `p2` out for a single price.

**Section banner photo.** Add `img: "assets/img/photos/….jpg"` to a section to show a wide photo above its title on the menu page.

## 4. Photos and logo

Web photos live in `assets/img/photos/`. Each photo exists twice: `name.jpg` (long edge 1400 px, heroes 1600 px) and `name-sm.jpg` (720 px thumbnail for cards, dish tiles and the gallery grid). The originals — 85 full-size photos and the logo PDF — are in `_source/`, which is git-ignored so the repo stays light.

To add or replace a photo: put the original in `_source/photos/`, then regenerate both sizes (Pillow, quality 80, progressive JPEG) and reference `assets/img/photos/<name>.jpg` from the HTML. Keep web photos under ~400 KB.

| Where | Files |
|---|---|
| Page heroes | `hero-home`, `hero-menu`, `hero-about`, `hero-gallery`, `hero-reserve` |
| Interiors | `interior-1 … interior-6` |
| Dishes | `hummus*`, `haydari`, `soup*`, `prawns*`, `shrimp-salad*`, `adana*`, `chicken-*`, `wings*`, `mixed-grill*`, `platter*`, `lamb-chops`, `calamari*`, `guvec`, `sac-kavurma`, `stew`, `musakka`, `salad*`, `kofte*`, `fries`, `bread`, `mojito`, `tea` |
| Sharing boards | `board-3`, `board-long`, `board-long-2`, `board-candle` |

Gallery photos are listed in `gallery.html`: each `<figure>` has `data-full` (the large file, opened in the lightbox) and an `<img>` pointing to the `-sm` thumbnail, plus a caption key (`gallery.cap.N`).

**Logo.** `assets/img/logo.svg` is the vector wordmark extracted from the logo PDF, drawn in `currentColor`. It is placed with `<span class="logo"></span>` and takes the colour of its parent (gold in the header, cream in the footer, maroon on light sections). `favicon.svg` is the "S" glyph on maroon.

## 5. Reservations and newsletter

There is no server yet. The reservation form builds a message and opens **WhatsApp** (to the `whatsapp` number in `site-config.js`) or the visitor's **email app**. The newsletter box does the same by email. When the backend (`api.sofra.com.bd`) exists, these two forms are the first things to wire to it.

## 6. Colours and fonts

Top of `assets/css/style.css`:

```css
--maroon:   #54131e;   /* header, dark sections, solid buttons — from the logo sheet */
--gold:     #cf9552;   /* logo in header, accents on dark */
--gold-2:   #8b6c2a;   /* eyebrows, rules, Turkish subtitles on light */
--charcoal: #231f20;   /* footer, body text */
--cream:    #f8f3eb;   /* page background */
--teal:     #1f7f76;   /* "Locally sourced" pills */
```

Fonts are loaded from Google Fonts: Poppins 200/300 (headings and body, as on the Rüya site), Cormorant Garamond (dish names, Turkish italics), Noto Serif Bengali + Hind Siliguri (Bangla).

Tip: add `?lang=bn` or `?lang=en` to any page URL to force a language (useful for screenshots and sharing links).

## 7. Scroll effects and sliders

`assets/js/effects.js` adds the motion, using three libraries loaded from CDN at the bottom of every page (GSAP + ScrollTrigger, Lenis, Swiper). If a CDN is unreachable the site still works: sliders show their first image, sections are simply visible, scrolling is native. Visitors with "reduce motion" enabled get no parallax, no smooth-scroll and no autoplay.

| Effect | Reference | How to use it in HTML |
|---|---|---|
| Inertia smooth scrolling | Passalacqua | automatic |
| Header hides on scroll down, returns on scroll up | Passalacqua | automatic |
| Fade-up reveal when a block scrolls into view | Rüya | add `class="reveal"`; add `data-stagger` to animate the children one after another |
| Image settles from a slight zoom | Passalacqua | add `class="fx-img"` to the image's wrapper |
| Parallax (element moves slower/faster than the page) | Passalacqua / Greenway | `data-speed=".8"` on an `<img>` (below 1 = slower, above 1 = faster); put `data-parallax-box` on the box it scrolls within |
| Full-width parallax quote band | Greenway | copy the `<section class="parallax">` block from `index.html` |
| Hero carousel — crossfade, arrows, dots, slow zoom | The Pods / Greenway | `.swiper.hero-slider` inside `.hero .media`; one `.swiper-slide` per photo, optional `.slide-cap` caption |
| Fading image slider with dots inside a text section | Rüya | `.swiper.fade-slider` inside a `.frame` |
| Draggable card carousel with arrows | Passalacqua | `.swiper.card-slider`; each slide is a `<figure>` with optional `<figcaption>` |

Timings live at the top of each `new Swiper(...)` call in `effects.js` (hero 5.5 s, fade sliders 3.2 s, cards 4 s).

## 8. Previewing locally

Any static server works. From the repo root:

```
python -m http.server 8080
```

then open <http://localhost:8080/>. Opening the `.html` files directly from disk also works.
