export const buttonStyles = {
  active:
    "bg-gradient-to-r from-[#8777FF] to-[#812DFF] text-white shadow-[0_8px_20px_rgba(135,119,255,0.25)]",

  darkInactive:
    "dark:bg-[#282828] dark:text-white dark:border-transparent dark:shadow-xl",

  lightInactive: `
    bg-gray-50
    text-gray-700
    border-2 border-gray-200
    shadow-sm
    hover:shadow-lg
    hover:border-[#8777FF]
    hover:-translate-y-1
    transition-all duration-300
  `,

  baseButton: "cursor-pointer transition-all duration-300 rounded-xl font-bold",
};

// ---------------------------------------------------------------------------------------------------
//  (کارت اصلی)
export const cardOuter =
  "w-full sm:w-85 md:w-105 lg:w-105.75 h-41.25 " +
  "flex items-center justify-center " +
  "rounded-4xl p-3 " +
  "bg-white dark:bg-[#282828] " +
  "border border-[#00000010] dark:border-[#FDFDFD1A] " +
  "shadow-[10px_10px_25px_rgba(0,0,0,0.12),-10px_-10px_25px_rgba(255,255,255,0.7)] " +
  "dark:shadow-[12px_12px_30px_rgba(0,0,0,0.6),-6px_-6px_12px_rgba(255,255,255,0.05)] " +
  "transition-all duration-300";

//  (نئومورفیسم داخل)
export const cardInner =
  "w-full h-full p-4 rounded-4xl " +
  "flex items-center justify-center " +
  "bg-gradient-to-b from-white/40 to-white/10 dark:from-[#1f1f1f] dark:to-[#2a2a2a] " +
  "border border-[#00000010] dark:border-[#FDFDFD1A] " +
  "shadow-[inset_6px_6px_14px_rgba(0,0,0,0.12),inset_-6px_-6px_14px_rgba(255,255,255,0.6),0_18px_35px_-12px_rgba(0,0,0,0.25)] " +
  "dark:shadow-[inset_6px_6px_14px_rgba(0,0,0,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.05),0_20px_40px_-12px_rgba(0,0,0,0.7)]";
// ---------------------------------------------------------------------------------------------------
