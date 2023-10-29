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

    verifyEmailWithLink(value) {
        try {
            const response = axios.post(
                API_BASE_URL + `/users/verify-email-with-link?userId=${value.userId}&token=${value.token}`
            );

            return response;

        } catch (error) {
            throw error;
        }
    }

}