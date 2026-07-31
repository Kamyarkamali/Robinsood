import { useState, useCallback, useEffect } from "react";
import type { Lang, TourScope, TourStep } from "../types/type";
import { tourSteps } from "../components/tour/tourSteps";

interface UseTourModalProps {
  lang: Lang;
  theme: "dark" | "light";
  scope: TourScope;
  autoStart?: boolean;
  delay?: number;
}

export const useTourModal = ({
  scope,
  autoStart = true,
  delay = 500,
}: UseTourModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [hasSeen, setHasSeen] = useState(false);

  const getFilteredSteps = useCallback(() => {
    return tourSteps
      .filter((step) => step.scope === scope)
      .filter((step) => step.enabled !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [scope]);

  const startTour = useCallback(() => {
    const filtered = getFilteredSteps();
    if (filtered.length === 0) {
      console.warn(`[Tour] No steps found for scope "${scope}"`);
      return;
    }
    // @ts-ignore
    setSteps(filtered);
    setCurrentStep(0);
    setIsOpen(true);
  }, [getFilteredSteps, scope]);

  const closeTour = useCallback(() => {
    setIsOpen(false);
    const key = `tour_seen_${scope}`;
    localStorage.setItem(key, "true");
    setHasSeen(true);
  }, [scope]);

  // مرحله بعدی
  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeTour();
    }
  }, [currentStep, steps.length, closeTour]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const skipTour = useCallback(() => {
    closeTour();
  }, [closeTour]);

  useEffect(() => {
    const key = `tour_seen_${scope}`;
    const seen = localStorage.getItem(key) === "true";
    setHasSeen(seen);

    if (autoStart && !seen) {
      const timer = setTimeout(() => {
        startTour();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [scope, autoStart, delay, startTour]);

  return {
    isOpen,
    currentStep,
    totalSteps: steps.length,
    currentStepData: steps[currentStep] || null,
    hasSeen,
    startTour,
    closeTour,
    nextStep,
    prevStep,
    skipTour,
  };
};
