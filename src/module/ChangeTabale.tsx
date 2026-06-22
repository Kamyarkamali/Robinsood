import type { FC } from "react";
import type { StateTabale } from "../types/type";
import { t } from "i18next";

const ChangeTabale: FC<StateTabale> = ({ showTabale, setShowTabale }) => {
  return (
    <div
      className="
        w-full max-w-55
        flex items-center
        gap-1
        p-1
        rounded-full
        bg-linear-to-t
        from-[#282828]
        to-[#323232]
        shadow-lg
      "
    >
      <button
        onClick={() => setShowTabale("عددی")}
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
            showTabale === "عددی"
              ? "bg-[#3D3D3D] text-white shadow-md"
              : "text-[#A8A8A8] hover:text-white"
          }
        `}
      >
        {t("changeTabale.tabale1")}
      </button>

      <button
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
              ? "bg-[#3D3D3D] text-white shadow-md"
              : "text-[#A8A8A8] hover:text-white"
          }
        `}
      >
        {t("changeTabale.tabale2")}
      </button>
    </div>
  );
};

export default ChangeTabale;
