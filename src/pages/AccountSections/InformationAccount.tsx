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
        <div
          className={`${cardOuter} w-full md:flex-1 border border-[#D6DCE8]`}
        >
          <div className={`${cardInner} h-full border border-[#E3E7F0]`}>
            <div className="flex flex-col w-full h-full gap-3 font-normal px-2 py-3">
              <div className="grid grid-cols-3 w-full gap-2 sm:gap-3">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <CircleIcon color="#22B36B" />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "بالانس" : "Balance"}
                    </p>
                    <TbChartLine className="text-[#22B36B] w-3.5 h-3.5" />
                  </div>
                  <p className="text-[12px] xs:text-[13px] md:text-[14px] text-[#22B36B] font-semibold whitespace-nowrap">
                    $10256.75
                  </p>
                </div>

                {/* ستون 2: وضعیت */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <TbWallet className="text-[#4F7CFF] w-3.5 h-3.5" />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "وضعیت" : "Status"}
                    </p>
                  </div>
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-red-500 dark:text-red-600 whitespace-nowrap">
                    {i18next.language === "fa" ? "رد شده" : "Rejected"}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <CircleIcon color="#EE5A5A" />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "اکوییتی" : "Equity"}
                    </p>
                    <TbGauge className="text-[#EE5A5A] w-3.5 h-3.5" />
                  </div>
                  <p className="text-[12px] xs:text-[13px] font-bold md:text-[14px] text-[#EE5A5A] whitespace-nowrap">
                    $9318.35
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-linear-to-br bg-[#EEF1F7] dark:from-[#2a2a2a] dark:to-[#323232] w-full justify-center">
                  <BsSticky className="text-[#EE5A5A] w-3.5 h-3.5 shrink-0" />
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#EE5A5A] text-center whitespace-nowrap">
                    {i18next.language === "fa"
                      ? "گذر از لات مجاز:"
                      : "Allowed lot crossing:"}
                    <span className="text-[#5B657A] dark:text-white font-semibold">
                      {" "}
                      ۱۴۰۴/۱۰/۲۲
                    </span>
                    {" — "}
                    <span className="text-[#5B657A] dark:text-white font-medium">
                      18:13:25
                    </span>
                  </p>
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
            <div className="flex flex-col w-full h-full gap-3 font-normal px-2 py-3">
              {/* ردیف اول - 3 ستون مساوی */}
              <div className="grid grid-cols-3 w-full gap-2 sm:gap-3">
                {/* ستون 1: چالش */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src={chaleng}
                      alt="chaleng"
                      className="w-3.5 h-3.5 object-contain"
                    />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "چالش" : "Challenge"}
                    </p>
                  </div>
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {i18next.language === "fa" ? "رابین هودی" : "Robin Hood"}
                  </p>
                </div>

                {/* ستون 2: مرحله */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <FiFlag className="text-purple-500 dark:text-purple-400 w-3.5 h-3.5" />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "مرحله" : "Phase"}
                    </p>
                  </div>
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {i18next.language === "fa" ? "مرحله ۱" : "Phase 1"}
                  </p>
                </div>

                {/* ستون 3: نوع اکانت */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src={chaleng}
                      alt="chaleng"
                      className="w-3.5 h-3.5 object-contain"
                    />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#1F2430] dark:text-white whitespace-nowrap">
                      {i18next.language === "fa" ? "نوع اکانت" : "Account Type"}
                    </p>
                  </div>
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {i18next.language === "fa" ? "چالش" : "Challenge"}
                  </p>
                </div>
              </div>

              {/* ردیف دوم - باکس پایین */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-linear-to-br bg-[#EEF1F7] dark:from-[#2a2a2a] dark:to-[#323232] w-full justify-center">
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#D9A441] text-center whitespace-nowrap">
                    {i18next.language === "fa"
                      ? "شما جزو ۵٪ درصد برترین چالش هستید"
                      : "You're in the top 5% of the challenge!"}
                  </p>
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
            <div className="flex flex-col w-full h-full gap-3 font-normal px-2 py-3">
              {/* ردیف اول - 2 ستون */}
              <div className="grid grid-cols-2 w-full gap-2 sm:gap-3">
                {/* ستون 1: شماره اکانت */}
                <div
                  className="flex flex-col items-center justify-center gap-1 cursor-pointer group"
                  onClick={() => {
                    navigator.clipboard.writeText("۱۴۷۹۳۲۵");
                    toast.success(
                      i18next.language === "fa"
                        ? "شماره اکانت کپی شد"
                        : "Account number copied",
                    );
                  }}
                >
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                      {i18next.language === "fa"
                        ? "شماره اکانت"
                        : "Account Number"}
                    </p>
                    <FaHashtag className="text-gray-600 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                    ۱۴۷۹۳۲۵
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <CircleIcon color="#00C0E8" />
                    <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-black dark:text-white whitespace-nowrap">
                      {i18next.language === "fa"
                        ? "بالانس اولیه"
                        : "Initial Balance"}
                    </p>
                    <FiActivity className="text-[#00C0E8] w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] xs:text-[12px] font-bold md:text-[13px] text-[#00C0E8] whitespace-nowrap">
                    ۱۰,۰۰۰ $
                  </p>
                </div>
              </div>

              {/* ردیف دوم - باکس پایین */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-linear-to-br bg-[#EEF1F7] dark:from-[#2a2a2a] dark:to-[#323232] w-full justify-center">
                  <FiCalendar className="text-[#4F7CFF] dark:text-blue-400 w-3.5 h-3.5 shrink-0" />
                  <p className="text-[11px] xs:text-[12px] md:text-[13px] font-semibold text-[#5B657A] dark:text-gray-300 text-center whitespace-nowrap">
                    {i18next.language === "fa"
                      ? "تاریخ ثبت نام:"
                      : "Registration Date:"}
                    <span className="text-[#5B657A] dark:text-white font-semibold">
                      {" "}
                      ۱۴۰۴/۱۰/۲۲
                    </span>
                    {" — "}
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
