import axios from "axios";
import {CreateReceipe, IReceipe} from './interfaces/interfaces'

const RECEIPES_API_BASE_URL = "http://localhost:8082/receipes/"

export const getReceipesById = (receipeId: string) => {
    return axios.get(RECEIPES_API_BASE_URL + receipeId);
}

export const getReceipesFromUser = (userId: string) => {
    return axios.get("http://localhost:8082/users/" + userId + "/receipes/");
}

export const addReceipe = (createReceipe: CreateReceipe) => {
    return axios.post(RECEIPES_API_BASE_URL, createReceipe);
}

export const updateReceipe = (receipe: IReceipe) => {
    return axios.put(RECEIPES_API_BASE_URL, receipe);
}

export const deleteReceipe = (receipeId: string) => {
    return axios.delete(RECEIPES_API_BASE_URL + receipeId);
}