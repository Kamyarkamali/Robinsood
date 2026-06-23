import { useState } from "react";
import type { Lang, TradeStatus } from "../types/type";
import type { BilingualTexts, Trade } from "../types/interfaces";
import { trades } from "../data/fakeData";

export function useTradingTable(lang: Lang = "fa") {
  const [activeTab, setActiveTab] = useState<TradeStatus | "all">("active");
  const [sortCol, setSortCol] = useState<string>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const t = (b: BilingualTexts) => b[lang];

  const filtered =
    activeTab === "all"
      ? trades
      : trades.filter((tr) => tr.status === activeTab);

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortCol === "symbol") return dir * (a.symbol.fa > b.symbol.fa ? 1 : -1);
    const av = a[sortCol as keyof Trade];
    const bv = b[sortCol as keyof Trade];
    if (typeof av === "number" && typeof bv === "number")
      return dir * (av - bv);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice(page * pageSize, page * pageSize + pageSize);

  const handleSort = (col: string) => {
    if (col === "colorBar") return;
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortCol(col);
      setSortDir("asc");
    }
    setPage(0);
  };

  const activeCnt = trades.filter((t) => t.status === "active").length;
  const closedCnt = trades.filter((t) => t.status === "closed").length;
  const plannedCnt = trades.filter((t) => t.status === "planned").length;

  return {
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
    pageSize,
  };
}
