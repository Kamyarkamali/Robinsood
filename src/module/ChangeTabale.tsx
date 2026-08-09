import type { FC } from "react";
import type { StateTabale } from "../types/type";
import { t } from "i18next";

const ChangeTabale: FC<StateTabale> = ({ showTabale, setShowTabale }) => {
  return (
    <div>
      <div className="flex flex-col items-center pr-9 md:flex-row">
        <div
          id="detailse1"
          className="
        w-full max-w-55
        flex items-center
        gap-1
        p-1
        rounded-full
        dark:bg-linear-to-t
        dark:from-[#282828]
        dark:to-[#323232]
        bg-[#EDE9FF]
        shadow-lg
        mt-3
      "
        >
          <button
            id="detailse2"
            onClick={() => setShowTabale("عددی")}
            className={`
          flex-1
          h-9 sm:h-10
          rounded-full
          text-xs sm:text-sm
          font-normal
          cursor-pointer
          transition-all
          duration-300
          ease-out
          hover:scale-[1.02]
          active:scale-[0.98]

          ${
            showTabale === "عددی"
              ? "dark:bg-[#3D3D3D] bg-[#beb8dd] dark:text-white shadow-md"
              : "dark:text-[#A8A8A8]"
          }
        `}
          >
            {t("changeTabale.tabale1")}
          </button>

          <button
            id="detailse3"
            onClick={() => setShowTabale("نمودار")}
            className={`
          flex-1
          h-9 sm:h-10
          rounded-full
          text-xs sm:text-sm
          font-medium
          cursor-pointer
          transition-all
          duration-300
          ease-out
          hover:scale-[1.02]
          active:scale-[0.98]

          ${
            showTabale === "نمودار"
              ? "dark:bg-[#3D3D3D] bg-[#beb8dd] dark:text-white shadow-md"
              : "dark:text-[#A8A8A8]"
          }
        `}
          >
            {t("changeTabale.tabale2")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeTabale;
