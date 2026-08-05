import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./tour.css";

import { tourSteps, type TourScope, type TourStep } from "./tourSteps";
import type { Lang } from "../../types/type";

type Theme = "dark" | "light";
type DriverInstance = ReturnType<typeof driver>;

type TourStepWithMascot = TourStep & { mascotSrc?: string };

const CHART4_SELECTOR = "#chart4";
const IN_VIEW_MARGIN = 90;
const SCROLL_SAFETY_TIMEOUT = 900;
const CONNECTOR_SVG_ID = "tour-connector-svg";
const MOBILE_HIDE_MASCOT_QUERY = "(max-width: 480px)";

const DEFAULT_MASCOT_SVG = `
<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" class="tour-mascot-svg">
  <ellipse cx="60" cy="140" rx="26" ry="6" fill="var(--tour-accent)" opacity="0.12"/>
  <line x1="60" y1="18" x2="52" y2="2" stroke="var(--tour-accent)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="51" cy="1" r="4" fill="var(--tour-accent)"/>
  <rect x="30" y="18" width="60" height="46" rx="20" fill="#eef0f5"/>
  <rect x="18" y="34" width="10" height="16" rx="5" fill="var(--tour-accent-light)"/>
  <rect x="92" y="34" width="10" height="16" rx="5" fill="var(--tour-accent-light)"/>
  <rect x="40" y="30" width="40" height="22" rx="11" fill="#1b1230"/>
  <circle cx="52" cy="41" r="4.2" fill="var(--tour-accent-light)"/>
  <circle cx="68" cy="41" r="4.2" fill="var(--tour-accent-light)"/>
  <path d="M54 47 Q60 51 66 47" stroke="var(--tour-accent-light)" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="26" y="66" width="68" height="52" rx="18" fill="#f4f5f9"/>
  <circle cx="60" cy="92" r="10" fill="none" stroke="var(--tour-accent)" stroke-width="2.5"/>
  <path d="M28 78 Q14 92 22 110" stroke="#dcdfe8" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M92 80 Q112 72 108 52" stroke="#dcdfe8" stroke-width="10" fill="none" stroke-linecap="round"/>
  <circle cx="108" cy="49" r="7" fill="var(--tour-accent)"/>
  <rect x="34" y="114" width="14" height="22" rx="7" fill="#dcdfe8"/>
  <rect x="72" y="114" width="14" height="22" rx="7" fill="#dcdfe8"/>
</svg>`;

const buildTitleHTML = (step: TourStep, lang: Lang): string =>
  `<span class="tour-header-title">${step.title[lang]}</span>`;

const buildDescriptionHTML = (step: TourStep, lang: Lang): string => `
  <div class="tour-body">
    <p class="tour-desc-text">${step.description[lang]}</p>
  </div>
`;

const LABELS: Record<Lang, { prev: string; next: string; finish: string }> = {
  fa: { prev: "قبلی", next: "بعدی", finish: "تمام" },
  en: { prev: "Previous", next: "Next", finish: "Got it" },
};

const getFilteredRawSteps = (scope: TourScope): TourStepWithMascot[] =>
  tourSteps
    .filter((step) => step.scope === scope)
    .filter((step) => step.enabled !== false)
    .filter((step) => {
      if (!step.element) return false;
      const element = document.querySelector(step.element);
      if (!element) {
        console.warn(`[Tour] Element not found: "${step.element}"`);
        return false;
      }
      return true;
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const isElementInViewport = (el: Element, margin = IN_VIEW_MARGIN): boolean => {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top >= margin &&
    rect.bottom <= vh - margin &&
    rect.left >= 0 &&
    rect.right <= vw
  );
};

const waitForScrollToSettle = (): Promise<void> =>
  new Promise((resolve) => {
    let lastY = window.scrollY;
    let stableFrames = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };

    const check = () => {
      if (done) return;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 0.5) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
      }
      lastY = y;
      if (stableFrames >= 4) {
        finish();
        return;
      }
      requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
    setTimeout(finish, SCROLL_SAFETY_TIMEOUT);
  });

const ensureConnectorSvg = (): SVGSVGElement => {
  let svg = document.getElementById(CONNECTOR_SVG_ID) as SVGSVGElement | null;
  if (svg) return svg;

  svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  ) as SVGSVGElement;
  svg.setAttribute("id", CONNECTOR_SVG_ID);
  svg.setAttribute("class", "tour-connector-svg");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("id", "tour-connector-path");
  path.setAttribute("class", "tour-connector-path");

  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("id", "tour-connector-dot");
  dot.setAttribute("r", "4.5");
  dot.setAttribute("class", "tour-connector-dot");

  svg.appendChild(path);
  svg.appendChild(dot);
  document.body.appendChild(svg);
  return svg;
};

const removeConnectorSvg = () => {
  document.getElementById(CONNECTOR_SVG_ID)?.remove();
};

const updateConnector = (
  targetEl: Element | null,
  mascotEl: HTMLElement | null,
): void => {
  const svg = document.getElementById(CONNECTOR_SVG_ID) as SVGSVGElement | null;

  if (
    window.matchMedia(MOBILE_HIDE_MASCOT_QUERY).matches ||
    !targetEl ||
    !mascotEl
  ) {
    svg?.classList.add("tour-connector-hidden");
    return;
  }

  const activeSvg = ensureConnectorSvg();
  activeSvg.classList.remove("tour-connector-hidden");

  const path = activeSvg.querySelector<SVGPathElement>("#tour-connector-path");
  const dot = activeSvg.querySelector<SVGCircleElement>("#tour-connector-dot");
  if (!path || !dot) return;

  const tRect = targetEl.getBoundingClientRect();
  const mRect = mascotEl.getBoundingClientRect();

  const startX = tRect.left + tRect.width * 0.18;
  const startY = tRect.bottom - 4;
  const endX = mRect.left + mRect.width * 0.32;
  const endY = mRect.top + mRect.height * 0.2;
  const midY = (startY + endY) / 2;

  path.setAttribute(
    "d",
    `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`,
  );
  dot.setAttribute("cx", String(startX));
  dot.setAttribute("cy", String(startY));
};

export const createAppTour = (
  lang: Lang,
  theme: Theme,
  scope: TourScope,
): DriverInstance | null => {
  const isDark = theme === "dark";
  const isRtl = lang === "fa";
  const labels = LABELS[lang];

  const rawSteps = getFilteredRawSteps(scope);
  if (!rawSteps.length) {
    console.warn(`[Tour] No steps found for scope "${scope}"`);
    return null;
  }

  const steps = rawSteps.map((step) => ({
    element: step.element,
    popover: {
      title: buildTitleHTML(step, lang),
      description: buildDescriptionHTML(step, lang),
      side: step.side ?? "bottom",
    },
  }));

  let tourInstance: DriverInstance | null = null;
  let currentTargetEl: Element | null = null;
  let currentMascotEl: HTMLElement | null = null;
  let rafId: number | null = null;

  const scheduleConnectorUpdate = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      updateConnector(currentTargetEl, currentMascotEl);
    });
  };

  window.addEventListener("scroll", scheduleConnectorUpdate, { passive: true });
  window.addEventListener("resize", scheduleConnectorUpdate);

  const dispatchChart4Tooltip = (show: boolean, delay = 0) => {
    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("tour-tooltip-control", {
          detail: {
            action: show ? "show" : "hide",
            elementId: CHART4_SELECTOR,
            ...(show
              ? {
                  data: {
                    equity: 1250.5,
                    balance: 1180.3,
                    equityOpen: 1200.0,
                    equityHigh: 1280.75,
                    equityLow: 1150.25,
                    equityClose: 1250.5,
                    time: "14:30",
                  },
                }
              : {}),
          },
        }),
      );
    }, delay);
  };

  const tour = driver({
    overlayColor: isDark ? "rgba(6, 6, 16, 0.88)" : "rgba(15, 23, 42, 0.7)",
    overlayOpacity: 0.82,
    animate: true,
    allowClose: true,

    showProgress: false,
    showButtons: ["previous", "next", "close"] as const,

    popoverClass: [
      "tour-popover",
      isDark ? "tour-dark" : "tour-light",
      isRtl ? "tour-rtl" : "tour-ltr",
    ].join(" "),

    stagePadding: 14,
    stageRadius: 16,
    // @ts-ignore
    scrollIntoViewOptions: false,

    onHighlightStarted: (element?: Element) => {
      if (!(element instanceof Element)) return;
      currentTargetEl = element;
      if (!isElementInViewport(element)) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    },

    onHighlighted: (element?: Element) => {
      if (!(element instanceof Element)) return;
      element.classList.add("tour-highlight");

      waitForScrollToSettle().then(() => {
        // @ts-ignore
        tourInstance?.refresh();
        scheduleConnectorUpdate();
      });

      const isChart4 = element.matches(CHART4_SELECTOR);
      dispatchChart4Tooltip(isChart4, isChart4 ? 400 : 0);
    },

    onDeselected: (element?: Element) => {
      if (element instanceof Element) {
        element.classList.remove("tour-highlight");
      }
    },

    onPopoverRender: (popover, opts) => {
      // @ts-ignore
      const wrapper = popover.wrapper;
      // @ts-ignore
      const footer = popover.footer;
      // @ts-ignore
      popover.nextButton?.focus();
      if (!wrapper || !footer) return;

      const current = (opts.state.activeIndex ?? 0) + 1;
      const total = opts.config.steps?.length ?? steps.length;
      const isLast = current === total;
      const isFirst = current === 1;
      // @ts-ignore

      const nextBtn = popover.nextButton;
      // @ts-ignore

      const prevBtn = popover.previousButton;
      // @ts-ignore

      const closeBtn = popover.closeButton;

      if (nextBtn) {
        nextBtn.textContent = isLast ? labels.finish : labels.next;
        nextBtn.setAttribute(
          "aria-label",
          isLast ? labels.finish : labels.next,
        );
      }
      if (prevBtn) {
        prevBtn.disabled = isFirst;
      }
      if (closeBtn) {
        closeBtn.classList.add("tour-btn-close");
        closeBtn.setAttribute("aria-label", lang === "fa" ? "رد شدن" : "Skip");
      }

      footer.innerHTML = `
        <div class="tour-footer">
          <button type="button" class="driver-popover-prev-btn tour-btn tour-btn-prev" ${isFirst ? "disabled" : ""} aria-label="${labels.prev}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span class="tour-step-counter">${current} ${lang === "fa" ? "از" : "of"} ${total}</span>
          <button type="button" class="driver-popover-next-btn tour-btn tour-btn-next">
            <span>${isLast ? labels.finish : labels.next}</span>
          </button>
        </div>
      `;

      const newPrevBtn = footer.querySelector<HTMLButtonElement>(
        ".driver-popover-prev-btn",
      );
      const newNextBtn = footer.querySelector<HTMLButtonElement>(
        ".driver-popover-next-btn",
      );

      if (newPrevBtn && prevBtn && !prevBtn.disabled) {
        newPrevBtn.addEventListener("click", (e: any) => {
          e.stopPropagation();
          prevBtn.click();
        });
      }
      if (newNextBtn && nextBtn) {
        newNextBtn.addEventListener("click", (e: any) => {
          e.stopPropagation();
          nextBtn.click();
        });
      }

      let mascot = wrapper.querySelector<HTMLElement>(".tour-mascot");
      if (!mascot) {
        mascot = document.createElement("div");
        mascot.className = "tour-mascot";
        wrapper.appendChild(mascot);
      }
      const customMascot = rawSteps[current - 1]?.mascotSrc;
      mascot.innerHTML = customMascot
        ? `<img src="${customMascot}" alt="" class="tour-mascot-img" />`
        : DEFAULT_MASCOT_SVG;
      currentMascotEl = mascot;

      requestAnimationFrame(() => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const overflowsRight = wrapperRect.right + 100 > window.innerWidth - 8;
        wrapper.classList.toggle("tour-mascot-flip", overflowsRight);
        scheduleConnectorUpdate();
      });
    },

    onDestroyed: () => {
      document
        .querySelectorAll(".tour-highlight")
        .forEach((el) => el.classList.remove("tour-highlight"));
      dispatchChart4Tooltip(false);
      window.removeEventListener("scroll", scheduleConnectorUpdate);
      window.removeEventListener("resize", scheduleConnectorUpdate);
      if (rafId !== null) cancelAnimationFrame(rafId);
      removeConnectorSvg();
    },

    steps,
  });

  tourInstance = tour;
  return tour;
};

export const startTour = (
  lang: Lang,
  theme: Theme,
  scope: TourScope,
): boolean => {
  try {
    const tour = createAppTour(lang, theme, scope);
    if (tour) {
      tour.drive();
      return true;
    }
    return false;
  } catch (error) {
    console.error("[Tour] Error starting tour:", error);
    return false;
  }
};

export const shouldShowTour = (scope: TourScope): boolean => {
  const key = `tour_shown_${scope}`;
  const hasBeenShown = localStorage.getItem(key) === "true";
  if (hasBeenShown) return false;

  return tourSteps.some((step) => {
    if (step.scope !== scope) return false;
    if (step.enabled === false) return false;
    if (!step.element) return false;
    return !!document.querySelector(step.element);
  });
};

export const markTourAsShown = (scope: TourScope): void => {
  localStorage.setItem(`tour_shown_${scope}`, "true");
};

export const resetTour = (scope: TourScope): void => {
  localStorage.removeItem(`tour_shown_${scope}`);
};
