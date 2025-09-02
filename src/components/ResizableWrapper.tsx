import { debounce } from "lodash";
import { useRefresh } from "muuri-react";
import { useRef } from "react";
import { ResizableBox } from "react-resizable";

// In ResizableWrapper.tsx
export const ResizableWrapper = ({ width, height, children }) => {
  const ref = useRef();
  const refresh = useRefresh();
  const refreshWithdebounce = debounce(
    () => requestAnimationFrame(refresh),
    50
  );

  return (
    <div
      ref={ref}
      className="item"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="muuri-item">
        <ResizableBox
          width={width}
          height={height}
          minConstraints={[width, height]}
          onResize={(_, { size }) => {
            ref.current.style.width = size.width + "px";
            ref.current.style.height = size.height + "px";
            refreshWithdebounce();
          }}
        >
          {children}
        </ResizableBox>
      </div>
    </div>
  );
};
