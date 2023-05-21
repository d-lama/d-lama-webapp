import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./pages/home";
import LabelScreen from "./pages/labelscreen/LabelScreen";
import Login from "./pages/login";
import FileUploadDesktop from "./pages/projectCreation/FileUploadDesktop";
import Registration from "./pages/registration/Registration";
import RegistrationSucceed from "./pages/registration/registrationSucceed/RegistrationSucceed";
import { useUserStore } from "./store/userStore";

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
import ProjectCreationDesktop from "./pages/projectCreation/ProjectCreationDesktop";
import RankingPageMobile from "./pages/ranking/RankingPageMobile";
import "./theme/variables.css";

import ProjectOverviewDesktop from "./pages/ProjectOverviewDesktop";

setupIonicReact();

export const API_URL = "https://backend-dlama-stage.pm4.init-lab.ch/api";
export const MIN_DESKTOP_WIDTH = 768;

const App: React.FC = () => {
  let isAuthenticated = useUserStore().user?.isAuthenticated || false;
  const [, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    {/* protected routes */}
                    <ProtectedRoute
                        exact
                        path="/home"
                        component={Home}
                        isAuthenticated={isAuthenticated}
                        authenticationPath="/login"
                    />
                    <ProtectedRoute
                        exact
                        path="/projectcreation"
                        component={ProjectCreationDesktop}
                        isAuthenticated={isAuthenticated}
                        authenticationPath="/login"
                    />
                    <ProtectedRoute
                        exact
                        path="/fileUpload/:projectId"
                        component={FileUploadDesktop}
                        isAuthenticated={isAuthenticated}
                        authenticationPath="/login"
                    />
                    <ProtectedRoute
                        exact
                        path="/ranking"
                        component={RankingPageMobile}
                        isAuthenticated={isAuthenticated}
                        authenticationPath="/login"
                    />
                    {/* open routes */}
                    <Route exact path="/login">
                        {isAuthenticated ? <Redirect to="/home"/> : <Login/>}
                    </Route>
                    <Route exact path="/registration">
                        {isAuthenticated ? <Redirect to="/home"/> : <Registration/>}
                    </Route>
                    <Route exact path="/registrationsucceed">
                        {isAuthenticated ? (
                            <Redirect to="/home"/>
                        ) : (
                            <RegistrationSucceed/>
                        )}
                    </Route>
                    <Route exact path="/label/:id">
                        {isAuthenticated ? <LabelScreen/> : <Redirect to="/home"/>}
                    </Route>
                  <Route exact path="/project/:id">
                    <ProjectOverviewDesktop/>
                  </Route>
                    {/* redirect routes */}
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
