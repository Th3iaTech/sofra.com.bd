/* Sofra — scroll effects & sliders.
   Modelled on the reference sites:
     · Passalacqua  → inertia smooth scrolling (Lenis), parallax images, scroll-triggered reveals (GSAP ScrollTrigger)
     · Rüya         → fading image sliders with dots + autoplay in content sections, fade-up entrances with delays
     · Greenway     → hero carousel, parallax background bands
     · The Pods     → hero carousel with arrows and indicators
   Libraries (CDN, loaded before this file): gsap + ScrollTrigger, Lenis, Swiper. Everything degrades gracefully
   if a library is missing or the visitor prefers reduced motion. */
window.SOFRA_FX = true;
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var hasLenis = typeof window.Lenis === "function";
  var hasSwiper = typeof window.Swiper === "function";
  var lenis = null;
  var parallaxTriggers = [];
  var programmatic = false; /* true while we drive the scroll ourselves (anchors) — header stays visible */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function headerH() { var h = $(".site-header"); return h ? h.offsetHeight : 72; }

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- 1. Smooth inertia scrolling (Passalacqua) ---------- */
  function initSmoothScroll() {
    if (!hasLenis || reduce) return;
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
    function glideTo(target, opts) {
      programmatic = true;
      lenis.scrollTo(target, Object.assign({ offset: -headerH() - 8, duration: 1.4, onComplete: function () { programmatic = false; } }, opts || {}));
    }
    /* in-page anchors go through Lenis so they glide; "#" alone means back to top */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a || a.hasAttribute("data-site")) return;
      var url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname) return;
      if (url.hash === "" || url.hash === "#") { e.preventDefault(); glideTo(0); return; }
      var target = document.getElementById(url.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      glideTo(target);
      history.replaceState(null, "", url.hash);
    });
    if (location.hash) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) setTimeout(function () { glideTo(t, { immediate: true }); }, 50);
    }
    /* keep native window.scrollTo / scroll(…) working (Lenis would otherwise pull the page back) */
    var nativeScrollTo = window.scrollTo.bind(window);
    window.scrollTo = window.scroll = function (x, y) {
      var top = (typeof x === "object" && x !== null) ? (x.top != null ? x.top : window.scrollY) : (typeof y === "number" ? y : 0);
      if (typeof x === "object" && x !== null && x.behavior === "smooth") glideTo(top, { offset: 0 });
      else { lenis.scrollTo(top, { immediate: true, offset: 0 }); nativeScrollTo(typeof x === "object" && x !== null ? x : { top: top, left: 0 }); }
    };
  }

  /* ---------- 2. Header hides on scroll down, returns on scroll up ---------- */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var last = 0;
    function setHidden(on) {
      header.classList.toggle("is-hidden", on);
      document.body.classList.toggle("header-hidden", on);
    }
    function onScroll(y, velocity) {
      var moving = velocity == null ? true : Math.abs(velocity) > 0.6; /* ignore tiny drifts from content reflow */
      if (programmatic || document.body.classList.contains("drawer-open")) setHidden(false);
      else if (y <= 160) setHidden(false);
      else if (moving && y > last + 4) setHidden(true);
      else if (moving && y < last - 4) setHidden(false);
      header.classList.toggle("is-scrolled", y > 40);
      last = y;
    }
    if (lenis) lenis.on("scroll", function (e) { onScroll(e.scroll, e.velocity); });
    else window.addEventListener("scroll", function () { onScroll(window.scrollY); }, { passive: true });
    /* a language switch re-renders content and nudges the scroll position — keep the header put */
    document.addEventListener("sofra:lang", function () {
      programmatic = true; setHidden(false);
      setTimeout(function () { programmatic = false; last = lenis ? lenis.scroll : window.scrollY; }, 900);
    });
  }

  /* ---------- 3. Reveals (Rüya a-up / a-op, Passalacqua image scale) ---------- */
  function initReveals() {
    var els = $$(".reveal");
    var canAnimate = hasGsap && !reduce && "IntersectionObserver" in window;
    if (!canAnimate) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    document.documentElement.classList.add("fx-on"); /* CSS drops its own .reveal transition — GSAP drives */

    /* Reveal the moment a block enters the viewport (IntersectionObserver is independent of how the page is scrolled). */
    var pending = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var play = pending.get(en.target);
        if (play) { pending.delete(en.target); play(); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });

    els.forEach(function (el) {
      el.classList.add("in");
      var targets = el.hasAttribute("data-stagger") ? $$(":scope > *", el) : [el];
      gsap.set(targets, { autoAlpha: 0, y: 28 });
      pending.set(el, function () {
        gsap.to(targets, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: Math.min(0.1, 1.2 / targets.length), overwrite: true, clearProps: "transform" });
      });
      io.observe(el);
    });

    /* images: settle from a slight zoom as they enter (Passalacqua) */
    $$(".fx-img").forEach(function (wrap) {
      var img = wrap.tagName === "IMG" ? wrap : $("img", wrap);
      if (!img) return;
      gsap.set(img, { scale: 1.12 });
      pending.set(wrap, function () { gsap.to(img, { scale: 1, duration: 1.6, ease: "power2.out", overwrite: true }); });
      io.observe(wrap);
    });

    /* Safety net: nothing may stay hidden. Anything still pending 2.5 s after load or after a scroll stops is shown. */
    function flushVisible() {
      pending.forEach(function (play, el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > -50 && r.top < innerHeight + 50) { pending.delete(el); io.unobserve(el); play(); }
      });
    }
    var settle;
    window.addEventListener("scroll", function () { clearTimeout(settle); settle = setTimeout(flushVisible, 250); }, { passive: true });
    setTimeout(flushVisible, 2500);

    /* hero copy on load */
    var hero = $(".hero .content");
    if (hero) {
      gsap.fromTo($$(":scope > *", hero), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.2 });
    }
  }

  /* ---------- 4. Parallax (Passalacqua data-scroll-speed, Greenway parallax-bg) ---------- */
  function initParallax() {
    parallaxTriggers.forEach(function (t) { t.kill(); });
    parallaxTriggers = [];
    if (!hasGsap || reduce) return;
    /* hero media drifts up and stays behind as you scroll away */
    $$(".hero .media").forEach(function (m) {
      var tw = gsap.to(m, { yPercent: 22, ease: "none", scrollTrigger: { trigger: m.parentElement, start: "top top", end: "bottom top", scrub: true } });
      parallaxTriggers.push(tw.scrollTrigger);
    });
    /* any element with data-speed: <1 moves slower than the page, >1 faster */
    $$("[data-speed]").forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-speed")) || 1;
      var box = el.closest("[data-parallax-box]") || el.parentElement;
      var dist = (1 - speed) * 120;
      var tw = gsap.fromTo(el, { yPercent: -dist / 2 }, { yPercent: dist / 2, ease: "none", scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true } });
      parallaxTriggers.push(tw.scrollTrigger);
    });
  }

  /* ---------- 5. Sliders (Swiper) ---------- */
  function initSliders() {
    if (!hasSwiper) return;
    var autoplayOK = !reduce;

    /* Hero carousel — crossfade, arrows + dots (The Pods / Greenway), Ken Burns on the active slide */
    $$(".hero-slider").forEach(function (el) {
      new Swiper(el, {
        effect: "fade", fadeEffect: { crossFade: true }, speed: 1500, loop: true,
        autoplay: autoplayOK ? { delay: 5500, disableOnInteraction: false } : false,
        pagination: { el: $(".swiper-pagination", el), clickable: true },
        navigation: { nextEl: $(".swiper-button-next", el), prevEl: $(".swiper-button-prev", el) },
        a11y: { enabled: true }
      });
    });

    /* Content sliders — fade, dots, autoplay 3 s, no arrows (Rüya content-media--slider) */
    $$(".fade-slider").forEach(function (el) {
      new Swiper(el, {
        effect: "fade", fadeEffect: { crossFade: true }, speed: 1100, loop: true,
        autoplay: autoplayOK ? { delay: 3200, disableOnInteraction: false } : false,
        pagination: { el: $(".swiper-pagination", el), clickable: true }
      });
    });

    /* Card carousels — draggable, partial next slide visible, arrows (Passalacqua) */
    $$(".card-slider").forEach(function (el) {
      new Swiper(el, {
        slidesPerView: 1.15, spaceBetween: 10, speed: 900, grabCursor: true, loop: true,
        autoplay: autoplayOK ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true } : false,
        breakpoints: { 640: { slidesPerView: 2.2, spaceBetween: 12 }, 1000: { slidesPerView: 3, spaceBetween: 14 } },
        navigation: { nextEl: $(".swiper-button-next", el), prevEl: $(".swiper-button-prev", el) },
        pagination: { el: $(".swiper-pagination", el), clickable: true }
      });
    });
  }

  /* ---------- lock/unlock page scroll for drawer & lightbox ---------- */
  function lock(on) { if (!lenis) return; if (on) lenis.stop(); else lenis.start(); }

  document.addEventListener("DOMContentLoaded", function () {
    initSmoothScroll();
    initHeader();
    initSliders();
    initReveals();
    initParallax();
    if (hasGsap) {
      window.addEventListener("load", function () { ScrollTrigger.refresh(); });
      document.fonts && document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
  });
  /* the menu page re-renders its sections on language change — re-measure */
  document.addEventListener("sofra:lang", function () {
    setTimeout(function () { initParallax(); if (hasGsap) ScrollTrigger.refresh(); }, 60);
  });

  window.SofraFX = { lock: lock, refresh: function () { if (hasGsap) ScrollTrigger.refresh(); }, get lenis() { return lenis; } };
})();
