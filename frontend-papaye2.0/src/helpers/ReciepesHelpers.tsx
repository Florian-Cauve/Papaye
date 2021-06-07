import axios from "axios";

const RECEIPES_API_BASE_URL = "http://localhost:8082/receipes/"

export const getAllReceipes = () => {
    return axios.get(RECEIPES_API_BASE_URL);
}

export const getReceipesById = (receipeId: number) => {
    return axios.get(RECEIPES_API_BASE_URL + receipeId);
}

