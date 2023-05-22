import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from "@ionic/react";
import { star } from "ionicons/icons";
import { IRankingData } from "../../hooks/Ranking";
import { IUserRankingData } from "../../hooks/useUserRanking";
import Lama1Logo from "./lama1.svg";

interface IRankingProps {
  data: IUserRankingData;
}

const getBestLabeler = (labelers: IRankingData[]) => {
  let best: IRankingData | null = null;
  let maxPercentage = 0;

  labelers.forEach((labeler) => {
    if (labeler.percentage > maxPercentage) {
      best = labeler;
      maxPercentage = labeler.percentage;
    }
  });

  return best;
};

export const UserRanking: React.FC<IRankingProps> = ({ data }) => {
  const bestLabeler = getBestLabeler(data.ranking);

  return (
    <IonList>
      {data.ranking.map((labeler, index) => {
        const isCurrentUser = index === data.myPositionIndex;
        const labelerName = isCurrentUser ? "You" : labeler.name;
        const isBestLabeler = labeler === bestLabeler;
        const roundedPercentage = (labeler.percentage * 100).toFixed(2);

        return (
          <IonItem key={labeler.id}>
            <IonThumbnail className={"avatar"} slot="start">
              {isBestLabeler ? (
                <IonIcon
                  icon={star}
                  size={"custom"}
                  style={{ fontSize: "45px" }}
                  color={"warning"}
                />
              ) : (
                <img src={Lama1Logo} alt="Lama 1 Logo" />
              )}
            </IonThumbnail>
            <IonLabel className={"label-content"} style={{ display: "flex" }}>
              <div>
                <h1 id={"names"}>{labelerName}</h1>
                <p>{`${roundedPercentage} %`}</p>
              </div>
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};
