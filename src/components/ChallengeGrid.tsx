// components/ChallengeGrid.tsx
import { challengeCards } from "../data/fakeData";
import ChallengeCardComponent from "./ChallengeCard";

export default function ChallengeGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 p-2 sm:p-3 lg:p-4 mx-auto w-full max-w-350 place-items-center">
      {challengeCards.map((card) => (
        <ChallengeCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}
