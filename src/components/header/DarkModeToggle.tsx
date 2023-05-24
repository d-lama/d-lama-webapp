import { IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import { useEffect, useState } from "react";

export const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
    localStorage.setItem("dark-theme", "" + document.body.classList.contains("dark"));
  }, []);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
    localStorage.setItem("dark-theme", "" + document.body.classList.contains("dark"));
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
