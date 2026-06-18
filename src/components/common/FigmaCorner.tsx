function FigmaCorner() {
  return (
    <>
      <div
        className="absolute top-0 right-0 w-28 h-33 bg-[#303030]"
        style={{
          clipPath: "path('M112 0 H112 V112 H52 Q0 112 0 60 V0 Z')",
        }}
      />

      <div
        className="absolute top-0 right-0 w-28 h-28 border-t border-r border-slate-600/40 pointer-events-none"
        style={{
          clipPath: "path('M112 0 H112 V112 H52 Q0 112 0 60 V0 Z')",
        }}
      />

      <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
    </>
  );
}

export default FigmaCorner;
