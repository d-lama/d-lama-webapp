import {
  IonAvatar,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonMenuToggle,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useUserStore } from "../../store/userStore";
import { DarkModeToggle } from "./DarkModeToggle";
import "./Header.css";
import lama5 from "./lama5.jpg";
import lama6 from "./lama6.jpg";

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
            <IonAvatar className="item-avatar-header">
              <img src={lama5} alt="Lama" />
            </IonAvatar>
            D-LAMA
            <IonAvatar className="item-avatar-header">
              <img src={lama6} alt="Lama" />
            </IonAvatar>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};
