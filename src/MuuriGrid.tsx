import { useEffect, useMemo, useState } from "react";
import { MuuriComponent } from "muuri-react";
import { generateItems } from "./utils";
import { ResizableWrapper } from "./ResizableWrapper";

const MuuriGrid = () => {
  const [items, setItems] = useState(generateItems());

  useEffect(() => {
    console.log(items.length);
    console.log("children", children.length);
  }, [items]);

  // Children.
  const children = useMemo(
    () =>
      items.map(({ id, color, url, frameUrl, height, width }) => (
        <Item
          key={id}
          color={color}
          remove={() => setItems(items.filter((item) => item.id !== id))}
          url={url}
          frameUrl={frameUrl}
          width={width}
          height={height}
        />
      )),
    [items]
  );

  const generateMoreItems = () => {
    setItems((prevItems) => [...prevItems, ...generateItems()]);
  };

  return (
    <div>
      {/* Content */}
      <MuuriComponent
        key={items.length}
        dragEnabled
        dragStartPredicate={{ handle: ".frame-wrapper" }}
      >
        {children}
      </MuuriComponent>
      <div className="button-div">
        <button className="generate-button" onClick={() => generateMoreItems()}>
          Generate more
        </button>
      </div>
    </div>
  );
};

export default MuuriGrid;
const Item = ({ color, remove, url, frameUrl, height, width }) => (
  <ResizableWrapper width={width} height={height}>
    <div className={`content ${color}`}>
      <div className="card-remove">
        <div>
          <i className="material-icons" onMouseDown={remove}>
            &#xE5CD;
          </i>
        </div>
        <div className="frame-wrapper">
          <img src={url} alt="" className="image" />
          <img src={frameUrl} alt="frame" className="frame-overlay" />
        </div>
      </div>
    </div>
  </ResizableWrapper>
);
