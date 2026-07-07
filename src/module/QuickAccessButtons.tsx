import type { Lang } from "../types/type";

interface QuickAccessButtonsProps {
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
  lang: Lang;
}

export function QuickAccessButtons({
  setDateRange,
  lang,
}: QuickAccessButtonsProps) {
  const getDateRange = (type: string) => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);

    switch (type) {
      case "today":
        return { start: today, end: today };
      case "yesterday":
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        return { start, end };
      case "tomorrow":
        start.setDate(today.getDate() + 1);
        end.setDate(today.getDate() + 1);
        return { start, end };
      case "lastWeek":
        start.setDate(today.getDate() - 7);
        return { start, end: today };
      case "thisWeek": {
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);
        return { start, end: today };
      }
      case "nextWeek": {
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff + 7);
        end.setDate(start.getDate() + 6);
        return { start, end };
      }
      default:
        return { start: null, end: null };
    }
  };

  const buttons = [
    { key: "yesterday", label: { fa: "دیروز", en: "Yesterday" } },
    { key: "today", label: { fa: "امروز", en: "Today" } },
    { key: "tomorrow", label: { fa: "فردا", en: "Tomorrow" } },
    { key: "lastWeek", label: { fa: "هفته پیش", en: "Last Week" } },
    { key: "thisWeek", label: { fa: "این هفته", en: "This Week" } },
    { key: "nextWeek", label: { fa: "هفته آینده", en: "Next Week" } },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => setDateRange(getDateRange(btn.key))}
          className="px-2.5 py-1 text-[10px] rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition whitespace-nowrap text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          {lang === "fa" ? btn.label.fa : btn.label.en}
        </button>
      ))}
    </div>
  );
}
