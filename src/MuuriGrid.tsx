import { useEffect, useRef } from "react";
import Muuri from "muuri";
// import "./MuuriGrid.css";

const MuuriGrid = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const grid = new Muuri(gridRef.current, { dragEnabled: true });

    return () => {
      grid.destroy();
    };
  }, []);

  return (
    <div ref={gridRef} className="grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="item">
          <div className="item-content">Item {i + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default MuuriGrid;
