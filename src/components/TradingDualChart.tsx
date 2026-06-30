import { useState, useMemo } from "react";
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
  DATA_MAP,
  FA_DIGITS,
  PARAMETERS,
  PERIOD_LABELS,
} from "../data/fakeData";
import type { Lang, Period } from "../types/type";
import type { Parameter } from "../types/interfaces";
import i18next from "i18next";

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
  payload?: { name: string; value: number; color: string }[];
  label?: string;
  lang: Lang;
  param1Label: string;
  param2Label: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#1a1a2e]/95 px-4 py-3 shadow-2xl backdrop-blur-sm"
      style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
    >
      <p className="mb-2 text-xs text-gray-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-gray-300">
            {entry.name === "param1" ? param1Label : param2Label}:
          </span>
          <span className="font-bold text-white">
            {lang === "fa" ? toFaNum(entry.value) : entry.value}
          </span>
        </div>
      ))}
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
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative w-full sm:w-auto"
      style={{ direction: lang === "fa" ? "rtl" : "ltr" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="
      flex items-center justify-between gap-2
      w-full sm:w-auto
      rounded-2xl px-4 py-2 md:text-sm text-[11px] font-normal
      border transition
      bg-white/10 text-gray-700 border-gray-200
      dark:bg-white/5 dark:text-white dark:border-white/10
      hover:bg-gray-100 dark:hover:bg-white/10
    "
      >
        <span className="truncate">
          {i18next.language === "fa"
            ? selected?.label?.fa
            : selected?.label?.en}
        </span>

        <svg
          className={`h-4 w-4 shrink-0 text-gray-500 dark:text-gray-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className="
        absolute top-full z-50 mt-2 w-full sm:w-44
        overflow-hidden rounded-xl border shadow-xl
        bg-white border-gray-200
        dark:bg-[#1a1a2e] dark:border-white/10
      "
          style={{ [lang === "fa" ? "right" : "left"]: -52 }}
        >
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`
            block w-full px-4 py-2.5 md:text-sm text-[11px]  ${i18next.language === "fa" ? "text-right" : "text-left"} transition
            hover:bg-gray-100 dark:hover:bg-white/10
            ${
              opt.id === selected.id
                ? "text-indigo-600 dark:text-[#7c6af7]"
                : "text-gray-700 dark:text-gray-300"
            }
          `}
            >
              {i18next.language === "fa" ? opt?.label?.fa : opt?.label?.en}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TradingDualChart() {
  const [period, setPeriod] = useState<Period>("daily");
  const [param1, setParam1] = useState<Parameter>(PARAMETERS[0]);
  const [param2, setParam2] = useState<Parameter>(PARAMETERS[1]);

  const currentLang = i18next.language as Lang;

  const data = useMemo(
    () =>
      DATA_MAP[period].map((d) => ({
        label: d.date[currentLang],
        param1: d.param1,
        param2: d.param2,
      })),
    [period, currentLang],
  );

  const isRtl = currentLang === "fa";

  const yTick = (v: number) => (isRtl ? toFaNum(v) : String(v));

  return (
    <div
      dir={i18next.language === "fa" ? "ltr" : "rtl"}
      className="step-test40 mt-3"
    >
      <div className="mx-auto rounded-2xl border-4 dark:border-white/10 border-gray-400 bg-white dark:bg-[#2B2B2B] p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-center sm:justify-between gap-3">
          <div className="flex step-test41 w-full md:w-fit flex-wrap gap-2">
            <ParamDropdown
              options={PARAMETERS}
              selected={param1}
              onSelect={setParam1}
              lang={currentLang}
            />
            <ParamDropdown
              options={PARAMETERS}
              selected={param2}
              onSelect={setParam2}
              lang={currentLang}
            />
          </div>

          <div className="flex items-center step-test42 gap-2">
            <div className="flex items-center gap-2">
              <div
                className="
      flex overflow-hidden rounded-2xl border
          dark:bg-linear-to-t dark:bg-[#282828] dark:to-[#2e2e2e]
          md:p-4
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
          px-3 py-1.5 text-[11px] sm:text-sm transition cursor-pointer whitespace-nowrap
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
        </div>

        <div className="h-72 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 16, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="currentColor"
                className="text-gray-200 dark:text-white/10"
              />

              <YAxis
                yAxisId="left"
                orientation={isRtl ? "right" : "left"}
                tickFormatter={yTick}
                tick={{
                  fill: "currentColor",
                  fontSize: 11,
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
                  fontSize: 22,
                  dx: isRtl ? -30 : 30,
                  fontWeight: "bold",
                }}
              />

              <YAxis
                yAxisId="right"
                orientation={isRtl ? "left" : "right"}
                tickFormatter={yTick}
                tick={{
                  fill: "currentColor",
                  fontSize: 11,
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
                  fontSize: 18,
                  dx: isRtl ? 30 : -30,
                  fill: "#7c6af7",
                  fontWeight: "bold",
                }}
              />

              <XAxis
                dataKey="label"
                reversed={isRtl}
                tick={{
                  fill: "currentColor",
                  fontSize: 11,
                }}
                tickLine={false}
                axisLine={{
                  stroke: "currentColor",
                  className: "text-gray-300 dark:text-white/10",
                }}
                tickMargin={10}
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
                barSize={24}
                radius={[4, 4, 0, 0]}
                fill="url(#barGrad)"
              />

              <Line
                yAxisId="right"
                dataKey="param2"
                stroke="#6155F5"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#6155F5" }}
                activeDot={{ r: 6, fill: "#f43f5e" }}
                type="monotone"
              />

              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF2D55" stopOpacity={1} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-gray-400"></div> */}
      </div>
    </div>
  );
}
