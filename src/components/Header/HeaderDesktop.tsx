import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useUserStore } from "../../store/userStore";
import { DarkModeToggle } from "./DarkModeToggle";
import "./Header.css";

export const HeaderDesktop: React.FC = () => {
  let isAuthenticated = useUserStore().user?.isAuthenticated || false;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          {isAuthenticated ? (
            <IonMenuToggle slot="start">
              <IonButtons>
                <IonMenuButton></IonMenuButton>
              </IonButtons>
            </IonMenuToggle>
          ) : (
            <IonButtons slot="primary">
              <DarkModeToggle />
            </IonButtons>
          )}

          <IonTitle className="header-title-desktop ion-text-center">
            D-LAMA
          </IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};
