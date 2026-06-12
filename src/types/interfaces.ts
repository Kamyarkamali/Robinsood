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
  label?: string;
  value?: string;
  type?: "orange" | "blue";
  text?: string;
  val?: string | [];
}

export interface ChallengeCard {
  id: string;
  title: string;
  status: ChallengeStatus;
  iconColor: IconColor;
  chart: ChartData;
  metrics: Metric[];
}
