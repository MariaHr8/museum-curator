import Draggable from "react-draggable";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ResizableBox } from "react-resizable";
import { RootState } from "../redux/store";

export const FreeformGrid = ({ activeItems, sideBarIsOpen, exportRef }) => {
  return (
    <div className={`dashboard ${sideBarIsOpen ? "open" : ""}`} ref={exportRef}>
      <div className={"board-column active"}>
        {activeItems.map((item, index) => {
          const componentItem = {
            ...item,
            color: "active",
            onSend: () => console.log("Sending item from ACTIVE to HIDDEN"),
            zIndex: index,
          };
          return <DraggableItem item={componentItem} key={item.id} />;
        })}
      </div>
    </div>
  );
};

// DraggableItem (only the relevant part)
export const DraggableItem = React.memo(({ item }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const framesEnabled = useSelector((s: RootState) => s.picture.framesEnabled);
  const [size, setSize] = useState({ width: item.width, height: item.height });

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".frame-wrapper"
      cancel=".react-resizable-handle"
    >
      <div
        ref={nodeRef}
        className="item"
        style={{
          zIndex: item.zIndex,
          width: size.width,
          height: size.height,
        }}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          onResizeStop={(_, { size }) => {
            setSize(size);
          }}
          resizeHandles={["se"]}
        >
          <div className="board-item-content">
            <div className="card-remove">
              <i className="material-icons" onMouseDown={item.onSend}>
                &#xE5CD;
              </i>
            </div>
            <div className="frame-wrapper">
              <img src={item.url} className="image" draggable={false} />
              {framesEnabled && (
                <img
                  src={item.frameUrl}
                  className="frame-overlay"
                  draggable={false}
                />
              )}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
});
