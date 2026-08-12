import { Link } from "react-router-dom";
import { FaFlag } from "react-icons/fa6";
import {
  BsCheckCircleFill,
  BsHourglassSplit,
  BsXCircleFill,
} from "react-icons/bs";
import { toast } from "react-hot-toast";
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const statusConfig = {
    passed: {
      border: "border-[#D6DCE8] dark:border-emerald-500/30",
      text: "text-[#5B657A] dark:text-zinc-400",
      glow: "bg-emerald-500/10 dark:bg-emerald-500/10",
      badge:
        "border-[#D6DCE8] bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400",
      icon: <BsCheckCircleFill />,
    },

    trading: {
      border: "border-[#D6DCE8] dark:border-orange-500/30",
      text: "text-[#5B657A] dark:text-zinc-400",
      glow: "bg-orange-500/10 dark:bg-orange-500/10",
      badge:
        "border-[#D6DCE8] bg-orange-50 text-orange-600 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400",
      icon: <BsHourglassSplit />,
    },

    rejected: {
      border: "border-[#D6DCE8] dark:border-red-500/30",
      text: "text-[#5B657A] dark:text-zinc-400",
      glow: "bg-red-500/10 dark:bg-red-500/10",
      badge:
        "border-[#D6DCE8] bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400",
      icon: <BsXCircleFill />,
    },
  };

  const lang = i18next.language;

  // تابع کپی کردن
  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // کپی کردن در کلیپ‌بورد
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          setCopiedId(id);
          toast.success(
            lang === "fa" ? `شناسه ${id} کپی شد!` : `ID ${id} copied!`,
            {
              duration: 2000,
              position: "bottom-center",
              style: {
                background: "#333",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "10px",
              },
            },
          );

          setTimeout(() => {
            setCopiedId(null);
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
          fallbackCopy(id);
        });
    } else {
      fallbackCopy(id);
    }
  };

  const fallbackCopy = (id: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = id;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setCopiedId(id);
        toast.success(
          lang === "fa" ? `شناسه ${id} کپی شد!` : `ID ${id} copied!`,
          {
            duration: 2000,
            position: "bottom-center",
            style: {
              background: "#333",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "10px",
            },
          },
        );
        setTimeout(() => {
          setCopiedId(null);
        }, 2000);
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      toast.error(lang === "fa" ? "کپی کردن ناموفق بود" : "Failed to copy", {
        duration: 2000,
        position: "bottom-center",
      });
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-4">
          {fakeChallengeAccounts.slice(0, displayCount).map((account) => {
            // @ts-ignore
            const status = statusConfig[account.cardStatus];
            const isActive = active === account.id;
            const isCopied = copiedId === account.id;

            const cardContent = (
              <div
                onClick={() => setActive(account.id)}
                className={`
                  relative
                  ${isActive ? "border-green-400" : status.border}
                  overflow-hidden
                  rounded-2xl
                  border-2
                  ${account}
                  bg-[#ffffff]
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

                  <div className="flex-1 p-3 xl:p-4 min-w-0 flex flex-col ">
                    <h3 className="text-base xl:text-md font-extrabold text-[#1F2430] dark:text-white truncate text-center">
                      {lang === "fa" ? account?.title?.fa : account.title?.en}
                    </h3>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                      <div>
                        <p className="text-[10px] text-[#5B657A] dark:text-zinc-400 mb-1.5 text-center">
                          {lang === "fa" ? "سرمایه" : "Capital"}
                        </p>

                        <h4
                          className={`text-sm xl:text-md text-center font-black ${status.text}`}
                        >
                          ${account.capital.toLocaleString()}
                        </h4>
                      </div>

                      <div>
                        <p className="text-[10px] text-center text-[#5B657A] dark:text-zinc-400 mb-1.5">
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
                        <p className="text-[10px] text-center text-[#5B657A] dark:text-zinc-400 mb-1.5">
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

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div
                        className="relative group w-full flex items-center justify-center cursor-pointer"
                        onClick={(e) => handleCopyId(account.id, e)}
                        title={
                          lang === "fa" ? "کلیک برای کپی" : "Click to copy"
                        }
                      >
                        <span
                          className={`
                          text-[#5B657A] dark:text-zinc-400 text-xs font-bold text-center w-full
                          transition-all duration-200
                          group-hover:text-cyan-500 dark:group-hover:text-cyan-400
                          ${isCopied ? "text-cyan-500 dark:text-cyan-400" : ""}
                        `}
                        >
                          #{account.id}
                        </span>

                        <svg
                          className={`
                            w-3.5 h-3.5 
                            absolute -right-5
                            opacity-0 group-hover:opacity-100
                            transition-all duration-200
                            text-[#5B657A] dark:text-zinc-400
                            group-hover:text-cyan-500 dark:group-hover:text-cyan-400
                            ${isCopied ? "opacity-100 text-cyan-500 dark:text-cyan-400" : ""}
                          `}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>

                        {isCopied && (
                          <span
                            className="
                            absolute -top-6 left-1/2 -translate-x-1/2
                            text-[8px] font-bold
                            text-cyan-500 dark:text-cyan-400
                            bg-white dark:bg-zinc-800
                            px-2 py-0.5 rounded
                            shadow-lg
                            animate-bounce
                          "
                          >
                            {lang === "fa" ? "کپی شد ✓" : "Copied ✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (isActive) {
              return <div key={account.id}>{cardContent}</div>;
            }

            return (
              <Popover key={account.id} account={account} lang={lang}>
                {cardContent}
              </Popover>
            );
          })}
        </div>
      </section>
      <div className="flex items-center w-full justify-end mt-3">
        <Link
          id="home2"
          to="/accounts"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="text-[#5B657A] dark:text-zinc-400 text-sm hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
        >
          {lang === "fa" ? "سایر اکانت ها" : "Other accounts"}
        </Link>
      </div>

      <ChallengeAccountsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default CardAccounts;
