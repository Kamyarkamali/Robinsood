import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CandleTooltip } from "./Tooltips";
import type { CandleDataPoint, CardConfig } from "./typesChart";
import { useTranslation } from "react-i18next";

interface CandleCardProps {
  cfg: CardConfig;
  title: { fa: string; en: string };
  value: string | number;
  valueColor: string;
  lang: "fa" | "en";
  onCardClick?: () => void;
}

export const CandleCard: React.FC<CandleCardProps> = ({
  cfg,
  title,
  value,
  valueColor,
  lang,
  onCardClick,
}) => {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  const chartData = useMemo(() => {
    return cfg.data.map((d: CandleDataPoint) => ({
      t: d.t,
      v: d.close ?? 0,
    }));
  }, [cfg.data]);

  const displayTitle = isFa ? title.fa : title.en;

  const gradId = useMemo(() => `candle-grad-${cfg.id}`, [cfg.id]);

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
        <span className="text-white/70 text-sm font-bold">{displayTitle}</span>

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
                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="t" hide />
            <YAxis hide domain={["auto", "auto"]} />

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

            <Area
              type="monotone"
              dataKey="v"
              stroke="#4ade80"
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#4ade80",
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
