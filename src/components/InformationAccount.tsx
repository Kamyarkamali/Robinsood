import CircleIcon from "../icons/CircleIcon";
import { cardInner, cardOuter } from "../styles/buttonStyles";

function InformationAccount() {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-6 p-4">
      <div className={cardOuter}>
        <div className={cardInner}>
          <div className="flex flex-col w-full gap-3 font-normal">
            <div className="grid grid-cols-3 w-full text-center items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[12px] sm:text-base md:text-[18px] font-normal text-black dark:text-white">
                  نوع اکانت
                </p>

                <p className="text-[12px] sm:text-base md:text-[18px]  font-semibold text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  پراپ فرصت‌ها
                </p>
              </div>

              {/* بالانس */}
              <div className="flex flex-col items-center gap-2">
                {/* title */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <CircleIcon color="#00A656" />
                  <p className="text-[12px] sm:text-base md:text-[18px] font-normal text-black dark:text-white">
                    بالانس
                  </p>
                </div>

                <p className="text-[13px] sm:text-xs md:text-[16px] text-[#34C759] font-normal whitespace-nowrap">
                  ۱۰,۱۵۳.۱۱ $
                </p>
                <p className="text-[9px] sm:text-sm md:text-[14px] font-semibold text-[#34C759] border-2 dark:border-[#234F35] rounded-lg px-2 py-1 bg-linear-to-r from-[#34C75926] to-[#00A65626] whitespace-nowrap">
                  +1.5% نسبت به دیروز
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-[12px] sm:text-base md:text-[18px] font-normal text-black dark:text-white">
                  اکوییتی
                </p>
                <p className="text-[11px] sm:text-xs md:text-[16px] font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  ۱۰,۰۹۳.۹۱ $
                </p>

                <p className="text-[9px] sm:text-sm md:text-[14px] font-semibold text-red-500 border-2 border-red-400 dark:border-[#234F35] rounded-lg px-2 py-1 bg-linear-to-r dark:from-[#FF383C33] dark:to-[#EB100026] whitespace-nowrap">
                  ریسک: 2%
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <p className="text-[13px] sm:text-[15px] font-normal text-gray-500 dark:text-white whitespace-nowrap">
                آخرین آپدیت ۱۴۰۴/۱۰/۲۲ , 18:13:25
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={cardOuter}>
        <div className={cardInner}>
          <div className="flex flex-col w-full gap-3 font-normal">
            <div className="flex items-start justify-between w-full px-3 gap-4">
              <div className="flex flex-col items-start gap-1 min-w-0">
                <p className="text-[12px] sm:text-base md:text-[18px] text-black font-normal dark:text-white">
                  نام چالش
                </p>

                <p className="text-[12px] sm:text-sm md:text-[13px] text-gray-500 dark:text-gray-300 wrap-break-word font-semibold">
                  چالش دو مرحله ای فرصت ها
                </p>
              </div>

              {/* وضعیت */}
              <div className="flex flex-col items-end gap-1 max-w-37.5">
                <div className="flex items-center justify-center w-full gap-2 sm:gap-3">
                  <CircleIcon color="#FF383C" />
                  <p className="text-[12px] sm:text-base md:text-[18px] text-black dark:text-white font-normal">
                    وضعیت
                  </p>
                </div>

                <p className="text-[12px] sm:text-sm md:text-[16px] text-[#FF383C] text-center font-semibold w-full whitespace-nowrap">
                  رد شده
                </p>

                <p className="text-[11px] text-center sm:text-xs md:text-[13px] font-semibold text-gray-500 dark:text-[#FF383C] leading-tight whitespace-nowrap">
                  بدلیل گذر از درادون روزانه
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between w-full px-3 gap-2">
              <p className="text-[12px] sm:text-[14px] text-gray-500 dark:text-white whitespace-nowrap font-normal">
                مرحله ۱
              </p>

              <p className="text-[12px] sm:text-[14px] text-gray-500 dark:text-gray-300 whitespace-nowrap font-normal">
                ۱۴۰۴/۱۰/۲۲ , 18:13:25
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={cardOuter}>
        <div className={cardInner}>
          <div className="flex flex-col w-full gap-6 font-normal">
            <div className="flex items-start justify-between w-full px-5">
              <div className="flex flex-col items-start gap-2">
                <p className="text-[12px] sm:text-base font-normal md:text-[18px] text-black dark:text-white">
                  شماره اکانت
                </p>

                <p className="text-xs sm:text-sm md:text-[17px] text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  ۱۴۷۹۳۲۵
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-end gap-2 sm:gap-3">
                  <CircleIcon color="#00C0E8" />
                  <p className="text-[12px] sm:text-base font-normal md:text-[18px] text-black dark:text-white">
                    وضعیت
                  </p>
                </div>

                <p className="text-xs sm:text-sm md:text-[17px] text-[#00C0E8] text-right whitespace-nowrap">
                  ۱۰,۰۰۰ $
                </p>
              </div>
            </div>

            <p className="text-[12px] sm:text-[15px] font-normal text-gray-500 dark:text-white whitespace-nowrap">
              تاریخ ثبت نام ۱۴۰۴/۱۰/۲۲ , 18:13:25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationAccount;
