import { useState, useEffect, useRef } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { FiX, FiFilter, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { NewsEvent, Session } from "../types/interfaces";
import { NEWS, SESSIONS } from "../data/fakeData";
import i18next from "i18next";
import map from "../assets/images/map.png";

const COLORS = {
  bgApp: "#F6F8FA",
  bgSoft: "#EEF1F7",
  bgCard: "#FFFFFF",
  bgElevated: "#FAFBFD",

  textPrimary: "#1F2430",
  textSecondary: "#5B657A",
  textTertiary: "#8A93A6",
  textDisabled: "#B7BFCD",
  textWhite: "#FFFFFF",

  borderDefault: "#E3E7F0",
  borderSoft: "#EDF1F5",
  borderStrong: "#D6DCE8",

  brandPrimary: "#7C5CFA",
  brandHover: "#6B4DF0",
  brandPressed: "#5A3FE0",
  brandSoft: "#EDE9FF",
  brandSubtle: "#F5F2FF",

  accentTeal: "#28B5A8",
  accentHover: "#1FA79B",
  accentSoft: "#DDF7F4",

  success: "#22B36B",
  successSoft: "#E6F8EF",
  warning: "#D9A441",
  warningSoft: "#FFF5DF",
  danger: "#EE5A5A",
  dangerSoft: "#FDEAEA",
  info: "#4F7CFF",
  infoSoft: "#EAF0FF",

  chartPurple: "#7C5CFA",
  chartTeal: "#28B5A8",
  chartGreen: "#22B36B",
  chartAmber: "#D9A441",
  chartRed: "#EE5A5A",
  chartDark: "#1F2430",
};

const IMPACT_COLOR = {
  High: COLORS.danger,
  Medium: COLORS.warning,
  Low: COLORS.success,
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

function normDiff(a: number) {
  return ((a % 24) + 24) % 24;
}

function isLive(s: Session, cur: number) {
  return s.end > 24
    ? cur >= s.start || cur < s.end - 24
    : cur >= s.start && cur < s.end;
}

function isTimeInSession(s: Session, time: number) {
  return s.end > 24
    ? time >= s.start || time < s.end - 24
    : time >= s.start && time < s.end;
}

type SessionState = "live" | "upcoming" | "ended";

function getSessionState(s: Session, cur: number): SessionState {
  if (isLive(s, cur)) return "live";
  const endMod = s.end % 24;
  const hoursSinceEnd = normDiff(cur - endMod);
  const hoursUntilStart = normDiff(s.start - cur);
  return hoursSinceEnd < hoursUntilStart ? "ended" : "upcoming";
}

function getSessionSortKey(s: Session, cur: number) {
  const state = getSessionState(s, cur);
  const endMod = s.end % 24;
  const hoursSinceEnd = normDiff(cur - endMod);
  const hoursUntilStart = normDiff(s.start - cur);
  if (state === "live") return 0 + normDiff(cur - s.start) / 100;
  if (state === "upcoming") return 1000 + hoursUntilStart;
  return 2000 + hoursSinceEnd;
}

function getDates() {
  const now = new Date();

  const shamsi = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(now);

  const gregorian = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(now);

  const iranTime = new Date(
    now.getTime() + now.getTimezoneOffset() * 60000 + 3.5 * 3600000,
  );
  const timeStr = iranTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return { gregorian, shamsi, timeStr };
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

const NewsFilters = ({
  lang,
  onFilterChange,
  onSearchChange,
  onReset,
  filterImpact,
  searchQuery,
  totalNews,
}: {
  lang: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  filterImpact: string;
  searchQuery: string;
  totalNews: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const impactOptions = [
    {
      value: "all",
      label: lang === "fa" ? "همه" : "All",
      color: COLORS.textTertiary,
    },
    {
      value: "High",
      label: lang === "fa" ? "خیلی زیاد" : "Very High",
      color: COLORS.danger,
    },
    {
      value: "Medium",
      label: lang === "fa" ? "متوسط" : "Medium",
      color: COLORS.warning,
    },
    {
      value: "Low",
      label: lang === "fa" ? "کم" : "Low",
      color: COLORS.success,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div id="news4" className="flex items-center gap-2 w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border border-[#4A4A4A] bg-[#FAFBFD] dark:bg-transparent text-[#5B657A] dark:text-slate-300"
        >
          <FiFilter size={14} />
          <span>{i18next.language === "fa" ? "فیلتر" : "Filter"}</span>
          {filterImpact !== "all" && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          )}
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={
              i18next.language === "fa" ? "جستجوی خبر..." : "Search news..."
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-[#FAFBFD] dark:bg-transparent border border-[#E3E7F0] dark:border-[#3C3C3C] text-xs sm:text-sm text-[#5B657A] dark:text-slate-200 placeholder-[#8A93A6] dark:placeholder-slate-500 focus:outline-none focus:border-[#7C5CFA] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A93A6] dark:text-slate-500 hover:text-[#5B657A] dark:hover:text-slate-300"
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        <span className="text-[10px] text-[#8A93A6] dark:text-slate-500 whitespace-nowrap">
          {totalNews} {lang === "fa" ? "خبر" : "news"}
        </span>
      </div>

      {isOpen && (
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg border border-[#EDF1F5] dark:border-[#3C3C3C] bg-[#FAFBFD] dark:bg-transparent">
          {impactOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onFilterChange(option.value);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                filterImpact === option.value
                  ? "text-[#7C5CFA] border border-[#7C5CFA]/50 dark:text-[#7C5CFA] dark:border-[#7C5CFA]/50"
                  : "text-[#5B657A] dark:text-slate-400 border border-transparent"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: option.color }}
              />
              {option.label}
            </button>
          ))}

          {(filterImpact !== "all" || searchQuery) && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-[#FDEAEA] dark:bg-red-500/20 text-[#EE5A5A] dark:text-red-400 border border-[#EE5A5A]/30 dark:border-red-500/30 hover:bg-[#EE5A5A]/20 dark:hover:bg-red-500/30 transition-all duration-200"
            >
              <FiX size={12} />
              {lang === "fa" ? "پاک کردن" : "Clear"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default function TradingSessionsMap({ lang = "fa" }) {
  const [cur, setCur] = useState(getIranHour());
  const [activeSessions, setActiveSessions] = useState<string[]>(
    SESSIONS.map((s) => s.id),
  );
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [newsFilterImpact, setNewsFilterImpact] = useState<string>("all");
  const [newsFilterSearch, setNewsFilterSearch] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(getDates());
  const rootRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "fa";

  useEffect(() => {
    const iv = setInterval(() => {
      setCur(getIranHour());
      setCurrentTime(getDates());
    }, 30000);
    return () => clearInterval(iv);
  }, [lang]);

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

  // ترتیب داینامیک سشن‌ها: سشن جاری بالا، بعد نزدیک‌ترین سشن آینده، در آخر سشن‌های تمام‌شده
  const orderedSessions = [...SESSIONS].sort(
    (a, b) => getSessionSortKey(a, cur) - getSessionSortKey(b, cur),
  );

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

  // 00 تا 24 (شامل خودِ 24:00)
  const hourLabels = Array.from({ length: 25 }, (_, i) => i);

  const newsAreaBaseTop = isMobile ? 4 : 6;
  const newsAreaRowGap = isMobile ? 34 : 46;
  const newsAreaHeight = isMobile ? 90 : 116;

  const getImpactColor = (impact: string) => {
    return (
      IMPACT_COLOR[impact as keyof typeof IMPACT_COLOR] || COLORS.textTertiary
    );
  };

  const getSessionColorByTime = (time: number) => {
    for (const session of SESSIONS) {
      if (isTimeInSession(session, time)) return session.dot;
    }
    let closest = SESSIONS[0];
    let minDist = Infinity;
    for (const session of SESSIONS) {
      const dist = Math.min(
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

  const getTooltipBg = (tt: TooltipState) => {
    if (tt.type === "current") return COLORS.brandPrimary;
    if (tt.type === "news" && tt.data)
      return `${getImpactColor(tt.data.impact)}e6`;
    const color = getSessionColorByTime(tt.time);
    return `${color}e6`;
  };

  const getTooltipBorder = (tt: TooltipState) => {
    if (tt.type === "current") return COLORS.brandHover;
    if (tt.type === "news" && tt.data) return getImpactColor(tt.data.impact);
    return getSessionColorByTime(tt.time);
  };

  const SessionStateBadge = ({ state }: { state: SessionState }) => {
    const map = {
      live: {
        fa: "در حال برگزاری",
        en: "Live",
        cls: "bg-[#E6F8EF] text-[#22B36B] border-[#22B36B]/30",
      },
      upcoming: {
        fa: "به‌زودی",
        en: "Upcoming",
        cls: "bg-[#EAF0FF] text-[#4F7CFF] border-[#4F7CFF]/30",
      },
      ended: {
        fa: "تمام‌شده",
        en: "Ended",
        cls: "bg-[#EEF1F7] text-[#8A93A6] border-[#D6DCE8]",
      },
    } as const;
    const m = map[state];
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold border ${m.cls} dark:bg-transparent dark:border-[#3C3C3C]`}
      >
        {state === "live" && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#22B36B] animate-pulse" />
        )}
        {i18next.language === "fa" ? m.fa : m.en}
      </span>
    );
  };

  const MobileSessionCard = ({
    session,
    state,
  }: {
    session: Session;
    state: SessionState;
  }) => {
    const isActive = activeSessions.includes(session.id);
    const live = state === "live";
    const ended = state === "ended";
    const sessionNews = filteredNews.filter((n) =>
      isTimeInSession(session, n.time),
    );

    const duration =
      session.end > 24
        ? session.end - 24 - session.start + 24
        : session.end - session.start;
    const relCur = live
      ? cur >= session.start
        ? cur - session.start
        : cur + 24 - session.start
      : 0;
    const midLabel = fmt((session.start + duration / 2) % 24);

    return (
      <div
        className={`border rounded-xl p-3 mb-2 bg-white dark:bg-transparent shadow-sm transition-all duration-300 ${
          ended
            ? "border-[#E3E7F0] dark:border-[#3C3C3C] opacity-60 grayscale-[0.35]"
            : "border-[#E3E7F0] dark:border-[#3C3C3C]"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative shrink-0">
            <img src={session.icon} className="w-6 h-6 object-contain" alt="" />
            {isActive && live && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: session.dot,
                  opacity: 0.15,
                  animationDuration: "1.5s",
                }}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-sm font-bold flex items-center gap-1.5"
                style={{
                  color: isActive ? session.color : COLORS.textDisabled,
                }}
              >
                {i18next.language === "fa"
                  ? session.fa.replace("سشن ", "")
                  : session.en.replace(" Session", "")}
                <SessionStateBadge state={state} />
              </span>
              <span
                className="text-xs font-mono"
                style={{
                  color: isActive ? session.color : COLORS.textDisabled,
                }}
              >
                {fmt(session.start)} - {fmt(session.end % 24)}
              </span>
            </div>
          </div>
        </div>

        {/* Combined Timeline Area — فقط بازه‌ی همین سشن */}
        <div className="relative flex flex-col h-[80px] bg-[#F6F8FA] dark:bg-transparent rounded-lg border border-[#EDF1F5] dark:border-[#3C3C3C] overflow-hidden">
          {/* 1. Session Color Bar (Background) */}
          <div
            className="absolute top-[40%] left-0 h-[20px] w-full rounded-full transition-all duration-500 opacity-60"
            style={{
              background: session.bg,
              border: `1px solid ${session.border}`,
              opacity: isActive ? 1 : 0.3,
            }}
          />

          {/* 2. Hour Grid & Labels — فقط شروع/میانه/پایان همین سشن */}
          <div className="absolute top-[40%] w-full h-[20px] flex justify-between px-2 z-0">
            <span className="text-[8px] text-[#8A93A6] dark:text-slate-500 font-mono">
              {fmt(session.start)}
            </span>
            <span className="text-[8px] text-[#8A93A6] dark:text-slate-500 font-mono">
              {midLabel}
            </span>
            <span className="text-[8px] text-[#8A93A6] dark:text-slate-500 font-mono">
              {fmt(session.end % 24)}
            </span>
          </div>

          <div className="absolute top-0 w-full h-[40%] flex items-end justify-center z-10 px-0.5">
            {sessionNews.map((n) => {
              const rel =
                session.end > 24
                  ? n.time >= session.start
                    ? n.time - session.start
                    : 24 - session.start + n.time
                  : n.time - session.start;
              const posPct = Math.min(98, Math.max(2, (rel / duration) * 100));
              const impactColor = getImpactColor(n.impact);
              const isPastNews = n.time < cur;
              const isNext = n.id === nextUpId && !isPastNews;

              return (
                <div
                  key={`mobile-line-${n.id}`}
                  className="absolute bottom-0 flex flex-col items-center cursor-pointer tooltip-trigger group"
                  style={{
                    left: `${posPct}%`,
                    transform: "translateX(-50%)",
                    height: "100%",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltip(
                      e,
                      "news",
                      n,
                      n.time,
                      i18next.language === "fa" ? n.fa : n.en,
                      `mobile-news-${n.id}`,
                    );
                  }}
                >
                  <span className="text-[9px] font-bold text-[#5B657A] dark:text-slate-300 mb-1 group-hover:text-[#7C5CFA] transition-colors whitespace-nowrap">
                    {fmt(n.time)}
                  </span>

                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-px h-4 ${isPastNews ? "opacity-50" : ""}`}
                      style={{
                        background: isPastNews
                          ? COLORS.borderDefault
                          : impactColor,
                      }}
                    />
                    <span
                      className="absolute top-[30%] w-2.5 h-2.5 rounded-full z-5 transition-transform group-hover:scale-125"
                      style={{
                        background: impactColor,
                        border: `2px solid ${session.dot}`,
                        opacity: isPastNews ? 0.7 : 1,
                        boxShadow: isPastNews
                          ? "none"
                          : `0 0 8px ${impactColor}60`,
                      }}
                    />
                  </div>

                  {isNext && (
                    <span className="absolute -top-1 right-1/2 translate-x-1/2 flex h-2.5 w-2.5 z-10">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A441] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D9A441]" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 4. Current Time Indicator (Line) — فقط وقتی این سشن الان زنده است */}
          {isActive && live && (
            <div
              className="absolute top-0 h-full w-0.5 z-20 animate-pulse"
              style={{
                left: `${(relCur / duration) * 100}%`,
                background: COLORS.success,
                boxShadow: `0 0 12px ${COLORS.success}`,
              }}
            />
          )}
        </div>

        {/* NEWS FEED LIST MOBILE UI */}
        <div className="mt-3 pt-2 border-t border-[#EDF1F5] dark:border-[#3C3C3C] relative group">
          <div className="flex items-center justify-between text-[10px] mb-2">
            <span className="font-bold text-[#5B657A] dark:text-slate-400">
              {i18next.language === "fa" ? "رویدادهای خبری" : "News Events"}
            </span>
            <span className="text-[#8A93A6] dark:text-slate-500">
              {sessionNews.length} {i18next.language === "fa" ? "خبر" : "News"}
            </span>
          </div>

          <div className="flex flex-row items-center gap-2 overflow-x-auto scrollbar-hide py-1 px-0.5 relative">
            {sessionNews.map((n) => {
              const isPast = n.time < cur;
              const isNext = n.id === nextUpId && !isPast;
              const impactColor = getImpactColor(n.impact);

              return (
                <div
                  key={n.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTooltip(
                      e as any,
                      "news",
                      n,
                      n.time,
                      i18next.language === "fa" ? n.fa : n.en,
                      `feed-news-${n.id}`,
                    );
                  }}
                  className={`shrink-0 flex items-center gap-1.5 px-2 py-1.5 rounded-md border cursor-pointer transition-all duration-200 ${
                    isNext
                      ? "bg-[#EDE9FF] dark:bg-[#2a2a2a] border-[#7C5CFA] dark:border-[#7C5CFA] shadow-sm"
                      : isPast
                        ? "bg-[#F6F8FA] dark:bg-transparent border-[#E3E7F0] dark:border-[#3C3C3C] opacity-60"
                        : "bg-white dark:bg-[#2a2a2a] border-[#EDF1F5] dark:border-[#4A4A4A] hover:border-[#7C5CFA]"
                  }`}
                  style={{
                    boxShadow: !isPast
                      ? `0 0 0 1px ${impactColor}20 inset`
                      : "none",
                  }}
                >
                  <img
                    className="w-4 h-3 rounded-sm object-cover"
                    src={n.flag}
                    alt=""
                  />
                  <span
                    className={`text-[9px] whitespace-nowrap max-w-[60px] truncate ${
                      isNext
                        ? "font-bold text-[#1F2430] dark:text-white"
                        : "text-[#5B657A] dark:text-slate-400"
                    }`}
                  >
                    {i18next.language === "fa" ? n.fa : n.en}
                  </span>
                  <span className="text-[8px] font-mono text-[#8A93A6] dark:text-slate-500 ml-0.5">
                    {fmt(n.time)}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: impactColor,
                      boxShadow: isNext ? `0 0 6px ${impactColor}` : "none",
                    }}
                  />
                </div>
              );
            })}
            {sessionNews.length === 0 && (
              <span className="text-[10px] text-[#8A93A6] dark:text-slate-600 w-full text-center py-1">
                {i18next.language === "fa"
                  ? "هیچ خبری در این بازه ثبت نشده است."
                  : "No news in this session."}
              </span>
            )}
          </div>

          {sessionNews.length > 1 && (
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                className="p-1 rounded-full border border-[#E3E7F0] dark:border-[#3C3C3C] hover:bg-[#F6F8FA] dark:hover:bg-[#2a2a2a] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {isRtl ? <FiArrowRight size={12} /> : <FiArrowLeft size={12} />}
              </button>
              <button
                className="p-1 rounded-full border border-[#E3E7F0] dark:border-[#3C3C3C] hover:bg-[#F6F8FA] dark:hover:bg-[#2a2a2a] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {isRtl ? <FiArrowLeft size={12} /> : <FiArrowRight size={12} />}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 pt-1">
          <button
            onClick={() => toggleSession(session.id)}
            className="text-[9px] font-medium transition-colors hover:opacity-80"
            style={{
              color: isActive ? session.color : COLORS.textDisabled,
            }}
          >
            {isActive
              ? i18next.language === "fa"
                ? "✓ فعال"
                : "✓ Active"
              : i18next.language === "fa"
                ? "✕ غیرفعال"
                : "✕ Inactive"}
          </button>

          <span className="text-[8px] text-[#8A93A6] dark:text-slate-500">
            {sessionNews.length} {i18next.language === "fa" ? "خبر" : "news"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        id="tabale1"
        ref={rootRef}
        className="step-test43 rounded-2xl bg-[#FAFBFD] dark:bg-transparent border border-[#E3E7F0] dark:border-[#3C3C3C] md:pr-2 md:pl-2 mt-3 text-[#1F2430] dark:text-slate-200 w-full min-h-0 pb-3 overflow-hidden select-none shadow-sm"
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest(".tooltip-trigger")) {
            clearTooltip();
          }
        }}
      >
        {/* هدر ساعت/تاریخ — مشابه بقیه‌ی سکشن‌ها کادر دارد */}
        <div id="news1" className="px-4 pt-3 pb-2">
          <div className="rounded-xl border border-[#E3E7F0] dark:border-[#3C3C3C] bg-white dark:bg-transparent px-4 py-3">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-3">
                <IoMdTime className="text-[#7C5CFA] dark:text-[#7C5CFA] w-5 h-5 hidden md:block" />
                <span className="md:text-3xl font-bold text-[#1F2430] dark:text-white tracking-wider tabular-nums">
                  {currentTime.timeStr}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-[#5B657A] dark:text-slate-400">
                  <CiCalendar className="text-[#7C5CFA] dark:text-[#7C5CFA] hidden sm:block w-4 h-4" />
                  <span
                    className="font-medium text-[#1F2430] dark:text-slate-200 text-xs sm:text-sm"
                    dir="rtl"
                  >
                    {currentTime.shamsi}
                  </span>
                </div>

                <span className="text-[#D6DCE8] dark:text-[#3C3C3C] text-xs">
                  |
                </span>

                <div className="flex items-center gap-1.5 text-[#5B657A] dark:text-slate-400">
                  <CiCalendar className="text-[#7C5CFA] dark:text-[#7C5CFA] hidden sm:block w-4 h-4" />
                  <span className="font-medium text-xs sm:text-sm text-[#5B657A] dark:text-slate-400">
                    {currentTime.gregorian}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2 sm:mx-auto rounded-xl overflow-hidden relative">
          {/* دسکتاپ */}
          <div className="hidden md:block">
            <div
              className="relative bg-[#F6F8FA] dark:bg-transparent"
              style={{ height: newsAreaHeight, overflow: "visible" }}
            >
              <div
                className="absolute z-30 flex flex-col items-center"
                style={{
                  top: isMobile ? 4 : 6,
                  left: pct(cur),
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  className="rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 flex flex-col items-center gap-0.5 border border-[#7C5CFA] text-white whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: COLORS.brandPrimary,
                    boxShadow: `0 0 10px rgba(124, 92, 250, 0.5)`,
                    minWidth: isMobile ? 40 : 55,
                  }}
                >
                  <span
                    className="font-medium text-white/80"
                    style={{ fontSize: isMobile ? 8 : 10 }}
                  >
                    {i18next.language === "fa" ? "الان" : "Now"}
                  </span>
                  <span
                    className="font-bold text-white tracking-wide"
                    style={{ fontSize: isMobile ? 10 : 12 }}
                  >
                    {fmt(cur)}
                  </span>
                  <IoMdTime size={isMobile ? 11 : 14} className="text-white" />
                </div>
                <div
                  className="w-px bg-[#7C5CFA]"
                  style={{ height: isMobile ? 6 : 10 }}
                />
              </div>

              {sorted.map((n, i) => {
                const isPast = n.time < cur;
                const isNext = n.id === nextUpId && !isPast;
                const row = rowMap[n.id] ?? 0;
                const topOffset = newsAreaBaseTop + row * newsAreaRowGap;
                const zIdx = isNext ? 50 : isPast ? 15 - i : 25 + i;

                const impactColor = getImpactColor(n.impact);

                return (
                  <div
                    key={n.id}
                    className="news-marker absolute flex flex-col items-center cursor-pointer tooltip-trigger"
                    style={{
                      top: topOffset,
                      left: pct(n.time),
                      transform: "translateX(-50%)",
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
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A441] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D9A441]" />
                        </span>
                      )}
                      <div
                        className="rounded-md flex flex-col items-center gap-0.5 border whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        style={{
                          padding: isMobile ? "2px 5px" : "5px 8px",
                          background: isPast
                            ? COLORS.bgSoft
                            : isNext
                              ? `${impactColor}30`
                              : `${impactColor}18`,
                          borderColor: isPast
                            ? COLORS.borderDefault
                            : isNext
                              ? impactColor
                              : `${impactColor}80`,
                          color: isPast
                            ? COLORS.textTertiary
                            : isNext
                              ? COLORS.textPrimary
                              : COLORS.textSecondary,
                          boxShadow: isPast
                            ? "none"
                            : isNext
                              ? `0 0 14px ${impactColor}60`
                              : `0 0 8px ${impactColor}30`,
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
                              className="font-bold text-[#1F2430] tracking-wide"
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
                                className="font-medium text-[#5B657A] opacity-80"
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
                              className="font-bold tracking-wide text-[#1F2430]"
                            >
                              {fmt(n.time)}
                            </span>
                            <CiCalendar
                              size={16}
                              style={{
                                color: isPast
                                  ? COLORS.textTertiary
                                  : impactColor,
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
                          ? COLORS.borderDefault
                          : isNext
                            ? impactColor
                            : `${impactColor}80`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="relative border-b border-[#EDF1F5] dark:border-[#3C3C3C]"
              style={{ height: isMobile ? 20 : 24 }}
            >
              {hourLabels.map((h) => {
                if (h % 2 !== 0 && h !== 24) return null;

                return (
                  <div
                    key={h}
                    className="absolute font-medium flex"
                    style={{
                      top: "20%",
                      left: `${(h / 24) * 100}%`,
                      transform:
                        h === 24
                          ? "translateX(-100%)"
                          : h === 0
                            ? "translateX(0%)"
                            : "translateX(-50%)",
                      textAlign: "center",
                      color: "#8A93A6",
                      letterSpacing: "0.3px",
                      padding: isMobile ? "1px 3px" : "2px 6px",
                      borderRadius: "3px",
                      fontSize: isMobile ? "8px" : "11px",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(4px)",
                    }}
                  >
                    {h === 24 ? "24:00" : `${String(h).padStart(2, "0")}:00`}
                  </div>
                );
              })}
            </div>

            {!isMobile && (
              <div
                id="news2"
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
                      <circle cx="5.5" cy="5.5" r="1.1" fill="#3a3030" />
                    </pattern>
                  </defs>

                  <rect width="1000" height="420" fill="url(#bgGradient)" />
                  <rect width="1000" height="420" fill="url(#dp2)" />

                  {/* موقعیت دقیق هر شهر روی نقشه از مختصات mapX/mapY خودِ دیتا می‌آید،
                      نه از محاسبه‌ی زمانی — یعنی دایره‌ها همیشه سرجای جغرافیایی درست‌شان هستند */}
                  {SESSIONS.map((s) => {
                    const on = activeSessions.includes(s.id);
                    const cx = ((s.mapX ?? 50) / 100) * 1000;
                    const cy = ((s.mapY ?? 50) / 100) * 420;

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
                        {!on && (
                          <circle cx={cx} cy={cy} r="3.5" fill="#B7BFCD" />
                        )}

                        <text
                          x={cx}
                          y={cy - 16}
                          fontSize="9"
                          fontWeight="normal"
                          fill={on ? COLORS.textPrimary : COLORS.textTertiary}
                          textAnchor="middle"
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
                </svg>

                <div
                  className="absolute top-0 bottom-0 w-px z-10 transition-all duration-300"
                  style={{
                    left: pct(cur),
                    background:
                      hoveredLine === "current"
                        ? COLORS.brandPrimary
                        : `${COLORS.brandPrimary}80`,
                    boxShadow:
                      hoveredLine === "current"
                        ? `0 0 20px ${COLORS.brandPrimary}80, 0 0 60px ${COLORS.brandPrimary}40`
                        : "none",
                  }}
                />

                <div
                  className="absolute top-0 bottom-0 z-20 tooltip-trigger"
                  style={{
                    left: `calc(${pct(cur)} - 12px)`,
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
                  const impactColor = getImpactColor(n.impact);

                  return (
                    <div
                      key={`line-${n.id}`}
                      className="absolute top-0 bottom-0 w-px z-10 transition-all duration-300"
                      style={{
                        left: pct(n.time),
                        backgroundImage: isPast
                          ? `repeating-linear-gradient(to bottom,${COLORS.borderStrong} 0,${COLORS.borderStrong} 5px,transparent 5px,transparent 10px)`
                          : `repeating-linear-gradient(to bottom,${impactColor} 0,${impactColor} 5px,transparent 5px,transparent 10px)`,
                        opacity: isPast ? 0.3 : 0.75,
                        boxShadow:
                          isHovered && !isPast
                            ? `0 0 20px ${impactColor}80, 0 0 60px ${impactColor}40`
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
                      left: `calc(${pct(n.time)} - 12px)`,
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
                        left: pct(sH),
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
                              textAlign: "center",
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
                                  color: COLORS.textTertiary,
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
                    ? [
                        drawBar(0, s.end - 24, false),
                        drawBar(s.start, 24, true),
                      ]
                    : drawBar(s.start, s.end, true);
                })}
              </div>
            )}
          </div>

          {/* موبایل - کارت‌های جداگانه، ترتیب داینامیک بر اساس سشن جاری */}
          <div className="md:hidden">
            <div className="flex flex-col px-1 py-2">
              {orderedSessions.map((session) => (
                <MobileSessionCard
                  key={session.id}
                  session={session}
                  state={getSessionState(session, cur)}
                />
              ))}
            </div>
          </div>
        </div>

        {!isMobile && (
          <div
            id="news3"
            className="hidden md:flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 pt-3 pb-1 border-t border-[#EDF1F5] dark:border-[#3C3C3C] mt-2"
          >
            <button
              onClick={toggleAllSessions}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-300 border border-[#D6DCE8] dark:border-[#4A4A4A] bg-[#FAFBFD] dark:bg-transparent text-[#5B657A] dark:text-slate-400 hover:border-[#7C5CFA] hover:scale-105 active:scale-95"
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

            <div className="w-px h-4 sm:h-6 bg-[#E3E7F0] dark:bg-[#3C3C3C]" />

            {SESSIONS.map((session) => {
              const isActive = activeSessions.includes(session.id);
              return (
                <button
                  key={session.id}
                  onClick={() => toggleSession(session.id)}
                  className="group flex items-center gap-1 cursor-pointer sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-300 border border-[#D6DCE8] dark:border-[#4A4A4A] bg-[#FAFBFD] dark:bg-transparent hover:border-[#7C5CFA] hover:scale-105 active:scale-95"
                  style={{
                    color: isActive ? COLORS.textPrimary : COLORS.textDisabled,
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {/* آیکون اختصاصی هر شهر (برج آزادی برای نیویورک و ...) کنار نقطه‌ی رنگی */}
                  <img
                    src={session.icon}
                    className="w-3.5 h-3.5 object-contain shrink-0"
                    alt=""
                  />

                  <span className="relative flex items-center justify-center">
                    <span
                      className="block w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{
                        background: isActive
                          ? session.dot
                          : COLORS.textDisabled,
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

                  <span className="transition-all text-[#5B657A] dark:text-slate-400 duration-300 group-hover:tracking-wider">
                    {i18next.language === "fa"
                      ? session.fa.replace("سشن ", "")
                      : session.en.replace(" Session", "")}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-3 sm:px-4 pt-3 pb-1 border-t border-[#EDF1F5] dark:border-[#3C3C3C] mt-2">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#8A93A6] dark:text-slate-500">
            <CiCircleAlert
              size={isMobile ? 14 : 18}
              className="text-[#5B657A] dark:text-slate-400"
            />
            <span>
              {i18next.language === "fa"
                ? "زمان‌ها بر اساس ساعت ایران"
                : "Iran Standard Time"}
            </span>
          </div>

          <NewsFilters
            lang={lang}
            onFilterChange={setNewsFilterImpact}
            onSearchChange={setNewsFilterSearch}
            onReset={resetNewsFilter}
            filterImpact={newsFilterImpact}
            searchQuery={newsFilterSearch}
            totalNews={filteredNews.length}
          />
        </div>

        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none rounded-xl p-2.5 sm:p-3 shadow-xl"
            style={{
              background: getTooltipBg(tooltip),
              border: `1px solid ${getTooltipBorder(tooltip)}`,
              direction: isRtl ? "rtl" : "ltr",
              ...getTooltipStyle(tooltip),
            }}
          >
            {tooltip.type === "current" && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {tooltip.label}
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-white/80 mt-1">
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
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight">
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
                      background: "rgba(0,0,0,.35)",
                      color: "#ffffff",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                      style={{ background: IMPACT_COLOR[tooltip.data.impact] }}
                    />
                    {tooltip.data.impact} Impact
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-white/80">
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
                <div className="text-[9px] sm:text-[10px] text-white/70 mt-1">
                  {fmt(tooltip.time)}
                </div>
              </>
            )}

            {tooltip.type === "tick" && tooltip.data && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {i18next.language === "fa"
                      ? tooltip.data.fa
                      : tooltip.data.en}
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-white/80 mt-1">
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
