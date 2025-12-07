"use client";

export default function GeneratePDFButton() {
  const handlePrint = () => {
    if (typeof window === "undefined") return;
    window.print();
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
