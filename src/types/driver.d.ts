declare module "driver.js" {
  export interface DriverStep {
    element: string | HTMLElement;
    popover?: {
      title?: string | (() => string) | (() => HTMLElement);
      description?: string | (() => string) | (() => HTMLElement);
      side?: "top" | "bottom" | "left" | "right" | "over";
      align?: "start" | "center" | "end";
      offset?: number;
      renderTitle?: () => HTMLElement;
      renderDescription?: () => HTMLElement;
      renderButtons?: () => HTMLElement;
      showButtons?: ("next" | "previous" | "close")[];
    };
  }

  export interface DriverConfig {
    animate?: boolean;
    overlayColor?: string;
    overlayOpacity?: number;
    smoothScroll?: boolean;
    allowClose?: boolean;
    showProgress?: boolean;
    showButtons?: ("next" | "previous" | "close")[];
    progressText?: string;
    popoverClass?: string;
    popoverOffset?: number;
    stagePadding?: number;
    stageRadius?: number;
    onHighlightStarted?: (step: any) => void;
    onHighlightEnded?: (step: any) => void;
    onDeselected?: (step: any) => void;
    onDestroyed?: () => void;
    onStepChange?: (step: any) => void;
    onPopoverRender?: (popover: HTMLElement, step: any) => void;
    steps: DriverStep[];
  }

  export interface DriverInstance {
    drive: () => void;
    destroy: () => void;
    moveNext: () => void;
    movePrevious: () => void;
    setSteps: (steps: DriverStep[]) => void;
    getSteps: () => DriverStep[];
    getCurrentStep: () => any;
    isActive: () => boolean;
  }

  export function driver(config: DriverConfig): DriverInstance;
}
