import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useGalleryStore } from "../store";
import { createGalleryImage, frames } from "../services/gallery";
import { CropBox, cropImage, CropRect } from "./CropBox";

interface UploadModalProps {
  onClose: () => void;
}

const PREVIEW_MAX = 350;

export const UploadModal = ({ onClose }: UploadModalProps) => {
  const addImage = useGalleryStore((s) => s.addImage);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [outputWidth, setOutputWidth] = useState(200);
  const [selectedFrame, setSelectedFrame] = useState<string>(frames[0]);
  const [crop, setCrop] = useState<CropRect | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    setNaturalSize({ width: naturalWidth, height: naturalHeight });

    const scale = Math.min(PREVIEW_MAX / naturalWidth, PREVIEW_MAX / naturalHeight, 1);
    const dw = Math.round(naturalWidth * scale);
    const dh = Math.round(naturalHeight * scale);
    setDisplaySize({ width: dw, height: dh });

    setCrop({ x: 0, y: 0, width: dw, height: dh });
  };

  const outputHeight = crop && displaySize.width > 0
    ? Math.round(outputWidth * (crop.height / crop.width))
    : Math.round(outputWidth * (naturalSize.height / naturalSize.width)) || outputWidth;

  const handleAdd = async () => {
    if (!previewUrl || !crop) return;

    const croppedUrl = await cropImage(previewUrl, crop, displaySize.width, displaySize.height);

    const image = createGalleryImage({
      url: croppedUrl,
      width: outputWidth,
      height: outputHeight,
      frameUrl: selectedFrame,
    });
    addImage(image);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <h2>Add Image</h2>

        {!previewUrl ? (
          <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
            <p>Click to select an image</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>
        ) : (
          <div className="upload-preview-area">
            <div className="upload-editor">
              <div className="crop-container" style={{ width: displaySize.width, height: displaySize.height }}>
                <img
                  src={previewUrl}
                  onLoad={handleImageLoad}
                  className="crop-source-img"
                  style={{ width: displaySize.width, height: displaySize.height }}
                />
                {crop && (
                  <CropBox
                    containerWidth={displaySize.width}
                    containerHeight={displaySize.height}
                    crop={crop}
                    onChange={setCrop}
                  />
                )}
              </div>

              {crop && previewUrl && (
                <div className="result-preview">
                  <span className="result-preview-label">Preview</span>
                  <div
                    className="result-preview-frame"
                    style={{ width: outputWidth, height: outputHeight }}
                  >
                    <div className="frame-wrapper">
                      <div
                        className="image"
                        style={{ overflow: "hidden" }}
                      >
                        <img
                          src={previewUrl}
                          className="result-preview-img"
                          style={{
                            position: "absolute",
                            width: `${(displaySize.width / crop.width) * 100}%`,
                            height: `${(displaySize.height / crop.height) * 100}%`,
                            left: `${(-crop.x / crop.width) * 100}%`,
                            top: `${(-crop.y / crop.height) * 100}%`,
                          }}
                        />
                      </div>
                      {selectedFrame && (
                        <img src={selectedFrame} alt="frame" className="frame-overlay" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="upload-controls">
              <label className="slider-label">
                Output width: {outputWidth}px (height: {outputHeight}px)
                <input
                  type="range"
                  min={100}
                  max={400}
                  value={outputWidth}
                  onChange={(e) => setOutputWidth(Number(e.target.value))}
                  className="width-slider"
                />
              </label>

              <div className="frame-picker">
                <span className="frame-picker-label">Frame:</span>
                <button
                  className={`frame-option ${selectedFrame === "" ? "selected" : ""}`}
                  onClick={() => setSelectedFrame("")}
                >
                  None
                </button>
                {frames.map((frame) => (
                  <button
                    key={frame}
                    className={`frame-option ${selectedFrame === frame ? "selected" : ""}`}
                    onClick={() => setSelectedFrame(frame)}
                  >
                    <img src={frame} className="frame-thumb" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn confirm" onClick={handleAdd} disabled={!previewUrl}>
            Add to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
