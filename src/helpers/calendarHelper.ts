import type { DayDatas } from "../types/interfaces";
import type { DateKey, Lang } from "../types/type";

export interface CalendarData {
  cur: string;
  days: DayDatas[];
  mpd: {
    date: string;
    pnl: number;
  };
  str: {
    s: string;
    e: string;
    d: number;
    t: number;
    w: number;
    l: number;
  };
}

const generateMonthData = (
  monthKey: string,
  year: string,
  days: number,
): CalendarData => {
  return {
    cur: monthKey,
    // @ts-ignore
    days: Array.from({ length: days }, (_, i) => ({
      d: i + 1,
      m: monthKey,
      p:
        Math.random() > 0.3 ? Math.floor(Math.random() * 200) - 100 : undefined,
      t: Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : undefined,
    })),
    mpd: {
      date: `${monthKey} ${year}`,
      pnl: Math.floor(Math.random() * 500) + 100,
    },
    str: {
      s: `${Math.floor(Math.random() * 10) + 1} ${monthKey}`,
      e: `${Math.floor(Math.random() * 20) + 10} ${monthKey}`,
      d: Math.floor(Math.random() * 10) + 3,
      t: Math.floor(Math.random() * 15) + 5,
      w: Math.floor(Math.random() * 10) + 3,
      l: Math.floor(Math.random() * 5) + 1,
    },
  };
};

const generateQuarterData = (
  quarterKey: string,
  year: string,
): CalendarData => {
  const days = 90;
  return {
    cur: quarterKey,
    // @ts-ignore
    days: Array.from({ length: days }, (_, i) => ({
      d: i + 1,
      m: quarterKey,
      p:
        Math.random() > 0.3 ? Math.floor(Math.random() * 200) - 100 : undefined,
      t: Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : undefined,
    })),
    mpd: {
      date: `${quarterKey} ${year}`,
      pnl: Math.floor(Math.random() * 800) + 200,
    },
    str: {
      s: `${Math.floor(Math.random() * 10) + 1} ${quarterKey}`,
      e: `${Math.floor(Math.random() * 20) + 10} ${quarterKey}`,
      d: Math.floor(Math.random() * 15) + 5,
      t: Math.floor(Math.random() * 20) + 10,
      w: Math.floor(Math.random() * 15) + 5,
      l: Math.floor(Math.random() * 8) + 2,
    },
  };
};

export const generateAllCalendarData = (): Record<DateKey, CalendarData> => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const quarters = ["q1", "q2", "q3", "q4"];
  const years = ["24", "25", "26"];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const result: Record<string, CalendarData> = {};

  years.forEach((year) => {
    months.forEach((month, index) => {
      const key = `${month}${year}` as DateKey;
      result[key] = generateMonthData(key, `20${year}`, daysInMonth[index]);
    });
  });

  years.forEach((year) => {
    quarters.forEach((quarter) => {
      const key = `${quarter}_${year}` as DateKey;
      result[key] = generateQuarterData(key, `20${year}`);
    });
  });

  return result;
};

export const getMonthsByYear = (
  allDates: { v: DateKey; l: string }[],
  year: string,
): { v: DateKey; l: string }[] => {
  const yearSuffix = year.slice(-2);
  return allDates.filter((d) => {
    const v = d.v as string;
    return (
      v.includes(yearSuffix) &&
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
};

export const getQuartersByYear = (
  allDates: { v: DateKey; l: string }[],
  year: string,
): { v: DateKey; l: string }[] => {
  const yearSuffix = year.slice(-2);
  return allDates.filter((d) => {
    const v = d.v as string;
    return v.includes(yearSuffix) && v.includes("q");
  });
};

export const sortQuarters = <T extends { v: DateKey; l: string }>(
  items: T[],
): T[] => {
  const order = ["q1", "q2", "q3", "q4"];
  return [...items].sort((a, b) => {
    const aKey = a.v as string;
    const bKey = b.v as string;
    const aOrder = order.findIndex((o) => aKey.includes(o));
    const bOrder = order.findIndex((o) => bKey.includes(o));
    return aOrder - bOrder;
  });
};

export const toPersianNumber = (num: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
};

export const getWeekDays = (lang: Lang): string[] => {
  if (lang === "fa") {
    return [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
    ];
  }
  return ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
};

export const getMonthName = (monthIndex: number, lang: Lang): string => {
  const months = {
    fa: [
      "ژانویه",
      "فوریه",
      "مارس",
      "آوریل",
      "مه",
      "ژوئن",
      "ژوئیه",
      "اوت",
      "سپتامبر",
      "اکتبر",
      "نوامبر",
      "دسامبر",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  return months[lang][monthIndex] || months.en[monthIndex];
};

export const getQuarterName = (quarterIndex: number, lang: Lang): string => {
  const quarters = {
    fa: ["بهار", "تابستان", "پاییز", "زمستان"],
    en: ["Q1", "Q2", "Q3", "Q4"],
  };
  return quarters[lang][quarterIndex] || quarters.en[quarterIndex];
};

export const isMonthKey = (key: string): boolean => {
  return !key.includes("q");
};

export const isQuarterKey = (key: string): boolean => {
  return key.includes("q");
};

export const extractYearFromKey = (key: string): string => {
  const match = key.match(/(\d{2})$/);
  return match ? `20${match[1]}` : "2024";
};

export const extractNameFromKey = (key: string): string => {
  return key.replace(/_\d{2}$/, "").replace(/\d{2}$/, "");
};

export const getAvailableYears = (): string[] => {
  return ["2024", "2025", "2026"];
};
