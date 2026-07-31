import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./tour.css";

import { tourSteps, type TourScope, type TourStep } from "./tourSteps";
import type { Lang } from "../../types/type";

type Theme = "dark" | "light";

const DEFAULT_DEMO_VIDEO = "/tour/demo.mp4";
const DEFAULT_DEMO_POSTER = "/tour/demo-poster.jpg";

const buildDescriptionHTML = (step: TourStep, lang: Lang): string => {
  // @ts-ignore
  const media = step.media ?? {
    type: "video" as const,
    src: DEFAULT_DEMO_VIDEO,
    poster: DEFAULT_DEMO_POSTER,
  };
  let mediaHtml = "";

  if (media.type === "image") {
    mediaHtml = `
      <div class="tour-media">
        <img src="${media.src}" alt="${media.alt || ""}" loading="lazy" />
        <span class="tour-media-badge">📸 تصویر</span>
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="tour-media">
        <video 
          src="${media.src}" 
          ${media.poster ? `poster="${media.poster}"` : ""} 
          autoplay 
          muted 
          loop 
          playsinline
        ></video>
        <span class="tour-media-badge">🎬 ویدیو</span>
        <div class="tour-media-overlay">
          <span class="tour-media-play">▶</span>
        </div>
      </div>
    `;
  }

  return `
    ${mediaHtml}
    <div class="tour-body">
      <p class="tour-desc-text">${step.description[lang]}</p>
    </div>
  `;
};

export const createAppTour = (lang: Lang, theme: Theme, scope: TourScope) => {
  const isDark = theme === "dark";
  const isRtl = lang === "fa";

  const labels: Record<
    Lang,
    {
      next: string;
      prev: string;
      close: string;
      progressText: string;
    }
  > = {
    fa: {
      next: "بعدی",
      prev: "قبلی",
      close: "بستن",
      progressText: "{{current}} از {{total}}",
    },
    en: {
      next: "Next",
      prev: "Previous",
      close: "Close",
      progressText: "{{current}} of {{total}}",
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
        description: buildDescriptionHTML(step, lang),
        side: step.side ?? "bottom",
      },
    }));

  if (!steps.length) {
    console.warn(`[Tour] No steps found for scope "${scope}"`);
  }

  return driver({
    overlayColor: isDark ? "rgba(2,6,23,.85)" : "rgba(15,23,42,.55)",

    showProgress: true,
    progressText: labels[lang].progressText,

    showButtons: ["previous", "next", "close"],

    popoverClass: [
      "tour-popover",
      isDark ? "tour-dark" : "tour-light",
      isRtl ? "tour-rtl" : "tour-ltr",
    ].join(" "),

    onPopoverRender(popover) {
      // @ts-ignore
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

      if (nextBtn) nextBtn.textContent = labels[lang].next;
      if (prevBtn) prevBtn.textContent = labels[lang].prev;
      if (closeBtn) closeBtn.textContent = labels[lang].close;

      footer.classList.add("tour-footer-custom");
    },

    steps,
  });
};
