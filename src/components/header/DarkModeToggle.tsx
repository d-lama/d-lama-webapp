import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import { useEffect, useState } from "react";

export const DarkModeToggle = (props: any) => {
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
    <>
      {props.isMenu ? (
        <IonItem
          onClick={handleToggle}
          detail={true}
          detailIcon={darkMode ? sunny : moon}
          className="ion-activatable ion-focusable"
          style={{ cursor: "pointer" }}
        >
          <IonLabel>{darkMode ? "Light" : "Dark"} Mode</IonLabel>
        </IonItem>
      ) : (
        <IonIcon
          icon={darkMode ? sunny : moon}
          onClick={handleToggle}
          className="header-icon"
          aria-label="Switch between dark and light mode"
        />
      )}
    </>
  );
};
