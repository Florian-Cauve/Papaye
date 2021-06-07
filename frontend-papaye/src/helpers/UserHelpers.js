import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8082/users/"

export default class UserHelpers{
    /***
     * @returns {User[]}
     */
    getAllUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    /***
     * @param userId
     * @returns {User}
     */
    getUserById(userId){
        return axios.get(USER_API_BASE_URL + userId);
    }

    /***
     * @param userId
     * @returns {Receipe[]}
     */
    getRecipeFromUserById(userId){
        return axios.get(USER_API_BASE_URL + userId + "/receipes")
    }

    /***
     * @param userId
     * @returns {Exercise[]}
     */
    getExercicesFromUserById(userId){
        return axios.get(USER_API_BASE_URL + userId + "/exercises")
    }

    /***
     * @param userUsername
     * @param userPassword
     * @returns {Promise<any>}
     */
    static authenticate(userUsername, userPassword){
        return axios.post(USER_API_BASE_URL + "login", {username:userUsername, password:userPassword});
    }

    /***
     * @param username
     * @param password
     * @param height
     * @param weight
     * @returns {Promise<any>}
     */
    register(username, password, height, weight){
        return axios.post(USER_API_BASE_URL + "register", {username: username, password: password, height: height, weight: weight});
    }

    /***
     * @param id
     * @param username
     * @param password
     * @param height
     * @param weight
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateUser(id, username, password, height, weight){
        return axios.put(USER_API_BASE_URL, {id: id, username: username, password: password, height: height, weight: weight});
    }

    /***
     * @param userId
     * @returns {Promise<AxiosResponse<any>>}
     */
    deleteUserById(userId){
        return axios.delete(USER_API_BASE_URL + userId)
    }
}
