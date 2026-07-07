import { useState, useEffect } from "react";
import { gregorianToJalali } from "../utils/dateConverter";
import * as jalaali from "jalaali-js";
import PersianDatePicker from "./PersianDatePicker";
import i18next from "i18next";

interface DateRangePickerProps {
  dateRange: { start: Date | null; end: Date | null };
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  showDatePicker,
  setShowDatePicker,
}: DateRangePickerProps) {
  const [tempStart, setTempStart] = useState<string>("");
  const [tempEnd, setTempEnd] = useState<string>("");
  const [error, setError] = useState<string>("");

  const persianToDate = (dateStr: string): Date | null => {
    const parts = dateStr.split("/").map(Number);

    if (parts.length !== 3) return null;

    const [jy, jm, jd] = parts;

    if (!jalaali.isValidJalaaliDate(jy, jm, jd)) {
      return null;
    }

    const g = jalaali.toGregorian(jy, jm, jd);

    return new Date(g.gy, g.gm - 1, g.gd);
  };

  const lang = i18next.language;

  const isValidPersianDate = (dateStr: string) => {
    const parts = dateStr.split("/").map(Number);

    if (parts.length !== 3) return false;

    const [jy, jm, jd] = parts;

    return jalaali.isValidJalaaliDate(jy, jm, jd);
  };

  useEffect(() => {
    if (dateRange.start) {
      setTempStart(gregorianToJalali(dateRange.start));
    } else {
      setTempStart("");
    }
    if (dateRange.end) {
      setTempEnd(gregorianToJalali(dateRange.end));
    } else {
      setTempEnd("");
    }
  }, [dateRange]);

  const formatDateDisplay = (date: Date | null): string => {
    if (!date) return "";
    return lang === "fa"
      ? gregorianToJalali(date)
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const handleApply = () => {
    setError("");

    if (!tempStart || !tempEnd) {
      setError(
        lang === "fa"
          ? "لطفاً هر دو تاریخ را وارد کنید"
          : "Please enter both dates",
      );
      return;
    }

    if (!isValidPersianDate(tempStart)) {
      setError(lang === "fa" ? "تاریخ شروع نامعتبر است" : "Invalid start date");
      return;
    }

    if (!isValidPersianDate(tempEnd)) {
      setError(lang === "fa" ? "تاریخ پایان نامعتبر است" : "Invalid end date");
      return;
    }

    const startDate = persianToDate(tempStart);
    const endDate = persianToDate(tempEnd);

    if (!startDate || !endDate) {
      setError(lang === "fa" ? "خطا در تبدیل تاریخ" : "Date conversion error");
      return;
    }

    if (startDate > endDate) {
      setError(
        lang === "fa"
          ? "تاریخ شروع باید قبل از تاریخ پایان باشد"
          : "Start date must be before end date",
      );
      return;
    }

    setDateRange({ start: startDate, end: endDate });
    setShowDatePicker(false);
  };

  const handleClear = () => {
    setTempStart("");
    setTempEnd("");
    setError("");
    setDateRange({ start: null, end: null });
    setShowDatePicker(false);
  };

  const handleCancel = () => {
    setTempStart(dateRange.start ? gregorianToJalali(dateRange.start) : "");
    setTempEnd(dateRange.end ? gregorianToJalali(dateRange.end) : "");
    setError("");
    setShowDatePicker(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2B2B2B] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 w-full sm:w-auto min-w-[180px] justify-center"
      >
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[10px] sm:text-xs truncate">
          {dateRange.start && dateRange.end
            ? `${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)}`
            : lang === "fa"
              ? "انتخاب بازه شمسی"
              : "Select Persian Date Range"}
        </span>
      </button>

      {showDatePicker && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDatePicker(false)}
          />
          <div
            className={`fixed 
    left-1/2
    top-1/2
    z-50
    w-[95vw]
    max-w-90
    -translate-x-1/2
    -translate-y-1/2
    rounded-xl
    border
    border-gray-200
    dark:border-white/10
    bg-white
    dark:bg-[#2B2B2B]
    p-4
    shadow-2xl
    sm:absolute
    sm:left-auto
    sm:right-0
    sm:top-full
    sm:mt-2
    sm:w-85
    sm:max-w-none
    ${i18next.language === "fa" ? "sm:translate-x-0" : "sm:translate-x-40"}
    sm:translate-y-0`}
          >
            <div className="space-y-3">
              <div>
                <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-1.5">
                  {lang === "fa" ? "از تاریخ" : "From"}
                </label>
                <PersianDatePicker
                  value={tempStart}
                  onChange={setTempStart}
                  placeholder={
                    lang === "fa" ? "انتخاب تاریخ..." : "Select date..."
                  }
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-1.5">
                  {lang === "fa" ? "تا تاریخ" : "To"}
                </label>
                <PersianDatePicker
                  value={tempEnd}
                  onChange={setTempEnd}
                  // lang={lang}
                  placeholder={
                    lang === "fa" ? "انتخاب تاریخ..." : "Select date..."
                  }
                />
              </div>

              {error && (
                <div className="text-xs sm:text-sm text-red-500 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                {lang === "fa"
                  ? "فرمت: سال/ماه/روز (مثل ۱۴۰۳/۰۴/۰۱)"
                  : "Format: Year/Month/Day (e.g. 1403/04/01)"}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200"
                >
                  {lang === "fa" ? "اعمال" : "Apply"}
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 text-gray-600 dark:text-gray-400"
                >
                  {lang === "fa" ? "پاک کردن" : "Clear"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 text-gray-600 dark:text-gray-400"
                >
                  {lang === "fa" ? "لغو" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
