import frame1 from "./assets/frames/frame1.png";
import frame3 from "./assets/frames/frame3.png";
import frame4 from "./assets/frames/frame4.png";

const BASE_WIDTH = 100;

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

    const picture = oneOf([
      {
        url: "https://i.pinimg.com/400x300/0d/f6/f1/0df6f1f0bfe7aaca849c1bbc3607a34b.jpg",
        ratio: 400 / 300,
      },
      {
        url: "https://i.pinimg.com/600x/0d/f6/f1/0df6f1f0bfe7aaca849c1bbc3607a34b.jpg",
        ratio: 800 / 600,
      },
      {
        url: "https://i.pinimg.com/1200x/0d/f6/f1/0df6f1f0bfe7aaca849c1bbc3607a34b.jpg",
        ratio: 1600 / 1200,
      },
    ]);
    const url = picture.url;
    const width = oneOf([
      BASE_WIDTH,
      BASE_WIDTH * 1.25,
      BASE_WIDTH * 1.5,
      BASE_WIDTH * 1.75,
    ]);
    const height = Math.round(width / picture.ratio);
    const frameUrl = oneOf([frame1, frame3, frame4]);

    items.push({ id, color, url, frameUrl, height, width });
  }

  console.log("Item", items[0]);

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
