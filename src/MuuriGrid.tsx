import { useState } from "react";
import { MuuriComponent } from "muuri-react";
import { generateItems, options } from "./utils";

const MuuriGrid = () => {
  type GridItem = {
    id: string | number;
    color: string;
    title: string;
    width: number;
    height: number;
  };

  const [items, setItems] = useState<GridItem[]>(generateItems());

  const children = items.map(
    ({ id, color, title, width, height }: GridItem) => (
      <Item
        key={id}
        color={color}
        title={title}
        width={width}
        height={height}
        remove={() =>
          setItems(items.filter((item: GridItem) => item.id !== id))
        }
      />
    )
  );

  return (
    <div className="bg-red-700">
      <MuuriComponent
        {...options}
        propsToData={({ color, title }) => ({ color, title })}
      >
        {children}
      </MuuriComponent>
    </div>
  );
};

export default MuuriGrid;

type ItemProps = {
  color: string;
  width: number;
  height: number;
  title: string;
  remove: () => void;
};

const Item = ({ color, width, height, title, remove }: ItemProps) => {
  return (
    <div className={`item h${height} w${width} ${color}`}>
      <div className="item-content">
        <div className="card">
          <div className="card-title">{title}</div>
          <div className="card-remove">
            <i className="material-icons" onMouseDown={remove}>
              &#xE5CD;
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};
