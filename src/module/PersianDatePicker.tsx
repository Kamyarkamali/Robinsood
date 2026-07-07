import { useEffect, useMemo, useRef, useState } from "react";
import * as jalaali from "jalaali-js";
import i18next from "i18next";

interface PersianDatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

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

const weekFa = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const weekEn = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

export default function PersianDatePicker({
  value = "",
  onChange,
}: PersianDatePickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    const now = new Date();
    return jalaali.toJalaali(now);
  }, []);

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(today.jy);
  const [month, setMonth] = useState(today.jm);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const lang = i18next.language;

  const monthNames = lang === "fa" ? monthsFa : monthsEn;

  const weekNames = lang === "fa" ? weekFa : weekEn;

  const daysInMonth = jalaali.jalaaliMonthLength(year, month);

  const firstGregorian = jalaali.toGregorian(year, month, 1);

  const firstDay = new Date(
    firstGregorian.gy,
    firstGregorian.gm - 1,
    firstGregorian.gd,
  );

  const startIndex = (firstDay.getDay() + 1) % 7;

  const cells = [];

  for (let i = 0; i < startIndex; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  const changeMonth = (step: number) => {
    let m = month + step;
    let y = year;

    if (m > 12) {
      m = 1;
      y++;
    }

    if (m < 1) {
      m = 12;
      y--;
    }

    setMonth(m);
    setYear(y);
  };

  const selectDay = (d: number) => {
    const date = `${year}/${String(month).padStart(
      2,
      "0",
    )}/${String(d).padStart(2, "0")}`;

    onChange(date);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        readOnly
        value={value}
        placeholder={lang === "fa" ? "انتخاب تاریخ" : "Select Date"}
        onClick={() => setOpen((p) => !p)}
        className="
          w-full
          rounded-xl
          border
          border-zinc-300
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          px-4
          py-3
          text-sm
          cursor-pointer
          outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
      />

      {open && (
        <div
          className="
            absolute
            top-full
            mt-2
            w-[320px]
            rounded-2xl
            border
            border-zinc-200
            dark:border-zinc-700
            bg-white
            dark:bg-zinc-900
            p-4
            shadow-2xl
            z-50
          "
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => changeMonth(-1)}
              className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              ❮
            </button>

            <div className="font-semibold">
              {monthNames[month - 1]} {year}
            </div>

            <button
              onClick={() => changeMonth(1)}
              className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              ❯
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {weekNames.map((w) => (
              <div
                key={w}
                className="
                  py-2
                  text-center
                  text-xs
                  font-medium
                  text-zinc-500
                "
              >
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) =>
              d === null ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  onClick={() => selectDay(d)}
                  className="
                    h-10
                    rounded-xl
                    text-sm
                    transition
                    hover:bg-indigo-500
                    hover:text-white
                  "
                >
                  {d}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => {
              const date = `${today.jy}/${String(today.jm).padStart(
                2,
                "0",
              )}/${String(today.jd).padStart(2, "0")}`;

              onChange(date);
              setMonth(today.jm);
              setYear(today.jy);
              setOpen(false);
            }}
            className="
              mt-4
              w-full
              rounded-xl
              bg-indigo-500
              py-2
              text-white
              hover:bg-indigo-600
            "
          >
            {lang === "fa" ? "امروز" : "Today"}
          </button>
        </div>
      )}
    </div>
  );
}
