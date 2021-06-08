import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8082/"

export const register = (username: string, password: string, height: number, weight: number) => {
    return axios.post(AUTH_API_BASE_URL + "register", { username: username, password: password, height: height, weight: weight });
}

export const authenticate =  (userUsername: string, userPassword: string) => {
    return axios.post(AUTH_API_BASE_URL + "login", { username: userUsername, password: userPassword });
}