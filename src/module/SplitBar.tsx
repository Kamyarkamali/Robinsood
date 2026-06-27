type SplitBarProps = {
  winPercent: number;
  lossPercent: number;
  winColor?: string;
  winColorTo?: string;
  winShadow?: string;
  lossColor?: string;
};

function SplitBar({
  winPercent,
  lossPercent,
  winColor = "#2D68FF",
  winColorTo = "#2960eb",
  winShadow = "#2D68FF",
  lossColor = "#ef4444",
}: SplitBarProps) {
  return (
    <div
      className="
        flex w-full
        h-2 sm:h-3 md:h-5
        rounded-full
        overflow-hidden
        bg-zinc-800
        shrink-0
        max-w-70
      "
    >
      <div
        className="
          h-full
          transition-all duration-500 ease-out
        "
        style={{
          width: `${winPercent}%`,
          background: `linear-gradient(to right, ${winColor}, ${winColorTo})`,
          boxShadow: `0 0 10px ${winShadow}`,
        }}
      />

      <div
        className="
          h-full
          transition-all duration-500 ease-out
        "
        style={{
          width: `${lossPercent}%`,
          background: lossColor,
        }}
      />
    </div>
  );
}

export default SplitBar;
