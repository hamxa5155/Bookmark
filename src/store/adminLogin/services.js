import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchAboutUs(params) {
    return new Promise((resolve, reject) => {
        let url = `${API_URL_BACKEND}/fetch-aboutus`;
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

export function _createAboutUs(formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL_BACKEND}/aboutus-create`, formData, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("about us  add response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
