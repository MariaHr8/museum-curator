import { RefObject, useRef, useState, useCallback, PointerEvent } from "react";
import { ResizableBox } from "react-resizable";
import { useGalleryStore } from "../store";
import { GalleryImage } from "../types";

interface FreeformGridProps {
  sideBarIsOpen: boolean;
  exportRef: RefObject<HTMLDivElement | null>;
}

export const FreeformGrid = ({ sideBarIsOpen, exportRef }: FreeformGridProps) => {
  const { items, moveItem } = useGalleryStore();

  return (
    <div className={`dashboard ${sideBarIsOpen ? "open" : ""}`} ref={exportRef as React.LegacyRef<HTMLDivElement>}>
      <div className="freeform-canvas">
        {items.active.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            onSend={() => moveItem(item.id, "active", "hidden")}
          />
        ))}
      </div>
    </div>
  );
};

interface DraggableItemProps {
  item: GalleryImage;
  index: number;
  onSend: () => void;
}

const DraggableItem = ({ item, index, onSend }: DraggableItemProps) => {
  const framesEnabled = useGalleryStore((s) => s.framesEnabled);
  const [size, setSize] = useState({ width: item.width, height: item.height + 30 });

  const col = index % 4;
  const row = Math.floor(index / 4);
  const [position, setPosition] = useState({ x: col * 200, y: row * 250 });

  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback((e: PointerEvent) => {
    if ((e.target as HTMLElement).closest(".react-resizable-handle")) return;
    if ((e.target as HTMLElement).closest(".card-remove")) return;

    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    nodeRef.current?.setPointerCapture(e.pointerId);
  }, [position]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({ x: posStart.current.x + dx, y: posStart.current.y + dy });
  }, []);

  const onPointerUp = useCallback((e: PointerEvent) => {
    dragging.current = false;
    nodeRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div
      ref={nodeRef}
      className="item freeform-item"
      style={{
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        onResizeStop={(_, { size: newSize }) => setSize(newSize)}
        resizeHandles={["se"]}
      >
        <div className="board-item-content">
          <div className="card-remove">
            <i className="material-icons" onMouseDown={onSend}>
              &#xE5CD;
            </i>
          </div>
          <div className="frame-wrapper">
            <img src={item.url} className="image" draggable={false} />
            {framesEnabled && (
              <img src={item.frameUrl} className="frame-overlay" draggable={false} />
            )}
          </div>
        </div>
      </ResizableBox>
    </div>
  );
};
