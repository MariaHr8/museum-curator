import { useRef, useCallback, PointerEvent } from "react";

interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropBoxProps {
  containerWidth: number;
  containerHeight: number;
  crop: CropRect;
  onChange: (crop: CropRect) => void;
}

export const CropBox = ({ containerWidth, containerHeight, crop, onChange }: CropBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"move" | "resize" | null>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startCrop = useRef<CropRect>(crop);

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const onPointerDown = useCallback((e: PointerEvent, mode: "move" | "resize") => {
    e.stopPropagation();
    dragging.current = mode;
    startPos.current = { x: e.clientX, y: e.clientY };
    startCrop.current = { ...crop };
    boxRef.current?.setPointerCapture(e.pointerId);
  }, [crop]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    const sc = startCrop.current;

    if (dragging.current === "move") {
      onChange({
        ...sc,
        x: clamp(sc.x + dx, 0, containerWidth - sc.width),
        y: clamp(sc.y + dy, 0, containerHeight - sc.height),
      });
    } else {
      const newW = clamp(sc.width + dx, 40, containerWidth - sc.x);
      const newH = clamp(sc.height + dy, 40, containerHeight - sc.y);
      onChange({ ...sc, width: newW, height: newH });
    }
  }, [containerWidth, containerHeight, onChange]);

  const onPointerUp = useCallback((e: PointerEvent) => {
    dragging.current = null;
    boxRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  return (
    <>
      <div className="crop-overlay">
        <div
          className="crop-mask-top"
          style={{ height: crop.y }}
        />
        <div className="crop-mask-middle" style={{ height: crop.height }}>
          <div className="crop-mask-left" style={{ width: crop.x }} />
          <div
            ref={boxRef}
            className="crop-selection"
            style={{ width: crop.width, height: crop.height }}
            onPointerDown={(e) => onPointerDown(e, "move")}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <div
              className="crop-handle"
              onPointerDown={(e) => onPointerDown(e, "resize")}
            />
          </div>
          <div className="crop-mask-right" />
        </div>
        <div className="crop-mask-bottom" />
      </div>
    </>
  );
};

export function cropImage(
  imageUrl: string,
  crop: CropRect,
  displayWidth: number,
  displayHeight: number,
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scaleX = img.naturalWidth / displayWidth;
      const scaleY = img.naturalHeight / displayHeight;

      const canvas = document.createElement("canvas");
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob!));
      }, "image/png");
    };
    img.src = imageUrl;
  });
}

export type { CropRect };
