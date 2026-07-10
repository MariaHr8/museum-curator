import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { RefObject } from "react";
import { ResizableWrapper } from "./ResizableWrapper";
import { GalleryItem } from "./GalleryItem";
import { useGalleryStore } from "../store";
import { GalleryImage } from "../types";

interface AutoGridProps {
  sideBarIsOpen: boolean;
  exportRef: RefObject<HTMLDivElement | null>;
}

export const AutoGrid = ({ sideBarIsOpen, exportRef }: AutoGridProps) => {
  const { items, moveItem, reorderActive } = useGalleryStore();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderActive(active.id as string, over.id as string);
    }
  };

  return (
    <div className={`dashboard ${sideBarIsOpen ? "open" : ""}`} ref={exportRef as React.LegacyRef<HTMLDivElement>}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.active.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div className="board-column active">
            {items.active.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onSend={() => moveItem(item.id, "active", "hidden")}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface SortableItemProps {
  item: GalleryImage;
  onSend: () => void;
}

const SortableItem = ({ item, onSend }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ResizableWrapper width={item.width} height={item.height + 20}>
        <GalleryItem item={item} variant="active" onSend={onSend} />
      </ResizableWrapper>
    </div>
  );
};
