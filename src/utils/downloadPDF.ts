import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export const DownloadPDF = async () => {
  const element = document.getElementById("account-pdf");

  if (!element) {
    console.log("PDF element not found");
    return;
  }

  try {
    const image = await toJpeg(element, {
      quality: 0.5,
      pixelRatio: 1,
      cacheBust: true,
    });

    const width = 210;

    const height = (element.offsetHeight * width) / element.offsetWidth;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [width, height],
      compress: true,
    });

    pdf.addImage(image, "JPEG", 0, 0, width, height);

    pdf.save("account.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};
