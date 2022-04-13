import axios from "axios";
import { API_URL_BACKEND2 } from "../../config";

export function _adminLogin(formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL_BACKEND2}/admin-login`, formData, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("admin login response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
