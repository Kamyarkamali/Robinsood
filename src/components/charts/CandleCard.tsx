import React, { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTranslation } from "react-i18next";

import { CandleTooltip } from "./Tooltips";
import type { CandleDataPoint, CardConfig } from "./typesChart";

interface CandleCardProps {
  cfg: CardConfig;
  title: {
    fa: string;
    en: string;
  };
  value: string | number;
  onCardClick?: () => void;
}

interface CandleBodyProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: CandleDataPoint;
}

const CandleBody: React.FC<CandleBodyProps> = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}) => {
  if (!payload) return null;

  const isBull = payload.close >= payload.open;

  const color = isBull ? "#4ade80" : "#f87171";
  const cx = x + width / 2;

  return (
    <g>
      <line
        x1={cx}
        y1={y - 4}
        x2={cx}
        y2={y + height + 4}
        stroke={color}
        strokeWidth={1.5}
      />
      <rect
        x={x + 1}
        y={y}
        width={width - 2}
        height={Math.max(height, 2)}
        fill={color}
        rx={2}
      />
    </g>
  );
};

export const CandleCard: React.FC<CandleCardProps> = ({
  cfg,
  title,
  value,
  onCardClick,
}) => {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  const bodyData = useMemo(() => {
    return cfg.data.map((d: CandleDataPoint) => ({
      t: d.t,
      body: Math.abs((d.close ?? 0) - (d.open ?? 0)),
      open: d.open ?? 0,
      close: d.close ?? 0,
      high: d.high ?? 0,
      low: d.low ?? 0,
    }));
  }, [cfg.data]);

  const displayTitle = isFa ? title.fa : title.en;

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
      <div className="flex justify-between items-center px-4 pt-3 pb-1">
        <span className="text-white/70 text-sm font-bold leading-snug text-right">
          {displayTitle}
        </span>

        <span
          className="text-white text-xl font-extrabold"
          style={{ direction: "ltr" }}
        >
          {value}
        </span>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={bodyData}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
            barCategoryGap="20%"
          >
            <XAxis dataKey="t" hide />
            <YAxis hide domain={[0, 80]} />

            <Tooltip
              content={(props) => (
                <CandleTooltip
                  active={props.active}
                  payload={props.payload}
                  label={String(props.label)}
                  lang={i18n.language as "fa" | "en"}
                />
              )}
            />

            <Bar
              dataKey="body"
              shape={(props: any) => <CandleBody {...props} />}
            >
              {bodyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.close >= entry.open ? "#4ade80" : "#f87171"}
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
