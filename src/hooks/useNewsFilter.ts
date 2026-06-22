import { useState } from "react";
import { ALL_DATA } from "../data/fakeData";
import type { Impact, NewsFilter, Week } from "../types/type";

export function useNewsFilter() {
  const [week, setWeek] = useState<Week>("week1");
  const [filter, setFilter] = useState<NewsFilter>("all");
  const [tradeInNews, setTradeInNews] = useState(true);
  const [impactFilter, setImpactFilter] = useState<Impact | null>(null);

  const filteredData = (() => {
    if (!week) return [];
    let data = ALL_DATA[week] ?? [];

    if (filter === "banned") data = data.filter((r) => !r.tradeable);
    if (filter === "allowed") data = data.filter((r) => r.tradeable);
    if (!tradeInNews) data = data.filter((r) => r.tradeable);
    if (impactFilter) data = data.filter((r) => r.impact === impactFilter);

    return data;
  })();

  return {
    week,
    setWeek,
    filter,
    setFilter,
    tradeInNews,
    setTradeInNews,
    impactFilter,
    setImpactFilter,
    filteredData,
  };
}
