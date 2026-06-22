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
  const labelRadius = radius + strokeWidth / 2 + 18;

  const winAngle = (winPercent / 100) * 360;
  const winMidAngle = -90 + winAngle / 2;
  const loseMidAngle = -90 + winAngle + (360 - winAngle) / 2;

  const getLabelPosition = (angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;

    return {
      x: center + labelRadius * Math.cos(angleRad),
      y: center + labelRadius * Math.sin(angleRad),
    };
  };

  const winPos = getLabelPosition(winMidAngle);
  const losePos = getLabelPosition(loseMidAngle);

  return (
    <div className="relative w-full max-w-[180px] aspect-square">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />

        {/* Win */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray={`${winLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />

        {/* Loss */}
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

        {/* Win Label */}
        <text
          x={winPos.x}
          y={winPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#34d399"
          fontSize={size * 0.08}
          fontWeight="700"
        >
          {Math.round(winPercent)}%
        </text>

        {/* Loss Label */}
        <text
          x={losePos.x}
          y={losePos.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#f87171"
          fontSize={size * 0.08}
          fontWeight="700"
        >
          {Math.round(100 - winPercent)}%
        </text>

        {/* Center Number */}
        <text
          x={center}
          y={center - size * 0.03}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fontSize={size * 0.18}
          fontWeight="700"
          className="dark:fill-white fill-slate-900"
        >
          {winPercent}%
        </text>

        {/* Center Label */}
        <text
          x={center}
          y={center + size * 0.13}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.09}
          fontWeight="500"
          className="dark:fill-white fill-gray-500"
        >
          {t("cart5.wind")}
        </text>
      </svg>
    </div>
  );
}

export default FullDonut;
