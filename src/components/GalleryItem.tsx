import { useGalleryStore } from "../store";
import { GalleryItemProps } from "../types";

export const GalleryItem = ({ item, variant, onSend }: GalleryItemProps) => {
  const framesEnabled = useGalleryStore((s) => s.framesEnabled);
  const icon = variant === "hidden" ? "add" : "\u{E5CD}";

  return (
    <div className="board-item-content">
      <div className="card-remove">
        <i className="material-icons" onMouseDown={onSend}>
          {icon}
        </i>
      </div>
      <div className="frame-wrapper">
        <img src={item.url} alt="" className="image" />
        {framesEnabled && item.frameUrl && (
          <img src={item.frameUrl} alt="frame" className="frame-overlay" />
        )}
      </div>
    </div>
  );
};
