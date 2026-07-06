import { cards } from "../../data/fakeData";
import type { ComponentState } from "../../types/interfaces";
import { useTranslation } from "react-i18next";

export default function DashboardWindows({
  activeComponent,
  setActiveComponent,
}: ComponentState) {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  return (
    <div
      dir="ltr"
      className="
        fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2
        z-50
        w-full px-2
        flex justify-center
      "
    >
      <div
        className="
          flex items-end gap-2 sm:gap-3
          overflow-x-auto sm:overflow-visible
          scrollbar-hide
          max-w-[95vw] sm:max-w-fit

          rounded-2xl
          bg-white/10 dark:bg-black/30
          backdrop-blur-xl
          border border-white/10

          px-2 py-2 sm:px-3
          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        "
      >
        {cards.map((item) => {
          const Icon = item.icon;
          const active = activeComponent === item.components;

          return (
            <div key={item.id} className="relative group shrink-0">
              <div
                className="
                  absolute -top-14 left-1/2 -translate-x-1/2
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200
                  pointer-events-none
                "
              >
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                  {isFa ? item.fa : item.en}
                </div>
              </div>

              <button
                onClick={() => setActiveComponent(item.components)}
                className={`
                  relative flex items-center cursor-pointer justify-center
                  w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
                  rounded-xl
                  transition-all duration-200
                  hover:-translate-y-2 hover:scale-110
                  ${active ? "bg-violet-500/20" : "bg-transparent"}
                `}
              >
                <Icon
                  className={`
                    w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6
                    ${item.color}
                  `}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
