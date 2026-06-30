import { useState } from "react";
import CardShell from "./CardShell";
import { weeklyReport } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import SplitBar from "./SplitBar";
import { useTranslation } from "react-i18next";

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
        className="w-full bg-zinc-800/80 hover:bg-zinc-800 transition-colors rounded-xl px-4 py-2.5 text-zinc-300 text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-600"
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
  const [tab, setTab] = useState<"pnl" | "risk">("pnl");

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const filteredData = weeklyReport.filter(() => true);

  return (
    <CardShell
      dir={i18n.language === "fa" ? "ltr" : "rtl"}
      className="flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex items-center gap-2 order-2">
          <button
            onClick={() => setTab("pnl")}
            className={`text-xs step-test25 sm:text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
              tab === "pnl"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {isRTL ? "سود و ضرر" : "P&L"}
          </button>

          <button
            onClick={() => setTab("risk")}
            className={`text-xs sm:text-sm step-test24 font-medium px-3 py-1.5 rounded-full transition-colors ${
              tab === "risk"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {isRTL ? "ریسک" : "Risk"}
          </button>
        </div>

        <h3 className="text-zinc-100 text-sm sm:text-base font-semibold order-1">
          {isRTL ? "گزارش هفتگی" : "Weekly Report"}
        </h3>
      </div>

      <DateSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="flex flex-col mt-10 gap-4 sm:gap-5 flex-1 justify-between pr-1">
        {filteredData.length > 0 ? (
          filteredData.map((row, index) => (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                <span className="text-zinc-400 truncate">
                  $
                  {isRTL
                    ? toPersianDigits(row.amount.toFixed(2))
                    : row.amount.toFixed(2)}{" "}
                  (٪{isRTL ? toPersianDigits(row.winPercent) : row.winPercent}
                  win-٪
                  {isRTL ? toPersianDigits(row.losePercent) : row.losePercent}
                  lose)
                </span>

                <span className="text-zinc-200 font-medium whitespace-nowrap">
                  {i18n.language === "fa" ? row.day.fa : row.day.en}
                </span>
              </div>

              <SplitBar
                winPercent={row.winPercent}
                lossPercent={row.losePercent}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-8 text-sm">
            {isRTL
              ? "داده‌ای برای این تاریخ وجود ندارد"
              : "No data for this date"}
          </div>
        )}
      </div>
    </CardShell>
  );
}

export default WeeklyReportPanel;
