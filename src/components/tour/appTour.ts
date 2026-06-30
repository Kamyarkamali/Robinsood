import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import type { Lang } from "../../types/type";
import { tourSteps } from "./tourSteps";

type Theme = "dark" | "light";

export const createAppTour = (lang: Lang, theme: Theme) => {
  const isDark = theme === "dark";

  const labels = {
    fa: {
      next: "بعدی",
      prev: "قبلی",
      close: "بستن",
    },
    en: {
      next: "Next",
      prev: "Previous",
      close: "Close",
    },
  };

  const steps = tourSteps
    .filter((s) => s.enabled !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((step) => ({
      element: step.element,
      popover: {
        title: step.title[lang],
        description: step.description[lang],
        side: step.side ?? "bottom",
      },
    }));

  return driver({
    overlayColor: isDark ? "rgba(2, 6, 23, 0.85)" : "rgba(255, 255, 255, 0.7)",

    showProgress: true,
    showButtons: ["next", "previous", "close"],

    popoverClass: isDark ? "tour-dark" : "tour-light",

    onPopoverRender: (popover) => {
      const footer = popover.footer;
      if (!footer) return;

      const nextBtn = footer.querySelector(".driver-popover-next-btn");
      const prevBtn = footer.querySelector(".driver-popover-prev-btn");
      const closeBtn = footer.querySelector(".driver-popover-close-btn");

      if (nextBtn) nextBtn.textContent = labels[lang].next;
      if (prevBtn) prevBtn.textContent = labels[lang].prev;
      if (closeBtn) closeBtn.textContent = labels[lang].close;
    },

    steps,
  });
};
