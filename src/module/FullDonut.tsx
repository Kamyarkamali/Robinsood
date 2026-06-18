import { t } from "i18next";

interface FullDonutProps {
  winPercent: number;
  size?: number;
  strokeWidth?: number;
}

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
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray={`${winLength} ${circumference}`}
          strokeDashoffset={0}
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
          x={winPos.x}
          y={winPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-emerald-400 text-xs font-bold"
          style={{ fontSize: "11px" }}
        >
          {Math.round(winPercent)}%
        </text>

        <text
          x={losePos.x}
          y={losePos.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-red-400 text-xs font-bold"
          style={{ fontSize: "11px" }}
        >
          {Math.round(100 - winPercent)}%
        </text>

        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-white text-xl font-bold"
        >
          {winPercent}%
        </text>

        <text
          x={center}
          y={center + 18}
          textAnchor="middle"
          dominantBaseline="central"
          className="dark:fill-[#ffffff] fill-gray-500 text-[13px] font-medium dark:text-white "
        >
          {t("cart5.wind")}
        </text>
      </svg>
    </div>
  );
}

export default FullDonut;
