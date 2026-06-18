import { disciplineScore } from "../data/fakeData";
import { toPersianDigits } from "../helpers/helperFunc";
import CardShell from "./CardShell";

function DisciplineScoreCard() {
  const colorMap: Record<string, string> = {
    red: "bg-red-500 text-white",
    orange: "bg-orange-400 text-white",
    green: "bg-emerald-500 text-white",
  };

  return (
    <CardShell dir="rtl" className="flex flex-col h-full">
      <h3 className="text-center text-zinc-200 text-sm sm:text-base font-semibold mb-4">
        امتیاز ثبات معامله گری
      </h3>

      <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
        {disciplineScore.ranges.map((r) => (
          <span
            key={r.label}
            className={`text-xs sm:text-sm font-medium rounded-full px-3 py-1.5 ${colorMap[r.color]}`}
          >
            {toPersianDigits(r.label)}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <div className="bg-sky-500 text-white text-[10px] font-semibold rounded-full w-12 h-12 flex flex-col items-center justify-center leading-tight shrink-0">
          <span>امتیاز</span>
          <span>{toPersianDigits(disciplineScore.score)}٪</span>
        </div>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          در نظر گرفتن امتیاز ثبات معامله گری به بهبود عملکرد شما کمک می‌کند.
        </p>
      </div>
    </CardShell>
  );
}

export default DisciplineScoreCard;
