import { useUserStore } from "../../store/userStore";
import "./Home.css";
import { HomeAdmin } from "./HomeAdmin";
import { HomeLabeler } from "./HomeLabeler";

export const Home: React.FC = () => {
  return <>{useUserStore().user?.isAdmin ? <HomeAdmin /> : <HomeLabeler />}</>;
};
