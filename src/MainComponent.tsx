import React, { useEffect, useState } from "react";

import "./assets/index.css";
import { generateItems, useSend } from "./utils";
import { ResizableWrapper } from "./components/ResizableWrapper";
import { SideBar } from "./components/SideBar";
import { AutoGrid } from "./components/AutoGrid";
import { useSelector } from "react-redux";
import { FreeformGrid } from "./components/FreeformGrid";
import { RootState } from "./redux/store";
import { useExportAsImage } from "./hooks/useExportAsImage";

export const MainComponent = () => {
  const { exportRef, exportAsImage } = useExportAsImage("dashboard.png");

  const autoGridEnabled = useSelector(
    (state: RootState) => state.picture.autoGrid
  );

  const [hiddenItemsVisible, setHiddenItemsVisible] = useState<boolean>(true);

  // Items state.
  const [items, setItems] = useState<{ active: any[]; hidden: any[] }>({
    active: [],
    hidden: [],
  });

  useEffect(() => {
    const fetchItems = async () => {
      const activeItems = await generateItems();
      setItems((prev) => ({
        ...prev,
        active: activeItems,
      }));
    };
    fetchItems();
  }, []);

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

      {autoGridEnabled ? (
        <AutoGrid
          activeItems={children.active}
          activeItemsLength={items.active.length}
          sideBarIsOpen={hiddenItemsVisible}
          exportRef={exportRef}
        />
      ) : (
        <FreeformGrid
          activeItems={items.active}
          sideBarIsOpen={hiddenItemsVisible}
          exportRef={exportRef}
        />
      )}
      <button onClick={exportAsImage}>Export</button>
    </div>
  );
};

// Item component.
const Item = React.memo(({ item }) => {
  const framesEnabled = useSelector(
    (state: RootState) => state.picture.framesEnabled
  );

  const width = item.color === "hidden" ? 100 : item.width;
  const height = item.color === "hidden" ? 100 : item.height;

  console.log(item.author);
  return (
    <>
      <ResizableWrapper width={width} height={height + 20}>
        <div className="board-item-content">
          <div className="card-remove">
            <i className="material-icons" onMouseDown={item.onSend}>
              &#xE5CD;
            </i>
          </div>
          <div className="frame-wrapper">
            <img src={item.url} alt="" className="image" />
            {framesEnabled && (
              <img src={item.frameUrl} alt="frame" className="frame-overlay" />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              flexDirection: "row",
              fontSize: 14,
              color: "white",
              lineHeight: "1em",
              margin: "4px 2px 0px 2px",
            }}
          >
            <span>By {item.author} on Unsplash</span>
            <button onClick={() => window.open(item.link, "_blank")}>
              URL
            </button>
          </div>
        </div>
      </ResizableWrapper>
    </>
  );
});

// Item component.
const ColumnItem = React.memo(({ item }) => {
  const framesEnabled = useSelector(
    (state: RootState) => state.picture.framesEnabled
  );

  const height = 100;
  const width = 150;

  return (
    <div
      className="item"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="board-item-content">
        <div className="card-remove">
          <i className="material-icons" onMouseDown={item.onSend}>
            add
          </i>
        </div>
        <div className="frame-wrapper">
          <img src={item.url} alt="" className="image" />
          {framesEnabled && (
            <img src={item.frameUrl} alt="frame" className="frame-overlay" />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          flexDirection: "row",
          fontSize: 10,
          color: "white",
          lineHeight: "1em",
          margin: "4px 2px 0px 2px",
        }}
      >
        <span>By {item.author} on Unsplash</span>
        <button onClick={() => window.open(item.link, "_blank")}>URL</button>
      </div>
    </div>
  );
});
