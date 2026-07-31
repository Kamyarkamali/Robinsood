import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineChartBar,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from "react-icons/hi";
import i18next from "i18next";
import { HiOutlineWallet } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useNumberFormatter } from "../helpers/numberFormatter";

interface CardData {
  id: number;
  title: {
    fa: string;
    en: string;
  };
  value: number;
  subValue?: number;
  change?: number;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

interface TargetData {
  current: number;
  target: number;
  label: {
    fa: string;
    en: string;
  };
}

const BlinkingNumber = ({
  value,
  className,
  isPositive = true,
  lang,
  formatter,
}: {
  value: string | number;
  className?: string;
  isPositive?: boolean;
  lang: string;
  formatter: any;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const displayValue = useMemo(() => {
    if (typeof value === "number") {
      if (lang === "fa") {
        return formatter.formatWithComma(value);
      } else {
        return formatter.formatWithComma(value);
      }
    }
    return value;
  }, [value, lang, formatter]);

  return (
    <motion.span
      className={`${className} ${isPositive ? "text-white" : "text-rose-400"}`}
      animate={{
        opacity: isVisible ? 1 : 0.4,
        scale: isVisible ? 1 : 0.97,
        textShadow: isVisible
          ? "0 0 20px rgba(6, 182, 212, 0.3)"
          : "0 0 0px rgba(6, 182, 212, 0)",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {displayValue}
    </motion.span>
  );
};

const GlowingCard = ({ children, className = "", delay = 0 }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`group relative overflow-hidden h-full ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      </div>

      {children}
    </motion.div>
  );
};

export default function AtAGlance() {
  const lang = i18next.language;
  const formatter = useNumberFormatter();

  const cardsData: CardData[] = useMemo(
    () => [
      {
        id: 1,
        title: {
          fa: "بالانس",
          en: "Balance",
        },
        value: 12450000,
        subValue: 3450000,
        change: -3.4,
        icon: <HiOutlineWallet className="w-5 h-5 text-cyan-400" />,
      },
      {
        id: 2,
        title: {
          fa: "اکوییتی",
          en: "Equity",
        },
        value: 4280500,
        subValue: 3450000,
        change: 2.4,
        isPositive: true,
        icon: <HiOutlineChartBar className="w-5 h-5 text-indigo-400" />,
      },
    ],
    [],
  );

  const drawdownData = useMemo(
    () => ({
      daily: {
        fa: "درادون روزانه",
        en: "Daily Drawdown",
        value: -2.4,
        max: 5,
        isPositive: false,
      },
      total: {
        fa: "درادون کل",
        en: "Total Drawdown",
        value: -8.7,
        max: 10,
        isPositive: false,
      },
    }),
    [],
  );

  const targetData: TargetData = useMemo(
    () => ({
      current: 65,
      target: 100,
      label: {
        fa: "پیشرفت به سمت هدف",
        en: "Progress to Target",
      },
    }),
    [],
  );

  const getText = (item: { fa: string; en: string }) => {
    return lang === "fa" ? item.fa : item.en;
  };

  const formatNumber = (num: number): string => {
    if (lang === "fa") {
      return formatter.formatWithComma(num);
    } else {
      return formatter.formatWithComma(num);
    }
  };

  const targetPercentage = Math.min(
    (targetData.current / targetData.target) * 100,
    100,
  );
  const remainingPercentage = 100 - targetPercentage;

  return (
    <div className="w-full p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cardsData.map((card, index) => (
          <GlowingCard key={card.id} delay={index * 0.1}>
            <div className="bg-[#38383838] backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20"
                  >
                    {card.icon}
                  </motion.div>
                  <span className="text-xs text-zinc-400 font-medium tracking-wider uppercase">
                    {getText(card.title)}
                  </span>
                </div>
                {card.change !== undefined && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      card.change > 0
                        ? "text-green-400 bg-green-400/10 border border-green-400/20"
                        : "text-red-400 bg-red-400/10 border border-red-400/20"
                    }`}
                  >
                    {card.change > 0 ? "+" : ""}
                    {formatNumber(Math.abs(card.change))}%
                  </motion.span>
                )}
              </div>

              <div className="mt-4 flex-1 flex flex-col justify-end">
                <motion.div className="flex items-center gap-1">
                  <BlinkingNumber
                    value={card.value}
                    className="text-2xl font-bold tracking-wider"
                    isPositive={true}
                    lang={lang}
                    formatter={formatter}
                  />
                  <BlinkingNumber
                    value="+ $"
                    className="text-2xl font-bold tracking-wider"
                    isPositive={true}
                    lang={lang}
                    formatter={formatter}
                  />
                </motion.div>
                {card.subValue !== undefined && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-zinc-400 mt-1.5"
                  >
                    {formatNumber(card.subValue)}
                    {card.subValue > 0 ? "+" : ""}
                  </motion.p>
                )}
              </div>
            </div>
          </GlowingCard>
        ))}
      </div>

      <GlowingCard delay={0.2}>
        <div className="bg-[#38383838] backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-zinc-400 font-medium tracking-wider uppercase">
              {getText(targetData.label)}
            </span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20"
            >
              <span className="text-xs text-cyan-400 font-bold">
                {formatNumber(targetData.current)}%
              </span>
              <span className="text-xs text-zinc-500">/</span>
              <span className="text-xs text-zinc-400">
                {formatNumber(targetData.target)}%
              </span>
            </motion.div>
          </div>

          <div className="relative w-full h-4 bg-zinc-800/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${targetPercentage}%` }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full shadow-lg shadow-cyan-500/20"
            />

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${remainingPercentage}%` }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute top-0 right-0 h-full bg-gradient-to-l from-rose-500 to-red-500 rounded-full"
              style={{ left: `${targetPercentage}%` }}
            />

            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: `${targetPercentage}%` }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${targetPercentage}%` }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/90 shadow-inner" />
                </div>
                <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[8px] font-bold text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded-full border border-cyan-500/30">
                    {lang === "fa" ? "شما" : "You"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex justify-between mt-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
              <span className="text-[10px] text-cyan-400 font-medium">
                {lang === "fa" ? "پیشرفت" : "Progress"} (%{" "}
                {formatNumber(targetData.current)})
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-rose-400 to-red-500" />
              <span className="text-[10px] text-rose-400 font-medium">
                {lang === "fa" ? "باقیمانده" : "Remaining"} (%{" "}
                {formatNumber(remainingPercentage)})
              </span>
            </motion.div>
          </div>
        </div>
      </GlowingCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(drawdownData).map(([key, item], index) => (
          <GlowingCard key={key} delay={0.3 + index * 0.1}>
            <div className="bg-[#38383838] backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:border-rose-500/30 transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium tracking-wider uppercase">
                  {getText(item)}
                </span>
                <motion.div
                  className="flex items-center gap-1.5"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item.value < 0 ? (
                    <HiOutlineArrowDown className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <HiOutlineArrowUp className="w-3.5 h-3.5 text-green-400" />
                  )}
                  <BlinkingNumber
                    value={formatNumber(Math.abs(item.value)) + "%"}
                    className="text-sm font-bold"
                    isPositive={item.value > 0}
                    lang={lang}
                    formatter={formatter}
                  />
                </motion.div>
              </div>

              <div className="mt-3 flex items-center justify-between flex-1">
                <span className="text-[10px] text-zinc-500">
                  {lang === "fa" ? "حداکثر مجاز" : "Max Allowed"}:{" "}
                  {formatNumber(item.max)}%
                </span>
                <div className="w-24 h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(Math.abs(item.value) / item.max) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${
                      item.value < 0
                        ? "bg-gradient-to-r from-rose-500 to-red-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    } shadow-lg ${
                      item.value < 0
                        ? "shadow-rose-500/30"
                        : "shadow-green-500/30"
                    }`}
                  />
                </div>
              </div>
            </div>
          </GlowingCard>
        ))}
      </div>
      <Link
        to={"/account/today-parameters"}
        className={`${lang === "fa" ? "md:text-left" : "md:text-right"} text-center block text-[12px] text-gray-400`}
      >
        {lang === "fa" ? "مشاهده جزئیات بیشتر" : "See All Details"}
      </Link>
    </div>
  );
}
