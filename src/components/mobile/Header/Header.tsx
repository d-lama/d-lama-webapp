import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { DarkModeToggle } from "./DarkModeToggle";
import "./Header.css";
import { LogOut } from "./LogOut";

export const Header: React.FC = () => {
  return (
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="secondary">
          <DarkModeToggle />
        </IonButtons>
        <IonButtons slot="primary">
          <LogOut />
        </IonButtons>
        <IonTitle className="header-title ion-text-center">D-LAMA</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
