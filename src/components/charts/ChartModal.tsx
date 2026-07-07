import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AreaTooltip } from "./Tooltips";
import type { CandleDataPoint, ChartModalProps } from "./typesChart";
import i18next from "i18next";

export const ChartModal: React.FC<ChartModalProps> = ({
  isOpen,
  onClose,
  cfg,
  title,
  lang,
}) => {
  if (!cfg) return null;

  const isDark =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true;

  const theme = {
    overlay: "bg-black/60 dark:bg-black/70",
    panel: isDark ? "bg-[#2B2B2B]" : "bg-white/90 border-gray-200",
    text: isDark ? "text-white" : "text-gray-900",
    muted: isDark ? "text-white/60" : "text-gray-500",
    hover: isDark ? "hover:bg-white/10" : "hover:bg-black/5",
  };

  const renderChart = () => {
    if (cfg.chartType === "candlestick") {
      const data = cfg.data.map((d: CandleDataPoint) => ({
        t: d.t,
        v: d.close ?? 0,
      }));

      const lastValue = data.length > 0 ? data[data.length - 1].v : 0;
      const prevValue = data.length > 1 ? data[data.length - 2].v : 0;
      const isUp = lastValue >= prevValue;
      const strokeColor = isUp ? "#4ade80" : "#ef4444";
      const gradId = `modal-candle-grad-${cfg.id}`;

      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="t" stroke={isDark ? "#fff" : "#666"} />
            <YAxis tickMargin={24} stroke={isDark ? "#fff" : "#666"} />

            <Tooltip
              content={(props) => (
                <AreaTooltip
                  active={props.active}
                  payload={props.payload}
                  label={String(props.label)}
                  lang={lang}
                />
              )}
            />

            <Area
              type="monotone"
              dataKey="v"
              stroke={strokeColor}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: strokeColor,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    const gradId = `modal-grad-${cfg.id}`;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={cfg.data}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={cfg.strokeColor}
                stopOpacity={isDark ? 0.35 : 0.2}
              />
              <stop offset="100%" stopColor={cfg.strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="t" stroke={isDark ? "#fff" : "#666"} />
          <YAxis tickMargin={24} stroke={isDark ? "#fff" : "#666"} />

          <Tooltip
            content={(props) => (
              <AreaTooltip
                active={props.active}
                payload={props.payload}
                label={String(props.label)}
                lang={lang}
              />
            )}
          />

          <Area
            type="monotone"
            dataKey="v"
            stroke={cfg.strokeColor}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={{
              r: 5,
              fill: cfg.strokeColor,
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 ${theme.overlay} backdrop-blur-md z-50`}
        />

        <Dialog.Content
          className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[700px] 
            max-w-[95vw]
            h-[550px]
            max-h-[85vh]
            rounded-3xl border shadow-2xl z-50
            overflow-hidden flex flex-col
            ${theme.panel}
          `}
        >
          <div
            className={`
              flex items-center justify-between
              px-5 py-4
              border-b
              ${isDark ? "border-white/10" : "border-gray-200"}
            `}
          >
            <div className="flex flex-col gap-1">
              <h2 className={`${theme.text} font-semibold text-lg`}>
                {i18next.language === "fa" ? title?.fa : title?.en}
              </h2>
              <span className={`${theme.muted} text-xs`}>
                {i18next.language === "fa" ? "نمایش دقیق" : "Detailed view"}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`
                w-9 h-9 rounded-xl flex items-center justify-center
                transition-all
                ${theme.hover}
              `}
            >
              <X className={`w-5 h-5 ${theme.text}`} />
            </button>
          </div>

          <div className="flex-1 w-full h-full p-4 min-h-0">
            {renderChart()}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
