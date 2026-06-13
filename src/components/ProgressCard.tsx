import React from "react";
import type { Progres } from "../types/interfaces";

interface Props {
  data: Progres;
}

const formatValue = (value: number, unit: Progres["unit"]) => {
  if (unit === "currency") return `$${value.toLocaleString("fa-IR")}`;
  return `${value.toLocaleString("fa-IR")} روز`;
};

const ProgressCard: React.FC<Props> = ({ data }) => {
  const fillPercent = Math.round((data.currentValue / data.targetValue) * 100);

  const isSuccess = data.badgeType === "success";

  const gradientClass = isSuccess
    ? "bg-gradient-to-r from-violet-600 to-cyan-400"
    : "bg-gradient-to-r from-red-500 to-orange-400";

  const badgeClass = isSuccess
    ? "bg-green-950 text-green-400 border border-green-800"
    : "bg-red-950 text-red-400 border border-red-900";

  const statValue = (val: number) =>
    data.unit === "currency"
      ? `$${val.toLocaleString("fa-IR")}`
      : val.toLocaleString("fa-IR");

  return (
    <div
      className="rounded-[18px] p-4 flex flex-col gap-4"
      style={{ background: "#252535", direction: "rtl" }}
    >
      <div className="flex items-center justify-end gap-3">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}
        >
          {data.badgeText}
        </span>
        <h3 className="text-white text-lg font-bold whitespace-nowrap">
          {data.title}
        </h3>
      </div>

      <div
        className="flex items-center rounded-full p-1"
        style={{ background: "#333348", height: 52 }}
      >
        <div
          className={`${gradientClass} rounded-full flex items-center justify-center`}
          style={{ width: `${fillPercent}%`, height: 44, minWidth: 80 }}
        >
          <span className="text-white font-bold text-base px-4 whitespace-nowrap">
            {formatValue(data.currentValue, data.unit)}
          </span>
        </div>
        <div className="flex-1 text-center text-[#888] font-medium text-sm">
          {formatValue(data.targetValue, data.unit)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="flex flex-col items-center gap-1">
          <span className="text-white text-xl font-bold">
            {statValue(data.currentValue)}
          </span>
          <span className="text-[#888] text-xs">{data.currentLabel}</span>
          {data.currentPercent !== undefined && (
            <span className="text-[#888] text-xs">
              ({data.currentPercent}٪)
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-white text-xl font-bold">
            {statValue(data.targetValue)}
          </span>
          <span className="text-[#888] text-xs">{data.targetLabel}</span>
          {data.targetPercent !== undefined && (
            <span className="text-[#888] text-xs">({data.targetPercent}٪)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
