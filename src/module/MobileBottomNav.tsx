import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, LayoutGrid, Headphones, Settings } from "lucide-react";
import { useState } from "react";
import CategoriesModal from "../components/modals/CategoriesModal";
import SettingsModal from "../components/modals/SettingsModal";

const CandlestickIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="10" width="4" height="10" fill="#22c55e" stroke="#22c55e" />
    <line x1="6" y1="6" x2="6" y2="10" stroke="#22c55e" strokeWidth="2" />
    <line x1="6" y1="20" x2="6" y2="22" stroke="#22c55e" strokeWidth="2" />

    <rect x="12" y="8" width="4" height="8" fill="#ef4444" stroke="#ef4444" />
    <line x1="14" y1="4" x2="14" y2="8" stroke="#ef4444" strokeWidth="2" />
    <line x1="14" y1="16" x2="14" y2="20" stroke="#ef4444" strokeWidth="2" />

    <rect x="18" y="12" width="3" height="6" fill="#22c55e" stroke="#22c55e" />
    <line x1="19.5" y1="9" x2="19.5" y2="12" stroke="#22c55e" strokeWidth="2" />
    <line
      x1="19.5"
      y1="18"
      x2="19.5"
      y2="20"
      stroke="#22c55e"
      strokeWidth="2"
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
      icon: Home,
      label: isFa ? "صفحه اصلی" : "Home",
      path: "/",
      component: "home",
    },
    {
      id: "categories",
      icon: LayoutGrid,
      label: isFa ? "دسته‌بندی‌ها" : "Categories",
      path: "#",
      component: "categories",
    },
    {
      id: "support",
      icon: Headphones,
      label: isFa ? "پشتیبانی" : "Support",
      path: "/support",
      component: "support",
    },
    {
      id: "platform",
      icon: CandlestickIcon,
      label: isFa ? "پلتفرم ترید" : "Platform Trade",
      path: "/trade",
      component: "platform",
    },
    {
      id: "settings",
      icon: Settings,
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
          fixed bottom-0 left-0 right-0
          z-50
          px-3 pb-3 pt-2
          md:hidden
          /* ---------- شیشه‌ای با گرادینت بنفش تیره ملایم ---------- */
          bg-gradient-to-br
          from-[#2a1a3a]/80
          via-[#1e1030]/85
          to-[#0d0a1a]/90
          backdrop-blur-2xl
          border-t border-white/10
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
                              ? "w-5 h-5 text-purple-200 scale-110"
                              : `w-5 h-5 ${isHovered ? "text-purple-300 scale-110" : "text-white/50"}`
                          }
                        `}
                        strokeWidth={active ? 2.5 : 2}
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
