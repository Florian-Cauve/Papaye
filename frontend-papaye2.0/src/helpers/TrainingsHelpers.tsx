import axios from "axios";
import {CreateTraining} from './interfaces/interfaces'

const TRAININGS_API_BASE_URL = "http://localhost:8082/trainings/"

export const getTrainingsById = (TrainingId: number) => {
    return axios.get(TRAININGS_API_BASE_URL + TrainingId);
}

export const getTrainingsFromUser = (userId: string) => {
    return axios.get("http://localhost:8082/users/" + userId + "/trainings/");
}

export const addTraining = (createTraining: CreateTraining) => {
    return axios.post(TRAININGS_API_BASE_URL, createTraining);
}
