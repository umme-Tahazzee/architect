/**
 * Shared site behaviour: loads HTML partials (navbar, footer, …),
 * mobile menu, schedule modal and the projects filter.
 */

const PROJECTS_PAGE = '/html/projects-updated.html';

/* =========================
   COMPONENT LOADER
   Injects /html/<name>.html into #<target> if that element exists on the page.
========================= */
async function loadComponent(target, path) {
  const el = document.getElementById(target);
  if (!el) return null;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    el.innerHTML = await res.text();
    return el;
  } catch (err) {
    console.error(`Failed to load ${path}:`, err);
    return null;
  }
}

loadComponent('navbar', '/html/navbar.html').then((el) => {
  if (!el) return;
  initMobileMenu();
  attachNavbarProjectHandlers();
});

loadComponent('footer', '/html/footer.html');
loadComponent('testimonial', '/html/testimonial.html');
loadComponent('schedule', '/html/schedule.html').then((el) => {
  if (el) initScheduleModal();
});

/* =========================
   SCHEDULE MODAL
========================= */
function initScheduleModal() {
  const modal = document.getElementById('scheduleModal');
  const openBtn = document.getElementById('openScheduleModal');
  const closeBtn = document.getElementById('closeScheduleModal');
  if (!modal || !openBtn || !closeBtn) return;

  const setOpen = (open) => {
    modal.classList.toggle('hidden', !open);
    modal.classList.toggle('flex', open);
  };

  openBtn.addEventListener('click', () => setOpen(true));
  closeBtn.addEventListener('click', () => setOpen(false));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) setOpen(false);
  });
}

/* =========================
   NAVBAR → PROJECTS FILTER
   Links with [data-status] jump to the projects page pre-filtered.
========================= */
function attachNavbarProjectHandlers() {
  document.querySelectorAll('#navbar [data-status]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('selectedStatus', link.dataset.status);
      window.location.href = PROJECTS_PAGE;
    });
  });
}

/* =========================
   MOBILE MENU
========================= */
function setMenuState(el, toggleEl, isOpen) {
  if (el) el.classList.toggle('open', isOpen);
  if (toggleEl) {
    toggleEl.classList.toggle('open', isOpen);
    toggleEl.setAttribute('aria-expanded', String(isOpen));
  }
}

function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const aboutToggle = document.getElementById('mobileAboutToggle');
  const aboutSub = document.getElementById('mobileAboutSub');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    setMenuState(mobileMenu, menuBtn, !mobileMenu.classList.contains('open'));
  });

  if (aboutToggle && aboutSub) {
    aboutToggle.addEventListener('click', () => {
      setMenuState(aboutSub, aboutToggle, !aboutSub.classList.contains('open'));
    });
  }

  // Close everything when clicking outside the navbar
  document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(e.target)) {
      setMenuState(mobileMenu, menuBtn, false);
      setMenuState(aboutSub, aboutToggle, false);
    }
  });
}

/* =========================
   PROJECT FILTERS (projects page)
========================= */
const activeFilters = { status: 'all', type: 'all', category: 'exterior' };

function filterProjects(status) {
  activeFilters.status = status;
  applyFilters();
}

function setFilter(key, value) {
  activeFilters[key] = value;
  applyFilters();
}

function applyFilters() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const { status, type, category } = card.dataset;
    const visible =
      (activeFilters.status === 'all' || activeFilters.status === status) &&
      (activeFilters.type === 'all' || activeFilters.type === type) &&
      (activeFilters.category === 'all' || activeFilters.category === category);
    card.style.display = visible ? 'block' : 'none';
  });
}

// Apply a filter chosen from the navbar on the previous page
window.addEventListener('DOMContentLoaded', () => {
  const selectedStatus = localStorage.getItem('selectedStatus');
  if (selectedStatus) {
    filterProjects(selectedStatus);
    localStorage.removeItem('selectedStatus');
  }
});
