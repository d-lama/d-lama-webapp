import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../../components/Header';
import './Home.css';
import { CustomButton } from './CustomButton';

export const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <CustomButton title="P1" progress={75} />
            </IonCol>
            <IonCol>
              <CustomButton title="P2" progress={10} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CustomButton title="P3" progress={90} />
            </IonCol>
            <IonCol>
              <CustomButton title="P4" progress={80} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
