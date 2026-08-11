import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { useTranslation } from "react-i18next";

interface CandleCardProps {
  cfg: any;
  title: {
    fa: string;
    en: string;
  };
  value: string | number;
  valueColor: string;
  lang: "fa" | "en";
  onCardClick?: () => void;
}

const CandleBar = ({ x, width, payload, yDomain, background }: any) => {
  if (!payload || !background) return null;

  const { open, close, high, low } = payload;
  const isBullish = close >= open;
  const candleColor = isBullish ? "#4ade80" : "#ef4444";
  const cx = x + width / 2;
  const bw = Math.max(2, Math.min(width * 0.75, 14));
  const [dMin, dMax] = yDomain || [0, 100];
  const range = dMax - dMin || 1;

  const { y: bgY, height: bgHeight } = background;

  const toY = (v: number) => bgY + bgHeight - ((v - dMin) / range) * bgHeight;

  const oy = toY(open);
  const cy = toY(close);
  const hy = toY(high);
  const ly = toY(low);
  const bodyHeight = Math.max(1.5, Math.abs(cy - oy));
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
        rx={1.5}
        stroke={candleColor}
        strokeWidth={0.5}
        opacity={0.9}
      />
    </g>
  );
};

export const CandleCard: React.FC<CandleCardProps> = ({
  cfg,
  title,
  value,
  valueColor,
  onCardClick,
}) => {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  const chartData = useMemo(() => {
    if (!cfg.data || cfg.data.length === 0) {
      return [
        { t: "10:00", open: 45, close: 52, high: 55, low: 42 },
        { t: "10:05", open: 52, close: 48, high: 54, low: 46 },
        { t: "10:10", open: 48, close: 56, high: 58, low: 45 },
        { t: "10:15", open: 56, close: 53, high: 57, low: 50 },
      ];
    }
    return cfg.data;
  }, [cfg.data]);

  const yDomain = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    chartData.forEach((d: any) => {
      if (d.low < min) min = d.low;
      if (d.high > max) max = d.high;
    });
    const padding = (max - min) * 0.1;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [chartData]);

  return (
    <div
      onClick={onCardClick}
      className="
        relative flex flex-col
        w-full
        h-[120px] sm:h-[140px] lg:h-[160px]
        rounded-2xl
        dark:border-4 border-2             border-[#D6DCE8]
 dark:border-[#3A3A3A]
        overflow-hidden
        cursor-pointer
        transition-transform duration-300 hover:scale-[1.02]
        bg-white dark:bg-[#2C2C2C]
      "
    >
      <div className="flex justify-between items-start px-4 pt-3 pb-1 z-10">
        <span className="text-[#5B657A] dark:text-white/70 text-sm font-bold leading-snug whitespace-pre-line text-right">
          {isFa ? title.fa : title.en}
        </span>
        <span
          className="text-base font-extrabold"
          style={{ color: valueColor, direction: "ltr" }}
        >
          {value}
        </span>
      </div>

      <div className="flex-1 relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 4, right: 2, left: 2, bottom: 4 }}
            barCategoryGap={0}
            barGap={0}
          >
            <XAxis dataKey="t" hide />
            <YAxis hide domain={yDomain} />

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0]?.payload;
                if (!data) return null;

                return (
                  <div className="backdrop-blur-2xl  rounded-xl px-3 py-2 text-white text-xs max-w-[180px]">
                    <p className="text-purple-300 font-bold text-center mb-1">
                      {label}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">
                          {isFa ? "باز شدن:" : "Open:"}
                        </span>
                        <span className="font-medium">{data.open}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">
                          {isFa ? "بسته شدن:" : "Close:"}
                        </span>
                        <span className="font-medium">{data.close}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">
                          {isFa ? "بیشترین:" : "High:"}
                        </span>
                        <span className="text-green-400 font-medium">
                          {data.high}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-400">
                          {isFa ? "کمترین:" : "Low:"}
                        </span>
                        <span className="text-red-400 font-medium">
                          {data.low}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            <Bar
              dataKey="close"
              background={{ fill: "transparent" }}
              shape={(props: any) => {
                const { x, width, payload, background } = props;
                return (
                  <CandleBar
                    x={x}
                    width={width}
                    payload={payload}
                    yDomain={yDomain}
                    background={background}
                  />
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CandleCard;
