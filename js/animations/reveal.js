
(function () {
  const DELAY_STEP = 100;

  document.querySelectorAll('[data-aos]').forEach((el) => {
    const dir = el.dataset.aos.replace('fade-', '');
    el.classList.add('reveal');
    if (dir === 'left' || dir === 'right') el.classList.add('reveal--' + dir);
    const delay = parseInt(el.dataset.aosDelay || '0', 10);
    if (delay) el.style.setProperty('--reveal-i', String(delay / DELAY_STEP * 1.1));
  });

  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el) => io.observe(el));
})();
