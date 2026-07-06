import { useState, useEffect, useRef } from "react";
import type { DateKey, ParamKey, Lang } from "../types/type";
import { toFa } from "../helpers/helperFunc";
import { i18n, CDLocalized } from "../data/fakeData";
import type { DayDatas } from "../types/interfaces";
import { MdKeyboardArrowDown } from "react-icons/md";
import FlashIcon from "../icons/FlashIcon";
import i18next from "i18next";

function Dropdown<T extends string>({
  label,
  items,
  active,
  section,
  onSelect,
}: {
  label: string;
  items: { v: T; l: string }[];
  active: T;
  section: string;
  onSelect: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-normal transition-all
          border-gray-300 dark:border-neutral-700 
          bg-white dark:bg-[#3A3A3A] 
          text-gray-700 dark:text-white
          hover:border-gray-400 dark:hover:border-neutral-500 
          cursor-pointer whitespace-nowrap
          ${open ? "border-gray-400 dark:border-neutral-500" : ""}`}
      >
        <span
          className={`text-xs text-gray-400 dark:text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <MdKeyboardArrowDown />
        </span>
        <span className="whitespace-nowrap">{label}</span>
      </button>

      {open && (
        <div
          dir={i18next.language === "fa" ? "ltr" : "rtl"}
          className="absolute top-[calc(100%+6px)] flex flex-col items-center z-50 min-w-40 sm:min-w-45 rounded-xl border p-1.5
            bg-white dark:bg-[#2B2B2B]
            border-gray-200 dark:border-neutral-700
            shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          style={{ left: 0 }}
        >
          <p
            className={`text-[10px] text-gray-400 dark:text-neutral-500 px-2.5 py-1 font-bold tracking-wide ${i18next.language === "fa" ? "text-right" : "text-left"}`}
          >
            {section}
          </p>
          {items.map((item) => (
            <div
              key={item.v}
              onClick={() => {
                onSelect(item.v);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer text-xs font-medium transition-colors
                hover:bg-gray-50 dark:hover:bg-[#3A3A3A]
                ${active === item.v ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-700 dark:text-white"}
                ${i18next.language === "fa" ? "flex-row-reverse" : ""}`}
            >
              <span className="whitespace-nowrap">{item.l}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${active === item.v ? "bg-indigo-600 dark:bg-indigo-400" : "bg-current opacity-30"}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

//@ts-ignore
function MonthDropdown({
  active,
  onSelect,
  lang,
  dates,
}: {
  active: DateKey;
  onSelect: (v: DateKey) => void;
  lang: Lang;
  dates: { v: DateKey; l: string }[];
}) {
  const isFa = lang === "fa";

  const months = dates.filter((d) => {
    const v = d.v as string;
    return (
      v.includes("dec") ||
      v.includes("nov") ||
      v.includes("oct") ||
      v.includes("sep") ||
      v.includes("aug") ||
      v.includes("jul") ||
      v.includes("jun") ||
      v.includes("may") ||
      v.includes("apr") ||
      v.includes("mar") ||
      v.includes("feb") ||
      v.includes("jan")
    );
  });

  const finalMonths = months.length > 0 ? months : dates.slice(0, 3);

  const activeMonth = finalMonths.find((m) => m.v === active);
  const label = activeMonth?.l || (isFa ? "ماه" : "Month");

  return (
    <Dropdown
      label={label}
      items={finalMonths}
      active={active}
      section={isFa ? "ماه‌های سال" : "Months"}
      onSelect={onSelect}
    />
  );
}
//@ts-ignore
function QuarterDropdown({
  active,
  onSelect,
  lang,
  dates,
}: {
  active: DateKey;
  onSelect: (v: DateKey) => void;
  lang: Lang;
  dates: { v: DateKey; l: string }[];
}) {
  const isFa = lang === "fa";

  const quarters = dates.filter((d) => {
    const v = d.v as string;
    return (
      v.includes("q1") ||
      v.includes("q2") ||
      v.includes("q3") ||
      v.includes("q4")
    );
  });

  const finalQuarters = quarters.length > 0 ? quarters : dates.slice(3);

  const activeQuarter = finalQuarters.find((q) => q.v === active);
  const label = activeQuarter?.l || (isFa ? "کوارتر" : "Quarter");

  return (
    <Dropdown
      label={label}
      items={finalQuarters}
      active={active}
      section={isFa ? "کوارترهای سال" : "Quarters"}
      onSelect={onSelect}
    />
  );
}

function StreakDonut({ wins, losses }: { wins: number; losses: number }) {
  const r = 33,
    circ = 2 * Math.PI * r,
    gap = 3;
  const total = wins + losses;
  const winArc = total > 0 ? (circ * wins) / total : 0;
  const lossArc = circ - winArc;
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      className="shrink-0 w-14 h-14 sm:w-21 sm:h-21"
    >
      <circle
        cx="42"
        cy="42"
        r={r}
        fill="none"
        stroke="#e5e7eb dark:#2e2e2e"
        strokeWidth="7"
        className="stroke-gray-200 dark:stroke-[#2e2e2e]"
      />
      {lossArc > gap && (
        <circle
          cx="42"
          cy="42"
          r={r}
          fill="none"
          stroke="#b91c1c"
          strokeWidth="7"
          strokeDasharray={`${lossArc - gap} ${circ}`}
          strokeDashoffset={-(winArc + gap / 2)}
          strokeLinecap="round"
          transform="rotate(-90 42 42)"
        />
      )}
      {winArc > gap && (
        <circle
          cx="42"
          cy="42"
          r={r}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="7"
          strokeDasharray={`${winArc - gap} ${circ}`}
          strokeDashoffset={gap / 2}
          strokeLinecap="round"
          transform="rotate(-90 42 42)"
        />
      )}
    </svg>
  );
}

function DayCell({ day, isCur }: { day: DayDatas; isCur: boolean }) {
  const has = day.p !== undefined;
  const isProfit = has && day.p! > 0;
  const isLoss = has && day.p! < 0;

  const bg = isProfit
    ? "bg-green-600 dark:bg-green-700"
    : isLoss
      ? "bg-red-600 dark:bg-red-700"
      : isCur
        ? "bg-gray-100 dark:bg-[#3A3A3A]"
        : "bg-gray-50 dark:bg-[#2B2B2B] opacity-40";

  const textColor =
    isProfit || isLoss ? "text-white" : "text-gray-400 dark:text-neutral-500";

  return (
    <div
      className={`md:rounded-[14px] rounded-sm px-1.5 sm:px-3 py-1.5 sm:py-2.5 flex flex-col overflow-hidden transition-all
        w-full min-h-15 sm:min-h-16.25 lg:h-16.25
        ${bg}
      `}
    >
      <span
        className={`text-[10px] sm:text-[11px] font-bold leading-none ${textColor}`}
        style={{ direction: "ltr" }}
      >
        {toFa(day.d)}
      </span>
      {has && (
        <div className="flex flex-col gap-0.5 text-center">
          <span className="text-white font-black text-center leading-tight whitespace-nowrap text-[8px] sm:text-[11px] lg:text-[14px]">
            {isProfit}
            {day.p!}
          </span>
          <span className="text-[7px] text-center sm:text-[9px] leading-none text-white/65">
            {day.t!} {i18next.language === "fa" ? "ترید" : "Trade"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function CalendarAnalysis() {
  const [lang, setLang] = useState<Lang>(() => {
    const currentLang = i18next.language;
    return currentLang === "en" || currentLang === "fa"
      ? (currentLang as Lang)
      : "fa";
  });

  const [sp, setSp] = useState<ParamKey>("pnl");
  const [selectedMonth, setSelectedMonth] = useState<DateKey>("dec24");
  const [selectedQuarter, setSelectedQuarter] = useState<DateKey>("q4_24");

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLang = i18next.language as Lang;
      if (newLang === "en" || newLang === "fa") {
        setLang(newLang);
      }
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const T = i18n[lang];

  const cd = CDLocalized[lang][selectedMonth];

  const ap = T.params.find((p) => p.v === sp);

  const weeks: DayDatas[][] = [];
  if (cd && cd.days) {
    for (let i = 0; i < cd.days.length; i += 7)
      weeks.push(cd.days.slice(i, i + 7));
  }

  const allDates = T.dates;
  const monthItems = allDates.filter((d) => {
    const v = d.v as string;
    return (
      v.includes("dec") ||
      v.includes("nov") ||
      v.includes("oct") ||
      v.includes("sep") ||
      v.includes("aug") ||
      v.includes("jul") ||
      v.includes("jun") ||
      v.includes("may") ||
      v.includes("apr") ||
      v.includes("mar") ||
      v.includes("feb") ||
      v.includes("jan")
    );
  });

  const quarterItems = allDates.filter((d) => {
    const v = d.v as string;
    return (
      v.includes("q1") ||
      v.includes("q2") ||
      v.includes("q3") ||
      v.includes("q4")
    );
  });

  return (
    <div
      className="p-2 step-test39 transition-colors "
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      <div
        className="bg-gray-50 dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] rounded-2xl border-4
        dark:border-[#3C3C3C]
        border-gray-300 p-2 sm:p-4 lg:p-6"
      >
        <div className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-5">
          <div
            className={`flex flex-wrap gap-2 justify-center sm:${i18next.language === "fa" ? "justify-end" : "justify-start"} w-full sm:gap-2.5`}
          >
            <Dropdown
              label={ap?.l ?? T.pp}
              items={T.params}
              active={sp}
              section={T.psec}
              onSelect={setSp}
            />

            <Dropdown
              label={
                monthItems.find((m) => m.v === selectedMonth)?.l ||
                (lang === "fa" ? "ماه" : "Month")
              }
              items={monthItems.length > 0 ? monthItems : T.dates.slice(0, 3)}
              active={selectedMonth}
              section={lang === "fa" ? "ماه‌های سال" : "Months"}
              onSelect={(v) => setSelectedMonth(v as DateKey)}
            />

            <Dropdown
              label={
                quarterItems.find((q) => q.v === selectedQuarter)?.l ||
                (lang === "fa" ? "کوارتر" : "Quarter")
              }
              items={quarterItems.length > 0 ? quarterItems : T.dates.slice(3)}
              active={selectedQuarter}
              section={lang === "fa" ? "کوارترهای سال" : "Quarters"}
              onSelect={(v) => setSelectedQuarter(v as DateKey)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-16 ml-auto w-full sm:w-auto">
            <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-2 min-w-0 w-full sm:w-auto">
              <span className="text-xs sm:text-[15px] font-bold text-gray-500 dark:text-neutral-400">
                {T.mpdl}
              </span>
              <span className="text-[11px] sm:text-[13px] text-center w-full text-gray-500 dark:text-neutral-400">
                {cd?.mpd?.date}
              </span>
              <span className="text-[18px] sm:text-[22px] w-full text-center text-shadow-sm text-shadow-[#3ADE63] font-black text-green-500 dark:text-green-400 leading-tight tracking-tight">
                ${cd?.mpd?.pnl ?? 0}
              </span>
            </div>

            <div className="hidden sm:block w-px self-stretch min-h-12.5 bg-gray-300 dark:bg-neutral-700" />

            <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
              <StreakDonut wins={cd?.str?.w ?? 0} losses={cd?.str?.l ?? 0} />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[11px] text-center sm:text-[13px] font-bold text-gray-900 dark:text-white">
                  {T.stitle}
                </span>
                <span className="text-[8px] text-center sm:text-[10px] text-gray-500 dark:text-white truncate">
                  {cd?.str?.s} – {cd?.str?.e}
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-1 flex-wrap">
                  <span className="text-[9px] sm:text-[11px] font-semibold text-gray-700 dark:text-neutral-300 whitespace-nowrap">
                    {cd?.str?.d} {T.du} – {cd?.str?.t} {T.tu}
                  </span>
                  <span className="text-yellow-400 text-[10px] sm:text-xs">
                    <FlashIcon />
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] sm:text-[10px] text-center w-[34px] h-[15px] font-bold px-1 sm:px-1.5 rounded bg-indigo-600 text-white">
                      {cd?.str?.w}
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-center w-[34px] h-[15px] font-bold px-1 sm:px-1.5 rounded bg-red-600 text-white">
                      {cd?.str?.l}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-neutral-700 mb-3 sm:mb-4" />

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <div className="min-w-0 sm:min-w-85 px-2 sm:px-0">
            <div className="grid grid-cols-7 gap-1 sm:gap-2.5 mb-1.5">
              {T.wds.map((w) => (
                <div
                  key={w}
                  className="text-center text-[9px] sm:text-[11px] font-bold text-gray-500 dark:text-neutral-500 py-1"
                >
                  {w}
                </div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div
                key={wi}
                className="grid grid-cols-7 gap-1 sm:gap-5 mb-1.5 sm:mb-2.5"
              >
                {week.map((day, di) => (
                  <DayCell
                    key={`${wi}-${di}`}
                    day={day}
                    isCur={day.m === cd?.cur}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
