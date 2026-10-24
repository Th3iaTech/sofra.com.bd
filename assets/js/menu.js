/* Sofra — menu page: renders SOFRA_MENU as photo cards per section, the jump bar and the
   "at a glance" price list; re-renders on language change. */
(function () {
  "use strict";
  var MENU = window.SOFRA_MENU || [];
  var root = document.getElementById("menu-root");
  var tabs = document.getElementById("menu-tabs");
  var glance = document.getElementById("menu-glance");
  if (!root) return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); }
  function L(o, lang) { return o ? (o[lang] || o.en) : ""; }
  function small(src) { return src.replace(/\.jpg$/, "-sm.jpg"); }

  function card(it, lang, price) {
    var name = L(it.n, lang);
    var pic = "";
    if (it.img) {
      pic = '<figure class="pic"><img src="' + esc(small(it.img)) + '" srcset="' + esc(small(it.img)) + " 640w, " + esc(it.img) + ' 1200w"' +
        ' sizes="' + (it.wide ? "(max-width: 1240px) 100vw, 1180px" : "(max-width: 640px) 100vw, 360px") + '"' +
        ' alt="' + esc(name) + '" loading="lazy" decoding="async"></figure>';
    }
    return '<article class="dish-card' + (it.wide ? " wide" : "") + (it.img ? "" : " noimg") + '">' + pic +
      '<div class="body">' +
        "<h3>" + esc(name) + "</h3>" +
        (it.sub ? '<p class="sub">' + esc(L(it.sub, lang)) + "</p>" : "") +
        (it.d ? '<p class="desc">' + esc(L(it.d, lang)) + "</p>" : "") +
        '<p class="price">' + price(it.p, lang) + "</p>" +
      "</div></article>";
  }

  function render() {
    var lang = document.documentElement.lang || "en";
    var price = window.Sofra ? window.Sofra.formatPrice : function (n) { return "৳ " + n; };

    root.innerHTML = "";
    if (tabs) tabs.innerHTML = "";
    var glanceHtml = "";

    MENU.forEach(function (sec) {
      var id = "sec-" + sec.id;
      var title = L(sec.title, lang);
      if (tabs) {
        var a = document.createElement("a");
        a.href = "#" + id;
        a.textContent = title;
        tabs.appendChild(a);
      }
      var section = document.createElement("section");
      section.className = "menu-section";
      section.id = id;
      section.innerHTML =
        '<header class="menu-head"><h2>' + esc(title) + '<span class="tr">' + esc(sec.tr) + '</span></h2><span class="ornament" aria-hidden="true"></span></header>' +
        '<div class="dish-grid">' + sec.items.map(function (it) { return card(it, lang, price); }).join("") + "</div>";
      root.appendChild(section);

      glanceHtml += '<div class="glance-group"><h3>' + esc(title) + "</h3><ul>" +
        sec.items.map(function (it) {
          return "<li><span>" + esc(L(it.n, lang)) + '</span><i aria-hidden="true"></i><b>' + price(it.p, lang).replace("৳ ", "") + "</b></li>";
        }).join("") + "</ul></div>";
    });
    if (glance) glance.innerHTML = glanceHtml;
  }

  /* highlight the tab of the section in view */
  var io;
  function watchSections() {
    if (!tabs || !("IntersectionObserver" in window)) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Array.prototype.forEach.call(tabs.querySelectorAll("a"), function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Array.prototype.forEach.call(root.querySelectorAll(".menu-section"), function (s) { io.observe(s); });
  }

  document.addEventListener("sofra:lang", function () { render(); watchSections(); });
  if (document.documentElement.lang && root.children.length === 0) { render(); watchSections(); }
})();
