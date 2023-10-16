import logo from "./logo.svg";
import "./App.css";
import { useActivityContext } from "./contexts/ActivityContext";
import NavBar from "../src/component/shared/NavBar";

function App() {
  const {
    generateLogoHeight,
    generateLogoWidth,
    inactivateMouseDuration,
    allowEnlargement,
    allowRotation,
    isActivityBarOpen,
    toogleNavBar,
  } = useActivityContext();

  return (
    <div className="App">
      <NavBar />

      <header className={`App-header ${!isActivityBarOpen && "full"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          width={"30"}
          className="icon"
          onClick={toogleNavBar}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>

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
