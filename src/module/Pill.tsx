function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "red";
}) {
  const toneClasses =
    tone === "green"
      ? "bg-emerald-500/15 text-emerald-400"
      : "bg-red-500/15 text-red-400";
  return (
    <span
      className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${toneClasses}`}
    >
      {children}
    </span>
  );
}

export default Pill;
