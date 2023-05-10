import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact, IonSpinner} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import LabelScreen from "./pages/labelscreen/LabelScreen";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RegistrationSucceed from "./pages/RegistrationSucceed";
import React, {useEffect, useState} from "react";

import "./theme/variables.css";

setupIonicReact();

export const API_URL = "https://backend-dlama-stage.pm4.init-lab.ch/api";

/* Token stuff -> TODO: export to token.js*/


setupIonicReact();

const App: React.FC = () => {
    const [, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/home">
                        <Home/>
                    </Route>
                    <Route exact path="/registration">
                        <Registration/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/registrationsucceed">
                        <RegistrationSucceed/>
                    </Route>
                    <Route exact path="/label">
                        <LabelScreen projectId={1}/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
