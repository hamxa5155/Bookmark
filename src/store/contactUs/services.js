import axios from "axios";
import { API_URL_BACKEND2 } from "../../config";
export function _fetchContactUs(params) {
    return new Promise((resolve, reject) => {
        let url = `${API_URL_BACKEND2}/fetch-contactus`;
        axios
            .get(url, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("about us  get response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function _createContactUs(formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL_BACKEND2}/contactus-create`, formData, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("contact us add response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
