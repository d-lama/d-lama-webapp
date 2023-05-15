import { IonContent, IonPage } from '@ionic/react';
import './LabelScreen.css';
import React, { useState, useEffect } from 'react';
import LabelNavigationComponent from './components/LabelNavigationComponent';
import LabelSwipeContainerComponent from './components/LabelSwipeContainerComponent';
import { API_URL } from '../../App';
import { getToken } from '../../token';
import axios from 'axios';

interface Project {
    id: number;
    name: string;
    description: string;
    labels: {
        id: number;
        name: string;
        description: string;
    }[];
}

const LabelScreen: React.FC<{ projectId: number }> = ({ projectId }) => {
    const [projectInfo, setProjectInfo] = useState<Project | undefined>();
    const [dataPointAmount, setDataPointAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getProjectInfo() {
            try {
                const response = await axios.get(`${API_URL}/Project/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
                setProjectInfo(response.data);
            } catch (error) {
                // TODO: return to project view or sth
            } finally {
                setLoading(false);
            }
        }

        getProjectInfo();
    }, [projectId]);

    useEffect(() => {
            async function getDataPointsAmount() {
                try {
                    const response = await axios.get(`${API_URL}/DataPoint/${projectId}/GetNumberOfTextDataPoints`, {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    });
                    setDataPointAmount(response.data);
                } catch (error) {
                    // TODO: return to project view or sth
                }
            }

            getDataPointsAmount();
        }, [dataPointAmount]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!projectInfo) {
        return <p>Project not found.</p>;
    }

    let progress = 0;
    let containerNumber = projectInfo.labels.length;

    return (
        <IonPage>
            <IonContent fullscreen scrollY={false}>
                <LabelNavigationComponent progress={progress} maxNumberOfLabels={dataPointAmount} />
                <LabelSwipeContainerComponent numberOfContainers={containerNumber} projectData={projectInfo} />
            </IonContent>
        </IonPage>
    );
};

export default LabelScreen;
