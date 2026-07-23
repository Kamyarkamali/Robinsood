import { Link } from "react-router-dom";
import { FaFlag } from "react-icons/fa6";
import {
  BsCheckCircleFill,
  BsHourglassSplit,
  BsXCircleFill,
} from "react-icons/bs";

import { fakeChallengeAccounts } from "../data/fakeData";
import i18next from "i18next";
import { useState, useEffect } from "react";
import ChallengeAccountsModal from "./AllAccounts";
import Popover from "../components/saidbar/Popover";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

function CardAccounts() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const displayCount = isMobile ? 1 : 3;
  const [active, setActive] = useState<string | null>("1002025415");

  const statusConfig = {
    passed: {
      border: "border-emerald-500/30 dark:border-emerald-500/30",
      text: "text-emerald-600 dark:text-emerald-400",
      glow: "bg-emerald-500/10 dark:bg-emerald-500/10",
      badge:
        "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400",
      icon: <BsCheckCircleFill />,
    },

    trading: {
      border: "border-orange-500/30 dark:border-orange-500/30",
      text: "text-orange-600 dark:text-orange-400",
      glow: "bg-orange-500/10 dark:bg-orange-500/10",
      badge:
        "border-orange-500/30 bg-orange-50 text-orange-600 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400",
      icon: <BsHourglassSplit />,
    },

    rejected: {
      border: "border-red-500/30 dark:border-red-500/30",
      text: "text-red-600 dark:text-red-400",
      glow: "bg-red-500/10 dark:bg-red-500/10",
      badge:
        "border-red-500/30 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400",
      icon: <BsXCircleFill />,
    },
  };

  const lang = i18next.language;

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center w-full justify-end">
          <Link
            id="home2"
            to="/accounts"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="text-cyan-600 dark:text-cyan-400 text-sm hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            {lang === "fa" ? "سایر اکانت ها" : "Other accounts"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-4">
          {fakeChallengeAccounts.slice(0, displayCount).map((account) => {
            // @ts-ignore
            const status = statusConfig[account.cardStatus];

            return (
              <Popover key={account.id} account={account} lang={lang}>
                <div
                  onClick={() => setActive(account.id)}
                  className={`
                    relative
                    ${active === account.id ? "border-green-400" : status.border}
                    overflow-hidden
                    rounded-2xl
                    border
                    ${account}
                    bg-white
                    dark:bg-[#2B2B2B]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    cursor-pointer
                  `}
                >
                  <div
                    className={`
                      absolute
                      -left-8
                      -top-8
                      w-28
                      h-28
                      rounded-full
                      blur-3xl
                      ${status.glow}
                    `}
                  />

                  <div className="relative flex flex-col xl:flex-row h-full">
                    <div className="w-full bg-transparent xl:w-25 flex items-center justify-center p-3">
                      <img
                        src={account.icon}
                        alt={
                          lang === "fa" ? account?.title?.fa : account.title?.en
                        }
                        className="w-20 md:w-24 xl:w-28 object-contain"
                      />
                    </div>

                    <div className="flex-1 p-3 xl:p-4 min-w-0 flex flex-col">
                      <h3 className="text-base xl:text-md font-extrabold text-slate-800 dark:text-white truncate">
                        {lang === "fa" ? account?.title?.fa : account.title?.en}
                      </h3>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 mb-1.5">
                            {lang === "fa" ? "سرمایه" : "Capital"}
                          </p>

                          <h4
                            className={`text-sm xl:text-md font-black ${status.text}`}
                          >
                            ${account.capital.toLocaleString()}
                          </h4>
                        </div>

                        <div>
                          <p className="text-[10px] text-center text-slate-500 dark:text-zinc-400 mb-1.5">
                            {lang === "fa" ? "مرحله" : "Step"}
                          </p>

                          <div
                            className={`
                              h-8
                              xl:h-9
                              rounded-lg
                              border
                              ${status.badge}
                              flex
                              items-center
                              justify-center
                              gap-1.5
                              text-xs
                              shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                              dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,.35),inset_-2px_-2px_4px_rgba(255,255,255,.06)]
                            `}
                          >
                            <FaFlag className="text-md" />
                            <span className="text-[10px]">
                              {lang === "fa"
                                ? account?.stageLabel?.fa
                                : account?.stageLabel?.en}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] text-center text-slate-500 dark:text-zinc-400 mb-1.5">
                            {lang === "fa" ? "وضعیت" : "Status"}
                          </p>

                          <div
                            className={`
                              h-8
                              xl:h-9
                              rounded-lg
                              border
                              ${status.badge}
                              flex
                              items-center
                              justify-center
                              gap-1.5
                              text-[10px]
                              text-xs
                              shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                              dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,.35),inset_-2px_-2px_4px_rgba(255,255,255,.06)]
                            `}
                          >
                            <span className="text-xs">{status.icon}</span>
                            <span>
                              {lang === "fa"
                                ? account?.cardStatusLabel?.fa
                                : account?.cardStatusLabel?.en}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
                        <span className="text-slate-400 dark:text-zinc-500 text-xs font-bold">
                          #{account.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover>
            );
          })}
        </div>
      </section>

      <ChallengeAccountsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default CardAccounts;
