import { IonContent, IonPage, IonProgressBar, useIonToast } from "@ionic/react";
import { flameOutline } from "ionicons/icons";
import { HeaderMobile } from "../../components/header/HeaderMobile";
import BottomNavigationBar from "../../components/menu/BottomNavigationBar";
import { UserRanking } from "../../components/ranking/UserRanking";
import { useUserRanking } from "../../hooks/useUserRanking";
import "./RankingPage.css";

export default function RankingPageMobile() {
  const [present] = useIonToast();
  const userRankingQuery = useUserRanking();

  if (userRankingQuery.isLoading || userRankingQuery.isRefetching) {
    return <IonProgressBar type="indeterminate" color="primary" />;
  }

  if (userRankingQuery.isError || userRankingQuery.data === undefined) {
    present({
      message: "An error occurred while fetching the user rankings.",
      duration: 5000,
      position: "top",
      icon: flameOutline,
      color: "danger",
    });
    return <></>;
  }

  return (
    <>
      <IonPage>
        <HeaderMobile />
        <IonContent>
          <UserRanking data={userRankingQuery.data} />
        </IonContent>
        <BottomNavigationBar />
      </IonPage>
    </>
  );
}
