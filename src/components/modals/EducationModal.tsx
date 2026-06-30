import i18next from "i18next";
import demoImage from "../../assets/images/logo.png";
import type { FC } from "react";
import type { EducationModalContentProps } from "../../types/interfaces";

const EducationModalContent: FC<EducationModalContentProps> = ({
  onStartTour,
}) => {
  return (
    <div
      className="
        w-full
        max-w-xl
        mx-auto
        text-center
      "
    >
      <div
        className="
        flex items-center justify-center
          overflow-hidden
          shadow-lg
        "
      >
        <img
          src={demoImage}
          alt="آموزش پنل آنالیز"
          className="
            w-fit
            h-30
            sm:h-56
            md:h-40
            object-cover
          "
        />
      </div>

      <h2
        className="
          mt-6
          text-xl
          sm:text-2xl
          font-bold
          text-zinc-900
          dark:text-white
        "
      >
        {i18next.language === "fa"
          ? "آموزش پنل آنالیز"
          : "Analytics Dashboard Tutorial"}
      </h2>

      <p
        className="
          mt-3
          px-2
          text-sm
          sm:text-base
          leading-7
          text-zinc-500
          dark:text-zinc-400
        "
      >
        {i18next.language === "fa"
          ? "با فعال کردن دکمه زیر پنل به حالت آموزش تغییر پیدا می‌کند"
          : "By activating the button below, the dashboard will switch to tutorial mode"}
      </p>

      <button
        onClick={onStartTour}
        className="
          mt-8
          inline-flex
          items-center
          justify-center
          rounded-2xl
          px-6
          py-3
          text-sm
          sm:text-base
          font-medium
          text-white
          bg-linear-to-r
          from-blue-600
          to-indigo-600
          shadow-lg
          shadow-blue-500/20
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-blue-500/30
          active:scale-95
        "
      >
        {i18next.language === "fa" ? "فعال کردن آموزش" : "Enable Tutorial"}
      </button>
    </div>
  );
};

export default EducationModalContent;
