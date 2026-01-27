// Load Navbar
fetch('navbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

    // Navbar load হওয়ার পরেই button ধরো
    initMobileMenu();
  });

// Load Footer
fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

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


function toggleDropdown(dropdownId, iconId) {
  const dropdown = document.getElementById(dropdownId);
  const icon = document.getElementById(iconId);

  dropdown.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}


let activeFilters = {
  status: "all",
  type: "all",
  category: "all"
};

function setFilter(filterType, value) {
  activeFilters[filterType] = value;
  applyFilters();
}

function applyFilters() {
  const projects = document.querySelectorAll(".project-card");

  projects.forEach(project => {
    const status = project.dataset.status;
    const type = project.dataset.type;
    const category = project.dataset.category;

    const statusMatch =
      activeFilters.status === "all" || activeFilters.status === status;
    const typeMatch =
      activeFilters.type === "all" || activeFilters.type === type;
    const categoryMatch =
      activeFilters.category === "all" || activeFilters.category === category;

    if (statusMatch && typeMatch && categoryMatch) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}
