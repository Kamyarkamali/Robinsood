import React from "react";
import TradingChartCard from "./TradingChartCard";
import { chartsData } from "../data/fakeData";

const TradingChartsGrid: React.FC = () => {
  return (
    <div className="mx-auto w-full">
      <div className="w-full h-full rounded-4xl border-4 border-gray-200 dark:border-[#353535] dark:bg-[#242424] p-4 sm:p-6">
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
        w-full
        "
        >
          {chartsData.map((chart) => (
            <TradingChartCard key={chart.id} data={chart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingChartsGrid;
