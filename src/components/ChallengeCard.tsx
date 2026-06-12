// components/ChallengeCard.tsx
import { BarChart2, TrendingDown, TrendingUp } from "lucide-react";
import type { ChallengeCard } from "../types/interfaces";
import ChallengeChart from "./ChallengeChart";
import { useTranslation } from "react-i18next";
import { getStatusText } from "../helpers/helperFunc";
import BarIcon from "../icons/BarIcon";
import ChartUpIcon from "../icons/ChartUpIcon";
import StatusIcon from "../icons/StatusIcon";

interface Props {
  card: ChallengeCard;
}

function getIcon(card: ChallengeCard) {
  if (card.status === "inactive" && card.chart.color === "#eab308")
    return <BarIcon size={30} color="#eab308" />;
  if (card.status === "inactive" && card.chart.color === "#ef4444")
    return <ChartUpIcon size={30} color="#ef4444" />;
  return <StatusIcon size={30} />;
}

export default function ChallengeCardComponent({ card }: Props) {
  const { i18n } = useTranslation();

  return (
    <>
      <div className="flex  w-49.25 border-3 dark:border-[#373737] border-gray-200 h-87.75 flex-col font-lahzeh items-center rounded-[23px] bg-linear-to-t dark:from-[#1e1e1e] dark:to-[#2a2a2a] overflow-hidden">
        <p className="text-white font-semibold text-[15.91px] mt-2.5 mb-1 text-center px-2">
          {i18n.language === "fa" ? card.title.fa : card.title.en}
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

        <div className="w-full px-2 border-2 text-[13.91px] text-center font-normal flex items-center justify-center flex-col gap-2 dark:border-[#3B3B3B] border-gray-200 rounded-t-[23px] flex-1 dark:bg-linear-to-t dark:from-[#222222] dark:shadow-lg dark:to-[#303030] dark:text-white mx-auto text-[#aaa] pb-2 space-y-0.5">
          {card.metrics.map((m, i) =>
            m.type === "orange" ? (
              <p key={i} className="text-orange-400 font-bold text-center">
                {i18n.language === "fa" ? m.textfa : m.texten}
              </p>
            ) : m.type === "blue" ? (
              <p key={i} className="text-blue-400 font-bold text-center">
                {i18n.language === "fa" ? m.textfa : m.texten}
              </p>
            ) : m.type === "center" ? (
              <p key={i} className="text-white font-bold text-center">
                {m.val}
              </p>
            ) : (
              <div
                key={i}
                className="flex justify-center flex-col items-center"
              >
                {i18n.language === "fa" ? m.label.fa : m.label.en}

                <span className="dark:text-white flex items-center justify-center text-[12px] font-bold">
                  {m?.value}
                </span>
              </div>
            ),
          )}
        </div>

        <button
          className={`w-full py-1.5 text-[15.91px] border-t-0 font-semibold dark:bg-linear-to-r ${card.status === "active" ? "dark:from-green-900" : "dark:from-red-900"} shadow-lg dark:to-[#282828] dark:text-white h-[49.73px] cursor-default border-t ${
            card.status === "active"
              ? " text-[#34C759] border-t-[#103a10]"
              : " text-[#FF383C] border-t-[#3a1010]"
          }`}
        >
          <span
            className={` ${card.status === "active" ? "text-[#34C759]" : "text-[#FF383C]"}`}
          >
            {getStatusText(card.status, i18n.language)}
          </span>
        </button>
      </div>
    </>
  );
}
