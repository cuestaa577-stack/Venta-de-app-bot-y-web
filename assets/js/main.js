/* =========================================================
   Nexo Digital — Interacciones del sitio
   Creado: 2024
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- Header con sombra al hacer scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Año dinámico en el footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Selector de moneda (COP · CLP · USD) ---------- */
  // Tipos de cambio de referencia (base 1 USD). Actualizados: octubre 2026.
  var RATES = { USD: 1, COP: 3192.24, CLP: 985.36 };
  var CURRENCY_KEY = "nexo_currency";
  var currency = "USD";
  try { currency = localStorage.getItem(CURRENCY_KEY) || "USD"; } catch (e) {}
  if (!RATES[currency]) { currency = "USD"; }

  function formatMoney(usd, cur) {
    var value = usd * RATES[cur];
    var locale = cur === "COP" ? "es-CO" : cur === "CLP" ? "es-CL" : "en-US";
    var formatted;
    try {
      formatted = new Intl.NumberFormat(locale, {
        style: "currency", currency: cur,
        minimumFractionDigits: 0, maximumFractionDigits: 0
      }).format(value);
    } catch (e) {
      formatted = "$" + Math.round(value).toLocaleString(locale);
    }
    return formatted + " " + cur;
  }

  function renderPrices() {
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var usd = parseFloat(el.getAttribute("data-price"));
      if (isNaN(usd)) return;
      var prefix = el.getAttribute("data-prefix");
      var oldAttr = el.getAttribute("data-old");
      var html = (prefix ? prefix + " " : "") + formatMoney(usd, currency);
      if (oldAttr) { html += " <s>" + formatMoney(parseFloat(oldAttr), currency) + "</s>"; }
      el.innerHTML = html;
    });
    document.querySelectorAll(".cur-btn").forEach(function (b) {
      var isActive = b.getAttribute("data-currency") === currency;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  document.querySelectorAll(".cur-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currency = btn.getAttribute("data-currency");
      if (!RATES[currency]) { currency = "USD"; }
      try { localStorage.setItem(CURRENCY_KEY, currency); } catch (e) {}
      renderPrices();
    });
  });
  renderPrices();

  /* ---------- FAQ acordeón ---------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var ans = item.querySelector(".faq-a");
      var isOpen = item.classList.contains("open");
      // cerrar los demás
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        if (o !== item) {
          o.classList.remove("open");
          o.querySelector(".faq-a").style.maxHeight = null;
          o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        ans.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Filtros de catálogo ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        document.querySelectorAll("[data-cat]").forEach(function (card) {
          var show = cat === "all" || card.getAttribute("data-cat") === cat;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Animación al hacer scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Banner de cookies (consentimiento) ---------- */
  var banner = document.getElementById("cookieBanner");
  var KEY = "nexo_cookie_consent";
  if (banner) {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (!stored) { setTimeout(function () { banner.classList.add("show"); }, 900); }
    banner.querySelectorAll("[data-consent]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute("data-consent");
        try { localStorage.setItem(KEY, val); } catch (e) {}
        banner.classList.remove("show");
      });
    });
  }

  /* ---------- Formulario de contacto (demo, sin backend) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var alertBox = document.getElementById("formAlert");
      if (alertBox) {
        alertBox.classList.add("ok");
        alertBox.textContent = "¡Gracias! Hemos recibido tu mensaje. Te responderemos en menos de 24 h laborables.";
      }
      form.reset();
      if (alertBox) alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Newsletter ---------- */
  document.querySelectorAll(".newsletter-form").forEach(function (nf) {
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = nf.querySelector(".nl-msg");
      if (msg) { msg.textContent = "¡Suscripción confirmada! Revisa tu correo."; msg.style.color = "#10b981"; }
      nf.reset();
    });
  });
})();
