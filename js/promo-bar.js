
(function () {
  const bar = document.getElementById("scBar");
  const closeBtn = document.getElementById("scBarClose");

  if (!bar || !closeBtn) return;

  const SHOW_DELAY = 1500;
  const REOPEN_DELAY =  60 * 60 * 1000;

  const STORAGE_KEY = "scBarNextShow";

  let reopenTimer = null;
  let hideTimer = null;

  const show = () => {
    clearTimeout(hideTimer);

    bar.hidden = false;

    requestAnimationFrame(() => {
      bar.classList.add("is-open");
    });

    // Clear expired schedule
    localStorage.removeItem(STORAGE_KEY);
  };

  const close = () => {
    bar.classList.remove("is-open");

    // Save next appearance time (2 hours)
    const nextShowTime = Date.now() + REOPEN_DELAY;

    localStorage.setItem(
      STORAGE_KEY,
      String(nextShowTime)
    );

    clearTimeout(hideTimer);
    clearTimeout(reopenTimer);

    // Hide after animation
    hideTimer = setTimeout(() => {
      bar.hidden = true;

      // Reopen after 2 hours
      reopenTimer = setTimeout(() => {
        show();
      }, REOPEN_DELAY);

    }, 350);
  };

  const onKey = (e) => {
    if (e.key === "Escape" && !bar.hidden) {
      close();
    }
  };

  // Check previously saved schedule
  const nextShowTime = Number(
    localStorage.getItem(STORAGE_KEY)
  );

  if (nextShowTime && nextShowTime > Date.now()) {

    // Wait for remaining time
    bar.hidden = true;

    reopenTimer = setTimeout(() => {
      show();
    }, nextShowTime - Date.now());

  } else {

    // First appearance after 1.5 seconds
    localStorage.removeItem(STORAGE_KEY);

    setTimeout(show, SHOW_DELAY);
  }

  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", onKey);

})();
