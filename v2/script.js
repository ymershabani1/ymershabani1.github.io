(function () {
  const body = document.body;
  const overlay = document.getElementById("overlay");
  const sidebar = document.getElementById("sidebar");
  const closer = document.getElementById("closeSidebar");
  const tabs = document.querySelectorAll(".sidebar__tab");
  const openProductsBtn = document.getElementById("openProducts");
  const catalog = document.getElementById("katalog");
  const productPreview = document.getElementById("productPreview");
  const catalogTitle = document.getElementById("catalogTitle");
  const catalogDesc = document.getElementById("catalogDesc");
  const catalogBack = document.getElementById("catalogBack");
  const homeSections = Array.from(
    document.querySelectorAll("main > section:not(#katalog)")
  );

  const PDF = "/assets/catalogs/katalog-produkti.pdf";

  const companyImgs = [];
  for (let n = 1; n <= 47; n++) {
    companyImgs.push(
      "/assets/img/company/prod-" + String(n).padStart(2, "0") + ".jpg"
    );
  }
  const galleryImgs = [
    "/assets/img/company/gallery-01.jpg",
    "/assets/img/company/gallery-02.jpg",
    "/assets/img/company/gallery-03.jpg",
    "/assets/img/company/gallery-04.jpg",
    "/assets/img/company/gallery-05.jpg",
  ];

  let imgCursor = 0;
  function nextImg() {
    const src = companyImgs[imgCursor % companyImgs.length];
    imgCursor += 1;
    return src;
  }

  function withImgs(products) {
    return products.map(function (p) {
      return Object.assign({}, p, {
        img: p.img || nextImg(),
        specs: p.specs || [p.info],
      });
    });
  }

  const catalogData = {
    "profile-secco": {
      title: "Profile Secco",
      desc: "Profile çeliku për dyer, dritare dhe fasada.",
      products: withImgs([
        { name: "Secco SA15", info: "Trashësi 1.5mm, gjerësi 55mm, xham deri 32mm.", specs: ["Trashësi 1.5 mm", "Gjerësi 55 mm", "Xham deri 32 mm", "Për dyer e dritare"] },
        { name: "Secco Security SA20", info: "Gjerësi 60mm, trashësi 2mm — dyer e dritare të blinduara.", specs: ["Gjerësi 60 mm", "Trashësi 2 mm", "Nivel i lartë sigurie"] },
        { name: "Secco OS2 65/75", info: "Seri me ndarje termike për hapje, rrëshqitje dhe palosje.", specs: ["Ndarje termike", "Hapje / rrëshqitje / palosje"] },
        { name: "Secco EBE", info: "Seri me profile të mëdha deri në 12m gjerësi.", specs: ["Deri 12 m gjerësi", "Projekte me hapësira të mëdha"] },
      ]),
    },
    "seria-sa": {
      title: "Seritë SA / OS2 / EBE / 4F",
      desc: "Seritë kryesore Secco për projekte ekskluzive.",
      products: withImgs([
        { name: "SA15 Opening", info: "Hapje, tilt & turn dhe pivot.", specs: ["Hapje standarde", "Tilt & turn", "Pivot"] },
        { name: "OS2 Thermal", info: "Performancë termike për fasada moderne.", specs: ["Izolim termik", "Fasada moderne"] },
        { name: "4F Facades", info: "Sistem fasadash me ndarje termike.", specs: ["Sistem fasadash", "Ndarje termike"] },
        { name: "EBE Large Span", info: "Figura me dimensione të mëdha.", specs: ["Dimensionë të mëdha", "Aplikime speciale"] },
      ]),
    },
    "zero-gravity": {
      title: "Sistemi ØG Zero Gravity",
      desc: "Lift & slide me levitation magnetike deri në 1000 kg.",
      products: withImgs([
        { name: "ØG Lift & Slide", info: "Rrëshqitje manuale për dyer të rënda.", specs: ["Deri 1000 kg", "Rrëshqitje e lehtë", "Levitation magnetike"] },
        { name: "ØG Portal Kit", info: "Kit i plotë për instalim premium.", specs: ["Kit i plotë", "Instalim premium"] },
        { name: "ØG Guide Rail", info: "Udhëzues dhe aksesorë montimi.", specs: ["Udhëzues", "Aksesorë montimi"] },
      ]),
    },
    materiale: {
      title: "Materiale speciale",
      desc: "Bronz, cor-ten, çelik i galvanizuar dhe inox.",
      products: withImgs([
        { name: "Bronz", info: "Ngjyrë, lustër dhe rezistencë ndaj korrozionit.", specs: ["Estetikë premium", "Rezistencë korrozioni"] },
        { name: "Cor-Ten", info: "Çelik me shtresë natyrale mbrojtëse.", specs: ["Shtresë natyrale", "Për fasada"] },
        { name: "Inox", info: "Fortësi e lartë dhe përcjellshmëri e ulët termike.", specs: ["Fortësi e lartë", "Inox industrial"] },
        { name: "Çelik i galvanizuar", info: "Mbrojtje me zink për dimensione të mëdha.", specs: ["Veshje zinku", "Dimensione të mëdha"] },
      ]),
    },
    menteshe: {
      title: "Tilt & turn / Menteshe",
      desc: "Mekanizma hapjeje për dyer dhe dritare.",
      products: withImgs([
        { name: "Menteshe Tilt & Turn", info: "Për profile PVC, alumini dhe dru.", specs: ["PVC / alumini / dru", "Tilt & turn"] },
        { name: "Menteshe e fshehur", info: "Dizajn minimal për dyer moderne.", specs: ["E fshehur", "Dizajn minimal"] },
        { name: "Menteshe industriale", info: "Kapacitet i lartë ngarkese.", specs: ["Ngarkesë e lartë", "Përdorim industrial"] },
      ]),
    },
    brave: {
      title: "Bravë & cilindra",
      desc: "Sisteme mbylljeje për dyer residenciale dhe industriale.",
      products: withImgs([
        { name: "Bravë shumëpike", info: "Siguri e lartë për dyer hyrëse.", specs: ["Mbyllje shumëpike", "Siguri e lartë"] },
        { name: "Cilindër evropian", info: "Kompatibil me shumicën e profileve.", specs: ["Standard evropian", "Kompatibilitet i gjerë"] },
        { name: "Bravë emergjence", info: "Për dyer kundër zjarrit dhe dalje.", specs: ["Dalje emergjence", "Fire-rated"] },
      ]),
    },
    doreza: {
      title: "Doreza",
      desc: "Doreza hapjeje dhe rrëshqitjeje.",
      products: withImgs([
        { name: "Dorezë hapjeje", info: "Për dyer e dritare standarde.", specs: ["Hapje standarde", "Finishes të ndryshme"] },
        { name: "Dorezë rrëshqitëse", info: "Për sisteme sliding.", specs: ["Për sliding", "Ergonomi e mirë"] },
        { name: "Dorezë dizajn", info: "Finishes të ndryshme ngjyrash.", specs: ["Dizajn modern", "Ngjyra të shumta"] },
      ]),
    },
    skuadreta: {
      title: "Skuadreta",
      desc: "Skuadreta për montim profilesh.",
      products: withImgs([
        { name: "Skuadër alumini", info: "Për qoshe dyerësh e dritaresh.", specs: ["Alumini", "Qoshe të forta"] },
        { name: "Skuadër PVC", info: "Për profile plastike.", specs: ["PVC", "Montim i shpejtë"] },
      ]),
    },
    rula: {
      title: "Rula dyersh rrëshqitëse",
      desc: "Rula dhe karroca për dyer sliding.",
      products: withImgs([
        { name: "Rulë 80kg", info: "Për dyer të lehta.", specs: ["Kapacitet 80 kg", "Rrëshqitje e qetë"] },
        { name: "Rulë 120kg", info: "Për dyer të rënda.", specs: ["Kapacitet 120 kg", "Për dyer të rënda"] },
        { name: "Rulë silent", info: "Funksionim i qetë.", specs: ["Silent", "Veshje e gjatë"] },
      ]),
    },
    "aksesore-plastik": {
      title: "Aksesorë plastikë",
      desc: "Pjesë plastike për montim dhe mbyllje.",
      products: withImgs([
        { name: "Kapak profile", info: "Mbyllje estetike.", specs: ["Mbyllje estetike", "Ngjyra të ndryshme"] },
        { name: "Distancatorë", info: "Për montim të saktë.", specs: ["Montim i saktë", "Toleranca të vogla"] },
      ]),
    },
    "aksesore-xhami": {
      title: "Aksesorë xhami",
      desc: "Aksesorë për dyer dhe ndarës me xham.",
      products: withImgs([
        { name: "Klema xhami", info: "Për xham 8–10mm.", specs: ["Xham 8–10 mm", "Fiksim i sigurt"] },
        { name: "Nyje rrotulluese", info: "Për dyer xhami.", specs: ["Rrotullim", "Dyer xhami"] },
      ]),
    },
    "sisteme-siegenia": {
      title: "Sisteme Siegenia / AGB",
      desc: "Favorite, Titan, PSK, HS Alu, Axxent, Eco Pass.",
      products: withImgs([
        { name: "Favorite System", info: "Zgjidhje universale për dru, PVC dhe alumini.", specs: ["Dru / PVC / alumini", "Universale"] },
        { name: "Titan System", info: "Komfort dhe siguri e lartë.", specs: ["Komfort", "Siguri e lartë"] },
        { name: "PSK Comfort", info: "Për profile deri 200 kg.", specs: ["Deri 200 kg", "PSK"] },
        { name: "HS Alu / Axxent", info: "Dizajn modern për hapësira të mëdha.", specs: ["HS Alu", "Hapësira të mëdha"] },
      ]),
    },
    epdm: {
      title: "Guarnicione EPDM",
      desc: "Guarnicione EPDM dhe PVC për dyer e dritare.",
      products: withImgs([
        { name: "EPDM standard", info: "Për profile standarde.", specs: ["EPDM", "Profile standarde"] },
        { name: "EPDM special", info: "Sipas seksionit të profilit.", specs: ["Sipas seksionit", "Porosi speciale"] },
      ]),
    },
    "dyer-industriale": {
      title: "Dyer industriale",
      desc: "Dyer palosëse dhe seksionale.",
      products: withImgs([
        { name: "Dyer me palosje", info: "Deri 11500 × 7000 mm.", specs: ["Deri 11500 × 7000 mm", "Palosje industriale"] },
        { name: "Dyer seksionale", info: "Me ose pa portë këmbësore.", specs: ["Seksionale", "Portë këmbësore opsionale"] },
        { name: "Rampa ngarkimi", info: "6000–9000 kg.", specs: ["6000–9000 kg", "Ngarkim / shkarkim"] },
      ]),
    },
    "dyer-garazhi": {
      title: "Dyer garazhi",
      desc: "Dyer residenciale me ose pa motor.",
      products: withImgs([
        { name: "Garazh seksional", info: "Deri 7000 × 6000 mm.", specs: ["Deri 7000 × 6000 mm", "Residenciale"] },
        { name: "Garazh me motor", info: "600N / 800N / 1200N.", specs: ["600N / 800N / 1200N", "Automatizim"] },
      ]),
    },
    "dyer-zjarri": {
      title: "Dyer kundër zjarrit",
      desc: "EI 30–120 min, çelik ose xham.",
      products: withImgs([
        { name: "Fire Door EI60", info: "Një ose dy kanate.", specs: ["EI60", "1 ose 2 kanate"] },
        { name: "Fire Door Glass", info: "Me panel shikimi.", specs: ["Panel shikimi", "Çelik / xham"] },
      ]),
    },
    "dyer-shpejta": {
      title: "Dyer të shpejta",
      desc: "Hapje 2–3 sekonda për depo dhe wash.",
      products: withImgs([
        { name: "High Speed Door", info: "Ngjyra dhe dimensione të ndryshme.", specs: ["Hapje 2–3 sekonda", "Depo / wash"] },
      ]),
    },
    "dyer-hermetike": {
      title: "Dyer hermetike",
      desc: "Për izolim akustik, termik dhe higjienik.",
      products: withImgs([
        { name: "Hermetic Sliding", info: "Kapacitet deri 250 kg.", specs: ["Deri 250 kg", "Rrëshqitëse"] },
        { name: "Hermetic Swing", info: "Me ose pa vision panel.", specs: ["Swing", "Vision panel opsional"] },
      ]),
    },
    "dyer-automatike": {
      title: "Dyer automatike",
      desc: "Rrëshqitëse, swing, revolving.",
      products: withImgs([
        { name: "Automatic Sliding", info: "Deri 140+140 kg.", specs: ["Deri 140+140 kg", "Rrëshqitëse"] },
        { name: "Swing Automatic", info: "Këndi max 100°.", specs: ["Këndi max 100°", "Swing"] },
        { name: "Revolving Door", info: "Për hyrje me trafik të lartë.", specs: ["Revolving", "Trafik i lartë"] },
      ]),
    },
    barriera: {
      title: "Barriera & pistona",
      desc: "Barriera automatike dhe anti-terror.",
      products: withImgs([
        { name: "Barrierë 3–6.25m", info: "Hapje 2–6 sekonda.", specs: ["3–6.25 m", "Hapje 2–6 sekonda"] },
        { name: "Bollard automatik", info: "Hapje/mbyllje 5–9 sekonda.", specs: ["Anti-terror", "5–9 sekonda"] },
      ]),
    },
    parkimi: {
      title: "Parkimi automatik",
      desc: "Sisteme me biletë dhe abonim.",
      products: withImgs([
        { name: "Parking Kit", info: "Kolonë hyrjeje, LED, biletë barcode.", specs: ["Kolonë hyrjeje", "Biletë barcode", "LED"] },
        { name: "Payment Column", info: "Pagesë automatike ose me operator.", specs: ["Pagesë automatike", "Operator opsional"] },
      ]),
    },
    "akses-kontrolli": {
      title: "Akses kontrolli",
      desc: "Pin, kartë, fingerprint dhe app.",
      products: withImgs([
        { name: "Access Control Home", info: "Për shtëpi dhe zyra.", specs: ["Pin / kartë / app", "Shtëpi & zyra"] },
        { name: "Time Attendance", info: "Matës orësh pune.", specs: ["Fingerprint", "Orë pune"] },
      ]),
    },
    nuki: {
      title: "Bravë hoteli / Nuki",
      desc: "Kontroll inteligjent i dyerve.",
      products: withImgs([
        { name: "Hotel Card Lock", info: "Kartë MF + çelës emergjence.", specs: ["Kartë MF", "Çelës emergjence"] },
        { name: "Nuki Smart Lock", info: "Bluetooth, app dhe telekomandë.", specs: ["Bluetooth", "App", "Telekomandë"] },
      ]),
    },
    persiane: {
      title: "Grila Persiane",
      desc: "Rrëshqitje, palosje, pa kasë dhe të blinduara.",
      products: withImgs([
        { name: "Persiane klasike", info: "Intimitet dhe izolim.", specs: ["Intimitet", "Izolim"] },
        { name: "Persiane rrëshqitëse", info: "Deri 3×4 m.", specs: ["Deri 3×4 m", "Rrëshqitëse"] },
        { name: "Persiane të blinduara", info: "Profile çeliku të galvanizuar.", specs: ["Çelik galvanizuar", "Siguri"] },
      ]),
    },
    luxor: {
      title: "Roleta Luxor",
      desc: "Roleta moderne me ose pa motor.",
      products: withImgs([
        { name: "Luxor Manual", info: "Për arkitekturë moderne.", specs: ["Manuale", "Dizajn modern"] },
        { name: "Luxor Motorized", info: "Automatizim i plotë.", specs: ["Me motor", "Automatizim"] },
      ]),
    },
    tenda: {
      title: "Tenda (Awning)",
      desc: "Tenda industriale dhe residenciale.",
      products: withImgs([
        { name: "Tenda alumini", info: "Dimensione dhe konfigurime të ndryshme.", specs: ["Alumini", "Konfigurime të shumta"] },
        { name: "Tenda me motor", info: "Kontroll automatik.", specs: ["Me motor", "Kontroll automatik"] },
      ]),
    },
    "ndares-rreshqites": {
      title: "Ndarës rrëshqitës",
      desc: "Sisteme ndarëse me xham 8–10mm.",
      products: withImgs([
        { name: "Sliding Glass Partition", info: "Dizajn minimal italian.", specs: ["Xham 8–10 mm", "Dizajn minimal"] },
      ]),
    },
    "ndares-hapje": {
      title: "Ndarës me hapje",
      desc: "Sisteme hapjeje për ambiente interior.",
      products: withImgs([
        { name: "Opening Partition", info: "Për dhoma gjumi, kuzhina, dollapë.", specs: ["Interior", "Hapje"] },
      ]),
    },
    hpl: {
      title: "Ndarës tualetesh HPL",
      desc: "Panele 4mm dhe 12mm, rezistente ndaj lagështirës.",
      products: withImgs([
        { name: "HPL Toilet Partition", info: "Ngjyra të ndryshme, përdorim i brendshëm/jashtëm.", specs: ["4 mm / 12 mm", "Rezistente ndaj lagështirës"] },
      ]),
    },
    dushi: {
      title: "Kabina dushi",
      desc: "Aksesorë dhe profile për kabina.",
      products: withImgs([
        { name: "Shower Sliding", info: "Hapje ose rrëshqitje, raw/black.", specs: ["Hapje / rrëshqitje", "Raw / black"] },
      ]),
    },
    soudal: {
      title: "Silikon, ngjitës & shkumë",
      desc: "Produkte Soudal për ndërtim dhe industri.",
      products: withImgs([
        { name: "PU Foam", info: "Shkumë poliuretani.", specs: ["Shkumë PU", "Ndërtim"] },
        { name: "Silicone Sealant", info: "Për dyer, dritare dhe fasada.", specs: ["Silikon", "Dyer / dritare / fasada"] },
        { name: "Construction Adhesive", info: "Ngjitës profesional.", specs: ["Ngjitës profesional", "Industri"] },
      ]),
    },
    cnc: {
      title: "Punime CNC",
      desc: "Frezime dhe tornime me precizion.",
      products: withImgs([
        { name: "Frezim CNC", info: "Deri 2000 × 1000 × 800 mm.", specs: ["Deri 2000 × 1000 × 800 mm", "Precizion"] },
        { name: "Tornim CNC", info: "Φ300 × 1000.", specs: ["Φ300 × 1000", "Tornim"] },
      ]),
    },
    edm: {
      title: "EDM & retifikime",
      desc: "Elektroerozion dhe retifikime.",
      products: withImgs([
        { name: "EDM", info: "Punime me elektroerozion.", specs: ["Elektroerozion", "Precizion"] },
        { name: "Retifikim", info: "Deri 500 × 1200 mm.", specs: ["Deri 500 × 1200 mm", "Retifikim"] },
      ]),
    },
    metrologji: {
      title: "Sallë metrologjike",
      desc: "Kontroll cilësie sipas standardeve.",
      products: withImgs([
        { name: "Quality Control", info: "Matje dhe verifikim dimensional.", specs: ["Matje dimensionale", "Kontroll cilësie"] },
      ]),
    },
    stampim: {
      title: "Stampimi i metaleve",
      desc: "Stampim me precizion.",
      products: withImgs([
        { name: "Metal Stamping", info: "Presa 10–400 ton.", specs: ["Presa 10–400 ton", "Precizion"] },
      ]),
    },
    injeksion: {
      title: "Injeksion & ekstruzion",
      desc: "Projektim stampash deri te prodhimi.",
      products: withImgs([
        { name: "Injection Mold", info: "Makineri 130–450 ton.", specs: ["130–450 ton", "Injeksion"] },
        { name: "Extrusion", info: "40–400 ton.", specs: ["40–400 ton", "Ekstruzion"] },
      ]),
    },
    karpenteri: {
      title: "Karpenteria metalike",
      desc: "Porta, kangjella, fasada, kapanone.",
      products: withImgs([
        { name: "Steel Structures", info: "Projektim dhe prodhim.", specs: ["Projektim", "Prodhim"] },
        { name: "Iron Gates", info: "Porta hekuri me ose pa motor.", specs: ["Porta hekuri", "Me/pa motor"] },
      ]),
    },
    laser: {
      title: "Prerje me laser",
      desc: "Laser 6000W, 4000 × 2000 mm.",
      products: withImgs([
        { name: "Laser Cutting", info: "Spesor deri 25mm.", specs: ["6000W", "4000 × 2000 mm", "Spesor deri 25 mm"] },
        { name: "Bending", info: "Piegatrice deri 6000 mm.", specs: ["Deri 6000 mm", "Piegatrice"] },
      ]),
    },
    trajtime: {
      title: "Trajtime sipërfaqesh",
      desc: "Zink, nikel, krom, anodizim, lyerje.",
      products: withImgs([
        { name: "Zinc / Nickel / Chrome", info: "Veshje deri 6000 mm.", specs: ["Zink / nikel / krom", "Deri 6000 mm"] },
        { name: "Anodizing", info: "Alumini me ngjyra të ndryshme.", specs: ["Anodizim", "Ngjyra të ndryshme"] },
        { name: "Powder Coating", info: "Lyerje me pudër.", specs: ["Lyerje me pudër", "Qëndrueshmëri"] },
      ]),
    },
    montim: {
      title: "Montim & konsulencë",
      desc: "Shërbim në terren te klienti.",
      products: withImgs([
        { name: "On-site Assembly", info: "Montim profilesh dhe sistemesh.", specs: ["Në terren", "Montim profesional"] },
        { name: "Technical Consulting", info: "Për projekte industriale.", specs: ["Konsulencë", "Projekte industriale"] },
      ]),
    },
  };

  const spotlightItems = [
    {
      title: "Doreza alumini",
      desc: "Doreza hapjeje dhe rrëshqitjeje për dyer e dritare — finishes moderne dhe rezistente.",
      img: "/assets/img/company/prod-01.jpg",
      cat: "doreza",
    },
    {
      title: "Rula dyersh",
      desc: "Rula dhe karroca për dyer rrëshqitëse — nga 80 kg deri te modelet silent.",
      img: "/assets/img/company/prod-08.jpg",
      cat: "rula",
    },
    {
      title: "Skuadreta",
      desc: "Skuadreta alumini dhe PVC për qoshe të forta dhe montim të saktë profilesh.",
      img: "/assets/img/company/prod-15.jpg",
      cat: "skuadreta",
    },
    {
      title: "Bravë & cilindra",
      desc: "Sisteme mbylljeje shumëpike dhe cilindra evropianë për dyer hyrëse.",
      img: "/assets/img/company/prod-22.jpg",
      cat: "brave",
    },
    {
      title: "Hardware premium",
      desc: "Gama e gjerë aksesorësh industriale — nga menteshe te sisteme Siegenia / AGB.",
      img: "/assets/img/company/gallery-02.jpg",
      cat: "sisteme-siegenia",
    },
    {
      title: "Profile & sisteme",
      desc: "Profile Secco, seritë SA dhe fasada moderne për projekte residenciale e industriale.",
      img: "/assets/img/company/prod-30.jpg",
      cat: "profile-secco",
    },
    {
      title: "Produkte në dyqan",
      desc: "Pamje reale nga showroom dhe dyqanet K-AKS — mbi 4000 artikuj në stok.",
      img: galleryImgs[3],
      cat: "menteshe",
    },
  ];

  let currentPreview = { products: [], index: 0 };

  function openSidebar() {
    if (!sidebar) return;
    body.classList.add("sidebar-open");
    if (overlay) overlay.hidden = false;
    sidebar.setAttribute("aria-hidden", "false");
  }

  function closeSidebar() {
    body.classList.remove("sidebar-open");
    if (overlay) overlay.hidden = true;
    if (sidebar) sidebar.setAttribute("aria-hidden", "true");
  }

  function showHome() {
    if (catalog) catalog.hidden = true;
    homeSections.forEach(function (section) {
      section.hidden = false;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderPreview(index) {
    if (!productPreview || !currentPreview.products.length) return;
    const products = currentPreview.products;
    const i = ((index % products.length) + products.length) % products.length;
    currentPreview.index = i;
    const product = products[i];
    const fileName =
      product.name.toLowerCase().replace(/[^a-z0-9]+/gi, "-") + ".pdf";
    const specs = (product.specs || [product.info])
      .map(function (s) {
        return "<li>" + escapeHtml(s) + "</li>";
      })
      .join("");

    const thumbs = products
      .map(function (p, n) {
        return (
          '<button type="button" class="product-preview__thumb' +
          (n === i ? " is-active" : "") +
          '" data-index="' +
          n +
          '" aria-label="' +
          escapeHtml(p.name) +
          '">' +
          '<img src="' +
          p.img +
          '" alt="" />' +
          "</button>"
        );
      })
      .join("");

    productPreview.innerHTML =
      '<div class="product-preview__media">' +
      '<img src="' +
      product.img +
      '" alt="' +
      escapeHtml(product.name) +
      '" id="previewMainImg" />' +
      "</div>" +
      '<div class="product-preview__info">' +
      "<h3>" +
      escapeHtml(product.name) +
      "</h3>" +
      "<p>" +
      escapeHtml(product.info) +
      "</p>" +
      '<ul class="product-preview__specs">' +
      specs +
      "</ul>" +
      '<div class="product-preview__actions">' +
      '<a class="btn" href="' +
      PDF +
      '" download="' +
      fileName +
      '">Shkarko PDF</a>' +
      '<button class="btn btn--ghost-dark js-open-products" type="button">Ndrysho kategorinë</button>' +
      "</div>" +
      "</div>" +
      '<div class="product-preview__gallery" role="tablist" aria-label="Produkte të ngjashme">' +
      thumbs +
      "</div>";

    productPreview.querySelectorAll(".product-preview__thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        renderPreview(Number(thumb.dataset.index));
      });
    });

    productPreview.querySelectorAll(".js-open-products").forEach(function (btn) {
      btn.addEventListener("click", openSidebar);
    });
  }

  function openCategoryPage(catId) {
    if (!catId) return;
    window.location.href = "/v2/kategoria#" + encodeURIComponent(catId);
  }

  function showCatalog(catId) {
    openCategoryPage(catId);
  }

  function activateSidebarTab(panelId) {
    tabs.forEach(function (t) {
      t.classList.toggle("is-active", t.dataset.panel === panelId);
    });
    document.querySelectorAll(".sidebar__panel").forEach(function (panel) {
      panel.classList.toggle("is-active", panel.id === "panel-" + panelId);
    });
  }

  function openProdhim() {
    openSidebar();
    activateSidebarTab("prodhim");
  }

  if (openProductsBtn) openProductsBtn.addEventListener("click", openSidebar);

  document.querySelectorAll(".js-open-products").forEach(function (btn) {
    btn.addEventListener("click", openSidebar);
  });

  document.querySelectorAll(".js-open-prodhim").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (btn.classList.contains("cat-card") && btn.dataset.cat && btn.dataset.cat !== "cnc") {
        return;
      }
      if (btn.classList.contains("cat-card") && btn.dataset.cat === "cnc") {
        e.preventDefault();
        openProdhim();
        return;
      }
      openProdhim();
    });
  });

  document.querySelectorAll(".cat-link").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (!btn.dataset.cat) return;
      e.preventDefault();
      openCategoryPage(btn.dataset.cat);
    });
  });

  document.querySelectorAll(".cat-card[data-cat]").forEach(function (card) {
    card.addEventListener("click", function () {
      if (card.classList.contains("js-open-prodhim")) {
        openProdhim();
        return;
      }
      openCategoryPage(card.dataset.cat);
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
      activateSidebarTab(tab.dataset.panel);
    });
  });

  const navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      body.classList.toggle("nav-open");
    });
  }

  /* ——— Hero slider ——— */
  const slider = document.getElementById("heroSlider");
  if (slider) {
    const copySlides = Array.from(slider.querySelectorAll(".hero__copy-slide"));
    const mediaSlides = Array.from(slider.querySelectorAll(".hero__media-slide"));
    const dotsWrap = document.getElementById("heroDots");
    const prevBtn = slider.querySelector(".hero-slider__btn--prev");
    const nextBtn = slider.querySelector(".hero-slider__btn--next");
    const total = Math.max(copySlides.length, mediaSlides.length);
    let index = 0;
    let timer;

    if (dotsWrap && total > 0) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-slider__dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", "Shfaq slide " + (i + 1));
        dot.addEventListener("click", function () {
          goTo(i);
        });
        dotsWrap.appendChild(dot);
      }
    }

    const dots = dotsWrap
      ? Array.from(dotsWrap.querySelectorAll(".hero-slider__dot"))
      : [];

    function goTo(i) {
      if (!total) return;
      index = (i + total) % total;
      copySlides.forEach(function (slide, n) {
        slide.classList.toggle("is-active", n === index);
      });
      mediaSlides.forEach(function (slide, n) {
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

  /* ——— Featured spotlight carousel ——— */
  const spotlight = document.getElementById("productSpotlight");
  if (spotlight && spotlightItems.length) {
    const imgEl = document.getElementById("spotlightImg");
    const titleEl = document.getElementById("spotlightTitle");
    const descEl = document.getElementById("spotlightDesc");
    const ctaEl = document.getElementById("spotlightCta");
    const prevBtn = spotlight.querySelector(".spotlight__btn--prev");
    const nextBtn = spotlight.querySelector(".spotlight__btn--next");
    let index = 0;
    let autoTimer;

    function goTo(i) {
      index = (i + spotlightItems.length) % spotlightItems.length;
      const item = spotlightItems[index];
      if (imgEl) {
        imgEl.src = item.img;
        imgEl.alt = item.title;
      }
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      if (ctaEl) {
        ctaEl.dataset.cat = item.cat;
        ctaEl.href =
          "/v2/produkt#" + encodeURIComponent(item.cat) + "/0";
      }
      restartAuto();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function restartAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 5000);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
      });
    }

    spotlight.addEventListener("mouseenter", function () {
      clearInterval(autoTimer);
    });
    spotlight.addEventListener("mouseleave", restartAuto);

    goTo(0);
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
