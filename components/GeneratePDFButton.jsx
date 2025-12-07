"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function GeneratePDFButton() {
  const downloadPDF = async () => {
    const invoiceElement = document.getElementById("invoice-preview");

    if (!invoiceElement) {
      console.error("Invoice preview element not found.");
      return;
    }

    // Wait for fonts and layout to settle
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Force Tailwind theme values to px/rgb (avoid unsupported color spaces)
    invoiceElement.style.colorScheme = "light";

    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        const clone = clonedDoc.getElementById("invoice-preview");
        clone.style.background = "#ffffff"; // avoid transparent background
        clone.style.boxShadow = "none"; // shadows break PDF
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
}

