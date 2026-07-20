import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  FiChevronDown,
  FiEdit2,
  FiX,
  FiSettings,
  FiHome,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import type { AvatarItem, Lang } from "../types/type";
import { avatarData } from "../data/fakeData";
import i18next from "i18next";
import { useTheme } from "../hooks/useTheme";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import { HiOutlineChartBar } from "react-icons/hi2";

interface UserMenuProps {
  isSidebarOpen?: boolean;
}

export default function UserMenu({ isSidebarOpen = true }: UserMenuProps) {
  const { i18n } = useTranslation();
  const { resolvedTheme, isDark, setLight, setDark } = useTheme();
  const { user, updateUser } = useUser();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const lang = i18next.language;

  const [open, setOpen] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

  const list = useMemo(() => avatarData, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (open) {
        const isClickInsideDropdown = dropdownRef.current?.contains(target);
        const isClickOnButton = buttonRef.current?.contains(target);

        if (!isClickInsideDropdown && !isClickOnButton) {
          setOpen(false);
        }
      }

      if (avatarModal) {
        const isClickInsideModal = modalRef.current?.contains(target);

        if (!isClickInsideModal) {
          setAvatarModal(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, avatarModal]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (avatarModal) setAvatarModal(false);
        else if (open) setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [avatarModal, open]);

  const changeTheme = useCallback(
    (t: "dark" | "light") => {
      if (t === "dark") {
        setDark();
      } else if (t === "light") {
        setLight();
      }
    },
    [setDark, setLight],
  );

  const changeLang = useCallback(
    (l: Lang) => {
      i18n.changeLanguage(l);
      localStorage.setItem("lang", l);
    },
    [i18n],
  );

  const getSrc = useCallback(
    (item: AvatarItem) => (resolvedTheme === "dark" ? item.dark : item.light),
    [resolvedTheme],
  );

  const handleSelectAvatar = useCallback(
    (item: AvatarItem) => {
      const src = getSrc(item);
      updateUser({ avatar: src });
      setAvatarModal(false);
      setOpen(false);
    },
    [getSrc, updateUser],
  );

  const toggleDropdown = useCallback(() => {
    if (isSidebarOpen) {
      setOpen((prev) => !prev);
      if (!open) setAvatarModal(false);
    }
  }, [open, isSidebarOpen]);

  const styles = useMemo(() => {
    const isDark = resolvedTheme === "dark";
    return {
      background: isDark ? "rgba(43, 43, 43, 0.8)" : "rgba(255, 255, 255, 0.9)",
      border: isDark ? "border-white/10" : "border-black/10",
      text: isDark ? "text-white" : "text-gray-800",
      textSecondary: isDark ? "text-white/60" : "text-gray-600",
      dropdownBg: isDark ? "bg-[#2B2B2B2B]" : "bg-white/90 backdrop-blur-xl",
      modalBg: isDark ? "bg-[#2B2B2B2B]" : "bg-white/90 backdrop-blur-xl",
      avatarBorder: isDark ? "bg-[#2B2B2B]" : "bg-white",
      buttonBg: isDark ? "bg-[#2B2B2B2B]" : "bg-white/50",
      hoverBg: isDark ? "hover:bg-white/10" : "hover:bg-black/5",
      inputBg: isDark ? "bg-zinc-800/50" : "bg-gray-100/50",
    };
  }, [resolvedTheme]);

  const ThemeToggle = useMemo(
    () => (
      <div className="flex items-center justify-between gap-2 flex-1">
        <span
          className={`text-[10px] ${styles.textSecondary} whitespace-nowrap`}
        >
          {i18next.language === "fa" ? "تم" : "Theme"}
        </span>

        <div className="relative shrink-0">
          <input
            type="checkbox"
            id="theme-toggle"
            checked={isDark}
            onChange={(e) => changeTheme(e.target.checked ? "dark" : "light")}
            className="opacity-0 absolute -top-full invisible"
          />

          <label
            htmlFor="theme-toggle"
            className={`
            block w-14 h-7 relative rounded-full cursor-pointer
            transition-colors duration-200 ease-in-out
            ${isDark ? "bg-[#303C42]" : "bg-[#ddd]"}
          `}
          >
            <motion.div
              className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-md"
              animate={{ left: isDark ? "31px" : "3px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            <div className="absolute top-[5px] left-[5px] pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="17"
                  fill={isDark ? "#212529" : "#ffc700"}
                />
                {[5, 11, 53, 59].map((y, i) => (
                  <line
                    key={i}
                    x1={i < 2 ? "32" : i === 2 ? "59" : "11"}
                    x2={i < 2 ? "32" : i === 2 ? "53" : "5"}
                    y1={i < 2 ? y : "32"}
                    y2={i < 2 ? (i === 0 ? 11 : 59) : "32"}
                    stroke={isDark ? "#212529" : "#ffc700"}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                ))}
                {[
                  [51.09, 12.91, 46.85, 17.15],
                  [17.15, 46.85, 12.91, 51.09],
                  [51.09, 51.09, 46.85, 46.85],
                  [17.15, 17.15, 12.91, 12.91],
                ].map((coords, i) => (
                  <line
                    key={i + 4}
                    x1={coords[0]}
                    x2={coords[2]}
                    y1={coords[1]}
                    y2={coords[3]}
                    stroke={isDark ? "#212529" : "#ffc700"}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>

            <div className="absolute top-1 right-1 pointer-events-none">
              <svg height="20" width="20" viewBox="0 0 512 512">
                <path
                  d="M343.1,315c-1.8,0.1-3.5,0.1-5.3,0.1c-29.1,0-56.5-11.3-77.1-31.9c-20.6-20.6-31.9-48-31.9-77.1c0-16.6,3.7-32.6,10.6-47.1c3.1-6.4,6.8-12.5,11.1-18.2c-7.6,0.8-14.9,2.4-22,4.6c-46.8,14.8-80.7,58.5-80.7,110.2c0,63.8,51.7,115.5,115.5,115.5c35.3,0,66.8-15.8,88-40.7c4.8-5.7,9.2-11.9,12.8-18.5C357.3,313.6,350.3,314.7,343.1,315z"
                  fill={isDark ? "#ffc700" : "#212529"}
                />
              </svg>
            </div>
          </label>
        </div>
      </div>
    ),
    [isDark, styles, changeTheme],
  );

  return (
    <div className="relative w-full">
      <motion.div
        ref={buttonRef}
        whileHover={{ scale: isSidebarOpen ? 1.02 : 1 }}
        whileTap={{ scale: isSidebarOpen ? 0.98 : 1 }}
        className={`
  flex items-center gap-1.5 sm:gap-2 cursor-pointer
  justify-center
  px-1.5 sm:px-2 py-1 rounded-full
  transition-all duration-200
  backdrop-blur-lg
  w-full  
  ${!isSidebarOpen && "opacity-50 cursor-not-allowed"}
`}
        title={!isSidebarOpen ? "سایدبار را باز کنید" : ""}
      >
        <motion.div
          animate={{
            opacity: 1,
            width: "auto",
            marginLeft: 4,
          }}
          transition={{ duration: 0.25 }}
          className={`
flex
items-center
justify-center
w-full
transition-all
duration-300
${isSidebarOpen ? "flex-row" : "flex-col"}
`}
        >
          {/* صفحه اصلی */}
          <Link
            to="/"
            className={`
flex
items-center
justify-center
rounded-xl
backdrop-blur-xl
${styles.border}
${styles.text}
transition-all
duration-300
cursor-pointer

${
  isSidebarOpen
    ? "px-2.5 py-1.5 gap-1.5 min-w-20.5 text-[9px] lg:text-[10px]"
    : "w-10 h-10 p-0"
}
`}
          >
            <FiHome size={isSidebarOpen ? 13 : 18} />
            <span
              className={`
overflow-hidden
whitespace-nowrap
transition-all
duration-300

${isSidebarOpen ? "opacity-100 max-w-20" : "opacity-0 max-w-0"}
`}
            >
              {lang === "fa" ? "صفحه اصلی" : "Home"}
            </span>
          </Link>

          {/* پلتفرم */}
          <Link
            to="/platform"
            className={`
flex
items-center
justify-center
rounded-xl
${styles.border}
${styles.text}
transition-all
duration-300
cursor-pointer


${
  isSidebarOpen
    ? "px-2.5 py-1.5 gap-1.5 min-w-20.5 text-[9px] lg:text-[10px]"
    : "w-10 h-10 p-0"
}
`}
          >
            <HiOutlineChartBar size={isSidebarOpen ? 13 : 18} />
            <span
              className={`
overflow-hidden
whitespace-nowrap
transition-all
duration-300

${isSidebarOpen ? "opacity-100 max-w-20" : "opacity-0 max-w-0"}
`}
            >
              {lang === "fa" ? "پلتفرم" : "Platform"}
            </span>
          </Link>

          {/* تنظیمات */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDropdown}
            className={`
flex
items-center
justify-center
rounded-xl
backdrop-blur-xl
${styles.border}
${styles.text}
transition-all
duration-300


${
  isSidebarOpen
    ? "py-1.5 gap-0.5 min-w-20.5 text-[9px] lg:text-[10px]"
    : "w-10 h-10 p-0"
}
`}
          >
            <FiSettings size={isSidebarOpen ? 13 : 18} />

            <span
              className={`
overflow-hidden
whitespace-nowrap
transition-all
duration-300

${isSidebarOpen ? "opacity-100 max-w-20" : "opacity-0 max-w-0"}
`}
            >
              {lang === "fa" ? "تنظیمات" : "Settings"}
            </span>

            {isSidebarOpen && (
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown size={12} />
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {open && isSidebarOpen && (
          <motion.div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className={`
          fixed
          left-0
          bottom-10
            right-0
          w-full
          max-w-sm
          rounded-3xl
          ${styles.dropdownBg}
          border ${styles.border}
          backdrop-blur-2xl
          shadow-2xl

        `}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 }}
              className="p-2 sm:p-3 border-b border-white/10"
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`text-[10px] ${styles.textSecondary}`}>
                  {i18next.language === "fa" ? "زبان" : "Language"}
                </p>
                <div className="flex gap-1">
                  {["fa", "en"].map((l) => (
                    <motion.button
                      key={l}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => changeLang(l as Lang)}
                      className={`
                        text-[10px] px-1.5 sm:px-2 cursor-pointer py-0.5 rounded-lg
                        transition-colors duration-150
                        ${
                          i18next.language === l
                            ? resolvedTheme === "dark"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-green-500/10 text-green-600"
                            : styles.textSecondary
                        }
                        relative overflow-hidden
                      `}
                    >
                      {i18next.language === l && (
                        <motion.div
                          layoutId="langActive"
                          className="absolute inset-0 bg-green-500/10 rounded-lg"
                          transition={{ type: "spring", duration: 0.3 }}
                        />
                      )}
                      <span className="relative z-10">{l.toUpperCase()}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-2 sm:p-3 border-b border-white/10"
            >
              {ThemeToggle}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="p-1.5 sm:p-2"
            >
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setAvatarModal(true);
                  setOpen(false);
                }}
                className={`
                  flex items-center gap-1.5
                  text-[10px] sm:text-xs ${styles.text} 
                  w-full justify-center py-1.5 rounded-lg 
                  ${styles.hoverBg} transition-colors duration-150 cursor-pointer
                `}
              >
                <FiEdit2 className="text-[12px] sm:text-[14px]" />
                {i18next.language === "fa" ? "ویرایش آواتار" : "Edit Avatar"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {avatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setAvatarModal(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className={`
                w-[95%] sm:w-full max-w-md
                rounded-2xl sm:rounded-3xl
                p-3 sm:p-4
                ${styles.modalBg}
                border ${styles.border}
                shadow-2xl
                relative
                max-h-[85vh] sm:max-h-[90vh]
                overflow-y-auto
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3 sm:mb-4 sticky top-0 z-10 pb-2">
                <p className={`text-xs sm:text-sm font-medium ${styles.text}`}>
                  {i18next.language === "fa"
                    ? "انتخاب آواتار"
                    : "Select Avatar"}
                </p>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAvatarModal(false)}
                  className={styles.text}
                >
                  <FiX size={18} className="sm:w-5 sm:h-5 cursor-pointer" />
                </motion.button>
              </div>

              <div className="grid grid-cols-3 xs:grid-cols-4 gap-2 sm:gap-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto p-0.5 sm:p-1">
                {list.map((item, index) => {
                  const src = getSrc(item);
                  const isSelected =
                    user.avatar === item.dark || user.avatar === item.light;
                  const displayName =
                    i18n.language === "fa" ? item.fa : item.en;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectAvatar(item)}
                      className={`
                        relative cursor-pointer
                        rounded-lg sm:rounded-xl
                        p-1.5 sm:p-2
                        ${styles.buttonBg}
                        border-2 ${
                          isSelected ? "border-cyan-400" : styles.border
                        }
                        transition-colors duration-150
                        hover:shadow-lg
                        group
                      `}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={src}
                          className="w-full h-12 sm:h-14 object-cover rounded-lg transition-transform duration-200 group-hover:scale-110"
                          alt={displayName}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>

                      <span
                        className={`
                          text-[8px] sm:text-[9px] ${styles.textSecondary} 
                          block text-center mt-1 sm:mt-1.5 
                          transition-colors duration-150 group-hover:${styles.text}
                          font-medium
                        `}
                      >
                        {displayName}
                      </span>

                      {isSelected && (
                        <motion.div
                          layoutId="selectedAvatar"
                          className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rounded-full border-2 border-white flex items-center justify-center"
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
    </div>
  );
}
