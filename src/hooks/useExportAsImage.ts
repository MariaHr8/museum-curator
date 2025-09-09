import { useCallback, useRef } from "react";
import html2canvas from "html2canvas";

export function useExportAsImage(filename = "export.png") {
  const exportRef = useRef<HTMLDivElement>(null);

  const exportAsImage = useCallback(async () => {
    if (!exportRef.current) return;

    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#2f2f2fff", // or null for transparent
      useCORS: true,
      scale: 2, // for sharper images
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }, [filename]);

  return { exportRef, exportAsImage };
}
