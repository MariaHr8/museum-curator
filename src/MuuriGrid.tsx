import { useState } from "react";
import { MuuriComponent } from "muuri-react";
import { generateItems, options } from "./utils";

const MuuriGrid = () => {
  const [items, setItems] = useState(generateItems());

  const children = items.map(({ id, color, title, width, height }) => (
    <Item
      key={id}
      color={color}
      title={title}
      width={width}
      height={height}
      remove={() => setItems(items.filter((item) => item.id !== id))}
    />
  ));

  return (
    <MuuriComponent
      {...options}
      propsToData={({ color, title }) => ({ color, title })}
    >
      {children}
    </MuuriComponent>
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
