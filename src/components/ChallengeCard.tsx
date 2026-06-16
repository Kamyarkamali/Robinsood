import type { ChallengeCard } from "../types/interfaces";
import ChallengeChart from "./ChallengeChart";
import { useTranslation } from "react-i18next";
import { getStatusText } from "../helpers/helperFunc";
import BarIcon from "../icons/BarIcon";
import ChartUpIcon from "../icons/ChartUpIcon";
import StatusIcon from "../icons/StatusIcon";

// react icons
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

interface Props {
  card: ChallengeCard;
}

function getIcon(card: ChallengeCard) {
  if (card.status === "inactive" && card.chart.color === "#eab308")
    return <BarIcon size={28} color="#eab308" />;

  if (card.status === "inactive" && card.chart.color === "#ef4444")
    return <ChartUpIcon size={28} color="#ef4444" />;

  return <StatusIcon size={28} />;
}

export default function ChallengeCardComponent({ card }: Props) {
  const { i18n } = useTranslation();

  return (
    <div
      className="
        flex flex-col
        w-full max-w-50
        h-90
        rounded-[23px]
        overflow-hidden
        border-[3px]
        border-gray-200
        dark:border-[#373737]
        font-lahzeh
        bg-white
        dark:bg-linear-to-t
        dark:from-[#1e1e1e]
        dark:to-[#2a2a2a]
      "
    >
      {/* TITLE */}
      <div className="shrink-0 pt-3 px-2">
        <p className="text-center text-[15px] font-semibold text-gray-600 dark:text-white leading-5 break-words">
          {i18n.language === "fa" ? card.title.fa : card.title.en}
        </p>
      </div>

      {/* CHART */}
      <div className="shrink-0 flex justify-center items-center border-2 border-b-0 border-gray-200 dark:border-[#3B3B3B] rounded-t-[23px] mt-2 pt-3 dark:bg-gradient-to-t dark:from-[#222] dark:to-[#303030]">
        <ChallengeChart
          current={card.chart.current}
          max={card.chart.max}
          color={card.chart.color}
          glowColor={card.chart.glowColor}
          bgColor={card.chart.bgColor}
          icon={getIcon(card)}
        />
      </div>

      {/* METRICS (scrollable if needed) */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          py-2
          flex
          flex-col
          items-center
          gap-2
          text-[13px]
        "
      >
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
            <div key={i} className="flex flex-col items-center gap-1 w-full">
              <span className="text-[#99A1AF] text-center break-words leading-5">
                {i18n.language === "fa" ? m.label.fa : m.label.en}
              </span>

              <span className="text-[#00D3F3] text-[12px] font-bold text-center break-all">
                {m.value}
              </span>
            </div>
          ),
        )}
      </div>

      {/* BUTTON (fixed bottom) */}
      <button
        className={`
          shrink-0
          w-full
          h-13
          text-[15px]
          font-semibold
          border-t
          flex items-center justify-center
          cursor-default
          transition
          ${
            card.status === "active"
              ? "text-[#34C759] border-t-[#103a10] dark:bg-linear-to-r dark:from-green-900 dark:to-[#282828]"
              : "text-[#FF383C] border-t-[#3a1010] dark:bg-linear-to-r dark:from-red-900 dark:to-[#282828]"
          }
        `}
      >
        {card.status === "active" ? (
          <TiTick size={22} />
        ) : (
          <RxCross2 size={22} />
        )}
        {getStatusText(card.status, i18n.language)}
      </button>
    </div>
  );
}
