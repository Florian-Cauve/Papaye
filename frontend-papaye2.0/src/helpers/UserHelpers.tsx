import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8082/users/"

export const getAllUsers = () => {
    return axios.get(USER_API_BASE_URL);
}

export const getUserById = (userId: number) => {
    return axios.get(USER_API_BASE_URL + userId);
}

export const getRecipeFromUserById = (userId: number) => {
    return axios.get(USER_API_BASE_URL + userId + "/receipes")
}

export const getExercicesFromUserById = (userId: number) => {
    return axios.get(USER_API_BASE_URL + userId + "/exercises")
}

export const authenticate =  (userUsername: string, userPassword: string) => {
    return axios.post(USER_API_BASE_URL + "login", { username: userUsername, password: userPassword });
}

export const register = (username: string, password: string, height: number, weight: number) => {
    return axios.post(USER_API_BASE_URL + "register", { username: username, password: password, height: height, weight: weight });
}

export const updateUser = (id: number, username: string, password: string, height: number, weight: number) => {
    return axios.put(USER_API_BASE_URL, { id: id, username: username, password: password, height: height, weight: weight });
}

export const deleteUserById = (userId: number) => {
    return axios.delete(USER_API_BASE_URL + userId)
}




