import { ReactNode, useState } from "react";
import { ResizableBox } from "react-resizable";

interface ResizableWrapperProps {
  width: number;
  height: number;
  children: ReactNode;
}

export const ResizableWrapper = ({ width, height, children }: ResizableWrapperProps) => {
  const [size, setSize] = useState({ width, height });

  return (
    <div className="item" style={{ width: `${size.width}px`, height: `${size.height}px` }}>
      <ResizableBox
        width={size.width}
        height={size.height}
        minConstraints={[width, height]}
        onResizeStop={(_, { size: newSize }) => setSize(newSize)}
        resizeHandles={["se"]}
      >
        {children}
      </ResizableBox>
    </div>
  );
};
