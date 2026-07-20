import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Newspaper,
} from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type {
  DateRanges,
  Filters,
  NumericRanges,
  Trades,
} from "../../types/interfaces";
import type {
  ColKey,
  TradeResult,
  TradeSide,
  TradeStatus,
} from "../../types/type";
import {
  COLUMNS,
  DATE_RANGE_FIELDS,
  NUMERIC_RANGE_FIELDS,
  SYMBOLS,
} from "../../data/fakeData";

function symbolInfo(key: string) {
  return SYMBOLS.find((s) => s.key === key) ?? SYMBOLS[0];
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomDateWithin(daysBack: number) {
  const now = Date.now();
  const past = now - Math.random() * daysBack * 86400000;
  return new Date(past).toISOString();
}

function generateFakeTrades(count: number): Trades[] {
  const out: Trades[] = [];
  for (let i = 0; i < count; i++) {
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const side: TradeSide = Math.random() > 0.5 ? "buy" : "sell";
    const statusRoll = Math.random();
    const status: TradeStatus =
      statusRoll < 0.15 ? "active" : statusRoll < 0.25 ? "planned" : "closed";

    const entryPrice = randomBetween(1000, 65000);
    const isClosed = status === "closed";
    const isPlanned = status === "planned";

    const result: TradeResult = isPlanned
      ? "pending"
      : Math.random() > 0.45
        ? "profit"
        : "loss";

    const profitLoss = isPlanned
      ? 0
      : result === "profit"
        ? +randomBetween(5, 500).toFixed(2)
        : -randomBetween(5, 400).toFixed(2);

    const registeredAt = randomDateWithin(20);
    const entryAt = isPlanned
      ? new Date(Date.now() + randomBetween(1, 5) * 86400000).toISOString()
      : randomDateWithin(15);
    const exitAt = isClosed
      ? new Date(
          new Date(entryAt).getTime() + randomBetween(1, 48) * 3600000,
        ).toISOString()
      : null;

    out.push({
      id: i + 1,
      ticket: `TCK-${100000 + i}`,
      registeredAt,
      entryAt,
      entryPrice: +entryPrice.toFixed(2),
      side,
      symbol: symbol.key,
      result,
      status,
      volume: +randomBetween(0.01, 5).toFixed(2),
      sl: +(entryPrice * (side === "buy" ? 0.97 : 1.03)).toFixed(2),
      tp: +(entryPrice * (side === "buy" ? 1.05 : 0.95)).toFixed(2),
      exitPrice: isClosed
        ? +(
            entryPrice +
            (result === "profit" ? 1 : -1) * randomBetween(10, 900)
          ).toFixed(2)
        : null,
      exitAt,
      profitLoss,
      commission: +randomBetween(0.5, 8).toFixed(2),
      swap: +randomBetween(-3, 3).toFixed(2),
      isNewsTrade: Math.random() > 0.75,
      comment:
        Math.random() > 0.5
          ? ""
          : "معامله طبق استراتژی روند اصلی با مدیریت ریسک مناسب",
    });
  }
  return out;
}

function emptyFilters(): Filters {
  const numeric: Record<string, NumericRanges> = {};
  NUMERIC_RANGE_FIELDS.forEach(
    (f) => (numeric[f.key as string] = { min: "", max: "" }),
  );
  const dates: Record<string, DateRanges> = {};
  DATE_RANGE_FIELDS.forEach(
    (f) => (dates[f.key as string] = { from: "", to: "" }),
  );
  return { symbol: "all", side: "all", result: "all", numeric, dates };
}

function matchesFilters(trade: Trades, f: Filters): boolean {
  if (f.symbol !== "all" && trade.symbol !== f.symbol) return false;
  if (f.side !== "all" && trade.side !== f.side) return false;
  if (f.result !== "all" && trade.result !== f.result) return false;

  for (const field of NUMERIC_RANGE_FIELDS) {
    const range = f.numeric[field.key as string];
    const val = trade[field.key] as number | null;
    if (val === null || val === undefined) continue;
    if (range.min !== "" && val < Number(range.min)) return false;
    if (range.max !== "" && val > Number(range.max)) return false;
  }

  for (const field of DATE_RANGE_FIELDS) {
    const range = f.dates[field.key as string];
    const val = trade[field.key] as string | null;
    if (!val) continue;
    const t = new Date(val).getTime();
    if (range.from && t < new Date(range.from).getTime()) return false;
    if (range.to && t > new Date(range.to).getTime()) return false;
  }

  return true;
}

interface SortState {
  col: ColKey | null;
  dir: "asc" | "desc";
}

function sortTrades(trades: Trades[], sort: SortState): Trades[] {
  if (!sort.col) return trades;
  const colDef = COLUMNS.find((c) => c.key === sort.col);
  if (!colDef || colDef.sort === "none") return trades;

  const arr = [...trades];
  arr.sort((a, b) => {
    const av = (a as any)[sort.col as string];
    const bv = (b as any)[sort.col as string];

    let cmp = 0;
    if (colDef.sort === "number") {
      cmp = (av ?? -Infinity) - (bv ?? -Infinity);
    } else if (colDef.sort === "date") {
      cmp = new Date(av ?? 0).getTime() - new Date(bv ?? 0).getTime();
    } else if (colDef.sort === "boolean") {
      cmp = (av ? 1 : 0) - (bv ? 1 : 0);
    } else {
      cmp = String(av ?? "").localeCompare(String(bv ?? ""));
    }
    return sort.dir === "asc" ? cmp : -cmp;
  });
  return arr;
}

function fmtDateTime(iso: string | null, lang: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function SymbolBadge({ symKey, lang }: { symKey: string; lang: string }) {
  const s = symbolInfo(symKey);
  return (
    <div className="flex items-center gap-1 justify-end">
      <span className="text-[10px] font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
        {lang === "fa" ? s.label.fa : s.label.en}
      </span>
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-extrabold shrink-0 border"
        style={{
          background: `${s.color}22`,
          borderColor: `${s.color}55`,
          color: s.color,
        }}
      >
        {s.short}
      </div>
    </div>
  );
}

function SideBadge({ side, lang }: { side: TradeSide; lang: string }) {
  const isBuy = side === "buy";
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold whitespace-nowrap
      ${isBuy ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border border-rose-500/30"}`}
    >
      {isBuy ? (lang === "fa" ? "بای" : "Buy") : lang === "fa" ? "سل" : "Sell"}
    </span>
  );
}

function ResultBadge({ result, lang }: { result: TradeResult; lang: string }) {
  const map = {
    profit: {
      fa: "سود",
      en: "Profit",
      cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    loss: {
      fa: "ضرر",
      en: "Loss",
      cls: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    },
    pending: {
      fa: "پندینگ",
      en: "Pending",
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
  } as const;
  const m = map[result];
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold whitespace-nowrap border ${m.cls}`}
    >
      {lang === "fa" ? m.fa : m.en}
    </span>
  );
}

function ColorBarHeaderChip() {
  return (
    <div className="flex w-4 h-3 rounded-sm mx-auto border border-white/10">
      <div className="flex-1 bg-emerald-500" />
      <div className="flex-1 bg-rose-500" />
    </div>
  );
}

function SortChevrons({
  active,
  dir,
}: {
  active: boolean;
  dir: "asc" | "desc";
}) {
  return (
    <span className="flex flex-col -space-y-1 shrink-0">
      <ChevronUp
        size={7}
        className={
          active && dir === "asc"
            ? "text-emerald-400"
            : "text-gray-400 dark:text-gray-600"
        }
      />
      <ChevronDown
        size={7}
        className={
          active && dir === "desc"
            ? "text-emerald-400"
            : "text-gray-400 dark:text-gray-600"
        }
      />
    </span>
  );
}

function LinearStat({
  active,
  closed,
  planned,
}: {
  active: number;
  closed: number;
  planned: number;
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const total = Math.max(1, active + closed + planned);
  const segs = [
    { label: { fa: "باز", en: "Active" }, value: active, color: "#38bdf8" },
    { label: { fa: "بسته", en: "Closed" }, value: closed, color: "#94a3b8" },
    {
      label: { fa: "برنامه‌ریزی", en: "Planned" },
      value: planned,
      color: "#fbbf24",
    },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1">
        {segs.map((seg) => (
          <span key={seg.label.en}>
            {lang === "fa" ? seg.label.fa : seg.label.en}: {seg.value}
          </span>
        ))}
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden flex">
        {segs.map((seg) => (
          <div
            key={seg.label.en}
            style={{
              width: `${(seg.value / total) * 100}%`,
              backgroundColor: seg.color,
            }}
            className="transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}

function TradeCard({ trade, lang }: { trade: Trades; lang: string }) {
  const isRtl = lang === "fa";

  return (
    <div className="bg-white dark:bg-[#2B2B2B] rounded-xl border border-gray-200 dark:border-[#3a3a3a] p-4 mb-3 relative overflow-hidden">
      <div
        className={`absolute top-0 bottom-0 ${isRtl ? "right-0" : "left-0"} w-1 ${trade.profitLoss >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
      />

      <div className="flex items-center justify-between mb-3 pr-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
            {trade.ticket}
          </span>
          {trade.isNewsTrade && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <Newspaper size={10} />
              {isRtl ? "خبر" : "News"}
            </span>
          )}
        </div>
        <SymbolBadge symKey={trade.symbol} lang={lang} />
      </div>

      <div className="flex items-center gap-2 mb-3 pr-2 flex-wrap">
        <SideBadge side={trade.side} lang={lang} />
        <ResultBadge result={trade.result} lang={lang} />
        <span
          className={`text-[8px] px-2 py-0.5 rounded-full ${
            trade.status === "active"
              ? "bg-blue-500/15 text-blue-400"
              : trade.status === "closed"
                ? "bg-gray-500/15 text-gray-400"
                : "bg-yellow-500/15 text-yellow-400"
          }`}
        >
          {isRtl
            ? trade.status === "active"
              ? "باز"
              : trade.status === "closed"
                ? "بسته"
                : "برنامه‌ریزی"
            : trade.status === "active"
              ? "Active"
              : trade.status === "closed"
                ? "Closed"
                : "Planned"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 pr-2">
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {isRtl ? "قیمت ورود" : "Entry Price"}
          </p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {trade.entryPrice.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {isRtl ? "قیمت خروج" : "Exit Price"}
          </p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {trade.exitPrice !== null ? trade.exitPrice.toLocaleString() : "—"}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">SL</p>
          <p className="text-sm font-semibold text-rose-500">
            {trade.sl.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">TP</p>
          <p className="text-sm font-semibold text-emerald-500">
            {trade.tp.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {isRtl ? "حجم" : "Volume"}
          </p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {trade.volume}
          </p>
        </div>
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {isRtl ? "سود/زیان" : "P&L"}
          </p>
          <p
            className={`text-sm font-bold ${
              trade.profitLoss >= 0 ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {trade.profitLoss > 0 ? "+" : ""}
            {trade.profitLoss}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-[#3a3a3a]/60 pr-2 text-[10px] text-gray-500 dark:text-gray-400">
        <div>
          <p className="text-[8px] text-gray-400">
            {isRtl ? "ثبت" : "Registered"}
          </p>
          <p className="truncate">{fmtDateTime(trade.registeredAt, lang)}</p>
        </div>
        <div>
          <p className="text-[8px] text-gray-400">{isRtl ? "ورود" : "Entry"}</p>
          <p className="truncate">{fmtDateTime(trade.entryAt, lang)}</p>
        </div>
        <div>
          <p className="text-[8px] text-gray-400">{isRtl ? "خروج" : "Exit"}</p>
          <p className="truncate">{fmtDateTime(trade.exitAt, lang)}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2 pr-2 text-[10px] text-gray-500 dark:text-gray-400">
        <span>
          {isRtl ? "کمیسیون" : "Commission"}: {trade.commission}
        </span>
        <span>
          {isRtl ? "سواپ" : "Swap"}: {trade.swap}
        </span>
      </div>

      {trade.comment && (
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#3a3a3a]/30 pr-2">
          <p className="text-[9px] text-gray-400">
            {isRtl ? "کامنت" : "Comment"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
            {trade.comment}
          </p>
        </div>
      )}
    </div>
  );
}

export default function TradingTable() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const isRtl = lang === "fa";

  const [allTrades] = useState<Trades[]>(() => generateFakeTrades(60));
  const [filters, setFilters] = useState<Filters>(emptyFilters());
  const [sort, setSort] = useState<SortState>({ col: null, dir: "asc" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredSorted = useMemo(() => {
    const filtered = allTrades.filter((tr) => matchesFilters(tr, filters));
    return sortTrades(filtered, sort);
  }, [allTrades, filters, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSorted.length / rowsPerPage),
  );
  const paginatedTrades = filteredSorted.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const handleSort = (col: ColKey) => {
    const def = COLUMNS.find((c) => c.key === col);
    if (!def || def.sort === "none") return;
    setSort((prev) =>
      prev.col === col
        ? { col, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { col, dir: "asc" },
    );
  };

  const resetFilters = () => setFilters(emptyFilters());

  const updateNumeric = (key: string, part: "min" | "max", value: string) => {
    setFilters((f) => ({
      ...f,
      numeric: { ...f.numeric, [key]: { ...f.numeric[key], [part]: value } },
    }));
  };

  const updateDate = (key: string, part: "from" | "to", value: string) => {
    setFilters((f) => ({
      ...f,
      dates: { ...f.dates, [key]: { ...f.dates[key], [part]: value } },
    }));
  };

  const paginationItems = () => {
    const items: (number | string)[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) items.push(i);
    } else {
      items.push(0);
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages - 2, currentPage + 1);
      if (currentPage < 2) end = Math.min(totalPages - 2, 3);
      if (currentPage > totalPages - 3) start = Math.max(1, totalPages - 4);
      if (start > 1) items.push("ellipsis-start");
      for (let i = start; i <= end; i++) items.push(i);
      if (end < totalPages - 2) items.push("ellipsis-end");
      if (!items.includes(totalPages - 1)) items.push(totalPages - 1);
    }
    return items;
  };

  return (
    <>
      <h1 className="md:text-2xl text-md font-bold px-4 mt-3 mb-3">
        {t("items.item10", {
          defaultValue: isRtl ? "جدول معاملات" : "Trades Table",
        })}
      </h1>

      <div
        id="trade1"
        dir={isRtl ? "rtl" : "ltr"}
        className="w-full step-test51 mt-3 max-w-full mx-auto font-lahzeh rounded-[25px] border-4
        dark:border-[#3C3C3C] border-gray-300"
      >
        <div className="mx-auto rounded-2xl bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] shadow-xl overflow-hidden border border-gray-200 dark:border-[#3a3a3a]">
          <div className="flex flex-col lg:flex-row items-center gap-4 px-4 sm:px-6 py-4">
            <div className="flex-1 w-full flex items-center justify-center">
              <LinearStat
                active={
                  filteredSorted.filter((t) => t.status === "active").length
                }
                closed={
                  filteredSorted.filter((t) => t.status === "closed").length
                }
                planned={
                  filteredSorted.filter((t) => t.status === "planned").length
                }
              />
            </div>

            <div
              className="relative shrink-0 w-full lg:w-auto"
              ref={filterRef}
              id="trade2"
            >
              <button
                onClick={() => setIsFilterOpen((v) => !v)}
                className="flex items-center justify-center w-full lg:w-auto gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-[#4a4a4a] bg-gray-50 dark:bg-[#3a3a3a] text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-100 dark:hover:bg-[#4a4a4a] transition-colors"
              >
                <Filter size={14} />
                <span>{isRtl ? "فیلترها" : "Filters"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div
                  className={`absolute ${
                    isMobile
                      ? "left-1/2 -translate-x-1/2 top-full mt-2 w-[95vw]"
                      : "left-3/2 top-0 -translate-x-1/2 mt-2 w-105"
                  } max-h-[80vh] overflow-y-auto bg-white dark:bg-[#2B2B2B] rounded-xl shadow-2xl border border-gray-200 dark:border-[#3a3a3a] p-4 z-100`}
                >
                  <div className="flex items-center justify-between mb-3 top-0 bg-white dark:bg-[#2B2B2B]  z-10 pb-2 border-b border-gray-100 dark:border-[#3a3a3a]">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {isRtl ? "فیلتر پیشرفته" : "Advanced Filters"}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                    <div>
                      <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">
                        {isRtl ? "نماد" : "Symbol"}
                      </label>
                      <select
                        value={filters.symbol}
                        onChange={(e) =>
                          setFilters((f) => ({ ...f, symbol: e.target.value }))
                        }
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                      >
                        <option value="all">{isRtl ? "همه" : "All"}</option>
                        {SYMBOLS.map((s) => (
                          <option key={s.key} value={s.key}>
                            {isRtl ? s.label.fa : s.label.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">
                        {isRtl ? "نوع معامله" : "Side"}
                      </label>
                      <select
                        value={filters.side}
                        onChange={(e) =>
                          setFilters((f) => ({
                            ...f,
                            side: e.target.value as any,
                          }))
                        }
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                      >
                        <option value="all">{isRtl ? "همه" : "All"}</option>
                        <option value="buy">{isRtl ? "بای" : "Buy"}</option>
                        <option value="sell">{isRtl ? "سل" : "Sell"}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">
                        {isRtl ? "وضعیت" : "Result"}
                      </label>
                      <select
                        value={filters.result}
                        onChange={(e) =>
                          setFilters((f) => ({
                            ...f,
                            result: e.target.value as any,
                          }))
                        }
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                      >
                        <option value="all">{isRtl ? "همه" : "All"}</option>
                        <option value="profit">
                          {isRtl ? "سود" : "Profit"}
                        </option>
                        <option value="loss">{isRtl ? "ضرر" : "Loss"}</option>
                        <option value="pending">
                          {isRtl ? "پندینگ" : "Pending"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      {isRtl ? "بازه‌های عددی" : "Numeric Ranges"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {NUMERIC_RANGE_FIELDS.map((field) => {
                        const key = field.key as string;
                        const range = filters.numeric[key];
                        return (
                          <div key={key} className="col-span-1">
                            <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">
                              {isRtl ? field.label.fa : field.label.en}
                            </label>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                placeholder={isRtl ? "حداقل" : "Min"}
                                value={range.min}
                                onChange={(e) =>
                                  updateNumeric(key, "min", e.target.value)
                                }
                                className="w-full px-2 py-1 text-[11px] rounded-md border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                              />
                              <input
                                type="number"
                                placeholder={isRtl ? "حداکثر" : "Max"}
                                value={range.max}
                                onChange={(e) =>
                                  updateNumeric(key, "max", e.target.value)
                                }
                                className="w-full px-2 py-1 text-[11px] rounded-md border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      {isRtl ? "بازه‌های زمانی" : "Date Ranges"}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {DATE_RANGE_FIELDS.map((field) => {
                        const key = field.key as string;
                        const range = filters.dates[key];
                        return (
                          <div key={key}>
                            <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">
                              {isRtl ? field.label.fa : field.label.en}
                            </label>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1">
                              <input
                                type="datetime-local"
                                value={range.from}
                                onChange={(e) =>
                                  updateDate(key, "from", e.target.value)
                                }
                                className="w-full px-2 py-1 text-[11px] rounded-md border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                              />
                              <span className="text-[10px] text-gray-400 text-center sm:text-left">
                                {isRtl ? "تا" : "to"}
                              </span>
                              <input
                                type="datetime-local"
                                value={range.to}
                                onChange={(e) =>
                                  updateDate(key, "to", e.target.value)
                                }
                                className="w-full px-2 py-1 text-[11px] rounded-md border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      {isRtl ? "تعداد ردیف در هر صفحه" : "Rows per page"}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[5, 10, 20, 50, 100].map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            setRowsPerPage(v);
                            setCurrentPage(0);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                            rowsPerPage === v
                              ? "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 font-semibold border border-emerald-500/30"
                              : "text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#4a4a4a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={resetFilters}
                    className="w-full text-center px-3 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#4a4a4a] hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
                  >
                    {isRtl ? "پاک‌کردن فیلترها" : "Reset filters"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#3a3a3a]">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{ width: col.width }}
                      className={`px-1 py-2 text-right text-[9px] font-semibold text-gray-500 dark:text-gray-400 select-none whitespace-nowrap
                        ${
                          col.sort !== "none"
                            ? "cursor-pointer hover:text-gray-800 dark:hover:text-gray-200"
                            : ""
                        }
                        ${col.key === "colorBar" ? "w-[2%]" : ""}`}
                    >
                      {col.key === "colorBar" ? (
                        <ColorBarHeaderChip />
                      ) : (
                        <div className="flex items-center justify-end gap-0.5">
                          {col.sort !== "none" && (
                            <SortChevrons
                              active={sort.col === col.key}
                              dir={sort.dir}
                            />
                          )}
                          <span className="text-[8px] text-center w-full">
                            {isRtl ? col.label.fa : col.label.en}
                          </span>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedTrades.map((tr, idx) => (
                  <tr
                    key={tr.id}
                    className={`border-b border-gray-100 dark:border-[#3a3a3a]/60 transition-colors hover:bg-gray-100 dark:hover:bg-[#3a3a3a]
                      ${
                        idx % 2 === 0
                          ? "bg-white dark:bg-[#2B2B2B]"
                          : "bg-gray-50/50 dark:bg-[#303030]"
                      }`}
                  >
                    <td className="px-1 py-1.5 text-center">
                      <div
                        className={`w-[2px] h-5 rounded-full mx-auto ${
                          tr.profitLoss >= 0 ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-gray-700 dark:text-gray-300 font-medium truncate">
                      {tr.ticket}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[8px] text-gray-500 dark:text-gray-400 truncate">
                      {fmtDateTime(tr.registeredAt, lang)}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[8px] text-gray-500 dark:text-gray-400 truncate">
                      {fmtDateTime(tr.entryAt, lang)}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-gray-700 dark:text-gray-300 tabular-nums truncate">
                      {tr.entryPrice.toLocaleString()}
                    </td>
                    <td className="px-1 py-1.5 text-center">
                      <SideBadge side={tr.side} lang={lang} />
                    </td>
                    <td className="px-1 py-1.5 text-center">
                      <SymbolBadge symKey={tr.symbol} lang={lang} />
                    </td>
                    <td className="px-1 py-1.5 text-center">
                      <ResultBadge result={tr.result} lang={lang} />
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-gray-700 dark:text-gray-300 tabular-nums truncate">
                      {tr.volume}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-rose-500 font-medium tabular-nums truncate">
                      {tr.sl.toLocaleString()}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-emerald-500 font-medium tabular-nums truncate">
                      {tr.tp.toLocaleString()}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-gray-700 dark:text-gray-300 tabular-nums truncate">
                      {tr.exitPrice !== null
                        ? tr.exitPrice.toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[8px] text-gray-500 dark:text-gray-400 truncate">
                      {fmtDateTime(tr.exitAt, lang)}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] font-semibold truncate">
                      <span
                        className={
                          tr.profitLoss >= 0
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }
                      >
                        {tr.profitLoss > 0 ? "+" : ""}
                        {tr.profitLoss}
                      </span>
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-gray-500 dark:text-gray-400 tabular-nums truncate">
                      {tr.commission}
                    </td>
                    <td className="px-1 py-1.5 text-center text-[9px] text-gray-500 dark:text-gray-400 tabular-nums truncate">
                      {tr.swap}
                    </td>
                    <td className="px-1 py-1.5 text-center">
                      {tr.isNewsTrade ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[7px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                          <Newspaper size={8} />
                          {isRtl ? "بله" : "Yes"}
                        </span>
                      ) : (
                        <span className="text-[8px] text-gray-400 dark:text-gray-600">
                          {isRtl ? "خیر" : "No"}
                        </span>
                      )}
                    </td>
                    <td
                      className="px-1 py-1.5 text-center text-[8px] text-gray-600 dark:text-gray-300 truncate"
                      title={tr.comment || "—"}
                    >
                      {tr.comment || "—"}
                    </td>
                  </tr>
                ))}

                {paginatedTrades.length === 0 && (
                  <tr>
                    <td
                      colSpan={COLUMNS.length}
                      className="py-14 text-center text-gray-400 dark:text-gray-600 text-sm"
                    >
                      {isRtl ? "داده‌ای یافت نشد" : "No data found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden px-4 py-3">
            {paginatedTrades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} lang={lang} />
            ))}
            {paginatedTrades.length === 0 && (
              <div className="py-14 text-center text-gray-400 dark:text-gray-600 text-sm">
                {isRtl ? "داده‌ای یافت نشد" : "No data found"}
              </div>
            )}
          </div>

          {/* صفحه‌بندی / Pagination */}
          {totalPages > 1 && (
            <div
              id="trade3"
              className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-[#3a3a3a] gap-3 flex-wrap"
            >
              <span className="text-[11px] text-gray-400 dark:text-gray-500 text-center sm:text-left">
                {isRtl
                  ? `صفحه ${currentPage + 1} از ${totalPages}`
                  : `Page ${currentPage + 1} of ${totalPages}`}
                <span className="hidden sm:inline mx-2">|</span>
                <br className="sm:hidden" />
                <span className="hidden sm:inline">
                  {isRtl
                    ? `مجموع ${filteredSorted.length} ردیف`
                    : `${filteredSorted.length} rows total`}
                </span>
                <span className="sm:hidden">
                  {isRtl
                    ? `${filteredSorted.length} ردیف`
                    : `${filteredSorted.length} rows`}
                </span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-[#4a4a4a] text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
                >
                  {isRtl ? (
                    <ChevronRight size={13} />
                  ) : (
                    <ChevronLeft size={13} />
                  )}
                </button>
                {paginationItems().map((item, i) =>
                  typeof item === "string" ? (
                    <span
                      key={item + i}
                      className="text-gray-500 dark:text-gray-400 text-xs px-0.5"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setCurrentPage(item)}
                      className={`w-6.5 h-6.5 rounded-lg text-[11px] font-medium transition-colors
                        ${
                          currentPage === item
                            ? "bg-emerald-500 text-white"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] border border-gray-200 dark:border-[#4a4a4a]"
                        }`}
                    >
                      {item + 1}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
                  }
                  disabled={currentPage === totalPages - 1}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-[#4a4a4a] text-gray-500 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] transition-colors"
                >
                  {isRtl ? (
                    <ChevronLeft size={13} />
                  ) : (
                    <ChevronRight size={13} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
