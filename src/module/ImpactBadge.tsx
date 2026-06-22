import type { Impact, Lang } from "../types/type";

interface ImpactBadgeProps {
  impact: Impact;
  lang: Lang;
}

const IMPACT_CONFIG = {
  red: {
    fa: "قرمز",
    en: "High",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.15)",
  },
  yellow: {
    fa: "زرد",
    en: "Medium",
    color: "#eab308",
    bg: "rgba(234,179,8,0.15)",
  },
  blue: {
    fa: "متوسط",
    en: "Low",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.15)",
  },
} as const;

export function ImpactBadge({ impact, lang }: ImpactBadgeProps) {
  const config = IMPACT_CONFIG[impact];

  return (
    <span
      className="inline-flex text-[10px] lg:text-sm items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: config.bg, color: config.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.color }}
      />
      {config[lang]}
    </span>
  );
}
