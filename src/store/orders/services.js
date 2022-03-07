import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchOrders(params) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL_BACKEND}fetch-orders`,{
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
export function _placeOrder(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND}create-order`, formData,{
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