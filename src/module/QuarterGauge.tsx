function QuarterGauge({ percent }: { percent: number }) {
  const size = 170;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius;
  const filled = (percent / 100) * circumference;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${size} ${size / 2 + stroke}`}
      className="max-w-47.5"
    >
      <g transform={`translate(${stroke / 2}, ${stroke / 2})`}>
        <path
          d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius * 2} ${radius}`}
          fill="none"
          stroke="#3f3f46"
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
    </svg>
  );
}

export default QuarterGauge;
