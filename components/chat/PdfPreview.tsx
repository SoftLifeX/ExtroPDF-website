import React from "react";

const PdfPreview = ({ pdfUrl }: { pdfUrl: string }) => {
  return (
    <section className="flex items-center justify-center w-full h-screen md:h-full bg-zinc-100 dark:bg-zinc-900 rounded-lg ">
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        title="PDF Preview"
        loading="lazy"
      />
    </section>
  );
};

export default PdfPreview;
