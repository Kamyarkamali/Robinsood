import type { ReactNode } from "react";
import type { ChallengeStatus, ChartUnit, IconColor } from "./type";

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
