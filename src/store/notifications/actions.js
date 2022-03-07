import {
  NOTIFICATION_LOADING,
  NOTIFICATION_SET_DATA,
} from "./constants";
import {_fetchNotifications} from "./services";

/* Login actions */
export function notificationSetLoading(loading) {
  return {
    type: NOTIFICATION_LOADING,
    payload: loading,
  };
}
export function notificationSetData(params) {
  return {
    type: NOTIFICATION_SET_DATA,
    payload: params,
  };
}
export const fetchNotifications = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(notificationSetLoading(true));
		_fetchNotifications().then(async (res) => {
			await dispatch(notificationSetData(res));
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(notificationSetLoading(false));
		})
	})
};