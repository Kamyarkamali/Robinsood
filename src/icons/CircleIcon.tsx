import type { FC } from "react";
import type { Circle } from "../types/interfaces";

const CircleIcon: FC<Circle> = ({ color }) => {
  return (
    <div
      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      className={`w-[8.05px] h-[8.05px] rounded-full blur-[3.02px] shadow-[0_0_6px_#FF383C]`}
    />
  );
};

export default CircleIcon;
