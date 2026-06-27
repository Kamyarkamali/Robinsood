// components/trading/AreaCard.tsx
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
import i18next from "i18next";

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
  const gradId = useMemo(() => `grad-${cfg.id}`, [cfg.id]);

  return (
    <div
      className="relative rounded-2xl border-4 dark:border-[#3A3A3A] border-gray-400 overflow-hidden flex flex-col h-42.5 cursor-pointer  transition-all duration-300 hover:scale-[1.02]"
      onClick={onCardClick}
    >
      <div className="flex justify-between items-start px-4 pt-3 pb-1">
        <span className="text-white/70 text-sm font-bold leading-snug whitespace-pre-line text-right">
          {i18next.language === "fa" ? title?.fa : title?.en}
        </span>
        <span
          className="text-base font-extrabold"
          style={{ color: valueColor, direction: "ltr" }}
        >
          {i18next.language === "fa"
            ? value === "متعادل"
              ? "+33"
              : value
            : value === "متعادل"
              ? "+33"
              : value}
        </span>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={cfg.data}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={cfg.strokeColor}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={cfg.strokeColor}
                  stopOpacity={0}
                />
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
      </div>
    </div>
  );
};
