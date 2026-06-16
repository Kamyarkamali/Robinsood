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
  // اندازه‌ها
  sizes: {
    chartHeight: number;
    fontSize: number;
    barSize: number;
    padding: number;
  };
  // افکت‌ها
  effects: {
    shadow: boolean;
    glow: boolean;
    animation: boolean;
    smooth: boolean;
  };
  // محورها
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
    tickCount: 4,
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

  const tabs = [
    { id: "colors", label: "🎨 رنگ‌ها", icon: Palette },
    { id: "display", label: "👁️ نمایش", icon: Eye },
    { id: "lines", label: "📈 خطوط", icon: LineChart },
    { id: "sizes", label: "📐 اندازه‌ها", icon: Maximize },
    { id: "effects", label: "✨ افکت‌ها", icon: Sliders },
    { id: "axis", label: "📊 محورها", icon: Grid },
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
                <h2 className="text-xl font-bold dark:text-white">
                  تنظیمات پیشرفته چارت
                </h2>
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
                      رنگ اصلی
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
                      رنگ ثانویه
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
                      رنگ خطوط
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
                      رنگ گرید
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
                      کندل صعودی
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
                      کندل نزولی
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
                </div>
              </div>
            )}

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
                      <div className="font-medium text-sm">گرید</div>
                      <div className="text-xs text-gray-400">
                        نمایش خطوط گرید
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
                      <div className="font-medium text-sm">راهنما</div>
                      <div className="text-xs text-gray-400">
                        نمایش راهنمای پایین چارت
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
                      <div className="font-medium text-sm">تولتیپ</div>
                      <div className="text-xs text-gray-400">
                        نمایش اطلاعات هاور
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
                      <div className="font-medium text-sm">برچسب‌ها</div>
                      <div className="text-xs text-gray-400">
                        نمایش برچسب‌های محورها
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
                      <div className="font-medium text-sm">کندل‌ها</div>
                      <div className="text-xs text-gray-400">
                        نمایش کندل‌های قیمت
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
                      <div className="font-medium text-sm">ناحیه</div>
                      <div className="text-xs text-gray-400">
                        نمایش ناحیه زیر نمودار
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
                    ضخامت خط اصلی: {localSettings.lineWidths.main}px
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
                    ضخامت خط ثانویه: {localSettings.lineWidths.secondary}px
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
                    ضخامت گرید: {localSettings.lineWidths.grid}px
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
                    ارتفاع چارت: {localSettings.sizes.chartHeight}px
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
                    اندازه فونت: {localSettings.sizes.fontSize}px
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
                    اندازه کندل‌ها: {localSettings.sizes.barSize}px
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
                      <div className="font-medium text-sm">سایه</div>
                      <div className="text-xs text-gray-400">
                        سایه زیر نمودار
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
                      <div className="font-medium text-sm">درخشش</div>
                      <div className="text-xs text-gray-400">درخشش خطوط</div>
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
                      <div className="font-medium text-sm">انیمیشن</div>
                      <div className="text-xs text-gray-400">انیمیشن ورودی</div>
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
                      <div className="font-medium text-sm">نرم</div>
                      <div className="text-xs text-gray-400">
                        خطوط نرم و صاف
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
                      <div className="font-medium text-sm">محور X</div>
                      <div className="text-xs text-gray-400">
                        نمایش محور افقی
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
                      <div className="font-medium text-sm">محور Y</div>
                      <div className="text-xs text-gray-400">
                        نمایش محور عمودی
                      </div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-2">
                    تعداد تیک‌ها: {localSettings.axis.tickCount}
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

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#2a1a4a]">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-200 dark:bg-[#2a1a4a] hover:bg-gray-300 dark:hover:bg-[#3a2a5a] rounded-lg font-medium dark:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                بازنشانی
              </button>
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4" />
                اعمال و بستن
              </button>
            </div>

            <div className="text-center text-xs text-gray-400 dark:text-gray-500">
              تنظیمات به صورت خودکار در مرورگر ذخیره می‌شود
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
