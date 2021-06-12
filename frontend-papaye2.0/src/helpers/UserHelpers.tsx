import axios from "axios";
import {IUser} from "./interfaces/interfaces";

const USER_API_BASE_URL = "http://localhost:8082/users/"

export const getAllUsers = () => {
    return axios.get(USER_API_BASE_URL);
}

export const getUserById = (userId: string) => {
    return axios.get(USER_API_BASE_URL + userId);
}

export const getRecipeFromUserById = (userId: string) => {
    return axios.get(USER_API_BASE_URL + userId + "/receipes")
}

export const getExercicesFromUserById = (userId: string) => {
    return axios.get(USER_API_BASE_URL + userId + "/exercises")
}

export const updateUser = (user: IUser) => {
    return axios.put(USER_API_BASE_URL, user);
}

export const deleteUserById = (userId: string) => {
    return axios.delete(USER_API_BASE_URL + userId)
}




