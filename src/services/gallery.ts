import frame1 from "../assets/frames/frame1.png";
import frame3 from "../assets/frames/frame3.png";
import frame4 from "../assets/frames/frame4.png";
import frame5 from "../assets/frames/frame5.png";
import { GalleryImage } from "../types";

export const frames = [frame1, frame3, frame4, frame5];

const BASE_WIDTH = 150;

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function createGalleryImage(opts: {
  url: string;
  width: number;
  height: number;
  frameUrl: string;
  author?: string;
  link?: string;
  authorLink?: string;
}): GalleryImage {
  return {
    id: crypto.randomUUID(),
    ...opts,
  };
}

const mockPictures = [
  {
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",
    ratio: 3 / 4,
    author: "Europeana",
    authorLink: "https://unsplash.com/@europeana",
    link: "https://unsplash.com/photos/1541961017774",
  },
  {
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
    ratio: 5 / 4,
    author: "Steve Johnson",
    authorLink: "https://unsplash.com/@steve_j",
    link: "https://unsplash.com/photos/1579783902614",
  },
  {
    url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600",
    ratio: 3 / 4,
    author: "Europeana",
    authorLink: "https://unsplash.com/@europeana",
    link: "https://unsplash.com/photos/1549490349",
  },
  {
    url: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600",
    ratio: 4 / 3,
    author: "Birmingham Museums Trust",
    authorLink: "https://unsplash.com/@birminghammuseumstrust",
    link: "https://unsplash.com/photos/1580136579312",
  },
  {
    url: "https://images.unsplash.com/photo-1577720643272-265f09367456?w=600",
    ratio: 3 / 4,
    author: "Europeana",
    authorLink: "https://unsplash.com/@europeana",
    link: "https://unsplash.com/photos/1577720643272",
  },
  {
    url: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=600",
    ratio: 5 / 4,
    author: "Birmingham Museums Trust",
    authorLink: "https://unsplash.com/@birminghammuseumstrust",
    link: "https://unsplash.com/photos/1582561424760",
  },
];

export function generateItems(): GalleryImage[] {
  return mockPictures.map((pic) => {
    const width = pickRandom([BASE_WIDTH, BASE_WIDTH * 1.5]);
    const height = Math.round(width / pic.ratio);
    return createGalleryImage({
      url: pic.url,
      frameUrl: pickRandom(frames),
      width,
      height,
      author: pic.author,
      link: pic.link,
      authorLink: pic.authorLink,
    });
  });
}
