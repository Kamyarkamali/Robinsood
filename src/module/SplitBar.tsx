function SplitBar({
  winPercent,
  lossPercent,
}: {
  winPercent: number;
  lossPercent: number;
}) {
  return (
    <div className="flex w-full h-3 sm:h-3.5 rounded-full overflow-hidden bg-zinc-800 shrink-0">
      <div className="bg-blue-500 h-full" style={{ width: `${winPercent}%` }} />
      <div className="bg-red-500 h-full" style={{ width: `${lossPercent}%` }} />
    </div>
  );
}

export default SplitBar;
