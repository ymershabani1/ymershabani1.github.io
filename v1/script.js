(function () {
  const body = document.body;
  const header = document.querySelector(".header");
  const overlay = document.getElementById("overlay");
  const sidebar = document.getElementById("sidebar");
  const closer = document.getElementById("closeSidebar");
  const tabs = document.querySelectorAll(".sidebar__tab");
  const openProductsBtn = document.getElementById("openProducts");
  const catalog = document.getElementById("katalog");
  const catalogGrid = document.getElementById("catalogGrid");
  const catalogTitle = document.getElementById("catalogTitle");
  const catalogEyebrow = document.getElementById("catalogEyebrow");
  const catalogDesc = document.getElementById("catalogDesc");
  const catalogBack = document.getElementById("catalogBack");
  const homeSections = Array.from(
    document.querySelectorAll("main > section:not(#katalog)")
  );

  const PDF = "/assets/catalogs/katalog-produkti.pdf";
  const imgs = [
    "/assets/img/feature-profiles.jpg",
    "/assets/img/feature-production.jpg",
    "/assets/img/tile-accessories.jpg",
    "/assets/img/tile-doors.jpg",
    "/assets/img/tile-security.jpg",
    "/assets/img/tile-shutters.jpg",
    "/assets/img/about-company.jpg",
    "/assets/img/hero-slide-3.jpg",
  ];

  const catalogData = {
    "profile-secco": {
      title: "Profile Secco",
      desc: "Profile çeliku për dyer, dritare dhe fasada.",
      products: [
        { name: "Secco SA15", info: "Trashësi 1.5mm, gjerësi 55mm, xham deri 32mm." },
        { name: "Secco Security SA20", info: "Gjerësi 60mm, trashësi 2mm — dyer e dritare të blinduara." },
        { name: "Secco OS2 65/75", info: "Seri me ndarje termike për hapje, rrëshqitje dhe palosje." },
        { name: "Secco EBE", info: "Seri me profile të mëdha deri në 12m gjerësi." },
      ],
    },
    "seria-sa": {
      title: "Seritë SA / OS2 / EBE / 4F",
      desc: "Seritë kryesore Secco për projekte ekskluzive.",
      products: [
        { name: "SA15 Opening", info: "Hapje, tilt & turn dhe pivot." },
        { name: "OS2 Thermal", info: "Performancë termike për fasada moderne." },
        { name: "4F Facades", info: "Sistem fasadash me ndarje termike." },
        { name: "EBE Large Span", info: "Figura me dimensione të mëdha." },
      ],
    },
    "zero-gravity": {
      title: "Sistemi ØG Zero Gravity",
      desc: "Lift & slide me levitation magnetike deri në 1000 kg.",
      products: [
        { name: "ØG Lift & Slide", info: "Rrëshqitje manuale për dyer të rënda." },
        { name: "ØG Portal Kit", info: "Kit i plotë për instalim premium." },
        { name: "ØG Guide Rail", info: "Udhëzues dhe aksesorë montimi." },
      ],
    },
    materiale: {
      title: "Materiale speciale",
      desc: "Bronz, cor-ten, çelik i galvanizuar dhe inox.",
      products: [
        { name: "Bronz", info: "Ngjyrë, lustër dhe rezistencë ndaj korrozionit." },
        { name: "Cor-Ten", info: "Çelik me shtresë natyrale mbrojtëse." },
        { name: "Inox", info: "Fortësi e lartë dhe përcjellshmëri e ulët termike." },
        { name: "Çelik i galvanizuar", info: "Mbrojtje me zink për dimensione të mëdha." },
      ],
    },
    menteshe: {
      title: "Tilt & turn / Menteshe",
      desc: "Mekanizma hapjeje për dyer dhe dritare.",
      products: [
        { name: "Menteshe Tilt & Turn", info: "Për profile PVC, alumini dhe dru." },
        { name: "Menteshe e fshehur", info: "Dizajn minimal për dyer moderne." },
        { name: "Menteshe industriale", info: "Kapacitet i lartë ngarkese." },
      ],
    },
    brave: {
      title: "Bravë & cilindra",
      desc: "Sisteme mbylljeje për dyer residenciale dhe industriale.",
      products: [
        { name: "Bravë shumëpike", info: "Siguri e lartë për dyer hyrëse." },
        { name: "Cilindër evropian", info: "Kompatibil me shumicën e profileve." },
        { name: "Bravë emergjence", info: "Për dyer kundër zjarrit dhe dalje." },
      ],
    },
    doreza: {
      title: "Doreza",
      desc: "Doreza hapjeje dhe rrëshqitjeje.",
      products: [
        { name: "Dorezë hapjeje", info: "Për dyer e dritare standarde." },
        { name: "Dorezë rrëshqitëse", info: "Për sisteme sliding." },
        { name: "Dorezë dizajn", info: "Finishes të ndryshme ngjyrash." },
      ],
    },
    skuadreta: {
      title: "Skuadreta",
      desc: "Skuadreta për montim profilesh.",
      products: [
        { name: "Skuadër alumini", info: "Për qoshe dyerësh e dritaresh." },
        { name: "Skuadër PVC", info: "Për profile plastike." },
      ],
    },
    rula: {
      title: "Rula dyersh rrëshqitëse",
      desc: "Rula dhe karroca për dyer sliding.",
      products: [
        { name: "Rulë 80kg", info: "Për dyer të lehta." },
        { name: "Rulë 120kg", info: "Për dyer të rënda." },
        { name: "Rulë silent", info: "Funksionim i qetë." },
      ],
    },
    "aksesore-plastik": {
      title: "Aksesorë plastikë",
      desc: "Pjesë plastike për montim dhe mbyllje.",
      products: [
        { name: "Kapak profile", info: "Mbyllje estetike." },
        { name: "Distancatorë", info: "Për montim të saktë." },
      ],
    },
    "aksesore-xhami": {
      title: "Aksesorë xhami",
      desc: "Aksesorë për dyer dhe ndarës me xham.",
      products: [
        { name: "Klema xhami", info: "Për xham 8–10mm." },
        { name: "Nyje rrotulluese", info: "Për dyer xhami." },
      ],
    },
    "sisteme-siegenia": {
      title: "Sisteme Siegenia / AGB",
      desc: "Favorite, Titan, PSK, HS Alu, Axxent, Eco Pass.",
      products: [
        { name: "Favorite System", info: "Zgjidhje universale për dru, PVC dhe alumini." },
        { name: "Titan System", info: "Komfort dhe siguri e lartë." },
        { name: "PSK Comfort", info: "Për profile deri 200 kg." },
        { name: "HS Alu / Axxent", info: "Dizajn modern për hapësira të mëdha." },
      ],
    },
    epdm: {
      title: "Guarnicione EPDM",
      desc: "Guarnicione EPDM dhe PVC për dyer e dritare.",
      products: [
        { name: "EPDM standard", info: "Për profile standarde." },
        { name: "EPDM special", info: "Sipas seksionit të profilit." },
      ],
    },
    "dyer-industriale": {
      title: "Dyer industriale",
      desc: "Dyer palosëse dhe seksionale.",
      products: [
        { name: "Dyer me palosje", info: "Deri 11500 × 7000 mm." },
        { name: "Dyer seksionale", info: "Me ose pa portë këmbësore." },
        { name: "Rampa ngarkimi", info: "6000–9000 kg." },
      ],
    },
    "dyer-garazhi": {
      title: "Dyer garazhi",
      desc: "Dyer residenciale me ose pa motor.",
      products: [
        { name: "Garazh seksional", info: "Deri 7000 × 6000 mm." },
        { name: "Garazh me motor", info: "600N / 800N / 1200N." },
      ],
    },
    "dyer-zjarri": {
      title: "Dyer kundër zjarrit",
      desc: "EI 30–120 min, çelik ose xham.",
      products: [
        { name: "Fire Door EI60", info: "Një ose dy kanate." },
        { name: "Fire Door Glass", info: "Me panel shikimi." },
      ],
    },
    "dyer-shpejta": {
      title: "Dyer të shpejta",
      desc: "Hapje 2–3 sekonda për depo dhe wash.",
      products: [
        { name: "High Speed Door", info: "Ngjyra dhe dimensione të ndryshme." },
      ],
    },
    "dyer-hermetike": {
      title: "Dyer hermetike",
      desc: "Për izolim akustik, termik dhe higjienik.",
      products: [
        { name: "Hermetic Sliding", info: "Kapacitet deri 250 kg." },
        { name: "Hermetic Swing", info: "Me ose pa vision panel." },
      ],
    },
    "dyer-automatike": {
      title: "Dyer automatike",
      desc: "Rrëshqitëse, swing, revolving.",
      products: [
        { name: "Automatic Sliding", info: "Deri 140+140 kg." },
        { name: "Swing Automatic", info: "Këndi max 100°." },
        { name: "Revolving Door", info: "Për hyrje me trafik të lartë." },
      ],
    },
    barriera: {
      title: "Barriera & pistona",
      desc: "Barriera automatike dhe anti-terror.",
      products: [
        { name: "Barrierë 3–6.25m", info: "Hapje 2–6 sekonda." },
        { name: "Bollard automatik", info: "Hapje/mbyllje 5–9 sekonda." },
      ],
    },
    parkimi: {
      title: "Parkimi automatik",
      desc: "Sisteme me biletë dhe abonim.",
      products: [
        { name: "Parking Kit", info: "Kolonë hyrjeje, LED, biletë barcode." },
        { name: "Payment Column", info: "Pagesë automatike ose me operator." },
      ],
    },
    "akses-kontrolli": {
      title: "Akses kontrolli",
      desc: "Pin, kartë, fingerprint dhe app.",
      products: [
        { name: "Access Control Home", info: "Për shtëpi dhe zyra." },
        { name: "Time Attendance", info: "Matës orësh pune." },
      ],
    },
    nuki: {
      title: "Bravë hoteli / Nuki",
      desc: "Kontroll inteligjent i dyerve.",
      products: [
        { name: "Hotel Card Lock", info: "Kartë MF + çelës emergjence." },
        { name: "Nuki Smart Lock", info: "Bluetooth, app dhe telekomandë." },
      ],
    },
    persiane: {
      title: "Grila Persiane",
      desc: "Rrëshqitje, palosje, pa kasë dhe të blinduara.",
      products: [
        { name: "Persiane klasike", info: "Intimitet dhe izolim." },
        { name: "Persiane rrëshqitëse", info: "Deri 3×4 m." },
        { name: "Persiane të blinduara", info: "Profile çeliku të galvanizuar." },
      ],
    },
    luxor: {
      title: "Roleta Luxor",
      desc: "Roleta moderne me ose pa motor.",
      products: [
        { name: "Luxor Manual", info: "Për arkitekturë moderne." },
        { name: "Luxor Motorized", info: "Automatizim i plotë." },
      ],
    },
    tenda: {
      title: "Tenda (Awning)",
      desc: "Tenda industriale dhe residenciale.",
      products: [
        { name: "Tenda alumini", info: "Dimensione dhe konfigurime të ndryshme." },
        { name: "Tenda me motor", info: "Kontroll automatik." },
      ],
    },
    "ndares-rreshqites": {
      title: "Ndarës rrëshqitës",
      desc: "Sisteme ndarëse me xham 8–10mm.",
      products: [
        { name: "Sliding Glass Partition", info: "Dizajn minimal italian." },
      ],
    },
    "ndares-hapje": {
      title: "Ndarës me hapje",
      desc: "Sisteme hapjeje për ambiente interior.",
      products: [
        { name: "Opening Partition", info: "Për dhoma gjumi, kuzhina, dollapë." },
      ],
    },
    hpl: {
      title: "Ndarës tualetesh HPL",
      desc: "Panele 4mm dhe 12mm, rezistente ndaj lagështirës.",
      products: [
        { name: "HPL Toilet Partition", info: "Ngjyra të ndryshme, përdorim i brendshëm/jashtëm." },
      ],
    },
    dushi: {
      title: "Kabina dushi",
      desc: "Aksesorë dhe profile për kabina.",
      products: [
        { name: "Shower Sliding", info: "Hapje ose rrëshqitje, raw/black." },
      ],
    },
    soudal: {
      title: "Silikon, ngjitës & shkumë",
      desc: "Produkte Soudal për ndërtim dhe industri.",
      products: [
        { name: "PU Foam", info: "Shkumë poliuretani." },
        { name: "Silicone Sealant", info: "Për dyer, dritare dhe fasada." },
        { name: "Construction Adhesive", info: "Ngjitës profesional." },
      ],
    },
    cnc: {
      title: "Punime CNC",
      desc: "Frezime dhe tornime me precizion.",
      products: [
        { name: "Frezim CNC", info: "Deri 2000 × 1000 × 800 mm." },
        { name: "Tornim CNC", info: "Φ300 × 1000." },
      ],
    },
    edm: {
      title: "EDM & retifikime",
      desc: "Elektroerozion dhe retifikime.",
      products: [
        { name: "EDM", info: "Punime me elektroerozion." },
        { name: "Retifikim", info: "Deri 500 × 1200 mm." },
      ],
    },
    metrologji: {
      title: "Sallë metrologjike",
      desc: "Kontroll cilësie sipas standardeve.",
      products: [
        { name: "Quality Control", info: "Matje dhe verifikim dimensional." },
      ],
    },
    stampim: {
      title: "Stampimi i metaleve",
      desc: "Stampim me precizion.",
      products: [
        { name: "Metal Stamping", info: "Presa 10–400 ton." },
      ],
    },
    injeksion: {
      title: "Injeksion & ekstruzion",
      desc: "Projektim stampash deri te prodhimi.",
      products: [
        { name: "Injection Mold", info: "Makineri 130–450 ton." },
        { name: "Extrusion", info: "40–400 ton." },
      ],
    },
    karpenteri: {
      title: "Karpenteria metalike",
      desc: "Porta, kangjella, fasada, kapanone.",
      products: [
        { name: "Steel Structures", info: "Projektim dhe prodhim." },
        { name: "Iron Gates", info: "Porta hekuri me ose pa motor." },
      ],
    },
    laser: {
      title: "Prerje me laser",
      desc: "Laser 6000W, 4000 × 2000 mm.",
      products: [
        { name: "Laser Cutting", info: "Spesor deri 25mm." },
        { name: "Bending", info: "Piegatrice deri 6000 mm." },
      ],
    },
    trajtime: {
      title: "Trajtime sipërfaqesh",
      desc: "Zink, nikel, krom, anodizim, lyerje.",
      products: [
        { name: "Zinc / Nickel / Chrome", info: "Veshje deri 6000 mm." },
        { name: "Anodizing", info: "Alumini me ngjyra të ndryshme." },
        { name: "Powder Coating", info: "Lyerje me pudër." },
      ],
    },
    montim: {
      title: "Montim & konsulencë",
      desc: "Shërbim në terren te klienti.",
      products: [
        { name: "On-site Assembly", info: "Montim profilesh dhe sistemesh." },
        { name: "Technical Consulting", info: "Për projekte industriale." },
      ],
    },
  };

  function openSidebar() {
    body.classList.add("sidebar-open");
    overlay.hidden = false;
    sidebar.setAttribute("aria-hidden", "false");
  }

  function closeSidebar() {
    body.classList.remove("sidebar-open");
    overlay.hidden = true;
    sidebar.setAttribute("aria-hidden", "true");
  }

  function showHome() {
    if (catalog) catalog.hidden = true;
    homeSections.forEach(function (section) {
      section.hidden = false;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    onScroll();
  }

  function openCategoryPage(catId) {
    if (!catId) return;
    window.location.href = "/v1/kategoria#" + encodeURIComponent(catId);
  }

  function showCatalog(catId) {
    openCategoryPage(catId);
  }

  if (openProductsBtn) openProductsBtn.addEventListener("click", openSidebar);

  document.querySelectorAll(".js-open-products").forEach(function (btn) {
    btn.addEventListener("click", openSidebar);
  });

  document.querySelectorAll(".cat-link").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!btn.dataset.cat) return;
      openCategoryPage(btn.dataset.cat);
    });
  });

  if (catalogBack) catalogBack.addEventListener("click", showHome);

  if (closer) closer.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
      });
      tab.classList.add("is-active");

      document.querySelectorAll(".sidebar__panel").forEach(function (panel) {
        panel.classList.remove("is-active");
      });

      const panel = document.getElementById("panel-" + tab.dataset.panel);
      if (panel) panel.classList.add("is-active");
    });
  });

  function onScroll() {
    if (!header) return;
    const forceSolid = catalog && !catalog.hidden;
    header.classList.toggle("is-solid", forceSolid || window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const slider = document.getElementById("heroSlider");
  if (slider) {
    const slides = Array.from(slider.querySelectorAll(".hero__slide"));
    const dotsWrap = document.getElementById("heroDots");
    const prevBtn = slider.querySelector(".hero-slider__btn--prev");
    const nextBtn = slider.querySelector(".hero-slider__btn--next");
    let index = 0;
    let timer;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-slider__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Shfaq slide " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll(".hero-slider__dot"));

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        slide.classList.toggle("is-active", n === index);
      });
      dots.forEach(function (dot, n) {
        dot.classList.toggle("is-active", n === index);
      });
      restart();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    slider.addEventListener("mouseenter", function () {
      clearInterval(timer);
    });
    slider.addEventListener("mouseleave", restart);

    restart();
  }

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (note) note.hidden = false;
      form.reset();
    });
  }

  document.querySelector(".logo")?.addEventListener("click", function (e) {
    if (catalog && !catalog.hidden) {
      e.preventDefault();
      showHome();
    }
  });

  const langSwitch = document.getElementById("langSwitch");
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");

  if (langSwitch && langBtn && langMenu) {
    function closeLang() {
      langMenu.hidden = true;
      langBtn.setAttribute("aria-expanded", "false");
    }

    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const open = langMenu.hidden;
      langMenu.hidden = !open;
      langBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    langMenu.querySelectorAll(".lang-option").forEach(function (option) {
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        langMenu.querySelectorAll(".lang-option").forEach(function (o) {
          o.classList.remove("is-active");
        });
        option.classList.add("is-active");
        const flag = langBtn.querySelector(".lang-switch__flag");
        const code = langBtn.querySelector(".lang-switch__code");
        if (flag) flag.src = option.dataset.flag;
        if (code) code.textContent = option.dataset.label;
        closeLang();
      });
    });

    document.addEventListener("click", closeLang);
  }
})();
