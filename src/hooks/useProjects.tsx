import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";

export interface IProjectsData {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  isReady: boolean;
  dataPoints: [];
  labels: [];
}

export const useProjects = () => {
  const { token } = useAuthStore();
  const [, setLoading] = useState(false);

  const fetchProjects = async (): Promise<IProjectsData[]> => {
    setLoading(true);
    try {
      return await axios
        .get<IProjectsData[]>(`${API_URL}/project`, {
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

  return useQuery<IProjectsData[], Error>("userProjects", fetchProjects, {
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
