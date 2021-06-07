import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8082/users/"


export const getUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId);
}

/***
 * @param userId
 * @returns {Receipe[]}
 */
export const getRecipeFromUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId + "/receipes")
}

/***
 * @param userId
 * @returns {Exercise[]}
 */
export const getExercicesFromUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId + "/exercises")
}

export const authenticate = async (userUsername, userPassword) => {
    let user = {};
    console.log(USER_API_BASE_URL + "login")
    await axios
        .post(USER_API_BASE_URL + "login", { username: userUsername, password: userPassword })
        .then(res => {
            console.log(res)
            user = res.data
        }).catch(err => {
            console.log(err)
        });
    return user
}

/***
 * @param username
 * @param password
 * @param height
 * @param weight
 * @returns {Promise<any>}
 */
export const register = (username, password, height, weight) => {
    return axios.post(USER_API_BASE_URL + "register", { username: username, password: password, height: height, weight: weight });
}

/***
 * @param id
 * @param username
 * @param password
 * @param height
 * @param weight
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateUser = (id, username, password, height, weight) => {
    return axios.put(USER_API_BASE_URL, { id: id, username: username, password: password, height: height, weight: weight });
}

/***
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteUserById = (userId) => {
    return axios.delete(USER_API_BASE_URL + userId)
}


export const getAllUsers = async () => {
    let user = []
    await axios
        .get(USER_API_BASE_URL)
        .then(res => {
            console.log(res)
            user = res.data
        }).catch(err => {
            console.log(err)
        });
    return user
}

