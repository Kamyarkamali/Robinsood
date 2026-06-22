import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Cell,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell as PieCell,
  Tooltip as PieTooltip,
} from "recharts";
import { Settings, X } from "lucide-react";
import type { CardConfig } from "../types/interfaces";
import {
  areaDataMaxLoss,
  areaDataMaxWin,
  areaDataRiskReward,
  areaDataTodayTrades,
  areaDataTodayTrend,
  candlestickData,
  donutAssets,
  translations,
} from "../data/fakeData";
import * as Dialog from "@radix-ui/react-dialog";
import ChartSettingsPanel, {
  useChartSettings,
} from "../components/common/ChartCustomSettings";

const cardConfigs: CardConfig[] = [
  {
    id: "riskReward",
    value: "متعادل",
    valueColor: "#4ade80",
    chartType: "area-green",
    data: areaDataRiskReward,
    gradientFrom: "rgba(74,222,128,0.25)",
    gradientTo: "rgba(74,222,128,0.0)",
    strokeColor: "#4ade80",
  },
  {
    id: "todayTrend",
    value: "+۳۰",
    valueColor: "#4ade80",
    chartType: "area-green",
    data: areaDataTodayTrend,
    gradientFrom: "rgba(74,222,128,0.25)",
    gradientTo: "rgba(74,222,128,0.0)",
    strokeColor: "#4ade80",
  },
  {
    id: "todayTrades",
    value: "+۳۰",
    valueColor: "#F5A623",
    chartType: "area-orange",
    data: areaDataTodayTrades,
    gradientFrom: "rgba(245,166,35,0.28)",
    gradientTo: "rgba(245,166,35,0.0)",
    strokeColor: "#F5A623",
  },
  {
    id: "tradeCount",
    value: "۷۳",
    valueColor: "#ffffff",
    chartType: "candlestick",
    data: candlestickData,
    gradientFrom: "",
    gradientTo: "",
    strokeColor: "",
  },
  {
    id: "maxWinStreak",
    value: "-۳۰",
    valueColor: "#f87171",
    chartType: "area-red",
    data: areaDataMaxWin,
    gradientFrom: "rgba(248,113,113,0.28)",
    gradientTo: "rgba(248,113,113,0.0)",
    strokeColor: "#f87171",
  },
  {
    id: "maxLossStreak",
    value: "+۳۰",
    valueColor: "#4ade80",
    chartType: "area-green",
    data: areaDataMaxLoss,
    gradientFrom: "rgba(74,222,128,0.25)",
    gradientTo: "rgba(74,222,128,0.0)",
    strokeColor: "#4ade80",
  },
];

const AreaTooltip = ({
  active,
  payload,
  label,
  lang,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  lang: "fa" | "en";
}) => {
  // @ts-ignore
  const t = translations[lang];
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1">
        {t.tooltipDate}: {label}
      </p>
      <p className="text-white font-bold">
        {t.tooltipValue}:{" "}
        <span className="text-green-400">{payload[0].value}</span>
      </p>
    </div>
  );
};

const CandleTooltip = ({
  active,
  payload,
  label,
  lang,
}: {
  active?: boolean;
  payload?: {
    payload: { open: number; close: number; high: number; low: number };
  }[];
  label?: string;
  lang: "fa" | "en";
}) => {
  // @ts-ignore
  const t = translations[lang];
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const isBull = d.close >= d.open;
  return (
    <div className="border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl space-y-0.5">
      <p className="text-gray-400 mb-1">
        {t.tooltipDate}: {label}
      </p>
      <p className="text-white">
        {t.tooltipOpen}:{" "}
        <span className={isBull ? "text-green-400" : "text-red-400"}>
          {d.open}
        </span>
      </p>
      <p className="text-white">
        {t.tooltipClose}:{" "}
        <span className={isBull ? "text-green-400" : "text-red-400"}>
          {d.close}
        </span>
      </p>
      <p className="text-white">
        {t.tooltipHigh}: <span className="text-gray-300">{d.high}</span>
      </p>
      <p className="text-white">
        {t.tooltipLow}: <span className="text-gray-300">{d.low}</span>
      </p>
    </div>
  );
};

const AreaCard = ({
  cfg,
  title,
  value,
  valueColor,
  lang,
  onCardClick,
}: {
  cfg: CardConfig;
  title: string;
  value: string | number;
  valueColor: string;
  lang: "fa" | "en";
  onCardClick?: () => void;
}) => {
  const gradId = `grad-${cfg.id}`;
  return (
    <div
      className="relative rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[170px] cursor-pointer hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
      onClick={onCardClick}
    >
      <div className="flex justify-between items-start px-4 pt-3 pb-1">
        <span className="text-white/70 text-sm font-bold leading-snug whitespace-pre-line text-right">
          {title}
        </span>
        <span
          className="text-base font-extrabold"
          style={{ color: valueColor, direction: "ltr" }}
        >
          {value}
        </span>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={cfg.data}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={cfg.strokeColor}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={cfg.strokeColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip
              content={(p) => (
                <AreaTooltip
                  active={p.active}
                  // @ts-ignore
                  payload={p.payload as { value: number }[]}
                  label={p.label as string}
                  lang={lang}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke={cfg.strokeColor}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: cfg.strokeColor,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CandleCard = ({
  cfg,
  title,
  value,
  lang,
  onCardClick,
}: {
  cfg: CardConfig;
  title: string;
  value: string | number;
  lang: "fa" | "en";
  onCardClick?: () => void;
}) => {
  const CandleBody = (props: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    index?: number;
    payload?: { open: number; close: number; high: number; low: number };
  }) => {
    const { x = 0, y = 0, width = 0, height = 0, payload } = props;
    if (!payload) return null;
    const isBull = payload.close >= payload.open;
    const color = isBull ? "#4ade80" : "#f87171";
    const cx = x + width / 2;

    return (
      <g>
        <line
          x1={cx}
          y1={y - 4}
          x2={cx}
          y2={y + height + 4}
          stroke={color}
          strokeWidth={1.5}
        />
        <rect
          x={x + 1}
          y={y}
          width={width - 2}
          height={Math.max(height, 2)}
          fill={color}
          rx={1}
        />
      </g>
    );
  };

  const bodyData = cfg.data.map((d) => ({
    t: d.t,
    body: Math.abs((d.close ?? 0) - (d.open ?? 0)),
    base: Math.min(d.close ?? 0, d.open ?? 0),
    open: d.open ?? 0,
    close: d.close ?? 0,
    high: d.high ?? 0,
    low: d.low ?? 0,
  }));

  return (
    <div
      className="relative rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[170px] cursor-pointer hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
      onClick={onCardClick}
    >
      <div className="flex justify-between items-center px-4 pt-3 pb-1">
        <span className="text-white/70 text-sm font-bold leading-snug text-right">
          {title}
        </span>
        <span
          className="text-white text-xl font-extrabold"
          style={{ direction: "ltr" }}
        >
          {value}
        </span>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={bodyData}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
            barCategoryGap="20%"
          >
            <XAxis dataKey="t" hide />
            <YAxis hide domain={[0, 80]} />
            <Tooltip
              content={(p) => (
                <CandleTooltip
                  active={p.active}
                  payload={
                    // @ts-ignore

                    p.payload as {
                      payload: {
                        open: number;
                        close: number;
                        high: number;
                        low: number;
                      };
                    }[]
                  }
                  label={p.label as string}
                  lang={lang}
                />
              )}
            />
            <Bar
              dataKey="body"
              shape={(props: object) => (
                <CandleBody {...(props as Parameters<typeof CandleBody>[0])} />
              )}
            >
              {bodyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.close >= entry.open ? "#4ade80" : "#f87171"}
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DonutTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p style={{ color: p.payload.color }} className="font-bold">
        {p.name}
      </p>
      <p className="text-white">{p.value}%</p>
    </div>
  );
};

const ChartModal = ({
  isOpen,
  onClose,
  cfg,
  title,
  lang,
}: {
  isOpen: boolean;
  onClose: () => void;
  cfg: CardConfig;
  title: string;
  lang: "fa" | "en";
}) => {
  if (!cfg) return null;

  const renderChart = () => {
    if (cfg.chartType === "candlestick") {
      const bodyData = cfg.data.map((d) => ({
        t: d.t,
        body: Math.abs((d.close ?? 0) - (d.open ?? 0)),
        open: d.open ?? 0,
        close: d.close ?? 0,
        high: d.high ?? 0,
        low: d.low ?? 0,
      }));

      return (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={bodyData} barCategoryGap="20%">
            <XAxis dataKey="t" />
            <YAxis domain={[0, "auto"]} />
            <Tooltip
              content={(p) => (
                <CandleTooltip
                  active={p.active}
                  payload={
                    // @ts-ignore
                    p.payload as {
                      payload: {
                        open: number;
                        close: number;
                        high: number;
                        low: number;
                      };
                    }[]
                  }
                  label={p.label as string}
                  lang={lang}
                />
              )}
            />
            <Bar
              dataKey="body"
              shape={(props: object) => {
                const {
                  x = 0,
                  y = 0,
                  width = 0,
                  height = 0,
                  payload,
                } = props as any;
                if (!payload) return null;
                const isBull = payload.close >= payload.open;
                const color = isBull ? "#4ade80" : "#f87171";
                const cx = x + width / 2;
                return (
                  <g>
                    <line
                      x1={cx}
                      y1={y - 4}
                      x2={cx}
                      y2={y + height + 4}
                      stroke={color}
                      strokeWidth={1.5}
                    />
                    <rect
                      x={x + 1}
                      y={y}
                      width={width - 2}
                      height={Math.max(height, 2)}
                      fill={color}
                      rx={1}
                    />
                  </g>
                );
              }}
            >
              {bodyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.close >= entry.open ? "#4ade80" : "#f87171"}
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    // Area chart
    const gradId = `modal-grad-${cfg.id}`;
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={cfg.data}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={cfg.strokeColor}
                stopOpacity={0.35}
              />
              <stop offset="100%" stopColor={cfg.strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip
            content={(p) => (
              <AreaTooltip
                active={p.active}
                // @ts-ignore
                payload={p.payload as { value: number }[]}
                label={p.label as string}
                lang={lang}
              />
            )}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={cfg.strokeColor}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-4xl max-h-[85vh] bg-[#0f0f1a] rounded-2xl border border-[#2a2a4a] shadow-2xl z-50 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2a4a]">
            <h2 className="text-white font-bold text-xl">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2a2a4a] rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="h-[400px] w-full">{renderChart()}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TradingPanel() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  // @ts-ignore
  const t = translations[lang];
  const dir = lang === "fa" ? "ltr" : "rtl";

  const { settings, setSettings, isOpen, openSettings, closeSettings } =
    useChartSettings("tradingPanelSettings");

  const [selectedCard, setSelectedCard] = useState<CardConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (cfg: CardConfig) => {
    setSelectedCard(cfg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-lahzeh">
      <button
        onClick={() => setLang(lang === "fa" ? "en" : "fa")}
        className="fixed top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 transition-all"
      >
        {lang === "fa" ? "EN" : "FA"}
      </button>

      <button
        onClick={openSettings}
        className="fixed top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg border border-white/10 transition-all"
      >
        <Settings className="w-5 h-5" />
      </button>

      <div className="w-full max-w-[1100px]" dir={dir}>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="dark:bg-linear-to-b dark:from-[#4340404d] dark:to-purple-[#FDFDFD] rounded-2xl border border-white/5 p-5 flex flex-col items-center justify-center min-w-[240px] md:w-[270px]">
            <p className="text-white font-bold text-lg mb-4 text-center">
              {t.panelTitle}
            </p>
            <PieChart width={170} height={170}>
              <Pie
                data={donutAssets}
                cx={80}
                cy={80}
                innerRadius={52}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {donutAssets.map((entry, index) => (
                  <PieCell
                    key={`pc-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <PieTooltip content={<DonutTooltip />} />
            </PieChart>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3">
              {donutAssets.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: a.color }}
                  />
                  <span className="text-white/70 text-xs">{a.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-3 bg-[#4340404d] dark:to-purple-[#FDFDFD] p-9 rounded-[25px]">
            {cardConfigs.map((cfg) => {
              // @ts-ignore
              const cardI18n = t.cards.find((c) => c.id === cfg.id)!;
              if (cfg.chartType === "candlestick") {
                return (
                  <CandleCard
                    key={cfg.id}
                    cfg={cfg}
                    title={cardI18n.title}
                    value={cfg.value}
                    lang={lang}
                    onCardClick={() => handleCardClick(cfg)}
                  />
                );
              }
              return (
                <AreaCard
                  key={cfg.id}
                  cfg={cfg}
                  title={cardI18n.title}
                  value={cfg.value}
                  valueColor={cfg.valueColor}
                  lang={lang}
                  onCardClick={() => handleCardClick(cfg)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <ChartSettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={isOpen}
        onClose={closeSettings}
      />

      {selectedCard && (
        <ChartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          cfg={selectedCard}
          title={
            // @ts-ignore
            t.cards.find((c) => c.id === selectedCard.id)?.title ||
            selectedCard.id
          }
          lang={lang}
        />
      )}
    </div>
  );
}
