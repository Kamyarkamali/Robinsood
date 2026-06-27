import type { ReactNode } from "react";
import type {
  ChallengeStatus,
  ChartType,
  ChartUnit,
  IconColor,
  Impact,
  Lang,
  TradeDirection,
  TradeStatus,
} from "./type";

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  className?: string;
  textStyle: string;
  fontBold: string;
  borderRadios?: string;
  hover?: string;
  gradientBorder?: boolean;
  gradientBorderColor?: string;
  onClick?: () => void;
}

export interface ArrowIconProps {
  size?: number;
  color?: string;
  gap?: string;
}

export interface Props {
  menu: boolean;
  setMenu: (value: boolean) => void;
}

export interface ShowSectionItemsProps {
  activeId: number;
}

export interface AlertCircleIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
  className?: string;
}

export interface Circle {
  color: string;
}

export interface ChartData {
  current: number;
  max: number;
  color: string;
  bgColor: string;
  glowColor?: string;
}

export interface Metric {
  label?: {
    fa: string;
    en: string;
  };
  price?: string;
  color?: string;

  value?: string;
  type?: "orange" | "blue";
  textfa?: string;
  texten?: string;
  val?: string | [];
}

export interface ChallengeCard {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  price?: string;
  status: ChallengeStatus;
  iconColor: IconColor;
  chart: ChartData;
  metrics: Metric[];
}

export interface Propss {
  current: number;
  max: number;
  color: string;
  glowColor: string | undefined;
  bgColor: string;
  icon: React.ReactNode;
}

export interface DayData {
  label: string;
  value: number;
  color: string;
}

export interface ChartDay {
  label: {
    fa: string;
    en: string;
  };
  value: number;
  belowAverage?: boolean;
  isCurrent?: boolean;
}

export interface ChartData2 {
  id: number;
  title: {
    fa: string;
    en: string;
  };
  unit: ChartUnit;
  days: ChartDay[];
  averageLine: number;
  maxAllowedLine: number;
  averageValue: number;
  maxAllowedValue: number;
  requiredDays: number;
  acceptedDays: number;
}

export interface Progres {
  id: "profit" | "tradingDay";
  title: {
    fa: string;
    en: string;
  };
  badgeText: {
    fa: string;
    en: string;
  };
  bestegor?: {
    fa: string;
    en: string;
    value: string;
  };
  badgeType: "success" | "danger";
  currentValue: number;
  targetValue: number;
  currentLabel: {
    fa: string;
    en: string;
  };
  targetLabel: {
    fa: string;
    en: string;
  };
  currentPercent?: number;
  targetPercent?: number;
  unit: "currency" | "day";
}

export interface TraderScoreData {
  gauges: {
    hopeOfSuccess: number;
    greedIndex: number;
    chartUnderstanding: number;
    tradingSystem: number;
  };
  stats: {
    bestSymbol: string;
    bestTrade: number;
    worstTrade: number;
    totalLots: number;
  };
  radar: {
    winPercent: number;
    profitFactor: number;
    avgWinLoss: number;
  };
  totalScore: number;
}

export interface RadarProps {
  win: number;
  profitFactor: number;
  avgWinLoss: number;
  labels: { win: string; profit: string; avg: string };
  isRtl: boolean;
}

export interface ChartSettings {
  averageLineColor: string;
  maxAllowedLineColor: string;
  barColors: {
    belowAverage: string;
    aboveAverage: string;
    aboveMax: string;
  };
  averageLineWidth: number;
  maxAllowedLineWidth: number;
  barOpacity: number;
  gridLineWidth: number;
  showGridLines: boolean;
  showAverageLine: boolean;
  showMaxAllowedLine: boolean;
  showLabels: boolean;
  barBorderRadius: number;
  chartHeight: number;
  fontFamily: string;
}

export const defaultSettings: ChartSettings = {
  averageLineColor: "#43A047",
  maxAllowedLineColor: "#FDD835",
  barColors: {
    belowAverage: "#1E88E5",
    aboveAverage: "#E53935",
    aboveMax: "#FB923C",
  },
  averageLineWidth: 2,
  maxAllowedLineWidth: 2,
  barOpacity: 0.85,
  gridLineWidth: 1,
  showGridLines: true,
  showAverageLine: true,
  showMaxAllowedLine: true,
  showLabels: true,
  barBorderRadius: 6,
  chartHeight: 200,
  fontFamily: "system-ui",
};

export interface AccountStatsProps {
  weeklyProfit: number;
  weeklyLoss: number;
  weeklyRisk: number;
  accountBalance: number;
  accountChange: number;
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  avgWinLoss: number;
  tradeWin: number;
  stabilityScore: number;
  lastDeposit: number;
  initialDeposit: number;
}

export interface WeeklyData {
  day: string;
  profit: number;
  loss: number;
}

export interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: ChartData2;
  title?: string;
}

export interface ProfitFactorData {
  value: number;
  winPercent: number;
  lossPercent: number;
  winLabel: string;
  lossLabel: string;
}

export interface AvgWinLossData {
  value: number;
  winPercent: number;
  lossPercent: number;
  winLabel: string;
  lossLabel: string;
}

export interface TradeWinData {
  percent: number;
  winLabel: string;
  lossLabel: string;
}

export interface AccountTrendData {
  amount: number;
  percentLabel: string;
  balanceStandard: number;
  vsYesterdayPercent: number;
  vsLastTradePercent: number;
}

export interface DisciplineScoreData {
  score: number;
  ranges: { label: string; color: "red" | "orange" | "green" }[];
}

export interface WeeklyReportRow {
  day: {
    fa: string;
    en: string;
  };
  amount: number;
  winPercent: number;
  losePercent: number;
}

export interface TrendUpIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface FullDonutProps {
  winPercent: number;
  size?: number;
  strokeWidth?: number;
}

export interface StatsRow {
  labelFa: string;
  labelEn: string;
  value: string | number;
  valueColor?: "green" | "red";
}

export interface MiddleRow {
  valueFa: string;
  valueEn: string;
  labelFa: string;
  labelEn: string;
  valueColor?: "green" | "red";
}

export interface CapitalRow {
  value: string;
  labelFa: string;
  labelEn: string;
  valueColor?: "green" | "red";
}

export interface TriangleIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export interface CardConfig {
  id: string;
  value: string | number;
  valueColor: string;
  title?: {
    fa: string;
    en: string;
  };
  chartType: ChartType;
  data: {
    t: string;
    v?: number;
    open?: number;
    close?: number;
    high?: number;
    low?: number;
  }[];
  gradientFrom: string;
  gradientTo: string;
  strokeColor: string;
}

export interface DayDatas {
  d: number;
  m: number;
  p?: number;
  t?: number;
}

export interface CalendarMeta {
  mostProfitableDay: {
    date: string;
    pnl: number;
  };
  longestStreak: {
    startDate: string;
    endDate: string;
    days: number;
    trades: number;
    wins: number;
    losses: number;
  };
}

export interface DataPoint {
  date: { fa: string; en: string };
  param1: number;
  param2: number;
}

export interface Parameter {
  id: string;
  label: { fa: string; en: string };
}

// --------------------------------fainal tabale
export interface BilingualText {
  fa: string;
  en: string;
}

export interface NewsItem {
  symbol: string;
  flag: string;
  day: BilingualText;
  time: string;
  news: BilingualText;
  impact: Impact;
  tradeable: boolean;
  status: BilingualText;
}

export interface FilterButtonsProps {
  impactFilter: Impact | null;
  onFilterChange: (impact: Impact | null) => void;
  lang: Lang;
}

export interface BiLabels {
  fa: string;
  en: string;
}

export interface MetricRow {
  id: string;
  label: BiLabels;
  leftValue: number;
  rightValue: number;
  leftBar: number;
  rightBar: number;
}

export interface SummaryCard {
  id: string | number;
  title: BiLabels;
  value: BiLabels;
  buy: BiLabels;
  sell: BiLabels;
  unit: BiLabels;
}

export interface BilingualTexts {
  fa: string;
  en: string;
}

export interface Trade {
  id: number;
  symbol: BilingualText;
  symbolIcon: string;
  direction: TradeDirection;
  status: TradeStatus;
  volume: number;
  sl: number;
  tp: number;
  commission: number;
  profitLoss: number;
  points: number;
  pointBadgeLabel: BilingualText;
}

export interface DonutChartProps {
  active: number;
  closed: number;
  planned: number;
}

export interface SortIconProps {
  col: string;
  sortCol: string;
  sortDir: "asc" | "desc";
}

export interface Session {
  id: string;
  fa: string;
  en: string;
  start: number;
  end: number;
  color: string;
  bg: string;
  border: string;
  dot: string;
  icon: string;
  mapX: number;
  mapY: number;
  barTop: number;
}

export interface NewsEvent {
  id: string;
  fa: string;
  en: string;
  flag: string;
  time: number;
  impact: "High" | "Medium" | "Low";
  pairs: string;
}

export interface ModalTooltipProps {
  data: any;
  index: number;
  position: { x: number; y: number };
  formatValue: (value: number, unit: string) => string;
  unit: string;
  averageLine: number;
  isDark: boolean;
  onClose: () => void;
  modalRef?: React.RefObject<HTMLDivElement>;
  isMobile?: boolean;
}
