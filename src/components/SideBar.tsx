import { useDispatch } from "react-redux";
import { hideFrames, showFrames } from "../pictureSlice";

export const SideBar = ({ isOpen, setIsOpen, hiddenItems }) => {
  const handleButtonPressed = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  return (
    <>
      <SideBarButton
        isOpen={isOpen}
        handleButtonPressed={handleButtonPressed}
      />
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <h1>Options</h1>
          <h2>Hidden Items</h2>
          <div className="hidden-items-container">
            {hiddenItems.map((item) => item)}
          </div>

          <h2>Mode</h2>
          <input
            type="radio"
            id="framed"
            name="mode"
            value="framed"
            defaultChecked
            onChange={() => dispatch(showFrames())}
          />
          <label>Framed Art</label>
          <br />
          <input
            type="radio"
            id="posters"
            name="mode"
            value="posters"
            onChange={() => dispatch(hideFrames())}
          />
          <label>Posters</label>
        </nav>

        <div className="sidebar-footer"> by Maria Hristova </div>
      </div>
    </>
  );
};

export const SideBarButton = ({ isOpen, handleButtonPressed }) => {
  return (
    <button
      className="menu-button"
      onClick={handleButtonPressed}
      data-open={isOpen}
    >
      <svg
        className="svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
};
