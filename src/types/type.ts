export type ChallengeStatus = "active" | "inactive";
export type IconColor = "yellow" | "red" | "green";
export type ChartUnit = "lot" | "time" | "currency" | "count";
export type Lang = "fa" | "en";

export type Theme = "dark" | "light";
export type ParamKey = "pnl" | "winrate" | "trades" | "rr";
export type DateKey = any;
export type Locale = "fa" | "en";

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

export type ModalType =
  | "support"
  | "mentor"
  | "passAccount"
  | "education"
  | "myacc"
  | null;

export type TradeSide = "buy" | "sell";
export type TradeStatuss = "active" | "closed" | "planned";
export type TradeResult = "profit" | "loss" | "pending";

export type ColKey =
  | "colorBar"
  | "ticket"
  | "registeredAt"
  | "entryAt"
  | "entryPrice"
  | "side"
  | "symbol"
  | "result"
  | "volume"
  | "sl"
  | "tp"
  | "exitPrice"
  | "exitAt"
  | "profitLoss"
  | "commission"
  | "swap"
  | "isNewsTrade"
  | "riskType"
  | "riskAmount"
  | "comment";

export type SortType = "number" | "string" | "date" | "boolean" | "none";

export interface User {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}
export type ChallengeAccountType = "free" | "challenge" | "real";

export type ChallengeStage = "stage1" | "stage2" | "stage3";

export type CardStatus = "passed" | "trading" | "rejected" | "reviewing";

export type TableStatus = "approved" | "rejected" | "reviewing" | "finished";

export type ChallengeIconType =
  | "diamond-green"
  | "diamond-gold"
  | "diamond-red"
  | "rocket";

export interface ChallengeAccount {
  id: string;
  title: { fa: string; en: string };
  accountType: ChallengeAccountType;
  accountTypeLabel: { fa: string; en: string };
  capital: number;
  stage: ChallengeStage;
  stageLabel: { fa: string; en: string };
  cardStatus: CardStatus;
  cardStatusLabel: { fa: string; en: string };
  tableStatus: TableStatus;
  tableStatusLabel: { fa: string; en: string };
  statusReason: { fa: string; en: string };
  startDateJalali: string;
  startTime: string;
  accountNumber: string;
  balance: number;
  icon: ChallengeIconType;
  isActive: boolean;
}

export type TourScope =
  | "news-status"
  | "challenge-info"
  | "today-parameters"
  | "evaluation-parameters"
  | "drawdown-chart"
  | "account-statistics"
  | "calendar-analysis"
  | "home"
  | "challengeModal"
  | "trades"
  | "comparison"
  | "ai-trading";

export interface TourMedia {
  type: "image" | "video" | "none";
  url?: string;
  alt?: string;
}

export interface TourStep {
  id: string;
  scope: TourScope;
  element: string;
  order?: number;
  enabled?: boolean;
  side?: "top" | "bottom" | "left" | "right" | "over";
  title: Record<Lang, string>;
  description: Record<Lang, string>;

  media?: {
    type: "image" | "video";
    src: string;
    poster?: string;
  };
}

export interface TourContentItem {
  fa: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface TourContent {
  [key: string]: TourContentItem;
}
