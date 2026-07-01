type PnlBarProps = {
  value: number;
  maxValue: number;
};

function PnlBar({ value, maxValue }: PnlBarProps) {
  const width = (Math.abs(value) / maxValue) * 100;

  return (
    <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          value >= 0
            ? "bg-linear-to-r from-emerald-500 to-green-400"
            : "bg-linear-to-r from-red-500 to-rose-400"
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default PnlBar;
