import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useTradingTable } from "../../hooks/useTradingTable";
import { DonutChart } from "./DonutChart";
import { SortIcon } from "./SortIcon";
import type { Lang } from "../../types/type";
import { columns, tabs } from "../../data/fakeData";
import CoinIcon from "../../icons/CoinIcon";
import i18next from "i18next";

interface TradingTableProps {
  lang?: Lang;
}

export default function TradingTable({ lang = "fa" }: TradingTableProps) {
  const {
    activeTab,
    setActiveTab,
    sortCol,
    sortDir,
    page,
    setPage,
    paginated,
    totalPages,
    handleSort,
    activeCnt,
    closedCnt,
    plannedCnt,
    t,
  } = useTradingTable(lang);

  return (
    <div
      dir="rtl"
      className="w-full max-w-full mx-auto font-lahzeh rounded-[25px] border-4 dark:border-white/10 border-gray-400"
    >
      <div className="mx-auto rounded-2xl bg-white dark:bg-[#2B2B2B] shadow-xl overflow-hidden border border-gray-200 dark:border-[#3a3a3a]">
        <div className="flex flex-col sm:flex-row items-center gap-4 px-4 sm:px-6  dark:border-[#3a3a3a]">
          <div className="flex flex-wrap bg-linear-to-b from-[#313030] to-[#232323] p-4 rounded-2xl justify-end shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setPage(0);
                }}
                className={`flex items-center cursor-pointer gap-1.5 px-2 py-1.5 rounded-lg text-xs sm:text-[10px] font-medium transition-all duration-200
                    ${
                      activeTab === tab.key
                        ? "bg-gray-200 dark:bg-[#4a4a4a] text-gray-900 dark:text-white border border-gray-300 dark:border-[#5a5a5a]"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
              >
                <span>
                  {i18next.language === "fa" ? tab?.label?.fa : tab?.label?.en}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold
                    ${
                      activeTab === tab.key
                        ? "bg-gray-300 dark:bg-[#5a5a5a] text-gray-700 dark:text-gray-200"
                        : "bg-gray-100 dark:bg-[#3a3a3a] text-gray-500 dark:text-gray-400"
                    }`}
                >
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          <div className="flex-1 sm:m-4 sm:ml-11 flex items-center justify-center">
            <DonutChart
              active={activeCnt}
              closed={closedCnt}
              planned={plannedCnt}
            />
          </div>

          <button className="flex items-center font-normal gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-[#4a4a4a] bg-gray-50 dark:bg-[#3a3a3a] text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-100 dark:hover:bg-[#4a4a4a] transition-colors self-start sm:self-auto">
            <span>{i18next.language === "fa" ? "فیلتر" : "Filter"}</span>
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4">
          <h2
            className={`${i18next.language === "fa" ? "text-right" : "text-left"} text-sm font-bold text-gray-700 dark:text-gray-200`}
          >
            {i18next.language === "fa" ? "همه معاملات" : "All trades"}
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-75">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#3a3a3a]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-3 sm:px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 select-none
                        ${col.key !== "colorBar" ? "cursor-pointer hover:text-gray-800 dark:hover:text-gray-200" : ""}
                        ${col.key === "colorBar" ? "w-16" : ""}
                      `}
                  >
                    <div className="flex items-center justify-end gap-1 text-nowrap">
                      <SortIcon
                        col={col.key}
                        sortCol={sortCol}
                        sortDir={sortDir}
                      />
                      <span>
                        {i18next.language === "fa"
                          ? col?.label?.fa
                          : col?.label?.en}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginated.map((trade, idx) => {
                const isProfit = trade.profitLoss >= 0;
                return (
                  <tr
                    key={trade.id}
                    className={`border-b border-gray-100 dark:border-[#3a3a3a]/60 transition-colors
                        ${
                          idx % 2 === 0
                            ? "bg-white dark:bg-[#2B2B2B]"
                            : "bg-gray-50/50 dark:bg-[#333333]"
                        }
                        hover:bg-gray-100 dark:hover:bg-[#3a3a3a]`}
                  >
                    <td className="px-3 sm:px-4 py-3 text-right">
                      <div
                        className={`h-10 w-14 rounded-lg ${isProfit ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {trade.id}
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-normal text-gray-800 dark:text-gray-100">
                          {i18next.language === "fa" ? "بیت کوین" : "BTC"}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#4a4a4a] flex items-center justify-center text-xs font-bold text-orange-500">
                          <CoinIcon />
                        </div>
                      </div>
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">
                      {trade.volume}
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right text-sm text-red-500 font-medium">
                      {trade.sl}
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right text-sm text-emerald-500 font-medium">
                      {trade.tp}
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                      {trade.commission}
                    </td>

                    {/* Profit/Loss */}
                    <td className="px-3 sm:px-4 py-3 text-right text-sm font-semibold">
                      <span
                        className={
                          isProfit ? "text-emerald-500" : "text-red-500"
                        }
                      >
                        {trade.profitLoss > 0 ? "+" : ""}
                        {trade.profitLoss}
                      </span>
                    </td>

                    <td className="px-3 sm:px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                          <TrendingUp size={11} />
                          <span>{t(trade.pointBadgeLabel)}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          {trade.points.toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-16 text-center text-gray-400 dark:text-gray-600 text-sm"
                  >
                    {i18next.language === "fa"
                      ? "داده‌ای یافت نشد"
                      : "No data found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-[#3a3a3a]">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {i18next.language === "fa"
                ? `صفحه ${page + 1} از ${totalPages}`
                : `Page ${page + 1} of ${totalPages}`}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-[#4a4a4a] text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
              >
                <ChevronRight size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                      ${
                        page === i
                          ? "bg-emerald-500 text-white"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] border border-gray-200 dark:border-[#4a4a4a]"
                      }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-[#4a4a4a] text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
