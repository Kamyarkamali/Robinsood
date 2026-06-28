import { useTranslation } from "react-i18next";
import { buttonStyles } from "../styles/buttonStyles";
import Button from "./ui/Button";

function WellcomeComponent() {
  const { t, i18n } = useTranslation();
  const { darkInactive, lightInactive } = buttonStyles;

  return (
    <div className="w-full sm:w-auto p-2 rounded-3xl dark:border-[#3a3246] border-gray-300">
      <Button
        hoverVariant="trading"
        borderRadios="rounded-3xl"
        fontBold="font-bold"
        textStyle="text-[14px] sm:text-[16px] md:text-[16px]"
        bgColor={lightInactive + " " + darkInactive}
        width="w-full sm:w-[280px] md:w-[320px] lg:w-[360px]"
        height="h-[80px]"
        className="px-3 cursor-pointer"
      >
        <section
          className={`bg-[#FF5E5E33] p-1 rounded-lg ${i18n.language === "fa" ? "ml-2" : "mr-2"} shrink-0`}
        >
          ❤️
        </section>

        <div className="flex flex-col items-center justify-center text-center min-w-0">
          <span className="whitespace-normal font-medium wrap-break-word leading-snug dark:text-white text-gray-800">
            {t("wellcome.hello")}
          </span>
        </div>
      </Button>
    </div>
  );
}

export default WellcomeComponent;
