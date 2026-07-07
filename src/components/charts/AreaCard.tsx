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

  const chartData = useMemo(() => {
    return cfg.data.map((d: any) => ({
      t: d.t,
      v: d.close ?? d.v ?? 0,
    }));
  }, [cfg.data]);

  const strokeColor = useMemo(() => {
    if (cfg.strokeColor) return cfg.strokeColor;

    const lastValue =
      chartData.length > 0 ? chartData[chartData.length - 1].v : 0;
    const prevValue =
      chartData.length > 1 ? chartData[chartData.length - 2].v : 0;
    return lastValue >= prevValue ? "#4ade80" : "#ef4444";
  }, [chartData, cfg.strokeColor]);

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
            data={chartData}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
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
      </div>
    </div>
  );
};
