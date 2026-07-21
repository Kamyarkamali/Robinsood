// MobileBottomNav.tsx
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  LayoutGrid,
  Headphones,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useState } from "react";
import CategoriesModal from "../components/modals/CategoriesModal";
import SettingsModal from "../components/modals/SettingsModal";

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
      icon: TrendingUp,
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
          px-2 pb-2 pt-1
          bg-gray-700
          bg-linear-to-b
from-[#353535]/95
to-[#242424]/95
backdrop-blur-xl
border border-white/10
shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          md:hidden
        "
      >
        <div className="relative max-w-md mx-auto">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

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
                          <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
                          <div className="absolute inset-0 rounded-full bg-violet-500/10 animate-pulse" />
                        </>
                      )}

                      <div
                        className={`
                          absolute inset-0 rounded-full
                          transition-all duration-300
                          ${
                            active
                              ? "bg-linear-to-br from-violet-600 to-purple-600 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                              : "bg-white/5 group-hover:bg-white/10"
                          }
                        `}
                      />

                      <Icon
                        className={`
                          relative z-10
                          transition-all duration-300
                          ${
                            active
                              ? "w-5 h-5 text-white scale-110"
                              : `w-5 h-5 ${isHovered ? "text-violet-400 scale-110" : "text-white/60"}`
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
                            ? "text-white"
                            : isHovered
                              ? "text-violet-400"
                              : "text-white/40"
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {active && (
                      <div
                        className="
                          absolute -top-0.5 left-1/2 -translate-x-1/2
                          w-8 h-8
                          bg-violet-500/20
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
