import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchProfile(params) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL_BACKEND}user`,{
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
export function _editProfile(params) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND}edit-profile`,params,{
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
export function _changePassword(params) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND}change-password`,params,{
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