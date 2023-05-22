import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";
import { IRankingData } from "./Ranking";

export const useProjectRanking = (projectId: number) => {
  const { token } = useAuthStore();
  const [, setLoading] = useState(false);

  const fetchProjectRanking = async (): Promise<IRankingData[]> => {
    setLoading(true);
    try {
      return await axios
        .get<IRankingData[]>(`${API_URL}/project/${projectId}/ranking`, {
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

  return useQuery<IRankingData[], Error>(
    "useProjectRanking",
    fetchProjectRanking,
    {
      enabled: true,
      retry: 3,
      refetchOnWindowFocus: false,
    }
  );
};
