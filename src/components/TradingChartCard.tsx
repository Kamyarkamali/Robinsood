import React, { useState, useEffect } from "react";
import type { ChartData2, ChartSettings } from "../types/interfaces";
import type { ChartUnit } from "../types/type";
import { Settings, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";

interface Props {
  data: ChartData2;
}

const defaultSettings: ChartSettings = {
  averageLineColor: "#43A047",
  maxAllowedLineColor: "#FDD835",
  barColors: {
    belowAverage: "#1E88E5",
    aboveAverage: "#E53935",
    aboveMax: "#FB923C",
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
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[80vh] overflow-y-auto bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-[#2a2a4a] z-50">
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
            {/* رنگ خط میانگین */}
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

            {/* ضخامت خط میانگین */}
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
                  <Slider.Range className="absolute bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            {/* رنگ خط حد مجاز */}
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

            {/* ضخامت خط حد مجاز */}
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
                  <Slider.Range className="absolute bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            {/* رنگ‌های ستون‌ها */}
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
                  <input
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
                  />
                </div>
              </div>
            </div>

            {/* شفافیت ستون‌ها */}
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
                  <Slider.Range className="absolute bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            {/* گردی گوشه‌های ستون‌ها */}
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
                  <Slider.Range className="absolute bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a2a4a] shadow-lg rounded-full border-2 border-sky-500" />
              </Slider.Root>
            </div>

            {/* Toggle‌ها */}
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

            {/* دکمه Reset */}
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

// کامپوننت اصلی
const TradingChartCard: React.FC<Props> = ({ data }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [settings, setSettings] = useState<ChartSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // بارگذاری تنظیمات از localStorage
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

  // ذخیره تنظیمات در localStorage
  useEffect(() => {
    localStorage.setItem("chartSettings", JSON.stringify(settings));
  }, [settings]);

  const chartHeight = settings.chartHeight;
  const paddingLeft = 75;
  const paddingRight = 75;
  const paddingTop = 35;
  const paddingBottom = 40;

  const fixedWidth = 650;
  const svgHeight = chartHeight + paddingTop + paddingBottom;

  const totalBars = data.days.length;
  const availableWidth = fixedWidth - paddingLeft - paddingRight;

  const barWidth = Math.min(
    28,
    (availableWidth - (totalBars - 1) * 10) / totalBars,
  );
  const gap =
    totalBars > 1
      ? Math.max(10, (availableWidth - totalBars * barWidth) / (totalBars - 1))
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
    const below = day.belowAverage ?? day.value < data.averageLine;
    if (!below) return settings.barColors.belowAverage;
    return day.value < data.maxAllowedLine
      ? settings.barColors.aboveAverage
      : settings.barColors.aboveMax;
  };

  const getDayStatus = (day: ChartData2["days"][number]) => {
    if (day.value < data.averageLine) {
      return {
        text: "پایین‌تر از میانگین",
        color: settings.barColors.aboveAverage,
        icon: "🔻",
        bg: "rgba(229, 57, 53, 0.15)",
      };
    } else if (
      day.value >= data.averageLine &&
      day.value < data.maxAllowedLine
    ) {
      return {
        text: "در محدوده مجاز",
        color: settings.barColors.belowAverage,
        icon: "✅",
        bg: "rgba(30, 136, 229, 0.15)",
      };
    } else if (day.value >= data.maxAllowedLine) {
      return {
        text: "بالاتر از حد مجاز",
        color: settings.barColors.aboveMax,
        icon: "⚠️",
        bg: "rgba(251, 146, 60, 0.15)",
      };
    }
    return {
      text: "در محدوده مجاز",
      color: settings.barColors.belowAverage,
      icon: "✅",
      bg: "rgba(30, 136, 229, 0.15)",
    };
  };

  function formatValue(value: number, unit: ChartUnit): string {
    if (unit === "time") {
      const h = Math.floor(value / 3600);
      const m = Math.floor((value % 3600) / 60);
      const s = Math.floor(value % 60);
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
        s,
      ).padStart(2, "0")}`;
    }
    if (unit === "currency") return `$${value.toFixed(2)}`;
    if (unit === "lot") {
      if (value >= 1) return `${value.toFixed(2)} لات`;
      if (value >= 0.01) return `${(value * 1000).toFixed(0)} میلی‌لات`;
      return `${(value * 1000000).toFixed(0)} میکرو‌لات`;
    }
    return `${value}`;
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
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full p-4 bg-gray-50 dark:bg-[#1a1a2e] bg-white dark:bg-linear-to-t dark:from-[#1e1e1e] dark:to-[#2a2a2a] h-full border-4 rounded-[21px] border-gray-300 dark:border-[#2a2a4a] flex flex-col items-center shadow-xl">
        {/* Header با دکمه تنظیمات */}
        <div className="w-full flex items-center justify-between mb-3">
          <h3 className="flex-1 text-center text-gray-700 dark:text-white text-base sm:text-lg font-normal">
            {data.title}
          </h3>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a4a] rounded-full transition-colors"
            title="تنظیمات چارت"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <svg
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
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
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

          {/* Grid Lines */}
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
                strokeWidth={settings.gridLineWidth}
                strokeDasharray="6 4"
              />
            ))}

          {/* Axis Labels */}
          {settings.showLabels &&
            yTickValues.map((val, i) => (
              <text
                key={i}
                x={paddingLeft - 12}
                y={yPositions[i] + 5}
                textAnchor="end"
                fill="#8a8aaa"
                fontSize="14"
                fontWeight="500"
                fontFamily="monospace"
              >
                {formatAxisTick(val, data.unit)}
              </text>
            ))}

          {data.days.map((day, i) => {
            const x = paddingLeft + i * (barWidth + gap);
            const y = valueToY(day.value);
            const barH = chartHeight - (y - paddingTop);
            const color = getBarColor(day);
            const status = getDayStatus(day);
            const isHovered = hovered === i;

            const change =
              i > 0
                ? ((day.value - data.days[i - 1].value) /
                    data.days[i - 1].value) *
                  100
                : 0;

            return (
              <g key={i}>
                <rect
                  x={x - 15}
                  y={paddingTop - 5}
                  width={barWidth + 30}
                  height={chartHeight + 10}
                  fill="transparent"
                  cursor="pointer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />

                {isHovered && (
                  <>
                    <line
                      x1={x + barWidth / 2}
                      y1={paddingTop}
                      x2={x + barWidth / 2}
                      y2={svgHeight - paddingBottom + 5}
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity={0.2}
                    />
                    <circle
                      cx={x + barWidth / 2}
                      cy={y}
                      r="6"
                      fill="#fff"
                      stroke={color}
                      strokeWidth="2.5"
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
                  rx={settings.barBorderRadius}
                  fill={color}
                  opacity={settings.barOpacity}
                  stroke={isHovered ? "#fff" : "none"}
                  strokeWidth={isHovered ? 2 : 0}
                />

                {settings.showLabels && (
                  <text
                    x={x + barWidth / 2}
                    y={svgHeight - 8}
                    textAnchor="middle"
                    fill="#8a8aaa"
                    fontSize="14"
                    fontWeight="500"
                  >
                    {day.label}
                  </text>
                )}

                {isHovered && (
                  <foreignObject
                    x={x - 95}
                    y={y - 170}
                    width={190}
                    height={160}
                    style={{ zIndex: 9999, pointerEvents: "none" }}
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        zIndex: 9999,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(135deg, #1a1a2e, #16213e)",
                          borderRadius: "16px",
                          border: "1.5px solid #4a4a6a",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "6px",
                            background: color,
                            borderRadius: "16px 16px 0 0",
                          }}
                        />

                        <div
                          style={{
                            fontSize: "14px",
                            color: "#aaa",
                            marginTop: "8px",
                          }}
                        >
                          {day.label}
                        </div>

                        <div
                          style={{
                            fontSize:
                              formatValue(day.value, data.unit).length > 10
                                ? "26px"
                                : "34px",
                            fontWeight: 900,
                            fontFamily: "monospace",
                            color: "white",
                            margin: "4px 0",
                          }}
                        >
                          {formatValue(day.value, data.unit)}
                        </div>

                        {i > 0 && (
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: change >= 0 ? "#43A047" : "#E53935",
                              marginBottom: "4px",
                            }}
                          >
                            {change >= 0 ? "📈" : "📉"} {change.toFixed(2)}%
                          </div>
                        )}

                        <div
                          style={{
                            width: "80%",
                            height: "1px",
                            background: "#3a3a5a",
                            margin: "4px 0",
                            opacity: 0.5,
                          }}
                        />

                        <div
                          style={{
                            background: status.bg,
                            padding: "2px 16px",
                            borderRadius: "12px",
                            margin: "2px 0",
                          }}
                        >
                          <span
                            style={{
                              color: status.color,
                              fontSize: "15px",
                              fontWeight: 600,
                            }}
                          >
                            {status.icon} {status.text}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#8a8aaa",
                            marginTop: "2px",
                          }}
                        >
                          {day.value > data.averageLine ? "▲" : "▼"}
                          {Math.abs(day.value - data.averageLine).toFixed(
                            2,
                          )}{" "}
                          نسبت به میانگین
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}

          {/* Average Line */}
          {settings.showAverageLine && (
            <>
              <line
                x1={paddingLeft}
                y1={avgY}
                x2={fixedWidth - paddingRight}
                y2={avgY}
                stroke={settings.averageLineColor}
                strokeWidth={settings.averageLineWidth}
                strokeDasharray="8 4"
              />
              <rect
                x={fixedWidth - paddingRight - 70}
                y={avgY - 14}
                width={65}
                height={20}
                rx={6}
                fill={settings.averageLineColor}
                opacity={0.15}
              />
              <text
                x={fixedWidth - paddingRight - 37}
                y={avgY + 1}
                textAnchor="middle"
                fill={settings.averageLineColor}
                fontSize="11"
                fontWeight="600"
              >
                📊 میانگین
              </text>
            </>
          )}

          {/* Max Allowed Line */}
          {settings.showMaxAllowedLine && (
            <>
              <line
                x1={paddingLeft}
                y1={maxAllowedY}
                x2={fixedWidth - paddingRight}
                y2={maxAllowedY}
                stroke={settings.maxAllowedLineColor}
                strokeWidth={settings.maxAllowedLineWidth}
                strokeDasharray="8 4"
              />
              <rect
                x={fixedWidth - paddingRight - 70}
                y={maxAllowedY - 14}
                width={65}
                height={20}
                rx={6}
                fill={settings.maxAllowedLineColor}
                opacity={0.15}
              />
              <text
                x={fixedWidth - paddingRight - 37}
                y={maxAllowedY + 1}
                textAnchor="middle"
                fill={settings.maxAllowedLineColor}
                fontSize="11"
                fontWeight="600"
              >
                ⚠️ حد مجاز
              </text>
            </>
          )}
        </svg>

        <div
          className="w-full mt-4 flex flex-col gap-2"
          style={{ direction: "rtl" }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-500/10 dark:bg-green-500/5 p-2 rounded-lg text-center">
              <span className="text-green-500 text-[11px] font-normal block">
                📊 میانگین
              </span>
              <span className="text-green-400 text-[13px] font-normal">
                {formatValue(data.averageValue, data.unit)}
              </span>
            </div>
            <div className="bg-orange-500/10 dark:bg-orange-500/5 p-2 rounded-lg text-center">
              <span className="text-orange-400 text-[11px] font-normal block">
                ⚠️ حد مجاز
              </span>
              <span className="text-orange-400 text-[13px] font-normal">
                {formatValue(data.maxAllowedValue, data.unit)}
              </span>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-[#2a2a4a] py-2 px-4 rounded-lg text-center">
            <span className="text-gray-600 dark:text-[#aaa] text-[12px]">
              ✅ روز معاملاتی مورد قبول:
              <span className="font-bold text-green-500 mx-1">
                {data.acceptedDays}
              </span>
              از
              <span className="font-bold mx-1">{data.requiredDays}</span>
              روز
              <span
                className={`mr-2 font-bold ${
                  data.acceptedDays / data.requiredDays >= 0.7
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              ></span>
            </span>
          </div>
        </div>
      </div>

      {/* پنل تنظیمات */}
      <ChartSettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default TradingChartCard;
