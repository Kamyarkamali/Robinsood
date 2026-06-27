import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Area,
} from "recharts";
import ChartIcon from "../icons/ChartIcon";
import { Settings } from "lucide-react";
import ChartSettingsPanel, {
  useChartSettings,
} from "./common/ChartCustomSettings";

type TimeFrame =
  | "1min"
  | "1min+"
  | "5min"
  | "10min"
  | "30min"
  | "1h"
  | "4h"
  | "12h"
  | "1day";
type Mode = "balance" | "profit";
type SeriesKey =
  | "target"
  | "dailyDrawdown"
  | "totalDrawdown"
  | "balance"
  | "equity";

interface DataPoint {
  index: number;
  time: string;
  target: number;
  dailyDrawdown: number;
  totalDrawdown: number;
  balance: number;
  equity: number;
  equityOpen: number;
  equityHigh: number;
  equityLow: number;
  equityClose: number;
}

function generateData(tf: TimeFrame): DataPoint[] {
  const seed = tf.length * 7 + tf.charCodeAt(0);
  const count = 200;
  const pts: DataPoint[] = [];
  let balance: number = 400;
  for (let i = 0; i < count; i++) {
    const drift = (i / count) * 620 + 380;
    balance = Math.max(
      280,
      drift + Math.sin(i * 0.3 + seed) * 30 + Math.sin(i * 0.07 + seed) * 50,
    );
    const equity = Math.max(260, balance + Math.sin(i * 0.4 + seed + 1) * 25);
    const open = equity,
      close = equity + Math.sin(i * 0.9 + seed) * 18;
    const high =
      Math.max(open, close) + Math.abs(Math.sin(i * 1.3 + seed)) * 15;
    const low = Math.min(open, close) - Math.abs(Math.sin(i * 1.7 + seed)) * 15;
    const h = String(Math.floor(i / 60) % 24).padStart(2, "0");
    const m = String(i % 60).padStart(2, "0");
    pts.push({
      index: i,
      time: `${h}:${m}`,
      target: 960 + Math.sin(i * 0.1 + seed) * 10,
      dailyDrawdown: 500 + Math.sin(i * 0.15 + seed) * 8,
      totalDrawdown: 395 + Math.sin(i * 0.12 + seed) * 6,
      balance,
      equity,
      equityOpen: open,
      equityHigh: high,
      equityLow: low,
      equityClose: close,
    });
  }
  return pts;
}

function computeDomain(
  data: DataPoint[],
  active: Record<SeriesKey, boolean>,
): [number, number] {
  const keys: (keyof DataPoint)[] = [
    ...(active.target ? (["target"] as const) : []),
    ...(active.dailyDrawdown ? (["dailyDrawdown"] as const) : []),
    ...(active.totalDrawdown ? (["totalDrawdown"] as const) : []),
    ...(active.balance ? (["balance"] as const) : []),
    ...(active.equity ? (["equityHigh", "equityLow"] as const) : []),
  ];
  if (!keys.length) return [0, 1000];
  let min = Infinity,
    max = -Infinity;
  for (const d of data)
    for (const k of keys) {
      const v = d[k] as number;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  const pad = (max - min) * 0.08;
  return [Math.floor(min - pad), Math.ceil(max + pad)];
}

function niceTicks([dMin, dMax]: [number, number], count = 4): number[] {
  const range = dMax - dMin;
  const rawStep = range / (count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = Math.ceil(rawStep / mag) * mag;
  const start = Math.ceil(dMin / step) * step;
  const ticks: number[] = [];
  for (let t = start; t <= dMax + 0.001; t += step) ticks.push(Math.round(t));
  return ticks;
}

const CandleBar = ({
  x = 0,
  width = 0,
  payload,
  yDomain,
  chartH,
  settings,
}: any) => {
  if (!payload) return null;
  const {
    equityOpen: eo,
    equityHigh: eh,
    equityLow: el,
    equityClose: ec,
  } = payload;
  const color =
    ec >= eo
      ? settings?.colors?.candleUp || "#a855f7"
      : settings?.colors?.candleDown || "#5b21b6";
  const cx = x + width / 2;
  const [dMin, dMax] = yDomain;
  const toY = (v: number) => chartH - ((v - dMin) / (dMax - dMin)) * chartH;
  const oy = toY(eo),
    cy2 = toY(ec),
    hy = toY(eh),
    ly = toY(el);
  const bw = Math.max(2, Math.min(width * 0.55, 12));
  return (
    <g>
      <line x1={cx} y1={hy} x2={cx} y2={ly} stroke={color} strokeWidth={1} />
      <rect
        x={cx - bw / 2}
        y={Math.min(oy, cy2)}
        width={bw}
        height={Math.max(1, Math.abs(cy2 - oy))}
        fill={color}
        rx={1}
      />
    </g>
  );
};

const ChartTooltip = ({ active, payload, label, isRtl, settings }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className={`bg-[#1a1230] dark:bg-[#1a1230] border border-[#3b1f7a] rounded-xl px-2 py-1.5 text-[10px] sm:text-[11px] shadow-2xl max-w-[200px] sm:max-w-none ${isRtl ? "text-right" : "text-left"}`}
      style={{
        backgroundColor: settings?.colors?.background || "#1a1230",
        borderColor: settings?.colors?.primary || "#3b1f7a",
      }}
    >
      <p
        className="text-[#a78bfa] font-bold mb-0.5 text-[10px] sm:text-[11px]"
        style={{ color: settings?.colors?.secondary || "#a78bfa" }}
      >
        {label}
      </p>
      {payload
        .filter((p: any) => p.dataKey !== "equity")
        .map((p: any) => (
          <p
            key={p.dataKey}
            style={{
              color: p.stroke || p.color || settings?.colors?.text || "#a0a0c0",
            }}
            className="leading-tight text-[9px] sm:text-[10px]"
          >
            {p.name}: <strong>{Number(p.value).toFixed(2)}</strong>
          </p>
        ))}
    </div>
  );
};

const IconBtn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick?: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-150
      bg-[#e8e4f5] bg-transparent
      ${
        active
          ? "text-[#7c3aed] dark:text-[#a78bfa]"
          : "text-[#9090b0] dark:text-[#6b6b99] hover:text-[#7c3aed] dark:hover:text-[#a78bfa]"
      }`}
  >
    {children}
  </button>
);

const TIME_FRAMES: TimeFrame[] = [
  "1min",
  "1min+",
  "5min",
  "10min",
  "30min",
  "1h",
  "4h",
  "12h",
  "1day",
];

const SERIES_CONFIG: { key: SeriesKey; tKey: string; color: string }[] = [
  { key: "target", tKey: "chart.target", color: "#b06aff" },
  { key: "dailyDrawdown", tKey: "chart.dailyDrawdown", color: "#7c3aed" },
  { key: "totalDrawdown", tKey: "chart.totalDrawdown", color: "#9d4edd" },
  { key: "balance", tKey: "chart.balance", color: "#c77dff" },
  { key: "equity", tKey: "chart.equity", color: "#6d28d9" },
];

export default function TradingChart() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const {
    settings,
    setSettings,
    isOpen: settingsOpen,
    openSettings: openSettingsPanel,
    closeSettings: closeSettingsPanel,
    resetSettings,
  } = useChartSettings("tradingChartSettings");

  const [mode, setMode] = useState<Mode>("balance");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1min");
  const [activeSeries, setActiveSeries] = useState<Record<SeriesKey, boolean>>({
    target: true,
    dailyDrawdown: true,
    totalDrawdown: true,
    balance: true,
    equity: true,
  });

  const showGrid = settings.display.showGrid;

  const allData = useMemo(() => generateData(timeFrame), [timeFrame]);
  const TOTAL = allData.length;
  const MIN_VIS = 20;

  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 640 ? 50 : 80,
  );
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const clampedOff = Math.max(0, Math.min(scrollOffset, TOTAL - visibleCount));
  const visibleData = allData.slice(clampedOff, clampedOff + visibleCount);

  const yDomain = useMemo(
    () => computeDomain(visibleData, activeSeries),
    [visibleData, activeSeries],
  );
  const yTicks = useMemo(
    () => niceTicks(yDomain, settings.axis.tickCount),
    [yDomain, settings.axis.tickCount],
  );

  const [chartHeight, setChartHeight] = useState<number>(320);

  useEffect(() => {
    const updateHeight = () => {
      const w = window.innerWidth;
      if (w < 480) setChartHeight(250);
      else if (w < 640) setChartHeight(280);
      else if (w < 768) setChartHeight(320);
      else if (w < 1024) setChartHeight(380);
      else setChartHeight(420);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      if (w < 480) setVisibleCount(30);
      else if (w < 640) setVisibleCount(40);
      else if (w < 768) setVisibleCount(50);
      else if (w < 1024) setVisibleCount(60);
      else setVisibleCount(80);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const toggle = (key: SeriesKey) =>
    setActiveSeries((p) => ({ ...p, [key]: !p[key] }));

  // Zoom
  const wrapRef = useRef<HTMLDivElement>(null);
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      setVisibleCount((p) =>
        Math.max(
          MIN_VIS,
          Math.min(TOTAL, Math.round(p * (e.deltaY > 0 ? 1.12 : 0.88))),
        ),
      );
    },
    [TOTAL],
  );
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const dragging = useRef(false),
    dragX = useRef(0),
    dragOff = useRef(0);
  const onMD = (e: React.MouseEvent) => {
    dragging.current = true;
    dragX.current = e.clientX;
    dragOff.current = clampedOff;
  };
  const onMM = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const pxPerBar = (wrapRef.current?.clientWidth || 800) / visibleCount;
    const delta = Math.round(-(e.clientX - dragX.current) / pxPerBar);
    setScrollOffset(
      Math.max(0, Math.min(TOTAL - visibleCount, dragOff.current + delta)),
    );
  };
  const onMU = () => {
    dragging.current = false;
  };

  const tX = useRef(0),
    tOff = useRef(0);
  const onTS = (e: React.TouchEvent) => {
    tX.current = e.touches[0].clientX;
    tOff.current = clampedOff;
  };
  const onTM = (e: React.TouchEvent) => {
    const pxPerBar = (wrapRef.current?.clientWidth || 400) / visibleCount;
    const delta = Math.round(-(e.touches[0].clientX - tX.current) / pxPerBar);
    setScrollOffset(
      Math.max(0, Math.min(TOTAL - visibleCount, tOff.current + delta)),
    );
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="
    w-full
    max-w-full
    xl:max-w-325
    mx-auto
    bg-white
    border-[#e0d9f5]
    rounded-2xl sm:rounded-3xl lg:rounded-4xl
    border-2 sm:border-3 lg:border-5
    bg-linear-to-t
    dark:from-[#282828] dark:to-[#2a2929]
    dark:border-[#353535]
    dark:bg-[#242424]
    p-2 sm:p-3 lg:p-5
    flex flex-col gap-2 sm:gap-3
    overflow-hidden
  "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div
          className={`flex items-center gap-1.5 sm:gap-2 flex-wrap ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <div className="flex bg-[#f0ecfc] rounded-xl dark:bg-[#454242] p-0.5 sm:p-1 gap-0.5 sm:gap-1">
            {(["balance", "profit"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 sm:px-4 py-1 sm:py-1.5 dark:text-[#F1F1F1] text-gray-500 rounded-[1755.43px] cursor-pointer font-medium text-[10px] sm:text-[14px] transition-all duration-200
                  ${
                    mode === m
                      ? "bg-linear-to-b from-[#C4C4C426] to-[#EBEBEB1A] dark:text-white text-gray-800 shadow-md"
                      : "bg-transparent"
                  }`}
              >
                {t(`chart.${m}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <IconBtn
              onClick={() =>
                setSettings({
                  ...settings,
                  display: {
                    ...settings.display,
                    showGrid: !settings.display.showGrid,
                  },
                })
              }
              active={showGrid}
              title={t("chart.toggleGrid")}
            >
              <ChartIcon />
            </IconBtn>

            <IconBtn
              onClick={() =>
                setVisibleCount((v) => Math.min(TOTAL, Math.round(v * 1.4)))
              }
              title={t("chart.zoomOut")}
            >
              <MdOutlineZoomOut size={23} />
            </IconBtn>

            <IconBtn
              onClick={() =>
                setVisibleCount((v) => Math.max(MIN_VIS, Math.round(v * 0.7)))
              }
              title={t("chart.zoomIn")}
            >
              <MdOutlineZoomIn size={23} />
            </IconBtn>

            <button
              onClick={openSettingsPanel}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-150 bg-[#e8e4f5] bg-transparent text-[#7c3aed] dark:text-[#a78bfa] hover:bg-purple-100 dark:hover:bg-purple-900/30"
              title="تنظیمات چارت"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        <div
          className={`flex items-center  gap-0.5 sm:gap-1 dark:dark:bg-[#454242] p-3 rounded-2xl overflow-x-auto sm:pb- sm:flex-wrap ${isRtl ? "flex-row-reverse" : ""}`}
          style={{ scrollbarWidth: "none" }}
        >
          {TIME_FRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`shrink-0 px-1.5 sm:px-3  py-0.5 sm:py-1.5 rounded-[1024px] border-none cursor-pointer text-[8px] sm:text-[13px] font-medium transition-all duration-150 whitespace-nowrap
                ${
                  timeFrame === tf
                    ? "bg-linear-to-b dark:from-[#C4C4C426] dark:to-[#EBEBEB1A] text-[#7c3aed] dark:text-[#c4b5fd]"
                    : "bg-transparent dark:text-[#ffffff] text-gray-500"
                }`}
            >
              {t(`timeframes.${tf}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <div
          ref={wrapRef}
          onMouseDown={onMD}
          onMouseMove={onMM}
          onMouseUp={onMU}
          onMouseLeave={onMU}
          onTouchStart={onTS}
          onTouchMove={onTM}
          className="
    w-full
    select-none
    cursor-grab
    active:cursor-grabbing
    relative
    min-h-50
    sm:min-h-70
    lg:min-h-95
  "
          style={{ height: chartHeight }}
        >
          <ResponsiveContainer width="95%" height="100%">
            <ComposedChart
              data={visibleData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={settings.colors.primary}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="70%"
                    stopColor={settings.colors.primary}
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="100%"
                    stopColor={settings.colors.primary}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="balanceStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={settings.colors.primary} />
                  <stop offset="50%" stopColor={settings.colors.secondary} />
                  <stop offset="100%" stopColor={settings.colors.accent} />
                </linearGradient>
              </defs>

              {settings.display.showGrid && (
                <CartesianGrid
                  strokeDasharray="5 4"
                  stroke={settings.colors.grid}
                  className="dark:[stroke:#666D80]"
                  strokeWidth={settings.lineWidths.grid}
                />
              )}

              {settings.axis.showXAxis && (
                <XAxis
                  dataKey="time"
                  tick={{
                    fill: settings.colors.text,
                    fontSize: Math.min(
                      settings.sizes.fontSize,
                      window.innerWidth < 480
                        ? 8
                        : window.innerWidth < 640
                          ? 9
                          : settings.sizes.fontSize,
                    ),
                  }}
                  axisLine={{ stroke: settings.colors.grid }}
                  tickLine={false}
                  interval={Math.ceil(
                    visibleCount /
                      Math.min(
                        settings.axis.tickCount,
                        window.innerWidth < 480
                          ? 3
                          : window.innerWidth < 640
                            ? 4
                            : settings.axis.tickCount,
                      ),
                  )}
                />
              )}

              {settings.axis.showYAxis && (
                <YAxis
                  domain={yDomain}
                  ticks={yTicks}
                  tick={{
                    fill: settings.colors.text,
                    fontSize: Math.min(
                      settings.sizes.fontSize,
                      window.innerWidth < 480
                        ? 8
                        : window.innerWidth < 640
                          ? 9
                          : settings.sizes.fontSize,
                    ),
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={
                    window.innerWidth < 480
                      ? 35
                      : window.innerWidth < 640
                        ? 45
                        : 60
                  }
                  tickFormatter={(v) => {
                    if (v >= 1000) return (v / 1000).toFixed(0) + "k";
                    return v.toLocaleString();
                  }}
                  orientation={isRtl ? "right" : "left"}
                />
              )}

              {settings.display.showTooltip && (
                <Tooltip
                  content={<ChartTooltip isRtl={isRtl} settings={settings} />}
                />
              )}

              {settings.display.showAreas && activeSeries.balance && (
                <Area
                  dataKey="balance"
                  name={t("chart.balance")}
                  stroke="url(#balanceStroke)"
                  strokeWidth={Math.min(
                    settings.lineWidths.main,
                    window.innerWidth < 480
                      ? 1.5
                      : window.innerWidth < 640
                        ? 2
                        : settings.lineWidths.main,
                  )}
                  fill="url(#balanceGrad)"
                  dot={false}
                  activeDot={{
                    r: window.innerWidth < 480 ? 2 : 4,
                    fill: settings.colors.secondary,
                    stroke: settings.colors.accent,
                    strokeWidth: 2,
                  }}
                  style={
                    settings.effects.glow
                      ? { filter: "drop-shadow(0 0 5px #a855f766)" }
                      : {}
                  }
                />
              )}

              {activeSeries.target && (
                <Line
                  dataKey="target"
                  name={t("chart.target")}
                  stroke={settings.colors.accent}
                  dot={false}
                  strokeWidth={Math.min(
                    settings.lineWidths.secondary,
                    window.innerWidth < 480
                      ? 1
                      : window.innerWidth < 640
                        ? 1.2
                        : settings.lineWidths.secondary,
                  )}
                  strokeDasharray="5 3"
                  style={
                    settings.effects.glow
                      ? { filter: "drop-shadow(0 0 3px #b06aff55)" }
                      : {}
                  }
                />
              )}

              {activeSeries.dailyDrawdown && (
                <Line
                  dataKey="dailyDrawdown"
                  name={t("chart.dailyDrawdown")}
                  stroke={settings.colors.primary}
                  dot={false}
                  strokeWidth={Math.min(
                    settings.lineWidths.secondary,
                    window.innerWidth < 480
                      ? 1
                      : window.innerWidth < 640
                        ? 1.2
                        : settings.lineWidths.secondary,
                  )}
                  strokeDasharray="5 3"
                />
              )}

              {activeSeries.totalDrawdown && (
                <Line
                  dataKey="totalDrawdown"
                  name={t("chart.totalDrawdown")}
                  stroke={settings.colors.secondary}
                  dot={false}
                  strokeWidth={Math.min(
                    settings.lineWidths.secondary,
                    window.innerWidth < 480
                      ? 1
                      : window.innerWidth < 640
                        ? 1.2
                        : settings.lineWidths.secondary,
                  )}
                  strokeDasharray="5 3"
                />
              )}

              {settings.display.showCandles && activeSeries.equity && (
                <Bar
                  dataKey="equity"
                  name={t("chart.equity")}
                  barSize={Math.max(
                    window.innerWidth < 480
                      ? 2
                      : window.innerWidth < 640
                        ? 3
                        : settings.sizes.barSize,
                    Math.round(800 / visibleCount),
                  )}
                  shape={(props: any) => (
                    <CandleBar
                      {...props}
                      yDomain={yDomain}
                      chartH={chartHeight - 20}
                      settings={settings}
                    />
                  )}
                >
                  {visibleData.map((_, i) => (
                    <Cell key={i} fill={settings.colors.primary} />
                  ))}
                </Bar>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* راهنما */}
      <p className="text-center text-[8px] sm:text-[9px] dark:text-white text-[#c0b8d8] -mt-0.5">
        {isRtl
          ? `اسکرول برای زوم · درگ برای حرکت · ${visibleCount}/${TOTAL} کندل`
          : `scroll to zoom · drag to pan · ${visibleCount}/${TOTAL} bars`}
      </p>

      {settings.display.showLegend && (
        <div
          className={`flex flex-wrap justify-center gap-x-2 sm:gap-x-5 gap-y-1 sm:gap-y-2 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          {SERIES_CONFIG.map(({ key, tKey, color }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="flex items-center gap-1 sm:gap-1.5 bg-transparent border-none cursor-pointer rounded-lg px-1 sm:px-1.5 py-0.5 sm:py-1 transition-opacity duration-200"
              style={{ opacity: activeSeries[key] ? 1 : 0.3 }}
            >
              <span
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 transition-shadow duration-200"
                style={{
                  background: color,
                  boxShadow: activeSeries[key] ? `0 0 7px ${color}` : "none",
                }}
              />
              <span
                className="text-[9px] sm:text-xs font-semibold transition-colors duration-200 whitespace-nowrap"
                style={{ color: activeSeries[key] ? color : "#b0a8cc" }}
              >
                {t(tKey)}
              </span>
            </button>
          ))}
        </div>
      )}

      <ChartSettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={settingsOpen}
        onClose={closeSettingsPanel}
        onReset={resetSettings}
      />
    </div>
  );
}
