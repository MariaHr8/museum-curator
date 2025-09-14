import { Random } from "unsplash-js/dist/methods/photos/types";
import frame1 from "./assets/frames/frame1.png";
import frame3 from "./assets/frames/frame3.png";
import frame4 from "./assets/frames/frame4.png";
import frame5 from "./assets/frames/frame5.png";
import { createApi } from "unsplash-js";

const BASE_WIDTH = 150;

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY || "",
});

// Return one of the values of the array.
export function oneOf(array: string | any[]) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export async function generateItems() {
  const items = [];

  const picturesResponse = await unsplash.photos.getRandom({
    query: "art",
    count: 7,
  });
  const pictures: Random[] = Array.isArray(picturesResponse.response)
    ? picturesResponse.response
    : picturesResponse.response
    ? [picturesResponse.response]
    : [];

  for (let i = 0; i < 7; i++) {
    const id = uuid++;

    // const picture = oneOf([
    //   {
    //     url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxOTc4MnwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1NzQzNzIzOXw&ixlib=rb-4.1.0&q=80&w=1080",
    //     ratio: 640 / 427,
    //   },
    //   {
    //     url: "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxOTc4MnwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1NzQzNzI3Mnw&ixlib=rb-4.1.0&q=80&w=1080",
    //     ratio: 640 / 427,
    //   },
    //   {
    //     url: "https://images.unsplash.com/photo-1540206395-68808572332f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxOTc4MnwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1NzQzNzkxNHw&ixlib=rb-4.1.0&q=80&w=1080",
    //     ratio: 640 / 427,
    //   },
    // ]);

    // const picture: Random = pictures[i];

    const picture = pictures[i];
    const ratio = picture.width / picture.height;
    const author = picture.user.name;
    const authorLink = picture.user.links.html;

    const url = picture.urls.regular;
    const link = picture.links.html;

    const width = oneOf([
      BASE_WIDTH,
      BASE_WIDTH * 1.25,
      BASE_WIDTH * 1.5,
      BASE_WIDTH * 1.75,
    ]);
    const height = Math.round(width / ratio);
    const frameUrl = oneOf([frame1, frame3, frame4, frame5]);

    items.push({ id, url, frameUrl, height, width, author, link, authorLink });
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
