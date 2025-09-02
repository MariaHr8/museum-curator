import React, { useState } from "react";

import "./index.css";
import { generateItems, useSend } from "./utils";
import { ResizableWrapper } from "./components/ResizableWrapper";
import { SideBar } from "./components/SideBar";
import { Playboard } from "./components/MainContent";

export const Columns = () => {
  const [hiddenItemsVisible, setHiddenItemsVisible] = useState<boolean>(true);

  // Items state.
  const [items, setItems] = useState({
    active: generateItems(),
    hidden: [],
  });

  // UseSend is used when a item changes grid
  // to sync the items state.
  const onSend = useSend(setItems);

  // Children.
  const children = {
    active: items.active.map((item) => {
      const item3 = {
        ...item,
        color: "active",
        onSend: () =>
          onSend({
            key: item.id.toString(),
            fromId: "ACTIVE",
            toId: "HIDDEN",
          }),
      };
      return <Item item={item3} key={item.id} />;
    }),
    hidden: items.hidden.map((item) => {
      const item3 = {
        ...item,
        color: "hidden",
        onSend: () => {
          console.log("Sending item from HIDDEN to ACTIVE"),
            onSend({
              key: item.id.toString(),
              fromId: "HIDDEN",
              toId: "ACTIVE",
            });
        },
      };
      return <ColumnItem item={item3} key={item.id} />;
    }),
  };

  return (
    <div className="board-layout">
      <SideBar
        isOpen={hiddenItemsVisible}
        setIsOpen={setHiddenItemsVisible}
        hiddenItems={children.hidden}
      />
      <Playboard
        activeItems={children.active}
        activeItemsLength={items.active.length}
        sideBarIsOpen={hiddenItemsVisible}
      />
    </div>
  );
};

// Item component.
const Item = React.memo(({ item }) => {
  if (item.color === "hidden") {
    item.height = 100;
    item.width = 100;
  }

  return (
    <ResizableWrapper width={item.width} height={item.height}>
      <div className="board-item-content">
        <div className="card-remove">
          <i className="material-icons" onMouseDown={item.onSend}>
            &#xE5CD;
          </i>
        </div>
        <div className="frame-wrapper">
          <img src={item.url} alt="" className="image" />
          <img src={item.frameUrl} alt="frame" className="frame-overlay" />
        </div>
      </div>
    </ResizableWrapper>
  );
});

// Item component.
const ColumnItem = React.memo(({ item }) => {
  item.height = 100;
  item.width = 150;

  return (
    <div
      className="item"
      style={{ width: `${item.width}px`, height: `${item.height}px` }}
    >
      <div className="board-item-content">
        <div className="card-remove">
          <i className="material-icons" onMouseDown={item.onSend}>
            add
          </i>
        </div>
        <div className="frame-wrapper">
          <img src={item.url} alt="" className="image" />
          <img src={item.frameUrl} alt="frame" className="frame-overlay" />
        </div>
      </div>
    </div>
  );
});
