import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CategoriesModal from "../components/modals/CategoriesModal";
import SettingsModal from "../components/modals/SettingsModal";

const HomeIcon = ({ className }: { className?: string; active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
    <rect
      x="9"
      y="14"
      width="6"
      height="6"
      fill="#f59e0b"
      stroke="#f59e0b"
      strokeWidth="1.5"
      rx="1"
    />
    <rect
      x="4"
      y="8"
      width="16"
      height="10"
      fill="rgba(245, 158, 11, 0.1)"
      stroke="none"
    />
  </svg>
);

const CategoriesIcon = ({
  className,
}: {
  className?: string;
  active?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      fill="#8b5cf6"
      stroke="#8b5cf6"
      rx="1.5"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      fill="#06b6d4"
      stroke="#06b6d4"
      rx="1.5"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      fill="#f472b6"
      stroke="#f472b6"
      rx="1.5"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      fill="#34d399"
      stroke="#34d399"
      rx="1.5"
    />
    <line x1="3" y1="6.5" x2="10" y2="6.5" stroke="white" strokeWidth="1.5" />
    <line x1="6.5" y1="3" x2="6.5" y2="10" stroke="white" strokeWidth="1.5" />
    <line x1="14" y1="6.5" x2="21" y2="6.5" stroke="white" strokeWidth="1.5" />
    <line x1="17.5" y1="3" x2="17.5" y2="10" stroke="white" strokeWidth="1.5" />
    <line x1="3" y1="17.5" x2="10" y2="17.5" stroke="white" strokeWidth="1.5" />
    <line x1="6.5" y1="14" x2="6.5" y2="21" stroke="white" strokeWidth="1.5" />
    <line
      x1="14"
      y1="17.5"
      x2="21"
      y2="17.5"
      stroke="white"
      strokeWidth="1.5"
    />
    <line
      x1="17.5"
      y1="14"
      x2="17.5"
      y2="21"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

const SupportIcon = ({
  className,
}: {
  className?: string;
  active?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" stroke="#ec4899" strokeWidth="2" />
    <circle cx="12" cy="12" r="7" fill="rgba(236, 72, 153, 0.1)" />
    <path d="M9 12a3 3 0 006 0" stroke="#ec4899" strokeWidth="2.5" />
    <rect
      x="7"
      y="11"
      width="2"
      height="4"
      fill="#ec4899"
      stroke="#ec4899"
      rx="1"
    />
    <rect
      x="15"
      y="11"
      width="2"
      height="4"
      fill="#ec4899"
      stroke="#ec4899"
      rx="1"
    />
    <path
      d="M5 15v2a3 3 0 003 3h8a3 3 0 003-3v-2"
      stroke="#ec4899"
      strokeWidth="2"
    />
    <circle cx="8" cy="13" r="0.8" fill="#ec4899" />
    <circle cx="16" cy="13" r="0.8" fill="#ec4899" />
  </svg>
);

const PlatformIcon = ({
  className,
}: {
  className?: string;
  active?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect
      x="3"
      y="10"
      width="3.5"
      height="9"
      fill="#22c55e"
      stroke="#22c55e"
      rx="0.5"
    />
    <line
      x1="4.75"
      y1="6"
      x2="4.75"
      y2="10"
      stroke="#22c55e"
      strokeWidth="2.5"
    />
    <line
      x1="4.75"
      y1="19"
      x2="4.75"
      y2="21"
      stroke="#22c55e"
      strokeWidth="2.5"
    />

    <rect
      x="10.25"
      y="8"
      width="3.5"
      height="7"
      fill="#ef4444"
      stroke="#ef4444"
      rx="0.5"
    />
    <line x1="12" y1="4" x2="12" y2="8" stroke="#ef4444" strokeWidth="2.5" />
    <line x1="12" y1="15" x2="12" y2="19" stroke="#ef4444" strokeWidth="2.5" />

    <rect
      x="17.5"
      y="12"
      width="3"
      height="6"
      fill="#22c55e"
      stroke="#22c55e"
      rx="0.5"
    />
    <line x1="19" y1="9" x2="19" y2="12" stroke="#22c55e" strokeWidth="2.5" />
    <line x1="19" y1="18" x2="19" y2="20" stroke="#22c55e" strokeWidth="2.5" />

    <path
      d="M2 16l4-3 3 2 5-4 3 2 3-3"
      stroke="#8b5cf6"
      strokeWidth="1.5"
      strokeDasharray="3 3"
      opacity="0.5"
    />
  </svg>
);

const SettingsIcon = ({
  className,
}: {
  className?: string;
  active?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="#f59e0b"
      stroke="#f59e0b"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="2.5" fill="white" />

    <path
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
      stroke="#f59e0b"
      strokeWidth="2.5"
    />

    <circle
      cx="12"
      cy="12"
      r="8"
      stroke="rgba(245, 158, 11, 0.2)"
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="12"
      r="5.5"
      stroke="rgba(245, 158, 11, 0.1)"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
  </svg>
);

export default function MobileBottomNav() {
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const navItems = [
    {
      id: "home",
      icon: HomeIcon,
      label: isFa ? "صفحه اصلی" : "Home",
      path: "/",
      component: "home",
    },
    {
      id: "categories",
      icon: CategoriesIcon,
      label: isFa ? "دسته‌بندی‌ها" : "Categories",
      path: "#",
      component: "categories",
    },
    {
      id: "support",
      icon: SupportIcon,
      label: isFa ? "پشتیبانی" : "Support",
      path: "/support",
      component: "support",
    },
    {
      id: "platform",
      icon: PlatformIcon,
      label: isFa ? "پلتفرم ترید" : "Platform Trade",
      path: "/trade",
      component: "platform",
    },
    {
      id: "settings",
      icon: SettingsIcon,
      label: isFa ? "تنظیمات" : "Settings",
      path: "#",
      component: "settings",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "#") return false;
    return location.pathname.includes(path);
  };

  const handleItemClick = (item: (typeof navItems)[0], e: React.MouseEvent) => {
    if (item.id === "categories") {
      e.preventDefault();
      setShowCategories(true);
    } else if (item.id === "settings") {
      e.preventDefault();
      setShowSettings(true);
    }
  };

  return (
    <>
      <div
        dir={isFa ? "rtl" : "ltr"}
        className="
          fixed bottom-5 left-0 right-0
          z-30
          px-3 pt-2 pb-1
          border
          md:hidden
          rounded-2xl
          backdrop-blur-2xl
          border-t border-gray-700/50
          shadow-[0_-20px_60px_rgba(88,28,135,0.15)]
        "
      >
        <div className="relative max-w-md mx-auto">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

          <div className="flex items-center justify-around gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="relative group flex-1"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  <div className="flex flex-col items-center pt-1 pb-0.5">
                    <div
                      className={`
                        relative flex items-center justify-center
                        transition-all duration-300
                        ${active ? "w-12 h-12 -mt-2" : "w-10 h-10"}
                      `}
                    >
                      {active && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
                          <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-pulse" />
                        </>
                      )}

                      <div
                        className={`
                          absolute inset-0 rounded-full
                          transition-all duration-300
                          ${
                            active
                              ? `
                                bg-gradient-to-br from-purple-600/40 to-violet-700/40
                                shadow-[0_0_40px_rgba(139,92,246,0.2)]
                                backdrop-blur-sm
                                border border-white/20
                              `
                              : `
                                bg-white/5
                                backdrop-blur-sm
                                border border-white/5
                                group-hover:bg-white/10
                                group-hover:border-white/15
                              `
                          }
                        `}
                      />

                      <Icon
                        className={`
                          relative z-10
                          transition-all duration-300
                          ${
                            active
                              ? "w-5 h-5 scale-110"
                              : `w-5 h-5 ${isHovered ? "scale-110" : ""}`
                          }
                        `}
                        active={active}
                      />
                    </div>

                    <span
                      className={`
                        text-[10px] font-medium mt-1
                        transition-all duration-200
                        ${
                          active
                            ? "text-purple-200"
                            : isHovered
                              ? "text-purple-300"
                              : "text-white/40"
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {active && (
                      <div
                        className="
                          absolute -bottom-1 left-1/2 -translate-x-1/2
                          w-6 h-6
                          bg-purple-500/30
                          blur-2xl
                          rounded-full
                        "
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <CategoriesModal
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
