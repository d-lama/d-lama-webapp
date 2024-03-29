import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../App";
import { useAuthStore } from "../store/authStore";
import { ILabelData } from "./Label";

export interface IProjectData {
  id: number;
  projectName: string;
  description: string;
  dataPointsCount: number;
  labeledDataPointsCount: number;
  dataType: number;
  labels: ILabelData[];
}

export enum EProjectDataType {
  text = 0,
  image = 1,
}

export const DATA_TYPE = ["Text", "Image"];

export const useProject = (projectId: number) => {
  const { token } = useAuthStore();
  const [, setLoading] = useState(false);

  const fetchProject = async (): Promise<IProjectData> => {
    setLoading(true);
    try {
      return await axios
        .get<IProjectData>(`${API_URL}/project/${projectId}`, {
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

  return useQuery<IProjectData, Error>("useProject", fetchProject, {
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
