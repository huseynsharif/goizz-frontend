import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export class QuizService{

    getAllByUserId(userId){
        return axios.get(API_BASE_URL + "/quizzes/getall-by-userId?userId=" + userId)
    }

}