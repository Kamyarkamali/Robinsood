import { ImpactBadge } from "../module/ImpactBadge";
import i18next from "i18next";
import type { NewsItem } from "../types/interfaces";
import type { Lang } from "../types/type";

interface NewsTableProps {
  data: NewsItem[];
  lang: Lang;
  isLoading?: boolean;
}

const COLUMNS = [
  { key: "symbol", label: { fa: "نماد", en: "Symbol" } },
  { key: "day", label: { fa: "روز و تاریخ و ساعت", en: "Date & Time" } },
  { key: "news", label: { fa: "خبر", en: "News" } },
  { key: "impact", label: { fa: "تاثیر", en: "Impact" } },
  { key: "status", label: { fa: "وضعیت حساب", en: "Account Status" } },
];

export function NewsTable({ data, lang, isLoading }: NewsTableProps) {
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
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
      <table className="w-full border-collapse min-w-160 md:min-w-0">
        <thead>
          <tr className="bg-gray-100 dark:bg-[#2B2B2B]">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="px-3.5 py-3 text-[10px] lg:text-xs font-medium text-gray-500 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-white/5"
              >
                {i18next.language === "fa" ? col?.label?.fa : col?.label?.en}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
            >
              <td className="px-3.5 py-3.5">
                <div className="flex justify-center  items-center gap-2">
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
              <td className="px-3.5 py-3.5 text-[10px] text-center lg:text-sm text-gray-600 dark:text-white text-sm whitespace-nowrap">
                {i18next.language === "fa" ? row?.day?.fa : row?.day?.fa} –{" "}
                {row?.time}
              </td>
              <td className="px-3.5 py-3.5 text-gray-700 text-center dark:text-gray-300 text-[10px] lg:text-sm">
                {i18next.language === "fa" ? row?.news.fa : row?.news?.en}
              </td>
              <div className="flex justify-center">
                <td className="px-3.5 py-3.5 text-[10px] lg:text-sm">
                  <ImpactBadge impact={row.impact} lang={lang} />
                </td>
              </div>

              <td
                className={`px-3.5 py-3.5 text-[10px] lg:text-sm ${
                  row.status.fa === "معامله شده"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <p className="text-center">
                  {i18next.language === "fa" ? row?.status.fa : row?.status.en}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
