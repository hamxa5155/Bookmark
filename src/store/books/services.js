import axios from "axios";
import { API_URL_BACKEND } from "../../config";
export function _fetchBooks(params) {
  return new Promise((resolve, reject) => {
    let url = "";
    if(params.type === "own"){
      url = `${API_URL_BACKEND}fetch-own-listing`;
    }else{
      url = `${API_URL_BACKEND}fetch-marketplace`;
    }
    axios
      .get(url,{
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
export function _createBook(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL_BACKEND}book-create`, formData,{
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