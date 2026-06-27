import i18next from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ModalTooltipProps } from "../types/interfaces";

const ModalTooltip: React.FC<ModalTooltipProps> = ({
  data,
  index,
  position,
  formatValue,
  unit,
  averageLine,
  isDark,
  onClose,
  modalRef,
  isMobile = false,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();

      let x = position.x;
      let y = position.y;

      const padding = isMobile ? 10 : 20;
      const tooltipWidth = rect.width || (isMobile ? 180 : 220);
      const tooltipHeight = rect.height || (isMobile ? 200 : 230);

      if (modalRef?.current) {
        const modalRect = modalRef.current.getBoundingClientRect();
        x = Math.max(
          modalRect.left + padding,
          Math.min(x, modalRect.right - tooltipWidth - padding),
        );
        y = Math.max(
          modalRect.top + padding,
          Math.min(y, modalRect.bottom - tooltipHeight - padding),
        );
      }

      if (x + tooltipWidth > window.innerWidth - padding) {
        x = window.innerWidth - tooltipWidth - padding;
      }
      if (x < padding) x = padding;
      if (y + tooltipHeight > window.innerHeight - padding) {
        y = window.innerHeight - tooltipHeight - padding;
      }
      if (y < padding) y = padding;

      setAdjustedPosition({ x, y });
    }
  }, [position, modalRef, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const getChangeColor = () => {
    if (data.prevValue === null) return "text-gray-400";
    return data.day.value > data.prevValue ? "text-green-500" : "text-red-500";
  };

  const getChangeIcon = () => {
    if (data.prevValue === null) return "•";
    return data.day.value > data.prevValue ? "▲" : "▼";
  };

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: "fixed",
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        zIndex: 99999,
        maxWidth: isMobile ? "85vw" : "280px",
        minWidth: isMobile ? "150px" : "180px",
      }}
      className={`
        pointer-events-auto backdrop-blur-2xl
        rounded-xl shadow-2xl border
        ${isDark ? "border-[#2a2a4a]" : "border-gray-200"}
        p-3 sm:p-4
        animate-in fade-in zoom-in-95 duration-200
        ${isMobile ? "touch-none select-none" : ""}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`
          absolute -top-2 left-1/2 -translate-x-1/2
          w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45
          ${isDark ? "bg-[#1a1a2e]" : "bg-white"}
          border-t border-l
          ${isDark ? "border-[#2a2a4a]" : "border-gray-200"}
        `}
      />

      <div className="space-y-2 sm:space-y-2.5">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2a2a4a] pb-1.5 sm:pb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={`font-bold ${isMobile ? "text-xs" : "text-sm"} text-gray-700 dark:text-white`}
            >
              ${i18next.language === "fa" ? "روز " : "Day"} {index + 1}
            </span>
          </div>
          <span
            className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500 dark:text-gray-400`}
          >
            {i18next.language === "fa"
              ? data.day.label?.fa
              : data.day.label?.en}
          </span>
        </div>

        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex justify-between items-center">
            <span
              className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500 dark:text-gray-400`}
            >
              {i18next.language === "fa" ? "مقدار:" : "Amount:"}
            </span>
            <span
              className={`font-bold ${isMobile ? "text-xs" : "text-sm"} text-blue-500`}
            >
              {formatValue(data.day.value, unit)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span
              className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500 dark:text-gray-400`}
            >
              {i18next.language === "fa" ? "میانگین:" : "Average:"}
            </span>
            <span
              className={`font-semibold ${isMobile ? "text-xs" : "text-sm"} text-green-500`}
            >
              {formatValue(averageLine, unit)}
            </span>
          </div>

          {data.prevValue !== null && (
            <div className="flex justify-between items-center">
              <span
                className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500 dark:text-gray-400`}
              >
                {i18next.language === "fa" ? "تغیر:" : "Change::"}
              </span>
              <span
                className={`font-bold ${isMobile ? "text-xs" : "text-sm"} ${getChangeColor()}`}
              >
                <span className="mr-1">{getChangeIcon()}</span>
                {data.day.value > data.prevValue ? "+" : ""}
                {formatValue(Math.abs(data.day.value - data.prevValue), unit)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span
              className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500 dark:text-gray-400`}
            >
              {i18next.language === "fa" ? "حدمجاز:" : "Permissible limit:"}
            </span>
            <span
              className={`font-semibold ${isMobile ? "text-xs" : "text-sm"} text-orange-500`}
            >
              {formatValue(data.maxAllowed, unit)}
            </span>
          </div>

          <div className="mt-0.5 sm:mt-1 pt-1 sm:pt-1.5 border-t border-gray-200 dark:border-[#2a2a4a]">
            <div className="flex justify-between items-center">
              <span
                className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500 dark:text-gray-400`}
              >
                {i18next.language === "fa"
                  ? "درصد از حد مجاز:"
                  : "Percentage of the allowed limit:"}
              </span>
              <span
                className={`font-bold ${isMobile ? "text-[10px]" : "text-xs"} ${
                  (data.day.value / data.maxAllowed) * 100 > 100
                    ? "text-red-500"
                    : (data.day.value / data.maxAllowed) * 100 > 80
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {((data.day.value / data.maxAllowed) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalTooltip;
