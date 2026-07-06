import React from "react";
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
import { CandleTooltip, AreaTooltip } from "./Tooltips";
import type { CandleDataPoint, CardConfig } from "./typesChart";

type Props = {
  cfg: CardConfig;
  lang: "fa" | "en";
};

export const ChartRenderer: React.FC<Props> = ({ cfg, lang }) => {
  if (cfg.chartType === "candlestick") {
    const data = cfg.data.map((d: CandleDataPoint) => ({
      t: d.t,
      open: d.open ?? 0,
      close: d.close ?? 0,
      high: d.high ?? 0,
      low: d.low ?? 0,
    }));

    const min = Math.min(...data.map((d) => d.low));
    const max = Math.max(...data.map((d) => d.high));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="t" />
          <YAxis domain={[min, max]} />

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
            dataKey="close"
            barSize={8}
            shape={(props: any) => {
              const { x, width, payload } = props;

              const isBull = payload.close >= payload.open;
              const color = isBull ? "#4ade80" : "#f87171";

              const cx = x + width / 2;

              return (
                <g>
                  <line
                    x1={cx}
                    x2={cx}
                    y1={payload.high}
                    y2={payload.low}
                    stroke={color}
                    strokeWidth={1.5}
                  />

                  <rect
                    x={x}
                    y={Math.min(payload.open, payload.close)}
                    width={width}
                    height={Math.max(Math.abs(payload.close - payload.open), 2)}
                    fill={color}
                    rx={2}
                  />
                </g>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  const gradId = `grad-${cfg.id}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={cfg.data}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cfg.strokeColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={cfg.strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="t" />
        <YAxis domain={["auto", "auto"]} />

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
          fill={`url(#${gradId})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
