import { useState } from "react";
import { useTranslation } from "react-i18next";
import CardShell from "./CardShell";
import { weeklyPnlReports, weeklyReport } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import SplitBar from "./SplitBar";

function DateSelector({
  selectedDate,
  onDateChange,
}: {
  selectedDate: string;
  onDateChange: (date: string) => void;
}) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const getMonthName = (month: number) => {
    const monthsFa = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const monthsEn = [
      "Farvardin",
      "Ordibehesht",
      "Khordad",
      "Tir",
      "Mordad",
      "Shahrivar",
      "Mehr",
      "Aban",
      "Azar",
      "Dey",
      "Bahman",
      "Esfand",
    ];

    return isRTL ? monthsFa[month] : monthsEn[month];
  };

  const getWeeks = () => {
    const weeks = [];
    const today = new Date();

    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();

    const weekStartOffset = isRTL ? (dayOfWeek + 1) % 7 : (dayOfWeek + 6) % 7;

    startOfWeek.setDate(today.getDate() - weekStartOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(startOfWeek);
      weekStart.setDate(startOfWeek.getDate() - i * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const label = isRTL
        ? `${toPersianDigits(weekStart.getDate())} - ${toPersianDigits(
            weekEnd.getDate(),
          )} ${getMonthName(weekStart.getMonth())}`
        : `${weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${weekEnd.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`;

      const value = weekStart.toISOString().split("T")[0];

      weeks.push({ label, value });
    }

    return weeks;
  };

  const weeks = getWeeks();

  return (
    <div className="relative">
      <select
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full  dark:bg-linear-to-b
        bg-[#EEF1F7]
        dark:from-[#353535]
       dark: via-[#2D2D2D]
       dark: to-[#252525] shadow-md rounded-xl px-4 py-2.5 dark:text-zinc-300 text-[#5B657A] text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-600"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {weeks.map((week) => (
          <option key={week.value} value={week.value}>
            {week.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none px-3">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-zinc-400"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function WeeklyReportPanel() {
  const [tab, setTab] = useState<"pnl" | "risk">("risk");

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <CardShell
      dir={i18n.language ? "ltr" : "rtl"}
      className="flex flex-col h-full 
        dark:border-4 border-2 dark:border-[#3C3C3C] border-[#D6DCE8]"
    >
      <div
        id="detailse5"
        className="flex  items-center justify-between mb-4 gap-2 flex-wrap"
      >
        <div
          className="flex items-center gap-2 order-2 p-3 rounded-2xl dark:bg-linear-to-b
        dark:from-[#353535]
       dark: via-[#2D2D2D]
       dark: to-[#252525]"
        >
          <button
            onClick={() => setTab("pnl")}
            className={`text-xs step-test25 cursor-pointer sm:text-sm  font-medium px-3 py-1.5 rounded-full transition-colors ${
              tab === "pnl"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {isRTL ? "سود و ضرر" : "P&L"}
          </button>

          <button
            id="detailse6"
            onClick={() => setTab("risk")}
            className={`text-xs sm:text-sm step-test24 cursor-pointer font-medium px-3 py-1.5 rounded-full transition-colors ${
              tab === "risk"
                ? "bg-zinc-700 text-white"
                : "text-[#5B657A] hover:text-zinc-200"
            }`}
          >
            {isRTL ? "ریسک" : "Risk"}
          </button>
        </div>

        <h3 className="dark:text-zinc-100 text-[#5B657A] text-sm sm:text-base font-semibold order-1">
          {isRTL ? "گزارش هفتگی" : "Weekly Report"}
        </h3>
      </div>

      <DateSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="flex flex-col mt-10 gap-4 sm:gap-5 flex-1 justify-between pr-1">
        {tab === "risk"
          ? weeklyReport.map((row, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                  <span className="dark:text-zinc-400 text-[#5B657A] truncate">
                    $
                    {isRTL
                      ? toPersianDigits(row.amount.toFixed(2))
                      : row.amount.toFixed(2)}{" "}
                    (٪
                    {isRTL ? toPersianDigits(row.winPercent) : row.winPercent}
                    win-٪
                    {isRTL ? toPersianDigits(row.losePercent) : row.losePercent}
                    lose)
                  </span>

                  <span className="dark:text-zinc-200 text-[#5B657A] font-medium whitespace-nowrap">
                    {isRTL ? row.day.fa : row.day.en}
                  </span>
                </div>

                <SplitBar
                  winPercent={row.winPercent}
                  lossPercent={row.losePercent}
                />
              </div>
            ))
          : weeklyPnlReports.map((row, index) => {
              const maxPnl = Math.max(
                ...weeklyPnlReports.map((d) => Math.abs(d.pnl)),
              );

              const width =
                maxPnl === 0 ? 0 : (Math.abs(row.pnl) / maxPnl) * 100;

              return (
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span
                      className={`font-medium ${
                        row.pnl > 0
                          ? "text-emerald-400"
                          : row.pnl < 0
                            ? "text-red-400"
                            : "text-zinc-400"
                      }`}
                    >
                      {row.pnl > 200 ? "+" : "-"}$ {Math.abs(row.pnl)}
                    </span>

                    <span className="text-zinc-200 font-medium whitespace-nowrap">
                      {isRTL ? row.day.fa : row.day.en}
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        row.pnl >= 0
                          ? "bg-linear-to-r from-emerald-500 to-green-400"
                          : "bg-linear-to-r from-red-500 to-rose-400"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </CardShell>
  );
}

export default WeeklyReportPanel;
