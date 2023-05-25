import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from "@ionic/react";
import { DATA_TYPE, IProjectData } from "../../hooks/useProject";

interface IShowProjectProps {
  project: IProjectData;
}

export const ShowProject: React.FC<IShowProjectProps> = ({ project }) => {
  return (
    <>
      <IonCard>
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Details</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid class="details">
            <IonRow>
              <IonCol size="3" className="label">
                Name
              </IonCol>
              <IonCol size="9" className="value">
                {project.projectName}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="3" className="label">
                Description
              </IonCol>
              <IonCol size="9" className="value">
                {project.description}
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="3" className="label">
                Datatype
              </IonCol>
              <IonCol size="9" className="value">
                {DATA_TYPE[project.dataType]}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>

      <IonCard className="card-margin-top">
        <IonCardHeader color={"secondary"}>
          <IonCardTitle>Labels</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid class="details">
            {project.labels.map((label, index) => (
              <IonRow key={label.id}>
                <IonCol size="3" className="label">
                  Label {index + 1}
                </IonCol>
                <IonCol size="9" className="value">
                  {label.name}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
};
