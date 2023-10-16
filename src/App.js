import logo from "./logo.svg";
import "./App.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { useActivityContext } from "./contexts/ActivityContext";

function App() {
  const {
    generateLogoHeight,
    generateLogoWidth,
    inactivateMouseDuration,
    allowEnlargement,
    allowRotation,
  } = useActivityContext();

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{
            ...(allowEnlargement && {
              width: generateLogoWidth(),
              height: generateLogoHeight(),
            }),
            ...(!allowRotation && {
              pointerEvents: "none",
            }),
          }}
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          Your Mouse has been inactivity for {inactivateMouseDuration} seconds
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
