import { useGalleryStore } from "../store";
import { GalleryItem } from "./GalleryItem";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const SideBar = ({ isOpen, setIsOpen }: SideBarProps) => {
  const { framesEnabled, toggleFrames, setAutoGrid, items, moveItem } = useGalleryStore();

  return (
    <>
      <SideBarButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <h1>Options</h1>

          <h2>Hidden Items</h2>
          <div className="hidden-items-container">
            {items.hidden.map((item) => (
              <div key={item.id} className="sidebar-item">
                <GalleryItem
                  item={item}
                  variant="hidden"
                  onSend={() => moveItem(item.id, "hidden", "active")}
                />
              </div>
            ))}
          </div>

          <h2>Picture Style</h2>
          <label>
            <input
              type="radio"
              name="mode"
              value="framed"
              defaultChecked={framesEnabled}
              onChange={() => !framesEnabled && toggleFrames()}
            />
            Framed Art
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="mode"
              value="posters"
              defaultChecked={!framesEnabled}
              onChange={() => framesEnabled && toggleFrames()}
            />
            Posters
          </label>

          <h2>Arrangement</h2>
          <label>
            <input
              type="radio"
              name="arrangement"
              value="grid"
              defaultChecked
              onChange={() => setAutoGrid(true)}
            />
            Automatic
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="arrangement"
              value="list"
              onChange={() => setAutoGrid(false)}
            />
            Freeform
          </label>
        </nav>

        <div className="sidebar-footer">
          {"by "}
          <a href="https://github.com/MariaHr8" target="_blank" rel="noopener noreferrer">
            Maria Hristova
          </a>
        </div>
      </div>
    </>
  );
};

interface SideBarButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SideBarButton = ({ isOpen, onToggle }: SideBarButtonProps) => (
  <button className="menu-button" onClick={onToggle} data-open={isOpen}>
    <svg className="svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </button>
);
