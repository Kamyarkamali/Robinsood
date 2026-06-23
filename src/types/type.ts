export type ChallengeStatus = "active" | "inactive";
export type IconColor = "yellow" | "red" | "green";
export type ChartUnit = "lot" | "time" | "currency" | "count";
export type Lang = "fa" | "en";

export type Theme = "dark" | "light";
export type ParamKey = "pnl" | "winrate" | "trades" | "rr";
export type DateKey = "dec24" | "nov24" | "oct24" | "q4_24" | "q3_24";

interface DayData {
  d: number;
  m: number;
  p?: number;
  t?: number;
}

export interface CalData {
  mpd: { date: string; pnl: number };
  str: { s: string; e: string; d: number; t: number; w: number; l: number };
  cur: number;
  days: DayData[];
}
export type Period = "daily" | "weekly" | "monthly";

export type StateTabale = {
  showTabale: string;
  setShowTabale: React.Dispatch<React.SetStateAction<string>>;
};

export type ChartType =
  | "area-green"
  | "area-orange"
  | "area-red"
  | "candlestick";

export type Impact = "red" | "yellow" | "blue";
export type Week = "week1" | "week2" | "week3" | "week4";
export type NewsFilter = "all" | "banned" | "allowed";

export type TradeStatus = "active" | "closed" | "planned";
export type TradeDirection = "buy" | "sell";

export type ThemeMode = "dark" | "light";

export type AvatarItem = {
  id: number;
  fa: string;
  en: string;
  dark: string;
  light: string;
};
