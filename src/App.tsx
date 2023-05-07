import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import LabelScreen from "./pages/labelscreen/LabelScreen";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RegistrationSucceed from "./pages/RegistrationSucceed";
import React from "react";

setupIonicReact();

const App: React.FC = () => (
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
                    <LabelScreen maxNumberOfLabels={150} progress={50} containerNumber={4} labels={getLabels()}/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

function getLabels() {
  return [
      {name:"Cat", color:"ECD407"},
      {name:"Dog", color:"0956BF"},
      {name:"Fish", color:"379711"},
      {name:"Bird", color:"D72600"},
  ]
}

export default App;
