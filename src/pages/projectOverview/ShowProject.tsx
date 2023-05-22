import {
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
      <IonGrid class="details">
        <IonRow>
          <IonListHeader color="tertiary">
            <IonLabel>Details</IonLabel>
          </IonListHeader>
        </IonRow>

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

        <IonRow>
          <IonListHeader color="tertiary">
            <IonLabel>Labels</IonLabel>
          </IonListHeader>
        </IonRow>

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
    </>
  );
};
