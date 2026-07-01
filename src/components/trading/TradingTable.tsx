import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X,
} from "lucide-react";
import { useTradingTable } from "../../hooks/useTradingTable";
import { DonutChart } from "./DonutChart";
import { SortIcon } from "./SortIcon";
import type { Lang } from "../../types/type";
import { columns, tabs } from "../../data/fakeData";
import CoinIcon from "../../icons/CoinIcon";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

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
  } = useTradingTable(lang);

  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate pagination items with ellipsis
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(0);

      let start = Math.max(1, page - 1);
      let end = Math.min(totalPages - 2, page + 1);

      if (page < 2) {
        end = Math.min(totalPages - 2, 3);
      }
      if (page > totalPages - 3) {
        start = Math.max(1, totalPages - 4);
      }

      if (start > 1) {
        items.push("ellipsis-start");
      }

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      if (end < totalPages - 2) {
        items.push("ellipsis-end");
      }

      if (totalPages - 1 > 0 && !items.includes(totalPages - 1)) {
        items.push(totalPages - 1);
      }
    }

    return items;
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
    // Here you would typically update the pagination in your hook
    // This is a demo implementation
    console.log(`Showing ${value} rows per page`);
  };

  return (
    <>
      <h1 className="md:text-2xl text-md font-bold px-4 mt-3 mb-3">
        {t("items.item10")}
      </h1>
      <div
        dir="rtl"
        className="w-full step-test51 mt-3 max-w-full mx-auto font-lahzeh rounded-[25px] border-4 dark:border-white/10 border-gray-400"
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
                    {i18next.language === "fa"
                      ? tab?.label?.fa
                      : tab?.label?.en}
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

            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center font-normal gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-[#4a4a4a] bg-gray-50 dark:bg-[#3a3a3a] text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-100 dark:hover:bg-[#4a4a4a] transition-colors self-start sm:self-auto"
              >
                <span>{i18next.language === "fa" ? "فیلتر" : "Filter"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#2B2B2B] rounded-xl shadow-lg border border-gray-200 dark:border-[#3a3a3a] p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {i18next.language === "fa"
                        ? "تعداد ردیف‌ها"
                        : "Rows per page"}
                    </h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] rounded-lg transition-colors"
                    >
                      <X
                        size={16}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[3, 5, 10, 20, 50].map((value) => (
                      <button
                        key={value}
                        onClick={() => {
                          handleRowsPerPageChange(value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                          rowsPerPage === value
                            ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
                        }`}
                      >
                        {value} {i18next.language === "fa" ? "ردیف" : "rows"}
                        {rowsPerPage === value && (
                          <span className="mr-2 text-emerald-500">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#3a3a3a]">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {i18next.language === "fa" ? "نمایش فعلی:" : "Current:"}
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {rowsPerPage}{" "}
                        {i18next.language === "fa" ? "ردیف" : "rows"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 sm:px-6 py-4">
            <h2
              className={`${i18next.language === "fa" ? "text-right" : "text-left"} text-sm font-bold text-gray-700 dark:text-gray-200`}
            >
              {i18next.language === "fa" ? "همه معاملات" : "All trades"}
            </h2>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-175">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#3a3a3a]">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`px-3 sm:px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 select-none whitespace-nowrap
              ${col.key !== "colorBar" ? "cursor-pointer hover:text-gray-800 dark:hover:text-gray-200" : ""}
              ${col.key === "colorBar" ? "w-16" : ""}
            `}
                    >
                      <div className="flex items-center justify-end gap-1">
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
                {paginated.slice(0, rowsPerPage).map((trade, idx) => {
                  const isProfit = trade.profitLoss >= 0;
                  return (
                    <tr
                      key={trade.id}
                      className={`border-b border-gray-100 dark:border-[#3a3a3a]/60 transition-colors
              ${idx % 2 === 0 ? "bg-white dark:bg-[#2B2B2B]" : "bg-gray-50/50 dark:bg-[#333333]"}
              hover:bg-gray-100 dark:hover:bg-[#3a3a3a]
            `}
                    >
                      <td className="px-3 sm:px-4 py-3 text-right">
                        <div
                          className={`h-10 w-14 rounded-lg ${isProfit ? "bg-emerald-500" : "bg-red-500"}`}
                        />
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                        {trade.id}
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm font-normal text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            {i18next.language === "fa" ? "بیت کوین" : "BTC"}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#4a4a4a] flex items-center justify-center text-xs font-bold text-orange-500">
                            <CoinIcon />
                          </div>
                        </div>
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {trade.volume}
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right text-sm text-red-500 font-medium whitespace-nowrap">
                        {trade.sl}
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right text-sm text-emerald-500 font-medium whitespace-nowrap">
                        {trade.tp}
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {trade.commission}
                      </td>

                      <td className="px-3 sm:px-4 py-3 text-right text-sm font-semibold whitespace-nowrap">
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
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold whitespace-nowrap">
                            <TrendingUp size={11} />
                            <span>{trade.pointBadgeLabel.en}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            {trade.points.toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {paginated.slice(0, rowsPerPage).length === 0 && (
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
          <div className="block md:hidden space-y-3 px-4 pb-4">
            {paginated.slice(0, rowsPerPage).map((trade, idx) => {
              const isProfit = trade.profitLoss >= 0;
              return (
                <div
                  key={trade.id}
                  className={`rounded-xl border border-gray-200 dark:border-[#3a3a3a] p-4 transition-colors
          ${idx % 2 === 0 ? "bg-white dark:bg-[#2B2B2B]" : "bg-gray-50/50 dark:bg-[#333333]"}
        `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${isProfit ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                        #{trade.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {i18next.language === "fa" ? "بیت کوین" : "BTC"}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#4a4a4a] flex items-center justify-center text-[8px] font-bold text-orange-500">
                        <CoinIcon />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        {i18next.language === "fa" ? "حجم" : "Volume"}
                      </p>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                        {trade.volume}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        SL
                      </p>
                      <p className="text-xs font-semibold text-red-500">
                        {trade.sl}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        TP
                      </p>
                      <p className="text-xs font-semibold text-emerald-500">
                        {trade.tp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#3a3a3a]/60">
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        {i18next.language === "fa" ? "سود/زیان" : "P/L"}
                      </p>
                      <p
                        className={`text-sm font-bold ${isProfit ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {trade.profitLoss > 0 ? "+" : ""}
                        {trade.profitLoss}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        {i18next.language === "fa" ? "امتیاز" : "Points"}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          {trade.points.toLocaleString()}
                        </span>
                        <div className="px-2 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] font-bold whitespace-nowrap">
                          {t(trade.pointBadgeLabel.en)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {trade.commission && (
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#3a3a3a]/30 flex justify-between">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {i18next.language === "fa" ? "کارمزد" : "Commission"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {trade.commission}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {paginated.slice(0, rowsPerPage).length === 0 && (
              <div className="py-16 text-center text-gray-400 dark:text-gray-600 text-sm">
                {i18next.language === "fa"
                  ? "داده‌ای یافت نشد"
                  : "No data found"}
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-[#3a3a3a] gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {i18next.language === "fa"
                    ? `صفحه ${page + 1} از ${totalPages}`
                    : `Page ${page + 1} of ${totalPages}`}
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400">
                    {i18next.language === "fa" ? "نمایش" : "Show"}
                  </label>
                  <select
                    value={rowsPerPage}
                    onChange={(e) =>
                      handleRowsPerPageChange(Number(e.target.value))
                    }
                    className="px-2 py-1 text-xs border border-gray-200 dark:border-[#4a4a4a] rounded-lg bg-white dark:bg-[#2B2B2B] text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {i18next.language === "fa" ? "ردیف" : "rows"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-[#4a4a4a] text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
                {getPaginationItems().map((item, index) => {
                  if (item === "ellipsis-start" || item === "ellipsis-end") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="text-gray-500 dark:text-gray-400 text-xs px-1"
                      >
                        …
                      </span>
                    );
                  }
                  return (
                    <button
                      key={item}
                      onClick={() => setPage(item as number)}
                      className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                        ${
                          page === item
                            ? "bg-emerald-500 text-white"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] border border-gray-200 dark:border-[#4a4a4a]"
                        }`}
                    >
                      {(item as number) + 1}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
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
    </>
  );
}
