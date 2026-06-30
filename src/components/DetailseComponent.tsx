import { useTranslation } from "react-i18next";
import AlertCircleIcon from "../icons/AlertCircleIcon";
import { useEffect, useState } from "react";

function DetailseComponent() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const { t } = useTranslation();

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full font-lahzeh">
      <div className="flex flex-col items-center justify-center text-center min-w-0 bg-linear-to-t dark:from-[#4340404d] dark:to-purple-[#FDFDFD] w-full lg:w-fit p-2 font-semibold min-h-16 rounded-2xl border-2 dark:border-[#4340404d] border-gray-300">
        <span className="whitespace-normal font-normal wrap-break-word leading-snug dark:text-gray-300 text-[13px] lg:text-[17px] text-gray-800">
          {t("detailes.messege")}
        </span>
      </div>

      <div className="flex  flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full lg:w-auto">
        <button
          className="
           step-test6
            gap-2 w-full sm:flex-1 lg:w-68.5
            rounded-3xl cursor-pointer
            lg:text-[15px] text-[15px] font-bold h-[64.4px]
            flex items-center justify-center
            bg-linear-to-b from-[#E8FFF0] to-[#D7FBE3]
            text-[#15803D]
            border border-[#BBF7D0]

            dark:from-[#4ADE80] dark:to-[#34C759]
            dark:text-white dark:border-transparent

            transition-all duration-300
            hover:scale-[1.02]
          "
        >
          <AlertCircleIcon color={isDark ? "#ffffff" : "gray"} />
          {t("support.request")}
        </button>

        <button
          className="
          step-test7
            gap-2 w-full sm:flex-1 lg:w-68.5
            rounded-3xl cursor-pointer
            lg:text-[15px] text-[15px] font-bold h-[64.4px]
            flex items-center justify-center

            bg-linear-to-b from-[#F3F0FF] to-[#E9E4FF]
            text-[#6D28D9]
            border border-[#D8B4FE]

            dark:from-[#8777FF] dark:to-[#812DFF]
            dark:text-white dark:border-transparent

            transition-all duration-300
            hover:scale-[1.02]
          "
        >
          <AlertCircleIcon color={isDark ? "#ffffff" : "gray"} />

          {t("support.mentor")}
        </button>
      </div>
    </div>
  );
}

export default DetailseComponent;
