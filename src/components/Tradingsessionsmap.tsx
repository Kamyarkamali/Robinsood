import { useState, useEffect, useRef } from "react";
import { GrLanguage } from "react-icons/gr";
import { CiCircleAlert } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
export type Lang = "fa" | "en";

interface Props {
  lang?: Lang;
}

interface Session {
  id: string;
  fa: string;
  en: string;
  start: number;
  end: number;
  color: string;
  bg: string;
  border: string;
  dot: string;
  icon: string;
  mapX: number;
  mapY: number;
  barTop: number;
}

interface NewsEvent {
  id: string;
  fa: string;
  en: string;
  flag: string;
  time: number;
  impact: "High" | "Medium" | "Low";
  pairs: string;
}

const SESSIONS: Session[] = [
  {
    id: "ny",
    fa: "سشن نیویورک",
    en: "New York Session",
    start: 16.5,
    end: 25.5,
    color: "#ef4444",
    bg: "rgba(110,20,20,.72)",
    border: "#c53030",
    dot: "#fc8181",
    icon: "🗽",
    mapX: 20,
    mapY: 46,
    barTop: 6,
  },
  {
    id: "lon",
    fa: "سشن لندن",
    en: "London Session",
    start: 11.5,
    end: 20.5,
    color: "#d97706",
    bg: "rgba(100,48,10,.72)",
    border: "#b45309",
    dot: "#fbbf24",
    icon: "",
    mapX: 44,
    mapY: 30,
    barTop: 38,
  },
  {
    id: "tok",
    fa: "سشن توکیو",
    en: "Tokyo Session",
    start: 3.5,
    end: 12.5,
    color: "#3b82f6",
    bg: "rgba(23,45,115,.72)",
    border: "#2563eb",
    dot: "#60a5fa",
    icon: "",
    mapX: 86,
    mapY: 40,
    barTop: 62,
  },
  {
    id: "syd",
    fa: "سشن سیدنی",
    en: "Sydney Session",
    start: 0.5,
    end: 9.5,
    color: "#22c55e",
    bg: "rgba(14,68,36,.72)",
    border: "#15803d",
    dot: "#4ade80",
    icon: "",
    mapX: 88,
    mapY: 80,
    barTop: 80,
  },
];

const NEWS: NewsEvent[] = [
  {
    id: "n1",
    fa: "شاخص CPI آمریکا",
    en: "US CPI Index",
    flag: "🇺🇸",
    time: 14.0,
    impact: "High",
    pairs: "EURUSD, XAUUSD",
  },
  {
    id: "n2",
    fa: "نشست فدرال رزرو",
    en: "Federal Reserve Meeting",
    flag: "🇺🇸",
    time: 17.5,
    impact: "High",
    pairs: "USDJPY, GBPUSD",
  },
  {
    id: "n3",
    fa: "تولید ناخالص ملی",
    en: "UK GDP",
    flag: "🇬🇧",
    time: 11.0,
    impact: "Medium",
    pairs: "GBPUSD, EURGBP",
  },
];

const IMPACT_COLOR = { High: "#ef4444", Medium: "#f59e0b", Low: "#22c55e" };
const IMPACT_BG = {
  High: "rgba(239,68,68,.18)",
  Medium: "rgba(245,158,11,.18)",
  Low: "rgba(34,197,94,.18)",
};

// Desktop bar height stays the same, mobile gets smaller
const BAR_H_DESKTOP = 52;
const BAR_H_MOBILE = 36;

// =========== HELPERS ===========
function getIranHour() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const iran = new Date(utc + 3.5 * 3600000);
  return iran.getHours() + iran.getMinutes() / 60;
}

function fmt(h: number) {
  const hr = Math.floor(h) % 24;
  const mn = Math.round((h % 1) * 60);
  return `${String(hr).padStart(2, "0")}:${String(mn).padStart(2, "0")}`;
}

function pct(h: number) {
  return `${((h % 24) / 24) * 100}%`;
}
function pctNum(h: number) {
  return ((h % 24) / 24) * 100;
}

function isLive(s: Session, cur: number) {
  return s.end > 24
    ? cur >= s.start || cur < s.end - 24
    : cur >= s.start && cur < s.end;
}

type TooltipType = "news" | "current" | "tick";

interface TooltipState {
  type: TooltipType;
  data: NewsEvent | null;
  x: number;
  y: number;
  time: number;
  label: string;
  elementId: string;
}

export default function TradingSessionsMap({ lang = "fa" }: Props) {
  const [cur, setCur] = useState(getIranHour());
  const [active, setActive] = useState<Set<string>>(
    new Set(SESSIONS.map((s) => s.id)),
  );
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "fa";

  useEffect(() => {
    const iv = setInterval(() => setCur(getIranHour()), 30000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const barH = isMobile ? BAR_H_MOBILE : BAR_H_DESKTOP;
  const mapH = isMobile ? 240 : isTablet ? 320 : 420;

  const sorted = [...NEWS].sort((a, b) => {
    const ap = a.time < cur,
      bp = b.time < cur;
    if (ap && !bp) return 1;
    if (!ap && bp) return -1;
    return a.time - b.time;
  });

  // Smart tooltip positioning — always stays inside viewport
  const handleTooltip = (
    e: React.MouseEvent | React.TouchEvent,
    type: TooltipType,
    data: NewsEvent | null,
    time: number,
    label: string,
    elementId: string,
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    setHoveredLine(elementId);
    setTooltip({ type, data, x, y, time, label, elementId });
  };

  const clearTooltip = () => {
    setTooltip(null);
    setHoveredLine(null);
  };

  // Compute tooltip left/top clamped to viewport
  const getTooltipStyle = (tt: TooltipState) => {
    const tooltipW = isMobile ? 180 : 210;
    const tooltipH = 110;
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = isRtl ? tt.x - tooltipW - 8 : tt.x + 15;
    // Clamp horizontally
    left = Math.max(margin, Math.min(vw - tooltipW - margin, left));

    // If tooltip goes off the right, flip to left
    if (!isRtl && left + tooltipW > vw - margin) {
      left = Math.max(margin, tt.x - tooltipW - 15);
    }

    let top = tt.y - 20;
    top = Math.max(margin, Math.min(vh - tooltipH - margin, top));

    return { left, top, minWidth: tooltipW };
  };

  // On mobile show fewer hour labels
  const hourLabels = isMobile
    ? [0, 4, 8, 12, 16, 20]
    : isTablet
      ? [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
      : Array.from({ length: 13 }, (_, i) => i * 2);

  return (
    <div
      ref={rootRef}
      className="bg-[#2B2B2B] text-slate-200 w-full min-h-0 pb-3 rounded-xl overflow-hidden select-none"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest(".tooltip-trigger")) {
          clearTooltip();
        }
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-2 px-3 sm:px-5 pt-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-sm sm:text-lg font-medium">
            <GrLanguage size={isMobile ? 18 : 25} />
            {lang === "fa"
              ? "سشن های معاملاتی روی نقشه جهان"
              : "Sessions on World Map"}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 font-normal mt-1 sm:mt-2 leading-relaxed">
            {lang === "fa"
              ? "نمایش ساده زمان سشن‌ها و مهم‌وشانی با ساعت فعلی و زمان خبرها"
              : "Simple view of trading session times with current time and news events"}
          </div>
        </div>
      </div>

      {/* Main chart area */}
      <div className="mx-2 sm:mx-auto border border-[#1e2d3d] rounded-xl overflow-hidden relative bg-[#0d1628]">
        {/* ─── Timeline header: two separate rows ─── */}

        {/* ROW 1 — News badges only (no hour labels here) */}
        <div
          className="relative border-b border-[#1e2d3d]"
          style={{ height: isMobile ? 52 : 68, overflow: "visible" }}
        >
          {/* Current time badge */}
          <div
            className="absolute z-30 flex flex-col items-center"
            style={{
              top: isMobile ? 4 : 6,
              [isRtl ? "right" : "left"]: pct(cur),
              transform: isRtl ? "translateX(50%)" : "translateX(-50%)",
            }}
          >
            <div
              className="rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 flex flex-col items-center gap-0.5 border border-indigo-500 text-indigo-200 whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "#312e81",
                boxShadow: "0 0 10px rgba(99,102,241,.5)",
                minWidth: isMobile ? 40 : 55,
              }}
            >
              <span
                className="font-medium text-indigo-300/80"
                style={{ fontSize: isMobile ? 8 : 10 }}
              >
                {lang === "fa" ? "الان" : "Now"}
              </span>
              <span
                className="font-bold text-indigo-100 tracking-wide"
                style={{ fontSize: isMobile ? 10 : 12 }}
              >
                {fmt(cur)}
              </span>
              <IoMdTime size={isMobile ? 11 : 14} className="text-indigo-300" />
            </div>
            <div
              className="w-px bg-indigo-500"
              style={{ height: isMobile ? 6 : 10 }}
            />
          </div>

          {/* News badges */}
          {sorted.map((n, i) => {
            const isPast = n.time < cur;
            const zIdx = isPast ? 15 - i : 25 + i;
            return (
              <div
                key={n.id}
                className="news-marker absolute flex flex-col items-center cursor-pointer tooltip-trigger"
                style={{
                  top: isMobile ? 4 : 6,
                  [isRtl ? "right" : "left"]: pct(n.time),
                  transform: isRtl ? "translateX(50%)" : "translateX(-50%)",
                  zIndex: zIdx,
                  opacity: isPast ? 0.5 : 1,
                }}
                onMouseEnter={(e) =>
                  handleTooltip(
                    e,
                    "news",
                    n,
                    n.time,
                    lang === "fa" ? n.fa : n.en,
                    `news-${n.id}`,
                  )
                }
                onMouseLeave={clearTooltip}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleTooltip(
                    e,
                    "news",
                    n,
                    n.time,
                    lang === "fa" ? n.fa : n.en,
                    `news-${n.id}`,
                  );
                }}
              >
                <div
                  className="rounded-md flex flex-col items-center gap-0.5 border whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                  style={{
                    padding: isMobile ? "2px 5px" : "5px 8px",
                    background: isPast ? "#1e293b" : "#4c1d95",
                    borderColor: isPast ? "#334155" : "#7c3aed",
                    color: isPast ? "#64748b" : "#e9d5ff",
                    boxShadow: isPast ? "none" : "0 0 8px rgba(124,58,237,.45)",
                    minWidth: isMobile ? 32 : 45,
                  }}
                >
                  {/* On mobile: compact — just icon + time */}
                  {isMobile ? (
                    <>
                      <CiCalendar
                        size={11}
                        className={
                          isPast ? "text-slate-500" : "text-purple-300"
                        }
                      />
                      <span
                        style={{ fontSize: 9 }}
                        className="font-bold tracking-wide"
                      >
                        {fmt(n.time)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{ fontSize: 9 }}
                        className="font-medium opacity-80"
                      >
                        {lang === "fa" ? "خبر" : "News"}
                      </span>
                      <span
                        style={{ fontSize: 11 }}
                        className="font-bold tracking-wide"
                      >
                        {fmt(n.time)}
                      </span>
                      <CiCalendar
                        size={16}
                        className={
                          isPast ? "text-slate-500" : "text-purple-300"
                        }
                      />
                    </>
                  )}
                </div>
                <div
                  className="w-px"
                  style={{
                    height: isMobile ? 6 : 10,
                    background: isPast ? "#334155" : "#7c3aed",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ROW 2 — Hour labels only */}
        <div
          className="relative border-b border-[#1e2d3d]"
          style={{ height: isMobile ? 20 : 24 }}
        >
          {hourLabels.map((h) => (
            <div
              key={h}
              className="absolute text-[8px] sm:text-[10px] text-slate-400"
              style={{
                top: "50%",
                transform: `translateY(-50%) ${isRtl ? "translateX(50%)" : "translateX(-50%)"}`,
                [isRtl ? "right" : "left"]: pct(h),
              }}
            >
              {String(h).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* ─── Map area ─── */}
        <div className="relative overflow-hidden" style={{ height: mapH }}>
          {/* Dot grid SVG background + session dots */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 420"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="dp2"
                x="0"
                y="0"
                width="11"
                height="11"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="5.5" cy="5.5" r="1.1" fill="#182535" />
              </pattern>
            </defs>
            <rect width="1000" height="420" fill="#0d1628" />
            <rect width="1000" height="420" fill="url(#dp2)" />

            {SESSIONS.map((s) => {
              const on = active.has(s.id);
              const cx = (s.mapX / 100) * 1000;
              const cy = (s.mapY / 100) * 420;
              return (
                <g key={s.id}>
                  {on && (
                    <>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="7"
                        fill="none"
                        stroke={s.dot}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="3.5"
                        fill={s.dot}
                        style={{
                          filter: `drop-shadow(0 0 6px ${s.dot})`,
                          animation: "pulse-soft 2s ease-in-out infinite",
                        }}
                      />
                    </>
                  )}
                  {!on && <circle cx={cx} cy={cy} r="3.5" fill="#2d3748" />}

                  <text
                    x={s.id === "tok" || s.id === "syd" ? cx - 8 : cx + 10}
                    y={cy - 18}
                    fontSize="9"
                    fontWeight="normal"
                    fill={on ? "#ffffff" : "#374151"}
                    textAnchor={
                      s.id === "tok" || s.id === "syd" ? "end" : "start"
                    }
                    dominantBaseline="middle"
                  >
                    <tspan>
                      {lang === "fa"
                        ? s.fa.replace("سشن ", "")
                        : s.en.replace(" Session", "")}
                    </tspan>
                    <tspan dx="1">{s.icon}</tspan>
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Current time vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px z-10 transition-all duration-300"
            style={{
              [isRtl ? "right" : "left"]: pct(cur),
              background:
                hoveredLine === "current"
                  ? "rgba(99,102,241,1)"
                  : "rgba(99,102,241,.6)",
              boxShadow:
                hoveredLine === "current"
                  ? "0 0 20px rgba(99,102,241,.8), 0 0 60px rgba(99,102,241,.4)"
                  : "none",
            }}
          />
          {/* Current time hit area */}
          <div
            className="absolute top-0 bottom-0 z-20 tooltip-trigger"
            style={{
              [isRtl ? "right" : "left"]: `calc(${pct(cur)} - 12px)`,
              width: "24px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              handleTooltip(
                e,
                "current",
                null,
                cur,
                lang === "fa"
                  ? `زمان فعلی ${fmt(cur)}`
                  : `Current Time ${fmt(cur)}`,
                "current",
              )
            }
            onMouseLeave={clearTooltip}
            onTouchStart={(e) => {
              e.preventDefault();
              handleTooltip(
                e,
                "current",
                null,
                cur,
                lang === "fa"
                  ? `زمان فعلی ${fmt(cur)}`
                  : `Current Time ${fmt(cur)}`,
                "current",
              );
            }}
          />

          {/* News vertical lines */}
          {sorted.map((n) => {
            const isPast = n.time < cur;
            const isHovered = hoveredLine === `news-${n.id}`;
            return (
              <div
                key={`line-${n.id}`}
                className="absolute top-0 bottom-0 w-px z-10 transition-all duration-300"
                style={{
                  [isRtl ? "right" : "left"]: pct(n.time),
                  backgroundImage:
                    "repeating-linear-gradient(to bottom,#7c3aed 0,#7c3aed 5px,transparent 5px,transparent 10px)",
                  opacity: isPast ? 0.44 : 0.75,
                  boxShadow:
                    isHovered && !isPast
                      ? "0 0 20px rgba(124,58,237,.8), 0 0 60px rgba(124,58,237,.4)"
                      : "none",
                  transform: isHovered ? "scaleX(2)" : "scaleX(1)",
                }}
              />
            );
          })}
          {/* News hit areas */}
          {sorted.map((n) => (
            <div
              key={`hit-${n.id}`}
              className="absolute top-0 bottom-0 z-20 tooltip-trigger"
              style={{
                [isRtl ? "right" : "left"]: `calc(${pct(n.time)} - 12px)`,
                width: "24px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                handleTooltip(
                  e,
                  "news",
                  n,
                  n.time,
                  lang === "fa" ? n.fa : n.en,
                  `news-${n.id}`,
                )
              }
              onMouseLeave={clearTooltip}
              onTouchStart={(e) => {
                e.preventDefault();
                handleTooltip(
                  e,
                  "news",
                  n,
                  n.time,
                  lang === "fa" ? n.fa : n.en,
                  `news-${n.id}`,
                );
              }}
            />
          ))}

          {/* Session bars */}
          {SESSIONS.map((s) => {
            if (!active.has(s.id)) return null;
            const live = isLive(s, cur);

            const drawBar = (sH: number, eH: number, label: boolean) => (
              <div
                key={`${s.id}-${sH}`}
                className="absolute flex items-center overflow-hidden rounded-lg border"
                style={{
                  // On RTL, the bar starts from the right edge of the timeline
                  [isRtl ? "left" : "right"]: pct(sH),
                  width: pct(eH - sH),
                  top: `${s.barTop}%`,
                  height: barH,
                  background: s.bg,
                  borderColor: s.border,
                  opacity: live ? 1 : 0.75,
                  zIndex: 10,
                  // Responsive padding
                  padding: isMobile ? "0 4px" : "0 10px",
                  gap: isMobile ? 4 : 8,
                  justifyContent: "center",
                }}
              >
                {label && (
                  <>
                    <span
                      style={{
                        fontSize: isMobile ? 14 : 22,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </span>
                    {/* Hide text on very small bars */}
                    <div
                      style={{
                        textAlign: isRtl ? "right" : "left",
                        lineHeight: 1.3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? 9 : 12,
                          fontWeight: 700,
                          color: s.color,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {lang === "fa" ? s.fa : s.en}
                      </div>
                      {!isMobile && (
                        <div
                          style={{
                            fontSize: 10,
                            color: "#cbd5e1",
                            opacity: 0.85,
                          }}
                        >
                          {fmt(s.start)} – {fmt(s.end % 24)}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );

            return s.end > 24
              ? [drawBar(0, s.end - 24, false), drawBar(s.start, 24, true)]
              : drawBar(s.start, s.end, true);
          })}
        </div>

        {/* ─── Bottom tick strip ─── */}
        <div
          className="relative border-t border-[#1e2d3d] px-3"
          style={{ height: isMobile ? 16 : 20 }}
        >
          {/* Current time dot */}
          <div
            className="absolute w-2 h-2 rounded-full border border-blue-400 bg-blue-400 tooltip-trigger transition-all duration-300"
            style={{
              bottom: isMobile ? 3 : 6,
              [isRtl ? "right" : "left"]: `${pctNum(cur)}%`,
              transform: isRtl ? "translateX(50%)" : "translateX(-50%)",
              cursor: "pointer",
              zIndex: 20,
              boxShadow:
                hoveredLine === "current"
                  ? "0 0 15px rgba(99,102,241,.8), 0 0 30px rgba(99,102,241,.4)"
                  : "none",
              scale: hoveredLine === "current" ? "1.5" : "1",
            }}
            onMouseEnter={(e) =>
              handleTooltip(
                e,
                "current",
                null,
                cur,
                lang === "fa"
                  ? `زمان فعلی ${fmt(cur)}`
                  : `Current Time ${fmt(cur)}`,
                "current",
              )
            }
            onMouseLeave={clearTooltip}
            onTouchStart={(e) => {
              e.preventDefault();
              handleTooltip(
                e,
                "current",
                null,
                cur,
                lang === "fa"
                  ? `زمان فعلی ${fmt(cur)}`
                  : `Current Time ${fmt(cur)}`,
                "current",
              );
            }}
          />

          {/* News dots */}
          {sorted.map((n) => {
            const isHovered = hoveredLine === `news-${n.id}`;
            return (
              <div
                key={`tick-${n.id}`}
                className="absolute w-2 h-2 rounded-full border border-purple-400 bg-purple-400 tooltip-trigger transition-all duration-300"
                style={{
                  bottom: isMobile ? 3 : 6,
                  [isRtl ? "right" : "left"]: `${pctNum(n.time)}%`,
                  transform: isRtl ? "translateX(50%)" : "translateX(-50%)",
                  cursor: "pointer",
                  zIndex: 20,
                  boxShadow: isHovered
                    ? "0 0 15px rgba(124,58,237,.8), 0 0 30px rgba(124,58,237,.4)"
                    : "none",
                  scale: isHovered ? "1.5" : "1",
                }}
                onMouseEnter={(e) =>
                  handleTooltip(
                    e,
                    "tick",
                    n,
                    n.time,
                    lang === "fa" ? n.fa : n.en,
                    `news-${n.id}`,
                  )
                }
                onMouseLeave={clearTooltip}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleTooltip(
                    e,
                    "tick",
                    n,
                    n.time,
                    lang === "fa" ? n.fa : n.en,
                    `news-${n.id}`,
                  );
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ─── Footer note ─── */}
      <div className="flex items-center justify-end w-full font-normal gap-1.5 px-3 sm:px-4 pt-2 text-[9px] sm:text-[10px] text-[#ffffff]">
        <p className="flex items-center gap-2">
          {lang === "fa"
            ? "زمان‌ها بر اساس ساعت ایران نمایش شده اند"
            : "Times displayed based on Iran Standard Time"}
        </p>
        <CiCircleAlert size={isMobile ? 14 : 18} />
      </div>

      {/* ─── Tooltip ─── */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none rounded-xl p-2.5 sm:p-3 shadow-xl"
          style={{
            background: "#141b2d",
            border: "1px solid #2d3f5a",
            direction: isRtl ? "rtl" : "ltr",
            ...getTooltipStyle(tooltip),
          }}
        >
          {tooltip.type === "current" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-blue-400 truncate">
                  {tooltip.label}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1">
                {fmt(tooltip.time)}
              </div>
            </>
          )}

          {tooltip.type === "news" && tooltip.data && (
            <>
              <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                <span style={{ fontSize: isMobile ? 14 : 18 }}>
                  {tooltip.data.flag}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-100 leading-tight">
                  {lang === "fa" ? tooltip.data.fa : tooltip.data.en}
                </span>
              </div>
              <div className="mb-1.5 sm:mb-2">
                <span
                  className="inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded"
                  style={{
                    fontSize: isMobile ? 10 : 12,
                    background: IMPACT_BG[tooltip.data.impact],
                    color: IMPACT_COLOR[tooltip.data.impact],
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                    style={{ background: IMPACT_COLOR[tooltip.data.impact] }}
                  />
                  {tooltip.data.impact} Impact
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="truncate">{tooltip.data.pairs}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-1">
                {fmt(tooltip.time)}
              </div>
            </>
          )}

          {tooltip.type === "tick" && tooltip.data && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-purple-400 truncate">
                  {lang === "fa" ? tooltip.data.fa : tooltip.data.en}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1">
                {fmt(tooltip.time)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
