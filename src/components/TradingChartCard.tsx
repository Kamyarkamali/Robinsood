import React, { useState, useEffect, useRef } from "react";
import type { ChartData2, ChartSettings } from "../types/interfaces";
import type { ChartUnit } from "../types/type";
import { Settings, X, Maximize2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { ChartModal } from "./ChartModal";

import iconAlert from "../assets/images/alert.svg";
import chart from "../assets/images/chart.svg";
import tick from "../assets/images/tick.svg";
import TradingTooltip from "./common/TradingTooltip";

interface Props {
  data: ChartData2;
  hideMaximize?: boolean;
  isInModal?: boolean;
  onTooltipShow?: (
    data: any,
    index: number,
    position: { x: number; y: number },
  ) => void;
  onTooltipHide?: () => void;
}

const defaultSettings: ChartSettings = {
  averageLineColor: "#FFA500",
  maxAllowedLineColor: "#22C55E",
  barColors: {
    belowAverage: "#EF4444",
    aboveAverage: "#22C55E",
  },
  averageLineWidth: 2,
  maxAllowedLineWidth: 2,
  barOpacity: 0.85,
  gridLineWidth: 1,
  showGridLines: true,
  showAverageLine: true,
  showMaxAllowedLine: true,
  showLabels: true,
  barBorderRadius: 6,
  chartHeight: 200,
  fontFamily: "system-ui",
};

const ChartSettingsPanel: React.FC<{
  settings: ChartSettings;
  onSettingsChange: (settings: ChartSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ settings, onSettingsChange, isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[80vh] overflow-y-auto bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-[#2a2a4a] z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold dark:text-white">
              ⚙️ تنظیمات چارت
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#2a2a4a] rounded-full transition-colors"
            >
              <X className="w-5 h-5 dark:text-white" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                رنگ خط میانگین
              </label>
              <input
                type="color"
                value={settings.averageLineColor}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    averageLineColor: e.target.value,
                  })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                ضخامت خط میانگین: {settings.averageLineWidth}px
              </label>
              <Slider.Root
                className="relative flex items-center w-full h-5"
                value={[settings.averageLineWidth]}
                onValueChange={([value]) =>
                  onSettingsChange({
                    ...settings,
                    averageLineWidth: value,
                  })
                }
                min={1}
                max={10}
                step={0.5}
              >
                <Slider.Track className="bg-gray-300 dark:bg-[#2a2a4a] relative grow rounded-full h-2">
                  <Slider.Range className="absolute bg-linear-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                رنگ خط حد مجاز
              </label>
              <input
                type="color"
                value={settings.maxAllowedLineColor}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    maxAllowedLineColor: e.target.value,
                  })
                }
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                ضخامت خط حد مجاز: {settings.maxAllowedLineWidth}px
              </label>
              <Slider.Root
                className="relative flex items-center w-full h-5"
                value={[settings.maxAllowedLineWidth]}
                onValueChange={([value]) =>
                  onSettingsChange({
                    ...settings,
                    maxAllowedLineWidth: value,
                  })
                }
                min={1}
                max={10}
                step={0.5}
              >
                <Slider.Track className="bg-gray-300 dark:bg-[#2a2a4a] relative grow rounded-full h-2">
                  <Slider.Range className="absolute bg-linear-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                رنگ‌های ستون‌ها
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                    زیر میانگین
                  </label>
                  <input
                    type="color"
                    value={settings.barColors.belowAverage}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        barColors: {
                          ...settings.barColors,
                          belowAverage: e.target.value,
                        },
                      })
                    }
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                    بالای میانگین
                  </label>
                  <input
                    type="color"
                    value={settings.barColors.aboveAverage}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        barColors: {
                          ...settings.barColors,
                          aboveAverage: e.target.value,
                        },
                      })
                    }
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                    بالای حد مجاز
                  </label>
                  {/* <input
                    type="color"
                    value={settings.barColors.aboveMax}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        barColors: {
                          ...settings.barColors,
                          aboveMax: e.target.value,
                        },
                      })
                    }
                    className="w-full h-8 rounded cursor-pointer"
                  /> */}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                شفافیت ستون‌ها: {Math.round(settings.barOpacity * 100)}%
              </label>
              <Slider.Root
                className="relative flex items-center w-full h-5"
                value={[settings.barOpacity]}
                onValueChange={([value]) =>
                  onSettingsChange({
                    ...settings,
                    barOpacity: value,
                  })
                }
                min={0.1}
                max={1}
                step={0.05}
              >
                <Slider.Track className="bg-gray-300 dark:bg-[#2a2a4a] relative grow rounded-full h-2">
                  <Slider.Range className="absolute bg-linear-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                گردی گوشه‌های ستون‌ها: {settings.barBorderRadius}px
              </label>
              <Slider.Root
                className="relative flex items-center w-full h-5"
                value={[settings.barBorderRadius]}
                onValueChange={([value]) =>
                  onSettingsChange({
                    ...settings,
                    barBorderRadius: value,
                  })
                }
                min={0}
                max={20}
                step={1}
              >
                <Slider.Track className="bg-gray-300 dark:bg-[#2a2a4a] relative grow rounded-full h-2">
                  <Slider.Range className="absolute bg-linear-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showGridLines}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showGridLines: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                />
                نمایش خطوط گرید
              </label>

              <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showAverageLine}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showAverageLine: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                />
                نمایش خط میانگین
              </label>

              <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showMaxAllowedLine}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showMaxAllowedLine: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                />
                نمایش خط حد مجاز
              </label>

              <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showLabels}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      showLabels: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                />
                نمایش برچسب‌ها
              </label>
            </div>

            <button
              onClick={() => onSettingsChange(defaultSettings)}
              className="w-full py-2 bg-gray-200 dark:bg-[#2a2a4a] hover:bg-gray-300 dark:hover:bg-[#3a3a5a] rounded-lg font-medium dark:text-white transition-colors"
            >
              🔄 بازنشانی به تنظیمات پیش‌فرض
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const TradingChartCard: React.FC<Props> = ({
  data,
  hideMaximize,
  isInModal = false,
  onTooltipShow,
  onTooltipHide,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [settings, setSettings] = useState<ChartSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const { i18n } = useTranslation();

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

    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleBarHover = (e: React.MouseEvent, index: number, day: any) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const tooltipWidth = isMobile ? 200 : 220;
    const tooltipHeight = isMobile ? 210 : 230;

    let x = rect.left + rect.width / 2 - tooltipWidth / 2;
    let y = rect.top - tooltipHeight - 12;

    const padding = isMobile ? 10 : 16;
    if (x < padding) x = padding;
    if (x + tooltipWidth > window.innerWidth - padding) {
      x = window.innerWidth - tooltipWidth - padding;
    }
    if (y < padding) {
      y = rect.bottom + 12;
    }

    const prevValue = index > 0 ? data.days[index - 1].value : null;

    const tooltipDataObj = {
      day,
      index,
      prevValue,
      maxAllowed: data.maxAllowedLine,
    };

    if (isInModal && onTooltipShow) {
      onTooltipShow(tooltipDataObj, index, { x, y });
    } else {
      setTooltipPosition({ x, y });
      setTooltipData(tooltipDataObj);
    }

    setHovered(index);
  };

  const handleBarLeave = () => {
    setHovered(null);
    if (isInModal && onTooltipHide) {
      onTooltipHide();
    } else {
      setTooltipData(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent, index: number, day: any) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    const tooltipWidth = isMobile ? 200 : 220;
    const tooltipHeight = isMobile ? 210 : 230;

    let x = rect.left + rect.width / 2 - tooltipWidth / 2;
    let y = rect.top - tooltipHeight - 12;

    const padding = isMobile ? 10 : 16;
    if (x < padding) x = padding;
    if (x + tooltipWidth > window.innerWidth - padding) {
      x = window.innerWidth - tooltipWidth - padding;
    }
    if (y < padding) {
      y = rect.bottom + 12;
    }

    const prevValue = index > 0 ? data.days[index - 1].value : null;

    const tooltipDataObj = {
      day,
      index,
      prevValue,
      maxAllowed: data.maxAllowedLine,
    };

    if (isInModal && onTooltipShow) {
      onTooltipShow(tooltipDataObj, index, { x, y });
    } else {
      setTooltipPosition({ x, y });
      setTooltipData(tooltipDataObj);
    }

    setHovered(index);
  };

  useEffect(() => {
    const saved = localStorage.getItem("chartSettings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chartSettings", JSON.stringify(settings));
  }, [settings]);

  const chartHeight = isMobile
    ? settings.chartHeight * 0.8
    : settings.chartHeight;
  const paddingLeft = isMobile ? 50 : 75;
  const paddingRight = isMobile ? 50 : 75;
  const paddingTop = isMobile ? 25 : 35;
  const paddingBottom = isMobile ? 30 : 40;

  const fixedWidth = isMobile ? 400 : 650;
  const svgHeight = chartHeight + paddingTop + paddingBottom;

  const totalBars = data.days.length;
  const availableWidth = fixedWidth - paddingLeft - paddingRight;

  const barWidth = Math.min(
    isMobile ? 20 : 28,
    (availableWidth - (totalBars - 1) * (isMobile ? 6 : 10)) / totalBars,
  );
  const gap =
    totalBars > 1
      ? Math.max(
          isMobile ? 6 : 10,
          (availableWidth - totalBars * barWidth) / (totalBars - 1),
        )
      : 0;

  const maxValue = Math.max(
    data.averageLine,
    data.maxAllowedLine,
    ...data.days.map((d) => d.value),
  );

  const valueToY = (v: number) => paddingTop + chartHeight * (1 - v / maxValue);

  const yPositions = [
    paddingTop,
    paddingTop + chartHeight * 0.25,
    paddingTop + chartHeight * 0.5,
    paddingTop + chartHeight * 0.75,
    paddingTop + chartHeight,
  ];

  const yTickValues = [
    maxValue,
    maxValue * 0.75,
    maxValue * 0.5,
    maxValue * 0.25,
    0,
  ];

  const avgY = valueToY(data.averageLine);
  const maxAllowedY = valueToY(data.maxAllowedLine);

  const getBarColor = (day: ChartData2["days"][number]) => {
    if (day.value < data.maxAllowedLine) {
      return settings.barColors.belowAverage;
    }

    return settings.barColors.aboveAverage;
  };
  function formatValue(value: number, unit: ChartUnit): string {
    const formatDecimal = (num: number) => num.toFixed(3);

    if (unit === "time") {
      const h = Math.floor(value / 3600);
      const m = Math.floor((value % 3600) / 60);
      const s = Math.floor(value % 60);

      return `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0",
      )}:${String(s).padStart(2, "0")}`;
    }

    if (unit === "currency") {
      return `$${formatDecimal(value)}`;
    }

    if (unit === "lot") {
      // if (value >= 1) return formatDecimal(value);
      // if (value >= 0.01) return formatDecimal(value * 1000);
      return formatDecimal(value);
    }

    return formatDecimal(value);
  }

  function formatAxisTick(value: number, unit: ChartUnit): string {
    if (unit === "time") {
      const h = Math.floor(value / 3600);
      const m = Math.floor((value % 3600) / 60);
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
    }
    if (unit === "currency") return `$${value.toFixed(0)}`;
    if (unit === "lot") {
      if (value >= 1) return `${value.toFixed(1)}`;
      if (value >= 0.01) return `${(value * 1000).toFixed(0)}m`;
      return `${(value * 1000000).toFixed(0)}μ`;
    }
    return `${value}`;
  }

  return (
    <>
      <div
        className={`flex flex-col items-center gap-3 w-full ${isMobile ? "px-1" : ""}`}
      >
        <div
          className={`
          w-full p-3 sm:p-4 
          bg-gray-50 dark:bg-[#1a1a2e] dark:bg-linear-to-t dark:from-[#1e1e1e] dark:to-[#2a2a2a] 
          h-full rounded-[25px] border-4 dark:border-white/10 border-gray-400 
          flex flex-col items-center shadow-xl
          ${isMobile ? "border-2 rounded-[14px]" : ""}
        `}
        >
          <div className="w-full flex items-center justify-between mb-2 sm:mb-3">
            <h3
              className={`
              flex-1 text-center text-gray-700 dark:text-white 
              ${isMobile ? "text-xs font-medium" : "text-base sm:text-lg font-normal"}
            `}
            >
              {i18n.language === "fa" ? data?.title?.fa : data?.title?.en}
            </h3>
            <div className="flex items-center gap-1 sm:gap-2">
              {!hideMaximize && !isMobile && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a4a] rounded-full transition-colors"
                  title="مشاهده بزرگ‌تر"
                >
                  <Maximize2 className="w-4 step-test16 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                </button>
              )}

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a4a] rounded-full transition-colors"
              >
                <Settings className="w-4 step-test17 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div
            className="w-full cursor-pointer"
            onClick={() => !isInModal && setIsModalOpen(true)}
          >
            <svg
              ref={svgRef}
              className="w-full h-auto"
              viewBox={`0 0 ${fixedWidth} ${svgHeight}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: "visible", direction: "ltr" }}
            >
              <defs>
                <linearGradient
                  id="tooltipGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1a1a2e" />
                  <stop offset="100%" stopColor="#16213e" />
                </linearGradient>
                <filter
                  id="shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="8"
                    floodColor="#000"
                    floodOpacity="0.3"
                  />
                </filter>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {settings.showGridLines &&
                yPositions.map((y, i) => (
                  <line
                    key={i}
                    x1={paddingLeft}
                    y1={y}
                    x2={fixedWidth - paddingRight}
                    y2={y}
                    stroke="#ffffff"
                    strokeOpacity={
                      i === 0 || i === yPositions.length - 1 ? 0.2 : 0.1
                    }
                    strokeWidth={
                      isMobile
                        ? settings.gridLineWidth * 0.8
                        : settings.gridLineWidth
                    }
                    strokeDasharray="6 4"
                  />
                ))}

              {settings.showLabels &&
                yTickValues.map((val, i) => (
                  <text
                    key={i}
                    x={paddingLeft - (isMobile ? 8 : 12)}
                    y={yPositions[i] + (isMobile ? 3 : 5)}
                    textAnchor="end"
                    fill={isDarkMode ? "#ffff" : "#2B2B2B"}
                    fontSize={isMobile ? 11 : 15}
                    fontWeight="600"
                  >
                    {formatAxisTick(val, data.unit)}
                  </text>
                ))}

              {data.days.map((day, i) => {
                const x = paddingLeft + i * (barWidth + gap);
                const y = valueToY(day.value);
                const barH = chartHeight - (y - paddingTop);
                const color = getBarColor(day);
                const isHovered = hovered === i;

                return (
                  <g key={i}>
                    {isHovered && (
                      <>
                        <line
                          x1={x + barWidth / 2}
                          y1={paddingTop}
                          x2={x + barWidth / 2}
                          y2={svgHeight - paddingBottom + 5}
                          stroke="#fff"
                          strokeWidth={isMobile ? 1 : 1.5}
                          strokeDasharray="4 4"
                          opacity={0.2}
                        />
                        <circle
                          cx={x + barWidth / 2}
                          cy={y}
                          r={isMobile ? 4 : 6}
                          fill="#fff"
                          stroke={color}
                          strokeWidth={isMobile ? 2 : 2.5}
                          opacity={0.9}
                          filter="url(#glow)"
                        />
                      </>
                    )}

                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barH}
                      rx={
                        isMobile
                          ? Math.min(settings.barBorderRadius * 0.7, 4)
                          : settings.barBorderRadius
                      }
                      fill={color}
                      opacity={settings.barOpacity}
                      stroke={isHovered ? "#fff" : "none"}
                      strokeWidth={isHovered ? (isMobile ? 1.5 : 2) : 0}
                      cursor="pointer"
                      onMouseEnter={(e) => handleBarHover(e, i, day)}
                      onMouseLeave={handleBarLeave}
                      onTouchStart={(e) => handleTouchStart(e, i, day)}
                    />

                    {settings.showLabels && (
                      <text
                        x={x + barWidth / 2}
                        y={svgHeight - (isMobile ? 6 : 8)}
                        textAnchor="middle"
                        fontSize={isMobile ? 10 : 15}
                        fontWeight={isMobile ? "400" : "500"}
                        fill={isDarkMode ? "#ffff" : "#2B2B2B"}
                      >
                        {i18n.language === "fa"
                          ? day?.label?.fa
                          : day?.label?.en}
                      </text>
                    )}
                  </g>
                );
              })}

              {settings.showAverageLine && (
                <>
                  <line
                    x1={paddingLeft}
                    y1={avgY}
                    x2={fixedWidth - paddingRight}
                    y2={avgY}
                    stroke={settings.averageLineColor}
                    strokeWidth={
                      isMobile
                        ? settings.averageLineWidth * 0.8
                        : settings.averageLineWidth
                    }
                    strokeDasharray="8 4"
                  />
                  {/* <rect
                    x={fixedWidth - paddingRight - (isMobile ? 50 : 70)}
                    y={avgY - (isMobile ? 10 : 14)}
                    width={isMobile ? 45 : 65}
                    height={isMobile ? 14 : 20}
                    rx={isMobile ? 4 : 6}
                    fill={settings.averageLineColor}
                    opacity={0.15}
                  /> */}
                </>
              )}

              {settings.showMaxAllowedLine && (
                <>
                  <line
                    x1={paddingLeft}
                    y1={maxAllowedY}
                    x2={fixedWidth - paddingRight}
                    y2={maxAllowedY}
                    stroke={settings.maxAllowedLineColor}
                    strokeWidth={
                      isMobile
                        ? settings.maxAllowedLineWidth * 0.8
                        : settings.maxAllowedLineWidth
                    }
                    strokeDasharray="8 4"
                  />
                  {/* <rect
                    x={fixedWidth - paddingRight - (isMobile ? 50 : 70)}
                    y={maxAllowedY - (isMobile ? 10 : 14)}
                    width={isMobile ? 45 : 65}
                    height={isMobile ? 14 : 20}
                    rx={isMobile ? 4 : 6}
                    fill={settings.maxAllowedLineColor}
                    opacity={0.15}
                  /> */}
                </>
              )}
            </svg>
          </div>

          <div
            className="w-full mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2"
            style={{ direction: "rtl" }}
          >
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="flex items-center justify-between px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-md bg-orange-500/10 text-orange-400 dark:bg-[#2B2B2B]">
                <span className="text-green-500 text-[10px] sm:text-[11px] leading-none flex items-center gap-0.5 sm:gap-1">
                  <img className="w-3.5 sm:w-4.5" src={chart} alt="chart" />
                  {t("cart1.Average")}
                </span>
                <span className="text-green-400 text-[10px] sm:text-[12px] leading-none font-medium">
                  {formatValue(data.averageValue, data.unit)}
                </span>
              </div>

              <div className="flex items-center justify-between px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-md bg-green-500/10 text-green-500 dark:bg-[#2B2B2B]">
                <span className="text-orange-400 text-[10px] sm:text-[11px] leading-none flex items-center gap-0.5 sm:gap-1">
                  <img className="w-3.5 sm:w-4.5" src={iconAlert} alt="alert" />{" "}
                  {t("cart1.Limit")}
                </span>
                <span className="text-orange-400 text-[10px] sm:text-[12px] leading-none font-medium">
                  {formatValue(data.maxAllowedValue, data.unit)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-100 dark:bg-[#2B2B2B]">
              <span className="text-[10px] sm:text-[11px] text-gray-600 dark:text-[#aaa] flex items-center gap-0.5 sm:gap-1">
                <img className="w-3.5 sm:w-4.5" src={tick} alt="Success" />
                {t("cart1.Trading")}
              </span>

              <span className="text-[10px] sm:text-[12px] text-gray-500 dark:text-[#bbb] flex items-center gap-0.5 sm:gap-1">
                <span className="text-green-500 font-semibold">
                  {data.acceptedDays}
                </span>
                <span>از</span>

                <span className="font-medium">{data.requiredDays}</span>

                <span className="text-gray-400">{t("cart1.day")}</span>
              </span>
            </div>
          </div>
        </div>

        <ChartSettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>

      {!isInModal && hovered !== null && tooltipData && (
        <TradingTooltip
          data={tooltipData}
          index={tooltipData.index}
          position={tooltipPosition}
          // @ts-ignore
          formatValue={formatValue}
          unit={data.unit}
          averageLine={data.averageLine}
          isDark={isDarkMode}
          isMobile={isMobile}
          onClose={() => {
            setHovered(null);
            setTooltipData(null);
          }}
        />
      )}

      {!isInModal && (
        <ChartModal
          hideMaximize={true}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          chartData={data}
          title={
            <div className="flex items-center gap-2">
              <img className="w-4.5" src={chart} alt="chart" />
              <span>
                {i18n.language === "fa" ? "نمایش دقیق چارت" : "Chart Details"}
              </span>
            </div>
          }
        />
      )}
    </>
  );
};

export default TradingChartCard;
