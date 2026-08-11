import { FaHashtag } from "react-icons/fa";
import toast from "react-hot-toast";
import { FiActivity, FiFlag } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import chaleng from "../../assets/images/chaleng.png";
import i18next from "i18next";
import { BsSticky } from "react-icons/bs";
import { cardInner, cardOuter } from "../../styles/buttonStyles";
import CircleIcon from "../../icons/CircleIcon";
import { TbWallet } from "react-icons/tb";
import { TbChartLine } from "react-icons/tb";
import { TbGauge } from "react-icons/tb";

function InformationAccount() {
  return (
    <div className="w-full flex justify-center items-center px-2 sm:px-4 py-4 min-h-[calc(100vh-120px)]">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-4">
        {/* کارت اول */}
        <div
          className={`${cardOuter} w-full md:flex-1 border border-[#D6DCE8]`}
        >
          <div className={`${cardInner} h-full border border-[#E3E7F0]`}>
            <div className="flex flex-col w-full h-full gap-2.5 font-normal pr-2 pb-1">
              <div className="grid grid-cols-3 w-full text-center items-stretch gap-3 sm:gap-4">
                <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                  <div className="flex items-center justify-center gap-1 xs:gap-2">
                    <CircleIcon color="#22B36B" />
                    <div className="flex items-center gap-1">
                      <p className="text-[11px] xs:text-[12px] md:text-[14px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                        {i18next.language === "fa" ? " بالانس" : "Live Balance"}
                      </p>
                      <TbChartLine color="22B36B" />
                    </div>
                  </div>
                  <p className="text-[12px] xs:text-[13px] md:text-[15px] text-[#22B36B] font-semibold whitespace-nowrap">
                    $10256.75
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-2 py-1.5">
                  <div className="flex items-center gap-1">
                    <p className="text-[11px] xs:text-[12px] md:text-[14px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "وضعیت" : "Status"}
                    </p>
                    <TbWallet color="#4F7CFF" />
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <CircleIcon color="#00C0E8" />
                    <p className="text-[11px] xs:text-[12px] md:text-[11px] font-semibold text-red-500 dark:text-red-600 whitespace-nowrap">
                      {i18next.language === "fa" ? "رد شده" : "Rejected"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                  <div className="flex pt-1 items-center justify-center gap-1.5 xs:gap-2 sm:gap-2.5">
                    <div className="flex items-center gap-1">
                      <CircleIcon color="#EE5A5A" />
                      <div className="flex items-center gap-1">
                        <p className="text-[11px] xs:text-[12px] md:text-[14px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                          {i18next.language === "fa" ? "اکوییتی" : "Equity"}
                        </p>
                        <TbGauge color="#EE5A5A" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] xs:text-[13px] md:text-[15px] font-normal text-[#EE5A5A] whitespace-nowrap">
                    $9318.35
                  </p>
                </div>

                <div className="col-span-3">
                  <div className="flex justify-center px-1 sm:px-3 md:px-5 -mt-1">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-linear-to-br bg-[#EEF1F7] dark:from-[#2a2a2a] dark:to-[#323232] w-full sm:w-auto justify-center">
                      <BsSticky size={13} className="text-[#EE5A5A] shrink-0" />
                      <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-[13px] font-normal text-[#EE5A5A] text-center whitespace-normal sm:whitespace-nowrap leading-tight">
                        {i18next.language === "fa"
                          ? "گذر از لات مجاز"
                          : "Allowed lot crossing:"}
                        <span className="text-[#5B657A] dark:text-white font-medium">
                          {" "}
                          ۱۴۰۴/۱۰/۲۲
                        </span>{" "}
                        —{" "}
                        <span className="text-[#5B657A] dark:text-white font-medium">
                          18:13:25
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* کارت دوم */}
        <div
          className={`${cardOuter} w-full md:flex-1 border border-[#D6DCE8]`}
          id="step-title2"
        >
          <div
            dir="ltr"
            className={`${cardInner} h-full border border-[#E3E7F0]`}
          >
            <div className="flex flex-col w-full h-full gap-2.5 font-normal">
              <div className="grid grid-cols-3 w-full text-center items-stretch gap-3 sm:gap-4">
                <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                  <div className="flex items-center justify-center gap-1 xs:gap-2">
                    <img
                      src={chaleng}
                      alt="chaleng"
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 object-contain"
                    />
                    <p className="text-[11px] xs:text-[12px] md:text-[14px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "چالش" : "Challenge"}
                    </p>
                  </div>
                  <p className="text-[12px] xs:text-[13px] md:text-[15px] font-normal text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {i18next.language === "fa" ? "رابین هودی" : "Robin Hood"}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                  <div className="flex items-center justify-center gap-1 xs:gap-2">
                    <FiFlag className="text-purple-500 dark:text-purple-400 w-3.5 h-3.5" />
                    <p className="text-[11px] xs:text-[12px] md:text-[14px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "مرحله" : "Phase"}
                    </p>
                  </div>
                  <p className="text-[12px] xs:text-[13px] md:text-[15px] font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {i18next.language === "fa" ? "مرحله ۱" : "Phase 1"}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 py-1.5">
                  <div className="flex items-center justify-center gap-1 xs:gap-2">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0">
                      <img
                        src={chaleng}
                        alt="chaleng"
                        className="w-3.5 h-3.5 xs:w-4 xs:h-4 object-contain"
                      />
                    </div>
                    <p className="text-[11px] xs:text-[12px] md:text-[14px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "نوع اکانت" : "Account Type"}
                    </p>
                  </div>
                  <p className="text-[12px] xs:text-[13px] md:text-[15px] font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {i18next.language === "fa" ? "چالش" : "Challenge"}
                  </p>
                </div>

                <div className="col-span-3">
                  <div className="flex justify-center px-1 sm:px-3 md:px-5">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-linear-to-br bg-[#EEF1F7] dark:from-[#2a2a2a] dark:to-[#323232] w-full sm:w-auto justify-center">
                      <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-[13px] font-normal text-[#D9A441] text-center whitespace-normal sm:whitespace-nowrap leading-tight">
                        {i18next.language === "fa"
                          ? "شما جزو ۵٪ درصد برترین چالش هستید"
                          : "You're in the top 5% of the challenge!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* کارت سوم */}
        <div
          className={`${cardOuter} w-full md:flex-1 border border-[#D6DCE8]`}
          id="step-title3"
        >
          <div className={`${cardInner} h-full border border-[#E3E7F0]`}>
            <div className="flex flex-col w-full h-full gap-4 font-normal">
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
                    <p className="text-[10px] xs:text-[11px] sm:text-[13px] md:text-[16px] font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">
                      {i18next.language === "fa"
                        ? "شماره اکانت"
                        : "Account Number"}
                    </p>
                    <FaHashtag
                      size={14}
                      className="text-gray-600 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 shrink-0"
                    />
                  </div>
                  <p className="text-[9px] mt-3 mx-auto xs:text-[10px] sm:text-[12px] md:text-[15px] text-gray-500 dark:text-gray-300 whitespace-nowrap group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    ۱۴۷۹۳۲۵
                  </p>
                </div>

                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <div className="flex items-center justify-end gap-1">
                    <CircleIcon color="#00C0E8" />
                    <p className="text-[10px] xs:text-[11px] sm:text-[13px] md:text-[16px] font-semibold text-black dark:text-white whitespace-nowrap">
                      {i18next.language === "fa"
                        ? "بالانس اولیه"
                        : "Initial Balance"}
                    </p>
                    <FiActivity size={14} className="text-[#00C0E8] shrink-0" />
                  </div>
                  <p className="text-[9px] mt-3 xs:text-[10px] sm:text-[12px] md:text-[15px] text-[#5B657A] text-right whitespace-nowrap">
                    ۱۰,۰۰۰ $
                  </p>
                </div>
              </div>

              <div className="flex justify-center px-1 sm:px-3 md:px-5 mt-1">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-linear-to-br bg-[#EEF1F7] dark:from-[#2a2a2a] dark:to-[#323232] w-full sm:w-auto justify-center">
                  <FiCalendar
                    size={13}
                    className="text-[#4F7CFF] dark:text-blue-400 shrink-0"
                  />
                  <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-[13px] font-normal text-[#5B657A] dark:text-gray-300 text-center whitespace-normal sm:whitespace-nowrap leading-tight">
                    {i18next.language === "fa"
                      ? "تاریخ ثبت نام:"
                      : "Registration Date:"}
                    <span className="text-[#5B657A] dark:text-white font-medium">
                      {" "}
                      ۱۴۰۴/۱۰/۲۲
                    </span>{" "}
                    —{" "}
                    <span className="text-[#5B657A] dark:text-white font-medium">
                      18:13:25
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationAccount;
