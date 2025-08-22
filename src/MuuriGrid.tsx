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
  const children = items.map(({ id, color }) => (
    <Item
      key={id}
      color={color}
      remove={() => setItems(items.filter((item: GridItem) => item.id !== id))}
    />
  ));

  return (
    <div>
      {/* Content */}
      <MuuriComponent
        dragEnabled
        dragStartPredicate={{ handle: ".content-header" }}
      >
        {children}
      </MuuriComponent>
    </div>
  );
};

export default MuuriGrid;

// Item component.
const Item = ResizableWrapper(
  ({ color, remove }) => (
    <div className={`content ${color}`}>
      <div className="content-header" />
      <div className="card-remove">
        <i className="material-icons" onMouseDown={remove}>
          &#xE5CD;
        </i>
      </div>
    </div>
  ),
  {
    width: 100,
    height: 100,
  }
);
