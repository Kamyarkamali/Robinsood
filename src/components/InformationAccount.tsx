import CircleIcon from "../icons/CircleIcon";
import { cardInner, cardOuter } from "../styles/buttonStyles";
import { FaHashtag } from "react-icons/fa";
import toast from "react-hot-toast";
import i18next from "i18next";
import { FiActivity, FiFlag } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { Wallet } from "lucide-react";
import chaleng from "../assets/images/chaleng.png";
import wallet from "../assets/images/wallet.png";
import { MdShowChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { TbChartHistogram } from "react-icons/tb";
import { FiXCircle } from "react-icons/fi";
import { PiChartLineDown } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";

function InformationAccount() {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-6 p-4">
      <div className={cardOuter}>
        <div className={cardInner}>
          <div className="flex flex-col w-full gap-2.5 font-normal pr-2 pb-1">
            <div className="grid grid-cols-3 sm:grid-cols-3 w-full text-center items-stretch gap-3 sm:gap-4">
              <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                <div className="flex items-center justify-center gap-1.5 xs:gap-2 mr-4">
                  <CircleIcon color="#00A656" />
                  <p className="text-[11px] xs:text-[12px] md:text-[14px] font-normal text-black dark:text-white whitespace-nowrap">
                    بالانس لحظه ای
                  </p>
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0">
                    <img
                      src={wallet}
                      alt="wallet"
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 object-contain"
                    />
                  </div>
                </div>

                <p className="text-[12px] xs:text-[13px] md:text-[15px] text-[#34C759] font-semibold whitespace-nowrap">
                  ۱۰,۱۵۳.۱۱ $
                </p>

                <div className="flex items-center gap-1.5 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-lg xs:rounded-xl bg-linear-to-br shadow-md dark:hover:shadow-[2px_2px_5px_#1f1f1f,_-2px_-2px_5px_#3d3d3d] transition-all duration-300">
                  <p className="text-[8px] xs:text-[9px] md:text-[10px] font-semibold text-[#34C759] whitespace-nowrap">
                    +1.5% نسبت به دیروز
                  </p>
                  <MdOutlineShowChart className="text-[#34C759] w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2 py-1.5">
                <p className="text-[11px] xs:text-[12px] md:text-[14px] font-normal text-black dark:text-white whitespace-nowrap">
                  وضعیت
                </p>

                <div className="flex items-center">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-lg xs:rounded-xl flex items-center justify-center"></div>
                  <p className="text-[11px] xs:text-[12px] md:text-[11px] font-semibold text-red-500 dark:text-red-600 whitespace-nowrap">
                    رد شده
                  </p>
                  <PiChartLineDown className="text-red-400 rounded-full w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 " />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                <div className="flex pt-1 items-center justify-center gap-1.5 xs:gap-2 sm:gap-2.5">
                  <p className="text-[11px] xs:text-[12px] md:text-[14px] font-normal text-black dark:text-white whitespace-nowrap">
                    اکوییتی
                  </p>
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0">
                    <TbChartHistogram className="text-purple-500 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                </div>

                <p className="text-[12px] xs:text-[13px] md:text-[15px] font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  ۱۰,۰۹۳.۹۱ $
                </p>

                <div className="flex items-center gap-1.5 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-lg xs:rounded-xl bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-md hover:shadow-[2px_2px_5px_#c8cdd6,_-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#1f1f1f,_-2px_-2px_5px_#3d3d3d] transition-all duration-300">
                  <span className="text-[8px] xs:text-[9px] md:text-[10px] font-bold text-red-500 whitespace-nowrap">
                    ریسک: 2%
                  </span>
                  <MdShowChart className="text-red-500 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>

              <div className="col-span-3">
                <div className="flex items-center justify-between w-full px-2 sm:px-3 pb-2 rounded-xl ">
                  <div className="flex items-center gap-1 mb-2 sm:gap-2 min-w-0">
                    <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] text-black dark:text-white truncate">
                      به دلیل گذر از درادون روزانه
                    </p>
                    <IoTimeOutline
                      size={14}
                      className="text-orange-500 shrink-0"
                    />
                  </div>

                  <div className="flex items-center mb-2 gap-1 sm:gap-2 shrink-0">
                    <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      ۱۴۰۴/۱۰/۲۲ 18:13
                    </p>

                    <FiCalendar size={14} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cardOuter}>
        <div className={cardInner}>
          <div className="flex flex-col w-full gap-2 font-normal">
            <div className="flex items-start justify-between w-full px-1.5 xs:px-2 sm:px-3 gap-1.5 xs:gap-2 sm:gap-3">
              <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                  <p className="text-[9px] xs:text-[10px] sm:text-[12px] md:text-[14px] text-black font-normal dark:text-white whitespace-nowrap">
                    فرصت ها
                  </p>
                  <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-lg xs:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] hover:shadow-[2px_2px_5px_#c8cdd6,_-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#1f1f1f,_-2px_-2px_5px_#3d3d3d] flex-shrink-0">
                    <img
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 object-contain"
                      src={chaleng}
                      alt="chaleng"
                    />
                  </div>
                </div>
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[12px] text-gray-500 dark:text-gray-300 font-semibold break-words leading-tight">
                  چالش دو مرحله ای فرصت ها
                </p>
              </div>

              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <div className="flex items-center justify-end gap-1 xs:gap-1.5 sm:gap-2">
                  <CircleIcon color="#FF383C" />
                  <p className="text-[9px] xs:text-[10px] sm:text-[12px] md:text-[14px] text-black dark:text-white font-normal whitespace-nowrap">
                    بالانس اولیه
                  </p>
                  <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-lg xs:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] hover:shadow-[2px_2px_5px_#c8cdd6,_-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#1f1f1f,_-2px_-2px_5px_#3d3d3d] flex-shrink-0">
                    <Wallet className="text-emerald-500 dark:text-emerald-400 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                <div className="flex items-center gap-0.5 xs:gap-1">
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[13px] text-[#FF383C] text-center font-semibold whitespace-nowrap">
                    رد شده
                  </p>
                  <FiXCircle className="text-red-500 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </div>

                <p className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-gray-500 dark:text-[#FF383C] leading-tight text-right whitespace-normal max-w-[80px] xs:max-w-[100px] sm:max-w-[130px]">
                  گذر از روز های معاملاتی
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center w-full px-1.5 xs:px-2 sm:px-3 gap-1.5 xs:gap-2">
              {/* مرحله */}
              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-lg xs:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] hover:shadow-[2px_2px_5px_#c8cdd6,_-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#1f1f1f,_-2px_-2px_5px_#3d3d3d] flex-shrink-0">
                  <FiFlag className="text-purple-500 dark:text-purple-400 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <p className="text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] text-gray-500 dark:text-white whitespace-nowrap font-normal">
                  مرحله ۱
                </p>
              </div>

              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-2.5 py-0.5 xs:py-1 sm:py-1 rounded-lg xs:rounded-xl bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] hover:shadow-[2px_2px_5px_#c8cdd6,_-2px_-2px_5px_#ffffff] dark:hover:shadow-[2px_2px_5px_#1f1f1f,_-2px_-2px_5px_#3d3d3d] transition-all duration-300">
                <FiCalendar className="text-blue-500 dark:text-blue-400 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <p className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-[12px] text-gray-600 dark:text-gray-300 whitespace-nowrap font-normal">
                  <span className="text-gray-800 dark:text-white font-medium">
                    ۱۴۰۴/۱۰/۲۲
                  </span>
                  <span className="hidden xs:inline"> — </span>
                  <span className="text-gray-800 dark:text-white font-medium">
                    18:13:25
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cardOuter}>
        <div className={cardInner}>
          <div className="flex flex-col w-full gap-4 font-normal">
            <div className="flex items-start justify-between w-full px-2 sm:px-3 md:px-5">
              <div
                className="flex flex-col items-start gap-1 cursor-pointer group flex-1 min-w-0"
                onClick={() => {
                  navigator.clipboard.writeText("۱۴۷۹۳۲۵");
                  toast.success(
                    i18next.language === "fa"
                      ? "شماره اکانت کپی شد"
                      : "Account number copied",
                  );
                }}
              >
                <div className="flex items-center justify-center w-full gap-1">
                  <p className="text-[10px] xs:text-[11px] sm:text-[13px] md:text-[16px] font-normal text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">
                    شماره اکانت
                  </p>
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[6px_6px_12px_#c8cdd6,_-6px_-6px_12px_#ffffff,_inset_1px_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_10px_#1f1f1f,_-4px_-4px_10px_#3d3d3d,_inset_1px_1px_2px_rgba(255,255,255,0.05)] group-hover:shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:group-hover:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] transition-all duration-300 flex-shrink-0">
                    <FaHashtag
                      size={14}
                      className="text-gray-600 dark:text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    />
                  </div>
                </div>

                <p className="text-[9px] mx-auto xs:text-[10px] sm:text-[12px] md:text-[15px] text-gray-500 dark:text-gray-300 whitespace-nowrap group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  ۱۴۷۹۳۲۵
                </p>
              </div>

              <div className="flex flex-col items-center gap-0.5 shrink-0">
                <div className="flex items-center justify-end gap-1">
                  <CircleIcon color="#00C0E8" />
                  <p className="text-[10px] xs:text-[11px] sm:text-[13px] md:text-[16px] font-normal text-black dark:text-white whitespace-nowrap">
                    بالانس اولیه
                  </p>
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[6px_6px_12px_#c8cdd6,_-6px_-6px_12px_#ffffff,_inset_1px_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_10px_#1f1f1f,_-4px_-4px_10px_#3d3d3d,_inset_1px_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:hover:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] transition-all duration-300 group flex-shrink-0">
                    <FiActivity
                      size={14}
                      className="text-[#00C0E8] drop-shadow-[0_1px_2px_rgba(0,192,232,0.2)] dark:drop-shadow-[0_1px_2px_rgba(0,192,232,0.3)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                    />
                  </div>
                </div>

                <p className="text-[9px] xs:text-[10px] sm:text-[12px] md:text-[15px] text-[#00C0E8] text-right whitespace-nowrap">
                  ۱۰,۰۰۰ $
                </p>
              </div>
            </div>

            <div className="flex justify-center px-2 sm:px-3 md:px-5">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-[#f0f4ff] to-[#d9dfe8] dark:from-[#2a2a2a] dark:to-[#323232] shadow-[6px_6px_12px_#c8cdd6,_-6px_-6px_12px_#ffffff,_inset_1px_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_10px_#1f1f1f,_-4px_-4px_10px_#3d3d3d,_inset_1px_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[3px_3px_8px_#c8cdd6,_-3px_-3px_8px_#ffffff] dark:hover:shadow-[3px_3px_8px_#1f1f1f,_-3px_-3px_8px_#3d3d3d] max-w-full overflow-hidden">
                <FiCalendar
                  size={13}
                  className="text-blue-500 dark:text-blue-400 drop-shadow-[0_1px_2px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)] flex-shrink-0"
                />
                <p className="text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] font-normal text-gray-600 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                  تاریخ ثبت نام:{" "}
                  <span className="text-gray-800 dark:text-white font-medium">
                    ۱۴۰۴/۱۰/۲۲
                  </span>{" "}
                  —{" "}
                  <span className="text-gray-800 dark:text-white font-medium">
                    18:13:25
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationAccount;
