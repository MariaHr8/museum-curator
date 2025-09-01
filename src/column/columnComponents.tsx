import React from "react";

// Column component.
export const Column = ({ children, actionClass, title }) => {
  return <div className={"board-column " + actionClass}>{children}</div>;
};
export const Dashboard = ({ children, actionClass, title }) => (
  <div className={"board-column " + actionClass}>{children}</div>
);

// Demo component.
export const Demo = ({ children }) => <div>{children}</div>;

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2>Gallery Curator</h2>
    <h4>
      <span>Drag the items to start arranging your gallery</span>
    </h4>
  </React.Fragment>
);
