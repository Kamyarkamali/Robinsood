import { useState } from "react";
import { buttonSection } from "../data/fakeData";
import Button from "./ui/Button";
import { useTranslation } from "react-i18next";

function SectionButtons() {
  const [activeId, setActiveId] = useState<number>(1);
  const { i18n } = useTranslation();

  const active =
    "bg-gradient-to-r from-[#8777FF] to-[#812DFF] text-white shadow-[0_8px_20px_rgba(135,119,255,0.25)]";

  const darkInactive =
    "dark:bg-[#282828] dark:text-white dark:border-transparent dark:shadow-xl";

  const lightInactive = `
    bg-gray-50
    text-gray-700
    border-2
    border-gray-200
    shadow-sm
    hover:shadow-lg
    hover:border-[#8777FF]
    hover:-translate-y-1
    transition-all
    duration-300
  `;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
      {buttonSection.map((items) => {
        const isActive = activeId === items.id;

        return (
          <Button
            key={items.id}
            onClick={() => setActiveId(items.id)}
            hoverVariant="trading"
            className={`cursor-pointer transition-all duration-300 ${
              isActive ? "scale-[1.03]" : "hover:-translate-y-1"
            }`}
            borderRadios="rounded-xl"
            fontBold="font-bold"
            textStyle="text-[16px] sm:text-[18px]"
            bgColor={isActive ? active : lightInactive + " " + darkInactive}
            width="w-full"
            height="h-[60px]"
          >
            <div className="flex flex-col items-center text-center">
              <span
                className={`leading-tight font-bold transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-200"
                }`}
              >
                {i18n.language === "fa" ? items.fa : items.en}
              </span>

              <span
                className={`border-t-3 rounded-2xl w-24 sm:w-32 mt-1 transition-all duration-300 ${
                  isActive
                    ? "border-[#FFCC00] w-28"
                    : "border-gray-200 dark:border-[#D9D9D914] group-hover:border-[#8777FF] group-hover:w-28"
                }`}
              />
            </div>
          </Button>
        );
      })}
    </div>
  );
}

export default SectionButtons;
