import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";
import mockProjects from "./testProjects.json";

export interface IProjectData {
  id: number;
  title: string;
  progress: number;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<IProjectData[]>([]);

  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  return { projects };

  // const { token } = useAuthStore();

  // return axios
  //   .get(API_URL + "/project/my", {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //   .then((res) => res.data as IProjectData);
};
