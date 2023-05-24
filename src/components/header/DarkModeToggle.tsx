import { IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import { useEffect, useState } from "react";

export const DarkModeToggle: React.FC = () => {
  const currState = localStorage.getItem("dark-theme");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (currState) {
      currState === "true" && addDarkMode();
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        addDarkMode();
      }
    }
    refreshLocalStorage();
  }, []);

  const addDarkMode = () => {
    setDarkMode(true);
    document.body.classList.add("dark");
  };

  const refreshLocalStorage = () => {
    localStorage.setItem(
      "dark-theme",
      "" + document.body.classList.contains("dark")
    );
  };

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
    refreshLocalStorage();
  };

  return (
    <IonIcon
      icon={darkMode ? moon : sunny}
      onClick={handleToggle}
      className="header-icon"
      aria-label="Switch between dark and light mode"
    />
  );
};
