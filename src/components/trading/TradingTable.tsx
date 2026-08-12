import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Newspaper,
  SlidersHorizontal,
  BarChart3,
  Calendar,
  Hash,
  Tag,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wallet,
  Percent,
  ListChecks,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
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

interface ExtendedTrades extends Trades {
  risk?: string;
  riskType?: "with_sl" | "with_margin";
  riskAmount?: number;
}

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

function generateFakeTrades(count: number): ExtendedTrades[] {
  const out: ExtendedTrades[] = [];
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

    const riskScore = Math.random();
    let risk = "low";
    if (riskScore > 0.7) risk = "high";
    else if (riskScore > 0.4) risk = "medium";

    const riskType: "with_sl" | "with_margin" =
      Math.random() > 0.5 ? "with_sl" : "with_margin";
    const riskAmount = +randomBetween(50, 1500).toFixed(2);

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
      risk,
      riskType,
      riskAmount,
    });
  }
  return out;
}

function StatsHeader({
  trades,
  lang,
}: {
  trades: ExtendedTrades[];
  lang: string;
}) {
  const isRtl = lang === "fa";

  const stats = useMemo(() => {
    const total = trades.length;
    const wins = trades.filter((t) => t.result === "profit");
    const losses = trades.filter((t) => t.result === "loss");
    const winCount = wins.length;
    const lossCount = losses.length;
    const winPct = total ? (winCount / total) * 100 : 0;
    const lossPct = total ? (lossCount / total) * 100 : 0;
    const netProfit = trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);

    const closedTrades = trades.filter(
      (t) => t.status === "closed" && t.result !== "pending",
    );
    const avgReturn =
      closedTrades.length > 0
        ? closedTrades.reduce((sum, t) => {
            const base = t.entryPrice * t.volume;
            return sum + (base > 0 ? (t.profitLoss / base) * 100 : 0);
          }, 0) / closedTrades.length
        : 0;

    return {
      total,
      winCount,
      lossCount,
      winPct,
      lossPct,
      netProfit,
      avgReturn,
    };
  }, [trades]);

  const items = [
    {
      key: "total",
      label: isRtl ? "تعداد کل معاملات" : "Total Trades",
      value: stats.total.toLocaleString(),
      icon: <ListChecks size={16} />,
      valueColor: "text-gray-700 dark:text-gray-200",
      iconBg: "bg-gray-500/15",
      iconColor: "text-gray-500 dark:text-gray-400",
    },
    {
      key: "wins",
      label: isRtl ? "معاملات سودده" : "Winning Trades",
      value: `${stats.winCount.toLocaleString()} (${stats.winPct.toFixed(1)}%)`,
      icon: <TrendingUp size={16} />,
      valueColor: "text-emerald-500",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-500",
    },
    {
      key: "losses",
      label: isRtl ? "معاملات زیان‌ده" : "Losing Trades",
      value: `${stats.lossCount.toLocaleString()} (${stats.lossPct.toFixed(1)}%)`,
      icon: <TrendingDown size={16} />,
      valueColor: "text-rose-500",
      iconBg: "bg-rose-500/15",
      iconColor: "text-rose-500",
    },
    {
      key: "netProfit",
      label: isRtl ? "مجموع سود خالص" : "Total Net Profit",
      value: stats.netProfit.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
      icon: <Wallet size={16} />,
      valueColor: stats.netProfit >= 0 ? "text-emerald-500" : "text-rose-500",
      iconBg: stats.netProfit >= 0 ? "bg-emerald-500/15" : "bg-rose-500/15",
      iconColor: stats.netProfit >= 0 ? "text-emerald-500" : "text-rose-500",
    },
    {
      key: "avgReturn",
      label: isRtl ? "میانگین بازدهی" : "Average Return",
      value: `${stats.avgReturn.toFixed(2)}%`,
      icon: <Percent size={16} />,
      valueColor: "text-violet-500",
      iconBg: "bg-violet-500/15",
      iconColor: "text-violet-500",
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-gray-200 dark:divide-[#3a3a3a] rounded-2xl border border-gray-200 dark:border-[#3a3a3a] bg-white dark:bg-[#2B2B2B] overflow-hidden mb-3"
    >
      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center justify-between gap-2 px-4 py-3"
        >
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap mb-1">
              {item.label}
            </p>
            <p
              className={`text-sm font-bold whitespace-nowrap ${item.valueColor}`}
            >
              {item.value}
            </p>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
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

function matchesFilters(trade: ExtendedTrades, f: Filters): boolean {
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

function sortTrades(
  trades: ExtendedTrades[],
  sort: SortState,
): ExtendedTrades[] {
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
    <div className="flex items-center gap-1.5 justify-end whitespace-nowrap">
      <span className="text-xs font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
        {lang === "fa" ? s.label.fa : s.label.en}
      </span>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold shrink-0 border"
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
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap
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
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap border ${m.cls}`}
    >
      {lang === "fa" ? m.fa : m.en}
    </span>
  );
}

function RiskBadge({ risk, lang }: { risk: string; lang: string }) {
  const map = {
    low: {
      fa: "کم",
      en: "Low",
      cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    medium: {
      fa: "متوسط",
      en: "Medium",
      cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    },
    high: {
      fa: "بالا",
      en: "High",
      cls: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    },
  };
  const m = map[risk as keyof typeof map] || map.low;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap border ${m.cls}`}
    >
      {lang === "fa" ? m.fa : m.en}
    </span>
  );
}

// ====== کامپوننت نمایش نوع ریسک ======
function RiskTypeBadge({
  riskType,
  lang,
}: {
  riskType: "with_sl" | "with_margin";
  lang: string;
}) {
  const isWithSl = riskType === "with_sl";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap border
        ${
          isWithSl
            ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
            : "bg-purple-500/15 text-purple-400 border-purple-500/30"
        }`}
    >
      {isWithSl
        ? lang === "fa"
          ? "با SL"
          : "With SL"
        : lang === "fa"
          ? "با مارجین"
          : "With Margin"}
    </span>
  );
}

function ColorBarHeaderChip() {
  return (
    <div
      className="
    flex items-center gap-1
    mx-auto
    px-1.5 py-1
    rounded-full
    bg-[#2b2b2b]
    border border-white/[0.06]
    shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),
            inset_-1px_-1px_2px_rgba(0,0,0,0.5)]
  "
    >
      <span
        className="
      w-2.5 h-2.5
      rounded-full
      bg-emerald-400
      shadow-[0_0_7px_rgba(52,211,153,0.7)]
    "
      />

      <span
        className="
      w-2.5 h-2.5
      rounded-full
      bg-rose-400
      shadow-[0_0_7px_rgba(251,113,133,0.6)]
    "
      />
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
        size={10}
        className={
          active && dir === "asc"
            ? "text-emerald-400"
            : "text-gray-400 dark:text-gray-600"
        }
      />
      <ChevronDown
        size={10}
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
    { label: { fa: "بسته", en: "Closed" }, value: closed, color: "#0E7490" },
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

function TradeCard({ trade, lang }: { trade: ExtendedTrades; lang: string }) {
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
        <RiskBadge risk={trade.risk || "low"} lang={lang} />
        {trade.riskType && (
          <RiskTypeBadge riskType={trade.riskType} lang={lang} />
        )}
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
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {isRtl ? "نوع ریسک" : "Risk Type"}
          </p>
          {trade.riskType ? (
            <RiskTypeBadge riskType={trade.riskType} lang={lang} />
          ) : (
            <p className="text-sm text-gray-400">—</p>
          )}
        </div>
        <div>
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {isRtl ? "میزان ریسک" : "Risk Amount"}
          </p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            ${trade.riskAmount?.toLocaleString() || "—"}
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

      {/* {trade.comment && (
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-[#3a3a3a]/30 pr-2">
          <p className="text-[9px] text-gray-400">
            {isRtl ? "کامنت" : "Comment"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
            {trade.comment}
          </p>
        </div>
      )} */}
    </div>
  );
}

function FilterModal({
  isOpen,
  onClose,
  filters,
  setFilters,
  resetFilters,
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
  isRtl,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  rowsPerPage: number;
  setRowsPerPage: (v: number) => void;
  setCurrentPage: (v: number) => void;
  isRtl: boolean;
  lang: string;
}) {
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

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.symbol !== "all") count++;
    if (filters.side !== "all") count++;
    if (filters.result !== "all") count++;

    for (const key of Object.keys(filters.numeric)) {
      const range = filters.numeric[key];
      if (range.min !== "" || range.max !== "") count++;
    }

    for (const key of Object.keys(filters.dates)) {
      const range = filters.dates[key];
      if (range.from !== "" || range.to !== "") count++;
    }

    return count;
  }, [filters]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        className={`fixed inset-4 sm:inset-8 md:inset-10 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 
          lg:w-[800px] lg:max-w-[90vw] lg:max-h-[85vh] z-50 
          bg-white dark:bg-[#2B2B2B] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#3a3a3a]
          animate-in fade-in zoom-in-95 duration-200
          flex flex-col overflow-hidden`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-[#3a3a3a] shrink-0">
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={20} className="text-emerald-500" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              {isRtl ? "فیلتر پیشرفته" : "Advanced Filters"}
            </h2>
            {activeFilterCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                {activeFilterCount} {isRtl ? "فعال" : "active"}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#3a3a3a] rounded-xl transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {isRtl ? "فیلترهای سریع" : "Quick Filters"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1.5">
                  {isRtl ? "نماد" : "Symbol"}
                </label>
                <select
                  value={filters.symbol}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, symbol: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
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
                <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1.5">
                  {isRtl ? "نوع معامله" : "Side"}
                </label>
                <select
                  value={filters.side}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      side: e.target.value as TradeSide | "all",
                    }))
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                >
                  <option value="all">{isRtl ? "همه" : "All"}</option>
                  <option value="buy">{isRtl ? "بای" : "Buy"}</option>
                  <option value="sell">{isRtl ? "سل" : "Sell"}</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1.5">
                  {isRtl ? "وضعیت" : "Result"}
                </label>
                <select
                  value={filters.result}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      result: e.target.value as TradeResult | "all",
                    }))
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                >
                  <option value="all">{isRtl ? "همه" : "All"}</option>
                  <option value="profit">{isRtl ? "سود" : "Profit"}</option>
                  <option value="loss">{isRtl ? "ضرر" : "Loss"}</option>
                  <option value="pending">
                    {isRtl ? "پندینگ" : "Pending"}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hash size={16} className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {isRtl ? "بازه‌های عددی" : "Numeric Ranges"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NUMERIC_RANGE_FIELDS.map((field) => {
                const key = field.key as string;
                const range = filters.numeric[key];
                return (
                  <div key={key}>
                    <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1.5">
                      {isRtl ? field.label.fa : field.label.en}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder={isRtl ? "حداقل" : "Min"}
                        value={range.min}
                        onChange={(e) =>
                          updateNumeric(key, "min", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                      />
                      <span className="text-gray-400 text-sm">-</span>
                      <input
                        type="number"
                        placeholder={isRtl ? "حداکثر" : "Max"}
                        value={range.max}
                        onChange={(e) =>
                          updateNumeric(key, "max", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {isRtl ? "بازه‌های زمانی" : "Date Ranges"}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {DATE_RANGE_FIELDS.map((field) => {
                const key = field.key as string;
                const range = filters.dates[key];
                return (
                  <div key={key}>
                    <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1.5">
                      {isRtl ? field.label.fa : field.label.en}
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="datetime-local"
                        value={range.from}
                        onChange={(e) =>
                          updateDate(key, "from", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                      />
                      <span className="text-sm text-gray-400 text-center sm:text-left shrink-0">
                        {isRtl ? "تا" : "to"}
                      </span>
                      <input
                        type="datetime-local"
                        value={range.to}
                        onChange={(e) => updateDate(key, "to", e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-[#4a4a4a] bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {isRtl ? "تعداد ردیف در هر صفحه" : "Rows per page"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 20, 50, 100].map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setRowsPerPage(v);
                    setCurrentPage(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    rowsPerPage === v
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-gray-100 dark:bg-[#333] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#444] border border-gray-200 dark:border-[#4a4a4a]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-[#3a3a3a] shrink-0 bg-gray-50 dark:bg-[#252525]">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCw size={16} />
            {isRtl ? "پاک کردن همه" : "Reset All"}
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors"
            >
              {isRtl ? "انصراف" : "Cancel"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all"
            >
              {isRtl ? "اعمال فیلتر" : "Apply Filters"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TradingTable() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isRtl = lang === "fa";

  const [allTrades] = useState<ExtendedTrades[]>(() => generateFakeTrades(60));
  const [filters, setFilters] = useState<Filters>(emptyFilters());
  const [sort, setSort] = useState<SortState>({ col: null, dir: "asc" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

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

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.symbol !== "all") count++;
    if (filters.side !== "all") count++;
    if (filters.result !== "all") count++;

    for (const key of Object.keys(filters.numeric)) {
      const range = filters.numeric[key];
      if (range.min !== "" || range.max !== "") count++;
    }

    for (const key of Object.keys(filters.dates)) {
      const range = filters.dates[key];
      if (range.from !== "" || range.to !== "") count++;
    }

    return count;
  }, [filters]);

  const tableColumns = COLUMNS;

  return (
    <>
      <div className="px-4 sm:px-6 pt-4">
        <StatsHeader trades={filteredSorted} lang={lang} />
      </div>
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="w-full mt-3 max-w-full mx-auto font-lahzeh rounded-[25px] border-4
        dark:border-[#3C3C3C] border-gray-300"
      >
        <div className="mx-auto rounded-2xl bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] shadow-xl overflow-hidden border border-gray-200 dark:border-[#3a3a3a]">
          <div className="flex flex-col lg:flex-row items-center gap-4 px-4 sm:px-6 py-4">
            <div
              id="trades2"
              className="flex-1 w-full flex items-center justify-center"
            >
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

            <div className="shrink-0 w-full lg:w-auto">
              <button
                id="trades1"
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center justify-center w-full lg:w-auto gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-[#4a4a4a] bg-gray-50 dark:bg-[#3a3a3a] text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-100 dark:hover:bg-[#4a4a4a] transition-colors relative"
              >
                <Filter size={14} />
                <span>{isRtl ? "فیلترها" : "Filters"}</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/25">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-475 table-auto">
              <thead id="trades3">
                <tr className="border-b border-gray-200 dark:border-[#3a3a3a]">
                  {tableColumns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key as ColKey)}
                      className={`px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 select-none whitespace-nowrap
                        ${
                          col.sort !== "none"
                            ? "cursor-pointer hover:text-gray-800 dark:hover:text-gray-200"
                            : ""
                        }
                        ${col.key === "colorBar" ? "w-10" : ""}`}
                      style={{ width: col.width || "auto" }}
                    >
                      {col.key === "colorBar" ? (
                        <ColorBarHeaderChip />
                      ) : (
                        <div className="flex items-center justify-end gap-1 whitespace-nowrap">
                          {col.sort !== "none" && (
                            <SortChevrons
                              active={sort.col === col.key}
                              dir={sort.dir}
                            />
                          )}
                          <span className="text-xs whitespace-nowrap text-center w-full">
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
                    <td className="px-4 py-3 text-center">
                      <div
                        className={`w-[3px] h-6 rounded-full mx-auto ${
                          tr.profitLoss >= 0 ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                      {tr.ticket}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {fmtDateTime(tr.registeredAt, lang)}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {fmtDateTime(tr.entryAt, lang)}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300 tabular-nums whitespace-nowrap">
                      {tr.entryPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <SideBadge side={tr.side} lang={lang} />
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <SymbolBadge symKey={tr.symbol} lang={lang} />
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <ResultBadge result={tr.result} lang={lang} />
                    </td>
                    {/* ستون نوع ریسک */}
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {tr.riskType ? (
                        <RiskTypeBadge riskType={tr.riskType} lang={lang} />
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300 tabular-nums whitespace-nowrap">
                      {tr.riskAmount
                        ? `$${tr.riskAmount.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <RiskBadge risk={tr.risk || "low"} lang={lang} />
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300 tabular-nums whitespace-nowrap">
                      {tr.volume}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-rose-500 font-medium tabular-nums whitespace-nowrap">
                      {tr.sl.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-emerald-500 font-medium tabular-nums whitespace-nowrap">
                      {tr.tp.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300 tabular-nums whitespace-nowrap">
                      {tr.exitPrice !== null
                        ? tr.exitPrice.toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {fmtDateTime(tr.exitAt, lang)}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap">
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
                    <td className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
                      {tr.commission}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
                      {tr.swap}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {tr.isNewsTrade ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                          <Newspaper size={12} />
                          {isRtl ? "بله" : "Yes"}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-600">
                          {isRtl ? "خیر" : "No"}
                        </span>
                      )}
                    </td>
                    {/* <td
                      className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap"
                      title={tr.comment || "—"}
                    >
                      {tr.comment || "—"}
                    </td> */}
                  </tr>
                ))}

                {paginatedTrades.length === 0 && (
                  <tr>
                    <td
                      colSpan={tableColumns.length}
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

          {totalPages > 1 && (
            <div
              id="trades4"
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

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
        isRtl={isRtl}
        lang={lang}
      />
    </>
  );
}
