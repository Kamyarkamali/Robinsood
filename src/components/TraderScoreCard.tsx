import { useTranslation } from "react-i18next";
import type { RadarProps } from "../types/interfaces";
import { traderScoreData } from "../data/fakeData";

interface GaugeProps {
  value: number; // 0–100
  color: "green" | "red";
  size?: number;
}

function Gauge({ value, color, size = 100 }: GaugeProps) {
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

  // Needle
  const needleAngle = startAngle + (value / 100) * sweep;
  const nl = 28;
  const nx = cx + nl * Math.cos(toRad(needleAngle));
  const ny = cy + nl * Math.sin(toRad(needleAngle));

  const trackColor = color === "green" ? "#1a3320" : "#3a1515";
  const fillColor = color === "green" ? "#22c55e" : "#ef4444";
  const glowColor = color === "green" ? "#22c55e" : "#ef4444";
  const numColor = color === "green" ? "#22c55e" : "#ef4444";

  // Light mode variants
  const trackColorL = color === "green" ? "#dcfce7" : "#fee2e2";
  const fillColorL = color === "green" ? "#16a34a" : "#dc2626";

  return (
    <svg
      viewBox="0 0 100 72"
      width={size}
      height={size * 0.72}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id={`glow-${color}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <path
        d={arcPath(startAngle, startAngle + sweep, r)}
        fill="none"
        className="dark:opacity-100 opacity-0"
        stroke={trackColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={arcPath(startAngle, startAngle + sweep, r)}
        fill="none"
        className="dark:opacity-0 opacity-100"
        stroke={trackColorL}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {value > 0 && (
        <path
          d={arcPath(startAngle, fillTo, r)}
          fill="none"
          className="dark:opacity-100 opacity-0"
          stroke={fillColor}
          strokeWidth="7"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
      )}
      {value > 0 && (
        <path
          d={arcPath(startAngle, fillTo, r)}
          fill="none"
          className="dark:opacity-0 opacity-100"
          stroke={fillColorL}
          strokeWidth="7"
          strokeLinecap="round"
        />
      )}

      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        strokeWidth="2"
        strokeLinecap="round"
        className="dark:stroke-white stroke-gray-700"
      />
      <circle
        cx={cx}
        cy={cy}
        r="3.5"
        className="dark:fill-white fill-gray-700"
      />

      <text
        x={cx}
        y={68}
        textAnchor="middle"
        fontSize="15"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        fill={numColor}
      >
        {value}
      </text>
    </svg>
  );
}

function RadarChart({ win, profitFactor, avgWinLoss, labels }: RadarProps) {
  const cx = 100,
    cy = 100,
    maxR = 75;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const axes = [
    { label: labels.win, angle: -90, value: win / 100 },
    { label: labels.profit, angle: 30, value: profitFactor / 100 },
    { label: labels.avg, angle: 150, value: avgWinLoss / 100 },
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
    <svg viewBox="0 0 200 200" width="200" height="200">
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
            className="dark:stroke-[#2a2050] stroke-[#e2d9f5]"
            strokeWidth="1"
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
        strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 0 6px #a855f766)" }}
      />

      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#a855f7"
          stroke="#e9d5ff"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 4px #a855f7)" }}
        />
      ))}

      {axes.map((a, i) => {
        const lp = point(a.angle, maxR + 16);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontFamily="system-ui, sans-serif"
            className="dark:fill-[#8b8bb0] fill-[#6b7280]"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
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
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none"
        style={{ color: color ?? "inherit" }}
      >
        {value}
      </span>
      <span className="text-[10px] sm:text-xs dark:text-[#6b6b99] text-gray-500 text-center leading-tight">
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
    <div className="flex flex-col items-center gap-1 flex-1 min-w-20">
      <span className="text-[11px] sm:text-xs dark:text-[#8888aa] text-gray-500 text-center font-medium leading-tight">
        {label}
      </span>
      <Gauge value={value} color={color} size={110} />
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
      dir={isRtl ? "rtl" : "ltr"}
      className="
        w-full max-w-325 mx-auto
        grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3
        bg-white dark:bg-[#111128]
        border border-[#e0d9f5] dark:border-[#231a48]
        rounded-2xl
        shadow-lg dark:shadow-[0_8px_40px_rgba(80,20,180,0.2)]
        p-4 sm:p-5
        font-sans
      "
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-end justify-around gap-2 flex-wrap">
          {gauges.map((g) => (
            <GaugeItem
              key={g.key}
              label={t(`score.${g.key}`)}
              value={g.value}
              color={g.color}
            />
          ))}
        </div>

        <div className="h-px dark:bg-[#1e1e42] bg-[#ede9fe]" />

        <div className="flex items-center justify-around gap-3 flex-wrap px-2">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xl sm:text-2xl font-extrabold tracking-widest dark:text-white text-gray-800 leading-none">
              {d.stats.bestSymbol}
            </span>
            <span className="text-[10px] sm:text-xs dark:text-[#6b6b99] text-gray-500 text-center">
              {t("score.bestSymbol")}
            </span>
          </div>

          <StatItem
            label={t("score.bestTrade")}
            value={`+${d.stats.bestTrade}`}
            color="#22c55e"
          />

          <StatItem
            label={t("score.worstTrade")}
            value={`-${Math.abs(d.stats.worstTrade)}`}
            color="#ef4444"
          />

          {/* Total lots */}
          <StatItem label={t("score.totalLots")} value={d.stats.totalLots} />
        </div>
      </div>

      <div
        className="
        flex flex-col items-center justify-center gap-2
        lg:border-s lg:dark:border-[#1e1e42] lg:border-[#ede9fe]
        lg:ps-5 pt-3 lg:pt-0
        min-w-55
      "
      >
        <span className="text-sm font-bold dark:text-[#c4b5fd] text-[#7c3aed]">
          {t("score.radarTitle")}
        </span>

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

        <div
          className={`flex items-center gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <span className="text-xs dark:text-[#8888aa] text-gray-500">
            {t("score.yourScore")} =
          </span>
          <span
            className="text-lg font-extrabold text-[#22c55e]"
            style={{ direction: "ltr" }}
          >
            {d.totalScore}
          </span>
        </div>
      </div>
    </div>
  );
}
