import axios from "axios";
import { API_URL_BACKEND2 } from "../../config";
export function _fetchFaq() {
    return new Promise((resolve, reject) => {
        let url = `${API_URL_BACKEND2}/fetch-faq`;
        axios
            .get(url, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("faq  get response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function _createFaq(formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL_BACKEND2}/faq-create`, formData, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("faq  add response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
