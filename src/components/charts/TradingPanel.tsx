import React, { useState, useCallback, useMemo } from "react";
import { AreaCard } from "./AreaCard";
import { CandleCard } from "./CandleCard";
import { ChartModal } from "./ChartModal";
import { DonutChart } from "./DonutChart";
import { cardConfigs, DEFAULT_DONUT_DATA } from "./constants";
import { translations } from "../../data/fakeData";
import type { CardConfig } from "./typesChart";

const TradingPanel: React.FC = () => {
  const [lang] = useState<"fa" | "en">("fa");
  const [selectedCard, setSelectedCard] = useState<CardConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const t = useMemo(() => (translations as any)[lang], [lang]);
  const dir = useMemo(() => (lang === "fa" ? "ltr" : "rtl"), [lang]);

  const handleCardClick = useCallback((cfg: CardConfig) => {
    setSelectedCard(cfg);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCard(null);
  }, []);

  const getCardTitle = useCallback(
    (cardId: string) => {
      const found = t.cards.find((c: any) => c.id === cardId);
      return found?.title || { fa: cardId, en: cardId };
    },
    [t.cards],
  );

  return (
    <div
      id="detailse18"
      className="h-fit flex step-test38 items-center justify-center p-2 sm:p-4 md:p-6 font-lahzeh transition-colors"
    >
      <div className="w-full max-w-8xl" dir={dir}>
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 lg:gap-6">
          <div id="detailse19" className="w-full lg:w-70 xl:w-[320px] shrink-0">
            <DonutChart data={DEFAULT_DONUT_DATA} title={t.panelTitle} />
          </div>

          <div
            id="detailse20"
            className="
              flex-1
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4 sm:gap-5 md:gap-4 lg:gap-5
              border-4
              dark:border-[#3A3A3A]
              border-gray-400
              bg-zinc-100 dark:bg-[#4340404d]
              p-3 sm:p-5 md:p-7 lg:p-9
              rounded-xl sm:rounded-2xl lg:rounded-[25px]
              transition-colors
            "
          >
            {cardConfigs.map((cfg) => {
              const title = getCardTitle(cfg.id);

              if (cfg.id === "tradeCount") {
                return (
                  <CandleCard
                    key={cfg.id}
                    cfg={cfg}
                    title={title}
                    value={cfg.value}
                    valueColor={cfg.valueColor || "#4ade80"}
                    lang={lang}
                    onCardClick={() => handleCardClick(cfg)}
                  />
                );
              }

              return (
                <AreaCard
                  key={cfg.id}
                  cfg={cfg}
                  title={title}
                  value={cfg.value}
                  valueColor={cfg.valueColor || "#4ade80"}
                  lang={lang}
                  onCardClick={() => handleCardClick(cfg)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {selectedCard && (
        <ChartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          cfg={selectedCard}
          title={getCardTitle(selectedCard.id)}
          lang={lang}
        />
      )}
    </div>
  );
};

export default TradingPanel;
