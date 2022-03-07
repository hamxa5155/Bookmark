import axios from 'axios';
import { API_URL } from "../../config/index";
export function _fetchLiveUsers(limit, offset) {
	return new Promise((resolve, reject) => {
		axios.get(`${API_URL}chat/fetch-live-users?limit=${limit}&offset=${offset}`).then(async(response) => {
			resolve(response.data);
		}).catch(err => {
			reject(err)
		});
	});
}
export function _sendMessage(formData) {
	return new Promise((resolve, reject) => {
		axios.post(`${API_URL}chat/send-message`,formData).then(async(response) => {
			resolve(response.data);
		}).catch(err => {
			reject(err)
		});
	});
}
export function _fetchChats(id) {
	return new Promise((resolve, reject) => {
		axios.get(`${API_URL}chat/fetch-chats?user_id=${id}`)
		.then(async(response) => {
			resolve(response.data);
		}).catch(err => {
			reject(err)
		});
	});
}