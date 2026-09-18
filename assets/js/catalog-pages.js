(function () {
  const body = document.body;
  const version = body.dataset.version || "v2";
  const base = "/" + version;
  const page = body.dataset.page;

  /* serve strips ?query on .html → clean URL redirects, so use hash:
     /v2/kategoria#doreza
     /v2/produkt#doreza/0
  */
  function parseRoute() {
    const hash = (window.location.hash || "").replace(/^#/, "").trim();
    const params = new URLSearchParams(window.location.search);
    if (hash) {
      const parts = hash.split("/");
      return {
        catId: decodeURIComponent(parts[0] || "").trim(),
        productIndex: parts[1] != null && parts[1] !== "" ? parts[1] : "0",
      };
    }
    return {
      catId: (params.get("cat") || "").trim(),
      productIndex: params.get("p") || "0",
    };
  }

  function categoryUrl(catId) {
    return base + "/kategoria#" + encodeURIComponent(catId);
  }

  function productUrl(catId, index) {
    return (
      base +
      "/produkt#" +
      encodeURIComponent(catId) +
      "/" +
      encodeURIComponent(String(index))
    );
  }

  const route = parseRoute();
  const catId = route.catId;
  const productIndex = route.productIndex;

  function qs(sel) {
    return document.querySelector(sel);
  }

  if (!window.KAKS || !window.KAKS_CATALOG) {
    console.error("K-AKS catalog data failed to load");
  }

  if (page === "category") {
    const cat =
      window.KAKS && catId ? window.KAKS.getCategory(catId) : null;
    const titleEl = qs("#catTitle");
    const descEl = qs("#catDesc");
    const gridEl = qs("#productGrid");
    const backEl = qs("#catBack");
    const countEl = qs("#catCount");

    if (backEl) {
      backEl.href = base + "/#produkte";
    }

    if (!cat) {
      if (titleEl) titleEl.textContent = "Kategoria nuk u gjet";
      if (descEl) {
        descEl.textContent = catId
          ? 'Nuk u gjet kategoria "' + catId + '". Hap strukturën e produkteve dhe zgjidh një kategori.'
          : "Hap strukturën e produkteve dhe zgjidh një kategori.";
      }
      if (gridEl) {
        gridEl.innerHTML =
          '<p class="product-empty">Provo p.sh. <a href="' +
          categoryUrl("doreza") +
          '">Doreza</a>, <a href="' +
          categoryUrl("profile-secco") +
          '">Profile Secco</a> ose <a href="' +
          base +
          '/">kthehu në kryefaqe</a>.</p>';
      }
      return;
    }

    document.title = "K-AKS | " + cat.title;
    if (titleEl) titleEl.textContent = cat.title;
    if (descEl) descEl.textContent = cat.desc;
    if (countEl) {
      countEl.textContent = cat.products.length + " produkte";
    }

    if (gridEl) {
      gridEl.innerHTML = cat.products
        .map(function (product, i) {
          return (
            '<a class="product-card" href="' +
            productUrl(catId, i) +
            '">' +
            '<div class="product-card__media">' +
            '<img src="' +
            product.img +
            '" alt="' +
            window.KAKS.escapeHtml(product.name) +
            '" loading="lazy" />' +
            "</div>" +
            '<div class="product-card__body">' +
            "<h3>" +
            window.KAKS.escapeHtml(product.name) +
            "</h3>" +
            "<p>" +
            window.KAKS.escapeHtml(product.info) +
            "</p>" +
            '<span class="product-card__cta">Shiko detajet →</span>' +
            "</div>" +
            "</a>"
          );
        })
        .join("");
    }
  }

  if (page === "product") {
    const data =
      window.KAKS && catId
        ? window.KAKS.getProduct(catId, productIndex || 0)
        : null;
    const mediaEl = qs("#productMedia");
    const titleEl = qs("#productTitle");
    const infoEl = qs("#productInfo");
    const specsEl = qs("#productSpecs");
    const pdfEl = qs("#productPdf");
    const backEl = qs("#productBack");
    const catLinkEl = qs("#productCatLink");
    const relatedEl = qs("#relatedGrid");
    const crumbCat = qs("#crumbCat");

    if (!data) {
      if (titleEl) titleEl.textContent = "Produkti nuk u gjet";
      if (infoEl) {
        infoEl.textContent = catId
          ? 'Nuk u gjet produkti për kategorinë "' + catId + '".'
          : "Ky produkt nuk ekziston ose kategoria është e gabuar.";
      }
      if (backEl) backEl.href = base + "/";
      return;
    }

    const { category, product, index } = data;
    document.title = "K-AKS | " + product.name;

    const catUrl = categoryUrl(catId);

    if (backEl) backEl.href = catUrl;
    if (catLinkEl) {
      catLinkEl.href = catUrl;
      catLinkEl.textContent = category.title;
    }
    if (crumbCat) {
      crumbCat.href = catUrl;
      crumbCat.textContent = category.title;
    }

    if (mediaEl) {
      mediaEl.innerHTML =
        '<img src="' +
        product.img +
        '" alt="' +
        window.KAKS.escapeHtml(product.name) +
        '" />';
    }
    if (titleEl) titleEl.textContent = product.name;
    if (infoEl) infoEl.textContent = product.info;
    if (specsEl) {
      specsEl.innerHTML = (product.specs || [product.info])
        .map(function (s) {
          return "<li>" + window.KAKS.escapeHtml(s) + "</li>";
        })
        .join("");
    }
    if (pdfEl) {
      pdfEl.href = window.KAKS_PDF;
      pdfEl.setAttribute("download", window.KAKS.pdfName(product.name));
    }

    if (relatedEl && category.products.length > 1) {
      relatedEl.innerHTML = category.products
        .map(function (p, i) {
          if (i === index) return "";
          return (
            '<a class="product-card product-card--compact" href="' +
            productUrl(catId, i) +
            '">' +
            '<div class="product-card__media">' +
            '<img src="' +
            p.img +
            '" alt="' +
            window.KAKS.escapeHtml(p.name) +
            '" loading="lazy" />' +
            "</div>" +
            '<div class="product-card__body">' +
            "<h3>" +
            window.KAKS.escapeHtml(p.name) +
            "</h3>" +
            "<p>" +
            window.KAKS.escapeHtml(p.info) +
            "</p>" +
            "</div>" +
            "</a>"
          );
        })
        .join("");
    }
  }

  const navToggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
  }

  const overlay = document.getElementById("overlay");
  const sidebar = document.getElementById("sidebar");
  const closer = document.getElementById("closeSidebar");
  const openProductsBtn = document.getElementById("openProducts");

  function openSidebar() {
    if (!sidebar) return;
    document.body.classList.add("sidebar-open");
    if (overlay) overlay.hidden = false;
    sidebar.setAttribute("aria-hidden", "false");
  }
  function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    if (overlay) overlay.hidden = true;
    if (sidebar) sidebar.setAttribute("aria-hidden", "true");
  }

  if (openProductsBtn) openProductsBtn.addEventListener("click", openSidebar);
  if (closer) closer.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  document.querySelectorAll(".cat-link[data-cat]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = categoryUrl(btn.dataset.cat);
    });
  });

  document.querySelectorAll(".js-open-products").forEach(function (btn) {
    btn.addEventListener("click", openSidebar);
  });

  window.addEventListener("hashchange", function () {
    window.location.reload();
  });
})();
