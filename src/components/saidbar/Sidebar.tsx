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
import Modal from "./ModalComponent";
import {
  HiOutlineAcademicCap,
  HiOutlineChatBubbleLeftRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import ChallengeAccountsModal from "../../pages/AllAccounts";
import NotificationsModal from "../modals/NotificationsModal";

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
  const [open, setOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ExtendedModalType>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(3);

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
          fa: "درخواست پاس حساب و رفتن به مرحله بعد",
          en: "Pass Account Request & Proceed to the Next Stage",
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
        <button
          onClick={handleOpenMobile}
          className={`
            fixed top-2 left-5 z-50
            p-2.5 rounded-xl
            border border-zinc-800
            backdrop-blur-3xl
            cursor-pointer
            shadow-lg
            transition-opacity duration-200
            ${mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={handleCloseMobile}
            aria-hidden="true"
          />
        )}

        <aside
          className={`
            fixed top-0 left-0 z-50
            w-72 h-full
            dark:bg-zinc-900 bg-white
            p-4
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
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-zinc-800/20 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>

          <MemoizedProfileSidbar open={true} setOpen={handleToggleSidebar} />

          <nav className="flex-1 overflow-y-auto mt-6 [contain:layout_style] space-y-1">
            {/* بخش اول: دسترسی سریع */}
            <div className="space-y-1">
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

              <button
                onClick={() => {
                  handleOpenNotifications();
                  handleCloseMobile();
                }}
                className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95"
              >
                <div className="relative shrink-0">
                  <HiOutlineBell size={22} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                      {notificationCount}
                    </span>
                  )}
                </div>
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "اطلاعیه ها" : "Notifications"}
                </span>
              </button>
            </div>

            <Divider />

            <div className="space-y-1">
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

            <div className="space-y-1">
              <p className="text-[10px] dark:text-zinc-500 px-5 py-1">
                {lang === "fa" ? "درباره رابین سود" : "About RobinSood"}
              </p>

              <button className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95">
                <HiOutlineInformationCircle size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "درباره ما" : "About Us"}
                </span>
              </button>
              <button className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95">
                <HiOutlineQuestionMarkCircle size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "سوالات متداول" : "FAQ"}
                </span>
              </button>
              <button className="w-full flex items-center gap-4 rounded-2xl px-5 py-2.5 transition-colors duration-200 min-w-0 text-zinc-300 cursor-pointer hover:bg-zinc-800/30 active:scale-95">
                <HiOutlineUsers size={22} className="shrink-0" />
                <span className="overflow-hidden text-[12px] font-normal text-start">
                  {lang === "fa" ? "تماس با ما" : "Contact Us"}
                </span>
              </button>
            </div>
          </nav>

          {/* <MemoizedUserMenu isSidebarOpen={true} /> */}
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
              className={`text-[10px] font-semibold text-zinc-500 dark:text-white px-5 py-1 ${!open ? "hidden" : ""}`}
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

          {/* بخش دوم: پشتیبانی و آموزش */}
          <div className="space-y-1">
            <p
              className={`text-[10px] font-semibold text-zinc-500 dark:text-white px-5 py-1 ${!open ? "hidden" : ""}`}
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

          {/* بخش سوم: درباره رابین سود */}
          <div className="space-y-1">
            <p
              className={`text-[10px] font-semibold text-zinc-500 dark:text-white px-5 py-1 ${!open ? "hidden" : ""}`}
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
              <HiOutlineInformationCircle size={22} className="shrink-0" />
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
                {lang === "fa" ? "درباره ما" : "About Us"}
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
              <HiOutlineQuestionMarkCircle size={22} className="shrink-0" />
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
                {lang === "fa" ? "سوالات متداول" : "FAQ"}
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
              <HiOutlineUsers size={22} className="shrink-0" />
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
                {lang === "fa" ? "تماس با ما" : "Contact Us"}
              </span>
            </button>
          </div>
        </nav>

        {/* <MemoizedUserMenu isSidebarOpen={open} /> */}

        {modalNode}
      </aside>
      <ChallengeAccountsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
