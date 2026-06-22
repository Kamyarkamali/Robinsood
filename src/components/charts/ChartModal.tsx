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
  ComposedChart,
  Bar,
  Cell,
} from "recharts";
import { AreaTooltip, CandleTooltip } from "./Tooltips";
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
    panel: isDark
      ? "bg-[#0b0b12]/90 border-white/10"
      : "bg-white/90 border-gray-200",
    text: isDark ? "text-white" : "text-gray-900",
    muted: isDark ? "text-white/60" : "text-gray-500",
    hover: isDark ? "hover:bg-white/10" : "hover:bg-black/5",
  };

  const renderChart = () => {
    if (cfg.chartType === "candlestick") {
      const bodyData = cfg.data.map((d: CandleDataPoint) => ({
        t: d.t,
        body: Math.abs((d.close ?? 0) - (d.open ?? 0)),
        open: d.open ?? 0,
        close: d.close ?? 0,
        high: d.high ?? 0,
        low: d.low ?? 0,
      }));

      return (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={bodyData} barCategoryGap="25%">
            <XAxis dataKey="t" stroke={isDark ? "#888" : "#666"} />
            <YAxis stroke={isDark ? "#888" : "#666"} />

            <Tooltip
              content={(props) => (
                <CandleTooltip
                  active={props.active}
                  payload={props.payload}
                  label={String(props.label)}
                  lang={lang}
                />
              )}
            />

            <Bar
              dataKey="body"
              shape={(props: any) => {
                const { x = 0, y = 0, width = 0, height = 0, payload } = props;
                if (!payload) return null;

                const isBull = payload.close >= payload.open;

                const color = isBull
                  ? isDark
                    ? "#4ade80"
                    : "#16a34a"
                  : isDark
                    ? "#f87171"
                    : "#dc2626";

                const cx = x + width / 2;

                return (
                  <g>
                    <line
                      x1={cx}
                      y1={y - 6}
                      x2={cx}
                      y2={y + height + 6}
                      stroke={color}
                      strokeWidth={1.5}
                      opacity={0.8}
                    />
                    <rect
                      x={x + 1}
                      y={y}
                      width={width - 2}
                      height={Math.max(height, 2)}
                      fill={color}
                      rx={3}
                    />
                  </g>
                );
              }}
            >
              {bodyData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.close >= entry.open
                      ? isDark
                        ? "#4ade80"
                        : "#16a34a"
                      : isDark
                        ? "#f87171"
                        : "#dc2626"
                  }
                />
              ))}
            </Bar>
          </ComposedChart>
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

          <XAxis dataKey="t" stroke={isDark ? "#888" : "#666"} />
          <YAxis stroke={isDark ? "#888" : "#666"} />

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
            w-[95vw] max-w-5xl h-[85vh]
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
              <span className={`${theme.muted} text-xs`}>Market overview</span>
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
