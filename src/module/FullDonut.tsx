import { t } from "i18next";
import type { FullDonutProps } from "../types/interfaces";

function FullDonut({
  winPercent,
  size = 140,
  strokeWidth = 12,
}: FullDonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const winLength = (winPercent / 100) * circumference;
  const loseLength = circumference - winLength;

  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative w-full max-w-[140px] sm:max-w-[170px] md:max-w-[190px] aspect-square">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            opacity={0.25}
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            strokeDasharray={`${winLength} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${loseLength} ${circumference}`}
            strokeDashoffset={-winLength}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />

          <text
            x={center}
            y={center - size * 0.03}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.18}
            fontWeight="700"
            className="dark:fill-white fill-slate-900"
          >
            {winPercent}%
          </text>

          <text
            x={center}
            y={center + size * 0.13}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.08}
            fontWeight="500"
            className="dark:fill-gray-300 fill-gray-500"
          >
            {t("cart5.wind")}
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-xs sm:text-sm font-medium text-green-500">
            {Math.round(winPercent)}%
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs sm:text-sm font-medium text-red-500">
            {Math.round(100 - winPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default FullDonut;
