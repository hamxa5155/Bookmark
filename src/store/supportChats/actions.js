import { SUPPORT_CHATS_LOADING, SUPPORT_CHATS_ERROR, SUPPORT_CHATS_SET_USERS, SUPPORT_CHATS_SET_CHATS, SUPPORT_CHATS_PUSH_CHAT } from "./constants";
import { _fetchLiveUsers, _fetchChats, _sendMessage } from "./services";
/* customers actions */
export function supportChatsSetLoading(loading) {
	return {
		type: SUPPORT_CHATS_LOADING,
		payload: loading
	};
}
export function supportChatsSetError(error) {
	return {
		type: SUPPORT_CHATS_ERROR,
		payload: error.message
	};
}
export function supportChatsSetUsers(data, count) {
	return {
		type: SUPPORT_CHATS_SET_USERS,
		payload: {data, count}
	};
}
export function supportChatsSetChats(data) {
	return {
		type: SUPPORT_CHATS_SET_CHATS,
		payload: data
	};
}
export function supportPushChat(data) {
	return {
		type: SUPPORT_CHATS_PUSH_CHAT,
		payload: data
	};
}
export const fetchLiveUsers = (limit, offset) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(supportChatsSetLoading(true));
		_fetchLiveUsers(limit, offset).then(async (res) => {
			dispatch(supportChatsSetUsers(res.docs, res.count));
			resolve(res);
		}).catch((err) => {
			dispatch(supportChatsSetError(err));
			reject(err);
		}).finally(() => {
			dispatch(supportChatsSetLoading(false));
		})
	})
};
export const fetchChats = (id) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(supportChatsSetLoading(true));
		_fetchChats(id).then(async (res) => {
			dispatch(supportChatsSetChats(res));
			resolve(res);
		}).catch((err) => {
			dispatch(supportChatsSetError(err));
			reject(err);
		}).finally(() => {
			dispatch(supportChatsSetLoading(false));
		})
	})
};
export const sendMessage = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		_sendMessage(formData).then(async (res) => {
			dispatch(supportPushChat(res));
			resolve(res);
		}).catch((err) => {
			dispatch(supportChatsSetError(err));
			reject(err);
		})
	})
};