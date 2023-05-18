import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { homeOutline, settingsOutline, trophyOutline } from "ionicons/icons";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface BottomNavigationBarProps extends RouteComponentProps {}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  history,
}) => {
  const handleNavigation = (path: string) => {
    history.push(path);
  };

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" onClick={() => handleNavigation("/home")}>
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="search" onClick={() => handleNavigation("/rating")}>
        <IonIcon icon={trophyOutline} />
        <IonLabel>Rating</IonLabel>
      </IonTabButton>
      <IonTabButton
        tab="settings"
        onClick={() => handleNavigation("/settings")}
      >
        <IonIcon icon={settingsOutline} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default withRouter(BottomNavigationBar);
