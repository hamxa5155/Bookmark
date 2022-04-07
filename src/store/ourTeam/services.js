import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchOurTeam(params) {
    return new Promise((resolve, reject) => {
        let url = `${API_URL_BACKEND}/fetch-ourteam`;
        axios
            .get(url, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("our team  get response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function _createOurTeam(formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL_BACKEND}/ourteam-create`, formData, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("our team  add response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
