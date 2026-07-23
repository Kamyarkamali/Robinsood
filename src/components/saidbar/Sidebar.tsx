import { useMemo, useState, useEffect, useCallback, memo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import i18next from "i18next";

import BtnSaidbar from "../ui/BtnSaidbar";
import ProfileSidbar from "./ProfileSidbar";
import type { ModalType } from "../../types/type";
import PassAccountModalContent from "../modals/PassModal";
import SupportModalContent from "../modals/SupportModal";
import MentorModal from "../modals/MentorModal";
import EducationModalContent from "../modals/EducationModal";
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineWebAsset } from "react-icons/md";
import { RiAppsLine } from "react-icons/ri";
import Modal from "./ModalComponent";
import {
  HiOutlineAcademicCap,
  HiOutlineChatBubbleLeftRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineHome,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import ChallengeAccountsModal from "../../pages/AllAccounts";
import NotificationsModal from "../modals/NotificationsModal";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";
import { avatarData } from "../../data/fakeData";

const MemoizedProfileSidbar = memo(ProfileSidbar);
const MemoizedModal = memo(Modal);

const Divider = () => (
  <div className="relative my-2">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-zinc-700 p-1"></div>
    </div>
  </div>
);

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debounced;
}

type ExtendedModalType = ModalType | "notifications";

export default function Sidebar() {
  const { user, updateUser } = useUser();
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ExtendedModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);

  const lang = i18next.language;

  const handleCloseModal = useCallback(() => {
    setModalType(null);
  }, []);

  const cards = useMemo(
    () => [
      {
        type: "passAccount" as const,
        step: "step-pass-account",
        component: <PassAccountModalContent />,
        icon: HiOutlineShieldCheck,
        title: {
          fa: "درخواست پاسی حساب",
          en: "Pass Account Request",
        },
      },
      {
        type: "support" as const,
        step: "step-support",
        component: <SupportModalContent />,
        icon: HiOutlineChatBubbleLeftRight,
        title: {
          fa: "درخواست پشتیبانی",
          en: "Support Request",
        },
      },
      {
        type: "mentor" as const,
        step: "step-mentor",
        component: <MentorModal />,
        icon: HiOutlineUserGroup,
        title: {
          fa: "درخواست منتور و تراپیست",
          en: "Mentor & Therapist Request",
        },
      },
      {
        type: "education" as const,
        step: "step-education",
        component: <EducationModalContent onClose={handleCloseModal} />,
        icon: HiOutlineAcademicCap,
        title: {
          fa: "آموزش و راهنما صفحه اصلی",
          en: "Education & Guide",
        },
      },
      {
        type: "notifications" as const,
        step: "step-notifications",
        component: <NotificationsModal onClose={handleCloseModal} />,
        icon: HiOutlineBell,
        title: {
          fa: "اعلان ها",
          en: "Notifications",
        },
      },
    ],
    [handleCloseModal],
  );

  const currentCard = useMemo(
    () => cards.find((card) => card.type === modalType),
    [cards, modalType],
  );

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleOpenMobile = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const handleSetModalType = useCallback((type: ExtendedModalType) => {
    setModalType(type);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleOpenNotifications = useCallback(() => {
    handleSetModalType("notifications");
    setNotificationCount(0);
  }, []);

  const handleAvatarClick = useCallback(() => {
    setShowAvatarModal(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
      }
    };

    const debouncedCheck = debounce(checkMobile, 150);
    checkMobile();
    window.addEventListener("resize", debouncedCheck);
    return () => {
      window.removeEventListener("resize", debouncedCheck);
      debouncedCheck.cancel();
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen || !isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("aside") && !target.closest("button")) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, isMobile]);

  useEffect(() => {
    if (mobileOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen, isMobile]);

  const modalNode = useMemo(
    () => (
      <div className="z-9999">
        <MemoizedModal open={modalType !== null} onClose={handleCloseModal}>
          {currentCard && (
            <div className={currentCard.step}>{currentCard.component}</div>
          )}
        </MemoizedModal>
      </div>
    ),
    [modalType, currentCard, handleCloseModal],
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-2xl border-b border-white/5 px-4 py-3 shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAvatarClick}
            >
              <div className="p-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-zinc-900"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-900 shadow-lg shadow-green-500/30" />

              {/* آیکون ویرایش کوچک */}
              <motion.div
                className="absolute -bottom-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-0.5 border border-zinc-900"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* وسط - لوگو و نام سایت */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-lg shadow-purple-500/30">
                  <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center overflow-hidden">
                    <Link className="cursor-pointer" to={"/"}>
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-7 h-7 object-contain"
                      />
                    </Link>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(139, 92, 246, 0)",
                      "0 0 20px rgba(139, 92, 246, 0.3)",
                      "0 0 0px rgba(139, 92, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div className="flex flex-col">
                <motion.span
                  className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  {lang === "fa" ? "رابین سود" : "RobinSood"}
                </motion.span>
                <span className="text-[8px] text-white/30 tracking-widest uppercase">
                  {lang === "fa" ? "پلتفرم ترید" : "Trading Platform"}
                </span>
              </div>
            </motion.div>

            {/* سمت راست - نوتیفیکیشن + منو */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleOpenNotifications}
                className="relative p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-200"
                aria-label="Notifications"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiOutlineBell size={20} className="text-white/70" />
                {notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-[9px] font-bold text-white shadow-lg shadow-red-500/30"
                  >
                    {notificationCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                onClick={handleOpenMobile}
                className="p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all duration-200"
                aria-label="Open menu"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMenu size={20} className="text-white/70" />
              </motion.button>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            animate={{
              background: [
                "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
                "linear-gradient(90deg, transparent, #06b6d4, transparent)",
                "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="h-[72px]" />

        {/* مودال ویرایش آواتار برای موبایل */}
        <AnimatePresence>
          {showAvatarModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
                onClick={() => setShowAvatarModal(false)}
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 z-50 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full max-w-md rounded-2xl p-5 bg-zinc-900/95 border border-zinc-800 shadow-2xl shadow-black/50 max-h-[85vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="p-1.5 rounded-full bg-cyan-500/20"
                        whileHover={{ rotate: 180 }}
                      >
                        <svg
                          className="w-4 h-4 text-cyan-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </motion.div>
                      <p className="text-sm font-medium text-white">
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

                  <div className="grid grid-cols-4 gap-2.5">
                    {avatarData.map((item, index) => {
                      const src =
                        resolvedTheme === "dark" ? item.dark : item.light;
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
                            p-1
                            border-2 
                            ${isSelected ? "border-cyan-400 shadow-lg shadow-cyan-500/20" : "border-transparent"}
                            transition-all duration-200
                            group
                          `}
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={src}
                              className="w-full object-cover rounded-lg"
                              alt={displayName}
                              loading="lazy"
                            />
                          </div>
                          <span
                            className={`text-[8px] block text-center mt-1 transition-colors duration-200 ${isSelected ? "text-cyan-400" : "text-zinc-400 group-hover:text-zinc-200"} font-medium`}
                          >
                            {displayName}
                          </span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-zinc-900 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                            >
                              <span className="text-[8px] text-white font-bold">
                                ✓
                              </span>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* منوی موبایل */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={handleCloseMobile}
            aria-hidden="true"
          />
        )}

        <aside
          className={`
            fixed top-0 left-0 z-50
            w-80 h-full
            dark:bg-zinc-900 bg-white
            p-4 pt-16
            dark:text-white text-gray-800
            border-r border-zinc-800
            flex flex-col
            transition-transform duration-300 ease-in-out
            [will-change:transform]
            [contain:layout_style]
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          role="navigation"
          aria-label="Sidebar navigation"
        >
          <button
            onClick={handleCloseMobile}
            className="absolute cursor-pointer top-4 right-4 p-2 rounded-xl hover:bg-zinc-800/20 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>

          <MemoizedProfileSidbar open={true} setOpen={handleToggleSidebar} />

          <nav className="flex-1 overflow-y-auto mt-6 [contain:layout_style] space-y-1">
            <div className="space-y-2">
              <p className="text-[10px] text-zinc-500 px-5 py-1">
                {lang === "fa" ? "دسترسی سریع" : "Quick Access"}
              </p>

              <Link
                to="/dashboard"
                className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95"
              >
                <HiOutlineHome size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "صفحه اصلی" : "Home"}
                </span>
              </Link>

              <Link
                id="home2"
                to="/accounts"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                  handleCloseMobile();
                }}
                className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95"
              >
                <HiOutlineUserCircle size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "اکانت های من" : "My Accounts"}
                </span>
              </Link>
            </div>

            <Divider />

            <div className="space-y-2">
              <p className="text-[10px] text-zinc-500 px-5 py-1">
                {lang === "fa" ? "پشتیبانی و آموزش" : "Support & Education"}
              </p>

              {cards.map((card) => {
                if (card.type === "notifications") return null;
                return (
                  <button
                    key={card.type}
                    onClick={() => {
                      handleSetModalType(card.type);
                      handleCloseMobile();
                    }}
                    className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95"
                  >
                    <card.icon size={22} className="shrink-0" />
                    <span className="overflow-hidden text-[12px] font-normal text-start">
                      {lang === "fa" ? card.title.fa : card.title.en}
                    </span>
                  </button>
                );
              })}
            </div>

            <Divider />

            <div className="space-y-2">
              <p className="text-[10px] dark:text-zinc-500 px-5 py-1">
                {lang === "fa"
                  ? "پلتفرم ترید رابین سود"
                  : "Platform Traid Rabin Sood"}
              </p>

              <button className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95">
                <RiAppsLine size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa"
                    ? "پلتفرم ترید رابین سود"
                    : "Platform Traid Rabin Sood"}
                </span>
              </button>
              <button className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95">
                <MdOutlineWebAsset size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "وبسایت رابین سود" : "WebSite RabisnSod"}
                </span>
              </button>
              <button className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95">
                <RiBloggerLine size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "بلاگ رابین سود" : "Blog RabisSod"}
                </span>
              </button>
            </div>
            <p
              className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-center
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
            >
              {lang === "fa" ? " ورژن 3.1.1" : "Version 3.1.1"}
            </p>
          </nav>
        </aside>

        {modalNode}
      </>
    );
  }

  // Desktop version
  return (
    <>
      <aside
        className={`
          relative
          text-gray-500
          transition-[width]
          duration-300
          ease-in-out
          [will-change:width]
          [contain:layout_style]
          dark:bg-zinc-900 bg-[#F3F4F6]
          p-4
          dark:text-white text-gray-800
          border-r border-zinc-800
          flex flex-col
          min-h-screen
          sticky top-0
          ${open ? "w-65" : "w-24"}
        `}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <MemoizedProfileSidbar open={open} setOpen={handleToggleSidebar} />

        <div
          className={`
            absolute top-28 transition-transform duration-300 [will-change:transform]
            ${
              lang === "fa"
                ? open
                  ? "-translate-x-55"
                  : "-translate-x-14"
                : open
                  ? "translate-x-63"
                  : "translate-x-14"
            }
          `}
        >
          <BtnSaidbar open={open} setOpen={handleToggleSidebar} />
        </div>

        <nav className="flex-1 overflow-y-auto mt-12 [contain:layout_style] space-y-1">
          <div className="space-y-1">
            <p
              className={`text-[10px] font-semibold text-zinc-500 dark:text-white px-5 py-2 ${!open ? "hidden" : ""}`}
            >
              {lang === "fa" ? "دسترسی سریع" : "Quick Access"}
            </p>

            <Link
              to="/dashboard"
              className={`
                w-full
                flex
                items-center
                rounded-2xl
                px-5
                gap-2
                py-2.5
                transition-colors
                duration-200
                cursor-pointer
                dark:text-zinc-300 text-zinc-700
                hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                hover:bg-zinc-800/30
                active:scale-95
                ${!open ? "justify-center px-0" : ""}
              `}
            >
              <HiOutlineHome size={22} className="shrink-0" />
              <span
                className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-start
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
              >
                {lang === "fa" ? "صفحه اصلی" : "Home"}
              </span>
            </Link>

            <Link
              id="home2"
              to="/accounts"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className={`
                w-full
                flex
                items-center
                rounded-2xl
                px-5
                gap-2
                py-2.5
                transition-colors
                duration-200
                cursor-pointer
                dark:text-zinc-300 text-zinc-700
                hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                hover:bg-zinc-800/30
                active:scale-95
                ${!open ? "justify-center px-0" : ""}
              `}
            >
              <HiOutlineUserCircle size={22} className="shrink-0" />
              <span
                className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-start
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
              >
                {lang === "fa" ? "اکانت های من" : "My Accounts"}
              </span>
            </Link>

            <button
              onClick={handleOpenNotifications}
              className={`
                w-full
                flex
                items-center
                rounded-2xl
                px-5
                gap-2
                py-2.5
                transition-colors
                duration-200
                cursor-pointer
                dark:text-zinc-300 text-zinc-700
                hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                hover:bg-zinc-800/30
                active:scale-95
                ${
                  modalType === "notifications"
                    ? `
                  shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                  bg-zinc-800/50
                  text-white
                  border border-white/5
                `
                    : ""
                }
                ${!open ? "justify-center px-0" : ""}
              `}
            >
              <div className="relative shrink-0">
                <HiOutlineBell size={22} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                    {notificationCount}
                  </span>
                )}
              </div>
              <span
                className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-start
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
              >
                {lang === "fa" ? "اطلاعیه ها" : "Notifications"}
              </span>
            </button>
          </div>

          <Divider />

          <div className="space-y-2">
            <p
              className={`text-[10px] font-semibold text-zinc-500 dark:text-white px-5 py-3 ${!open ? "hidden" : ""}`}
            >
              {lang === "fa" ? "پشتیبانی و آموزش" : "Support & Education"}
            </p>

            {cards.map((card) => {
              if (card.type === "notifications") return null;
              return (
                <button
                  key={card.type}
                  onClick={() => handleSetModalType(card.type)}
                  className={`
                    w-full
                    flex
                    items-center
                    rounded-2xl
                    px-5
                    gap-2
                    py-2.5
                    transition-colors
                    duration-200
                    cursor-pointer
                    dark:text-zinc-300 text-zinc-700
                    hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                    hover:bg-zinc-800/30
                    active:scale-95
                    ${
                      modalType === card.type
                        ? `
                      shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                      bg-zinc-800/50
                      text-white
                      border border-white/5
                    `
                        : ""
                    }
                    ${!open ? "justify-center px-0" : ""}
                  `}
                >
                  <card.icon size={22} className="shrink-0" />
                  <span
                    className={`
                      text-[11px]
                      overflow-hidden
                      w-44
                      transition-opacity duration-200
                      text-start
                      ${open ? "block" : "hidden pointer-events-none w-0"}
                    `}
                  >
                    {lang === "fa" ? card.title.fa : card.title.en}
                  </span>
                </button>
              );
            })}
          </div>

          <Divider />

          <div className="space-y-2">
            <p
              className={`text-[10px] font-semibold text-zinc-500 dark:text-white px-5 py-3 ${!open ? "hidden" : ""}`}
            >
              {lang === "fa" ? "درباره رابین سود" : "About RobinSood"}
            </p>
            <button
              className={`
                w-full
                flex
                items-center
                rounded-2xl
                px-5
                gap-2
                py-2.5
                transition-colors
                duration-200
                cursor-pointer
                dark:text-zinc-300 text-zinc-700
                hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                hover:bg-zinc-800/30
                active:scale-95
                ${!open ? "justify-center px-0" : ""}
              `}
            >
              <RiAppsLine size={22} className="shrink-0" />
              <span
                className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-start
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
              >
                {lang === "fa"
                  ? "پلتفرم ترید رابین سود"
                  : "Platform Traid Rabin Sood"}
              </span>
            </button>
            <button
              className={`
                w-full
                flex
                items-center
                rounded-2xl
                px-5
                gap-2
                py-2.5
                transition-colors
                duration-200
                cursor-pointer
                dark:text-zinc-300 text-zinc-700
                hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                hover:bg-zinc-800/30
                active:scale-95
                ${!open ? "justify-center px-0" : ""}
              `}
            >
              <MdOutlineWebAsset size={22} className="shrink-0" />
              <span
                className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-start
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
              >
                {lang === "fa" ? "وبسایت رابین سود" : "WebSite RabinSood"}
              </span>
            </button>
            <button
              className={`
                w-full
                flex
                items-center
                rounded-2xl
                px-5
                gap-2
                py-2.5
                transition-colors
                duration-200
                cursor-pointer
                dark:text-zinc-300 text-zinc-700
                hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]
                hover:bg-zinc-800/30
                active:scale-95
                ${!open ? "justify-center px-0" : ""}
              `}
            >
              <RiBloggerLine size={22} className="shrink-0" />
              <span
                className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-start
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
              >
                {lang === "fa" ? "بلاگ رابین سود" : "Blog RabisSod"}
              </span>
            </button>
            <p
              className={`
                  text-[11px]
                  overflow-hidden
                  w-44
                  transition-opacity duration-200
                  text-center
                  ${open ? "block" : "hidden pointer-events-none w-0"}
                `}
            >
              {lang === "fa" ? " ورژن 3.1.1" : "Version 3.1.1"}
            </p>
          </div>
        </nav>

        {modalNode}
      </aside>
      <ChallengeAccountsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
