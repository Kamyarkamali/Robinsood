import type { ChallengeCard } from "../types/interfaces";
import ChallengeChart from "./ChallengeChart";
import { useTranslation } from "react-i18next";
import { getStatusText } from "../helpers/helperFunc";
import BarIcon from "../icons/BarIcon";
import ChartUpIcon from "../icons/ChartUpIcon";
import StatusIcon from "../icons/StatusIcon";

import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import React from "react";

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
    <>
      <div
        id={card.id}
        className={`
      flex flex-col
        w-full
        max-w-55
        sm:max-w-60
        md:max-w-65
        lg:max-w-70
        h-93
        rounded-2xl
        overflow-hidden
        border-[3px]
        border-[#E3E7D0]
        dark:border-[#373737]
        font-lahzeh
        bg-[#ffffff]
         dark:bg-linear-to-b
        dark:from-[#353535]
       dark:via-[#2D2D2D]
       dark:to-[#252525]
        transition-all
        duration-300
        hover:shadow-lg
        hover:scale-[1.02]
        hover:bg-[#F5F2FF]
        `}
      >
        <div />

        <div className="shrink-0 pt-3 px-2">
          <p className="text-center text-[15px] font-bold text-[#1F2430] dark:text-white leading-5 wrap-break-word">
            {i18n.language === "fa" ? card.title.fa : card.title.en}
          </p>
        </div>

        <div
          className="shrink-0 flex justify-center items-center border-2 border-b-0 border-[#EDF1F5] dark:border-[#3B3B3B] rounded-t-[23px] mt-2 pt-3  dark:bg-linear-to-b
        dark:from-[#353535]
       dark: via-[#2D2D2D]
       dark: to-[#252525]"
        >
          <ChallengeChart
            current={card.chart.current}
            max={card.chart.max}
            color={card.chart.color}
            glowColor={card.chart.glowColor}
            bgColor={card.chart.bgColor}
            icon={getIcon(card)}
          />
        </div>

        <div className="w-4/5 mx-auto h-px bg-linear-to-r from-transparent border-[#EDF1F5] dark:via-gray-600 to-transparent" />

        <div
          className="
          flex-1
          overflow-hidden
          px-3
          py-2
          flex
          flex-col
          items-center
          gap-1.5
          text-[13px]
        "
        >
          {card.metrics.map((m, i) => {
            const separator = i > 0 && (
              <div className="w-3/4 mx-auto h-px bg-linear-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent" />
            );

            if (m.type === "orange") {
              return (
                <React.Fragment key={i}>
                  {separator}
                  <p className="text-orange-400 font-bold text-center text-sm">
                    {i18n.language === "fa" ? m.textfa : m.texten}
                  </p>
                </React.Fragment>
              );
            }

            if (m.type === "blue") {
              return (
                <React.Fragment key={i}>
                  {separator}
                  <p className="text-blue-400 font-bold text-center text-sm">
                    {i18n.language === "fa" ? m.textfa : m.texten}
                  </p>
                </React.Fragment>
              );
            }

            if (m.type === "center") {
              return (
                <React.Fragment key={i}>
                  {separator}
                  <p className="text-white font-bold text-center text-base">
                    {m.val}
                  </p>
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={i}>
                {separator}
                <div className="flex flex-col items-center gap-0.5 w-full">
                  <span className="dark:text-[#ffffff] text-[#1F2430] font-semibold text-center wrap-break-word leading-5 text-xs">
                    {/* @ts-ignore */}
                    {i18n.language === "fa" ? m.label.fa : m.label.en}
                  </span>
                  <span className="text-[#5B657A] dark:text-[#a59e9e] text-[13px] font-medium text-center break-all">
                    {m.value}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        <button
          className={`
          shrink-0
          w-full
          h-12
          text-[14px]
          font-semibold
          border-t
          flex items-center justify-center
          gap-1.5
          cursor-default
          transition-all
          duration-300
          ${
            card.status === "active"
              ? "text-[#22B36B] dark:text-white bg-[#E6F8EF] dark:bg-no border-t-[#103a10] dark:bg-green-800"
              : "text-[#EE5A5A] dark:text-red-500 bg-[#FDEAEA] dark:bg-no border-t-[#3a1010] dark:bg-[#ee5a5a38]"
          }
        `}
        >
          {card.status === "active" ? (
            <TiTick size={20} className="text-[#22B36B] dark:text-white" />
          ) : (
            <RxCross2 size={20} className="text-[#EE5A5A] dark:text-red-500" />
          )}
          <span>{getStatusText(card.status, i18n.language)}</span>
        </button>
      </div>
    </>
  );
}
