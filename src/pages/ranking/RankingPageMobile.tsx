import React, {useEffect, useState} from 'react';
import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonThumbnail} from "@ionic/react";
import {HeaderMobile} from "../../components/header/HeaderMobile";
import './RankingPage.css'
import {star} from "ionicons/icons";
import axios from "axios";
import {API_URL} from "../../App";
import {useAuthStore} from "../../store/authStore";

interface APIResponse {
    myPositionIndex: number;
    ranking: Labeler[];
}

interface Labeler {
    id: number;
    name: string;
    percentage: number;
}

export default function RankingPageMobile() {
    const {token} = useAuthStore();
    const [bestLabeler, setBestLabeler] = useState<Labeler | null>(null);
    const [apiResponse, setAPIResponse] = useState<APIResponse | null>(null);

    useEffect(() => {
        fetchLabelers();
    }, []);


    const fetchLabelers = () => {
        axios.get(`${API_URL}/user/ranking`, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                const data = response.data;
                const rankingData = data.ranking;
                setAPIResponse(data);

                const best = getBestLabeler(rankingData);
                setBestLabeler(best);
            })
            .catch(error => {
                console.error('Error fetching labelers:', error);
            });
    };

    const getBestLabeler = (labelers: Labeler[]) => {
        let best: Labeler | null = null;
        let maxPercentage = 0;

        labelers.forEach((labeler) => {
            if (labeler.percentage > maxPercentage) {
                best = labeler;
                maxPercentage = labeler.percentage;
            }
        });
        return best;
    };

    return (
        <>
            <IonPage>
                <HeaderMobile/>
                <IonContent>
                {apiResponse && (
                    <IonList>
                        {apiResponse.ranking.map((labeler, index) => {
                            const isCurrentUser = index === apiResponse.myPositionIndex;
                            const labelerName = isCurrentUser ? 'You' : labeler.name;
                            const isBestLabeler = labeler === bestLabeler;
                            const roundedPercentage = (labeler.percentage * 100).toFixed(2);

                            return (
                                <IonItem
                                    key={labeler.id}>
                                    <IonThumbnail
                                        className={'avatar'}
                                        slot="start">
                                        {isBestLabeler ? (
                                            <IonIcon
                                                icon={star}
                                                size={'custom'}
                                                style={{fontSize: '45px'}}
                                                color={'warning'}/>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                 viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="darkviolet"/>
                                                <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="central"
                                                      fontSize="30" fill="#ffffff">L
                                                </text>
                                            </svg>
                                        )}
                                    </IonThumbnail>
                                    <IonLabel
                                        className={'label-content'}
                                        style={{display: "flex"}}>
                                        <div>
                                            <h1
                                                id={'names'}>{labelerName}</h1>
                                            <p>{`${roundedPercentage} %`}</p>
                                        </div>
                                    </IonLabel>
                                </IonItem>
                            );
                        })}
                    </IonList>
                )}
                </IonContent>
            </IonPage>
        </>
    );
};
