import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from "@ionic/react";
import { star } from "ionicons/icons";
import { IRankingData } from "../../hooks/Ranking";
import lama1 from "./lama1.jpg";
import lama2 from "./lama2.jpg";
import lama3 from "./lama3.jpg";
import lama4 from "./lama4.jpg";
import lama5 from "./lama5.jpg";
import lama6 from "./lama6.jpg";

interface IRankingProps {
  data: IRankingData[];
}

const lamas = [lama1, lama2, lama3, lama4, lama5, lama6];

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

function getRandomLama() {
  const randomIndex = Math.floor(Math.random() * lamas.length);
  return lamas[randomIndex];
}

export const ProjectUserRanking: React.FC<IRankingProps> = ({ data }) => {
  const bestLabeler = getBestLabeler(data);

  return (
    <IonList>
      {data.map((labeler) => {
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
                <img src={getRandomLama()} alt="Lama" />
              )}
            </IonThumbnail>
            <IonLabel className={"label-content"} style={{ display: "flex" }}>
              <div>
                <h1 id={"names"}>{labeler.name}</h1>
                <p>{`${roundedPercentage} %`}</p>
              </div>
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};
