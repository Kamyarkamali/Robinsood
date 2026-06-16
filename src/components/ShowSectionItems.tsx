import { useTranslation } from "react-i18next";
import type { ShowSectionItemsProps } from "../types/interfaces";
import ShowAllItems from "../pages/ShowAllItems";
import ChallengeGrid from "./ChallengeGrid";
import WellcomeComponent from "./WellcomeComponent";
import DetailseComponent from "./DetailseComponent";
import InformationAccount from "./InformationAccount";

function ShowSectionItems({ activeId }: ShowSectionItemsProps) {
  const { t } = useTranslation();

  ///دیتاهای گرفته شده بر اساس مضوع به صورت کامپوننت های جدا باید در شرط  جاری نمایش داده بشن-شرط  فعلی استاتیک است
  switch (activeId) {
    case 1:
      return (
        <div className="md:text-[32px] dark:text-white text-gray-500 text-[20px] font-lahzeh font-bold">
          <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
            نمایش تمام آیتم ها
          </h1>
          <ShowAllItems />
        </div>
      );

    case 2:
      return (
        <div>
          <h1 className=" dark:text-white text-gray-700 lg:px-8 md:px-3 sm:px-5 px-8  mb-4 text-[15px] sm:text-[17px] md:text-[25px] lg:text-[32px] font-bold">
            بخش اطلاعات چالش
          </h1>
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <WellcomeComponent />
          </div>
          <div className="w-full lg:w-auto flex justify-start mt-8">
            <DetailseComponent />
          </div>
          <div className="w-full lg:w-auto flex justify-start mt-8">
            <InformationAccount />
          </div>
        </div>
      );

    case 3:
      return (
        <div className="w-full lg:w-auto flex justify-start mt-8">
          <ChallengeGrid />
        </div>
      );

    case 4:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item4")}
        </div>
      );

    case 5:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item5")}
        </div>
      );

    case 6:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item6")}
        </div>
      );

    case 7:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item6")}
        </div>
      );

    case 8:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item7")}
        </div>
      );

    case 9:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item8")}
        </div>
      );

    case 10:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item9")}
        </div>
      );
    default:
      return (
        <div className="md:text-[32px] text-[20px] dark:text-white text-gray-500 font-lahzeh font-bold">
          {t("items.item10")}
        </div>
      );
  }
}

export default ShowSectionItems;
