import React from "react";
import { translations } from "../../data/fakeData";
import type {
  AreaTooltipPayload,
  CandleTooltipPayload,
  TooltipProps,
} from "./typesChart";
import i18next from "i18next";

export const AreaTooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const lang = i18next.language;
  // @ts-ignore
  const t = translations[lang] || translations.fa;

  if (!active || !payload?.length) return null;

  const typedPayload = payload as AreaTooltipPayload[];

  return (
    <div className="border border-white/10 rounded-xl px-3 py-2 text-xs backdrop-blur-3xl shadow-xl">
      <p className="text-gray-400 mb-1">
        {t?.tooltipDate || "Date"}: {label}
      </p>
      <p className="text-white font-bold">
        {t?.tooltipValue || "Value"}:{" "}
        <span className="text-green-400">{typedPayload[0].value}</span>
      </p>
    </div>
  );
};

export const CandleTooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  label,
  lang,
}) => {
  // @ts-ignore
  const t = translations[lang] || translations.fa;

  if (!active || !payload?.length) return null;

  const typedPayload = payload as CandleTooltipPayload[];
  const d = typedPayload[0].payload;
  const isBull = d.close >= d.open;

  return (
    <div className="border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl space-y-0.5 backdrop-blur-2xl bg-[#1a1a2e]/90">
      <p className="text-gray-400 mb-1">
        {t?.tooltipDate || "Date"}: {label}
      </p>
      <p className="text-white">
        {t?.tooltipOpen || "Open"}:{" "}
        <span className={isBull ? "text-green-400" : "text-red-400"}>
          {d?.open}
        </span>
      </p>
      <p className="text-white">
        {t?.tooltipClose || "Close"}:{" "}
        <span className={isBull ? "text-green-400" : "text-red-400"}>
          {d?.close}
        </span>
      </p>
      <p className="text-white">
        {t?.tooltipHigh || "High"}:{" "}
        <span className="text-gray-300">{d.high}</span>
      </p>
      <p className="text-white">
        {t?.tooltipLow || "Low"}: <span className="text-gray-300">{d.low}</span>
      </p>
    </div>
  );
};

export const DonutTooltip: React.FC<{
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
  lang?: "fa" | "en";
}> = ({ active, payload, lang }) => {
  if (!active || !payload?.length) return null;

  const p = payload[0];
  // @ts-ignore
  const t = translations[lang] || translations.fa;

  return (
    <div className="backdrop-blur-2xl border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p style={{ color: p.payload.color }} className="font-bold">
        {p?.name}
      </p>
      <p className="text-white">
        {t?.tooltipValue || "Value"}: {p?.value}%
      </p>
    </div>
  );
};
