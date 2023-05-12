import { IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";

export const LogOut: React.FC = () => {
  const { clearUser } = useUserStore();
  const { clearToken } = useAuthStore();
  const handleLogout = () => {
    clearUser();
    clearToken();
  };
  return (
    <IonIcon
      icon={logOutOutline}
      onClick={handleLogout}
      className="header-icon"
      aria-label="Log out from the current session"
    />
  );
};
