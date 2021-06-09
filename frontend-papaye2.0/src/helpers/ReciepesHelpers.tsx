import axios from "axios";
import {CreateReceipe} from './interfaces/interfaces'

const RECEIPES_API_BASE_URL = "http://localhost:8082/receipes/"

export const getReceipesById = (receipeId: number) => {
    return axios.get(RECEIPES_API_BASE_URL + receipeId);
}

export const getReceipesFromUser = (userId: string) => {
    return axios.get("http://localhost:8082/users/" + userId + "/receipes/");
}

export const addReceipe = (createReceipe: CreateReceipe) => {
    console.log(createReceipe)
    return axios.post(RECEIPES_API_BASE_URL, createReceipe);
}
