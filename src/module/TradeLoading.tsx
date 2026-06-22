import { t } from "i18next";
import { Puff } from "react-loader-spinner";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-[#070a12]/90 backdrop-blur-2xl transition-opacity duration-500">
      {/* Glow background */}
      <div className="absolute w-75 h-75 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />

      <div className="relative flex flex-col items-center justify-center px-10 py-8 rounded-2xl border border-emerald-500/10 bg-gradient-to-b from-[#121826] to-[#070a12] shadow-[0_0_80px_rgba(0,255,150,0.08)]">
        <div className="absolute w-44 h-44 rounded-full border border-emerald-400/10 animate-ping" />

        <Puff
          visible={true}
          height="90"
          width="90"
          color="#00ff9d"
          ariaLabel="loading"
        />

        <div className="mt-5 text-center z-10">
          <p className="text-sm font-medium text-gray-100 tracking-wide">
            {t("loader.title")}
          </p>

          <p className="text-xs text-gray-500 mt-1 animate-pulse">
            {t("loader.title2")}
          </p>
        </div>
      </div>
    </div>
  );
}
