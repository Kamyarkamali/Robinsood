import React, { useState, useEffect } from "react";
import {
  Settings,
  X,
  Save,
  RotateCcw,
  Palette,
  LineChart,
  Eye,
  Sliders,
  Grid,
  Maximize,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import i18next from "i18next";

export interface ChartCustomSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    grid: string;
    text: string;
    background: string;
    candleUp: string;
    candleDown: string;
    balanceLine: string;
  };
  lineWidths: {
    main: number;
    secondary: number;
    grid: number;
  };
  display: {
    showGrid: boolean;
    showLegend: boolean;
    showTooltip: boolean;
    showLabels: boolean;
    showCandles: boolean;
    showAreas: boolean;
  };
  sizes: {
    chartHeight: number;
    fontSize: number;
    barSize: number;
    padding: number;
  };
  effects: {
    shadow: boolean;
    glow: boolean;
    animation: boolean;
    smooth: boolean;
  };
  axis: {
    showXAxis: boolean;
    showYAxis: boolean;
    gridLines: boolean;
    tickCount: number;
  };
}

const defaultSettings: ChartCustomSettings = {
  colors: {
    primary: "#7c3aed",
    secondary: "#a855f7",
    accent: "#b06aff",
    grid: "#e8e2f8",
    text: "#a0a0c0",
    background: "transparent",
    candleUp: "#a855f7",
    candleDown: "#5b21b6",
    balanceLine: "#7c3aed",
  },
  lineWidths: {
    main: 2.2,
    secondary: 1.6,
    grid: 0.6,
  },
  display: {
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showLabels: true,
    showCandles: true,
    showAreas: true,
  },
  sizes: {
    chartHeight: 320,
    fontSize: 9,
    barSize: 2,
    padding: 8,
  },
  effects: {
    shadow: true,
    glow: true,
    animation: true,
    smooth: true,
  },
  axis: {
    showXAxis: true,
    showYAxis: true,
    gridLines: true,
    tickCount: 6,
  },
};

interface ChartSettingsPanelProps {
  settings: ChartCustomSettings;
  onSettingsChange: (settings: ChartCustomSettings) => void;
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
}

export const ChartSettingsPanel: React.FC<ChartSettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onClose,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<
    "colors" | "display" | "lines" | "sizes" | "effects" | "axis"
  >("colors");
  const [localSettings, setLocalSettings] =
    useState<ChartCustomSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = <K extends keyof ChartCustomSettings>(
    section: K,
    updates: Partial<ChartCustomSettings[K]>,
  ) => {
    const newSettings = {
      ...localSettings,
      [section]: {
        ...localSettings[section],
        ...updates,
      },
    };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
    onSettingsChange(defaultSettings);
    if (onReset) onReset();
  };

  const lang = i18next.language === "fa";

  const t = {
    title: lang ? "تنظیمات پیشرفته چارت" : "Advanced Chart Settings",
    reset: lang ? "بازنشانی" : "Reset",
    apply: lang ? "اعمال و بستن" : "Apply & Close",
    saveInfo: lang
      ? "تنظیمات به صورت خودکار در مرورگر ذخیره می‌شود"
      : "Settings are automatically saved in your browser",

    tabs: {
      colors: lang ? "رنگ‌ها" : "Colors",
      display: lang ? "نمایش" : "Display",
      lines: lang ? "خطوط" : "Lines",
      sizes: lang ? "اندازه‌ها" : "Sizes",
      effects: lang ? "افکت‌ها" : "Effects",
      axis: lang ? "محورها" : "Axis",
    },

    colors: {
      primary: lang ? "درادون روزانه" : "Daily Drawdown",
      secondary: lang ? "دراداون کل" : "Total Drawdown",
      accent: lang ? "رنگ موجودی" : "Balance Color",
      grid: lang ? "رنگ گرید" : "Grid Color",
      candleUp: lang ? "کندل صعودی" : "Bullish Candle",
      candleDown: lang ? "کندل نزولی" : "Bearish Candle",
      balanceLine: lang ? "رنگ خط موجودی" : "Balance Line Color",
    },

    display: {
      grid: lang ? "گرید" : "Grid",
      gridDesc: lang ? "نمایش خطوط گرید" : "Show grid lines",
      legend: lang ? "راهنما" : "Legend",
      legendDesc: lang ? "نمایش راهنمای پایین چارت" : "Show chart legend",
      tooltip: lang ? "تولتیپ" : "Tooltip",
      tooltipDesc: lang ? "نمایش اطلاعات هاور" : "Show hover information",
      labels: lang ? "برچسب‌ها" : "Labels",
      labelsDesc: lang ? "نمایش برچسب‌های محورها" : "Show axis labels",
      candles: lang ? "کندل‌ها" : "Candles",
      candlesDesc: lang ? "نمایش کندل‌های قیمت" : "Show price candles",
      areas: lang ? "ناحیه" : "Area",
      areasDesc: lang ? "نمایش ناحیه زیر نمودار" : "Show area under chart",
    },

    lines: {
      main: lang ? "ضخامت خط اصلی" : "Main Line Width",
      secondary: lang ? "ضخامت خط ثانویه" : "Secondary Line Width",
      grid: lang ? "ضخامت گرید" : "Grid Width",
    },

    sizes: {
      chartHeight: lang ? "ارتفاع چارت" : "Chart Height",
      fontSize: lang ? "اندازه فونت" : "Font Size",
      barSize: lang ? "اندازه کندل‌ها" : "Candle Size",
    },

    effects: {
      shadow: lang ? "سایه" : "Shadow",
      shadowDesc: lang ? "سایه زیر نمودار" : "Shadow under chart",
      glow: lang ? "درخشش" : "Glow",
      glowDesc: lang ? "درخشش خطوط" : "Line glow effect",
      animation: lang ? "انیمیشن" : "Animation",
      animationDesc: lang ? "انیمیشن ورودی" : "Entry animation",
      smooth: lang ? "نرم" : "Smooth",
      smoothDesc: lang ? "خطوط نرم و صاف" : "Smooth lines",
    },

    axis: {
      xAxis: lang ? "محور X" : "X Axis",
      xAxisDesc: lang ? "نمایش محور افقی" : "Show horizontal axis",
      yAxis: lang ? "محور Y" : "Y Axis",
      yAxisDesc: lang ? "نمایش محور عمودی" : "Show vertical axis",
      tickCount: lang ? "تعداد تیک‌ها" : "Tick Count",
    },
  };

  const tabs = [
    { id: "colors", label: t.tabs.colors, icon: Palette },
    { id: "display", label: t.tabs.display, icon: Eye },
    { id: "lines", label: t.tabs.lines, icon: LineChart },
    { id: "sizes", label: t.tabs.sizes, icon: Maximize },
    { id: "effects", label: t.tabs.effects, icon: Sliders },
    { id: "axis", label: t.tabs.axis, icon: Grid },
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1230] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3b1f7a] z-50">
          {/* هدر */}
          <div className="sticky top-0 bg-white dark:bg-[#1a1230] z-10 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-[#2a1a4a]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold dark:text-white">{t.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a1a4a] rounded-full transition-colors"
              >
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            {/* تب‌ها */}
            <div className="flex gap-1 mt-4 bg-gray-100 dark:bg-[#2a1a4a] p-1 rounded-lg overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-[#1a1230] shadow-md text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 space-y-6">
            {activeTab === "colors" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.primary}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.primary}
                      onChange={(e) =>
                        handleChange("colors", { primary: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.secondary}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.secondary}
                      onChange={(e) =>
                        handleChange("colors", { secondary: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.accent}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.accent}
                      onChange={(e) =>
                        handleChange("colors", { accent: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.grid}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.grid}
                      onChange={(e) =>
                        handleChange("colors", { grid: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.candleUp}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.candleUp}
                      onChange={(e) =>
                        handleChange("colors", { candleUp: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.candleDown}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.candleDown}
                      onChange={(e) =>
                        handleChange("colors", { candleDown: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium dark:text-gray-300 mb-1">
                      {t.colors.balanceLine}
                    </label>
                    <input
                      type="color"
                      value={localSettings.colors.balanceLine}
                      onChange={(e) =>
                        handleChange("colors", { balanceLine: e.target.value })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* بقیه تب‌ها به همین صورت باقی می‌مانند */}
            {activeTab === "display" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.display.showGrid}
                      onChange={(e) =>
                        handleChange("display", { showGrid: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.display.grid}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.display.gridDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.display.showLegend}
                      onChange={(e) =>
                        handleChange("display", {
                          showLegend: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.display.legend}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.display.legendDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.display.showTooltip}
                      onChange={(e) =>
                        handleChange("display", {
                          showTooltip: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.display.tooltip}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.display.tooltipDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.display.showLabels}
                      onChange={(e) =>
                        handleChange("display", {
                          showLabels: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.display.labels}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.display.labelsDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.display.showCandles}
                      onChange={(e) =>
                        handleChange("display", {
                          showCandles: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.display.candles}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.display.candlesDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.display.showAreas}
                      onChange={(e) =>
                        handleChange("display", { showAreas: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.display.areas}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.display.areasDesc}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === "lines" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.lines.main}: {localSettings.lineWidths.main}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.lineWidths.main]}
                    onValueChange={([value]) =>
                      handleChange("lineWidths", { main: value })
                    }
                    min={0.5}
                    max={4}
                    step={0.1}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.lines.secondary}: {localSettings.lineWidths.secondary}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.lineWidths.secondary]}
                    onValueChange={([value]) =>
                      handleChange("lineWidths", { secondary: value })
                    }
                    min={0.5}
                    max={3}
                    step={0.1}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.lines.grid}: {localSettings.lineWidths.grid}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.lineWidths.grid]}
                    onValueChange={([value]) =>
                      handleChange("lineWidths", { grid: value })
                    }
                    min={0.2}
                    max={2}
                    step={0.1}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>
              </div>
            )}

            {activeTab === "sizes" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.sizes.chartHeight}: {localSettings.sizes.chartHeight}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.sizes.chartHeight]}
                    onValueChange={([value]) =>
                      handleChange("sizes", { chartHeight: value })
                    }
                    min={150}
                    max={500}
                    step={10}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.sizes.fontSize}: {localSettings.sizes.fontSize}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.sizes.fontSize]}
                    onValueChange={([value]) =>
                      handleChange("sizes", { fontSize: value })
                    }
                    min={6}
                    max={16}
                    step={0.5}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.sizes.barSize}: {localSettings.sizes.barSize}px
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.sizes.barSize]}
                    onValueChange={([value]) =>
                      handleChange("sizes", { barSize: value })
                    }
                    min={1}
                    max={10}
                    step={0.5}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>
              </div>
            )}

            {activeTab === "effects" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.effects.shadow}
                      onChange={(e) =>
                        handleChange("effects", { shadow: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.effects.shadow}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.effects.shadowDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.effects.glow}
                      onChange={(e) =>
                        handleChange("effects", { glow: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.effects.glow}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.effects.glowDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.effects.animation}
                      onChange={(e) =>
                        handleChange("effects", { animation: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.effects.animation}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.effects.animationDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.effects.smooth}
                      onChange={(e) =>
                        handleChange("effects", { smooth: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {t.effects.smooth}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.effects.smoothDesc}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === "axis" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.axis.showXAxis}
                      onChange={(e) =>
                        handleChange("axis", { showXAxis: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">{t.axis.xAxis}</div>
                      <div className="text-xs text-gray-400">
                        {t.axis.xAxisDesc}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 dark:text-gray-300 cursor-pointer p-3 bg-gray-50 dark:bg-[#2a1a4a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#3a2a5a] transition-colors">
                    <input
                      type="checkbox"
                      checked={localSettings.axis.showYAxis}
                      onChange={(e) =>
                        handleChange("axis", { showYAxis: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-sm">{t.axis.yAxis}</div>
                      <div className="text-xs text-gray-400">
                        {t.axis.yAxisDesc}
                      </div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    {t.axis.tickCount}: {localSettings.axis.tickCount}
                  </label>
                  <Slider.Root
                    className="relative flex items-center w-full h-5"
                    value={[localSettings.axis.tickCount]}
                    onValueChange={([value]) =>
                      handleChange("axis", { tickCount: value })
                    }
                    min={2}
                    max={8}
                    step={1}
                  >
                    <Slider.Track className="bg-gray-300 dark:bg-[#2a1a4a] relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-[#2a1a4a] shadow-lg rounded-full border-2 border-purple-500" />
                  </Slider.Root>
                </div>
              </div>
            )}

            {/* دکمه‌های پایین */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#2a1a4a]">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-[#2a1a4a] hover:bg-gray-300 dark:hover:bg-[#3a2a5a] rounded-lg font-medium dark:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t.reset}
              </button>
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4" />
                {t.apply}
              </button>
            </div>

            <div className="text-center text-xs text-gray-400 dark:text-gray-500">
              {t.saveInfo}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const useChartSettings = (storageKey: string = "chartSettings") => {
  const [settings, setSettings] =
    useState<ChartCustomSettings>(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings, storageKey]);

  return {
    settings,
    setSettings,
    isOpen,
    setIsOpen,
    openSettings: () => setIsOpen(true),
    closeSettings: () => setIsOpen(false),
    toggleSettings: () => setIsOpen((v) => !v),
    resetSettings: () => setSettings(defaultSettings),
  };
};

export default ChartSettingsPanel;
