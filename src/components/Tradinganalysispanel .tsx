import i18next from "i18next";
import {
  COMMENT,
  DATE,
  LABELS,
  RADAR_VALUES,
  STATS,
  TOTAL,
} from "../data/fakeData";
import type { Lang } from "../types/type";

const toFa = (n: number) =>
  n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
const numStr = (n: number, lang: Lang) => (lang === "fa" ? toFa(n) : String(n));

function polarXY(deg: number, r: number, cx = 135, cy = 135) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function RadarChart({ labels }: { labels: string[] }) {
  const cx = 135,
    cy = 135,
    R = 70,
    n = 6;
  const rings = [17.5, 35, 52.5, 70];

  const ringPts = (r: number) =>
    Array.from({ length: n }, (_, i) => {
      const p = polarXY(60 * i, r);
      return `${p.x},${p.y}`;
    }).join(" ");

  const dataPts = RADAR_VALUES.map((v, i) => {
    const p = polarXY(60 * i, (v / 100) * R);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <div className="w-full h-full overflow-visible">
      <svg viewBox="0 0 270 270" className="w-full h-full overflow-visible">
        {rings.map((r) => (
          <polygon
            className="radar-grid"
            key={r}
            points={ringPts(r)}
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const p = polarXY(60 * i, R);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.13)"
              strokeWidth="1"
            />
          );
        })}
        <polygon
          points={dataPts}
          fill="rgba(180,30,40,0.55)"
          stroke="#c0392b"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {RADAR_VALUES.map((v, i) => {
          const p = polarXY(60 * i, (v / 100) * R);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="#c0392b" />
              <circle cx={p.x} cy={p.y} r={2} fill="#fff" />
            </g>
          );
        })}
        {labels.map((lbl, i) => {
          const p = polarXY(60 * i, R + 32);
          const anchor =
            Math.abs(p.x - cx) < 10 ? "middle" : p.x < cx ? "end" : "start";
          const dy = Math.abs(p.y - cy) < 10 ? "0.3em" : "0";
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="9"
              dy={dy}
              className="fill-black/70 dark:fill-white"
              style={{
                paintOrder: "stroke",
                strokeWidth: "3px",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function TradingAnalysisPanel() {
  const lang = i18next.language as Lang;
  const c = COMMENT[lang];
  const mx = numStr(100, lang);

  return (
    <>
      <div
        id="ai1"
        className="w-full max-w-8xl mx-auto mt-3 grid place-items-center p-4 translate-y-7"
      >
        <div
          dir={lang === "fa" ? "ltr" : "rtl"}
          className="
          w-full
          rounded-3xl
          bg-white
          dark:bg-[#2b2b2b]
          text-gray-800
          dark:text-white
          flex flex-col
          lg:flex-row
          relative
          p-0.5
        "
          style={{
            background: `linear-gradient(135deg, #CB30E0, #FF2D55)`,
          }}
        >
          <div className="flex-1 bg-white dark:bg-linear-to-b dark:from-[#2C2C2C] dark:bg-[#303030] rounded-3xl overflow-hidden flex flex-col lg:flex-row">
            <section
              id="ai3"
              className="
            w-full
            lg:w-[40%]
            flex items-center justify-center
            p-2 sm:p-4 md:p-6
            border-b lg:border-b-0 lg:border-r
            border-gray-200
            dark:border-white/10
            overflow-visible
          "
            >
              <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] aspect-square overflow-visible">
                <RadarChart labels={LABELS[lang]} />
              </div>
            </section>

            <section
              id="ai2"
              className="
            w-full
            lg:w-[25%]
            flex flex-col justify-center
            px-4 sm:px-6 md:px-8
            py-4 sm:py-6 md:py-8
            border-b lg:border-b-0 lg:border-r
            border-gray-200
            dark:border-white/10
          "
            >
              <div
                dir={lang === "fa" ? "rtl" : "ltr"}
                className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col items-center"
              >
                {STATS[lang].map((s, i) => (
                  <div
                    key={i}
                    className="text-center flex items-center justify-between w-full max-w-[200px]"
                  >
                    <span
                      className={`
                    text-[14px] sm:text-[15px] md:text-[16px] font-normal text-gray-600 dark:text-white/70
                  `}
                    >
                      {s.label}
                    </span>
                    <span
                      className={`
                    text-[18px] sm:text-[20px] md:text-[22px] font-bold
                    ${
                      i === 0
                        ? "text-[#FFD233] dark:text-[#FFD233]"
                        : i === 1
                          ? "text-[#00E1D4] dark:text-[#00E1D4]"
                          : "text-[#29D8FF] dark:text-[#29D8FF]"
                    }
                  `}
                    >
                      {numStr(s.value, lang)}
                      <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal opacity-70 text-gray-600 dark:text-white/50">
                        /{mx}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div
                dir={lang === "fa" ? "rtl" : "ltr"}
                className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-white/10"
              >
                <div className="flex items-center justify-between w-full max-w-[200px] mx-auto">
                  <span className="text-[14px] sm:text-[15px] md:text-[16px] font-normal text-gray-600 dark:text-white/70">
                    {TOTAL[lang].label}
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00C8B3] dark:text-[#00C8B3]">
                    {numStr(TOTAL[lang].value, lang)}
                    <span className="text-sm sm:text-base md:text-lg font-normal opacity-70 text-gray-600 dark:text-white/50">
                      /{mx}
                    </span>
                  </span>
                </div>
              </div>
            </section>

            <section
              id="ai1"
              className="
            w-full
            lg:w-[35%]
            flex flex-col
            justify-between
            px-4 sm:px-6 md:px-8
            py-4 sm:py-6 md:py-8
          "
            >
              <div className="flex flex-col w-full items-end">
                <div className="text-right font-normal text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 dark:text-white/70 mb-3 sm:mb-4">
                  {DATE[lang]}
                </div>

                <div
                  className="w-full text-right"
                  dir={lang === "fa" ? "rtl" : "ltr"}
                >
                  <p
                    className={` ${i18next.language === "fa" ? "text-right" : "text-left"} text-gray-900 dark:text-white text-[13px] sm:text-[14px] md:text-[15px] font-bold mb-2`}
                  >
                    {c.bold}
                  </p>
                  <p className="text-gray-600 dark:text-white/72 text-[11px] sm:text-[12px] md:text-[13px] leading-[1.8] sm:leading-[2] md:leading-[2.1] font-normal text-justify">
                    {c.body}
                  </p>
                </div>
              </div>

              <div
                dir={lang === "fa" ? "rtl" : "ltr"}
                className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-white/10"
              >
                <div className="bg-gray-50 dark:bg-[#3A3A3A] rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-[12px] font-medium text-gray-500 dark:text-neutral-400">
                      {lang === "fa" ? "آخرین آپدیت" : "Last Update"}
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-bold text-gray-700 dark:text-white">
                      {c.daily}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-neutral-500">
                      {lang === "fa" ? "تاریخ" : "Date"}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-gray-600 dark:text-white/80">
                      {DATE[lang]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-neutral-500">
                      {lang === "fa" ? "ساعت" : "Time"}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-gray-600 dark:text-white/80">
                      {new Date().toLocaleTimeString(
                        lang === "fa" ? "fa-IR" : "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
