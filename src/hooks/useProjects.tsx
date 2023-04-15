import axios from "axios";
import { useEffect, useState } from "react";
import mockProjects from "./testProjects.json"

export interface IProjectData {
    id: number,
    title: string,
    progress: number
}

export const useProjects = () => {
    const [projects, setProjects] = useState<IProjectData[]>([]);

    // TODO: fetch from real api and remove mocks
    const fetchProjects = async () => {
        // const response = await axios.get(
        //   "https://fakestoreapi.com/products"
        // );

        // if (response && response.data) setProjects(response.data);
        setProjects(mockProjects)
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects }
}
