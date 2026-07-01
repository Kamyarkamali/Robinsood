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
    <div className="relative flex w-full h-2 sm:h-3 md:h-5 rounded-full overflow-hidden bg-zinc-800 shrink-0 max-w-70">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${winPercent}%`,
          background: `linear-gradient(to right, ${winColor}, ${winColorTo})`,
          boxShadow: `0 0 10px ${winShadow}`,
        }}
      />

      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${lossPercent}%`,
          background: lossColor,
        }}
      />

      {winPercent > 0 && lossPercent > 0 && (
        <div
          className="
        absolute top-0 bottom-0
        w-[3px] rounded-full
        bg-zinc-900/80
        shadow-[0_0_6px_rgba(0,0,0,0.5)]
      "
          style={{
            left: `${winPercent}%`,
            transform: "translateX(-50%)",
          }}
        />
      )}
    </div>
  );
}

export default SplitBar;
