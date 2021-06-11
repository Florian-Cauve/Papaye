import axios from 'axios'
import { CreateExercise} from './interfaces/interfaces'

const EXERCISE_API_BASE_URL = "http://localhost:8082/exercises/"

export const addExercise = (exercise: CreateExercise) => {
    return axios.post(EXERCISE_API_BASE_URL, exercise);
}

export const deleteExercise = (id: string) => {
    return axios.delete(EXERCISE_API_BASE_URL + id)
}