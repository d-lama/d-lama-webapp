import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./pages/home";
import LabelScreen from "./pages/labelscreen/LabelScreen";
import Login from "./pages/login";
import FileUploadDesktop from "./pages/projectCreation/FileUploadDesktop";
import ProjectCreationDesktop from "./pages/projectCreation/ProjectCreationDesktop";
import ProjectOverviewDesktop from "./pages/projectOverview/ProjectOverviewDesktop";
import RankingPageMobile from "./pages/ranking/RankingPageMobile";
import Registration from "./pages/registration/Registration";
import RegistrationSucceed from "./pages/registration/registrationSucceed/RegistrationSucceed";
import Settings from "./pages/settings/Settings";
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
import "./theme/variables.css";

setupIonicReact();

export const API_URL = "https://backend-dlama-stage.pm4.init-lab.ch/api";
export const MIN_DESKTOP_WIDTH = 768;

const App: React.FC = () => {
  let isAuthenticated = useUserStore().user?.isAuthenticated || false;
  let isAdmin = useUserStore().user?.isAdmin || false;
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
            path="/project-create"
            component={ProjectCreationDesktop}
            isAuthenticated={isAuthenticated}
            authenticationPath="/login"
            isAdmin={isAdmin}
            nonAdminPath="/home"
          />
          <ProtectedRoute
            exact
            path="/fileUpload/:projectId/:dataType"
            component={FileUploadDesktop}
            isAuthenticated={isAuthenticated}
            authenticationPath="/login"
            isAdmin={isAdmin}
            nonAdminPath="/home"
          />
          <ProtectedRoute
            exact
            path="/ranking"
            component={RankingPageMobile}
            isAuthenticated={isAuthenticated}
            authenticationPath="/login"
          />
          <ProtectedRoute
            exact
            path="/settings"
            component={Settings}
            isAuthenticated={isAuthenticated}
            authenticationPath="/login"
          />
          <ProtectedRoute
            exact
            path="/label/:id"
            component={LabelScreen}
            isAuthenticated={isAuthenticated}
            authenticationPath="/login"
          />
          <ProtectedRoute
            exact
            path="/project/:id"
            component={ProjectOverviewDesktop}
            isAuthenticated={isAuthenticated}
            authenticationPath="/login"
            isAdmin={isAdmin}
            nonAdminPath="/home"
          />
          {/* open routes */}
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/registration">
            {isAuthenticated ? <Redirect to="/home" /> : <Registration />}
          </Route>
          <Route exact path="/registration/succeed">
            {isAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <RegistrationSucceed />
            )}
          </Route>
          {/* redirect routes */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
