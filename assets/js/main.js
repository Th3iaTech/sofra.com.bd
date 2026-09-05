/* Sofra — shared behaviour: language toggle, drawer nav, contact wiring, forms, gallery lightbox, reveal animation. */
(function () {
  "use strict";

  var I18N = window.SOFRA_I18N || { en: {}, bn: {} };
  var SITE = window.SOFRA_SITE || {};
  var LANG_KEY = "sofra.lang";
  var BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); }

  function getLang() {
    var q = /[?&]lang=(en|bn)\b/.exec(location.search);
    if (q) return q[1];
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* storage blocked */ }
    if (saved === "en" || saved === "bn") return saved;
    var nav = (navigator.language || "").toLowerCase();
    return nav.indexOf("bn") === 0 ? "bn" : "en";
  }

  function t(key, lang) {
    lang = lang || document.documentElement.lang || "en";
    var dict = I18N[lang] || {};
    if (dict[key] != null) return dict[key];
    if (I18N.en && I18N.en[key] != null) return I18N.en[key];
    return key;
  }

  function toBnDigits(str) {
    return String(str).replace(/\d/g, function (d) { return BN_DIGITS[+d]; });
  }

  function formatPrice(n, lang) {
    var s = Number(n).toLocaleString("en-US");
    if ((lang || document.documentElement.lang) === "bn") s = toBnDigits(s);
    return "৳ " + s;
  }

  /* ---------- language ---------- */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }

    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n"), lang); });
    $$("[data-i18n-placeholder]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang)); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), lang)); });

    var titleEl = $("[data-i18n-title]");
    if (titleEl) {
      var page = t(titleEl.getAttribute("data-i18n-title"), lang);
      document.title = page + " — Sofra · " + t("meta.tagline", lang);
    }

    $$(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    renderHighlights(lang);
    document.dispatchEvent(new CustomEvent("sofra:lang", { detail: { lang: lang } }));
  }

  /* ---------- site config wiring ---------- */
  function wireSite() {
    $$("[data-site]").forEach(function (el) {
      var what = el.getAttribute("data-site");
      switch (what) {
        case "phone":
          el.textContent = SITE.phoneDisplay || SITE.phone || "";
          if (el.tagName === "A") el.href = "tel:" + (SITE.phone || "");
          break;
        case "whatsapp":
          if (el.tagName === "A") { el.href = "https://wa.me/" + (SITE.whatsapp || ""); el.target = "_blank"; el.rel = "noopener"; }
          if (!el.hasAttribute("data-i18n") && !el.textContent.trim()) el.textContent = "WhatsApp";
          break;
        case "email":
          el.textContent = SITE.email || "";
          if (el.tagName === "A") el.href = "mailto:" + (SITE.email || "");
          break;
        case "map":
          if (el.tagName === "A") { el.href = SITE.mapUrl || "#"; el.target = "_blank"; el.rel = "noopener"; }
          break;
        case "instagram":
        case "facebook":
        case "tiktok":
          if (el.tagName === "A") {
            var url = SITE.social && SITE.social[what];
            if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener"; }
            else el.style.display = "none";
          }
          break;
      }
    });
  }

  /* ---------- drawer navigation ---------- */
  function wireNav() {
    var toggle = $(".nav-toggle");
    var drawer = $("#drawer");
    var scrim = $("#scrim");
    var closeBtn = $(".drawer-close");
    if (!toggle || !drawer) return;

    function setOpen(open) {
      drawer.classList.toggle("open", open);
      if (scrim) scrim.classList.toggle("show", open);
      document.body.classList.toggle("drawer-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      if (window.SofraFX) window.SofraFX.lock(open);
      if (open) { var first = $("a", drawer); if (first) first.focus(); } else toggle.focus();
    }
    toggle.addEventListener("click", function () { setOpen(!drawer.classList.contains("open")); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("open")) setOpen(false); });
    $$("a", drawer).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });

    var path = location.pathname.replace(/\/+$/, "").split("/").pop() || "index.html";
    $$("nav a", drawer).forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var target = href.split("#")[0] || "index.html";
      if (target === path && href.indexOf("#") === -1) a.setAttribute("aria-current", "page");
    });
  }

  /* ---------- signature dishes (index) ---------- */
  function renderHighlights(lang) {
    var host = $("[data-highlights]");
    var MENU = window.SOFRA_MENU;
    if (!host || !MENU) return;
    var picks = host.getAttribute("data-highlights").split(",");
    var imgs = (host.getAttribute("data-images") || "").split(",");
    host.innerHTML = "";
    picks.forEach(function (pick, i) {
      var parts = pick.trim().split(":");
      var section = MENU.filter(function (s) { return s.id === parts[0]; })[0];
      var item = section && section.items[+parts[1]];
      if (!item) return;
      var div = document.createElement("div");
      div.className = "dish";
      var img = imgs[i] ? '<div class="pic fx-img"><img src="' + esc(imgs[i].trim()) + '" alt="' + esc(item.n[lang] || item.n.en) + '" loading="lazy" width="600" height="750"></div>' : "";
      div.innerHTML = img +
        "<h3>" + esc(item.n[lang] || item.n.en) + '<span class="tr">' + esc(section.tr) + "</span></h3>" +
        "<p>" + esc(item.d[lang] || item.d.en) + "</p>" +
        '<div class="price">' + formatPrice(item.p, lang) + "</div>";
      host.appendChild(div);
    });
  }

  /* ---------- gallery lightbox ---------- */
  function wireLightbox() {
    var figs = $$(".gallery figure");
    var box = $("#lightbox");
    if (!figs.length || !box || typeof box.showModal !== "function") return;
    var img = $("img", box), cap = $(".cap", box), idx = 0;

    function show(i) {
      idx = (i + figs.length) % figs.length;
      var thumb = $("img", figs[idx]);
      img.src = figs[idx].getAttribute("data-full") || thumb.src;
      img.alt = thumb.alt;
      var c = $("figcaption", figs[idx]);
      cap.textContent = c ? c.textContent : "";
    }
    function open(i) { show(i); box.showModal(); if (window.SofraFX) window.SofraFX.lock(true); }
    box.addEventListener("close", function () { if (window.SofraFX) window.SofraFX.lock(false); });
    figs.forEach(function (f, i) {
      f.setAttribute("tabindex", "0");
      f.addEventListener("click", function () { open(i); });
      f.addEventListener("keydown", function (e) { if (e.key === "Enter") open(i); });
    });
    $(".prev", box).addEventListener("click", function () { show(idx - 1); });
    $(".next", box).addEventListener("click", function () { show(idx + 1); });
    $(".close", box).addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- reservation form (no backend: WhatsApp / mailto) ---------- */
  function wireReservation() {
    var form = $("#reserve-form");
    if (!form) return;

    function buildMessage(lang) {
      var f = form.elements;
      var lines = [t("reserve.msg.intro", lang), ""];
      var fields = [
        ["reserve.msg.name", f.name.value],
        ["reserve.msg.phone", f.phone.value],
        ["reserve.msg.date", f.date.value],
        ["reserve.msg.time", f.time.value],
        ["reserve.msg.guests", f.guests.value],
        ["reserve.msg.occasion", f.occasion.options[f.occasion.selectedIndex] ? f.occasion.options[f.occasion.selectedIndex].text : ""],
        ["reserve.msg.notes", f.notes.value]
      ];
      fields.forEach(function (p) { if (p[1] && p[1] !== "—") lines.push(t(p[0], lang) + ": " + p[1]); });
      return lines.join("\n");
    }

    form.addEventListener("submit", function (e) { e.preventDefault(); });

    $$("[data-send]", form).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!form.reportValidity()) return;
        var lang = document.documentElement.lang;
        var msg = buildMessage(lang);
        if (btn.getAttribute("data-send") === "wa") {
          window.open("https://wa.me/" + (SITE.whatsapp || "") + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
        } else {
          location.href = "mailto:" + (SITE.reservationsEmail || SITE.email || "") +
            "?subject=" + encodeURIComponent(t("reserve.subject", lang)) +
            "&body=" + encodeURIComponent(msg);
        }
      });
    });

    var date = form.elements.date;
    if (date) date.min = new Date().toISOString().slice(0, 10);
  }

  /* ---------- newsletter (no backend yet: mailto fallback) ---------- */
  function wireNewsletter() {
    var form = $("#newsletter-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.elements.email.value;
      if (!email) return;
      location.href = "mailto:" + (SITE.email || "") + "?subject=" + encodeURIComponent("Newsletter subscription") +
        "&body=" + encodeURIComponent("Please add " + email + " to the Sofra newsletter.");
    });
  }

  /* ---------- reveal on scroll ---------- */
  function wireReveal() {
    var els = $$(".reveal");
    if (!els.length || window.SOFRA_FX) return; /* effects.js drives reveals when loaded */
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    wireSite();
    wireNav();
    wireReservation();
    wireNewsletter();
    wireLightbox();
    $$(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });
    applyLang(getLang());
    wireReveal();
  });

  window.Sofra = { t: t, formatPrice: formatPrice, toBnDigits: toBnDigits, applyLang: applyLang, esc: esc };
})();
