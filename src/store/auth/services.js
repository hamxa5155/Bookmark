import axios from "axios";
import { API_URL, API_URL_BACKEND2 } from "../../config";
export function loginWithPassword(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}auth/login`, formData)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function _forgotPassword(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND2}/forgot-password`, { email })
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function _resetPassword(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND2}/change-password`, data)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}