import { IonContent, IonPage } from "@ionic/react";
import { HeaderDesktop } from "../../components/header/HeaderDesktop";
import { MenuDesktop } from "../../components/menu/MenuDesktop";

export const HomeAdmin: React.FC = () => {
  return (
    <>
      <MenuDesktop />
      <IonPage id="main-content">
        <HeaderDesktop />
        <IonContent>
          <h1 className="home-title">Projects</h1>
        </IonContent>
      </IonPage>
    </>
  );
};
