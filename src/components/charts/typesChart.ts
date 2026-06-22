export interface CardConfig {
  id: string;
  value: string;
  valueColor: string;
  chartType: "area-green" | "area-orange" | "area-red" | "candlestick";
  data: any[];
  gradientFrom: string;
  gradientTo: string;
  strokeColor: string;
}

export interface AreaDataPoint {
  t: string;
  v: number;
}

export interface CandleDataPoint {
  t: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface DonutAsset {
  name: string;
  value: number;
  color: string;
}

export interface TooltipProps {
  active?: boolean;
  payload?: readonly any[];
  label?: string | undefined;
  lang?: "fa" | "en";
}

export interface AreaTooltipPayload {
  value: number;
}

export interface CandleTooltipPayload {
  payload: CandleDataPoint;
}

export interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cfg: CardConfig | null;
  title: {
    fa: string;
    en: string;
  };
  lang: "fa" | "en";
}
