export const SideBar = ({ isOpen, setIsOpen, hiddenItems }) => {
  const handleButtonPressed = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SideBarButton
        isOpen={isOpen}
        handleButtonPressed={handleButtonPressed}
      />
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Menu Items */}
        <nav className="sidebar-nav">
          <div className="hidden-items-container">
            {hiddenItems.map((item) => item)}
          </div>
        </nav>

        {/* Menu Footer */}
        <div className="sidebar-footer"> TODO </div>
      </div>
    </>
  );
};

export const SideBarButton = ({ isOpen, handleButtonPressed }) => {
  return (
    <button className="menu-button" onClick={handleButtonPressed}>
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
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );
};
