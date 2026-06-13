import React from "react";
import ProgressCard from "./ProgressCard";
import { progressCardsData } from "../data/fakeData";

const ProgressCardsSection: React.FC = () => {
  return (
    <div
      className="flex flex-col gap-4 p-4 min-h-screen"
      style={{ background: "#1a1a2e", direction: "rtl" }}
    >
      {progressCardsData.map((card) => (
        <ProgressCard key={card.id} data={card} />
      ))}
    </div>
  );
};

export default ProgressCardsSection;
