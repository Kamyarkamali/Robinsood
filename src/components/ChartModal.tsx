// ChartModal.tsx
import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Maximize, Minimize } from "lucide-react";
import type { ChartData2 } from "../types/interfaces";
import TradingChartCard from "./TradingChartCard";
import ModalTooltip from "../module/ModalTooltip";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: ChartData2;
  hideMaximize?: boolean;
  title?: React.ReactNode;
}

export const ChartModal: React.FC<ChartModalProps> = ({
  isOpen,
  onClose,
  chartData,
  hideMaximize = false,
  title,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [modalTooltipData, setModalTooltipData] = useState<{
    data: any;
    index: number;
    position: { x: number; y: number };
  } | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        setModalTooltipData(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const showModalTooltip = (
    dayData: any,
    index: number,
    position: { x: number; y: number },
  ) => {
    setModalTooltipData({
      data: dayData,
      index,
      position,
    });
  };

  const hideModalTooltip = () => {
    setModalTooltipData(null);
  };

  const formatValue = (value: number, unit: string): string => {
    const formatDecimal = (num: number) => Number(num.toFixed(3)).toString();

    if (unit === "time") {
      const h = Math.floor(value / 3600);
      const m = Math.floor((value % 3600) / 60);
      const s = Math.floor(value % 60);
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    if (unit === "currency") return `$${formatDecimal(value)}`;
    if (unit === "lot") {
      if (value >= 1) return formatDecimal(value);
      if (value >= 0.01) return formatDecimal(value * 1000);
      return formatDecimal(value * 1000000);
    }
    return formatDecimal(value);
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setModalTooltipData(null);
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[100] data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-150" />

        <Dialog.Content
          ref={modalRef}
          id="chart-modal"
          className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            ${isMobile ? "w-[98vw] max-h-[95vh] p-2" : "w-[92vw] max-w-4xl max-h-[85vh] p-3 sm:p-4 md:p-5"}
            bg-white dark:bg-[#0f0f1a] rounded-2xl 
            border border-gray-200 dark:border-[#2a2a4a] 
            shadow-2xl z-101
            overflow-hidden
            data-[state=open]:animate-in 
            data-[state=open]:fade-in-0 
            data-[state=open]:zoom-in-95 
            data-[state=open]:duration-200
            data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 
            data-[state=closed]:zoom-out-95 
            data-[state=closed]:duration-150
          `}
        >
          <div
            className={`flex items-center justify-between gap-2 mb-2 pb-1.5 ${isMobile ? "flex-wrap" : ""}`}
          >
            <div className="flex-1 min-w-0">
              {title && (
                <div
                  className={`${isMobile ? "text-sm" : "text-lg"} font-semibold dark:text-white truncate`}
                >
                  {title}
                </div>
              )}
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              {!hideMaximize && !isMobile && (
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a4a] rounded-lg transition-all duration-200"
                  title="تمام صفحه"
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Maximize className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              )}
              <button
                title="بستن"
                onClick={() => {
                  setModalTooltipData(null);
                  onClose();
                }}
                className={`
                  p-1.5 hover:bg-gray-100 cursor-pointer 
                  dark:hover:bg-[#2a2a4a] rounded-lg 
                  transition-all duration-200 hover:scale-105 active:scale-95
                  ${isMobile ? "touch-manipulation" : ""}
                `}
                style={{ touchAction: "manipulation" }}
              >
                <X
                  className={`${isMobile ? "w-5 h-5" : "w-4 h-4"} dark:text-white`}
                />
              </button>
            </div>
          </div>

          <div
            ref={contentRef}
            className={`
              relative overflow-y-auto 
              ${isMobile ? "max-h-[calc(95vh-60px)]" : "max-h-[calc(85vh-95px)]"} 
              pr-0.5 scroll-smooth overscroll-contain 
              custom-scrollbar
            `}
          >
            <div className="w-full relative">
              <TradingChartCard
                data={chartData}
                hideMaximize={true}
                isInModal={true}
                onTooltipShow={showModalTooltip}
                onTooltipHide={hideModalTooltip}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {modalTooltipData && (
        <ModalTooltip
          data={modalTooltipData.data}
          index={modalTooltipData.index}
          position={modalTooltipData.position}
          formatValue={formatValue}
          unit={chartData.unit}
          averageLine={chartData.averageLine}
          isDark={isDarkMode}
          onClose={hideModalTooltip}
          // @ts-ignore
          modalRef={modalRef}
          isMobile={isMobile}
        />
      )}
    </Dialog.Root>
  );
};
