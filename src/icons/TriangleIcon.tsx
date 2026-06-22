import React from "react";
import type { TriangleIconProps } from "../types/interfaces";

const TriangleIcon: React.FC<TriangleIconProps> = ({
  width = 12,
  height = 11,
  color = "#0088FF",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.99305 2C4.76285 0.666666 5.14775 0 5.7251 0C6.30245 0 6.68735 0.666667 7.45715 2L10.4882 7.25C11.258 8.58333 11.6429 9.25 11.3543 9.75C11.0656 10.25 10.2958 10.25 8.75619 10.25H2.69401C1.15441 10.25 0.384608 10.25 0.0959325 9.75C-0.192743 9.25 0.192158 8.58333 0.961958 7.25L3.99305 2Z"
        fill={color}
      />
    </svg>
  );
};

export default TriangleIcon;
