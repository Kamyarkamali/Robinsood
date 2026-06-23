import React, { useState } from "react";
import CircleIcon from "../icons/CircleIcon";
import {
  FaUserCircle,
  FaChartLine,
  FaIdCard,
  FaCopy,
  FaCheck,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaDollarSign,
  FaPercent,
} from "react-icons/fa";
import {
  GiTrophy,
  GiWallet,
  GiTargetArrows,
  GiStarsStack,
} from "react-icons/gi";
import { MdDirectionsBike, MdVerified } from "react-icons/md";
import { RiTimerFlashLine } from "react-icons/ri";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsGraphUp, BsShieldCheck } from "react-icons/bs";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { TbChartCandle } from "react-icons/tb";

const InformationAccount: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copied2, setCopied2] = useState<boolean>(false);
  const [accountNumber] = useState<string>("۱۴۷۹۳۲۵");
  const [referralCode] = useState<string>("TRADE-2026-XYZ");

  const copyToClipboard = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setter(true);
        setTimeout(() => setter(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // کامپوننت StatusBadge ساده شده
  const StatusBadge: React.FC<{ color: string; label: string; icon?: any }> = ({
    color,
    label,
    icon: Icon,
  }) => {
    const colorClasses: Record<string, string> = {
      green:
        "text-green-500 from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30",
      red: "text-red-500 from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30",
      blue: "text-blue-500 from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
      yellow:
        "text-yellow-500 from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30",
      purple:
        "text-purple-500 from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
      pink: "text-pink-500 from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30",
    };

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
          bg-gradient-to-br ${colorClasses[color]}
          shadow-[inset_2px_2px_4px_#d4edda,inset_-2px_-2px_4px_#b7e4c7] 
          dark:shadow-[inset_2px_2px_4px_#1a3a2a,inset_-2px_-2px_4px_#2a4a3a] ${colorClasses[color].split(" ")[0]}`}
      >
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-wrap items-start justify-center gap-6 p-4 md:p-6">
      {/* ===== کارت اول - اطلاعات اکانت ===== */}
      <div
        className="relative w-full max-w-[400px] h-auto p-[2px] rounded-3xl 
        bg-gradient-to-br from-gray-200 to-gray-300 
        dark:from-gray-700 dark:to-gray-800 
        shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3a3a3a]"
      >
        <div
          className="relative w-full h-full rounded-3xl p-6 
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900 
          shadow-[inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#b8b8b8] 
          dark:shadow-[inset_2px_2px_4px_#3a3a3a,inset_-2px_-2px_4px_#1a1a1a]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl 
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <FaUserCircle className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                اطلاعات اکانت
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div
                className="p-3 rounded-xl text-center
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  نوع اکانت
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">
                  پراپ فرصت‌ها
                </p>
              </div>

              <div
                className="p-3 rounded-xl text-center col-span-2
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <div className="flex items-center justify-center gap-2">
                  <CircleIcon color="#00A656" />
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    بالانس
                  </p>
                </div>
                <p className="text-sm sm:text-base font-bold text-green-500">
                  ۱۰,۱۵۳.۱۱ $
                </p>
                <StatusBadge color="green" label="+1.5%" icon={FaChartLine} />
              </div>
            </div>

            <div
              className="p-3 rounded-xl
              bg-gradient-to-br from-gray-100 to-gray-200 
              dark:from-gray-800 dark:to-gray-900 
              shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
              dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GiWallet className="w-5 h-5 text-purple-500" />
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    اکوییتی
                  </p>
                </div>
                <p className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-200">
                  ۱۰,۰۹۳.۹۱ $
                </p>
                <StatusBadge
                  color="red"
                  label="ریسک: 2%"
                  icon={MdDirectionsBike}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <RiTimerFlashLine className="w-4 h-4" />
              <span>آخرین آپدیت ۱۴۰۴/۱۰/۲۲ , 18:13:25</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== کارت دوم - وضعیت چالش ===== */}
      <div
        className="relative w-full max-w-[400px] h-auto p-[2px] rounded-3xl 
        bg-gradient-to-br from-gray-200 to-gray-300 
        dark:from-gray-700 dark:to-gray-800 
        shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3a3a3a]"
      >
        <div
          className="relative w-full h-full rounded-3xl p-6 
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900 
          shadow-[inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#b8b8b8] 
          dark:shadow-[inset_2px_2px_4px_#3a3a3a,inset_-2px_-2px_4px_#1a1a1a]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl 
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <GiTrophy className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                وضعیت چالش
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex-1 w-full sm:w-auto">
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  نام چالش
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">
                  چالش دو مرحله ای فرصت ها
                </p>
              </div>
              <div className="text-right w-full sm:w-auto">
                <div className="flex items-center justify-end gap-2">
                  <CircleIcon color="#FF383C" />
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    بالانس اولیه
                  </p>
                </div>
                <p className="text-sm sm:text-base font-bold text-red-500">
                  رد شده
                </p>
                <p className="text-[10px] sm:text-xs text-red-400">
                  بدلیل گذر از درادون روزانه
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 gap-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <AiOutlinePercentage className="w-4 h-4" />
                <span>مرحله ۱</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                ۱۴۰۴/۱۰/۲۲ , 18:13:25
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== کارت سوم - شماره اکانت با قابلیت کپی ===== */}
      <div
        className="relative w-full max-w-[400px] h-auto p-[2px] rounded-3xl 
        bg-gradient-to-br from-gray-200 to-gray-300 
        dark:from-gray-700 dark:to-gray-800 
        shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3a3a3a]"
      >
        <div
          className="relative w-full h-full rounded-3xl p-6 
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900 
          shadow-[inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#b8b8b8] 
          dark:shadow-[inset_2px_2px_4px_#3a3a3a,inset_-2px_-2px_4px_#1a1a1a]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl 
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <FaIdCard className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                شماره اکانت
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="w-full sm:flex-1">
                <div
                  onClick={() => copyToClipboard(accountNumber, setCopied)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                    bg-gradient-to-br from-gray-100 to-gray-200 
                    dark:from-gray-800 dark:to-gray-900 
                    shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                    dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]
                    hover:shadow-[2px_2px_4px_#b8b8b8,-2px_-2px_4px_#ffffff] 
                    dark:hover:shadow-[2px_2px_4px_#1a1a1a,-2px_-2px_4px_#3a3a3a]
                    active:shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] 
                    dark:active:shadow-[inset_4px_4px_8px_#1a1a1a,inset_-4px_-4px_8px_#3a3a3a]"
                >
                  <span className="text-sm sm:text-lg font-mono font-bold text-gray-700 dark:text-gray-200">
                    {accountNumber}
                  </span>
                  {copied ? (
                    <FaCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <FaCopy className="w-4 h-4 text-blue-500 hover:text-blue-600" />
                  )}
                </div>
              </div>
              <div className="text-right w-full sm:w-auto">
                <div className="flex items-center justify-end gap-2">
                  <CircleIcon color="#00C0E8" />
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    وضعیت
                  </p>
                </div>
                <p className="text-sm sm:text-base font-bold text-cyan-500">
                  ۱۰,۰۰۰ $
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <RiTimerFlashLine className="w-4 h-4" />
              <span>تاریخ ثبت نام ۱۴۰۴/۱۰/۲۲ , 18:13:25</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== کارت چهارم - عملکرد و آمار ===== */}
      <div
        className="relative w-full max-w-[400px] h-auto p-[2px] rounded-3xl 
        bg-gradient-to-br from-gray-200 to-gray-300 
        dark:from-gray-700 dark:to-gray-800 
        shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3a3a3a]"
      >
        <div
          className="relative w-full h-full rounded-3xl p-6 
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900 
          shadow-[inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#b8b8b8] 
          dark:shadow-[inset_2px_2px_4px_#3a3a3a,inset_-2px_-2px_4px_#1a1a1a]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl 
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <BsGraphUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                عملکرد
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="p-3 rounded-xl text-center
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <GiTargetArrows className="w-4 h-4 text-orange-500" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    برد
                  </p>
                </div>
                <p className="text-sm font-bold text-green-500">۸۵%</p>
              </div>

              <div
                className="p-3 rounded-xl text-center
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <FaDollarSign className="w-4 h-4 text-blue-500" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    سود
                  </p>
                </div>
                <p className="text-sm font-bold text-blue-500">+$۲,۴۵۰</p>
              </div>
            </div>

            <div
              className="p-3 rounded-xl
              bg-gradient-to-br from-gray-100 to-gray-200 
              dark:from-gray-800 dark:to-gray-900 
              shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
              dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TbChartCandle className="w-5 h-5 text-rose-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    معاملات امروز
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  ۱۲ معامله
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== کارت پنجم - امنیت ===== */}
      <div
        className="relative w-full max-w-[400px] h-auto p-[2px] rounded-3xl 
        bg-gradient-to-br from-gray-200 to-gray-300 
        dark:from-gray-700 dark:to-gray-800 
        shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3a3a3a]"
      >
        <div
          className="relative w-full h-full rounded-3xl p-6 
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900 
          shadow-[inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#b8b8b8] 
          dark:shadow-[inset_2px_2px_4px_#3a3a3a,inset_-2px_-2px_4px_#1a1a1a]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl 
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <FaShieldAlt className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                امنیت
              </h3>
            </div>

            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-3 rounded-xl
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <div className="flex items-center gap-2">
                  <MdVerified className="w-5 h-5 text-green-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    تایید هویت
                  </p>
                </div>
                <StatusBadge color="green" label="تایید شده" />
              </div>

              <div
                className="flex items-center justify-between p-3 rounded-xl
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <div className="flex items-center gap-2">
                  <BsShieldCheck className="w-5 h-5 text-blue-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    احراز هویت دو مرحله‌ای
                  </p>
                </div>
                <StatusBadge color="blue" label="فعال" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <FaClock className="w-3 h-3" />
              <span>آخرین ورود: امروز ۱۸:۱۳</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== کارت ششم - کد معرفی ===== */}
      <div
        className="relative w-full max-w-[400px] h-auto p-[2px] rounded-3xl 
        bg-gradient-to-br from-gray-200 to-gray-300 
        dark:from-gray-700 dark:to-gray-800 
        shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] 
        dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3a3a3a]"
      >
        <div
          className="relative w-full h-full rounded-3xl p-6 
          bg-gradient-to-br from-gray-100 to-gray-200 
          dark:from-gray-800 dark:to-gray-900 
          shadow-[inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#b8b8b8] 
          dark:shadow-[inset_2px_2px_4px_#3a3a3a,inset_-2px_-2px_4px_#1a1a1a]"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl 
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]"
              >
                <FaUsers className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                کد معرفی
              </h3>
            </div>

            <div
              onClick={() => copyToClipboard(referralCode, setCopied2)}
              className="flex items-center justify-between gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200
                bg-gradient-to-br from-gray-100 to-gray-200 
                dark:from-gray-800 dark:to-gray-900 
                shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] 
                dark:shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]
                hover:shadow-[2px_2px_4px_#b8b8b8,-2px_-2px_4px_#ffffff] 
                dark:hover:shadow-[2px_2px_4px_#1a1a1a,-2px_-2px_4px_#3a3a3a]
                active:shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] 
                dark:active:shadow-[inset_4px_4px_8px_#1a1a1a,inset_-4px_-4px_8px_#3a3a3a]"
            >
              <div className="flex items-center gap-3">
                <GiStarsStack className="w-5 h-5 text-yellow-500" />
                <span className="text-sm sm:text-base font-mono font-bold text-gray-700 dark:text-gray-200">
                  {referralCode}
                </span>
              </div>
              {copied2 ? (
                <FaCheck className="w-5 h-5 text-green-500" />
              ) : (
                <FaCopy className="w-5 h-5 text-pink-500 hover:text-pink-600" />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HiOutlineLightningBolt className="w-4 h-4 text-yellow-500" />
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  پاداش معرفی
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <FaPercent className="w-3 h-3 text-green-500" />
                <span className="text-xs font-semibold text-green-500">
                  ۵% کمیسیون
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <FaUsers className="w-3 h-3" />
              <span>تعداد معرف‌ها: ۳۲ نفر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationAccount;
