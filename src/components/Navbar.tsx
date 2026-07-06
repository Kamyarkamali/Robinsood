import { useTranslation } from "react-i18next";
import Button from "./ui/Button";
import UserMenu from "../module/UserMenu";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type NavbarProps = {
  activeComponent: string;
};

function Navbar({ activeComponent }: NavbarProps) {
  const { i18n, t } = useTranslation();

  const downloadablePages = [
    "InformationAccount",
    "ChallengeGrid",
    "chart",
    "Comparison",
    "TransactionList",
    "ProgressCardsSection",
    "detailseAc",
    "detaileCalendre",
    "AiComponent",
  ];

  const canDownload = downloadablePages.includes(activeComponent);

  const downloadPdf = async () => {
    const element = document.getElementById(activeComponent);

    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        canvasWidth: element.scrollWidth,
        canvasHeight: element.offsetHeight,
      });

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? "l" : "p",
          unit: "px",
          format: [img.width, img.height],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
        pdf.save(`${activeComponent}.pdf`);
      };
    } catch (err) {
      console.error("PDF Error:", err);
    }
  };
  return (
    <>
      <div className="flex items-center">
        <UserMenu />
      </div>
      <div className="pt-4 flex items-center justify-between">
        <section className="flex items-center gap-1 lg:gap-3"></section>

        <section className="flex md:ml-4 mr-4 lg:mr-0 co lg:ml-0 items-center justify-end w-full gap-3">
          {canDownload && (
            <button
              onClick={downloadPdf}
              className="
                px-4 py-2 rounded-2xl
                cursor-pointer
                bg-indigo-500/15
                border border-indigo-500/20
                text-indigo-300
                hover:bg-indigo-500/25
                transition-all
                text-sm font-normal
                lg:w-47.5 w-30
                lg:h-13.75 h-10
                
              "
            >
              {i18n.language === "fa" ? "دانلود PDF" : "Download PDF"}
            </button>
          )}
          <Button
            href="#"
            className="cursor-pointer"
            bgColor="bg-[#FF2D55]"
            textStyle="lg:text-sm text-[12px]"
            width="lg:w-[190px] w-[120px]"
            height="lg:h-[55px] h-[40px]"
            fontBold="lg:font-bold"
            borderRadios="rounded-2xl"
          >
            {t("navButton.platform")}
          </Button>
        </section>
      </div>
    </>
  );
}

export default Navbar;
