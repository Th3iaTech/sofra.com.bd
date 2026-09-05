/* Sofra — menu page: renders SOFRA_MENU, section tabs, dietary filters, re-renders on language change. */
(function () {
  "use strict";
  var MENU = window.SOFRA_MENU || [];
  var root = document.getElementById("menu-root");
  var tabs = document.getElementById("menu-tabs");
  if (!root) return;

  var filter = "all";

  function codesOf(item) { return item.c ? item.c.split("/") : []; }
  function matches(item) {
    var c = codesOf(item);
    switch (filter) {
      case "veg": return c.indexOf("V") > -1 || c.indexOf("VG") > -1;
      case "vegan": return c.indexOf("VG") > -1;
      case "gf": return c.indexOf("G") === -1;
      default: return true;
    }
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]; }); }

  function render() {
    var lang = document.documentElement.lang || "en";
    var t = window.Sofra ? window.Sofra.t : function (k) { return k; };
    var price = window.Sofra ? window.Sofra.formatPrice : function (n) { return "৳ " + n; };

    root.innerHTML = "";
    if (tabs) tabs.innerHTML = "";

    MENU.forEach(function (sec) {
      var id = "sec-" + sec.id;
      if (tabs) {
        var a = document.createElement("a");
        a.href = "#" + id;
        a.textContent = sec.title[lang] || sec.title.en;
        tabs.appendChild(a);
      }

      var section = document.createElement("section");
      section.className = "menu-section";
      section.id = id;
      var html = "";
      if (sec.img) html += '<div class="banner-wrap" data-parallax-box><img class="banner" src="' + esc(sec.img) + '" alt="" loading="lazy" width="1400" height="533" data-speed=".8"></div>';
      html += "<h2>" + esc(sec.title[lang] || sec.title.en) + '<span class="tr">' + esc(sec.tr) + "</span></h2>" + '<div class="menu-items">';
      sec.items.forEach(function (it) {
        var codes = it.c ? "(" + esc(it.c) + ")" : "";
        var badge = it.tag ? '<span class="pill ' + esc(it.tag) + '">' + esc(t("menu.badge." + it.tag, lang)) + "</span>" : "";
        var nameHtml = '<div class="name">' + esc(it.n[lang] || it.n.en) + (it.p2 ? "" : '<span class="price">' + price(it.p, lang) + "</span>") + "</div>";
        var dual = it.p2
          ? '<div class="dual">' + price(it.p, lang) + "<small>" + esc(t("menu.platter", lang)) + "</small> · " +
            price(it.p2, lang) + "<small>" + esc(t("menu.nonplatter", lang)) + "</small></div>"
          : "";
        html += '<div class="menu-item" data-codes="' + esc(it.c || "") + '">' + nameHtml + dual +
          '<div class="desc">' + esc(it.d[lang] || it.d.en) + "</div>" +
          '<div class="codes">' + codes + "</div>" + badge +
          "</div>";
      });
      html += '</div><p class="menu-empty">' + esc(t("menu.empty", lang)) + "</p>";
      section.innerHTML = html;
      section._items = sec.items;
      root.appendChild(section);
    });
    applyFilter();
  }

  function applyFilter() {
    Array.prototype.forEach.call(root.querySelectorAll(".menu-section"), function (section) {
      var nodes = section.querySelectorAll(".menu-item");
      var visible = 0;
      Array.prototype.forEach.call(nodes, function (node, i) {
        var ok = matches(section._items[i]);
        node.classList.toggle("hidden", !ok);
        if (ok) visible++;
      });
      section.querySelector(".menu-empty").style.display = visible ? "none" : "block";
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(document.querySelectorAll(".filter-btn"), function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilter();
    });
  });

  /* highlight the tab of the section in view */
  function watchSections() {
    if (!tabs || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
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
