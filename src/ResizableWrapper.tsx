import { useRefresh } from "muuri-react";
import { useRef } from "react";
import { ResizableBox } from "react-resizable";
import debounce from "lodash/debounce";

export const ResizableWrapper = (Component, { width, height }: any) => {
  // Return the wrapped resizable component.
  return function WrappedComponent(props) {
    // Muuri-react provides all the tools to manage scaling.
    // You can implement it however you want.
    const ref = useRef();
    const refresh = useRefresh();
    // Get the best performance with debouncing.
    // It is not mandatory to use.
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
          {/* React-resizable is used to handle the resizing. */}
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
            <Component {...props} />
          </ResizableBox>
        </div>
      </div>
    );
  };
};
