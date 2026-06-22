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
        h-2 sm:h-2.5 md:h-3 lg:h-5 xl:h-8
        rounded-full
        overflow-hidden
        bg-zinc-800
        shrink-0
      "
    >
      {/* WIN */}
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

      {/* LOSS */}
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
