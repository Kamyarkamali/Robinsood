import type { DonutChartProps } from "../../types/interfaces";

export function DonutChart({ active, closed, planned }: DonutChartProps) {
  const total = active + closed + planned;
  const r = 38;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { value: active, color: "#10b981" },
    { value: closed, color: "#ef4444" },
    { value: planned, color: "#6b7280" },
  ];

  let offset = 0;
  const paths = segments.map((seg, i) => {
    const dash = (seg.value / total) * circumference;
    const gap = circumference - dash;
    const el = (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth="10"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    );
    offset += dash;
    return el;
  });

  return (
    <div className="relative flex items-center gap-4">
      <span className="text-sm font-bold text-gray-400 dark:text-gray-400">
        {closed}
      </span>
      <svg width="90" height="90" viewBox="0 0 100 100">
        {paths}
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="currentColor"
          className="fill-gray-900 dark:fill-white"
        >
          {total}
        </text>
        <text x="50" y="60" textAnchor="middle" fontSize="8" fill="#9ca3af">
          total
        </text>
      </svg>
      <span className="text-sm font-bold text-gray-400 dark:text-gray-400">
        {active}
      </span>
      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-bold text-gray-400">
        {planned}
      </span>
    </div>
  );
}
