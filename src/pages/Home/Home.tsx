import './Home.css';
import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react';
import Header from '../../components/Header';
import { ProjectGrid } from './ProjectGrid';
import { add } from 'ionicons/icons';

export const Home: React.FC = () => {
  const handleAddProject = () => {
    // TODO: route to add project page
    console.log('click');
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size='10'>
              <h1 className='home-title'>Projects</h1>
            </IonCol>
            <IonCol size='2' className='ion-text-right'>
              <IonIcon
                icon={add}
                onClick={handleAddProject}
                aria-label='Add a new project'
                className='home-add-project-icon'
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <ProjectGrid />
      </IonContent>
    </IonPage>
  );
};
