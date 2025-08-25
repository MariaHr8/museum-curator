import { useState } from "react";
import { MuuriComponent } from "muuri-react";
import { generateItems } from "./utils";
import { ResizableWrapper } from "./ResizableWrapper";

const MuuriGrid = () => {
  type GridItem = {
    id: string | number;
    color: string;
    title: string;
    width: number;
    height: number;
  };
  const [items, setItems] = useState(generateItems());

  // Children.
  const children = items.map(({ id, color, url, frameUrl, height, width }) => (
    <Item
      key={id}
      color={color}
      remove={() => setItems(items.filter((item: GridItem) => item.id !== id))}
      url={url}
      frameUrl={frameUrl}
      width={width}
      height={height}
    />
  ));

  return (
    <div>
      {/* Content */}
      <MuuriComponent
        dragEnabled
        dragStartPredicate={{ handle: ".frame-wrapper" }}
      >
        {children}
      </MuuriComponent>
    </div>
  );
};

export default MuuriGrid;
const Item = ({ color, remove, url, frameUrl, height, width }) => (
  <ResizableWrapper width={width} height={height}>
    <div className={`content ${color}`}>
      <div className="card-remove">
        <i className="material-icons" onMouseDown={remove}>
          &#xE5CD;
        </i>
      </div>
      <div className="frame-wrapper">
        <img src={url} alt="" className="image" />
        <img src={frameUrl} alt="frame" className="frame-overlay" />
      </div>
    </div>
  </ResizableWrapper>
);
