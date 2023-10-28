import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export class UserService{

    signUp(user){
        try {
            
            return axios.post(
                API_BASE_URL + "/users/signup",
                user
            )

        } catch (error) {
            console.error(error);
        }
    }

    login(loginRequest) {
        try {
            const response = axios.post(
                API_BASE_URL + "/users/login",
                loginRequest
            );

            return response;

        } catch (error) {
            throw error;
        }
    }

    verifyAccountWithLink(value) {
        try {
            const response = axios.get(
                API_BASE_URL + `/users/verificate-user-with-link?userId=${value.userId}&token=${value.token}`
            );

            return response;

        } catch (error) {
            throw error;
        }
    }

}