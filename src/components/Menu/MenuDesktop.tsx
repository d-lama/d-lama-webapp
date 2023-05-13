import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useUserStore } from "../../store/userStore";
import { DarkModeToggle } from "../Header/DarkModeToggle";
import { LogOut } from "../Header/LogOut";

export const MenuDesktop: React.FC = () => {
  let isAuthenticated = useUserStore().user?.isAuthenticated || false;

  return (
    <>
      {isAuthenticated && (
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
              <IonMenuToggle slot="primary">
                <IonButtons>
                  <IonIcon icon={closeOutline} style={{ fontSize: "2rem" }} />
                </IonButtons>
              </IonMenuToggle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol>Dark/Light Mode</IonCol>
                <IonCol size="auto">
                  <DarkModeToggle />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Log Out</IonCol>
                <IonCol size="auto">
                  <LogOut />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonMenu>
      )}
    </>
  );
};
