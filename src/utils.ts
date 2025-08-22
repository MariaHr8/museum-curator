// Return one of the values of the array.
export function oneOf(array: string | any[]) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
  const items = [];
  for (let i = 0; i < 7; i++) {
    const color = oneOf(["orange", "green", "blue"]);
    const id = uuid++;

    items.push({ id, color });
  }

  return items;
}

// Grid static options.
export const options = {
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
