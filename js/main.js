/* =========================
   LOAD COMPONENTS
========================= */
// Load Navbar
fetch('/html/navbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

  
    initMobileMenu();
    attachNavbarProjectHandlers();
  });

// Load Footer
fetch('/html/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

// Load Testimonial
fetch('/html/testimonial.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('testimonial').innerHTML = data;
  });

// Load Schedule & modal functionality
fetch('/html/schedule.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('schedule').innerHTML = html;

    const modal = document.getElementById('scheduleModal');
    const openBtn = document.getElementById('openScheduleModal');
    const closeBtn = document.getElementById('closeScheduleModal');

    function openModal() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  });

/* =========================
   NAVBAR PROJECTS FILTER HANDLER
========================= */
function attachNavbarProjectHandlers() {
  document.querySelectorAll('#navbar [data-status]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const status = link.dataset.status;

      // Store status to apply filter on project.html
      localStorage.setItem('selectedStatus', status);

      // Navigate to project page
      window.location.href = '/html/project.html';
    });
  });
}

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

/* =========================
   DROPDOWN TOGGLE
========================= */
function toggleDropdown(dropdownId, iconId) {
  // Close other dropdowns
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
      activeFilters.category === "all" || activeFilters.category === category;

    card.style.display = statusMatch && typeMatch && categoryMatch ? "block" : "none";
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

/* =========================
   APPLY NAVBAR FILTER ON PROJECT PAGE LOAD
========================= */
window.addEventListener('DOMContentLoaded', () => {
  const selectedStatus = localStorage.getItem('selectedStatus');
  if (selectedStatus) {
    filterProjects(selectedStatus);
    localStorage.removeItem('selectedStatus');
  }
});
