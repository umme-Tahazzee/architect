/**
 * Shared Tailwind (CDN) theme. Load AFTER the Tailwind CDN script.
 * Single source of truth for brand colours, fonts and animations.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        gold: "#B8860B",
        "gold-light": "#d4a017",
        cream: "#F5F5DC",
        dark: "#111",
        surface: "#1a1a1a",
        primary: "#1f2937",
        accent: "#c9a227",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        lora: ["Lora", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1.0)" }, "100%": { transform: "scale(1.1)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeOut: { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-14px)" },
        },
        progress: { "0%": { width: "0%" }, "100%": { width: "100%" } },
        scrollBob: {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(8px)" },
        },
        lineDrop: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "40%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "1" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom", opacity: "0" },
        },
      },
      animation: {
        kenburns: "kenburns 6000ms linear forwards",
        "fade-in": "fadeIn 1100ms ease forwards",
        "fade-out": "fadeOut 900ms ease forwards",
        "slide-up-1": "slideUp 0.55s ease 0.2s both",
        "slide-up-2": "slideUp 0.65s ease 0.42s both",
        "slide-up-3": "slideUp 0.6s ease 0.65s both",
        "slide-up-4": "slideUp 0.55s ease 0.88s both",
        "slide-out": "slideOut 0.4s ease both",
        progress: "progress 6000ms linear forwards",
        "scroll-bob": "scrollBob 2s ease-in-out infinite",
        "line-drop": "lineDrop 2s ease-in-out infinite",
      },
      transitionDuration: { 900: "900ms" },
    },
  },
};
