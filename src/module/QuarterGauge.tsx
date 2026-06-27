function QuarterGauge({ percent }: { percent: number }) {
  const size = 160;
  const stroke = 12;

  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius;
  const filled = (percent / 100) * circumference;

  const height = size / 2 + stroke;

  return (
    <div className="w-full flex justify-center">
      <svg
        viewBox={`0 0 ${size} ${height}`}
        className="w-full max-w-[140px] sm:max-w-[170px] md:max-w-[190px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${stroke / 2}, ${stroke / 2})`}>
          <path
            d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius * 2} ${radius}`}
            fill="none"
            stroke="#EF4444"
            strokeOpacity="0.25"
            strokeWidth={stroke}
            strokeLinecap="round"
          />

          <path
            d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius * 2} ${radius}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
          />
        </g>

        <text
          x="50%"
          y="75%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs sm:text-sm font-bold fill-current dark:fill-white fill-slate-900"
        >
          {Math.round(percent)}%
        </text>
      </svg>
    </div>
  );
}

export default QuarterGauge;
