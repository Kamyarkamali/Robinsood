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
  glowColor: string;
  bgColor: string;
  icon: React.ReactNode;
}
