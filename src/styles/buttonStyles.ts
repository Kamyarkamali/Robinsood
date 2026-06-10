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
