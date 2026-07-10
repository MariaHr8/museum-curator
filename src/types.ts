export interface GalleryImage {
  id: string;
  url: string;
  frameUrl: string;
  width: number;
  height: number;
  author?: string;
  link?: string;
  authorLink?: string;
}

export interface GalleryItemProps {
  item: GalleryImage;
  variant: "active" | "hidden";
  onSend: () => void;
}

export interface ItemsState {
  active: GalleryImage[];
  hidden: GalleryImage[];
}
