import type { ButtonProps } from "../../types/interfaces";

function Button({
  children,
  href,
  bgColor = "bg-blue-500",
  textColor = "dark:text-white text-gray-800",
  width = "w-auto",
  textStyle = "text-[16px]",
  height = "",
  className = "",
  fontBold = "",
  borderRadios = "",
  hover = "",
  onClick,
}: ButtonProps) {
  const styles = `
    ${bgColor}
    ${textColor}
    ${width}
    ${height}
    ${textStyle}
    ${fontBold}
    ${borderRadios}
    ${hover}
    rounded-lg
    flex
    items-center
    justify-center
    transition
    hover:opacity-90
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

export default Button;
