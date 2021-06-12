import axios from "axios";
import {CreateSocialpost, ISocialpost} from './interfaces/interfaces'

const SOCIALPOST_API_BASE_URL = "http://localhost:8082/social/"

export const getPostById = (socialpostId: string) => {
    return axios.get(SOCIALPOST_API_BASE_URL + socialpostId);
}

export const getAllPost = () => {
    return axios.get(SOCIALPOST_API_BASE_URL);
}

export const getSocialpostsFromUser = (userId: string) => {
    return axios.get("http://localhost:8082/users/" + userId + "/socialposts/");
}

export const addPost = (createSocialpost: CreateSocialpost) => {
    return axios.post(SOCIALPOST_API_BASE_URL, createSocialpost);
}

export const updatePost = (socialpost: ISocialpost) => {
    return axios.put(SOCIALPOST_API_BASE_URL, socialpost);
}

export const deletePost = (socialpostId: string) => {
    return axios.delete(SOCIALPOST_API_BASE_URL + socialpostId);
}