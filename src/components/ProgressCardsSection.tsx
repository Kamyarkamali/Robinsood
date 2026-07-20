import React from "react";
import ProgressCard from "./ProgressCard";
import { progressCardsData } from "../data/fakeData";

const ProgressCardsSection: React.FC = () => {
  return (
    <div id="order1" className="w-full step-test14 p-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ">
        {progressCardsData.map((card) => (
          <ProgressCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default ProgressCardsSection;
