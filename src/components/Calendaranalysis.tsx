import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  MdKeyboardArrowDown,
  MdClose,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

import type { DateKey, ParamKey, Lang } from "../types/type";
import { toFa } from "../helpers/helperFunc";
import { i18n } from "../data/fakeData";
import { CDLocalized } from "../data/calendarData";
import type { DayDatas } from "../types/interfaces";
import FlashIcon from "../icons/FlashIcon";
import i18next from "i18next";

type YearKey = "2024" | "2025" | "2026";

function CalendarPickerModal({
  isOpen,
  onClose,
  days,
  selectedDay,
  onSelectDay,
  title,
  type,
  lang,
}: {
  isOpen: boolean;
  onClose: () => void;
  days: DayDatas[];
  selectedDay: DayDatas | null;
  onSelectDay: (day: DayDatas) => void;
  title: string;
  type: "month" | "quarter";
  lang: Lang;
}) {
  const isFa = lang === "fa";
  const modalRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(0);

  /*
    ماه:
    30 یا 31 روز

    فصل:
    90 روز

    برای فصل، تقویم به چند صفحه 30 روزه تقسیم می‌شود
    تا ظاهر آن مثل یک calendar واقعی کوچک باقی بماند.
  */

  const pageSize = type === "month" ? days.length : 30;

  const totalPages = type === "month" ? 1 : Math.ceil(days.length / pageSize);

  const startIndex = currentPage * pageSize;
  const visibleDays = days.slice(startIndex, startIndex + pageSize);

  /*
    برای اینکه تقویم ظاهر طبیعی داشته باشد،
    قبل از روز اول چند خانه خالی قرار می‌دهیم.

    چون داده DayDatas معمولاً اطلاعات روز را دارد،
    offset را ثابت و ساده نگه می‌داریم.
  */
  const firstDayOffset = 0;

  const calendarCells: (DayDatas | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...visibleDays,
  ];

  /*
    برای ماه 30/31 روز:
    تقویم در نهایت 5 یا 6 ردیف خواهد داشت.

    برای فصل:
    هر صفحه 30 روز دارد.
  */

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  const weekDays = isFa
    ? ["ش", "ی", "د", "س", "چ", "پ", "ج"]
    : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        ref={modalRef}
        dir={isFa ? "rtl" : "ltr"}
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.94,
          y: 15,
        }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 350,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-[350px]
          rounded-2xl
          border
          bg-white dark:bg-[#252525]
          border-gray-200 dark:border-neutral-700
          shadow-2xl
          overflow-hidden
        "
      >
        {/* ================= HEADER ================= */}

        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-gray-400 dark:text-neutral-500">
                {type === "month"
                  ? isFa
                    ? "انتخاب روز ماه"
                    : "Select day"
                  : isFa
                    ? "انتخاب روز فصل"
                    : "Select quarter day"}
              </p>

              <h3 className="mt-0.5 text-sm font-bold text-gray-800 dark:text-white">
                {title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="
                flex items-center justify-center
                w-7 h-7
                rounded-full
                text-gray-400
                hover:text-gray-700
                dark:hover:text-white
                hover:bg-gray-100
                dark:hover:bg-[#333]
                transition-all
              "
            >
              <MdClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= MONTH / PAGE NAVIGATION ================= */}

        <div className="flex items-center justify-between px-4 pb-3">
          <button
            onClick={previousPage}
            disabled={currentPage === 0}
            className="
              flex items-center justify-center
              w-7 h-7
              rounded-lg
              border
              border-gray-200 dark:border-neutral-700
              text-gray-500 dark:text-neutral-400
              hover:bg-gray-100 dark:hover:bg-[#333]
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition-all
            "
          >
            {isFa ? (
              <MdChevronRight className="w-4 h-4" />
            ) : (
              <MdChevronLeft className="w-4 h-4" />
            )}
          </button>

          <div className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400">
            {type === "quarter"
              ? isFa
                ? `بخش ${toFa(currentPage + 1)} از ${toFa(totalPages)}`
                : `Part ${currentPage + 1} of ${totalPages}`
              : `${visibleDays.length} ${isFa ? "روز" : "days"}`}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="
              flex items-center justify-center
              w-7 h-7
              rounded-lg
              border
              border-gray-200 dark:border-neutral-700
              text-gray-500 dark:text-neutral-400
              hover:bg-gray-100 dark:hover:bg-[#333]
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition-all
            "
          >
            {isFa ? (
              <MdChevronLeft className="w-4 h-4" />
            ) : (
              <MdChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* ================= CALENDAR ================= */}

        <div className="px-4 pb-4">
          {/* Week Days */}

          <div className="grid grid-cols-7 mb-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="
                  h-7
                  flex
                  items-center
                  justify-center
                  text-[9px]
                  font-bold
                  text-gray-400
                  dark:text-neutral-500
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}

          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const isSelected =
                selectedDay?.d === day.d && selectedDay?.m === day.m;

              return (
                <button
                  key={`${day.m}-${day.d}-${index}`}
                  onClick={() => {
                    /*
                      مهم:
                      فقط selectedDay در خود picker تغییر می‌کند.
                      هیچ setSelectedMonth / setSelectedQuarter
                      و هیچ تغییری در جدول اصلی نداریم.
                    */

                    onSelectDay(day);
                    onClose();
                  }}
                  className={`
                    aspect-square
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-[11px]
                    sm:text-xs
                    font-medium
                    transition-all
                    duration-150

                    ${
                      isSelected
                        ? `
                          bg-indigo-600
                          text-white
                          shadow-[0_3px_10px_rgba(79,70,229,0.35)]
                          scale-105
                        `
                        : `
                          text-gray-600
                          dark:text-neutral-300
                          hover:bg-gray-100
                          dark:hover:bg-[#353535]
                          hover:text-indigo-600
                          dark:hover:text-indigo-400
                        `
                    }
                  `}
                >
                  {toFa(day.d)}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div
          className="
            flex items-center justify-between
            px-4 py-3
            border-t
            border-gray-200
            dark:border-neutral-700
            bg-gray-50/70
            dark:bg-[#202020]
          "
        >
          <span className="text-[9px] text-gray-400 dark:text-neutral-500">
            {type === "month"
              ? isFa
                ? `${days.length} روز`
                : `${days.length} days`
              : isFa
                ? "۹۰ روز"
                : "90 days"}
          </span>

          <button
            onClick={onClose}
            className="
              px-3
              py-1.5
              rounded-lg
              text-[10px]
              font-medium
              text-gray-500
              dark:text-neutral-400
              hover:bg-gray-200
              dark:hover:bg-[#333]
              transition-all
            "
          >
            {isFa ? "بستن" : "Close"}
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* =========================================================
   Dropdown
========================================================= */

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
  const isFa = i18next.language === "fa";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center gap-1.5
          px-3 sm:px-4
          py-1.5 sm:py-2
          rounded-full
          border
          text-xs sm:text-sm
          font-normal
          transition-all

          border-gray-300
          dark:border-neutral-700

          bg-white
          dark:bg-[#3A3A3A]

          text-gray-700
          dark:text-white

          hover:border-gray-400
          dark:hover:border-neutral-500

          cursor-pointer
          whitespace-nowrap

          ${open ? "border-gray-400 dark:border-neutral-500" : ""}
        `}
      >
        <span
          className={`
            text-xs
            text-gray-400
            dark:text-neutral-400
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        >
          <MdKeyboardArrowDown />
        </span>

        <span>{label}</span>
      </button>

      {open && (
        <div
          dir={isFa ? "rtl" : "ltr"}
          className="
            absolute
            top-[calc(100%+6px)]
            z-50
            min-w-40 sm:min-w-45
            rounded-xl
            border
            p-1.5
            bg-white
            dark:bg-[#2B2B2B]
            border-gray-200
            dark:border-neutral-700
            shadow-lg
            dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
          "
          style={{
            left: isFa ? "auto" : 0,
            right: isFa ? 0 : "auto",
          }}
        >
          <p
            className={`
              text-[10px]
              text-[#5B657A]
              dark:text-neutral-500
              px-2.5
              py-1
              font-bold
              tracking-wide
              ${isFa ? "text-right" : "text-left"}
            `}
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
              className={`
                flex
                items-center
                gap-2
                px-2.5
                py-2
                rounded-lg
                cursor-pointer
                text-xs
                font-medium
                transition-colors

                hover:bg-gray-50
                dark:hover:bg-[#3A3A3A]

                ${
                  active === item.v
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-[#5B657A] dark:text-white"
                }

                ${isFa ? "flex-row-reverse" : ""}
              `}
            >
              <span>{item.l}</span>

              <span
                className={`
                  w-1.5
                  h-1.5
                  rounded-full
                  shrink-0

                  ${
                    active === item.v
                      ? "bg-indigo-600 dark:bg-indigo-400"
                      : "bg-current opacity-30"
                  }
                `}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Date Filter Modal
========================================================= */

function DateFilterModal({
  isOpen,
  onClose,
  monthItems,
  quarterItems,
  selectedMonth,
  selectedQuarter,
  selectedYear,
  onSelectMonth,
  onSelectQuarter,
  onSelectYear,
  lang,
  onOpenDayPicker,
}: {
  isOpen: boolean;
  onClose: () => void;
  monthItems: { v: DateKey; l: string }[];
  quarterItems: { v: DateKey; l: string }[];
  selectedMonth: DateKey;
  selectedQuarter: DateKey;
  selectedYear: YearKey;
  onSelectMonth: (v: DateKey) => void;
  onSelectQuarter: (v: DateKey) => void;
  onSelectYear: (v: YearKey) => void;
  lang: Lang;
  onOpenDayPicker: (
    type: "month" | "quarter",
    key: DateKey,
    label: string,
  ) => void;
}) {
  const isFa = lang === "fa";

  const modalRef = useRef<HTMLDivElement>(null);

  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  const years: YearKey[] = ["2024", "2025", "2026"];

  const getSortedQuarters = (items: { v: DateKey; l: string }[]) => {
    const order = ["q1", "q2", "q3", "q4"];

    return [...items].sort((a, b) => {
      const aKey = a.v as string;
      const bKey = b.v as string;

      const aOrder = order.findIndex((o) => aKey.includes(o));

      const bOrder = order.findIndex((o) => bKey.includes(o));

      return aOrder - bOrder;
    });
  };

  const sortedQuarterItems = getSortedQuarters(quarterItems);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="
        fixed inset-0
        z-[9999]
        flex
        items-center
        justify-center
        p-4
      "
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
      }}
      onClick={handleBackdropClick}
    >
      <motion.div
        ref={modalRef}
        initial={{
          scale: 0.9,
          opacity: 0,
          y: 20,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
          y: 20,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        dir={isFa ? "rtl" : "ltr"}
        className="
          relative
          w-full
          max-w-lg
          mx-auto
          rounded-2xl
          border
          p-5 sm:p-6

          bg-white
          dark:bg-[#2B2B2B]

          border-gray-200
          dark:border-neutral-700

          shadow-2xl
          dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-indigo-600" />

            <h3 className="text-sm sm:text-base font-bold text-[#5B657A] dark:text-white">
              {isFa ? "انتخاب بازه زمانی" : "Select Time Range"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-gray-600
              dark:text-neutral-500
              dark:hover:text-white
              transition-colors
            "
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Year */}

        <div className="flex justify-center mb-5">
          <div className="relative">
            <button
              onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
              className="
                flex
                items-center
                gap-2
                px-6
                py-2
                rounded-lg
                border
                border-gray-300
                dark:border-neutral-600
                text-sm
                font-bold
                text-gray-700
                dark:text-white
                bg-gray-50
                dark:bg-[#3A3A3A]
                hover:bg-gray-100
                dark:hover:bg-[#454545]
                transition-all
              "
            >
              <span>{selectedYear}</span>

              <MdKeyboardArrowDown
                className={`
                  transition-transform
                  duration-200
                  ${yearDropdownOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {yearDropdownOpen && (
              <div
                className="
                  absolute
                  top-full
                  left-0
                  mt-1
                  z-50
                  min-w-full
                  rounded-lg
                  border
                  p-1
                  bg-white
                  dark:bg-[#2B2B2B]
                  border-gray-200
                  dark:border-neutral-700
                  shadow-lg
                "
              >
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      onSelectYear(y);
                      setYearDropdownOpen(false);
                    }}
                    className={`
                      block
                      w-full
                      px-4
                      py-2
                      text-sm
                      rounded-lg
                      transition-colors
                      text-left

                      ${
                        selectedYear === y
                          ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold"
                          : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#3A3A3A]"
                      }
                    `}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= RANGE SELECT ================= */}

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
          {/* Quarter */}

          <div className="sm:w-36 shrink-0">
            <p
              className={`
                text-[10px]
                sm:text-[11px]
                font-bold
                text-gray-400
                dark:text-neutral-500
                mb-2.5
                ${isFa ? "text-right" : "text-left"}
              `}
            >
              {isFa ? "انتخاب بر اساس فصل" : "Select by Quarter"}
            </p>

            <div
              className="
                flex
                flex-row
                sm:flex-col
                gap-1.5
                overflow-x-auto
                sm:overflow-visible
                pb-1
                sm:pb-0
              "
            >
              {sortedQuarterItems.map((q) => {
                const active = q.v === selectedQuarter;

                return (
                  <button
                    key={q.v}
                    onClick={() => {
                      /*
                        فقط فصل انتخاب می‌شود.
                        سپس picker باز می‌شود.

                        جدول اصلی دستکاری نمی‌شود.
                      */

                      onSelectQuarter(q.v);

                      onOpenDayPicker("quarter", q.v, q.l);

                      onClose();
                    }}
                    className={`
                      px-3
                      py-2
                      rounded-full
                      text-[11px]
                      font-medium
                      transition-all
                      whitespace-nowrap
                      text-center
                      shrink-0

                      ${
                        active
                          ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(79,70,229,0.4)]"
                          : "bg-gray-50 dark:bg-[#3A3A3A] text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-[#454545]"
                      }
                    `}
                  >
                    {q.l}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="
              hidden sm:block
              w-px
              bg-gray-200
              dark:bg-neutral-700
            "
          />

          <div
            className="
              block sm:hidden
              h-px
              bg-gray-200
              dark:bg-neutral-700
            "
          />

          {/* Months */}

          <div className="flex-1">
            <p
              className={`
                text-[10px]
                sm:text-[11px]
                font-bold
                text-gray-400
                dark:text-neutral-500
                mb-2.5
                ${isFa ? "text-right" : "text-left"}
              `}
            >
              {isFa ? "انتخاب بر اساس ماه" : "Select by Month"}
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              {monthItems.map((m) => {
                const active = m.v === selectedMonth;

                return (
                  <button
                    key={m.v}
                    onClick={() => {
                      /*
                        ماه انتخاب می‌شود.
                        جدول اصلی همچنان همان ساختار خودش را دارد.
                      */

                      onSelectMonth(m.v);

                      onOpenDayPicker("month", m.v, m.l);

                      onClose();
                    }}
                    className={`
                      px-2
                      py-2
                      rounded-xl
                      text-[11px]
                      font-medium
                      transition-all

                      ${
                        active
                          ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(79,70,229,0.4)]"
                          : "bg-gray-50 dark:bg-[#3A3A3A] text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-[#454545]"
                      }
                    `}
                  >
                    {m.l}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            justify-end
            gap-2
            mt-5
            pt-4
            border-t
            border-gray-200
            dark:border-neutral-700
          "
        >
          <button
            onClick={onClose}
            className="
              px-4
              py-1.5
              rounded-lg
              text-xs
              sm:text-sm
              font-medium
              text-gray-600
              dark:text-neutral-400
              hover:bg-gray-100
              dark:hover:bg-[#3A3A3A]
              transition-colors
            "
          >
            {isFa ? "بستن" : "Close"}
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* =========================================================
   Date Filter Dropdown
========================================================= */

function DateFilterDropdown({
  monthItems,
  quarterItems,
  selectedMonth,
  selectedQuarter,
  selectedYear,
  onSelectMonth,
  onSelectQuarter,
  onSelectYear,
  lang,
  onOpenDayPicker,
}: {
  monthItems: { v: DateKey; l: string }[];
  quarterItems: { v: DateKey; l: string }[];
  selectedMonth: DateKey;
  selectedQuarter: DateKey;
  selectedYear: YearKey;
  onSelectMonth: (v: DateKey) => void;
  onSelectQuarter: (v: DateKey) => void;
  onSelectYear: (v: YearKey) => void;
  lang: Lang;
  onOpenDayPicker: (
    type: "month" | "quarter",
    key: DateKey,
    label: string,
  ) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFa = lang === "fa";

  const activeMonthLabel = monthItems.find((m) => m.v === selectedMonth)?.l;

  const activeQuarterLabel = quarterItems.find(
    (q) => q.v === selectedQuarter,
  )?.l;

  const triggerLabel =
    activeMonthLabel ||
    activeQuarterLabel ||
    (isFa ? "بازه زمانی" : "Time Range");

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          flex
          items-center
          gap-1.5
          px-3 sm:px-4
          py-1.5 sm:py-2
          rounded-full
          border
          text-xs sm:text-sm
          font-normal
          transition-all

          border-gray-300
          dark:border-neutral-700

          bg-white
          dark:bg-[#3A3A3A]

          text-[#5B657A]
          dark:text-white

          hover:border-gray-400
          dark:hover:border-neutral-500

          cursor-pointer
          whitespace-nowrap

          hover:scale-105
          active:scale-95
        "
      >
        <span className="text-xs text-gray-400 dark:text-neutral-400">
          <MdKeyboardArrowDown />
        </span>

        <span>{triggerLabel}</span>
      </button>

      <DateFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthItems={monthItems}
        quarterItems={quarterItems}
        selectedMonth={selectedMonth}
        selectedQuarter={selectedQuarter}
        selectedYear={selectedYear}
        onSelectMonth={onSelectMonth}
        onSelectQuarter={onSelectQuarter}
        onSelectYear={onSelectYear}
        lang={lang}
        onOpenDayPicker={onOpenDayPicker}
      />
    </>
  );
}

/* =========================================================
   Streak Donut
========================================================= */

function StreakDonut({ wins, losses }: { wins: number; losses: number }) {
  const r = 33;
  const circ = 2 * Math.PI * r;
  const gap = 3;

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
        className="
          stroke-gray-200
          dark:stroke-[#2e2e2e]
        "
        strokeWidth="7"
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

/* =========================================================
   Main Calendar Day Cell
   این قسمت جدول اصلی است و دست نخورده باقی می‌ماند.
========================================================= */

function DayCell({
  day,
  isCur,
  isSelected,
  onSelect,
}: {
  day: DayDatas;
  isCur: boolean;
  isSelected: boolean;
  onSelect: (day: DayDatas) => void;
}) {
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
      onClick={() => onSelect(day)}
      className={`
        md:rounded-[14px]
        rounded-sm
        px-1.5 sm:px-3
        py-1.5 sm:py-2.5
        flex
        flex-col
        overflow-hidden
        transition-all

        w-full
        min-h-15
        sm:min-h-16.25
        lg:h-16.25

        ${bg}

        ${
          isSelected
            ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-[#2C2C2C]"
            : ""
        }

        cursor-pointer
        hover:scale-105
        transition-transform
        duration-200
      `}
    >
      <span
        className={`
          text-[10px]
          sm:text-[11px]
          font-bold
          leading-none
          ${textColor}
        `}
      >
        {toFa(day.d)}
      </span>

      {has && (
        <div className="flex flex-col gap-0.5 text-center">
          <span
            className="
              text-white
              font-black
              text-center
              leading-tight
              whitespace-nowrap
              text-[8px]
              sm:text-[11px]
              lg:text-[14px]
            "
          >
            {toFa(day.p!)}
          </span>

          <span
            className="
              text-[7px]
              text-center
              sm:text-[9px]
              leading-none
              text-white/65
            "
          >
            {day.t!} {i18next.language === "fa" ? "ترید" : "Trade"}
          </span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function CalendarAnalysis() {
  const [lang, setLang] = useState<Lang>(() => {
    const currentLang = i18next.language;

    return currentLang === "en" || currentLang === "fa"
      ? (currentLang as Lang)
      : "fa";
  });

  const [sp, setSp] = useState<ParamKey>("pnl");

  const [selectedYear, setSelectedYear] = useState<YearKey>("2025");

  const [selectedMonth, setSelectedMonth] = useState<DateKey>("jan25");

  const [selectedQuarter, setSelectedQuarter] = useState<DateKey>("q1_25");

  /*
    این selectedDay فقط برای هایلایت کردن روز
    در calendar picker و جدول اصلی است.
  */
  const [selectedDay, setSelectedDay] = useState<DayDatas | null>(null);

  /*
    وضعیت Calendar Picker
  */

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);

  const [pickerDays, setPickerDays] = useState<DayDatas[]>([]);

  const [pickerTitle, setPickerTitle] = useState("");

  const [pickerType, setPickerType] = useState<"month" | "quarter">("month");

  /* =====================================================
     Language
  ===================================================== */

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLang = i18next.language as Lang;

      if (newLang === "fa" || newLang === "en") {
        setLang(newLang);
      }
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);

  /* =====================================================
     Data
  ===================================================== */

  const T = i18n[lang];

  const cd = CDLocalized[lang]?.[selectedMonth];

  const ap = T.params.find((p) => p.v === sp);

  /* =====================================================
     Default selected day
  ===================================================== */

  useEffect(() => {
    if (cd && cd.days && cd.days.length > 0) {
      const dayWithPnl = cd.days.find((d) => d.p !== undefined);

      if (dayWithPnl) {
        setSelectedDay(dayWithPnl);
      } else {
        setSelectedDay(cd.days[0]);
      }
    }
  }, [cd]);

  /* =====================================================
     Main Table Weeks

     این بخش مربوط به جدول اصلی است.
  ===================================================== */

  const weeks: DayDatas[][] = [];

  if (cd && cd.days) {
    for (let i = 0; i < cd.days.length; i += 7) {
      weeks.push(cd.days.slice(i, i + 7));
    }
  }

  /* =====================================================
     Date Items
  ===================================================== */

  const allDates = T.dates;

  const monthItems = allDates.filter((d) => {
    const v = d.v as string;

    const year = selectedYear.slice(-2);

    return (
      v.includes(year) &&
      !v.includes("q") &&
      (v.includes("dec") ||
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
        v.includes("jan"))
    );
  });

  const quarterItems = allDates.filter((d) => {
    const v = d.v as string;

    const year = selectedYear.slice(-2);

    return v.includes(year) && v.includes("q");
  });

  /* =====================================================
     Keep selected month valid
  ===================================================== */

  useEffect(() => {
    if (monthItems.length > 0) {
      const exists = monthItems.some((m) => m.v === selectedMonth);

      if (!exists) {
        setSelectedMonth(monthItems[0].v);
      }
    }
  }, [selectedYear, monthItems, selectedMonth]);

  /* =====================================================
     Keep selected quarter valid
  ===================================================== */

  useEffect(() => {
    if (quarterItems.length > 0) {
      const exists = quarterItems.some((q) => q.v === selectedQuarter);

      if (!exists) {
        setSelectedQuarter(quarterItems[0].v);
      }
    }
  }, [selectedYear, quarterItems, selectedQuarter]);

  /* =====================================================
     Main table day select
  ===================================================== */

  const handleDaySelect = (day: DayDatas) => {
    setSelectedDay(day);
  };

  /* =====================================================
     Open small Calendar Picker

     مهم‌ترین قسمت:
     این تابع فقط picker را باز می‌کند.
     جدول اصلی را تغییر نمی‌دهد.
  ===================================================== */

  const handleOpenDayPicker = (
    type: "month" | "quarter",
    key: DateKey,
    label: string,
  ) => {
    const data = CDLocalized[lang]?.[key];

    if (data && data.days && data.days.length > 0) {
      setPickerType(type);

      setPickerDays(data.days);

      setPickerTitle(label);

      setIsDayPickerOpen(true);
    }
  };

  return (
    <div
      id="date1"
      className="p-2 step-test39 transition-colors"
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      <div
        className="
          bg-gray-50
          dark:bg-linear-to-b
          dark:from-[#2C2C2C]
          dark:bg-[#303030]

          rounded-2xl
          border-4

          dark:border-[#3C3C3C]
          border-gray-300

          p-2
          sm:p-4
          lg:p-6
        "
      >
        {/* =================================================
            TOP CONTROLS
        ================================================= */}

        <div
          id="date2"
          className="
            flex
            flex-wrap
            items-start
            sm:items-center
            gap-2
            sm:gap-4
            mb-4
            sm:mb-5
          "
        >
          <div
            id="analysis1"
            className={`
              flex
              flex-wrap
              gap-2
              justify-center
              sm:${i18next.language === "fa" ? "justify-end" : "justify-start"}
              w-full
              sm:gap-2.5
            `}
          >
            {/* Parameter */}

            <Dropdown
              label={ap?.l ?? T.pp}
              items={T.params}
              active={sp}
              section={T.psec}
              onSelect={setSp}
            />

            {/* Date */}

            <DateFilterDropdown
              monthItems={
                monthItems.length > 0 ? monthItems : T.dates.slice(0, 3)
              }
              quarterItems={
                quarterItems.length > 0 ? quarterItems : T.dates.slice(3)
              }
              selectedMonth={selectedMonth}
              selectedQuarter={selectedQuarter}
              selectedYear={selectedYear}
              onSelectMonth={setSelectedMonth}
              onSelectQuarter={setSelectedQuarter}
              onSelectYear={setSelectedYear}
              lang={lang}
              onOpenDayPicker={handleOpenDayPicker}
            />
          </div>

          {/* =================================================
              MONTH PNL + STREAK
          ================================================= */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              justify-between
              gap-4
              sm:gap-16
              ml-auto
              w-full
              sm:w-auto
            "
          >
            {/* Monthly PNL */}

            <div
              className="
                flex
                flex-col
                items-center
                sm:items-start
                gap-1
                sm:gap-2
                min-w-0
                w-full
                sm:w-auto
              "
            >
              <span
                className="
                  text-xs
                  sm:text-[15px]
                  font-bold
                  text-[#5B657A]
                  dark:text-neutral-400
                "
              >
                {T.mpdl}
              </span>

              <span
                className="
                  text-[11px]
                  sm:text-[13px]
                  text-center
                  w-full
                  text-[#5B657A]
                  dark:text-neutral-400
                "
              >
                {cd?.mpd?.date || "-"}
              </span>

              <span
                className="
                  text-[18px]
                  sm:text-[22px]
                  w-full
                  text-center
                  font-black
                  text-green-500
                  dark:text-green-400
                  leading-tight
                "
              >
                ${cd?.mpd?.pnl ?? 0}
              </span>
            </div>

            {/* Divider */}

            <div
              className="
                hidden
                sm:block
                w-px
                self-stretch
                min-h-12.5
                bg-gray-300
                dark:bg-neutral-700
              "
            />

            {/* Streak */}

            <div
              id="analysis2"
              className="
                flex
                items-center
                justify-center
                sm:justify-end
                gap-3
                w-full
                sm:w-auto
              "
            >
              <StreakDonut wins={cd?.str?.w ?? 0} losses={cd?.str?.l ?? 0} />

              <div
                className="
                  flex
                  flex-col
                  gap-0.5
                  min-w-0
                "
              >
                <span
                  className="
                    text-[11px]
                    text-center
                    sm:text-[13px]
                    font-bold
                    text-[#5B657A]
                    dark:text-white
                  "
                >
                  {T.stitle}
                </span>

                <span
                  className="
                    text-[8px]
                    text-center
                    sm:text-[10px]
                    text-[#5B657A]
                    dark:text-white
                    truncate
                  "
                >
                  {cd?.str?.s || "-"} – {cd?.str?.e || "-"}
                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    sm:gap-1.5
                    mt-1
                    flex-wrap
                  "
                >
                  <span
                    className="
                      text-[9px]
                      sm:text-[11px]
                      font-semibold
                      text-[#5B657A]
                      dark:text-neutral-300
                      whitespace-nowrap
                    "
                  >
                    {cd?.str?.d || 0} {T.du} – {cd?.str?.t || 0} {T.tu}
                  </span>

                  <span className="text-yellow-400 text-[10px] sm:text-xs">
                    <FlashIcon />
                  </span>

                  <div className="flex flex-col gap-2">
                    <span
                      className="
                        text-[8px]
                        sm:text-[10px]
                        text-center
                        w-[34px]
                        h-[15px]
                        font-bold
                        px-1
                        sm:px-1.5
                        rounded
                        bg-indigo-600
                        text-white
                      "
                    >
                      {cd?.str?.w || 0}
                    </span>

                    <span
                      className="
                        text-[8px]
                        sm:text-[10px]
                        text-center
                        w-[34px]
                        h-[15px]
                        font-bold
                        px-1
                        sm:px-1.5
                        rounded
                        bg-red-600
                        text-white
                      "
                    >
                      {cd?.str?.l || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            MAIN TABLE
        ================================================= */}

        <hr
          className="
            border-gray-300
            dark:border-neutral-700
            mb-3
            sm:mb-4
          "
        />

        <div
          id="analysis3"
          className="
            overflow-x-auto
            -mx-2
            sm:mx-0
          "
        >
          <div
            className="
              min-w-0
              sm:min-w-85
              px-2
              sm:px-0
            "
          >
            {/* Week Days */}

            <div
              className="
                grid
                grid-cols-7
                gap-1
                sm:gap-2.5
                mb-1.5
              "
            >
              {T.wds.map((w) => (
                <div
                  key={w}
                  className="
                    text-center
                    text-[9px]
                    sm:text-[11px]
                    font-bold
                    text-gray-500
                    dark:text-neutral-500
                    py-1
                  "
                >
                  {w}
                </div>
              ))}
            </div>

            {/* Main Calendar */}

            {weeks.length > 0 ? (
              weeks.map((week, wi) => (
                <div
                  key={wi}
                  className="
                      grid
                      grid-cols-7
                      gap-1
                      sm:gap-5
                      mb-1.5
                      sm:mb-2.5
                    "
                >
                  {week.map((day, di) => (
                    <DayCell
                      key={`${wi}-${di}`}
                      day={day}
                      isCur={day.m === cd?.cur}
                      isSelected={
                        selectedDay?.d === day.d && selectedDay?.m === day.m
                      }
                      onSelect={handleDaySelect}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div
                className="
                  text-center
                  py-8
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {lang === "fa"
                  ? "داده‌ای برای نمایش وجود ندارد"
                  : "No data to display"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          SMALL CALENDAR PICKER

          این کامپوننت مستقل است و انتخاب روز داخلش
          جدول اصلی را تغییر نمی‌دهد.
      ================================================= */}

      <CalendarPickerModal
        isOpen={isDayPickerOpen}
        onClose={() => setIsDayPickerOpen(false)}
        days={pickerDays}
        selectedDay={selectedDay}
        onSelectDay={(day) => {
          /*
            فقط روز انتخابی را نگه می‌داریم.
            هیچ تغییری در ماه / فصل / جدول اصلی
            ایجاد نمی‌شود.
          */

          setSelectedDay(day);
        }}
        title={pickerTitle}
        type={pickerType}
        lang={lang}
      />
    </div>
  );
}
