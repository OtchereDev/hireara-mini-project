import React from "react";
import { useActivityContext } from "../../contexts/ActivityContext";

const NavBar = () => {
  const {
    isActivityBarOpen,
    toogleNavBar,
    toggleAllowRotation,
    allowRotation,
    toggleAllowEnlargement,
    toggleAllowInactiveCount,
    allowEnlargement,
    allowInactiveCount,
  } = useActivityContext();
  return (
    <div className={`Sidebar ${!isActivityBarOpen && "hide"} `}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        width={"30"}
        className="icon"
        onClick={toogleNavBar}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <p className="title">Your Control Panel</p>

      <div className="checkboxes-container">
        <div className="">
          <label className="check-container">
            <input
              onChange={(e) => toggleAllowRotation(e.target.checked)}
              type="checkbox"
              value={allowRotation}
            />
            <span className="checkmark"></span>
          </label>
          <p className="check-text">Allow Reverse Rotation</p>
        </div>

        <div className="">
          <label className="check-container">
            <input
              type="checkbox"
              value={allowEnlargement}
              onChange={(e) => toggleAllowEnlargement(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
          <p className="check-text">Allow Enlargement</p>
        </div>

        <div className="">
          <label className="check-container">
            <input
              value={allowInactiveCount}
              onChange={(e) => toggleAllowInactiveCount(e.target.checked)}
              type="checkbox"
            />
            <span className="checkmark"></span>
          </label>
          <p className="check-text">Allow Inactive Timer Count</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
