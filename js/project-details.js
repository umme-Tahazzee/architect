/**
 * Renders html/project-details.html from window.PROJECTS using ?id=<key>
 * and drives the gallery (thumbnails, arrows, keyboard, swipe, lightbox).
 */
(function () {
  const ICONS = {
    currency: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18M3 12h18"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  };
  const DISCLAIMER_BASE = "All specifications are indicative. Final details subject to approval.";
  const pad = (n) => String(n).padStart(2, "0");
  const $ = (id) => document.getElementById(id);

  const params = new URLSearchParams(window.location.search);
  const project = window.PROJECTS[params.get("id")] || window.PROJECTS.residential;
  const IMAGES = project.images;

  /* ---------- Static content ---------- */
  document.title = `${project.pageTitle} | Architect Studio`;
  $("breadcrumbText").textContent = project.breadcrumb;
  $("projStatus").textContent = project.status;
  $("projCategory").textContent = project.category;
  $("projTitle").textContent = project.title;
  $("projSubtitle").textContent = project.subtitle;
  $("projAddress").textContent = project.address;
  $("projDisclaimer").textContent = `${DISCLAIMER_BASE} ${project.disclaimer}`;
  $("totalThumbNum").textContent = pad(IMAGES.length);

  $("projPills").innerHTML = project.pills
    .map((p) => `<span class="feat-pill"><svg viewBox="0 0 24 24">${ICONS[p.icon]}</svg>${p.label}</span>`)
    .join("");

  $("projSpecs").innerHTML = project.specs
    .map(([label, value]) => `<div class="spec-cell"><div class="spec-label">${label}</div><div class="spec-value">${value}</div></div>`)
    .join("");

  if (project.brochure) {
    const a = $("brochureBtn");
    a.href = project.brochure;
    a.hidden = false;
  }

  /* ---------- Gallery ---------- */
  const thumbCol = $("thumbCol");
  const dotStrip = $("dotStrip");
  const mainImg = $("mainImg");
  let activeIdx = 0;

  const setDot = (i, active) => {
    const d = dotStrip.children[i];
    d.style.width = active ? "24px" : "6px";
    d.style.background = active ? "var(--gold)" : "rgba(196,151,58,0.25)";
  };

  function updateCaption(i) {
    $("captionTitle").textContent = IMAGES[i].title;
    $("captionTag").textContent = IMAGES[i].tag;
    $("imgCounter").textContent = `${pad(i + 1)} / ${pad(IMAGES.length)}`;
    $("activeThumbNum").textContent = pad(i + 1);
  }

  IMAGES.forEach((img, i) => {
    const t = document.createElement("div");
    t.className = "thumb-item" + (i === 0 ? " active" : "");
    t.innerHTML = `<img src="${img.src}" alt="${img.tag}" loading="${i < 2 ? "eager" : "lazy"}" /><span class="thumb-num">${pad(i + 1)}</span>`;
    t.addEventListener("click", () => switchTo(i));
    thumbCol.appendChild(t);

    const d = document.createElement("div");
    d.className = "dot";
    d.addEventListener("click", () => switchTo(i));
    dotStrip.appendChild(d);
    setDot(i, i === 0);
  });

  mainImg.src = IMAGES[0].src;
  mainImg.alt = IMAGES[0].tag;
  updateCaption(0);

  function switchTo(idx) {
    thumbCol.children[activeIdx].classList.remove("active");
    setDot(activeIdx, false);
    activeIdx = idx;

    mainImg.classList.add("switching");
    setTimeout(() => {
      mainImg.src = IMAGES[idx].src;
      mainImg.alt = IMAGES[idx].tag;
      mainImg.classList.remove("switching");
    }, 200);
    updateCaption(idx);

    thumbCol.children[idx].classList.add("active");
    setDot(idx, true);
    thumbCol.children[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }

  const step = (d) => switchTo((activeIdx + d + IMAGES.length) % IMAGES.length);

  const updateThumbLayout = () => thumbCol.classList.toggle("horizontal", window.innerWidth <= 768);
  updateThumbLayout();
  window.addEventListener("resize", updateThumbLayout);

  $("imgPrev").addEventListener("click", () => step(-1));
  $("imgNext").addEventListener("click", () => step(1));

  /* ---------- Lightbox ---------- */
  const lightbox = $("lightbox");
  const closeLb = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };
  $("imgExpand").addEventListener("click", () => {
    $("lbImg").src = IMAGES[activeIdx].src;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
  $("lbClose").addEventListener("click", closeLb);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLb(); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeLb();
      return;
    }
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---------- Swipe ---------- */
  let touchStartX = 0;
  const pane = $("mainPane");
  pane.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  pane.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) step(diff > 0 ? 1 : -1);
  }, { passive: true });
})();
