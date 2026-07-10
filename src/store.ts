import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import { GalleryImage, ItemsState } from "./types";

interface GalleryStore {
  framesEnabled: boolean;
  autoGrid: boolean;
  items: ItemsState;

  toggleFrames: () => void;
  setAutoGrid: (enabled: boolean) => void;
  setItems: (items: ItemsState) => void;
  addImage: (image: GalleryImage) => void;
  moveItem: (id: string, from: keyof ItemsState, to: keyof ItemsState) => void;
  reorderActive: (activeId: string, overId: string) => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
  framesEnabled: true,
  autoGrid: true,
  items: { active: [], hidden: [] },

  toggleFrames: () => set((s) => ({ framesEnabled: !s.framesEnabled })),
  setAutoGrid: (enabled) => set({ autoGrid: enabled }),

  setItems: (items) => set({ items }),

  addImage: (image) =>
    set((s) => ({
      items: { ...s.items, active: [...s.items.active, image] },
    })),

  moveItem: (id, from, to) =>
    set((s) => {
      const fromArr = [...s.items[from]];
      const idx = fromArr.findIndex((i) => i.id === id);
      if (idx === -1) return s;
      const [moved] = fromArr.splice(idx, 1);
      return {
        items: {
          ...s.items,
          [from]: fromArr,
          [to]: [...s.items[to], moved],
        },
      };
    }),

  reorderActive: (activeId, overId) =>
    set((s) => {
      const oldIndex = s.items.active.findIndex((i) => i.id === activeId);
      const newIndex = s.items.active.findIndex((i) => i.id === overId);
      if (oldIndex === -1 || newIndex === -1) return s;
      return {
        items: { ...s.items, active: arrayMove(s.items.active, oldIndex, newIndex) },
      };
    }),
}));
