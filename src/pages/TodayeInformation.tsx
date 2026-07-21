import ProgressCardsSection from "../components/ProgressCardsSection";
import TradingChartsGrid from "../components/TradingChartsGrid";

function TodayeInformation() {
  return (
    <>
      <div className="flex flex-col items-center w-full mx-auto">
        <ProgressCardsSection />
        <TradingChartsGrid />
      </div>
    </>
  );
}

export default TodayeInformation;
