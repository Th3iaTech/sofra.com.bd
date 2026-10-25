/* Sofra — WhatsApp chat widget (all pages).
   A guided, scripted chat (no AI yet): visitor picks Reservation / Order / Complaint / Suggestion,
   answers a few questions with quick-reply chips or typing, and the finished message opens in
   WhatsApp to SITE.whatsapp. Menu and Hours & location answer instantly.
   Strings: chat.* in i18n.js (reuses reserve.msg.* labels). Hours: SITE.hours. Dishes: SOFRA_MENU
   (menu-data.js is loaded on demand on pages that don't include it). */
(function () {
  "use strict";
  var SITE = window.SOFRA_SITE || {};
  if (!SITE.whatsapp) return;

  var WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.97 12.97 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3zm0 23.62c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.63 10.64-10.63 5.86 0 10.6 4.77 10.6 10.63 0 5.87-4.76 10.62-10.6 10.62zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.19-.32-.02-.5.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.3.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"/></svg>';
  var CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z"/></svg>';
  var SEND_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.1 15 12 3.4 13.9z"/></svg>';

  function t(k) { return window.Sofra ? window.Sofra.t(k, lang()) : k; }
  function lang() { return document.documentElement.lang || "en"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function digits(s) { return lang() === "bn" && window.Sofra ? window.Sofra.toBnDigits(String(s)) : String(s); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- dates & hours ---------- */
  function iso(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function dayOffset(n) { var d = new Date(); d.setDate(d.getDate() + n); return iso(d); }
  function prettyDate(v) {
    var p = v.split("-"); if (p.length !== 3) return v;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString(lang() === "bn" ? "bn-BD" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
  }
  function clock() { var d = new Date(); return digits(("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)); }
  function openNow() {
    var h = SITE.hours; if (!h) return null;
    var now;
    try { now = new Date().toLocaleTimeString("en-GB", { timeZone: h.tz || "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: false }); }
    catch (e) { return null; }
    return now >= h.open && now < h.close;
  }

  /* ---------- flows ----------
     step: { key, ask, type: text|textarea|date|time|number|multi, required, chips:[[labelKeyOrText, value, isKey]],
             when(answers), label (message label key), show(value) display formatter } */
  function dateChips(past) {
    return past ? [["chat.today", dayOffset(0), 1], ["chat.yesterday", dayOffset(-1), 1]]
                : [["chat.today", dayOffset(0), 1], ["chat.tomorrow", dayOffset(1), 1]];
  }
  var FLOWS = {
    reserve: { intro: "reserve.msg.intro", steps: [
      { key: "name", ask: "chat.r.name", type: "text", required: true, label: "reserve.msg.name", auto: "name" },
      { key: "date", ask: "chat.r.date", type: "date", required: true, label: "reserve.msg.date", chips: function () { return dateChips(false); }, show: prettyDate },
      { key: "time", ask: "chat.r.time", type: "time", required: true, label: "reserve.msg.time",
        chips: function () { return [["13:00", "13:00"], ["14:00", "14:00"], ["19:00", "19:00"], ["20:00", "20:00"], ["21:00", "21:00"]]; }, show: digits },
      { key: "guests", ask: "chat.r.guests", type: "number", required: true, label: "reserve.msg.guests",
        chips: function () { return [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["8", "8"], ["10+", "10+"]]; }, show: digits },
      { key: "notes", ask: "chat.r.note", type: "textarea", label: "reserve.msg.notes" }
    ] },
    order: { intro: "chat.m.order", steps: [
      { key: "items", ask: "chat.o.items", type: "multi", required: true, label: "chat.l.items" },
      { key: "mode", ask: "chat.o.mode", type: "choice", required: true, label: "chat.l.mode",
        chips: function () { return [["chat.o.pickup", "pickup", 1], ["chat.o.delivery", "delivery", 1]]; } },
      { key: "address", ask: "chat.o.address", type: "textarea", required: true, label: "chat.l.address", when: function (a) { return a.mode && a.mode.value === "delivery"; } },
      { key: "when", ask: "chat.o.when", type: "time", label: "chat.l.when", chips: function () { return [["chat.asap", t("chat.asap"), 1]]; }, show: digits },
      { key: "name", ask: "chat.o.name", type: "text", required: true, label: "reserve.msg.name", auto: "name" }
    ] },
    complaint: { intro: "chat.m.complaint", lead: "chat.c.sorry", steps: [
      { key: "visit", ask: "chat.c.date", type: "date", past: true, label: "chat.l.visit", chips: function () { return dateChips(true); }, show: prettyDate },
      { key: "details", ask: "chat.c.details", type: "textarea", required: true, label: "chat.l.details" },
      { key: "name", ask: "chat.c.name", type: "text", required: true, label: "reserve.msg.name", auto: "name" }
    ] },
    suggestion: { intro: "chat.m.suggestion", steps: [
      { key: "details", ask: "chat.s.details", type: "textarea", required: true, label: "chat.l.suggestion" },
      { key: "name", ask: "chat.s.name", type: "text", label: "reserve.msg.name", auto: "name" }
    ] }
  };

  /* ---------- DOM ---------- */
  var root = document.createElement("div");
  root.className = "wa-chat";
  root.innerHTML =
    '<div class="wa-teaser" hidden><button class="wa-teaser-x" type="button" data-i18n-aria="chat.close">×</button><p></p></div>' +
    '<button class="wa-fab" type="button" aria-expanded="false" aria-controls="wa-panel">' + WA_ICON + '<span class="wa-badge" aria-hidden="true">1</span></button>' +
    '<section class="wa-panel" id="wa-panel" role="dialog" aria-modal="false" aria-labelledby="wa-title" hidden>' +
      '<header class="wa-head">' +
        '<span class="wa-avatar"><span class="wa-dot"></span></span>' +
        '<span class="wa-who"><strong id="wa-title"></strong><small class="wa-status"></small></span>' +
        '<button class="wa-x" type="button">' + CLOSE_ICON + "</button>" +
      "</header>" +
      '<div class="wa-body" data-lenis-prevent><div class="wa-log" role="log" aria-live="polite"></div></div>' +
      '<footer class="wa-foot">' +
        '<div class="wa-chips"></div>' +
        '<form class="wa-input" hidden><input class="wa-field" autocomplete="off"><textarea class="wa-field wa-area" rows="2" hidden></textarea>' +
          '<button class="wa-send" type="submit">' + SEND_ICON + "</button></form>" +
        '<p class="wa-err" role="alert"></p>' +
        '<a class="wa-direct" target="_blank" rel="noopener"></a>' +
      "</footer>" +
    "</section>";
  document.body.appendChild(root);

  var $ = function (s) { return root.querySelector(s); };
  var fab = $(".wa-fab"), panel = $(".wa-panel"), log = $(".wa-log"), body = $(".wa-body"),
      chips = $(".wa-chips"), form = $(".wa-input"), input = $("input.wa-field"), area = $("textarea.wa-field"),
      err = $(".wa-err"), teaser = $(".wa-teaser");

  var state = { flow: null, i: 0, answers: {}, step: null, picked: [], token: 0 };

  function staticText() {
    fab.setAttribute("aria-label", t("chat.fab"));
    $(".wa-x").setAttribute("aria-label", t("chat.close"));
    $(".wa-teaser-x").setAttribute("aria-label", t("chat.close"));
    $("#wa-title").textContent = t("chat.name");
    $(".wa-send").setAttribute("aria-label", t("chat.send"));
    teaser.querySelector("p").textContent = t("chat.teaser");
    var d = $(".wa-direct"); d.textContent = t("chat.direct"); d.href = "https://wa.me/" + SITE.whatsapp;
    var o = openNow(), st = $(".wa-status");
    st.textContent = o === null ? t("chat.replies") : o ? t("chat.open") : t("chat.closed").replace("{t}", digits(SITE.hours.open));
    root.classList.toggle("is-closed", o === false);
  }

  /* ---------- log ---------- */
  function scrollDown() { body.scrollTop = body.scrollHeight; }
  function addRow(cls, html) {
    var row = document.createElement("div");
    row.className = "wa-row " + cls;
    row.innerHTML = html;
    log.appendChild(row); scrollDown();
    return row;
  }
  function bubble(html, who) {
    var ticks = who === "me" ? '<span class="wa-ticks" aria-hidden="true">✓✓</span>' : "";
    return addRow(who === "me" ? "me" : "bot", '<div class="wa-bubble">' + html + '<span class="wa-time">' + clock() + ticks + "</span></div>");
  }
  /* bot says each message after a short typing indicator; then cb */
  function say(list, cb) {
    var token = state.token;
    list = [].concat(list);
    (function next() {
      if (token !== state.token) return;
      if (!list.length) { if (cb) cb(); return; }
      var typing = addRow("bot typing", '<div class="wa-bubble"><span></span><span></span><span></span></div>');
      setTimeout(function () {
        if (token !== state.token) return;
        typing.remove(); bubble(list.shift(), "bot"); next();
      }, reduced ? 120 : 650);
    })();
  }
  function me(text) { bubble(esc(text).replace(/\n/g, "<br>"), "me"); }

  /* ---------- controls ---------- */
  function clearControls() {
    chips.innerHTML = ""; chips.classList.remove("multi");
    form.hidden = true; input.hidden = false; area.hidden = true;
    input.value = ""; area.value = ""; err.textContent = "";
  }
  function chip(label, onClick, extra) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "wa-chip" + (extra ? " " + extra : ""); b.innerHTML = label;
    b.addEventListener("click", onClick);
    chips.appendChild(b);
    return b;
  }

  function mainMenu() {
    state.flow = null; clearControls();
    [["reserve", "chat.opt.reserve"], ["order", "chat.opt.order"], ["menu", "chat.opt.menu"],
     ["hours", "chat.opt.hours"], ["complaint", "chat.opt.complaint"], ["suggestion", "chat.opt.suggestion"]]
      .forEach(function (o) {
        chip(esc(t(o[1])), function () { me(t(o[1])); pick(o[0]); });
      });
  }

  function pick(what) {
    clearControls();
    if (what === "menu") {
      say(t("chat.menu.reply") + '<br><a class="wa-link" href="menu.html">' + esc(t("chat.menu.link")) + " →</a>", function () { say(t("chat.more"), mainMenu); });
      return;
    }
    if (what === "hours") {
      var addr = t("contact.address");
      say(esc(t("chat.hours.reply").replace("{open}", digits(SITE.hours.open)).replace("{close}", digits(SITE.hours.close)).replace("{address}", addr)) +
          (SITE.mapUrl ? '<br><a class="wa-link" href="' + esc(SITE.mapUrl) + '" target="_blank" rel="noopener">' + esc(t("contact.map")) + " →</a>" : ""),
        function () { say(t("chat.more"), mainMenu); });
      return;
    }
    state.flow = what; state.i = 0; state.answers = {};
    var lead = FLOWS[what].lead;
    if (what === "order") ensureMenu();
    if (lead) say(esc(t(lead)), ask); else ask();
  }

  function ensureMenu() {
    if (window.SOFRA_MENU || document.querySelector("script[data-chat-menu]")) return;
    var s = document.createElement("script");
    s.src = "assets/js/menu-data.js"; s.setAttribute("data-chat-menu", "");
    document.head.appendChild(s);
  }

  function ask() {
    var flow = FLOWS[state.flow];
    var step = flow.steps[state.i];
    while (step && step.when && !step.when(state.answers)) step = flow.steps[++state.i];
    if (!step) return finish();
    state.step = step;
    say(esc(t(step.ask)), function () { controlsFor(step); });
  }

  function controlsFor(step) {
    clearControls();
    if (step.auto === "name" && state.remember && state.remember.name) {
      var n = state.remember.name;
      chip(esc(n), function () { answer(n, n); });
    }
    (step.chips ? step.chips() : []).forEach(function (c) {
      var label = c[2] ? t(c[0]) : c[0];
      chip(esc(step.show && !c[2] ? step.show(label) : label), function () { answer(c[1], label); });
    });
    if (step.type === "choice") return;
    if (step.type === "multi") return multiControls(step);
    form.hidden = false;
    var field = input;
    if (step.type === "textarea") { input.hidden = true; area.hidden = false; field = area; }
    input.type = { date: "date", time: "time", number: "number" }[step.type] || "text";
    input.removeAttribute("min"); input.removeAttribute("max");
    if (step.type === "date") { if (step.past) input.max = dayOffset(0); else input.min = dayOffset(0); }
    if (step.type === "number") { input.min = 1; input.max = 50; input.inputMode = "numeric"; }
    if (step.type === "time" && SITE.hours) { input.min = SITE.hours.open; input.max = SITE.hours.close; }
    field.placeholder = t("chat.placeholder");
    if (!step.required) chip(esc(t("chat.skip")), function () { answer("", t("chat.skip"), true); }, "ghost");
    setTimeout(function () { try { field.focus({ preventScroll: true }); } catch (e) { field.focus(); } }, 30);
  }

  function multiControls(step) {
    chips.classList.add("multi");
    state.picked = [];
    var menu = window.SOFRA_MENU || [];
    var price = window.Sofra ? window.Sofra.formatPrice : function (n) { return "৳ " + n; };
    menu.forEach(function (sec) {
      sec.items.forEach(function (it) {
        var name = it.n[lang()] || it.n.en;
        var b = chip(esc(name) + ' <small>' + price(it.p, lang()) + "</small>", function () {
          var at = state.picked.indexOf(name);
          if (at > -1) state.picked.splice(at, 1); else state.picked.push(name);
          b.classList.toggle("on", at === -1);
          b.setAttribute("aria-pressed", at === -1 ? "true" : "false");
        });
        b.setAttribute("aria-pressed", "false");
      });
    });
    if (!menu.length) setTimeout(function () { if (state.step === step && window.SOFRA_MENU) controlsFor(step); }, 600);
    form.hidden = false; input.hidden = true; area.hidden = false;
    area.placeholder = t("chat.o.type");
  }

  function answer(value, display, skipped) {
    var step = state.step;
    if (step.auto === "name" && value) { state.remember = state.remember || {}; state.remember.name = value; }
    /* dates are always written out ("Sat, 25 Oct"), so a "Today" chip still sends the real date */
    var shown = skipped ? display : step.type === "date" ? prettyDate(value) : step.show ? step.show(display) : display;
    state.answers[step.key] = { value: value, text: skipped ? "" : shown.replace(/^[^\p{L}\p{N}]+/u, "") };   /* no leading emoji in the WhatsApp text */
    me(shown);
    clearControls();
    state.i++; ask();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var step = state.step; if (!step) return;
    var v;
    if (step.type === "multi") {
      var typed = area.value.trim();
      v = state.picked.concat(typed ? [typed] : []).join(", ");
      if (!v) { err.textContent = t("chat.err.required"); return; }
      return answer(v, v);
    }
    var field = step.type === "textarea" ? area : input;
    v = field.value.trim();
    if (!v) { if (step.required) { err.textContent = t("chat.err.required"); return; } return answer("", t("chat.skip"), true); }
    if (step.type === "date" && !step.past && v < dayOffset(0)) { err.textContent = t("chat.err.date"); return; }
    if (step.type === "number" && !(+v >= 1 && +v <= 50)) { err.textContent = t("chat.err.guests"); return; }
    answer(v, v);
  });
  area.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit")); }
  });

  function message() {
    var flow = FLOWS[state.flow], lines = [t(flow.intro), ""];
    flow.steps.forEach(function (s) {
      var a = state.answers[s.key];
      if (a && a.text) lines.push(t(s.label) + ": " + a.text);
    });
    return lines.join("\n");
  }

  function finish() {
    var msg = message();
    var url = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg);
    say([esc(t("chat.summary")), '<div class="wa-summary">' + esc(msg).replace(/\n/g, "<br>") + "</div>"], function () {
      clearControls();
      var a = document.createElement("a");
      a.className = "wa-go"; a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = WA_ICON + "<span>" + esc(t("chat.wa")) + "</span>";
      chips.appendChild(a);
      chip(esc(t("chat.restart")), restart, "ghost");
      a.focus({ preventScroll: true });
    });
  }

  /* ---------- open / close ---------- */
  function restart() {
    state.token++; log.innerHTML = ""; clearControls();
    addRow("day", "<span>" + esc(t("chat.today")) + "</span>");
    say([esc(t("chat.hello")), esc(t("chat.ask"))], mainMenu);
  }
  function setOpen(on) {
    panel.hidden = !on;
    root.classList.toggle("is-open", on);
    fab.setAttribute("aria-expanded", on ? "true" : "false");
    if (on) {
      hideTeaser(); store("sofraChatSeen", "1"); $(".wa-badge").hidden = true;
      if (!log.children.length) restart();
      if (window.SofraFX && window.SofraFX.lock && matchMedia("(max-width: 520px)").matches) window.SofraFX.lock(true);
    } else {
      if (window.SofraFX && window.SofraFX.lock) window.SofraFX.lock(false);
      fab.focus({ preventScroll: true });
    }
  }
  fab.addEventListener("click", function () { setOpen(panel.hidden); });
  $(".wa-x").addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) setOpen(false); });

  function hideTeaser() { teaser.hidden = true; }
  teaser.querySelector("p").addEventListener("click", function () { setOpen(true); });
  $(".wa-teaser-x").addEventListener("click", function () { hideTeaser(); store("sofraChatSeen", "1"); });
  if (store("sofraChatSeen")) $(".wa-badge").hidden = true;
  else setTimeout(function () { if (panel.hidden && !store("sofraChatSeen")) teaser.hidden = false; }, 6000);

  /* language: refresh labels; restart an open conversation in the new language */
  function onLang() { staticText(); if (log.children.length) { if (!panel.hidden) restart(); else { state.token++; log.innerHTML = ""; } } }
  document.addEventListener("sofra:lang", onLang);
  staticText();
  setInterval(staticText, 60000);
})();
