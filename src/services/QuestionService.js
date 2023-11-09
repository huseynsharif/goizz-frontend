import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export class QuestionService{

    add(values){
        return axios.post(API_BASE_URL + "/questions/add", values)
    }

}