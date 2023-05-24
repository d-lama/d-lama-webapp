import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";

export interface IMyProjectData {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  isReady: boolean;
  dataPoints: [];
  labels: [];
  creationDate: Date;
  updateDate: Date;
}

export const useMyProjects = () => {
  const { token } = useAuthStore();
  const [, setLoading] = useState(false);

  const fetchProjects = async (): Promise<IMyProjectData[]> => {
    setLoading(true);
    try {
      return await axios
        .get<IMyProjectData[]>(`${API_URL}/project/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
    } catch (error) {
      throw new Error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return useQuery<IMyProjectData[], Error>("useMyProjects", fetchProjects, {
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: true,
  });
};
