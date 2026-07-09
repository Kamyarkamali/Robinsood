import { useTranslation } from "react-i18next";
import type { RadarProps } from "../types/interfaces";
import { traderScoreData } from "../data/fakeData";
import { useState } from "react";

interface GaugeProps {
  value: number;
  color: "green" | "red";
  size?: number;
}

function Gauge({ value, color, size = 120 }: GaugeProps) {
  const r = 38;
  const cx = 50,
    cy = 50;
  const startAngle = 210;
  const sweep = 240;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (from: number, to: number, radius: number) => {
    const s = {
      x: cx + radius * Math.cos(toRad(from)),
      y: cy + radius * Math.sin(toRad(from)),
    };
    const e = {
      x: cx + radius * Math.cos(toRad(to)),
      y: cy + radius * Math.sin(toRad(to)),
    };
    const large = to - from > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const fillTo = startAngle + (value / 100) * sweep;
  const needleAngle = startAngle + (value / 100) * sweep;
  const nl = 28;
  const nx = cx + nl * Math.cos(toRad(needleAngle));
  const ny = cy + nl * Math.sin(toRad(needleAngle));

  const trackColor = color === "green" ? "#1a3320" : "#3a1515";
  const fillColor = color === "green" ? "#22c55e" : "#ef4444";
  const glowColor = color === "green" ? "#22c55e" : "#ef4444";
  const numColor = color === "green" ? "#22c55e" : "#ef4444";
  const trackColorL = color === "green" ? "#dcfce7" : "#fee2e2";
  const fillColorL = color === "green" ? "#16a34a" : "#dc2626";

  const gaugeSize = typeof size === "number" ? Math.min(size, 160) : 120;

  return (
    <svg
      viewBox="0 0 100 72"
      width={gaugeSize}
      height={gaugeSize * 0.72}
      style={{ overflow: "visible", maxWidth: "100%" }}
      className="shrink-0"
    >
      <defs>
        <filter id={`glow-${color}`}>
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <path
        d={arcPath(startAngle, startAngle + sweep, r)}
        fill="none"
        className="dark:opacity-100 opacity-0"
        stroke={trackColor}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={arcPath(startAngle, startAngle + sweep, r)}
        fill="none"
        className="dark:opacity-0 opacity-100"
        stroke={trackColorL}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {value > 0 && (
        <path
          d={arcPath(startAngle, fillTo, r)}
          fill="none"
          className="dark:opacity-100 opacity-0"
          stroke={fillColor}
          strokeWidth="8"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
        />
      )}
      {value > 0 && (
        <path
          d={arcPath(startAngle, fillTo, r)}
          fill="none"
          className="dark:opacity-0 opacity-100"
          stroke={fillColorL}
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}

      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="dark:stroke-white stroke-gray-700"
      />
      <circle cx={cx} cy={cy} r="4" className="dark:fill-white fill-gray-700" />

      <text
        x={cx}
        y={68}
        textAnchor="middle"
        fontSize="17"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        fill={numColor}
      >
        {value}
      </text>
    </svg>
  );
}

function RadarChart({ win, profitFactor, avgWinLoss }: RadarProps) {
  const { i18n } = useTranslation();

  const [hovered, setHovered] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null);

  const isFa = i18n.language === "fa";

  const cx = 100;
  const cy = 100;
  const maxR = 75;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const axes = [
    {
      label: isFa ? ["نسبت سوددهی"] : ["Win"],
      angle: -90,
      value: win / 100,
      rawValue: win,
    },
    {
      label: isFa ? ["ثبات معامله گری"] : ["Profit"],
      angle: 30,
      value: profitFactor / 100,
      rawValue: profitFactor,
    },
    {
      label: isFa ? ["درک چارت"] : ["Avg", "Win / Loss"],
      angle: 150,
      value: avgWinLoss / 100,
      rawValue: avgWinLoss,
    },
  ];

  const point = (angle: number, r: number) => ({
    x: cx + r * Math.cos(toRad(angle)),
    y: cy + r * Math.sin(toRad(angle)),
  });

  const rings = [0.33, 0.66, 1];

  const pts = axes.map((a) => point(a.angle, a.value * maxR));
  const polygon = pts.map((p) => `${p.x},${p.y}`).join(" ");

  const axisEnds = axes.map((a) => point(a.angle, maxR));

  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[430px] xl:max-w-[460px] mx-auto flex items-center justify-center">
      <svg
        viewBox="-40 -40 280 280"
        width="100%"
        height="100%"
        className="aspect-square"
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {rings.map((r, i) => {
          const gpts = axes.map((a) => point(a.angle, r * maxR));

          return (
            <polygon
              key={i}
              points={gpts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              className="dark:stroke-[#474444] stroke-[#e2d9f5]"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          );
        })}

        {axisEnds.map((ep, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={ep.x}
            y2={ep.y}
            className="dark:stroke-[#2a2050] stroke-[#d4c9f0]"
            strokeWidth="1"
          />
        ))}

        <polygon
          points={polygon}
          fill="url(#radarGrad)"
          stroke="#a855f7"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 8px #a855f766)",
          }}
        />

        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hovered?.label === axes[i].label.join(" ") ? 8 : 5}
            fill="#a855f7"
            stroke="#e9d5ff"
            strokeWidth="2.5"
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() =>
              setHovered({
                x: p.x,
                y: p.y,
                label: axes[i].label.join(" "),
                value: axes[i].rawValue,
              })
            }
            onClick={() =>
              setHovered({
                x: p.x,
                y: p.y,
                label: axes[i].label.join(" "),
                value: axes[i].rawValue,
              })
            }
            style={{
              filter:
                hovered?.label === axes[i].label.join(" ")
                  ? "drop-shadow(0 0 14px #a855f7)"
                  : "drop-shadow(0 0 4px #a855f7)",
            }}
          />
        ))}

        {axes.map((a, i) => {
          const lp = point(a.angle, maxR + 24);

          return (
            <text
              key={i}
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              className="dark:fill-white fill-gray-500"
              fontSize="12"
              fontWeight="500"
            >
              {a.label.map((line, idx) => (
                <tspan key={idx} x={lp.x} dy={idx === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>

      {hovered && (
        <div
          className="
            absolute
            z-30
            min-w-[90px]
            sm:min-w-[110px]
            rounded-xl
            border
            border-purple-500/40
            bg-[#1b132c]/95
            backdrop-blur-xl
            shadow-xl
            px-3
            py-2
            text-center
            pointer-events-none
          "
          style={{
            left: `${(hovered.x / 200) * 100}%`,
            top: `${(hovered.y / 200) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          <div className="text-[10px] sm:text-xs font-bold text-purple-300">
            {hovered.label}
          </div>

          <div className="text-sm sm:text-base font-extrabold text-white">
            {hovered.value}
            <span className="text-xs text-purple-300 ml-1">%</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-0 sm:gap-2">
      <span
        className="text-[13px] sm:text-sm md:text-2xl lg:text-lg bg-[#303030] rounded-xl shadow-2xl px-2 p-3 sm:p-3 font-extrabold tracking-tight leading-none w-full text-center min-w-[50px] sm:min-w-[60px]"
        style={{ color: color ?? "inherit" }}
      >
        {value}
      </span>
      <span className="text-[13px]  sm:text-[13px] md:text-2xl lg:text-sm font-normal dark:text-[#ffffff] text-gray-500 text-center px-1">
        {label}
      </span>
    </div>
  );
}

function GaugeItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "red";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 md:gap-3 p-5 lg:p-0 ">
      <span className="text-[11px] xs:text-[12px] sm:text-[13px] lg:text-[16px] font-normal dark:text-[#ffffff] text-gray-500 text-center leading-tight">
        {label}
      </span>
      <Gauge
        value={value}
        color={color}
        size={
          typeof window !== "undefined"
            ? window.innerWidth < 480
              ? 80
              : window.innerWidth < 640
                ? 93
                : window.innerWidth < 768
                  ? 100
                  : window.innerWidth < 1024
                    ? 110
                    : window.innerWidth < 1280
                      ? 120
                      : 140
            : 120
        }
      />
    </div>
  );
}

export default function TraderScoreCard() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const d = traderScoreData;

  const gauges = [
    {
      key: "hopeOfSuccess",
      value: d.gauges.hopeOfSuccess,
      color: "green" as const,
    },
    { key: "greedIndex", value: d.gauges.greedIndex, color: "red" as const },
    {
      key: "chartUnderstanding",
      value: d.gauges.chartUnderstanding,
      color: "green" as const,
    },
    {
      key: "tradingSystem",
      value: d.gauges.tradingSystem,
      color: "green" as const,
    },
  ];

  return (
    <div
      dir={isRtl ? "ltr" : "rtl"}
      className="
        w-full
        max-w-8xl
        mx-auto
        px-1
        xs:px-2
        sm:px-4
        grid
        grid-cols-1
        lg:grid-cols-[1fr_300px]
        xl:grid-cols-[1fr_320px]
        2xl:grid-cols-[1fr_380px]
        gap-2
        xs:gap-3
        sm:gap-4
        md:gap-6
        items-stretch
        
      "
    >
      <div className="flex flex-col gap-3">
        <div className="flex step-test34 flex-col gap-2 xs:gap-3 sm:gap-4">
          <div
            className="
            bg-white
            dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]
            rounded-2xl
            xs:rounded-2xl
            sm:rounded-3xl
            border
            sm:border-2
            lg:border-4
            border-gray-200
            dark:border-[#303030]
            p-2
            xs:p-3
            sm:p-4
            md:p-6
            shadow-lg
            hover:shadow-xl
            transition-shadow
            duration-300
          "
          >
            <div className="flex flex-col gap-4 h-full justify-between ">
              <div
                className="bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]
    rounded-2xl border-4 border-gray-200 dark:border-[#303030]
    p-4 md:p-6 shadow-lg"
              >
                <div className="grid grid-cols-2 step-test35 p-3 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {gauges.map((g) => (
                    <GaugeItem
                      key={g.key}
                      label={t(`score.${g.key}`)}
                      value={g.value}
                      color={g.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]
    rounded-2xl border-4 border-gray-200 dark:border-[#303030]
    p-4 md:p-6 shadow-lg"
        >
          <div className="grid step-test36 grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <StatItem
              label={t("score.bestSymbol")}
              value={d.stats.bestSymbol}
            />
            <StatItem
              label={t("score.bestTrade")}
              value={`+$ ${d.stats.bestTrade}`}
              color="#22c55e"
            />
            <StatItem
              label={t("score.worstTrade")}
              value={`-$ ${Math.abs(d.stats.worstTrade)}`}
              color="#ef4444"
            />
            <StatItem
              color="#22c55e"
              label={t("score.totalLots")}
              value={`+$ لات${d.stats.totalLots}`}
            />
          </div>
        </div>
      </div>

      <div
        className="
          bg-white
          dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030]  rounded-2xl
          border-4
          step-test37
          max-w-7xl
          dark:border-[#3C3C3C] border-gray-300 
          p-2
          xs:p-3
          sm:p-4
          md:p-5
          flex
          flex-col
          items-center
          justify-center
          shadow-lg
          hover:shadow-xl
          transition-shadow
          duration-300
          gap-0.5
          xs:gap-1
          sm:gap-2
        "
      >
        <span className="text-xs xs:text-sm sm:text-base text-right w-full font-bold dark:text-[#ffffff] text-[#7c3aed]">
          {t("score.radarTitle")}
        </span>

        <div className="flex items-center justify-center w-full">
          <RadarChart
            win={d.radar.winPercent}
            profitFactor={d.radar.profitFactor}
            avgWinLoss={d.radar.avgWinLoss}
            labels={{
              win: t("score.winPercent"),
              profit: t("score.profitFactor"),
              avg: t("score.avgWinLoss"),
            }}
            isRtl={isRtl}
          />
        </div>

        <div className="text-center mt-0.5 xs:mt-1">
          <span className="text-[10px] xs:text-xs sm:text-sm lg:text-[18px] font-bold dark:text-[#ffffff] text-gray-500">
            {t("chart3.socer")} =
          </span>

          <span
            className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-[#22c55e] ml-1"
            style={{ direction: "ltr" }}
          >
            {d.totalScore}
          </span>
        </div>
      </div>
    </div>
  );
}
