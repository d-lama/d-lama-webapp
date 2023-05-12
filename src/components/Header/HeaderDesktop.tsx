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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const user = useUserStore((state) => state.user);

  // useEffect(() => {
  //   setIsAuthenticated(user !== null);
  // }, []);
  let isAuthenticated = useUserStore().user !== null;

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
