export const FreeformGrid = ({ sideBarIsOpen, items }) => {
  console.log("FreeformGrid items:", items, Array.isArray(items));

  return (
    <div className={`dashboard ${sideBarIsOpen ? "open" : " "}`}>
      <div className={"board-column active"}>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          Freeform arrangement is not yet implemented.
        </h2>
        {items}
      </div>
    </div>
  );
};
