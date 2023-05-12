import { IonPage } from "@ionic/react";
import { MenuDesktop } from "../../components/Menu/MenuDesktop";
import { useUserStore } from "../../store/userStore";
import "./Home.css";
import { HomeAdmin } from "./HomeAdmin";
import { HomeLabeler } from "./HomeLabeler";

export const Home: React.FC = () => {
  const isAdmin = useUserStore((state) => state.user?.IsAdmin);
  return <>{isAdmin ? <HomeAdmin /> : <HomeLabeler />}</>;
};
