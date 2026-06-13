import { challengeCards } from "../data/fakeData";
import ChallengeCardComponent from "./ChallengeCard";

export default function ChallengeGrid() {
  return (
    <div className="flex flex-col justify-start w-full max-w-350 mx-auto">
      <h1 className="px-2 dark:text-white text-gray-500 sm:px-3 lg:px-8 mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
        پارامترهای کنترلی امروز
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 p-2 sm:p-3 lg:p-4 w-full place-items-center">
        {challengeCards.map((card) => (
          <ChallengeCardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
