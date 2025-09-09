import { MuuriComponent } from "muuri-react";
import { columnOptions } from "../utils";

export const AutoGrid = ({
  activeItems,
  activeItemsLength,
  sideBarIsOpen,
  exportRef,
}) => {
  return (
    <div
      className={`dashboard ${sideBarIsOpen ? "open" : " "}`}
      ref={exportRef}
    >
      <div className={"board-column active"}>
        <MuuriComponent
          key={activeItemsLength}
          id="ACTIVE"
          dragEnabled
          dragStartPredicate={{ handle: ".frame-wrapper" }}
          {...columnOptions}
        >
          {activeItems}
        </MuuriComponent>
      </div>
    </div>
  );
};
