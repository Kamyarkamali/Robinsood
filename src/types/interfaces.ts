import type { ReactNode } from "react";
import type { ChallengeStatus, IconColor } from "./type";

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
  label: {
    fa: string;
    en: string;
  };

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

export interface ChartData2 {
  id: number;
  title: string;
  days: DayData[];
  averageLine: number;
  plusPercent: number;
  minusPercent: number;
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
  win: number; // 0–100
  profitFactor: number;
  avgWinLoss: number;
  labels: { win: string; profit: string; avg: string };
  isRtl: boolean;
}
