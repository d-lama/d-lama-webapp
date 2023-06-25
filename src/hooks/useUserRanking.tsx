import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";
import { IRankingData } from "./Ranking";

export interface IUserRankingData {
  myPositionIndex: number;
  ranking: IRankingData[];
}

export const useUserRanking = () => {
  const { token } = useAuthStore();
  const [, setLoading] = useState(false);

  const fetchUserRanking = async (): Promise<IUserRankingData> => {
    setLoading(true);
    try {
      return await axios
        .get<IUserRankingData>(`${API_URL}/user/ranking`, {
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

  return useQuery<IUserRankingData, Error>("useUserRanking", fetchUserRanking, {
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
