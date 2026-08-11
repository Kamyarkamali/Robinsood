import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Moon,
  Sun,
  Languages,
  User,
  Check,
  ChevronLeft,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme, type Theme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import type { AvatarItem, Lang } from "../../types/type";
import { avatarData } from "../../data/fakeData";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
}: SettingsModalProps) {
  const { i18n } = useTranslation();

  const isFa = i18n.language === "fa";

  const {
    theme,
    resolvedTheme,
    isDark,
    setLight,
    setDark,
    setSystem,
  } = useTheme();

  const { user, updateUser } = useUser();

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  // جلوگیری از Scroll صفحه هنگام باز بودن Modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // تغییر Theme
  const changeTheme = useCallback(
    (selectedTheme: Theme) => {
      if (selectedTheme === "light") {
        setLight();
      } else if (selectedTheme === "dark") {
        setDark();
      } else {
        setSystem();
      }
    },
    [setLight, setDark, setSystem]
  );

  // تغییر زبان
  const changeLang = useCallback(
    (lang: Lang) => {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    },
    [i18n]
  );

  // Avatar متناسب با Theme
  const getSrc = useCallback(
    (item: AvatarItem) => {
      return resolvedTheme === "dark" ? item.dark : item.light;
    },
    [resolvedTheme]
  );

  // انتخاب Avatar
  const handleSelectAvatar = useCallback(
    (item: AvatarItem) => {
      const src = getSrc(item);

      updateUser({
        avatar: src,
      });

      setShowAvatarModal(false);
    },
    [getSrc, updateUser]
  );

  if (!isOpen) return null;

  const themeOptions: {
    id: Theme;
    icon: typeof Sun;
    label: string;
  }[] = [
    {
      id: "light",
      icon: Sun,
      label: isFa ? "روشن" : "Light",
    },
    {
      id: "system",
      icon: Monitor,
      label: isFa ? "سیستم" : "System",
    },
    {
      id: "dark",
      icon: Moon,
      label: isFa ? "تاریک" : "Dark",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="
          fixed inset-0 z-100
          bg-black/60 backdrop-blur-sm
          animate-in fade-in duration-300
        "
        onClick={onClose}
      />

      {/* Settings Modal */}
      <div
        className="
          fixed inset-x-0 bottom-0 z-101
          max-h-[92vh] md:max-h-[85vh]
          rounded-t-3xl md:rounded-3xl
          dark:bg-linear-to-b
          dark:from-[#353535]/95
          dark:to-[#242424]/95
          backdrop-blur-xl
          border border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          dark:shadow-[0_-20px_60px_rgba(0,0,0,0.8)]
          animate-in slide-in-from-bottom duration-400
          md:top-1/2 md:left-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          md:max-w-lg md:w-full
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 px-4 md:px-6 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Close */}
              <button
                onClick={onClose}
                className="
                  p-1.5 rounded-full
                  bg-white/5 hover:bg-white/10
                  transition-all duration-200
                  text-white/60 hover:text-white
                  md:hidden
                "
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-white">
                {isFa ? "تنظیمات" : "Settings"}
              </h2>
            </div>

            {/* Desktop Close */}
            <button
              onClick={onClose}
              className="
                p-2 rounded-xl
                bg-white/5 hover:bg-white/10
                transition-all duration-200
                text-white/60 hover:text-white
                hover:rotate-90
                hidden md:flex
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 pb-6 space-y-4">
          {/* ================= LANGUAGE ================= */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
              <Languages className="w-4 h-4" />

              <span>{isFa ? "زبان" : "Language"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  code: "fa",
                  label: "فارسی",
                },
                {
                  code: "en",
                  label: "English",
                },
              ].map((lang) => {
                const isActive = i18n.language === lang.code;

                return (
                  <button
                    key={lang.code}
                    onClick={() =>
                      changeLang(lang.code as Lang)
                    }
                    className={`
                      relative flex items-center justify-center gap-2
                      p-3 rounded-xl
                      transition-all duration-300

                      ${
                        isActive
                          ? "bg-violet-500/20 border-2 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-sm font-medium
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/60"
                        }
                      `}
                    >
                      {lang.label}
                    </span>

                    {isActive && (
                      <div
                        className="
                          absolute -top-1 -right-1
                          w-5 h-5
                          bg-violet-500
                          rounded-full
                          flex items-center justify-center
                        "
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= THEME ================= */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
              {isDark ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}

              <span>{isFa ? "تم" : "Theme"}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((themeOption) => {
                const Icon = themeOption.icon;

                // مهم‌ترین قسمت:
                // مستقیماً state هوک را بررسی می‌کنیم
                const isActive = theme === themeOption.id;

                return (
                  <button
                    key={themeOption.id}
                    onClick={() =>
                      changeTheme(themeOption.id)
                    }
                    className={`
                      relative flex items-center justify-center gap-1.5
                      p-3 rounded-xl
                      transition-all duration-300

                      ${
                        isActive
                          ? "bg-violet-500/20 border-2 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        w-4 h-4
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/40"
                        }
                      `}
                    />

                    <span
                      className={`
                        text-[11px] font-medium
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/60"
                        }
                      `}
                    >
                      {themeOption.label}
                    </span>

                    {isActive && (
                      <div
                        className="
                          absolute -top-1 -right-1
                          w-5 h-5
                          bg-violet-500
                          rounded-full
                          flex items-center justify-center
                        "
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* نمایش وضعیت واقعی سیستم */}
            {theme === "system" && (
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Monitor className="w-3.5 h-3.5 text-white/40" />

                <span className="text-[10px] text-white/40">
                  {isFa
                    ? `تم سیستم: ${
                        resolvedTheme === "dark"
                          ? "تاریک"
                          : "روشن"
                      }`
                    : `System theme: ${
                        resolvedTheme === "dark"
                          ? "Dark"
                          : "Light"
                      }`}
                </span>
              </div>
            )}
          </div>

          {/* ================= AVATAR ================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
                <User className="w-4 h-4" />

                <span>
                  {isFa ? "آواتار" : "Avatar"}
                </span>
              </div>

              <button
                onClick={() => setShowAvatarModal(true)}
                className="
                  text-xs
                  text-violet-400
                  hover:text-violet-300
                  transition-colors duration-200
                  flex items-center gap-1
                "
              >
                {isFa ? "تغییر" : "Change"}
              </button>
            </div>

            <div
              className="
                flex items-center gap-4
                p-3 rounded-xl
                bg-white/5
                border border-white/10
              "
            >
              <div
                className="
                  w-14 h-14
                  rounded-full
                  overflow-hidden
                  border-2 border-violet-500/30
                "
              >
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="text-sm text-white font-medium">
                  {isFa ? "آواتار شما" : "Your Avatar"}
                </p>

                <p className="text-xs text-white/40">
                  {isFa
                    ? "برای تغییر کلیک کنید"
                    : "Click to change"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= AVATAR MODAL ================= */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-102
              flex items-center justify-center
              bg-black/80 backdrop-blur-md
              p-4
            "
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 20,
              }}
              className="
                w-full max-w-md
                rounded-2xl
                bg-linear-to-b
                from-gray-900/95
                to-black/95
                backdrop-blur-xl
                border border-white/10
                shadow-2xl
                overflow-hidden
                max-h-[90vh]
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Avatar Modal Header */}
              <div
                className="
                  sticky top-0 z-10
                  px-4 pt-4 pb-3
                  bg-linear-to-b
                  from-gray-900/95
                  to-transparent
                "
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    {isFa
                      ? "انتخاب آواتار"
                      : "Select Avatar"}
                  </h3>

                  <button
                    onClick={() =>
                      setShowAvatarModal(false)
                    }
                    className="
                      p-2 rounded-xl
                      bg-white/5
                      hover:bg-white/10
                      transition-all duration-200
                      text-white/60
                      hover:text-white
                      hover:rotate-90
                    "
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Avatar List */}
              <div className="px-4 pb-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {avatarData.map((item, index) => {
                    const src = getSrc(item);

                    const isSelected =
                      user.avatar === item.dark ||
                      user.avatar === item.light;

                    const displayName = isFa
                      ? item.fa
                      : item.en;

                    const isHovered =
                      hoveredAvatar === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: index * 0.03,
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -5,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          handleSelectAvatar(item)
                        }
                        onMouseEnter={() =>
                          setHoveredAvatar(item.id)
                        }
                        onMouseLeave={() =>
                          setHoveredAvatar(null)
                        }
                        className="
                          relative cursor-pointer
                          rounded-xl
                          bg-white/5
                          border-2
                          transition-all duration-300
                          overflow-hidden
                          group
                        "
                        style={{
                          borderColor: isSelected
                            ? "rgba(139, 92, 246, 0.6)"
                            : isHovered
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="relative aspect-square">
                          <img
                            src={src}
                            alt={displayName}
                            className="
                              w-full h-full
                              object-cover
                              transition-transform
                              duration-300
                              group-hover:scale-110
                            "
                          />

                          {/* Hover Gradient */}
                          <div
                            className="
                              absolute inset-0
                              bg-linear-to-t
                              from-black/70
                              via-transparent
                              to-transparent
                              opacity-0
                              group-hover:opacity-100
                              transition-opacity
                              duration-300
                            "
                          />

                          {/* Selected */}
                          {isSelected && (
                            <div
                              className="
                                absolute top-2 right-2
                                w-6 h-6
                                bg-violet-500
                                rounded-full
                                flex items-center justify-center
                                shadow-[0_0_20px_rgba(139,92,246,0.4)]
                              "
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}

                          {/* Name */}
                          <div
                            className="
                              absolute
                              bottom-0 left-0 right-0
                              p-2
                              bg-linear-to-t
                              from-black/80
                              to-transparent
                              opacity-0
                              group-hover:opacity-100
                              transition-opacity
                              duration-300
                            "
                          >
                            <p
                              className="
                                text-xs
                                text-white
                                text-center
                                font-medium
                              "
                            >
                              {displayName}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}