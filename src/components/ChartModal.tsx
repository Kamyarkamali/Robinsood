import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Maximize2, Download, Maximize, Minimize } from "lucide-react";
import type { ChartData2 } from "../types/interfaces";
import TradingChartCard from "./TradingChartCard";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: ChartData2;
  title?: string;
}

export const ChartModal: React.FC<ChartModalProps> = ({
  isOpen,
  onClose,
  chartData,
  title,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const downloadChart = () => {
    const svgElement = document.querySelector("#chart-modal svg");
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "chart.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed inset-0 bg-black/60 backdrop-blur-sm z-100
            data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:duration-200
            data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-150
          "
        />

        <Dialog.Content
          id="chart-modal"
          className="
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[92vw] max-w-4xl max-h-[85vh] 
            bg-white dark:bg-[#0f0f1a] rounded-2xl 
            border border-gray-200 dark:border-[#2a2a4a] 
            shadow-2xl z-101
            p-3 sm:p-4 md:p-5
            overflow-hidden
            data-[state=open]:animate-in 
            data-[state=open]:fade-in-0 
            data-[state=open]:zoom-in-95 
            data-[state=open]:duration-200
            data-[state=closed]:animate-out 
            data-[state=closed]:fade-out-0 
            data-[state=closed]:zoom-out-95 
            data-[state=closed]:duration-150
          "
        >
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-[#2a2a4a]">
            <div className="flex items-center justify-between w-full gap-0.5 shrink-0">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a4a] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                title="تمام صفحه"
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Maximize className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              <button
                title="بستن"
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 cursor-pointer dark:hover:bg-[#2a2a4a] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <X className="w-4 h-4 dark:text-white" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-95px)] pr-1 scroll-smooth overscroll-contain custom-scrollbar">
            <div className="transform scale-[0.85] sm:scale-[0.9] md:scale-[0.95] lg:scale-100 origin-top transition-all duration-300">
              <TradingChartCard data={chartData} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
