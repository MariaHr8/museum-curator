import { MuuriComponent } from "muuri-react";
import { columnOptions } from "../utils";

export const Playboard = ({
  activeItems,
  activeItemsLength,
  sideBarIsOpen,
}) => {
  return (
    <div className={`dashboard ${sideBarIsOpen ? "open" : " "}`}>
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
