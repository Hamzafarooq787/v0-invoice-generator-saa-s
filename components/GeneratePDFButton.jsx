"use client";

export default function GeneratePDFButton() {
  const handlePrint = () => {
    if (typeof window === "undefined") return;

    const invoiceElement = document.getElementById("invoice-preview");
    if (!invoiceElement) {
      console.error("Invoice preview element not found.");
      return;
    }

    const printContents = invoiceElement.innerHTML;
    const printWindow = window.open("", "_blank", "width=900,height=1000");

    if (!printWindow) {
      console.error("Unable to open print window.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice</title>
          <style>
            body {
              margin: 0;
              padding: 24px;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              background: #ffffff;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
}
