import i18next from "i18next";
import React, { useEffect, useRef, useState } from "react";

interface TradingTooltipProps {
  data: any;
  index: number;
  position: { x: number; y: number };
  formatValue: (value: number, unit: string) => string;
  unit: string;
  averageLine: number;
  isDark: boolean;
  onClose: () => void;
}

const TradingTooltip: React.FC<TradingTooltipProps> = ({
  data,
  index,
  position,
  formatValue,
  unit,
  averageLine,
  isDark,
  onClose,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();

      let x = position.x;
      let y = position.y;

      const padding = 20;
      const tooltipWidth = rect.width || 220;
      const tooltipHeight = rect.height || 230;

      if (x + tooltipWidth > window.innerWidth - padding) {
        x = window.innerWidth - tooltipWidth - padding;
      }
      if (x < padding) {
        x = padding;
      }
      if (y + tooltipHeight > window.innerHeight - padding) {
        y = window.innerHeight - tooltipHeight - padding;
      }
      if (y < padding) {
        y = padding;
      }

      setAdjustedPosition({ x, y });
    }
  }, [position]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const getStatusColor = () => {
    if (data.day.value > data.maxAllowed) return "text-red-500";
    if (data.day.value > averageLine) return "text-yellow-500";
    return "text-green-500";
  };

  const getStatusText = () => {
    if (data.day.value > data.maxAllowed) return "بالای حد مجاز";
    if (data.day.value > averageLine) return "بالای میانگین";
    return "زیر میانگین";
  };

  return (
    <div
      ref={tooltipRef}
      className={`
        backdrop-blur-2xl
        fixed z-9999 pointer-events-auto
        rounded-xl shadow-2xl border
        ${isDark ? "border-[#2a2a4a]" : "border-gray-200"}
        p-4 min-w-50 max-w-70
        transition-all
        animate-in fade-in zoom-in-95 duration-200
      `}
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      <div
        className={`
          absolute -top-2 left-1/2 -translate-x-1/2
          w-3 h-3 rotate-45
          ${isDark ? "bg-[#1a1a2e]" : "bg-white"}
          border-t border-l
          ${isDark ? "border-[#2a2a4a]" : "border-gray-200"}
        `}
      />

      <div className="space-y-2.5">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2a2a4a] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700 dark:text-white">
              {i18next.language === "fa" ? "روز" : "Day"} {index + 1}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {i18next.language === "fa"
              ? data.day.label?.fa
              : data.day.label?.en}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {i18next.language === "fa" ? "مقدار" : "Amount"} {index + 1}
            </span>
            <span className="text-sm font-bold text-blue-500">
              {formatValue(data.day.value, unit)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {i18next.language === "fa" ? "میانگین" : "Average"}
            </span>
            <span className="text-sm font-semibold text-green-500">
              {formatValue(averageLine, unit)}
            </span>
          </div>

          {data.prevValue !== null && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {i18next.language === "fa" ? "تغیر" : "Change"}
              </span>
              <span className={`text-sm font-bold ${getChangeColor()}`}>
                <span className="mr-1">{getChangeIcon()}</span>
                {data.day.value > data.prevValue ? "+" : ""}
                {formatValue(Math.abs(data.day.value - data.prevValue), unit)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {i18next.language === "fa" ? "حد مجاز:" : "Allowed limit:"}
            </span>
            <span className="text-sm font-semibold text-orange-500">
              {formatValue(data.maxAllowed, unit)}
            </span>
          </div>

          <div className="mt-1 pt-1.5 border-t border-gray-200 dark:border-[#2a2a4a]">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {i18next.language === "fa"
                  ? "درصد از حد مجاز"
                  : "Percentage of the allowed limit:"}
              </span>
              <span
                className={`text-xs font-bold ${
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
    </div>
  );
};

export default TradingTooltip;
