// import { useState } from "react";
import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "./common/LanguageSwitcher";
// import ThemeToggle from "./common/ThemeToggle";
import Button from "./ui/Button";
// import ArrowIcon from "../icons/ArrowIcon";
// import { FiMenu } from "react-icons/fi";
// import HamburgerMenu from "./HamburgerMenu";
import UserMenu from "../module/UserMenu";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type NavbarProps = {
  activeComponent: string;
};

function Navbar({ activeComponent }: NavbarProps) {
  // const [menu, setMenu] = useState<boolean>(false);

  const { i18n, t } = useTranslation();

  const downloadablePages = [
    "InformationAccount",
    "ChallengeGrid",
    "chart",
    "Comparison",
    "TransactionList",
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
        canvasHeight: element.scrollHeight,
      });

      const img = new Image();

      img.onload = () => {
        const pdfWidth = 210;
        const pdfHeight = (img.height * pdfWidth) / img.width;

        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: [pdfWidth, pdfHeight],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${activeComponent}.pdf`);
      };

      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(dataUrl);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;

        pdf.addPage();

        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);

        heightLeft -= pageHeight;
      }

      pdf.save(`${activeComponent}.pdf`);
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
        <section className="flex items-center gap-1 lg:gap-3">
          {/* <LanguageSwitcher /> */}

          {/* <ThemeToggle /> */}
        </section>

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

        {/* <section className="lg:hidden">
          <button
            onClick={() => setMenu(true)}
            className="
              relative p-3 rounded-2xl
              cursor-pointer
              bg-white/90 dark:bg-[#2a2a2a]/80
              backdrop-blur-xl
              border border-gray-200/60 dark:border-gray-700/50
              shadow-[0_8px_30px_rgb(0,0,0,0.08)]
              hover:shadow-[0_10px_40px_rgb(0,0,0,0.15)]
              transition-all duration-300
              text-gray-900 dark:text-white
              active:scale-95
            "
          >
            <FiMenu size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
        </section> */}

        {/* <HamburgerMenu menu={menu} setMenu={setMenu} /> */}
      </div>
    </>
  );
}

export default Navbar;
