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
  const children = items.map(({ id, color, url, frameUrl }) => (
    <Item
      key={id}
      color={color}
      remove={() => setItems(items.filter((item: GridItem) => item.id !== id))}
      url={url}
      frameUrl={frameUrl}
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

// Item component.
const Item = ResizableWrapper(
  ({ color, remove, url, frameUrl }) => (
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
  ),
  {
    width: 100,
    height: 100,
  }
);
