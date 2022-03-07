import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchCart(params) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL_BACKEND}cart-items`,{
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
export function _addItem(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND}add-cart`, formData,{
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
export function _removeItem(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND}remove-cart`, formData,{
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