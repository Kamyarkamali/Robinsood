import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { FaFlag } from "react-icons/fa6";
import {
  BsCheckCircleFill,
  BsHourglassSplit,
  BsXCircleFill,
} from "react-icons/bs";

import { fakeChallengeAccounts } from "../data/fakeData";
import i18next from "i18next";

function CardAccounts() {
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
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl xl:text-2xl font-bold text-slate-800 dark:text-white">
          اکانت های من
        </h2>

        <Link
          to="/accounts"
          className="text-cyan-600 dark:text-cyan-400 text-sm xl:text-base hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
        >
          تمامی آیتم ها
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {fakeChallengeAccounts.slice(0, 4).map((account) => {
          // @ts-ignore
          const status = statusConfig[account.cardStatus];

          return (
            <div
              key={account.id}
              className={`
                relative
                overflow-hidden
                rounded-[28px]
                border
                ${status.border}
                bg-white
                dark:bg-[#181F29]
                shadow-[8px_8px_18px_rgba(0,0,0,0.08),-8px_-8px_18px_rgba(255,255,255,0.7),inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
                dark:shadow-[8px_8px_18px_#0d1219,-8px_-8px_18px_#222d38,inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.03)]
                hover:shadow-[10px_10px_22px_rgba(0,0,0,0.1),-10px_-10px_22px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
                dark:hover:shadow-[10px_10px_22px_#0c1118,-10px_-10px_22px_#26313c,inset_1px_1px_2px_rgba(255,255,255,0.06),inset_-1px_-1px_2px_rgba(255,255,255,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
              `}
            >
              <div
                className={`
                  absolute
                  -left-10
                  -top-10
                  w-32
                  h-32
                  rounded-full
                  blur-3xl
                  ${status.glow}
                `}
              />

              <Link
                to={`/accounts/${account.id}`}
                className="relative flex flex-col xl:flex-row h-full"
              >
                <div className="w-full bg-transparent xl:w-36 flex items-center justify-center p-4">
                  <img
                    src={account.icon}
                    alt={lang === "fa" ? account?.title?.fa : account.title?.en}
                    className="w-24 md:w-28 xl:w-32 object-contain"
                  />
                </div>

                <div className="flex-1 p-4 xl:p-5 min-w-0 flex flex-col">
                  <h3 className="text-lg xl:text-xl font-extrabold text-slate-800 dark:text-white truncate">
                    {lang === "fa" ? account?.title?.fa : account.title?.en}
                  </h3>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {/* سرمایه */}
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 mb-2">
                        {lang === "fa" ? "سرمایه" : "Capital"}
                      </p>

                      <h4
                        className={`text-xl xl:text-2xl font-black ${status.text}`}
                      >
                        ${account.capital.toLocaleString()}
                      </h4>
                    </div>

                    {/* مرحله */}
                    <div>
                      <p className="text-[11px] text-center text-slate-500 dark:text-zinc-400 mb-2">
                        {lang === "fa" ? "مرحله" : "Step"}
                      </p>

                      <div
                        className={`
                          h-9
                          xl:h-10
                          rounded-xl
                          border
                          ${status.badge}
                          flex
                          items-center
                          justify-center
                          gap-2
                          text-xs
                          xl:text-sm
                          shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]
                          dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,.35),inset_-2px_-2px_5px_rgba(255,255,255,.06)]
                        `}
                      >
                        <FaFlag />
                        <span>
                          {lang === "fa"
                            ? account?.stageLabel?.fa
                            : account?.stageLabel?.en}
                        </span>
                      </div>
                    </div>

                    {/* وضعیت */}
                    <div>
                      <p className="text-[11px] text-center text-slate-500 dark:text-zinc-400 mb-2">
                        {lang === "fa" ? "وضعیت" : "Status"}
                      </p>

                      <div
                        className={`
                          h-9
                          xl:h-10
                          rounded-xl
                          border
                          ${status.badge}
                          flex
                          items-center
                          justify-center
                          gap-2
                          text-xs
                          xl:text-sm
                          shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]
                          dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,.35),inset_-2px_-2px_5px_rgba(255,255,255,.06)]
                        `}
                      >
                        {status.icon}
                        <span>
                          {lang === "fa"
                            ? account?.cardStatusLabel?.fa
                            : account?.cardStatusLabel?.en}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-5 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
                    <span className="text-slate-400 dark:text-zinc-500 text-sm xl:text-base font-bold">
                      #{account.id}
                    </span>

                    <Link
                      to={`/accounts/${account.id}`}
                      className="
                        h-10
                        w-10
                        xl:h-11
                        xl:w-11
                        rounded-xl
                        border
                        border-slate-200/70
                        dark:border-white/10
                        flex
                        items-center
                        justify-center
                        shadow-[4px_4px_10px_rgba(0,0,0,0.06),-4px_-4px_10px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
                        dark:shadow-[4px_4px_10px_#0c1118,-4px_-4px_10px_#212b35,inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.03)]
                        hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]
                        dark:hover:shadow-[inset_3px_3px_6px_#0c1118,inset_-3px_-3px_6px_#212b35]
                        transition-all
                        duration-300
                        text-slate-700
                        dark:text-white
                      "
                    >
                      <HiOutlineArrowLeft size={18} />
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardAccounts;
