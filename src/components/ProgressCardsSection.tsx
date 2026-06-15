import React from "react";
import ProgressCard from "./ProgressCard";
import { progressCardsData } from "../data/fakeData";

const ProgressCardsSection: React.FC = () => {
  return (
    <div className="flex  flex-col items-center">
      <div className="flex flex-col gap-4 p-4">
        {progressCardsData.map((card) => (
          <ProgressCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default ProgressCardsSection;
