import { useCallback } from "react";

// Return the 'onSend' method.
// utils.ts
export function useSend(
  setItems: React.Dispatch<React.SetStateAction<Record<string, any[]>>>
) {
  return function onSend({
    key,
    fromId,
    toId,
  }: {
    key: string;
    fromId: string;
    toId: string;
  }) {
    const f = fromId.toLowerCase();
    const t = toId.toLowerCase();

    setItems((prev) => {
      const next = { ...prev };
      const fromArr = [...(next[f] ?? [])];

      // Support items having either .key or .id
      const idx = fromArr.findIndex(
        (it) => String(it?.key ?? it?.id) === String(key)
      );
      if (idx === -1) return prev; // nothing to move

      const [moved] = fromArr.splice(idx, 1);
      next[f] = fromArr;
      next[t] = [...(next[t] ?? []), moved];
      return next;
    });
  };
}

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

// Return a random word.
export function getRandomWord() {
  return (
    oneOf("ABCDEFGHIJKLMNOPQRSTUVWXYZ") + oneOf("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
  );
}

// Board static options.
export const boardOptions = {
  containerClass: "board",
  layoutDuration: 400,
  dragEnabled: false,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  // It's possible to drag the column only
  // by clicking on the header.
  dragHandle: ".board-column-header",
};

// Column static options.
export const columnOptions = {
  // Enable to send the items in
  // the grids with the following groupId.
  dragSort: { groupId: "NOTES" },
  groupIds: ["NOTES"],
  // containerClass: "board-column-content",
  // dragEnabled: true,
  // dragFixed: true,
  // dragHandle: "frame-wrapper",
  // dragSortHeuristics: {
  //   sortInterval: 0,
  // },
  // dragContainer: document.body,
  // dragPlaceholder: {
  //   enabled: true,
  //   createElement: function (item: any) {
  //     // The element will have the Css class ".muuri-item-placeholder".
  //     return item.getElement().cloneNode(true);
  //   },
  // },
};

export const dashboardOptions = {
  // Enable to send the items in
  // the grids with the following groupId.
  dragSort: { groupId: "NOTES" },
  groupIds: ["NOTES"],
  containerClass: "board-column-content",
  dragHandle: "frame-wrapper",
  dragSortHeuristics: {
    sortInterval: 20,
  },
  layoutDuration: 400,
  dragRelease: {
    duration: 400,
    easing: "ease-out",
  },
  dragEnabled: true,
  dragContainer: document.body,
  // The placeholder of an item that is being dragged.
  dragPlaceholder: {
    enabled: true,
    createElement: function (item: any) {
      // The element will have the Css class ".muuri-item-placeholder".
      return item.getElement().cloneNode(true);
    },
  },
};
