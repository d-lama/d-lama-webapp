import { IonContent, IonPage } from '@ionic/react';
import './LabelScreen.css';
import React, { useState, useEffect } from 'react';
import LabelNavigationComponent from './components/LabelNavigationComponent';
import LabelSwipeContainerComponent from './components/LabelSwipeContainerComponent';
import { API_URL } from '../../App';
import { getToken } from '../../token';
import axios from 'axios';

const LabelScreen: React.FC<{ projectId: number }> = ({ projectId }) => {
    const [projectInfo, setProjectInfo] = useState<{ id: number; name: string; description: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getProjectInfo() {
            try {
                const response = await axios.get(`${API_URL}/Project/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
                setProjectInfo(response.data.labels);
            } catch (error) {
                // TODO: return to project view or sth
            } finally {
                setLoading(false);
            }
        }

        getProjectInfo();
    }, [projectId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    let progress = 50;
    let maxNumberOfLabels = 150;
    let containerNumber = 4;

    return (
        <IonPage>
            <IonContent fullscreen scrollY={false}>
                <LabelNavigationComponent progress={progress} maxNumberOfLabels={maxNumberOfLabels} />
                <LabelSwipeContainerComponent numberOfContainers={containerNumber} labels={projectInfo} />
            </IonContent>
        </IonPage>
    );
};

export default LabelScreen;
