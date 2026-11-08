/**
 * Home page hero slider and project sliders.
 */

      (function () {
        const SLIDE_DUR = 6000;
        const TRANS_DUR = 900;

        const hero = document.getElementById("hero");
        const slides = hero.querySelectorAll(".slide");
        const fill = document.getElementById("progressFill");
        const counterEl = document.getElementById("counterCurrent");
        const totalEl = document.getElementById("counterTotal");
        const dotsWrap = document.getElementById("heroDots");
        const prevBtn = document.getElementById("heroPrev");
        const nextBtn = document.getElementById("heroNext");

        const TOTAL = slides.length;
        let current = 0;
        let timer = null;
        let busy = false;
        let paused = false;

        /* ── Counter ── */
        totalEl.textContent = String(TOTAL).padStart(2, "0");

        /* ── Build dots ── */
        slides.forEach((_, i) => {
          const btn = document.createElement("button");
          btn.setAttribute("role", "tab");
          btn.setAttribute("aria-label", `Slide ${i + 1}`);
          btn.className = [
            "w-[6px] h-[6px] rounded-full border-0 p-0 cursor-pointer transition-all duration-300",
            i === 0 ? "bg-gold-light scale-125" : "bg-white/30 scale-100",
          ].join(" ");
          btn.addEventListener("click", () => goTo(i));
          dotsWrap.appendChild(btn);
        });

        const dots = dotsWrap.querySelectorAll("button");

        /* ── Animate text elements in/out ── */
        function animateIn(slide) {
          const els = [
            { el: slide.querySelector(".slide-eyebrow"), delay: "0.2s" },
            { el: slide.querySelector(".slide-title"), delay: "0.42s" },
            { el: slide.querySelector(".slide-sub"), delay: "0.65s" },
            { el: slide.querySelector(".slide-cta"), delay: "0.88s" },
          ];
          els.forEach(({ el, delay }) => {
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`;
            void el.offsetWidth;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
          // gold accent line
          const accent = slide.querySelector(".slide-accent");
          if (accent) accent.style.opacity = "1";
        }

        function animateOut(slide) {
          [
            ".slide-eyebrow",
            ".slide-title",
            ".slide-sub",
            ".slide-cta",
          ].forEach((sel) => {
            const el = slide.querySelector(sel);
            if (!el) return;
            el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            el.style.opacity = "0";
            el.style.transform = "translateY(-14px)";
          });
          const accent = slide.querySelector(".slide-accent");
          if (accent) accent.style.opacity = "0";
        }

        /* ── Progress bar ── */
        let progTimer = null;
        function resetProgress() {
          clearTimeout(progTimer);
          fill.style.transition = "none";
          fill.style.width = "0%";
          void fill.offsetWidth;
          if (!paused) {
            fill.style.transition = `width ${SLIDE_DUR}ms linear`;
            fill.style.width = "100%";
          }
        }

        /* ── Update dots & counter ── */
        function updateUI(idx) {
          dots.forEach((d, i) => {
            d.className = d.className
              .replace(/bg-gold-light|bg-white\/30|scale-125|scale-100/g, "")
              .trim();
            d.className +=
              i === idx ? " bg-gold-light scale-125" : " bg-white/30 scale-100";
          });
          counterEl.textContent = String(idx + 1).padStart(2, "0");
          resetProgress();
        }

        /* ── Ken Burns on active slide ── */
        function startKenBurns(slide) {
          const bg = slide.querySelector(".slide-bg");
          if (!bg) return;
          bg.style.transition = "none";
          bg.style.transform = "scale(1.0)";
          void bg.offsetWidth;
          bg.style.transition = `transform ${SLIDE_DUR}ms linear`;
          bg.style.transform = "scale(1.1)";
        }

        /* ── Navigate ── */
        function goTo(idx) {
          if (busy || idx === current) return;
          busy = true;

          const prev = current;
          current = ((idx % TOTAL) + TOTAL) % TOTAL;

          // Fade out prev
          const prevSlide = slides[prev];
          animateOut(prevSlide);
          prevSlide.style.transition = `opacity ${TRANS_DUR}ms ease`;
          prevSlide.style.opacity = "0";
          prevSlide.classList.add("pointer-events-none");

          // Fade in next
          const nextSlide = slides[current];
          nextSlide.style.opacity = "0";
          nextSlide.classList.remove("pointer-events-none");
          nextSlide.style.transition = `opacity ${TRANS_DUR}ms ease`;
          void nextSlide.offsetWidth;
          nextSlide.style.opacity = "1";

          startKenBurns(nextSlide);
          animateIn(nextSlide);
          updateUI(current);

          setTimeout(() => {
            prevSlide.style.opacity = "0";
            busy = false;
          }, TRANS_DUR);
        }

        /* ── Auto-play ── */
        function startAuto() {
          if (paused) return;
          clearInterval(timer);
          timer = setInterval(() => goTo(current + 1), SLIDE_DUR);
        }
        function stopAuto() {
          clearInterval(timer);
        }

        /* ── Pause on hover ── */
        hero.addEventListener("mouseenter", () => {
          paused = true;
          stopAuto();
          fill.style.transition = "none";
        });
        hero.addEventListener("mouseleave", () => {
          paused = false;
          startAuto();
          resetProgress();
        });

        /* ── Buttons ── */
        prevBtn.addEventListener("click", () => {
          stopAuto();
          goTo(current - 1);
          startAuto();
        });
        nextBtn.addEventListener("click", () => {
          stopAuto();
          goTo(current + 1);
          startAuto();
        });

        /* ── Keyboard ── */
        document.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") {
            stopAuto();
            goTo(current - 1);
            startAuto();
          }
          if (e.key === "ArrowRight") {
            stopAuto();
            goTo(current + 1);
            startAuto();
          }
        });

        /* ── Touch swipe ── */
        let touchX = 0;
        hero.addEventListener(
          "touchstart",
          (e) => {
            touchX = e.touches[0].clientX;
          },
          { passive: true },
        );
        hero.addEventListener("touchend", (e) => {
          const diff = e.changedTouches[0].clientX - touchX;
          if (Math.abs(diff) > 50) {
            stopAuto();
            diff < 0 ? goTo(current + 1) : goTo(current - 1);
            startAuto();
          }
        });

        /* ── Init first slide ── */
        slides[0].style.opacity = "1";
        slides[0].classList.remove("pointer-events-none");
        startKenBurns(slides[0]);
        animateIn(slides[0]);
        updateUI(0);
        startAuto();
      })();
    

      /* ══════════════════════════════════════
       HERO SLIDE DOTS SYNC
    ══════════════════════════════════════ */

      function initInfiniteSlider({ trackId, prevBtnId, nextBtnId, dotsId }) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsWrap = document.getElementById(dotsId);

        if (!track) return;

        const GAP = 20; // px — must match CSS gap
        const CARD_W = 248; // px — must match CSS width
        const STEP = CARD_W + GAP;
        const VISIBLE = Math.floor(track.parentElement.offsetWidth / STEP) || 3;

        // 1. Gather original cards
        const origCards = Array.from(track.children);
        const total = origCards.length;

        // 2. Clone: prepend last N, append first N  (N = total for safety)
        const clonesBefore = origCards.map((c) => c.cloneNode(true));
        const clonesAfter = origCards.map((c) => c.cloneNode(true));

        clonesBefore.reverse().forEach((c) => track.prepend(c));
        clonesAfter.forEach((c) => track.appendChild(c));

        // 3. Current index into ORIGINAL cards (0-based)
        let currentIdx = 0;

        // Translate so we land on real card 0
        function getTranslateForIndex(idx) {
          // total clones before = total originals
          return -((total + idx) * STEP);
        }

        // Instant jump (no animation)
        function jumpTo(idx) {
          track.style.transition = "none";
          track.style.transform = `translateX(${getTranslateForIndex(idx)}px)`;
        }

        // Animated slide
        function slideTo(idx) {
          track.style.transition =
            "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)";
          track.style.transform = `translateX(${getTranslateForIndex(idx)}px)`;
          updateDots(idx);
        }

        // Init position without animation
        jumpTo(0);

        // 4. Build progress dots
        origCards.forEach((_, i) => {
          const d = document.createElement("div");
          d.className = "prog-dot" + (i === 0 ? " active" : "");
          d.addEventListener("click", () => goTo(i));
          dotsWrap.appendChild(d);
        });

        function updateDots(idx) {
          dotsWrap.querySelectorAll(".prog-dot").forEach((d, i) => {
            d.classList.toggle("active", i === idx);
          });
        }

        function goTo(idx) {
          currentIdx = ((idx % total) + total) % total;
          slideTo(currentIdx);
        }

        // 5. After transition ends: if on a clone, silently jump back
        track.addEventListener("transitionend", () => {
          if (currentIdx === -1) {
            currentIdx = total - 1;
            jumpTo(currentIdx);
          } else if (currentIdx === total) {
            currentIdx = 0;
            jumpTo(currentIdx);
          }
        });

        // 6. Button handlers
        prevBtn.addEventListener("click", () => {
          if (currentIdx <= 0) {
            // Animate to clone of last
            track.style.transition =
              "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)";
            track.style.transform = `translateX(${getTranslateForIndex(-1)}px)`;
            currentIdx = -1;
            updateDots(total - 1);
          } else {
            goTo(currentIdx - 1);
          }
        });

        nextBtn.addEventListener("click", () => {
          if (currentIdx >= total - 1) {
            // Animate to clone of first
            track.style.transition =
              "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)";
            track.style.transform = `translateX(${getTranslateForIndex(total)}px)`;
            currentIdx = total;
            updateDots(0);
          } else {
            goTo(currentIdx + 1);
          }
        });

        // 7. Auto-play every 4s
        let autoPlay = setInterval(() => nextBtn.click(), 4000);
        track.parentElement.parentElement.addEventListener("mouseenter", () =>
          clearInterval(autoPlay),
        );
        track.parentElement.parentElement.addEventListener("mouseleave", () => {
          autoPlay = setInterval(() => nextBtn.click(), 4000);
        });

        // 8. Touch / drag support
        let startX = 0,
          isDragging = false;
        track.addEventListener("mousedown", (e) => {
          isDragging = true;
          startX = e.clientX;
        });
        track.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
        });
        track.addEventListener("mouseup", (e) => {
          if (!isDragging) return;
          isDragging = false;
          const diff = e.clientX - startX;
          if (Math.abs(diff) > 40) diff < 0 ? nextBtn.click() : prevBtn.click();
        });
        track.addEventListener(
          "touchstart",
          (e) => {
            startX = e.touches[0].clientX;
          },
          { passive: true },
        );
        track.addEventListener("touchend", (e) => {
          const diff = e.changedTouches[0].clientX - startX;
          if (Math.abs(diff) > 40) diff < 0 ? nextBtn.click() : prevBtn.click();
        });
      }

      // Init all three sliders
      initInfiniteSlider({
        trackId: "comTrack",
        prevBtnId: "comPrev",
        nextBtnId: "comNext",
        dotsId: "comDots",
      });

      initInfiniteSlider({
        trackId: "resTrack",
        prevBtnId: "resPrev",
        nextBtnId: "resNext",
        dotsId: "resDots",
      });

      initInfiniteSlider({
        trackId: "intTrack",
        prevBtnId: "intPrev",
        nextBtnId: "intNext",
        dotsId: "intDots",
      });
