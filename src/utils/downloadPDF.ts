import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export const DownloadPDF = async () => {
  const element = document.getElementById("account-pdf");

  if (!element) {
    console.error("Element #account-pdf not found");
    return;
  }

  try {
    const imgData = await toJpeg(element, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#2B2B2B",
    });

    const tempPdf = new jsPDF();
    const imgProps = tempPdf.getImageProperties(imgData);

    const pdfWidth = 210;

    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
      compress: true,
    });

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

    pdf.save("account.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};
