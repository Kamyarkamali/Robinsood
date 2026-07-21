import { useMemo, useState } from "react";
import {
  FiEdit2,
  FiCheck,
  FiMoon,
  FiSun,
  FiMonitor,
  FiGlobe,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { avatarData } from "../../data/fakeData";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import i18next from "i18next";
import type { Lang } from "../../types/type";
import { useTranslation } from "react-i18next";

interface ProfileSidbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProfileSidbar({ open }: ProfileSidbarProps) {
  const { user, updateUser } = useUser();
  const { i18n } = useTranslation();
  const { resolvedTheme, setLight, setDark } = useTheme();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const lang = i18next.language;

  const avatarName = useMemo(() => {
    const current = avatarData.find(
      (a) => a.dark === user.avatar || a.light === user.avatar,
    );

    if (current) {
      return i18n.language === "fa" ? current.fa : current.en;
    }
    return null;
  }, [user.avatar, i18n.language]);

  const changeLang = (l: Lang) => {
    i18n.changeLanguage(l);
    localStorage.setItem("lang", l);
  };

  const changeTheme = (theme: "dark" | "light" | "system") => {
    if (theme === "dark") {
      setDark();
    } else if (theme === "light") {
      setLight();
    } else if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemPrefersDark) {
        setDark();
      } else {
        setLight();
      }
      localStorage.setItem("theme", "system");
    }
  };

  const themeOptions = [
    {
      value: "light",
      icon: FiSun,
      label: { fa: "روشن", en: "Light" },
      color: "text-yellow-400",
      activeBg: "bg-yellow-500/20",
      borderColor: "border-yellow-400/50",
      shadowColor: "shadow-yellow-500/30",
    },
    {
      value: "system",
      icon: FiMonitor,
      label: { fa: "سیستم", en: "System" },
      color: "text-purple-400",
      activeBg: "bg-purple-500/20",
      borderColor: "border-purple-400/50",
      shadowColor: "shadow-purple-500/30",
    },
    {
      value: "dark",
      icon: FiMoon,
      label: { fa: "تاریک", en: "Dark" },
      color: "text-indigo-400",
      activeBg: "bg-indigo-500/20",
      borderColor: "border-indigo-400/50",
      shadowColor: "shadow-indigo-500/30",
    },
  ];

  const languageOptions = [
    { value: "fa", label: { fa: "فارسی", en: "Persian" }, flag: "🇮🇷" },
    { value: "en", label: { fa: "انگلیسی", en: "English" }, flag: "🇬🇧" },
  ];

  const getActiveIndex = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "system") {
      return 1;
    }

    if (resolvedTheme === "dark") return 2;
    if (resolvedTheme === "light") return 0;
    return 1;
  };

  const activeIndex = getActiveIndex();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 border-b border-zinc-800/50">
        <motion.div
          className="relative group"
          whileHover={open ? { scale: 1.02 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className={`p-0.5 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500 shadow-lg shadow-cyan-500/20 ${!open ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => {
              if (open) {
                setShowAvatarModal(true);
              }
            }}
          >
            <motion.img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16  rounded-full object-cover"
              whileHover={open ? { scale: 1.05 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>

          <motion.span
            className="absolute bottom-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-zinc-900 shadow-lg shadow-green-500/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.button
            onClick={() => {
              if (open) {
                setShowAvatarModal(true);
              }
            }}
            className={`
              absolute -bottom-1 -right-1 
              p-1.5 rounded-full 
              bg-linear-to-r from-cyan-500 to-blue-500 
              text-white 
              shadow-lg shadow-cyan-500/30
              ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
            whileHover={open ? { scale: 1.2, rotate: 90 } : {}}
            whileTap={open ? { scale: 0.9 } : {}}
            initial={false}
            animate={
              open ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <FiEdit2 size={11} className="sm:w-3.5 sm:h-3.5" />
          </motion.button>
        </motion.div>

        <motion.div
          className={`
            overflow-hidden
            flex flex-col items-center
            ${open ? "opacity-100 w-auto" : "opacity-0 w-0"}
          `}
          animate={
            open ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center gap-1.5"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.span
              className="w-1.5 h-1.5 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <p className="text-[10px] sm:text-[11px] text-green-400 font-medium">
              {lang === "fa" ? "آنلاین" : "Online"}
            </p>
          </motion.div>
          {avatarName && (
            <motion.p
              className="text-[10px] sm:text-[11px] text-cyan-400 font-medium truncate max-w-[120px]"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {avatarName}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className={`w-full ${!open ? "hidden" : ""}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700/30"></div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center justify-between gap-2 mb-3 px-1"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <FiMonitor size={12} className="text-zinc-400" />
                  </motion.div>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 whitespace-nowrap font-medium">
                    {lang === "fa" ? "تم" : "Theme"}
                  </span>
                </div>

                <div className="relative bg-zinc-800/50 rounded-lg p-1 flex gap-1 min-w-[160px] sm:min-w-[180px]">
                  <motion.div
                    key={activeIndex}
                    initial={false}
                    animate={{
                      left: `${activeIndex * 33.33 + 2}%`,
                      width: `calc(33.33% - 4px)`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />

                  {themeOptions.map((theme, index) => {
                    const Icon = theme.icon;
                    const isActive = index === activeIndex;
                    const isHovered = hoveredTheme === theme.value;

                    return (
                      <motion.button
                        key={theme.value}
                        onClick={() =>
                          changeTheme(
                            theme.value as "dark" | "light" | "system",
                          )
                        }
                        onHoverStart={() => setHoveredTheme(theme.value)}
                        onHoverEnd={() => setHoveredTheme(null)}
                        className={`
                          relative z-10 flex items-center justify-center gap-1
                          text-[8px] sm:text-[9px] 
                          px-2 sm:px-3 py-1 rounded-md
                          transition-all duration-200
                          flex-1
                          ${
                            isActive
                              ? `${theme.color} font-medium`
                              : "text-zinc-400 hover:text-zinc-200"
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={12} className="sm:w-3.5 sm:h-3.5" />
                        </motion.div>
                        <span className="hidden xs:inline">
                          {lang === "fa" ? theme.label.fa : theme.label.en}
                        </span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 20,
                            }}
                          >
                            <FiCheck size={8} className={theme.color} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="relative my-1.5 px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700/20"></div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between gap-2 px-1"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiGlobe size={12} className="text-zinc-400" />
                  </motion.div>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 whitespace-nowrap font-medium">
                    {lang === "fa" ? "زبان" : "Language"}
                  </span>
                </div>
                <div className="flex gap-1 bg-zinc-800/30 rounded-lg p-0.5">
                  {languageOptions.map((l) => (
                    <motion.button
                      key={l.value}
                      onClick={() => changeLang(l.value as Lang)}
                      className={`
                        text-[8px] sm:text-[9px] 
                        px-2 sm:px-3 py-0.5 rounded-md
                        transition-all duration-200
                        ${
                          i18next.language === l.value
                            ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/30"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="hidden xs:inline">
                        {lang === "fa" ? l.label.fa : l.label.en}
                      </span>
                      <span className="xs:hidden cursor-pointer">
                        {l.value === "fa" ? "فارسی" : "English"}
                      </span>
                      {i18next.language === l.value && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <FiCheck
                            size={9}
                            className="inline ml-1 text-cyan-400"
                          />
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAvatarModal && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-[95%] sm:w-full max-w-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-zinc-900/95 border border-zinc-800 shadow-2xl shadow-black/50 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-5">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="p-1.5 rounded-full bg-cyan-500/20"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiEdit2 size={14} className="text-cyan-400" />
                  </motion.div>
                  <p className="text-sm sm:text-base font-medium text-white">
                    {lang === "fa" ? "انتخاب آواتار" : "Select Avatar"}
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowAvatarModal(false)}
                  className="text-zinc-400 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded-lg"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              <div className="grid grid-cols-3 xs:grid-cols-4 gap-2.5 sm:gap-3">
                {avatarData.map((item, index) => {
                  const src = resolvedTheme === "dark" ? item.dark : item.light;
                  const isSelected =
                    user.avatar === item.dark || user.avatar === item.light;
                  const displayName = lang === "fa" ? item.fa : item.en;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        updateUser({ avatar: src });
                        setShowAvatarModal(false);
                      }}
                      className={`
                        relative cursor-pointer
                        rounded-xl
                        p-1.5 sm:p-2
                        bg-zinc-800/50
                        border-2 
                        ${isSelected ? "border-cyan-400 shadow-lg shadow-cyan-500/20" : "border-transparent"}
                        transition-all duration-200
                        group
                      `}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <motion.img
                          src={src}
                          className="w-full h-12 sm:h-14 object-cover rounded-lg"
                          alt={displayName}
                          loading="lazy"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <span
                        className={`
                          text-[8px] sm:text-[9px] 
                          block text-center mt-1.5 sm:mt-2 
                          transition-colors duration-200
                          ${isSelected ? "text-cyan-400" : "text-zinc-400 group-hover:text-zinc-200"}
                          font-medium
                        `}
                      >
                        {displayName}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rounded-full border-2 border-zinc-900 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                        >
                          <span className="text-[8px] sm:text-[10px] text-white font-bold">
                            ✓
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
