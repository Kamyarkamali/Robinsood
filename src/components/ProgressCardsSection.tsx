import React from "react";
import ProgressCard from "./ProgressCard";
import { progressCardsData } from "../data/fakeData";

const ProgressCardsSection: React.FC = () => {
  return (
    <div
      id="order1"
      className="w-full  step-test14 p-4 pr-0 pl-0 md:pr-7 md:pl-7 "
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ">
        {progressCardsData.map((card) => (
          <ProgressCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default ProgressCardsSection;
