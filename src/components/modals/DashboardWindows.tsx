import { Link, useLocation } from "react-router-dom";
import { cards } from "../../data/fakeData";
import type { ComponentState } from "../../types/interfaces";
import { useTranslation } from "react-i18next";

export default function DashboardWindows({
  setActiveComponent,
}: ComponentState) {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  const location = useLocation();

  const handleSetActive = (component: string) => {
    if (typeof setActiveComponent === "function") {
      setActiveComponent(component);
    } else {
      console.warn("setActiveComponent is not a function");
    }
  };

  const isActive = (slug: string) => {
    return location.pathname.includes(slug);
  };

  return (
    <div
      dir="rtl"
      className="
        fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2
        z-5
        px-2
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
          const active = isActive(item.slug);

          return (
            <Link
              to={`/account/${item?.slug}`}
              key={item.id}
              className="relative group shrink-0"
            >
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
                onClick={() => handleSetActive(item.components)}
                className={`
                  relative flex items-center cursor-pointer justify-center
                  w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
                  rounded-xl
                  transition-all duration-200
                  hover:-translate-y-2 hover:scale-110
                  ${
                    active
                      ? "bg-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)] border-2 border-violet-400/50"
                      : "bg-transparent hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  className={`
                    w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6
                    transition-all duration-200
                    ${item.color}
                    ${active ? "scale-110 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" : ""}
                  `}
                />

                {active && (
                  <span
                    className="
                    absolute -bottom-1 left-1/2 -translate-x-1/2
                    w-6 h-1 rounded-full
                    bg-violet-500
                    shadow-[0_0_12px_rgba(139,92,246,0.6)]
                    animate-pulse
                  "
                  />
                )}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
