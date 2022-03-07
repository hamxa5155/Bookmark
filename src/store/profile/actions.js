import {
  PROFILE_LOADING,
  PROFILE_SET_DATA,
} from "./constants";
import {_fetchProfile, _editProfile, _changePassword} from "./services";

/* Login actions */
export function profileSetLoading(loading) {
  return {
    type: PROFILE_LOADING,
    payload: loading,
  };
}
export function profileSetData(params) {
  return {
    type: PROFILE_SET_DATA,
    payload: params,
  };
}
export const fetchProfile = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(profileSetLoading(true));
		_fetchProfile().then(async (res) => {
			await dispatch(profileSetData(res));
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};
export const editProfile = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(profileSetLoading(true));
		_editProfile(formData).then(async (res) => {
			await dispatch(fetchProfile());
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};
export const changePassword = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(profileSetLoading(true));
		_changePassword(formData).then(async (res) => {
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};