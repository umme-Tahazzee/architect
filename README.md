# Grid Form Architects — Website

Static marketing site for an architecture & interior design studio (Dhaka, Bangladesh).
Plain HTML + CSS + vanilla JavaScript, styled with Tailwind (CDN) and AOS animations. No build step.

## Quick start

The site uses root-relative URLs (`/css/…`, `/js/…`, `/html/…`), so serve the repo root:

```bash
npx serve .            # or: python -m http.server 8000
```

Then open `http://localhost:3000` (or `:8000`).

## Project structure

```
.
├── index.html                 # Home page
├── html/
│   ├── about.html, team.html, privacy.html, blog.html, contact.html
│   ├── projects-updated.html  # Project listing + filters
│   ├── project-details.html   # ONE template for every project (?id=…)
│   └── navbar / footer / schedule / testimonial .html   # Shared partials
├── css/
│   ├── style.css              # Global styles (navbar, home, components)
│   └── project-details.css    # Project details page only
├── js/
│   ├── tailwind-config.js     # Single Tailwind theme (colours, fonts, animations)
│   ├── aos-init.js            # Shared scroll-animation setup
│   ├── main.js                # Partial loader, mobile menu, schedule modal, filters
│   ├── home.js                # Home hero slider & promo widget
│   ├── project-details.js     # Renders project page + gallery/lightbox
│   ├── validation.js, animation.js
│   └── data/projects.js       # Project content (single source of truth)
└── assests/                   # Images (folder name kept as-is, see Notes)
```

## How it works

- **Partials** — pages contain empty `<div id="navbar">`, `#footer`, `#schedule`, `#testimonial`;
  `main.js` fetches the matching file from `/html/` and injects it. Missing containers are skipped safely.
- **Project pages** — `project-details.html?id=commercial|interior|residential` is rendered from
  `js/data/projects.js`. Previously this was three near-identical 600-line pages.
- **Theme** — brand colours/fonts live only in `js/tailwind-config.js` (Tailwind) and CSS variables in the CSS files.

## Common tasks

| Task | Where |
|------|-------|
| Add / edit a project | `js/data/projects.js` — add an entry, link to `/html/project-details.html?id=<key>` |
| Change brand colours or fonts | `js/tailwind-config.js` |
| Edit navigation | `html/navbar.html` |
| Edit footer | `html/footer.html` |
| Contact form (EmailJS) | `html/contact.html` |

## Notes

- Tailwind is loaded from the CDN (`cdn.tailwindcss.com`), fine for development; for production consider a
  compiled build.
- The image folder is spelled `assests` (and subfolders `commerial`, `resendential`). Renaming them is
  recommended (`assets`, `commercial`, `residential`) but requires updating the paths in `js/data/projects.js`,
  `index.html` and `html/projects-updated.html`.
- Use lowercase file names — many hosts are case-sensitive.
