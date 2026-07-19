import React from "react";
import { useTranslation } from "react-i18next";

const PassAccountModalContent2: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("passAccount.title")}
      </h2>
      <div className="space-y-4">
        <p className="text-gray-300">{t("passAccount.description")}</p>
        <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
          {t("passAccount.submit")}
        </button>
      </div>
    </div>
  );
};

export default PassAccountModalContent2;
