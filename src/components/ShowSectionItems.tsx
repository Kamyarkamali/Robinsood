import { useTranslation } from "react-i18next";
import type { ShowSectionItemsProps } from "../types/interfaces";

function ShowSectionItems({ activeId }: ShowSectionItemsProps) {
  const { t } = useTranslation();

  ///دیتاهای گرفته شده بر اساس مضوع به صورت کامپوننت های جدا باید در شرط  جاری نمایش داده بشن-شرط  فعلی استاتیک است
  switch (activeId) {
    case 1:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item1")}
        </div>
      );

    case 2:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item2")}
        </div>
      );

    case 3:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item3")}
        </div>
      );

    case 4:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item4")}
        </div>
      );

    case 5:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item5")}
        </div>
      );

    case 6:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item6")}
        </div>
      );

    case 7:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item6")}
        </div>
      );

    case 8:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item7")}
        </div>
      );

    case 9:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item8")}
        </div>
      );

    case 10:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item9")}
        </div>
      );
    default:
      return (
        <div className="md:text-[32px] text-[20px] font-lahzeh font-bold">
          {t("items.item10")}
        </div>
      );
  }
}

export default ShowSectionItems;
