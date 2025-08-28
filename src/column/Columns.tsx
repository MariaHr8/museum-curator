/* React */
import React, { useState } from "react";
/* Muuri-react */
import { MuuriComponent, useGrid } from "muuri-react";
/* Utils & components */
import { Column, Header, Demo, Dashboard } from "./columnComponents";
import { boardOptions, columnOptions, getRandomWord, useSend } from "./utils";

import "./columnStyle.css";
import { generateItems } from "../utils";
import { ResizableWrapper } from "../ResizableWrapper";

export const Columns = () => {
  // Items state.
  const [items, setItems] = useState({
    active: generateItems(),
    hidden: [generateItems()[0]],
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
      };
      return <Item item={item3} key={item.id} />;
    }),
    hidden: items.hidden.map((item) => {
      const item3 = {
        ...item,
        color: "hidden",
      };
      return <Item item={item3} key={item.id} />;
    }),
  };

  return (
    <Demo>
      <MuuriComponent {...boardOptions}>
        {/* 'To do' column */}
        <Column actionClass="hidden" title="Hidden">
          {/* Column content */}
          <MuuriComponent id={"HIDDEN"} onSend={onSend} {...columnOptions}>
            {children.hidden}
          </MuuriComponent>
        </Column>
        {/* 'Working' column */}
        <Dashboard actionClass="active" title="Active">
          {/* Column content */}
          <MuuriComponent
            id={"ACTIVE"}
            dragEnabled
            dragStartPredicate={{ handle: ".frame-wrapper" }}
            onSend={onSend}
            {...columnOptions}
          >
            {children.active}
          </MuuriComponent>
        </Dashboard>
      </MuuriComponent>
    </Demo>
  );
};

// Item component.
const Item = React.memo(({ item }) => {
  const [tag] = useState(getRandomWord());
  const grid = useGrid();
  const gridId = (grid?.id ?? "").toLowerCase(); // safe

  return (
    <ResizableWrapper width={item.width} height={item.height}>
      <div className="board-item-content">
        {/* <div className="card-remove">
          <i className="material-icons" onMouseDown={item.remove}>
            &#xE5CD;
          </i>
        </div> */}
        <div className="frame-wrapper">
          <img src={item.url} alt="" className="image" />
          <img src={item.frameUrl} alt="frame" className="frame-overlay" />
        </div>
      </div>
    </ResizableWrapper>
  );
});
