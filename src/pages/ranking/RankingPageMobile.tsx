import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {IonIcon, IonItem, IonLabel, IonList, IonThumbnail} from "@ionic/react";
import {HeaderMobile} from "../../components/header/HeaderMobile";
import './RankingPage.css'
import {star} from "ionicons/icons";

interface APIResponse {
    myPositionIndex: number;
    ranking: Labeler[];
}

interface Labeler {
    id: number;
    name: string;
    percentage: number;
}

const RankingScreen: React.FC = () => {
    const [, setLabelers] = useState<Labeler[]>([]);
    //const [bestLabeler, setBestLabeler] = useState<Labeler | null>(null); //uncomment, when API- Connection works
    const [apiResponse, setAPIResponse] = useState<APIResponse | null>(null);
    const generateMockLabelers = () => {
        return {
            myPositionIndex: 2,
            ranking: [
                {
                    id: 7538,
                    name: "Lama-1",
                    percentage: 0.08
                },
                {
                    id: 7539,
                    name: "Lama-2",
                    percentage: 0
                },
                {
                    id: 7540,
                    name: "Franz Schubert",
                    percentage: 0.05
                },
                {
                    id: 7541,
                    name: "Lama-3",
                    percentage: 0.1
                },
                {
                    id: 7542,
                    name: "Lama-4",
                    percentage: 0.03
                }
            ]
        };
    };

    useEffect(() => {
        const mockData = generateMockLabelers();
        setAPIResponse(mockData);
        //fetchLabelers(); ////uncomment, when API- Connection works
    }, []);

/*    const fetchLabelers = async () => {
        try {
            const response = await axios.get('/api/labelers'); // Anpassen der API-Endpunkt-URL
            const rankingData = response.data.ranking;
            setLabelers(rankingData);
        } catch (error) {
            console.error('Error fetching labelers:', error);
        }
    };*/

    //uncomment, when API-Connection works
/*    const fetchLabelers = async () => {
        try {
            const response = await axios.get('/api/labelers'); // Anpassen der API-Endpunkt-URL
            const apiData = response.data;
            const rankingData = apiData.ranking;
            setLabelers(rankingData);
            setAPIResponse(apiData);

            const best = getBestLabeler(rankingData);
            setBestLabeler(best);

        } catch (error) {
            console.error('Error fetching labelers:', error);
        }
    };*/


    const getBestLabeler = () => {
        let bestLabeler: Labeler | undefined;
        let maxPercentage = 0;

        if (apiResponse) {
            apiResponse.ranking.forEach((labeler) => {
                if (labeler.percentage > maxPercentage) {
                    bestLabeler = labeler;
                    maxPercentage = labeler.percentage;
                }
            });
        }

        return bestLabeler;
    };

    //uncomment, when API-Connection works
/*    const getBestLabeler = (labelers: Labeler[]) => {
        let best: Labeler | null = null;
        let maxPercentage = 0;

        labelers.forEach((labeler) => {
            if (labeler.percentage > maxPercentage) {
                best = labeler;
                maxPercentage = labeler.percentage;
            }
        });

        return best;
    };*/




    const renderRanking = () => {
        const bestLabeler = getBestLabeler();
        //const best = bestLabeler;    //uncomment, when API-Connection works

        return (
            apiResponse && (
                <IonList>
                    {apiResponse.ranking.map((labeler, index) => {
                        const isCurrentUser = index === apiResponse.myPositionIndex;
                        const labelerName = isCurrentUser ? 'You' : labeler.name;
                        const isBestLabeler = labeler === bestLabeler;
                        // const isBestLabeler = labeler === bestLabeler; //uncomment, when API-Connection works

                        return (
                            <IonItem  key={labeler.id}>
                                <IonThumbnail className={'avatar'} slot="start">
                                    {isBestLabeler ? (
                                        <IonIcon icon={star} size={'custom'}  style={{ fontSize: '45px' }} color={'warning'} />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="darkviolet"/>
                                            <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="central" fontSize="30" fill="#ffffff">L</text>
                                        </svg>
                                    )}
                                </IonThumbnail>
                                <IonLabel className={'label-content'} style={{ display: "flex" }}>
                                    <div>
                                        <h1 id={'names'}>{labelerName}</h1>
                                        <p>{labeler.percentage}</p>
                                    </div>
                                </IonLabel>
                            </IonItem>
                        );
                    })}
                </IonList>
            )
        );
    };

    return (
        <div>
            <HeaderMobile/>
            {renderRanking()}
        </div>
    );
};

export default RankingScreen;