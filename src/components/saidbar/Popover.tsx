import React, { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaFlag } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import {
  BsCheckCircleFill,
  BsHourglassSplit,
  BsXCircleFill,
} from "react-icons/bs";

interface PopoverProps {
  account: any;
  children: React.ReactNode;
  lang: string;
}

const statusConfig = {
  passed: {
    border: "border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-500/10",
    badge:
      "border-emerald-500/30 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400",
    icon: <BsCheckCircleFill />,
  },
  trading: {
    border: "border-orange-500/30",
    text: "text-orange-600 dark:text-orange-400",
    glow: "bg-orange-500/10",
    badge:
      "border-orange-500/30 bg-orange-50 text-orange-600 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400",
    icon: <BsHourglassSplit />,
  },
  rejected: {
    border: "border-red-500/30",
    text: "text-red-600 dark:text-red-400",
    glow: "bg-red-500/10",
    badge:
      "border-red-500/30 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400",
    icon: <BsXCircleFill />,
  },
};

const Popover: React.FC<PopoverProps> = ({ account, children, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const status = statusConfig[account.cardStatus as keyof typeof statusConfig];

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isOpen]);

  return (
    <div className="relative" ref={triggerRef}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-pointer"
      >
        {children}
      </div>

      {isOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fadeIn"
              onClick={() => setIsOpen(false)}
            />
          )}

          <div
            ref={popoverRef}
            onMouseEnter={() => {
              if (!isMobile) {
                clearTimeout(timeoutRef.current);
                setIsOpen(true);
              }
            }}
            onMouseLeave={handleMouseLeave}
            className={`
              ${
                isMobile
                  ? `
    fixed
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    z-50
    w-[calc(100%-2rem)]
    max-w-md
    max-h-[80vh]
    overflow-y-auto
    animate-scaleIn
  `
                  : `
    absolute
    z-50
    w-72
    sm:w-80
    md:w-96
    -translate-x-1/2
    left-1/2
    bottom-full
    mb-2
    animate-fadeIn
  `
              }
              p-4
              bg-white
              dark:bg-[#2B2B2B]
              rounded-2xl
              shadow-2xl
              border
              border-gray-200
              dark:border-gray-700
            `}
          >
            {!isMobile && (
              <div
                className="
                  absolute
                  -bottom-2
                  left-1/2
                  -translate-x-1/2
                  w-4
                  h-4
                  rotate-45
                  bg-white
                  dark:bg-[#2B2B2B]
                  border-b
                  border-r
                  border-gray-200
                  dark:border-gray-700
                "
              />
            )}

            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="
                  absolute
                  top-2
                  left-2
                  p-2
                  z-100
                  rounded-full
                  cursor-pointer
                  bg-gray-100
                  dark:bg-gray-700
                  text-gray-600
                  dark:text-gray-300
                  hover:bg-gray-200
                  dark:hover:bg-gray-600
                  transition-colors
                "
              >
                <IoCloseOutline />
              </button>
            )}

            <div className="relative space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={account.icon}
                  alt={lang === "fa" ? account.title.fa : account.title.en}
                  className="w-12 h-12 object-contain"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {lang === "fa" ? account.title.fa : account.title.en}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    #{account.id}
                  </p>
                </div>
              </div>

              {/* اطلاعات */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                    {lang === "fa" ? "سرمایه" : "Capital"}
                  </p>
                  <h4 className={`text-base font-bold ${status.text}`}>
                    ${account.capital.toLocaleString()}
                  </h4>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                    {lang === "fa" ? "مرحله" : "Step"}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${status.badge} text-xs`}
                  >
                    <FaFlag className="text-[10px]" />
                    <span>
                      {lang === "fa"
                        ? account.stageLabel.fa
                        : account.stageLabel.en}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                    {lang === "fa" ? "وضعیت" : "Status"}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${status.badge} text-xs`}
                  >
                    <span className="text-xs">{status.icon}</span>
                    <span>
                      {lang === "fa"
                        ? account.cardStatusLabel.fa
                        : account.cardStatusLabel.en}
                    </span>
                  </div>
                </div>
              </div>

              {/* دکمه انتقال */}
              <Link
                to={`/accounts/${account.id}`}
                onClick={() => setIsOpen(false)}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-cyan-500
                  hover:bg-cyan-600
                  text-white
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  shadow-lg
                  hover:shadow-cyan-500/25
                "
              >
                <span>{lang === "fa" ? "مشاهده جزئیات" : "View Details"}</span>
                <HiOutlineArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Popover;
