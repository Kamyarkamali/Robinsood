import { ImpactBadge } from "../module/ImpactBadge";
import type { NewsItem } from "../types/interfaces";
import type { Lang } from "../types/type";

interface NewsTableRowProps {
  row: NewsItem;
  lang: Lang;
}

export function NewsTableRow({ row, lang }: NewsTableRowProps) {
  const isTraded = row.status.fa === "معامله شده";

  return (
    <tr className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
      <td className="px-3.5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-xl">{row.flag}</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {row.symbol}
          </span>
        </div>
      </td>
      <td className="px-3.5 py-3.5 text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
        {row.day[lang]} – {row.time}
      </td>
      <td className="px-3.5 py-3.5 text-gray-700 dark:text-gray-300 text-sm">
        {row.news[lang]}
      </td>
      <td className="px-3.5 py-3.5">
        <ImpactBadge impact={row.impact} lang={lang} />
      </td>
      <td
        className={`px-3.5 py-3.5 text-sm ${
          isTraded
            ? "text-gray-800 dark:text-gray-200"
            : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {row.status[lang]}
      </td>
    </tr>
  );
}
