import axios from "axios";

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

export const updateUser = (id: string, username: string, password: string, height: number, weight: number) => {
    return axios.put(USER_API_BASE_URL, { id: id, username: username, password: password, height: height, weight: weight });
}

export const deleteUserById = (userId: string) => {
    return axios.delete(USER_API_BASE_URL + userId)
}




