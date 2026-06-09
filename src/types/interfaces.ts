import type { ReactNode } from "react";

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
