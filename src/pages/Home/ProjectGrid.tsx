import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { CustomButton } from './CustomButton';
import { useProjects } from '../../hooks/useProjects';

export const ProjectGrid: React.FC = () => {
    const { projects } = useProjects();

    return (
        <IonGrid>
            <IonRow>
                {projects.map((project) => (
                    <IonCol size="6" key={project.id}>
                        <CustomButton
                            key={project.id}
                            title={project.title}
                            progress={project.progress}
                        />
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    )
}