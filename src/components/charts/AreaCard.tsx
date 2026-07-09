// AreaCard.tsx
import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AreaTooltip } from "./Tooltips";
import type { CardConfig } from "./typesChart";
import { useTranslation } from "react-i18next";

interface AreaCardProps {
  cfg: CardConfig;
  title: {
    fa: string;
    en: string;
  };
  value: string | number;
  valueColor: string;
  lang: "fa" | "en";
  onCardClick?: () => void;
}

export const AreaCard: React.FC<AreaCardProps> = ({
  cfg,
  title,
  value,
  valueColor,
  lang,
  onCardClick,
}) => {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  const gradId = useMemo(() => `grad-${cfg.id}`, [cfg.id]);

  const isCandlestick = cfg.chartType === "candlestick";

  const chartData = useMemo(() => {
    if (isCandlestick) {
      // برای کندلی
      return cfg.data.map((d: any) => ({
        t: isFa ? d.tFa || d.t : d.t,
        close: d.close,
        open: d.open,
        high: d.high,
        low: d.low,
      }));
    }
    // برای area
    return cfg.data.map((d: any) => ({
      t: isFa ? d.tFa || d.t : d.t,
      v: d.close ?? d.v ?? 0,
    }));
  }, [cfg.data, isCandlestick, isFa]);

  // محاسبه رنگ برای کندلی
  const candleColor = useMemo(() => {
    if (isCandlestick && chartData.length > 0) {
      const last = chartData[chartData.length - 1];
      return last.close >= last.open ? "#4ade80" : "#ef4444";
    }
    return cfg.strokeColor || "#4ade80";
  }, [isCandlestick, chartData, cfg.strokeColor]);

  // داده‌ای که برای نمایش استفاده میشه (close برای کندلی)
  const displayData = useMemo(() => {
    if (isCandlestick) {
      return chartData.map((d: any) => ({
        ...d,
        v: d.close,
      }));
    }
    return chartData;
  }, [isCandlestick, chartData]);

  return (
    <div
      onClick={onCardClick}
      className="
        relative flex flex-col
        h-42.5
        rounded-2xl
        border-4 border-gray-400 dark:border-[#3A3A3A]
        overflow-hidden
        cursor-pointer
        transition-transform duration-300 hover:scale-[1.02]
        bg-white dark:bg-transparent
      "
    >
      <div className="flex justify-between items-start px-4 pt-3 pb-1">
        <span className="text-white/70 text-sm font-bold leading-snug whitespace-pre-line text-right">
          {isFa ? title.fa : title.en}
        </span>
        <span
          className="text-base font-extrabold"
          style={{ color: valueColor, direction: "ltr" }}
        >
          {value}
        </span>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={candleColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={candleColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="t" hide />
            <YAxis hide domain={["auto", "auto"]} />

            <Tooltip
              content={(props) => (
                <AreaTooltip
                  active={props.active}
                  payload={props.payload}
                  label={String(props.label)}
                  lang={lang}
                  chartType={cfg.chartType}
                />
              )}
            />

            <Area
              type="monotone"
              dataKey="v"
              stroke={candleColor}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: candleColor,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
