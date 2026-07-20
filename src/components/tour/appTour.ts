import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { tourSteps, type TourScope } from "./tourSteps";
import type { Lang } from "../../types/type";

type Theme = "dark" | "light";

export const createAppTour = (lang: Lang, theme: Theme, scope: TourScope) => {
  const isDark = theme === "dark";

  const labels: Record<
    Lang,
    {
      next: string;
      prev: string;
      close: string;
    }
  > = {
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
    .filter((step) => step.scope === scope)
    .filter((step) => step.enabled !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((step) => ({
      element: step.element,
      popover: {
        title: step.title[lang],
        description: step.description[lang],
        side: step.side ?? "bottom",
      },
    }));

  if (!steps.length) {
    console.warn(`[Tour] No steps found for scope "${scope}"`);
  }

  return driver({
    overlayColor: isDark ? "rgba(2,6,23,.85)" : "rgba(255,255,255,.7)",

    showProgress: true,

    showButtons: ["previous", "next", "close"],

    popoverClass: isDark ? "tour-dark" : "tour-light",

    onPopoverRender(popover) {
      const footer = popover.footer;

      if (!footer) return;

      const nextBtn = footer.querySelector<HTMLButtonElement>(
        ".driver-popover-next-btn",
      );

      const prevBtn = footer.querySelector<HTMLButtonElement>(
        ".driver-popover-prev-btn",
      );

      const closeBtn = footer.querySelector<HTMLButtonElement>(
        ".driver-popover-close-btn",
      );

      if (nextBtn) {
        nextBtn.textContent = labels[lang].next;
      }

      if (prevBtn) {
        prevBtn.textContent = labels[lang].prev;
      }

      if (closeBtn) {
        closeBtn.textContent = labels[lang].close;
      }
    },
    // @ts-ignore
    steps,
  });
};
