import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
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

interface DataPoint {
  t: string;
  v: number;
  close?: number;
  open?: number;
  high?: number;
  low?: number;
}

const generateCandleData = (baseData: any[], isFa: boolean): DataPoint[] => {
  if (!baseData || baseData.length === 0) {
    const defaultData = [];
    let lastClose = 50;
    for (let i = 0; i < 20; i++) {
      const volatility = 5 + (i % 10) * 1.5;
      const open = lastClose;
      const close = open + Math.sin(i * 0.5) * volatility;
      const high =
        Math.max(open, close) +
        Math.abs(Math.sin(i * 0.7 + 1)) * volatility * 0.6;
      const low =
        Math.min(open, close) -
        Math.abs(Math.sin(i * 0.7 + 2)) * volatility * 0.6;
      lastClose = close;

      defaultData.push({
        t: isFa ? `نقطه ${i + 1}` : `Point ${i + 1}`,
        open: Math.round(open * 100) / 100,
        close: Math.round(close * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        v: close,
      });
    }
    return defaultData;
  }

  const result: DataPoint[] = [];
  let lastClose = 50 + (baseData.length % 20) * 2;

  for (let i = 0; i < baseData.length; i++) {
    const volatility = 3 + (i % 15) * 1.2;
    const open = lastClose;
    const close = open + Math.sin(i * 0.7 + 1) * volatility;
    const high =
      Math.max(open, close) +
      Math.abs(Math.sin(i * 0.9 + 3)) * volatility * 0.5;
    const low =
      Math.min(open, close) -
      Math.abs(Math.sin(i * 0.9 + 4)) * volatility * 0.5;
    lastClose = close;

    result.push({
      t: isFa
        ? baseData[i]?.tFa || baseData[i]?.t || `نقطه ${i + 1}`
        : baseData[i]?.t || `Point ${i + 1}`,
      open: Math.round(open * 100) / 100,
      close: Math.round(close * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      v: close,
    });
  }
  return result;
};

const CandleBar = ({ x, width, payload, yDomain }: any) => {
  if (!payload) return null;

  const { open, close, high, low } = payload;
  const isBullish = close >= open;
  const candleColor = isBullish ? "#4ade80" : "#ef4444";
  const cx = x + width / 2;
  const bw = Math.max(2, Math.min(width * 0.6, 10));

  const [dMin, dMax] = yDomain || [0, 100];
  const range = dMax - dMin;

  const toY = (v: number) => {
    if (range === 0) return 0;
    return ((v - dMin) / range) * 100;
  };

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
        rx={1}
        stroke={candleColor}
        strokeWidth={0.5}
        opacity={0.9}
      />
    </g>
  );
};

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

  const isCandlestick = cfg.id === "tradeCount";

  const chartData = useMemo((): DataPoint[] => {
    if (isCandlestick) {
      return generateCandleData(cfg.data || [], isFa);
    }
    return (cfg.data || []).map((d: any) => ({
      t: isFa ? d.tFa || d.t : d.t,
      v: d.close ?? d.v ?? 0,
    }));
  }, [cfg.data, isCandlestick, isFa]);

  const yDomain = useMemo((): [number, number] => {
    if (isCandlestick && chartData.length > 0) {
      let max = -Infinity;
      chartData.forEach((d) => {
        if (d.high !== undefined && d.high > max) max = d.high;
      });
      const padding = max * 0.08;
      return [0, Math.ceil(max + padding)];
    }
    return [0, 100];
  }, [isCandlestick, chartData]);

  const candleColor = useMemo((): string => {
    if (isCandlestick && chartData.length > 0) {
      const last = chartData[chartData.length - 1];
      if (last.close !== undefined && last.open !== undefined) {
        return last.close >= last.open ? "#4ade80" : "#ef4444";
      }
    }
    return cfg.strokeColor || "#4ade80";
  }, [isCandlestick, chartData, cfg.strokeColor]);

  if (isCandlestick) {
    return (
      <div
        onClick={onCardClick}
        className="
          relative flex flex-col
          h-42.5
          rounded-2xl
          dark:border-4 border-2 border-gray-400 dark:border-[#3A3A3A]
          overflow-hidden
          cursor-pointer
          transition-transform duration-300 hover:scale-[1.02]
          bg-white dark:bg-[#2C2C2C]
        "
      >
        <div className="flex justify-between items-start px-4 pt-3 pb-1 z-10">
          <span className="dark:text-white/70 text-[#5B657A] text-sm font-bold leading-snug whitespace-pre-line text-right">
            {isFa ? title.fa : title.en}
          </span>
          <span
            className="text-base font-extrabold"
            style={{ color: valueColor, direction: "ltr" }}
          >
            {value}
          </span>
        </div>

        <div className="flex-1 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 8, right: 4, left: 4, bottom: 8 }}
            >
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={candleColor} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={candleColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="t"
                hide
                padding={{ left: 0, right: 0 }}
                interval={0}
                scale="band"
              />
              <YAxis hide domain={yDomain} />

              <Tooltip
                content={(props) => (
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
                shape={(props: any) => {
                  const { x, width, payload } = props;
                  return (
                    <CandleBar
                      x={x}
                      width={width}
                      payload={payload}
                      yDomain={yDomain}
                    />
                  );
                }}
              />

              <Line
                type="monotone"
                dataKey="v"
                stroke={candleColor}
                strokeWidth={1.2}
                dot={false}
                opacity={0.4}
              />

              <Area
                type="monotone"
                dataKey="v"
                stroke="none"
                fill={`url(#${gradId})`}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onCardClick}
      className="
        relative flex flex-col
        h-42.5
        rounded-2xl
        dark:border-4 border-2 border-[#D6DCE8]
 dark:border-[#3A3A3A]
        overflow-hidden
        cursor-pointer
        transition-transform duration-300 hover:scale-[1.02]
        bg-white dark:bg-[#2C2C2C]
      "
    >
      <div className="flex justify-between items-start px-4 pt-3 pb-1">
        <span className="dark:text-white/70 text-[#5B657A] text-sm font-bold leading-snug whitespace-pre-line text-right">
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
                  // @ts-ignore
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
