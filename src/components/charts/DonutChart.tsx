import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DonutTooltip } from "./Tooltips";
import type { DonutAsset } from "./typesChart";
import i18next from "i18next";

interface DonutChartProps {
  data: DonutAsset[];
  title?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  return (
    <div
      className="
      border-4
        w-full
        bg-white dark:bg-[#4340404d]
       dark:border-[#3A3A3A] border-gray-400
        rounded-xl sm:rounded-2xl
        p-3 sm:p-4 md:p-5
        flex flex-col items-center justify-center
        transition-colors
      "
    >
      {title && (
        <p className="text-zinc-900 dark:text-white font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-center">
          {i18next.language === "fa" ? "ارز های معامله شده" : "Traded Assets"}
        </p>
      )}

      <div className="w-full aspect-square max-w-50 sm:max-w-60 md:max-w-70 lg:max-w-75">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
              cornerRadius={7}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="none" />
              ))}
            </Pie>

            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 min-w-0">
            <span
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-zinc-600 dark:text-white/70 text-[10px] sm:text-xs truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
