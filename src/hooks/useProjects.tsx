import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";
import { IProjectData } from "./useProject";

export const useProjects = () => {
  const { token } = useAuthStore();
  const [, setLoading] = useState(false);

  const fetchProjects = async (): Promise<IProjectData[]> => {
    setLoading(true);
    try {
      return await axios
        .get<IProjectData[]>(`${API_URL}/project`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data);
    } catch (error) {
      throw new Error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return useQuery<IProjectData[], Error>("userProjects", fetchProjects, {
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
