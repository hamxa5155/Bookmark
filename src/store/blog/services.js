import axios from "axios";
import { API_URL_BACKEND2 } from "../../config";
export function _fetchBlogs() {
    return new Promise((resolve, reject) => {
        let url = `${API_URL_BACKEND2}/fetch-blog`;
        axios
            .get(url, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("blogget response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function _createBlog(formData) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL_BACKEND2}/blog-create`, formData, {
                withCredentials: true,
            })
            .then(async (response) => {
                console.log("blog  add response", response)
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
