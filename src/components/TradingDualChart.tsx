import { useState, useMemo, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FA_DIGITS,
  PARAMETERS_FIRST,
  PARAMETERS_SECOND,
  PERIOD_LABELS,
} from "../data/fakeData";
import type { Lang, Period } from "../types/type";
import type { Parameter } from "../types/interfaces";
import i18next from "i18next";

const generateRealData = (period: Period) => {
  const now = new Date();
  const data = [];
  const count = period === "daily" ? 7 : period === "weekly" ? 4 : 3;

  const weekDays = {
    fa: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
    en: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  };

  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    if (period === "daily") {
      date.setDate(date.getDate() - (count - 1 - i));
    } else if (period === "weekly") {
      date.setDate(date.getDate() - (count - 1 - i) * 7);
    } else {
      date.setMonth(date.getMonth() - (count - 1 - i));
    }

    const dayIndex = date.getDay();
    const persianDate = `${weekDays.fa[dayIndex]} ${toPersianDate(date)}`;
    const englishDate = `${weekDays.en[dayIndex]} ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

    data.push({
      date: {
        fa: persianDate,
        en: englishDate,
        faShort: `${weekDays.fa[dayIndex].slice(0, 2)} ${toPersianDateShort(date)}`,
        enShort: `${weekDays.en[dayIndex].slice(0, 3)} ${date.getDate()}`,
        faMedium: `${weekDays.fa[dayIndex].slice(0, 3)} ${toPersianDateShort(date)}`,
        enMedium: `${weekDays.en[dayIndex].slice(0, 3)} ${date.getDate()}`,
      },
      param1: Math.floor(Math.random() * 100) + 20,
      param2: Math.floor(Math.random() * 80) + 10,
    });
  }
  return data;
};

function toPersianDate(date: Date): string {
  const year = date.getFullYear() - 621;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
}

function toPersianDateShort(date: Date): string {
  const day = date.getDate();
  return `${day}`;
}

const DATA_MAP = {
  daily: generateRealData("daily"),
  weekly: generateRealData("weekly"),
  monthly: generateRealData("monthly"),
};

function toFaNum(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => FA_DIGITS[d]);
}

function CustomTooltip({
  active,
  payload,
  label,
  lang,
  param1Label,
  param2Label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string; dataKey?: string }[];
  label?: string;
  lang: Lang;
  param1Label: string;
  param2Label: string;
}) {
  if (!active || !payload?.length) return null;

  if (payload.length === 1) {
    const singleItem = payload[0];
    return (
      <div
        className="rounded-xl border border-white/10 backdrop-blur-3xl px-4 py-3 shadow-2xl"
        style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
      >
        <p className="mb-2 text-xs text-gray-400">{label}</p>
        <div className="flex items-center gap-2 text-sm mb-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: "#FF2D55" }}
          />
          <span className="text-gray-300">{param1Label}:</span>
          <span className="font-bold text-white">
            {lang === "fa" ? toFaNum(singleItem.value) : singleItem.value}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: "#7c6af7" }}
          />
          <span className="text-gray-300">{param2Label}:</span>
          <span className="font-bold text-white">
            {lang === "fa" ? toFaNum(0) : 0}
          </span>
        </div>
      </div>
    );
  }

  const param1Data =
    payload.find((p) => p.dataKey === "param1" || p.name === "param1") ||
    payload[0];
  const param2Data =
    payload.find((p) => p.dataKey === "param2" || p.name === "param2") ||
    payload[1];

  return (
    <div
      className="rounded-xl border border-white/10 backdrop-blur-3xl px-4 py-3 shadow-2xl"
      style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
    >
      <p className="mb-2 text-xs text-gray-400">{label}</p>
      {param1Data && (
        <div className="flex items-center gap-2 text-sm mb-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: "#7c6af7" }}
          />
          <span className="text-gray-300">{param1Label}:</span>
          <span className="font-bold text-white">
            {lang === "fa" ? toFaNum(param1Data.value) : param1Data.value}
          </span>
        </div>
      )}
      {param2Data && (
        <div className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: "#7c6af7" }}
          />
          <span className="text-gray-300">{param2Label}:</span>
          <span className="font-bold text-white">
            {lang === "fa" ? toFaNum(param2Data.value) : param2Data.value}
          </span>
        </div>
      )}
    </div>
  );
}

function ParamDropdown({
  options,
  selected,
  onSelect,
  lang,
}: {
  options: Parameter[];
  selected: Parameter;
  onSelect: (p: Parameter) => void;
  lang: Lang;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const term = search.toLowerCase();
    return options.filter((opt) => {
      const labelText = (
        lang === "fa" ? opt.label.fa : opt.label.en
      ).toLowerCase();
      return labelText.includes(term);
    });
  }, [options, search, lang]);

  return (
    <div className="relative w-full min-w-30 sm:min-w-37.5]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center justify-between gap-1
          w-full
          rounded-xl px-3 py-1.5 text-[10px] sm:text-xs font-medium
          border transition-all duration-200
          bg-white/10 text-gray-700 border-gray-200
          dark:bg-white/5 dark:text-white dark:border-white/10
          hover:bg-gray-100 dark:hover:bg-white/15
          hover:border-gray-300 dark:hover:border-white/20
          shadow-sm
        "
      >
        <span className="truncate flex-1 text-left ">
          {i18next.language === "fa"
            ? selected?.label?.fa
            : selected?.label?.en}
        </span>
        <svg
          className={`h-3 w-3 shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="
              absolute top-full left-0 z-50 mt-1
              w-full min-w-[200px] max-w-[280px]
              max-h-[280px] overflow-hidden
              rounded-xl border shadow-2xl
              bg-white border-gray-200
              dark:bg-[#2B2B2B] dark:border-white/10
              animate-in fade-in zoom-in-95 duration-150
            "
          >
            <div className="sticky top-0 z-10 p-2 bg-white dark:bg-[#2B2B2B] border-b border-gray-200 dark:border-white/5">
              <input
                type="text"
                placeholder={lang === "fa" ? "جستجو..." : "Search..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full px-3 py-1.5 text-xs
                  rounded-lg border
                  bg-gray-50 dark:bg-white/5
                  border-gray-200 dark:border-white/10
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                "
                dir={lang === "fa" ? "rtl" : "ltr"}
              />
            </div>
            <div
              className="
                overflow-y-auto overflow-x-hidden pr-2
                scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600
                max-h-55 p-1
              "
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-xs text-center text-gray-500 dark:text-gray-400">
                  {lang === "fa" ? "موردی یافت نشد" : "No results found"}
                </div>
              ) : (
                filteredOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onSelect(opt);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`
                      block w-full px-3 py-2 text-xs rounded-lg transition-all duration-150
                      hover:bg-gray-100 dark:hover:bg-white/10
                      ${
                        opt.id === selected.id
                          ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-[#7c6af7] font-medium"
                          : "text-gray-700 dark:text-gray-300"
                      }
                    `}
                  >
                    {i18next.language === "fa"
                      ? opt?.label?.fa
                      : opt?.label?.en}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function TradingDualChart() {
  const [period, setPeriod] = useState<Period>("daily");
  const [param1, setParam1] = useState<Parameter>(PARAMETERS_FIRST[0]);
  const [param2, setParam2] = useState<Parameter>(PARAMETERS_SECOND[0]);
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("lg");

  const currentLang = i18next.language as Lang;

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("sm");
      } else if (width < 768) {
        setScreenSize("md");
      } else if (width < 1024) {
        setScreenSize("lg");
      } else {
        setScreenSize("xl");
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const useShortLabel =
    screenSize === "sm" || screenSize === "md" || screenSize === "lg";
  const isMobile = screenSize === "sm" || screenSize === "md";

  const data = useMemo(
    () =>
      DATA_MAP[period].map((d) => ({
        label: d.date[currentLang],
        fullLabel: d.date[currentLang],
        shortLabel:
          d.date[`${currentLang}Short` as keyof typeof d.date] ||
          d.date[currentLang],
        param1: d.param1,
        param2: d.param2,
      })),
    [period, currentLang],
  );

  const isRtl = currentLang === "fa";
  const yTick = (v: number) => (isRtl ? toFaNum(v) : String(v));

  return (
    <div className="mt-3 md:pr-2 md:pl-2">
      <div
        className="mx-auto rounded-2xl border-4
        dark:border-[#3C3C3C]
        border-gray-300 bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] p-4 sm:p-6"
      >
        <div
          id="analysis4"
          className="mb-6 flex flex-col md:flex-row justify-center gap-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {currentLang === "fa" ? "محور اول:" : "Axis 1:"}
              </span>
              <ParamDropdown
                options={PARAMETERS_FIRST}
                selected={param1}
                onSelect={setParam1}
                lang={currentLang}
                label="Param 1"
              />
            </div>

            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-50/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
              <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {currentLang === "fa" ? "محور دوم:" : "Axis 2:"}
              </span>
              <ParamDropdown
                options={PARAMETERS_SECOND}
                selected={param2}
                onSelect={setParam2}
                lang={currentLang}
                label="Param 2"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="
                flex overflow-hidden rounded-2xl border
                dark:bg-linear-to-t dark:bg-[#282828] dark:to-[#2e2e2e]
                md:p-1
                bg-gray-100 border-gray-200
                dark:border-white/10
                cursor-pointer
                font-normal
              "
            >
              {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`
                    px-3 py-1.5 text-[10px] sm:text-xs transition-all duration-200 cursor-pointer whitespace-nowrap
                    ${
                      period === p
                        ? "bg-white text-gray-900 shadow-sm dark:bg-white/15 rounded-2xl dark:text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    }
                  `}
                >
                  {currentLang === "fa"
                    ? PERIOD_LABELS[p].fa
                    : PERIOD_LABELS[p].en}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div id="analysis5" className="h-72 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 19,
                right: isMobile ? 5 : 0,
                left: isMobile ? 5 : 0,
                bottom: isMobile ? 20 : 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="currentColor"
                className="text-gray-200 dark:text-white/10"
              />

              <YAxis
                width={isMobile ? 25 : 30}
                tickMargin={isMobile ? 10 : 20}
                yAxisId="left"
                orientation={isRtl ? "right" : "left"}
                tickFormatter={yTick}
                tick={{
                  fill: "currentColor",
                  fontSize: isMobile ? 9 : 11,
                  className: "text-gray-700 dark:text-white",
                }}
                axisLine={{
                  stroke: "#ff2d55",
                  strokeWidth: 2,
                }}
                tickLine={false}
                label={{
                  value: "▲",
                  position: "top",
                  offset: 0,
                  fill: "#ff2d55",
                  fontSize: isMobile ? 16 : 22,
                  dx: isRtl ? -10 : 10,
                  fontWeight: "bold",
                }}
              />

              <YAxis
                width={isMobile ? 25 : 30}
                yAxisId="right"
                orientation={isRtl ? "left" : "right"}
                tickMargin={isMobile ? 10 : 20}
                tickFormatter={yTick}
                tick={{
                  fill: "currentColor",
                  fontSize: isMobile ? 9 : 11,
                  className: "text-gray-700 dark:text-white",
                }}
                axisLine={{
                  stroke: "#7c6af7",
                  strokeWidth: 2,
                }}
                tickLine={false}
                label={{
                  value: "▲",
                  position: "top",
                  offset: 0,
                  fontSize: isMobile ? 16 : 18,
                  dx: isRtl ? 10 : -10,
                  fill: "#7c6af7",
                  fontWeight: "bold",
                }}
              />

              <XAxis
                padding={{ left: isMobile ? 5 : 0, right: isMobile ? 5 : 0 }}
                dataKey="label"
                reversed={isRtl}
                tick={{
                  fill: "currentColor",
                  fontSize: isMobile ? 8 : 11,
                }}
                tickLine={false}
                axisLine={{
                  stroke: "currentColor",
                  className: "text-gray-300 dark:text-white/10",
                }}
                tickMargin={isMobile ? 15 : 10}
                angle={isMobile ? -45 : 0}
                height={isMobile ? 60 : 30}
                interval={0}
                tickFormatter={(value, index) => {
                  const item = data[index];
                  if (!item) return value;
                  // تا سایز lg از نسخه کوتاه استفاده کن
                  if (useShortLabel) {
                    return item.shortLabel || value;
                  }
                  return value;
                }}
              />

              <Tooltip
                content={
                  <CustomTooltip
                    lang={currentLang}
                    param1Label={param1.label[currentLang]}
                    param2Label={param2.label[currentLang]}
                  />
                }
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />

              <Bar
                yAxisId="left"
                dataKey="param1"
                barSize={isMobile ? 16 : 24}
                radius={[4, 4, 0, 0]}
                fill="url(#barGrad)"
              />

              <Line
                yAxisId="right"
                dataKey="param2"
                stroke="#6155F5"
                strokeWidth={isMobile ? 2 : 2.5}
                dot={{
                  r: isMobile ? 2 : 3,
                  fill: "#6155F5",
                }}
                activeDot={{
                  r: isMobile ? 4 : 6,
                  fill: "#f43f5e",
                }}
                type="monotone"
                connectNulls={true}
                isAnimationActive={true}
              />

              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF2D55" stopOpacity={1} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
