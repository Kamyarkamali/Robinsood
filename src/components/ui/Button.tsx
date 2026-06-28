import type { ButtonProps } from "../../types/interfaces";

type HoverVariant = "default" | "trading";

const hoverStyles: Record<HoverVariant, string> = {
  default: "",
  trading: `
    relative overflow-hidden
    transition-all duration-300
    hover:-translate-y-0.5
    hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]
    hover:border-blue-400/40
    before:content-['']
    before:absolute
    before:top-0
    before:-left-full
    before:w-full
    before:h-full
    before:bg-gradient-to-r
    before:from-transparent
    before:via-white/10
    before:to-transparent
    before:transition-all
    before:duration-500

    hover:before:left-full
  `,
};

function Button({
  children,
  href,
  bgColor = "bg-[#2a2a2a]",
  textColor = "text-white",
  width = "w-auto",
  textStyle = "text-[16px]",
  height = "",
  className = "",
  fontBold = "",
  borderRadios = "rounded-xl",
  hoverVariant = "default",
  onClick,
  gradientBorder = false,
}: ButtonProps & { hoverVariant?: HoverVariant }) {
  const baseStyles = `
    relative
    ${bgColor}
    ${textColor}
    ${width}
    ${height}
    ${textStyle}
    ${fontBold}
    ${borderRadios}
    ${hoverStyles[hoverVariant] ?? ""}
    flex
    items-center
    justify-center
    transition
    ${className}
  `;

  const gradientBorderStyle = gradientBorder
    ? {
        border: "1.5px solid transparent",
        backgroundImage: `
          linear-gradient(#2a2a2a, #2a2a2a),
          linear-gradient(to bottom,
            rgba(253,253,253,0.40),
            rgba(253,253,253,0.01),
            rgba(253,253,253,0.01),
            rgba(253,253,253,0.10)
          )
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }
    : {};

  if (href) {
    return (
      <a href={href} className={baseStyles} style={gradientBorderStyle}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseStyles}
      style={gradientBorderStyle}
    >
      {children}
    </button>
  );
}

export default Button;
