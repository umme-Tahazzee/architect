
  AOS.init({
    duration: 800,
    once: true,
    easing: "ease-in-out",
  });


   const imageRow = document.getElementById("imageRow");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  const scrollAmount = 300;

  leftBtn.addEventListener("click", () => {
    imageRow.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  rightBtn.addEventListener("click", () => {
    imageRow.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });