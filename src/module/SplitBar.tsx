import type { SplitBarProps } from "../types/interfaces";

function SplitBar({
  winPercent,
  lossPercent,
  winColor = "#2D68FF",
  winColorTo = "#2960eb",
  winShadow = "#2D68FF",
  lossColor = "#ef4444",
}: SplitBarProps) {
  return (
    <div className="relative flex w-full h-2 sm:h-2 md:h-3 rounded-full overflow-hidden bg-zinc-800 shrink-0 max-w-95">
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
        w-0.75 rounded-full
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
