function CardShell({
  children,
  className = "",
  dir,
}: {
  children: React.ReactNode;
  className?: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div
      dir={dir}
      className={`dark:bg-linear-to-b rounded-[24.66px] dark:from-[#2C2C2C] dark:bg-[#303030] border-4 dark:border-[#303030] border-gray-400 bg-white p-4 sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default CardShell;
