import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchNotifications(params) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL_BACKEND}fetch-notifications`,{
        withCredentials: true
    })
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}