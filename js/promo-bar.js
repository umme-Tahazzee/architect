(function () {
  const bar = document.getElementById("scBar");
  const closeBtn = document.getElementById("scBarClose");

  if (!bar || !closeBtn) return;

  let reopenTimer = null;
  let hideTimer = null;

  const SHOW_DELAY = 1500;
  const REOPEN_DELAY = 2 * 60 * 60 * 1000;

  const show = () => {
    clearTimeout(hideTimer);

    bar.hidden = false;

    requestAnimationFrame(() => {
      bar.classList.add("is-open");
    });
  };

  const close = () => {
    bar.classList.remove("is-open");

    // Hide after animation
    hideTimer = setTimeout(() => {
      bar.hidden = true;

      // Show again after 2 seconds
      reopenTimer = setTimeout(show, REOPEN_DELAY);
    }, 350);
  };

  const onKey = (e) => {
    if (e.key === "Escape" && !bar.hidden) {
      close();
    }
  };

  // Initial appearance
  setTimeout(show, SHOW_DELAY);

  // Close button
  closeBtn.addEventListener("click", close);

  // Escape key
  document.addEventListener("keydown", onKey);

})();