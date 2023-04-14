import './Home.css';
import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/Header';
import { ProjectGrid } from './ProjectGrid';

export const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <ProjectGrid />
      </IonContent>
    </IonPage>
  );
};
