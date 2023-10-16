import logo from "./logo.svg";
import "./App.css";
import { useEffect, useLayoutEffect, useState } from "react";

function App() {
  // it is initialized with undefined so that we can tell the cursor
  const [scrollPosition, setPosition] = useState({
    width: 600,
    height: 300,
  });

  useLayoutEffect(() => {
    function updatePosition(e) {
      setPosition({ height: e?.clientY ?? 0, width: e?.clientX ?? 0 });
    }
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const generateLogoWidth = () => {
    const size = (scrollPosition.width / 1440) * 100 + 0.5;

    return `${size}%`;
  };

  const generateLogoHeight = () => {
    // not using percentage here because it will use the need to height
    //of the container of the logo to be min of 100vh
    const size = scrollPosition.height + 10;
    return `${size}px`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{
            width: generateLogoWidth(),
            height: generateLogoHeight(),
          }}
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
