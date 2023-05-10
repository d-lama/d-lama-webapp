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
  const { token } = useAuthStore();

  const fetchProjects = async () => {
    const response = await axios.get(API_URL + "/project/my", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response && response.data) {
      //   setProjects(response.data);
      console.log(response.data);
    }
    setProjects(mockProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects };
};
