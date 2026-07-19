import { useState } from "react";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { DownloadPDF } from "../utils/downloadPDF";
import i18next from "i18next";

const DownloadPdfButton = () => {
  const [loading, setLoading] = useState(false);
  const lang = i18next.language;

  const handleDownload = async () => {
    try {
      setLoading(true);

      await DownloadPDF();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="
          group
          mt-5
          md:mt-0
          flex items-center gap-2
        cursor-pointer
          rounded-xl
          border border-white/10

          bg-white/10
          backdrop-blur-md

          px-4 py-2.5

          text-sm font-medium
          text-white

          transition-all duration-300

          hover:bg-white/20
          hover:scale-[1.03]

          max-sm:px-3"
    >
      {loading ? (
        <>
          <span
            className="
                h-5 w-5
                animate-spin
                rounded-full
                border-2
                border-white/30
                border-t-white
                
              "
          />
          <span className="text-[11px] md:text-sm">
            {lang === "fa" ? " در حال ساخت PDF..." : "Create Pdf File..."}
          </span>
        </>
      ) : (
        <>
          <HiOutlineDocumentArrowDown className="text-[15px] md:text-xl" />
          <span className="text-[11px] md:text-sm">
            {lang === "fa" ? " دانلود PDF" : "Download Pdf"}
          </span>
        </>
      )}
    </button>
  );
};

export default DownloadPdfButton;
