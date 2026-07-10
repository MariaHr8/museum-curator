import { useEffect, useState } from "react";
import { useGalleryStore } from "./store";
import { generateItems } from "./services/gallery";
import { useExportAsImage } from "./hooks/useExportAsImage";
import { AutoGrid } from "./components/AutoGrid";
import { FreeformGrid } from "./components/FreeformGrid";
import { SideBar } from "./components/SideBar";
import { ExportButton } from "./components/ExportButton";
import { UploadButton } from "./components/UploadButton";
import { UploadModal } from "./components/UploadModal";

export const MainComponent = () => {
  const { exportRef, exportAsImage } = useExportAsImage("dashboard.png");
  const { autoGrid, setItems } = useGalleryStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    setItems({ active: generateItems(), hidden: [] });
  }, [setItems]);

  return (
    <div className="board-layout">
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {autoGrid ? (
        <AutoGrid
          sideBarIsOpen={sidebarOpen}
          exportRef={exportRef}
        />
      ) : (
        <FreeformGrid
          sideBarIsOpen={sidebarOpen}
          exportRef={exportRef}
        />
      )}

      <ExportButton handleExport={exportAsImage} />
      <UploadButton onClick={() => setUploadOpen(true)} />
      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} />}
    </div>
  );
};
