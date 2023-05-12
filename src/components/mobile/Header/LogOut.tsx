import { IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useUserStore } from "../../../store/userStore";

export const LogOut: React.FC = () => {
  const { clearUser } = useUserStore();
  return (
    <>
      <IonIcon
        icon={logOutOutline}
        onClick={clearUser}
        className="header-icon ion-float-right"
        aria-label="Log out from the current session"
      />
    </>
  );
};
