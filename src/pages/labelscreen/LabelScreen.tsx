import { IonContent, IonPage } from '@ionic/react';
import './LabelScreen.css';
import React, { useState, useEffect } from 'react';
import LabelNavigationComponent from './components/LabelNavigationComponent';
import LabelSwipeContainerComponent from './components/LabelSwipeContainerComponent';
import { API_URL } from '../../App';
import { getToken } from '../../token';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import HelpComponent from "./components/HelpComponent";
import WinComponent from "./components/WinComponent";

export interface Project {
    id: number;
    projectName: string;
    description: string;
    labeledDataPointsCount: number;
    dataPointsCount: number;
    labels: {
        id: number;
        name: string;
        description: string;
    }[];
}

const LabelScreen: React.FC = () => {
    const [projectInfo, setProjectInfo] = useState<Project | undefined>();
    const [dataPointAmount, setDataPointAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    const [showHelp, setShowHelp] = useState(false);
    const [undoAction, setUndoAction] = useState<boolean>(false);
    const [showWin, setShowWin] = useState(false);

    const projectParams:{id:string|undefined} = useParams();
    const projectId = projectParams.id;

    useEffect(() => {
        async function getProjectInfo() {
            try {
                const response = await axios.get(`${API_URL}/Project/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });

                console.log(response);


                setProgress(response.data.labeledDataPointsCount);
                setProjectInfo(response.data);

                if (response.data.labeledDataPointsCount == response.data.dataPointsCount) {
                    setShowWin(true);
                }

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

    let containerNumber = projectInfo.labels.length;

    return (
        <IonPage>
            <IonContent fullscreen scrollY={false}>
                <LabelNavigationComponent progress={progress} maxNumberOfLabels={dataPointAmount} setShowHelp={setShowHelp} undoAction={setUndoAction} />
                <LabelSwipeContainerComponent numberOfContainers={containerNumber} projectData={projectInfo} setProgress={setProgress} setUndoAction={setUndoAction} undoAction={undoAction} setShowWin={setShowWin} />
            </IonContent>

            {showHelp && <HelpComponent projectInfo={projectInfo} setShowHelp={setShowHelp} />}
            { showWin && <WinComponent />}
        </IonPage>
    );
};

export default LabelScreen;
