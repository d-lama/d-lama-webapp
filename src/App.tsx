import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import RegistrationSucceed from "./pages/RegistrationSucceed";
import Login from "./pages/login";
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
import ProjectCreationDesktop from "./pages/ProjectCreationDesktop";
import FileUploadDesktop from "./pages/FileUploadDesktop";

setupIonicReact();

export const API_URL = "https://backend-dlama-stage.pm4.init-lab.ch/api";

const App: React.FC = () => {
  let isAuthenticated = useUserStore().user !== null;
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

          {/* open routes */}
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/registration">
            {isAuthenticated ? <Redirect to="/home" /> : <Registration />}
          </Route>
          <Route exact path="/registrationsucceed">
            {isAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <RegistrationSucceed />
            )}
          </Route>
          <Route exact path="/projectcreation">
            {/*TODO: insert redirect*/}
            <ProjectCreationDesktop/>
          </Route>
          <Route exact path="/fileUpload/:projectId">
            {/*TODO: insert redirect*/}
            <FileUploadDesktop/>
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
