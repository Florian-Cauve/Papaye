import axios from "axios";

const RECEIPES_API_BASE_URL = "http://localhost:8082/receipes/"

export default class ReceipesHelpers{
    /***
     * @returns {Receipe[]}
     */
    getAllReceipes(){
        return axios.get(RECEIPES_API_BASE_URL);
    }

    getReceipesById(receipeId){
        return axios.get(RECEIPES_API_BASE_URL + receipeId);
    }


}
