import frame1 from "./assets/frames/frame1.png";
import frame3 from "./assets/frames/frame3.png";
import frame4 from "./assets/frames/frame4.png";

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
    const url = oneOf([
      "https://i.pinimg.com/400x300/0d/f6/f1/0df6f1f0bfe7aaca849c1bbc3607a34b.jpg",
      "https://i.pinimg.com/600x/0d/f6/f1/0df6f1f0bfe7aaca849c1bbc3607a34b.jpg",
      "https://i.pinimg.com/1200x/0d/f6/f1/0df6f1f0bfe7aaca849c1bbc3607a34b.jpg",
    ]);
    const frameUrl = oneOf([frame1, frame3, frame4])

    items.push({ id, color, url, frameUrl });
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
