import React from "react";

const PdfHeader = () => {
  return (
    <div className="px-4 py-3 border-b bg-zinc-50 dark:bg-zinc-900 flex items-center gap-4">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-sm text-muted-foreground">research-paper.pdf</span>
    </div>
  );
};

export default PdfHeader;
