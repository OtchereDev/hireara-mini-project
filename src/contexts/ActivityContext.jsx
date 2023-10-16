import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useInterval } from "../hooks/useInterval";

export const ActivityContext = createContext(null);

const ActivityProvider = ({ children }) => {
  const [isActivityBarOpen, setOpenActivity] = useState(false);
  // state for  activities
  const [allowRotation, setAllowRotation] = useState(false);
  const [allowEnlargement, setAllowEnlargement] = useState(false);
  const [allowInactiveCount, setAllowInactiveCount] = useState(false);

  const [scrollPosition, setPosition] = useState({
    width: 600,
    height: 300,
  });
  const [isMouseOnDoc, setIsMouseOnDoc] = useState(false);
  const [inactivateMouseDuration, setInactiveMouseDuration] = useState(0);
  const intervalRef = useInterval(
    () => {
      setInactiveMouseDuration(inactivateMouseDuration + 1);
    },
    isMouseOnDoc && allowInactiveCount ? 1000 : null
  );

  const generateLogoWidth = () => {
    // 300px is substracted to account for the 300px the sidebar will take
    // but in reality the activity should be track just within the part without the sidebar
    const size =
      (scrollPosition.width / 1440) * 100 + 0.5 - (isActivityBarOpen ? 300 : 0);

    return `${size}%`;
  };

  const generateLogoHeight = () => {
    // not using percentage here because it will use the need to height
    //of the container of the logo to be min of 100vh
    const size = scrollPosition.height + 10;
    return `${size}px`;
  };
  const handleMouseOnDoc = (val) => {
    setIsMouseOnDoc(() => val);
  };

  const toogleNavBar = () => {
    setOpenActivity(!isActivityBarOpen);
  };

  const toggleAllowRotation = (isChecked) => {
    setAllowRotation(isChecked);
  };

  const toggleAllowEnlargement = (isChecked) => {
    setAllowEnlargement(isChecked);
  };

  const toggleAllowInactiveCount = (isChecked) => {
    setAllowInactiveCount(isChecked);
  };

  // 1. detect when mouse enter and leave the document
  // 2. detect when the mouse is in the dom but is moving is false
  // 3. whenever it moves set the time to 0
  useEffect(() => {
    window.document.addEventListener("mouseenter", () =>
      handleMouseOnDoc(true)
    );
    window.document.addEventListener("mouseleave", () =>
      handleMouseOnDoc(false)
    );
    window.document.addEventListener("mousemove", () => {
      setInactiveMouseDuration(0);
    });

    return () => {
      window.document.removeEventListener("mouseenter", () =>
        handleMouseOnDoc(true)
      );
      window.document.removeEventListener("mouseout", () =>
        handleMouseOnDoc(false)
      );
      window.document.addEventListener("mousemove", () => {
        setInactiveMouseDuration(0);
      });
    };
  }, []);
  useLayoutEffect(() => {
    function updatePosition(e) {
      setPosition({ height: e?.clientY ?? 0, width: e?.clientX ?? 0 });
    }
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return (
    <ActivityContext.Provider
      value={{
        generateLogoHeight,
        generateLogoWidth,
        inactivateMouseDuration,
        allowEnlargement,
        allowRotation,
        isActivityBarOpen,
        toogleNavBar,
        toggleAllowRotation,
        toggleAllowEnlargement,
        toggleAllowInactiveCount,
        allowInactiveCount,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error(
      "useActivityContext must be used within a ActivityProvider"
    );
  }
  return ctx;
};

export default ActivityProvider;
