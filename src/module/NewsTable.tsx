import { ImpactBadge } from "../module/ImpactBadge";
import i18next from "i18next";
import type { NewsTableProps } from "../types/interfaces";

const COLUMNS = [
  { key: "symbol", label: { fa: "نماد", en: "Symbol" } },
  { key: "day", label: { fa: "روز", en: "Day" } },
  { key: "date", label: { fa: "تاریخ", en: "Date" } },
  { key: "time", label: { fa: "ساعت", en: "Time" } },
  { key: "news", label: { fa: "خبر", en: "News" } },
  { key: "impact", label: { fa: "تاثیر", en: "Impact" } },
  { key: "tradeable", label: { fa: "ترید در خبر", en: "Trade in News" } },
  { key: "status", label: { fa: "وضعیت حساب", en: "Account Status" } },
];

export function NewsTable({
  data,
  lang,
  isLoading,
  requestSort,
  getSortIcon,
}: NewsTableProps) {
  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-400 dark:text-gray-600 text-sm">
        {lang === "fa" ? "در حال بارگذاری..." : "Loading..."}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400 dark:text-gray-600 text-sm">
        {lang === "fa" ? "موردی یافت نشد" : "No results found"}
      </div>
    );
  }

  return (
    <div
      id="tabale7"
      className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10"
    >
      <table className="w-full border-collapse min-w-[900px] md:min-w-0">
        <thead>
          <tr className="bg-gray-100 dark:bg-[#2B2B2B]">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => requestSort(col.key)}
                className="px-3.5 py-3 text-[10px] lg:text-xs font-medium text-gray-500 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-white/5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition select-none"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>
                    {i18next.language === "fa"
                      ? col?.label?.fa
                      : col?.label?.en}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-[10px]">
                    {getSortIcon(col.key)}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const getDayAndDate = (dayObj: any, lang: string) => {
              if (!dayObj) return { day: "", date: "" };

              if (typeof dayObj === "object" && dayObj.fa && dayObj.en) {
                const dayStr = lang === "fa" ? dayObj.fa : dayObj.en;

                if (dayStr.includes("/")) {
                  if (lang === "fa") {
                    const dayName = dayStr.split(" ")[0] || "";
                    const datePart = dayStr.split(" ")[1] || "";
                    return { day: dayName, date: datePart };
                  } else {
                    const parts = dayStr.split(" ");
                    if (parts.length >= 2) {
                      const dayName = parts[0] || "";
                      const datePart = parts[1] || "";
                      return { day: dayName, date: datePart };
                    }
                    return { day: "", date: dayStr };
                  }
                }
                return { day: dayStr, date: "" };
              }

              return { day: "", date: "" };
            };

            const { day, date } = getDayAndDate(row.day, lang);

            const dateValue =
              row.date && typeof row.date === "object"
                ? i18next.language === "fa"
                  ? row.date.fa
                  : row.date.en
                : row.date || "";

            return (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
              >
                <td className="px-3.5 py-3.5">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      className="w-10 object-center rounded-sm"
                      src={row?.flag}
                      alt="flag"
                    />
                    <span className="text-[10px] lg:text-[13px] font-semibold text-gray-800 dark:text-gray-200">
                      {row.symbol}
                    </span>
                  </div>
                </td>
                <td className="px-3.5 py-3.5 text-[10px] text-center lg:text-sm text-gray-600 dark:text-white whitespace-nowrap">
                  {day ||
                    (i18next.language === "fa" ? row?.day?.fa : row?.day?.en)}
                </td>
                <td className="px-3.5 py-3.5 text-[10px] text-center lg:text-sm text-gray-600 dark:text-white whitespace-nowrap">
                  {date || dateValue}
                </td>
                <td className="px-3.5 py-3.5 text-[10px] text-center lg:text-sm text-gray-600 dark:text-white whitespace-nowrap">
                  {row?.time}
                </td>
                <td className="px-3.5 py-3.5 text-gray-700 text-center dark:text-gray-300 text-[10px] lg:text-sm">
                  {i18next.language === "fa" ? row?.news?.fa : row?.news?.en}
                </td>
                <td className="px-3.5 py-3.5 text-[10px] lg:text-sm">
                  <div className="flex justify-center">
                    <ImpactBadge impact={row.impact} lang={lang} />
                  </div>
                </td>
                <td className="px-3.5 py-3.5">
                  <div className="flex justify-center">
                    {row.tradeable ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] lg:text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {lang === "fa" ? "بله" : "Yes"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] lg:text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        {lang === "fa" ? "خیر" : "No"}
                      </span>
                    )}
                  </div>
                </td>
                <td
                  className={`px-3.5 py-3.5 text-[10px] lg:text-sm ${
                    row.status?.fa === "معامله شده"
                      ? "text-gray-800 dark:text-gray-200"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  <p className="text-center whitespace-nowrap">
                    {i18next.language === "fa"
                      ? row?.status?.fa
                      : row?.status?.en}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
