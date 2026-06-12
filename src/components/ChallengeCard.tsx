// components/ChallengeCard.tsx
import { BarChart2, TrendingDown, TrendingUp } from "lucide-react";
import type { ChallengeCard } from "../types/interfaces";
import ChallengeChart from "./ChallengeChart";

interface Props {
  card: ChallengeCard;
}

function getIcon(card: ChallengeCard) {
  if (card.status === "inactive" && card.chart.color === "#eab308")
    return <BarChart2 size={20} color="#eab308" />;
  if (card.status === "inactive" && card.chart.color === "#ef4444")
    return <TrendingDown size={20} color="#ef4444" />;
  return <TrendingUp size={20} color="#22c55e" />;
}

export default function ChallengeCardComponent({ card }: Props) {
  return (
    <>
      <div className="flex  w-49.25 border-3 dark:border-[#373737] border-gray-200 h-87.75 flex-col font-lahzeh items-center rounded-[23px] bg-linear-to-t dark:from-[#1e1e1e] dark:to-[#2a2a2a] overflow-hidden">
        <p className="text-white font-semibold text-[15.91px] mt-2.5 mb-1 text-center px-2">
          {card.title}
        </p>

        <div className="w-full flex justify-center items-center border-2 border-b-0 dark:border-[#3B3B3B] border-gray-200 rounded-t-[23px] mt-2 pt-4 dark:bg-linear-to-t dark:from-[#222222] dark:shadow-lg dark:to-[#303030] dark:text-white">
          <ChallengeChart
            current={card.chart.current}
            max={card.chart.max}
            color={card.chart.color}
            glowColor={card.chart.glowColor}
            bgColor={card.chart.bgColor}
            icon={getIcon(card)}
          />
        </div>

        <div className="w-full px-2 border-2 pt-4 text-[13.91px] font-normal flex flex-col gap-2 dark:border-[#3B3B3B] border-gray-200 rounded-t-[23px] flex-1 dark:bg-linear-to-t dark:from-[#222222] shadow-lg dark:to-[#303030] dark:text-white mx-auto text-[#aaa] pb-2 space-y-0.5">
          {card.metrics.map((m, i) =>
            m.type === "orange" ? (
              <p key={i} className="text-orange-400 font-bold text-center">
                {m.text}
              </p>
            ) : m.type === "blue" ? (
              <p key={i} className="text-blue-400 font-bold text-center">
                {m.text}
              </p>
            ) : m.type === "center" ? (
              <p key={i} className="text-white font-bold text-center">
                {m.val}
              </p>
            ) : (
              <div key={i} className="flex justify-center">
                <span>{m.label}</span>
                <span className="text-white font-bold">{m.val}</span>
              </div>
            ),
          )}
        </div>

        <button
          className={`w-full py-1.5 text-[15.91px] font-semibold dark:bg-linear-to-r ${card.status === "active" ? "dark:from-green-900" : "dark:from-red-900"} shadow-lg dark:to-[#282828] dark:text-white h-[49.73px] cursor-default border-t ${
            card.status === "active"
              ? "bg-[#081c08] text-[#34C759] border-t-[#103a10]"
              : "bg-[#1c0808] text-[#FF383C] border-t-[#3a1010]"
          }`}
        >
          <span
            className={`${card.status === "active" ? "text-[#34C759]" : "text-[#FF383C]"}`}
          >
            {card.status === "active" ? "فعال در چالش" : "غیرفعال در چالش"}
          </span>
        </button>
      </div>
    </>
  );
}
