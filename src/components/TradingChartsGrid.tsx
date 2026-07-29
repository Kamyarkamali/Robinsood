import React from "react";
import TradingChartCard from "./TradingChartCard";
import { chartsData } from "../data/fakeData";

const TradingChartsGrid: React.FC = () => {
  return (
    <div className="mx-auto w-full">
      <div className="w-ful step-test15  h-full p-4 sm:p-6">
        <div
          id="order2"
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
