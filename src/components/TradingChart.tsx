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
import { Settings } from "lucide-react";
import ChartSettingsPanel, {
  useChartSettings,
} from "./common/ChartCustomSettings";
import i18next from "i18next";

type TimeFrame =
  | "1min"
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
  fullDate?: Date;
}

function getTimeStep(tf: TimeFrame): number {
  const steps: Record<TimeFrame, number> = {
    "1min": 60 * 1000,
    "5min": 5 * 60 * 1000,
    "10min": 10 * 60 * 1000,
    "30min": 30 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "4h": 4 * 60 * 60 * 1000,
    "12h": 12 * 60 * 60 * 1000,
    "1day": 24 * 60 * 60 * 1000,
  };
  return steps[tf] || 60 * 1000;
}

function getTickCount(tf: TimeFrame): number {
  const counts: Record<TimeFrame, number> = {
    "1min": 12,
    "5min": 8,
    "10min": 6,
    "30min": 5,
    "1h": 4,
    "4h": 3,
    "12h": 2,
    "1day": 2,
  };
  return counts[tf] || 6;
}

function getXTicks(data: DataPoint[], tf: TimeFrame): string[] {
  if (data.length === 0) return [];
  const tickCount = getTickCount(tf);
  const step = Math.max(1, Math.floor(data.length / tickCount));
  return data
    .filter((_, index) => index % step === 0 || index === data.length - 1)
    .map((d) => d.time);
}

function formatTimeByFrame(
  value: string,
  index: number,
  tf: TimeFrame,
  data: DataPoint[],
): string {
  if (index === 0 || index === data.length - 1) {
    return value;
  }

  switch (tf) {
    case "1min":
    case "5min":
    case "10min":
    case "30min":
      return value;
    case "1h":
    case "4h":
    case "12h":
      return value.split(":")[0] + ":00";
    case "1day":
      return value;
    default:
      return value;
  }
}

function generateData(tf: TimeFrame): DataPoint[] {
  const seed = tf.length * 7 + tf.charCodeAt(0);

  // تعداد نقاط ثابت برای همه تایم‌فریم‌ها
  const COUNT = 200; // ← ثابت
  const pts: DataPoint[] = [];
  let balance: number = 400;
  const timeStep = getTimeStep(tf);

  // شروع از تاریخ امروز - 30 روز
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(9, 30, 0, 0);

  for (let i = 0; i < COUNT; i++) {
    const date = new Date(startDate.getTime() + i * timeStep);

    // شبیه‌سازی حرکات قیمت با نویز بیشتر برای دقیقه‌ها
    const noise = tf.includes("min") ? 0.5 : 0.2;
    const drift = (i / COUNT) * 620 + 380;
    balance = Math.max(
      280,
      drift +
        Math.sin(i * 0.3 + seed) * 30 * noise +
        Math.sin(i * 0.07 + seed) * 50 * noise +
        (tf.includes("min") ? (Math.random() - 0.5) * 20 : 0),
    );

    const equity = Math.max(260, balance + Math.sin(i * 0.4 + seed + 1) * 25);
    const open = equity;
    const close = equity + Math.sin(i * 0.9 + seed) * 18 * noise;
    const high =
      Math.max(open, close) + Math.abs(Math.sin(i * 1.3 + seed)) * 15 * noise;
    const low =
      Math.min(open, close) - Math.abs(Math.sin(i * 1.7 + seed)) * 15 * noise;

    // فرمت زمان بر اساس تایم‌فریم
    let timeString = "";
    if (tf === "1day") {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      timeString = `${month}/${day}`;
    } else if (tf === "1h" || tf === "4h" || tf === "12h") {
      const h = String(date.getHours()).padStart(2, "0");
      timeString = `${h}:00`;
    } else {
      const h = String(date.getHours()).padStart(2, "0");
      const m = String(date.getMinutes()).padStart(2, "0");
      timeString = `${h}:${m}`;
    }

    pts.push({
      index: i,
      time: timeString,
      fullDate: date,
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

function niceTicks([dMin, dMax]: [number, number], count = 6): number[] {
  const range = dMax - dMin;
  if (range === 0) return [dMin];

  const rawStep = range / (count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = Math.ceil(rawStep / mag) * mag;
  const finalStep = Math.max(1, step);

  const start = Math.floor(dMin / finalStep) * finalStep;
  const ticks: number[] = [];
  for (let t = start; t <= dMax + finalStep * 0.001; t += finalStep) {
    ticks.push(Math.round(t * 100) / 100);
  }
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

  const fullDate = payload[0]?.payload?.fullDate;
  const timeLabel = label || "";

  let dateString = "";
  let timeString = timeLabel;

  if (fullDate) {
    const date = new Date(fullDate);
    if (isRtl) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      dateString = `${year}/${month}/${day}`;
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      timeString = `${hours}:${minutes}`;
    } else {
      dateString = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  const equityPayload = payload.find((p: any) => p.dataKey === "equity");
  const equityData = equityPayload?.payload;

  let equityOpen = equityData?.equityOpen || 0;
  let equityHigh = equityData?.equityHigh || 0;
  let equityLow = equityData?.equityLow || 0;
  let equityClose = equityData?.equityClose || 0;

  const ensureFiveDigits = (num: number): number => {
    if (num < 10000) {
      return 10000 + (num % 90000);
    }
    if (num > 99999) {
      return 10000 + (num % 90000);
    }
    return num;
  };

  equityOpen = ensureFiveDigits(equityOpen);
  equityHigh = ensureFiveDigits(equityHigh);
  equityLow = ensureFiveDigits(equityLow);
  equityClose = ensureFiveDigits(equityClose);

  const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString("en-US");
  };

  return (
    <div
      className={`
        flex flex-col gap-1 
        backdrop-blur-2xl 
        border border-[#4a2a7a]/50 
        rounded-xl sm:rounded-2xl 
        px-2 sm:px-4 py-2 sm:py-3 
        shadow-2xl shadow-purple-900/20 
        
        max-w-[200px] xs:max-w-[240px] sm:max-w-64 md:max-w-72 
        ${isRtl ? "text-right" : "text-left"}
        transition-all duration-200
      `}
      style={{
        backgroundColor: settings?.colors?.background || "#1a1230",
        borderColor: settings?.colors?.primary || "#4a2a7a",
      }}
    >
      <div className="flex flex-col items-center gap-0.5 pb-1 border-b border-purple-500/20">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-[8px] xs:text-[9px] sm:text-[10px] md:text-[12px]">
          {dateString}
        </p>
        <p className="text-[#8b8baa] font-medium text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px]">
          {timeString}
        </p>
      </div>

      <div className="space-y-0.5 py-1">
        {payload
          .filter((p: any) => p.dataKey !== "equity")
          .map((p: any) => (
            <div
              key={p.dataKey}
              className="flex justify-between items-center gap-2 sm:gap-4 px-0.5 sm:px-1 rounded-lg hover:bg-white/5 transition-colors"
              style={{
                color:
                  p.stroke || p.color || settings?.colors?.text || "#a0a0c0",
              }}
            >
              <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-medium truncate">
                {p.name}
              </span>
              <strong className="text-white font-bold text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px]">
                {Number(p.value).toFixed(2)}
              </strong>
            </div>
          ))}
      </div>

      {equityData && (
        <>
          <div className="relative my-0.5 sm:my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#1a1230] px-2 sm:px-3 text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 whitespace-nowrap">
                {isRtl ? "📊 اکوییتی" : "📊 Equity"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2">
            <div className="bg-purple-500/5 rounded-lg sm:rounded-xl px-1 xs:px-1.5 sm:px-2 py-1 xs:py-1.5 sm:py-2 border border-purple-500/10 hover:border-purple-500/30 transition-all">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-0.5 xs:gap-1">
                <span className="text-[#6b6b99] text-[6px] xs:text-[7px] sm:text-[8px] font-medium truncate">
                  {isRtl ? "باز شدن" : "Open"}
                </span>
                <strong className="text-blue-400 font-bold text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px]">
                  {formatNumber(equityOpen)}
                </strong>
              </div>
            </div>

            <div className="bg-purple-500/5 rounded-lg sm:rounded-xl px-1 xs:px-1.5 sm:px-2 py-1 xs:py-1.5 sm:py-2 border border-purple-500/10 hover:border-purple-500/30 transition-all">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-0.5 xs:gap-1">
                <span className="text-[#6b6b99] text-[6px] xs:text-[7px] sm:text-[8px] font-medium truncate">
                  {isRtl ? "بسته شدن" : "Close"}
                </span>
                <strong className="text-purple-400 font-bold text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px]">
                  {formatNumber(equityClose)}
                </strong>
              </div>
            </div>

            <div className="bg-green-500/5 rounded-lg sm:rounded-xl px-1 xs:px-1.5 sm:px-2 py-1 xs:py-1.5 sm:py-2 border border-green-500/10 hover:border-green-500/30 transition-all">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-0.5 xs:gap-1">
                <span className="text-[#6b6b99] text-[6px] xs:text-[7px] sm:text-[8px] font-medium truncate">
                  {isRtl ? "بیشترین" : "High"}
                </span>
                <strong className="text-green-400 font-bold text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px]">
                  {formatNumber(equityHigh)}
                </strong>
              </div>
            </div>

            <div className="bg-red-500/5 rounded-lg sm:rounded-xl px-1 xs:px-1.5 sm:px-2 py-1 xs:py-1.5 sm:py-2 border border-red-500/10 hover:border-red-500/30 transition-all">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-0.5 xs:gap-1">
                <span className="text-[#6b6b99] text-[6px] xs:text-[7px] sm:text-[8px] font-medium truncate">
                  {isRtl ? "کمترین" : "Low"}
                </span>
                <strong className="text-red-400 font-bold text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px]">
                  {formatNumber(equityLow)}
                </strong>
              </div>
            </div>
          </div>
        </>
      )}
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
    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-150
       bg-transparent
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

  const allData = useMemo(() => generateData(timeFrame), [timeFrame]);
  const TOTAL = allData.length;
  const MIN_VIS = 10;

  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 480 ? 25 : window.innerWidth < 640 ? 35 : 80,
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

  const xTicks = useMemo(
    () => getXTicks(visibleData, timeFrame),
    [visibleData, timeFrame],
  );

  const [chartHeight, setChartHeight] = useState<number>(320);

  useEffect(() => {
    const updateHeight = () => {
      const w = window.innerWidth;
      if (w < 480) setChartHeight(200);
      else if (w < 640) setChartHeight(240);
      else if (w < 768) setChartHeight(280);
      else if (w < 1024) setChartHeight(340);
      else setChartHeight(420);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      if (w < 480) setVisibleCount(20);
      else if (w < 640) setVisibleCount(30);
      else if (w < 768) setVisibleCount(40);
      else if (w < 1024) setVisibleCount(50);
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
    <>
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="
        w-full
        mt-3
        max-w-full
        mx-auto
        bg-white
        border-[#EDF1F5]
        rounded-2xl sm:rounded-3xl lg:rounded-4xl
        border-2 sm:border-3 lg:border-2
        bg-linear-to-t
        dark:from-[#282828] dark:to-[#2a2929]
        dark:border-[#353535]
        dark:bg-[#242424]
        p-1.5 sm:p-3 lg:p-5
        flex flex-col gap-1.5 sm:gap-3
        overflow-hidden
        step-test18
      "
      >
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div
            className={`flex items-center gap-1 sm:gap-2 flex-wrap ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <div
              id="chart2"
              className="flex bg-[#EDE9FF] rounded-xl dark:bg-[#454242] p-0.5 sm:p-1 gap-0.5 sm:gap-1"
            >
              {(["balance", "profit"] as Mode[]).map((m) => (
                <p
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-1.5 sm:px-4 py-0.5 sm:py-1.5 dark:text-[#F1F1F1] text-[#8A93A6] rounded-2xl cursor-pointer font-normal text-[9px] sm:text-[13px] transition-all duration-200 whitespace-nowrap
                  ${
                    mode === m
                      ? "bg-linear-to-b from-[#C4C4C426] to-[#EBEBEB1A] dark:text-white text-[#8A93A6] shadow-md"
                      : "bg-transparent"
                  }`}
                >
                  {t(`chart.${m}`)}
                </p>
              ))}
            </div>

            <div id="chart5" className="flex items-center gap-0.5 sm:gap-1">
              <IconBtn
                onClick={() =>
                  setVisibleCount((v) => Math.min(TOTAL, Math.round(v * 1.4)))
                }
                title={t("chart.zoomOut")}
              >
                <MdOutlineZoomOut size={window.innerWidth < 480 ? 18 : 23} />
              </IconBtn>

              <IconBtn
                onClick={() =>
                  setVisibleCount((v) => Math.max(MIN_VIS, Math.round(v * 0.7)))
                }
                title={t("chart.zoomIn")}
              >
                <MdOutlineZoomIn size={window.innerWidth < 480 ? 18 : 23} />
              </IconBtn>

              <button
                onClick={openSettingsPanel}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all duration-150 bg-[#e8e4f5] bg-transparent text-[#7c3aed] dark:text-[#a78bfa] hover:bg-purple-100 dark:hover:bg-purple-900/30"
                title="تنظیمات چارت"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          <div
            dir={i18next.language === "fa" ? "ltr" : "rtl"}
            className={`flex w-full sm:w-auto items-center step-test21 sm:gap-1 dark:bg-[#454242] px-1.5 p-0.5 sm:p-1  rounded-2xl overflow-x-auto sm:overflow-x-visible sm:flex-wrap ${
              isRtl ? "flex-row-reverse" : ""
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div
              id="chart1"
              className="flex items-center gap-1 sm:gap-2 p-1 justify-center w-full  rounded-2xl"
            >
              {TIME_FRAMES.map((tf) => (
                <p
                  key={tf}
                  onClick={() => setTimeFrame(tf)}
                  className={`px-0.5 sm:px-4 py-1 rounded-2xl cursor-pointer text-[7px] sm:text-[13px] transition-all duration-150 whitespace-nowrap
      ${
        timeFrame === tf
          ? "sm:bg-linear-to-b sm:from-purple-100 sm:to-purple-50 sm:dark:from-[#C4C4C426] sm:dark:to-[#EBEBEB1A] text-[#7c3aed] bg-none dark:text-[#c4b5fd] shadow-sm"
          : "bg-transparent dark:text-[#ffffff] text-[#1F2430] hover:bg-gray-200 dark:hover:bg-[#3A3A3A]"
      }`}
                >
                  {t(`timeframes.${tf}`)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div id="chart3" className="flex-1 min-h-0">
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
            min-h-37.5
            sm:min-h-50
            lg:min-h-75
          "
            style={{ height: chartHeight }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={visibleData}
                margin={{
                  top: 5,
                  right: window.innerWidth < 480 ? 25 : 40,
                  left: window.innerWidth < 480 ? 25 : 40,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={settings.colors.balanceLine}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="70%"
                      stopColor={settings.colors.balanceLine}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="100%"
                      stopColor={settings.colors.balanceLine}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="balanceStroke"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor={settings.colors.balanceLine} />
                    <stop
                      offset="50%"
                      stopColor={settings.colors.balanceLine}
                    />
                    <stop
                      offset="100%"
                      stopColor={settings.colors.balanceLine}
                    />
                  </linearGradient>
                </defs>

                {settings.display.showAreas && activeSeries.balance && (
                  <Area
                    dataKey="balance"
                    name={t("chart.balance")}
                    stroke={settings.colors.balanceLine}
                    strokeWidth={Math.min(
                      settings.lineWidths.main,
                      window.innerWidth < 480
                        ? 1.2
                        : window.innerWidth < 640
                          ? 1.5
                          : settings.lineWidths.main,
                    )}
                    fill="url(#balanceGrad)"
                    dot={false}
                    activeDot={{
                      r: window.innerWidth < 480 ? 2 : 4,
                      fill: settings.colors.balanceLine,
                      stroke: settings.colors.balanceLine,
                      strokeWidth: 2,
                    }}
                    style={
                      settings.effects.glow
                        ? {
                            filter: `drop-shadow(0 0 5px ${settings.colors.balanceLine}66)`,
                          }
                        : {}
                    }
                  />
                )}
                {settings.display.showGrid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff"
                    strokeOpacity={0.25}
                    strokeWidth={1}
                    vertical={true}
                    horizontal={true}
                    horizontalPoints={yTicks.map((tick) => {
                      const [min, max] = yDomain;
                      return ((tick - min) / (max - min)) * 230;
                    })}
                  />
                )}
                {settings.axis.showXAxis && (
                  <XAxis
                    dataKey="time"
                    ticks={xTicks}
                    tick={{
                      fill: "#ffff",
                      fontSize: Math.min(
                        settings.sizes.fontSize,
                        window.innerWidth < 480
                          ? 7
                          : window.innerWidth < 640
                            ? 8
                            : settings.sizes.fontSize,
                      ),
                    }}
                    axisLine={{ stroke: settings.colors.grid }}
                    tickLine={false}
                    tickMargin={17}
                    tickFormatter={(value) => {
                      const dataIndex = visibleData.findIndex(
                        (d) => d.time === value,
                      );
                      if (dataIndex === -1) return value;
                      return formatTimeByFrame(
                        value,
                        dataIndex,
                        timeFrame,
                        visibleData,
                      );
                    }}
                  />
                )}
                <YAxis
                  domain={yDomain}
                  ticks={yTicks}
                  tick={{
                    fill: "#ffffff",
                    fontSize: window.innerWidth < 480 ? 9 : 11,
                  }}
                  axisLine={{ stroke: "#ffffff", strokeWidth: 1.5 }}
                  tickLine={false}
                  tickMargin={window.innerWidth < 480 ? 5 : 30}
                  width={window.innerWidth < 480 ? 35 : 10}
                  tickFormatter={(v) => {
                    if (v >= 1000) return (v / 1000).toFixed(0) + "k";
                    return v.toLocaleString();
                  }}
                  orientation={isRtl ? "left" : "right"}
                />
                <div>
                  {settings.display.showTooltip && (
                    <Tooltip
                      content={
                        <ChartTooltip isRtl={isRtl} settings={settings} />
                      }
                    />
                  )}
                </div>
                {settings.display.showAreas && activeSeries.balance && (
                  <Area
                    dataKey="balance"
                    name={t("chart.balance")}
                    stroke="url(#balanceStroke)"
                    strokeWidth={Math.min(
                      settings.lineWidths.main,
                      window.innerWidth < 480
                        ? 1.2
                        : window.innerWidth < 640
                          ? 1.5
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
                        ? 1.5
                        : window.innerWidth < 640
                          ? 2
                          : settings.sizes.barSize,
                      Math.round(600 / visibleCount),
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

        <p className="text-center text-[9px] sm:text-[13px] dark:text-white text-[#5B657A] -mt-0.5">
          {isRtl
            ? `اسکرول برای زوم · درگ برای حرکت · ${visibleCount}/${TOTAL} کندل`
            : `scroll to zoom · drag to pan · ${visibleCount}/${TOTAL} bars`}
        </p>

        {settings.display.showLegend && (
          <div
            id="chart3"
            className={`flex step-test22 flex-wrap justify-center gap-x-1.5 sm:gap-x-5 gap-y-0.5 sm:gap-y-2 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            {SERIES_CONFIG.map(({ key, tKey, color }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="flex items-center gap-0.5 sm:gap-1.5 bg-transparent border-none cursor-pointer rounded-lg px-0.5 sm:px-1.5 py-0.5 sm:py-1 transition-opacity duration-200"
                style={{ opacity: activeSeries[key] ? 1 : 0.3 }}
              >
                <span
                  className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 transition-shadow duration-200"
                  style={{
                    background: color,
                    boxShadow: activeSeries[key] ? `0 0 7px ${color}` : "none",
                  }}
                />
                <span
                  className="text-[9px] sm:text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap"
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
    </>
  );
}
