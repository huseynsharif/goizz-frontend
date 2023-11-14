import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export class QuizService {

    getAllByUserId(userId) {
        return axios.get(API_BASE_URL + "/quizzes/getall-by-userId?userId=" + userId)
    }

    add(values) {
        return axios.post(API_BASE_URL + "/quizzes/add", values)
    }

    getById(quizId) {
        return axios.get(API_BASE_URL + "/quizzes/get-by-id?quizId=" + quizId)
    }
}