import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, closeOutline } from "ionicons/icons";
import { useUserStore } from "../../store/userStore";
import { DarkModeToggle } from "../header/DarkModeToggle";
import { LogOut } from "../header/LogOut";

export const MenuDesktop: React.FC = () => {
  let isAuthenticated = useUserStore().user?.isAuthenticated || false;

  return (
    <>
      {isAuthenticated && (
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
              <IonMenuToggle
                slot="primary"
                className="ion-activatable ion-focusable"
                style={{ cursor: "pointer" }}
              >
                <IonButtons>
                  <IonIcon
                    icon={closeOutline}
                    style={{ fontSize: "2rem" }}
                    color="secondary"
                  />
                </IonButtons>
              </IonMenuToggle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem href="/home" detail={true}>
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem
                    href="/project-create"
                    detail={true}
                    detailIcon={addOutline}
                  >
                    <IonLabel>Create New Project</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <DarkModeToggle isMenu={true} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <LogOut isMenu={true} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonMenu>
      )}
    </>
  );
};
