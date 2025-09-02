import frame1 from "./assets/frames/frame1.png";
import frame3 from "./assets/frames/frame3.png";
import frame4 from "./assets/frames/frame4.png";
import frame5 from "./assets/frames/frame5.png";

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
    const frameUrl = oneOf([frame1, frame3, frame4, frame5]);

    items.push({ id, color, url, frameUrl, height, width });
  }

  return items;
}

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

// Column static options.
export const columnOptions = {
  dragSort: { groupId: "NOTES" },
  groupIds: ["NOTES"],
};
