import { Upload } from "lucide-react";
import { useCallback, useState } from "react";

export function DropZone({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) onFileSelect(droppedFile);
    },
    [onFileSelect]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25"
      } hover:border-primary hover:bg-primary/5`}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Drag and drop your PDF here</p>
        <p className="text-sm text-muted-foreground">
          or click to select a file
        </p>
      </div>
    </div>
  );
}
