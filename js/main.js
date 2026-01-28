// Load Navbar
fetch('/html/navbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

    // Navbar load হওয়ার পরেই button ধরো
    initMobileMenu();
  });

// Load Footer
fetch('/html/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });


  fetch('/html/testimonial.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('testimonial').innerHTML = data;
  });

 fetch('/html/schedule.html') // adjust path if needed
    .then(res => res.text())
    .then(html => {
      document.getElementById('schedule').innerHTML = html;

      // After injecting HTML, attach modal event listeners
      function openModal() {
        const modal = document.getElementById('scheduleModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
      function closeModal() {
        const modal = document.getElementById('scheduleModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      document.getElementById('scheduleModal').addEventListener('click', (e) => {
        if (e.target.id === 'scheduleModal') closeModal();
      });

      // Bind button click
      document.querySelector('#schedule button[onclick="openModal()"]').onclick = openModal;
    });



/* =========================
   MOBILE MENU
========================= */
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;

  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle("hidden");
    menuBtn.innerText = isOpen ? "✕" : "☰";
  });
}

initMobileMenu();

/* =========================
   DROPDOWN TOGGLE
========================= */
function toggleDropdown(dropdownId, iconId) {
  // close other dropdowns
  document.querySelectorAll("ul[id$='Dropdown']").forEach((el) => {
    if (el.id !== dropdownId) el.classList.add("hidden");
  });

  document.querySelectorAll("i[id$='Icon']").forEach((icon) => {
    if (icon.id !== iconId) icon.classList.remove("rotate-180");
  });

  const dropdown = document.getElementById(dropdownId);
  const icon = document.getElementById(iconId);

  dropdown.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}

/* =========================
   FILTER STATE
========================= */
let activeFilters = {
  status: "all",
  type: "all",
  category: "exterior",
};

/* =========================
   STATUS FILTER
========================= */
function filterProjects(status) {
  activeFilters.status = status;
  applyFilters();
  closeAllDropdowns();
}

/* =========================
   TYPE & CATEGORY FILTER
========================= */
function setFilter(key, value) {
  activeFilters[key] = value;
  applyFilters();
  closeAllDropdowns();
}

/* =========================
   APPLY FILTER LOGIC
========================= */
function applyFilters() {
  const projects = document.querySelectorAll(".project-card");

  projects.forEach((card) => {
    const status = card.dataset.status;
    const type = card.dataset.type;
    const category = card.dataset.category;

    const statusMatch =
      activeFilters.status === "all" || activeFilters.status === status;
    const typeMatch =
      activeFilters.type === "all" || activeFilters.type === type;
    const categoryMatch =
      activeFilters.category === "all" ||
      activeFilters.category === category;

    if (statusMatch && typeMatch && categoryMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

/* =========================
   CLOSE DROPDOWNS
========================= */
function closeAllDropdowns() {
  document.querySelectorAll("ul[id$='Dropdown']").forEach((el) => {
    el.classList.add("hidden");
  });

  document.querySelectorAll("i[id$='Icon']").forEach((icon) => {
    icon.classList.remove("rotate-180");
  });
}

/* =========================
   CLOSE ON OUTSIDE CLICK
========================= */
document.addEventListener("click", (e) => {
  if (!e.target.closest("button")) {
    closeAllDropdowns();
  }
});





