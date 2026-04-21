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
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const aboutToggle = document.getElementById('mobileAboutToggle');
  const aboutSub    = document.getElementById('mobileAboutSub');

  if (!menuBtn || !mobileMenu) return;

  // Hamburger open/close
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // About sub-dropdown toggle
  if (aboutToggle && aboutSub) {
    aboutToggle.addEventListener('click', () => {
      const isOpen = aboutSub.classList.toggle('open');
      aboutToggle.classList.toggle('open', isOpen);
      aboutToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
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
}

/* =========================
   TYPE & CATEGORY FILTER
========================= */
function setFilter(key, value) {
  activeFilters[key] = value;
  applyFilters();
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


document.addEventListener('click', (e) => {
  // Close mobile menu when clicking outside navbar
  const navbar = document.querySelector('.navbar');
  if (navbar && !navbar.contains(e.target)) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn    = document.getElementById('menuBtn');
    const aboutSub   = document.getElementById('mobileAboutSub');
    const aboutToggle = document.getElementById('mobileAboutToggle');
    if (mobileMenu) { mobileMenu.classList.remove('open'); }
    if (menuBtn)    { menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    if (aboutSub)   { aboutSub.classList.remove('open'); }
    if (aboutToggle){ aboutToggle.classList.remove('open'); aboutToggle.setAttribute('aria-expanded', 'false'); }
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
