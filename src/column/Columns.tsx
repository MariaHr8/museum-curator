/* React */
import React, { useState } from "react";
/* Muuri-react */
import { MuuriComponent, useGrid } from "muuri-react";
/* Utils & components */
import { Column, Header, Demo, Dashboard } from "./columnComponents";
import { boardOptions, columnOptions, getRandomWord, useSend } from "./utils";

import "./columnStyle.css";
import { generateItems } from "../utils";

export const Columns = () => {
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
    active: items.active.map((item) => <Item item={item} key={item.id} />),
    hidden: items.hidden.map((item) => <Item item={item} key={item.id} />),
  };

  return (
    <Demo>
      {/* Columns container */}
      <MuuriComponent {...boardOptions}>
        {/* 'To do' column */}
        <Column actionClass="hidden" title="Hidden">
          {/* Column content */}
          <MuuriComponent id={"HIDDEN"} onSend={onSend} {...columnOptions}>
            {children.hidden}
          </MuuriComponent>
        </Column>
        {/* 'Working' column */}
        <Column actionClass="active" title="Active">
          {/* Column content */}
          <MuuriComponent id={"ACTIVE"} onSend={onSend} {...columnOptions}>
            {children.active}
          </MuuriComponent>
        </Column>
        {/* 'Done' column */}
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
    <div className="board-item">
      <div className="board-item-content">
        <span>Item </span>
        {`${item.id} - ${tag}`}
        <div className={`tab-item ${gridId}-tab-item`} />
      </div>
    </div>
  );
});
