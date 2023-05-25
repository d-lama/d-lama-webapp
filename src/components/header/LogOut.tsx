import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";

export const LogOut = (props: any) => {
  const { clearUser } = useUserStore();
  const { clearToken } = useAuthStore();
  const handleLogout = () => {
    clearUser();
    clearToken();
  };
  return (
    <>
      {props.isMenu ? (
        <IonItem
          onClick={handleLogout}
          detail={true}
          detailIcon={logOutOutline}
          className="ion-activatable ion-focusable"
          style={{ cursor: "pointer" }}
        >
          <IonLabel>Log Out</IonLabel>
        </IonItem>
      ) : (
        <IonIcon
          icon={logOutOutline}
          onClick={handleLogout}
          className="header-icon"
          aria-label="Log out from the current session"
        />
      )}
    </>
  );
};
