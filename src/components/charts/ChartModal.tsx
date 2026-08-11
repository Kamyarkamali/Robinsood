import React, { useState, useMemo, useCallback } from "react";
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
} from "recharts";
import { AreaTooltip } from "./Tooltips";
import type { CandleDataPoint, ChartModalProps } from "./typesChart";
import i18next from "i18next";

interface ModalCandleBarProps {
  x?: number;
  width?: number;
  payload?: {
    open?: number;
    close?: number;
    high?: number;
    low?: number;
    v?: number;
    t?: string | number;
  };
  yDomain?: [number, number];
  background?: {
    y: number;
    height: number;
  };
}

const ModalCandleBar: React.FC<ModalCandleBarProps> = ({
  x = 0,
  width = 10,
  payload,
  yDomain = [0, 100],
  background,
}) => {
  if (!payload || !background) return null;

  const { open = 50, close = 50, high = 50, low = 50 } = payload;
  const isBullish = close >= open;
  const candleColor = isBullish ? "#4ade80" : "#ef4444";
  const cx = x + width / 2;
  const bw = Math.max(4, Math.min(width * 0.7, 16));

  const [dMin, dMax] = yDomain;
  const range = dMax - dMin || 1;

  const { y: bgY, height: bgHeight } = background;

  const toY = (v: number) => bgY + bgHeight - ((v - dMin) / range) * bgHeight;

  const oy = toY(open);
  const cy = toY(close);
  const hy = toY(high);
  const ly = toY(low);

  const bodyHeight = Math.max(2, Math.abs(cy - oy));
  const bodyY = Math.min(oy, cy);

  return (
    <g>
      <line
        x1={cx}
        y1={hy}
        x2={cx}
        y2={ly}
        stroke={candleColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={cx - bw / 2}
        y={bodyY}
        width={bw}
        height={bodyHeight}
        fill={candleColor}
        rx={2}
        stroke={candleColor}
        strokeWidth={0.5}
        opacity={0.9}
      />
    </g>
  );
};

// یک ستون OHLC برای نوار بالای چارت کندل‌استیک (استاندارد پلتفرم‌های معاملاتی)
const OhlcLegendStat: React.FC<{
  label: string;
  value: number | string;
  colorClass: string;
}> = ({ label, value, colorClass }) => (
  <div className="flex items-center gap-1">
    <span className="text-[11px] sm:text-xs font-medium text-gray-400 dark:text-white/40">
      {label}
    </span>
    <span
      className={`text-[11px] sm:text-xs font-bold tabular-nums ${colorClass}`}
    >
      {value}
    </span>
  </div>
);

export const ChartModal: React.FC<ChartModalProps> = ({
  isOpen,
  onClose,
  cfg,
  title,
  lang,
}) => {
  // مقدار کندلی که هاور شده (برای نوار OHLC بالای چارت)
  const [hoveredCandle, setHoveredCandle] = useState<{
    open: number;
    close: number;
    high: number;
    low: number;
    t?: string | number;
  } | null>(null);

  const handleChartMouseMove = useCallback((state: any) => {
    if (state?.activePayload?.length) {
      const p = state.activePayload[0].payload;
      setHoveredCandle({
        open: p.open,
        close: p.close,
        high: p.high,
        low: p.low,
        t: p.t,
      });
    }
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setHoveredCandle(null);
  }, []);

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
    legendBar: isDark
      ? "bg-white/5 border-white/10"
      : "bg-gray-50 border-gray-200",
  };

  const isCandle = cfg?.id === "tradeCount";

  // داده نرمال‌شده کندل + دامنه Y، فقط وقتی کارت کندل‌استیک باشه
  const candleData = useMemo(() => {
    if (!isCandle || !cfg?.data) return [];
    return cfg.data.map((d: CandleDataPoint) => ({
      t: d.t,
      open: d.open ?? d.v ?? 50,
      close: d.close ?? d.v ?? 50,
      high: d.high ?? d.v ?? 50,
      low: d.low ?? d.v ?? 50,
    }));
  }, [isCandle, cfg?.data]);

  const candleYDomain = useMemo((): [number, number] => {
    if (!candleData.length) return [0, 100];
    let max = -Infinity;
    candleData.forEach((d: any) => {
      if (d.high > max) max = d.high;
    });
    const padding = max * 0.05;
    return [0, Math.ceil(max + padding)];
  }, [candleData]);

  // کندل فعال برای نوار OHLC: هاور شده، وگرنه آخرین کندل
  const activeCandle = useMemo(() => {
    if (hoveredCandle) return hoveredCandle;
    return candleData[candleData.length - 1] || null;
  }, [hoveredCandle, candleData]);

  const activeChange = useMemo(() => {
    if (!activeCandle) return null;
    const diff = activeCandle.close - activeCandle.open;
    const pct = activeCandle.open !== 0 ? (diff / activeCandle.open) * 100 : 0;
    return { diff, pct, isUp: diff >= 0 };
  }, [activeCandle]);

  if (!cfg) return null;

  const renderChart = () => {
    if (isCandle) {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={candleData}
            margin={{ top: 30, right: 40, left: 40, bottom: 40 }}
            onMouseMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
          >
            <XAxis
              dataKey="t"
              stroke={isDark ? "#fff" : "#666"}
              tick={{ fill: isDark ? "#fff" : "#666", fontSize: 11 }}
              tickMargin={10}
              label={{
                value: i18next.language === "fa" ? "زمان" : "Time",
                position: "bottom",
                offset: 25,
                style: {
                  fill: isDark ? "#a78bfa" : "#7c3aed",
                  fontSize: 13,
                  fontWeight: 600,
                },
              }}
            />

            <YAxis
              domain={candleYDomain}
              tickMargin={24}
              stroke={isDark ? "#fff" : "#666"}
              tick={{ fill: isDark ? "#fff" : "#666", fontSize: 11 }}
              label={{
                value: i18next.language === "fa" ? "مقدار" : "Value",
                angle: -90,
                position: "left",
                offset: 15,
                style: {
                  fill: isDark ? "#a78bfa" : "#7c3aed",
                  fontSize: 13,
                  fontWeight: 600,
                },
              }}
            />

            <Tooltip
              content={(props: any) => (
                <AreaTooltip
                  active={props.active}
                  payload={props.payload}
                  label={String(props.label)}
                  lang={lang}
                  // @ts-ignore
                  chartType="candlestick"
                />
              )}
            />

            <Bar
              dataKey="close"
              background={{ fill: "transparent" }}
              shape={(props: any) => {
                const { x, width, payload, background } = props;
                return (
                  <ModalCandleBar
                    x={x}
                    width={width}
                    payload={payload}
                    yDomain={candleYDomain}
                    background={background}
                  />
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    // بقیه کارت‌ها => Area
    const gradId = `modal-grad-${cfg.id}`;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={cfg.data}
          margin={{ top: 30, right: 40, left: 40, bottom: 40 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={cfg.strokeColor || "#4ade80"}
                stopOpacity={isDark ? 0.35 : 0.2}
              />
              <stop
                offset="100%"
                stopColor={cfg.strokeColor || "#4ade80"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="t"
            stroke={isDark ? "#fff" : "#666"}
            tick={{ fill: isDark ? "#fff" : "#666", fontSize: 11 }}
            tickMargin={10}
            label={{
              value: i18next.language === "fa" ? "زمان" : "Time",
              position: "bottom",
              offset: 25,
              style: {
                fill: isDark ? "#a78bfa" : "#7c3aed",
                fontSize: 13,
                fontWeight: 600,
              },
            }}
          />

          <YAxis
            tickMargin={24}
            stroke={isDark ? "#fff" : "#666"}
            tick={{ fill: isDark ? "#fff" : "#666", fontSize: 11 }}
            label={{
              value: i18next.language === "fa" ? "مقدار" : "Value",
              angle: -90,
              position: "left",
              offset: 15,
              style: {
                fill: isDark ? "#a78bfa" : "#7c3aed",
                fontSize: 13,
                fontWeight: 600,
              },
            }}
          />

          <Tooltip
            content={(props: any) => (
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
            stroke={cfg.strokeColor || "#4ade80"}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={{
              r: 5,
              fill: cfg.strokeColor || "#4ade80",
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

          {/* نوار OHLC — فقط برای چارت کندل‌استیک، استاندارد پلتفرم‌های ترید مثل TradingView */}
          {isCandle && activeCandle && (
            <div
              className={`
                flex flex-wrap items-center gap-x-4 gap-y-1.5
                px-5 py-2.5
                border-b
                ${theme.legendBar}
              `}
              dir="ltr"
            >
              <OhlcLegendStat
                label="O"
                value={activeCandle.open}
                colorClass={theme.text}
              />
              <OhlcLegendStat
                label="H"
                value={activeCandle.high}
                colorClass="text-[#22c55e] dark:text-[#4ade80]"
              />
              <OhlcLegendStat
                label="L"
                value={activeCandle.low}
                colorClass="text-[#ef4444] dark:text-[#f87171]"
              />
              <OhlcLegendStat
                label="C"
                value={activeCandle.close}
                colorClass={theme.text}
              />

              {activeChange && (
                <span
                  className={`
                    text-[11px] sm:text-xs font-bold tabular-nums px-2 py-0.5 rounded-md
                    ${
                      activeChange.isUp
                        ? "text-[#16a34a] bg-[#22c55e]/10 dark:text-[#4ade80] dark:bg-[#4ade80]/10"
                        : "text-[#dc2626] bg-[#ef4444]/10 dark:text-[#f87171] dark:bg-[#f87171]/10"
                    }
                  `}
                >
                  {activeChange.isUp ? "+" : ""}
                  {activeChange.diff.toFixed(2)} ({activeChange.isUp ? "+" : ""}
                  {activeChange.pct.toFixed(2)}%)
                </span>
              )}

              {activeCandle.t !== undefined && (
                <span
                  className={`ms-auto text-[10px] sm:text-[11px] ${theme.muted}`}
                >
                  {activeCandle.t}
                </span>
              )}
            </div>
          )}

          <div className="flex-1 w-full h-full p-4 min-h-0">
            {renderChart()}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
