import { useState, useEffect, useRef } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import type { NewsEvent, Session } from "../types/interfaces";
import { NEWS, SESSIONS } from "../data/fakeData";
import i18next from "i18next";
import map from "../assets/images/map.png";
import { FiX } from "react-icons/fi";

const IMPACT_COLOR = { High: "#ef4444", Medium: "#f59e0b", Low: "#22c55e" };
const IMPACT_BG = {
  High: "rgba(239,68,68,.18)",
  Medium: "rgba(245,158,11,.18)",
  Low: "rgba(34,197,94,.18)",
};

const BAR_H_DESKTOP = 52;
const BAR_H_MOBILE = 36;

const NEWS_STACK_THRESHOLD = 2.2;

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

// function getDates(lang: string) {
//   const now = new Date();
//   const gregorian = new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   }).format(now);

//   const shamsi = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   }).format(now);

//   return { gregorian, shamsi };
// }

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

export default function TradingSessionsMap({ lang = "fa" }) {
  const [cur, setCur] = useState(getIranHour());
  const [activeSessions, setActiveSessions] = useState<string[]>(
    SESSIONS.map((s) => s.id),
  );
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [showNewsFilter] = useState<boolean>(false);
  const [newsFilterImpact, setNewsFilterImpact] = useState<string>("all");
  const [newsFilterSearch, setNewsFilterSearch] = useState<string>("");
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

  const toggleSession = (sessionId: string) => {
    setActiveSessions((prev) => {
      if (prev.includes(sessionId)) {
        return prev.filter((id) => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });
  };

  const toggleAllSessions = () => {
    if (activeSessions.length === SESSIONS.length) {
      setActiveSessions([]);
    } else {
      setActiveSessions(SESSIONS.map((s) => s.id));
    }
  };

  const getFilteredNews = () => {
    let filtered = [...NEWS];

    if (newsFilterImpact !== "all") {
      filtered = filtered.filter((n) => n.impact === newsFilterImpact);
    }

    if (newsFilterSearch.trim()) {
      const search = newsFilterSearch.toLowerCase().trim();
      filtered = filtered.filter(
        (n) =>
          n.en.toLowerCase().includes(search) ||
          n.fa.includes(search) ||
          n.pairs.toLowerCase().includes(search),
      );
    }

    return filtered;
  };

  const resetNewsFilter = () => {
    setNewsFilterImpact("all");
    setNewsFilterSearch("");
  };

  const barH = isMobile ? BAR_H_MOBILE : BAR_H_DESKTOP;
  const mapH = isMobile ? 240 : isTablet ? 320 : 420;

  const filteredNews = getFilteredNews();
  const sorted = [...filteredNews].sort((a, b) => {
    const ap = a.time < cur,
      bp = b.time < cur;
    if (ap && !bp) return 1;
    if (!ap && bp) return -1;
    return a.time - b.time;
  });

  const rowMap: Record<string, number> = {};
  {
    const ascending = [...filteredNews].sort((a, b) => a.time - b.time);
    const lastRowTime: [number, number] = [-Infinity, -Infinity];
    ascending.forEach((n) => {
      let row = 0;
      if (n.time - lastRowTime[0] < NEWS_STACK_THRESHOLD) row = 1;
      lastRowTime[row] = n.time;
      rowMap[n.id] = row;
    });
  }

  const upcoming = [...filteredNews]
    .filter((n) => n.time >= cur)
    .sort((a, b) => a.time - b.time);
  const nextUpId =
    upcoming.length > 0
      ? upcoming[0].id
      : filteredNews.length > 0
        ? [...filteredNews].sort((a, b) => a.time - b.time)[0].id
        : null;

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

  const getTooltipStyle = (tt: TooltipState) => {
    const tooltipW = isMobile ? 180 : 210;
    const tooltipH = 110;
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = isRtl ? tt.x - tooltipW - 8 : tt.x + 15;
    left = Math.max(margin, Math.min(vw - tooltipW - margin, left));

    if (!isRtl && left + tooltipW > vw - margin) {
      left = Math.max(margin, tt.x - tooltipW - 15);
    }

    let top = tt.y - 20;
    top = Math.max(margin, Math.min(vh - tooltipH - margin, top));

    return { left, top, minWidth: tooltipW };
  };

  const hourLabels = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

  const newsAreaBaseTop = isMobile ? 4 : 6;
  const newsAreaRowGap = isMobile ? 34 : 46;
  const newsAreaHeight = isMobile ? 100 : 138;

  const impactOptions = [
    { value: "all", label: i18next.language === "fa" ? "همه" : "All" },
    { value: "High", label: i18next.language === "fa" ? "بالا" : "High" },
    { value: "Medium", label: i18next.language === "fa" ? "متوسط" : "Medium" },
    { value: "Low", label: i18next.language === "fa" ? "پایین" : "Low" },
  ];

  const getSessionColorByTime = (time: number) => {
    for (const session of SESSIONS) {
      let start = session.start;
      let end = session.end;

      if (end > 24) {
        if (time >= start || time < end - 24) {
          return session.dot;
        }
      } else {
        if (time >= start && time < end) {
          return session.dot;
        }
      }
    }

    let closest = SESSIONS[0];
    let minDist = Infinity;
    for (const session of SESSIONS) {
      let dist = Math.min(
        Math.abs(time - session.start),
        Math.abs(time - session.end),
      );
      if (dist < minDist) {
        minDist = dist;
        closest = session;
      }
    }
    return closest.dot;
  };

  const getImpactColor = (impact: string) => {
    return IMPACT_COLOR[impact as keyof typeof IMPACT_COLOR] || "#94a3b8";
  };

  const SessionCardWithBar = ({ session }: { session: Session }) => {
    const isActive = activeSessions.includes(session.id);
    const live = isLive(session, cur);

    const getBarPosition = () => {
      const startPct = pctNum(session.start) * 100;
      const endPct =
        session.end > 24
          ? pctNum(session.end - 24) * 100
          : pctNum(session.end) * 100;
      const width = session.end > 24 ? endPct : endPct - startPct;

      return { startPct, width };
    };

    const { startPct, width } = getBarPosition();

    return (
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={() => toggleSession(session.id)}
          className={`
            flex-shrink-0 w-[72px] rounded-xl
            flex flex-col items-center justify-center gap-1
            transition-all duration-300 border-2
            ${
              isActive
                ? "border-[#4A4A4A] bg-[#2C2C2C] shadow-lg"
                : "border-transparent bg-[#1A1A1A] opacity-50"
            }
            ${live ? "ring-2 ring-green-500/60 shadow-green-500/20" : ""}
            hover:scale-105 active:scale-95
            relative overflow-hidden
            p-1
          `}
        >
          <div className="relative flex-shrink-0">
            <div
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: isActive ? session.dot : "#4a4a4a",
                boxShadow: isActive ? `0 0 12px ${session.dot}80` : "none",
              }}
            />
            {isActive && live && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: session.dot,
                  opacity: 0.2,
                  animationDuration: "1.5s",
                }}
              />
            )}
          </div>

          <img
            className="w-5 h-5 brightness-0 saturate-100 invert flex-shrink-0"
            src={session.icon}
            alt={session.en}
          />

          <span className="text-[9px] font-semibold text-slate-200 text-center leading-tight">
            {i18next.language === "fa"
              ? session.fa.replace("سشن ", "").substring(0, 5)
              : session.en.replace(" Session", "").substring(0, 5)}
          </span>

          <span className="text-[7px] text-slate-400 font-mono">
            {fmt(session.start)}-{fmt(session.end % 24)}
          </span>

          {isActive && live && (
            <div className="absolute top-0.5 right-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          )}
        </button>

        {isActive && (
          <div className="flex-1 min-w-0 h-[72px] relative overflow-hidden rounded-lg bg-[#1A1A1A] border border-[#3C3C3C]">
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: session.bg }}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 h-[60%] rounded-md transition-all duration-500"
              style={{
                left: `${startPct}%`,
                width: `${Math.max(width, 2)}%`,
                background: session.bg,
                border: `1px solid ${session.border}`,
                boxShadow: live ? `0 0 12px ${session.dot}40` : "none",
                opacity: live ? 1 : 0.6,
              }}
            >
              <div className="flex items-center gap-1 h-full px-1.5 overflow-hidden">
                <img
                  className="w-3 h-3 brightness-0 saturate-100 invert flex-shrink-0"
                  src={session.icon}
                  alt={session.en}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[7px] font-bold truncate"
                    style={{ color: session.color }}
                  >
                    {i18next.language === "fa" ? session.fa : session.en}
                  </div>
                  <div className="text-[6px] text-slate-300/80 font-mono">
                    {fmt(session.start)}-{fmt(session.end % 24)}
                  </div>
                </div>
                {live && (
                  <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                )}
              </div>
            </div>

            <div className="absolute bottom-0.5 left-0 right-0 flex justify-between px-1">
              <span className="text-[5px] text-slate-500 font-mono">00:00</span>
              <span className="text-[5px] text-slate-500 font-mono">12:00</span>
              <span className="text-[5px] text-slate-500 font-mono">24:00</span>
            </div>
          </div>
        )}

        {!isActive && (
          <div className="flex-1 min-w-0 h-[72px] rounded-lg bg-[#1A1A1A]/50 border border-[#3C3C3C]/30 flex items-center justify-center">
            <span className="text-[8px] text-slate-500">
              {i18next.language === "fa" ? "غیرفعال" : "Inactive"}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        id="tabale1"
        ref={rootRef}
        className="dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] step-test43 rounded-2xl border-4
        dark:border-[#3C3C3C]
        border-gray-300 md:pr-2 md:pl-2 mt-3 text-slate-200 w-full min-h-0 pb-3 overflow-hidden select-none"
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest(".tooltip-trigger")) {
            clearTooltip();
          }
        }}
      >
        {showNewsFilter && (
          <div className="mx-3 sm:mx-5 mb-3 p-3 rounded-xl bg-[#252525] border border-[#3C3C3C]">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[120px] sm:min-w-[200px]">
                <input
                  type="text"
                  placeholder={
                    i18next.language === "fa"
                      ? "جستجوی خبر..."
                      : "Search news..."
                  }
                  value={newsFilterSearch}
                  onChange={(e) => setNewsFilterSearch(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1e1e1e] border border-[#3C3C3C] text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {impactOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setNewsFilterImpact(option.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      newsFilterImpact === option.value
                        ? "bg-indigo-500/30 text-indigo-300 border border-indigo-500/50"
                        : "bg-[#1e1e1e] text-slate-400 border border-transparent hover:border-[#4A4A4A]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {(newsFilterImpact !== "all" || newsFilterSearch) && (
                <button
                  onClick={resetNewsFilter}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200"
                >
                  <FiX size={12} />
                  {i18next.language === "fa" ? "پاک کردن" : "Clear"}
                </button>
              )}

              <span className="text-[10px] text-slate-500">
                {filteredNews.length}{" "}
                {i18next.language === "fa" ? "خبر" : "news"}
              </span>
            </div>
          </div>
        )}

        <div className="mx-2 sm:mx-auto border-[#1e2d3d] rounded-xl overflow-hidden relative bg-[#2B2B2B]">
          {/* Desktop layout - original */}
          <div className="hidden md:block">
            {/* News area */}
            <div
              className="relative border-b border-[#1e2d3d]"
              style={{ height: newsAreaHeight, overflow: "visible" }}
            >
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
                    {i18next.language === "fa" ? "الان" : "Now"}
                  </span>
                  <span
                    className="font-bold text-indigo-100 tracking-wide"
                    style={{ fontSize: isMobile ? 10 : 12 }}
                  >
                    {fmt(cur)}
                  </span>
                  <IoMdTime
                    size={isMobile ? 11 : 14}
                    className="text-indigo-300"
                  />
                </div>
                <div
                  className="w-px bg-indigo-500"
                  style={{ height: isMobile ? 6 : 10 }}
                />
              </div>

              {sorted.map((n, i) => {
                const isPast = n.time < cur;
                const isNext = n.id === nextUpId && !isPast;
                const row = rowMap[n.id] ?? 0;
                const topOffset = newsAreaBaseTop + row * newsAreaRowGap;
                const zIdx = isNext ? 50 : isPast ? 15 - i : 25 + i;

                const sessionColor = getSessionColorByTime(n.time);
                const impactColor = getImpactColor(n.impact);

                return (
                  <div
                    key={n.id}
                    className="news-marker absolute flex flex-col items-center cursor-pointer tooltip-trigger"
                    style={{
                      top: topOffset,
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
                        i18next.language === "fa" ? n.fa : n.en,
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
                        i18next.language === "fa" ? n.fa : n.en,
                        `news-${n.id}`,
                      );
                    }}
                  >
                    <div className="relative">
                      {isNext && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5 z-10">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
                        </span>
                      )}
                      <div
                        className="rounded-md flex flex-col items-center gap-0.5 border whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        style={{
                          padding: isMobile ? "2px 5px" : "5px 8px",
                          background: isPast
                            ? "#1e293b"
                            : isNext
                              ? `${sessionColor}30`
                              : `${sessionColor}20`,
                          borderColor: isPast
                            ? "#334155"
                            : isNext
                              ? sessionColor
                              : `${sessionColor}80`,
                          color: isPast
                            ? "#64748b"
                            : isNext
                              ? "#ffffff"
                              : "#e9d5ff",
                          boxShadow: isPast
                            ? "none"
                            : isNext
                              ? `0 0 14px ${sessionColor}60`
                              : `0 0 8px ${sessionColor}30`,
                          filter: isPast ? "grayscale(0.5)" : "none",
                          minWidth: isMobile ? 32 : 45,
                        }}
                      >
                        {isMobile ? (
                          <>
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: impactColor }}
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
                            <div className="flex items-center gap-1">
                              <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: impactColor }}
                              />
                              <span
                                style={{ fontSize: 9 }}
                                className="font-medium opacity-80"
                              >
                                {isNext
                                  ? i18next.language === "fa"
                                    ? "بعدی"
                                    : "Next"
                                  : i18next.language === "fa"
                                    ? "خبر"
                                    : "News"}
                              </span>
                            </div>
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
                              style={{
                                color: isPast ? undefined : sessionColor,
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className="w-px"
                      style={{
                        height: isMobile ? 6 : 10,
                        background: isPast
                          ? "#334155"
                          : isNext
                            ? sessionColor
                            : `${sessionColor}80`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Hour labels */}
            <div
              className="relative border-b border-[#1e2d3d]"
              style={{ height: isMobile ? 20 : 24 }}
            >
              {hourLabels.map((h) => (
                <div
                  key={h}
                  className="absolute font-medium"
                  style={{
                    top: "20%",
                    left: pct(h),
                    textAlign: "center",
                    color: "#cbd5e1",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                    letterSpacing: "0.3px",
                    background: "rgba(43, 43, 43, 0.85)",
                    padding: isMobile ? "1px 4px" : "1px 6px",
                    borderRadius: "3px",
                    fontSize: isMobile ? "7px" : "10px",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    width: "auto",
                    minWidth: "40px",
                    maxWidth: "60px",
                  }}
                >
                  {String(h).padStart(2, "0")}:00
                </div>
              ))}
            </div>

            {/* Map with bars - desktop */}
            <div
              style={{
                height: mapH,
                backgroundImage: `url(${map})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="relative overflow-hidden"
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 420"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient
                    id="bgGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  ></linearGradient>

                  <pattern
                    id="dp2"
                    x="0"
                    y="0"
                    width="11"
                    height="11"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="5.5" cy="5.5" r="1.1" fill="#3a3a3a" />
                  </pattern>
                </defs>

                <rect width="1000" height="420" fill="url(#bgGradient)" />
                <rect width="1000" height="420" fill="url(#dp2)" />

                {SESSIONS.map((s) => {
                  const on = activeSessions.includes(s.id);
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
                      {!on && <circle cx={cx} cy={cy} r="3.5" fill="#4a4a4a" />}

                      <text
                        x={s.id === "tok" || s.id === "syd" ? cx - 8 : cx + 10}
                        y={cy - 18}
                        fontSize="9"
                        fontWeight="normal"
                        fill={on ? "#ffffff" : "#6a6a6a"}
                        textAnchor={
                          s.id === "tok" || s.id === "syd" ? "end" : "start"
                        }
                        dominantBaseline="middle"
                      >
                        <tspan>
                          {i18next.language === "fa"
                            ? s.fa.replace("سشن ", "")
                            : s.en.replace(" Session", "")}
                        </tspan>
                      </text>
                    </g>
                  );
                })}

                {sorted.map((n) => {
                  const isPast = n.time < cur;
                  const sessionColor = getSessionColorByTime(n.time);
                  const cx = (n.time / 24) * 1000;
                  const cy = isMobile ? 380 : 390;

                  return (
                    <g key={`news-dot-${n.id}`}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isPast ? 3 : 5}
                        fill={isPast ? "#4a4a4a" : sessionColor}
                        opacity={isPast ? 0.3 : 0.9}
                        style={{
                          filter: isPast
                            ? "none"
                            : `drop-shadow(0 0 8px ${sessionColor})`,
                          animation: isPast
                            ? "none"
                            : "pulse-soft 1.5s ease-in-out infinite",
                        }}
                      />
                      {!isPast && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={8}
                          fill="none"
                          stroke={sessionColor}
                          strokeWidth="1"
                          opacity="0.3"
                          style={{
                            animation: "pulse-ring 2s ease-out infinite",
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

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
                    i18next.language === "fa"
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
                    i18next.language === "fa"
                      ? `زمان فعلی ${fmt(cur)}`
                      : `Current Time ${fmt(cur)}`,
                    "current",
                  );
                }}
              />

              {sorted.map((n) => {
                const isPast = n.time < cur;
                const isHovered = hoveredLine === `news-${n.id}`;
                const sessionColor = getSessionColorByTime(n.time);

                return (
                  <div
                    key={`line-${n.id}`}
                    className="absolute top-0 bottom-0 w-px z-10 transition-all duration-300"
                    style={{
                      [isRtl ? "right" : "left"]: pct(n.time),
                      backgroundImage: isPast
                        ? "repeating-linear-gradient(to bottom,#5a5a5a 0,#5a5a5a 5px,transparent 5px,transparent 10px)"
                        : `repeating-linear-gradient(to bottom,${sessionColor} 0,${sessionColor} 5px,transparent 5px,transparent 10px)`,
                      opacity: isPast ? 0.3 : 0.75,
                      boxShadow:
                        isHovered && !isPast
                          ? `0 0 20px ${sessionColor}80, 0 0 60px ${sessionColor}40`
                          : "none",
                      transform: isHovered ? "scaleX(2)" : "scaleX(1)",
                    }}
                  />
                );
              })}

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
                      i18next.language === "fa" ? n.fa : n.en,
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
                      i18next.language === "fa" ? n.fa : n.en,
                      `news-${n.id}`,
                    );
                  }}
                />
              ))}

              {SESSIONS.map((s) => {
                if (!activeSessions.includes(s.id)) return null;
                const live = isLive(s, cur);

                const drawBar = (sH: number, eH: number, label: boolean) => (
                  <div
                    key={`${s.id}-${sH}`}
                    className="absolute md:flex items-center overflow-hidden rounded-lg border"
                    style={{
                      [isRtl ? "left" : "right"]: pct(sH),
                      width: pct(eH - sH),
                      top: `${s.barTop}%`,
                      height: barH,
                      background: s.bg,
                      borderColor: s.border,
                      opacity: live ? 1 : 0.75,
                      zIndex: 10,
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
                          <img
                            className="w-8 brightness-0 saturate-100 invert"
                            src={s.icon}
                            alt="icon"
                          />
                        </span>
                        <div
                          style={{
                            textAlign: isRtl ? "center" : "center",
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
                            {i18next.language === "fa" ? s.fa : s.en}
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

            <div
              className="relative border-t border-[#1e2d3d] px-3"
              style={{ height: isMobile ? 16 : 20 }}
            >
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
                    i18next.language === "fa"
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
                    i18next.language === "fa"
                      ? `زمان فعلی ${fmt(cur)}`
                      : `Current Time ${fmt(cur)}`,
                    "current",
                  );
                }}
              />

              {sorted.map((n) => {
                const isHovered = hoveredLine === `news-${n.id}`;
                const sessionColor = getSessionColorByTime(n.time);

                return (
                  <div
                    key={`tick-${n.id}`}
                    className="absolute w-2 h-2 rounded-full border tooltip-trigger transition-all duration-300"
                    style={{
                      bottom: isMobile ? 3 : 6,
                      [isRtl ? "right" : "left"]: `${pctNum(n.time)}%`,
                      transform: isRtl ? "translateX(50%)" : "translateX(-50%)",
                      cursor: "pointer",
                      zIndex: 20,
                      borderColor: sessionColor,
                      background: sessionColor,
                      boxShadow: isHovered
                        ? `0 0 15px ${sessionColor}80, 0 0 30px ${sessionColor}40`
                        : "none",
                      scale: isHovered ? "1.5" : "1",
                    }}
                    onMouseEnter={(e) =>
                      handleTooltip(
                        e,
                        "tick",
                        n,
                        n.time,
                        i18next.language === "fa" ? n.fa : n.en,
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
                        i18next.language === "fa" ? n.fa : n.en,
                        `news-${n.id}`,
                      );
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile layout - Cards with bars next to them */}
          <div className="md:hidden">
            <div className="flex flex-col gap-2 p-2">
              {SESSIONS.map((session) => (
                <SessionCardWithBar key={session.id} session={session} />
              ))}
            </div>
          </div>
        </div>

        {/* Session toggles - desktop */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 pt-3 pb-1 border-t border-[#3C3C3C] mt-2">
          <button
            onClick={toggleAllSessions}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-300 border border-[#4A4A4A] bg-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500 hover:scale-105 active:scale-95"
          >
            {activeSessions.length === SESSIONS.length ? (
              <span className="flex items-center gap-1.5">
                {i18next.language === "fa" ? "مخفی کردن همه" : "Hide All"}
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                {i18next.language === "fa" ? "نمایش همه" : "Show All"}
              </span>
            )}
          </button>

          <div className="w-px h-4 sm:h-6 bg-[#3C3C3C]" />

          {SESSIONS.map((session) => {
            const isActive = activeSessions.includes(session.id);
            return (
              <button
                key={session.id}
                onClick={() => toggleSession(session.id)}
                className="group flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-300 border border-[#4A4A4A] bg-transparent hover:border-slate-500 hover:scale-105 active:scale-95"
                style={{
                  color: isActive ? "#ffffff" : "#6a6a6a",
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <span className="relative flex items-center justify-center">
                  <span
                    className="block w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{
                      background: isActive ? session.dot : "#4a4a4a",
                      boxShadow: isActive
                        ? `0 0 12px ${session.dot}60`
                        : "none",
                    }}
                  />
                  {isActive && (
                    <>
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          background: session.dot,
                          opacity: 0.3,
                          animationDuration: "1.2s",
                        }}
                      />
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          background: session.dot,
                          opacity: 0.15,
                          animationDuration: "1.8s",
                          animationDelay: "0.6s",
                        }}
                      />
                    </>
                  )}
                </span>

                <span className="transition-all duration-300 group-hover:tracking-wider">
                  {i18next.language === "fa"
                    ? session.fa.replace("سشن ", "")
                    : session.en.replace(" Session", "")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end w-full font-normal gap-1.5 px-3 sm:px-4 pt-2 text-[9px] sm:text-[10px] text-[#ffffff]">
          <p className="flex items-center gap-2">
            {i18next.language === "fa"
              ? "زمان‌ها بر اساس ساعت ایران نمایش شده اند"
              : "Times displayed based on Iran Standard Time"}
          </p>
          <CiCircleAlert size={isMobile ? 14 : 18} />
        </div>

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
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
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
                    <img
                      className="lg:w-10 w-7 rounded-sm"
                      src={tooltip.data.flag}
                      alt="flag"
                    />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-100 leading-tight">
                    {i18next.language === "fa"
                      ? tooltip.data.fa
                      : tooltip.data.en}
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
                      className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
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
                    className="shrink-0"
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
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-purple-400 truncate">
                    {i18next.language === "fa"
                      ? tooltip.data.fa
                      : tooltip.data.en}
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
    </>
  );
}
