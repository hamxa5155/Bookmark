import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_REMOVE_TOKEN,
  RESETPASSWORD,
} from "./constants";
// import { loginWithPassword } from "./services";
import { _forgotPassword, _resetPassword } from "./services";
/* Login actions */
export function loginSetLoading(loading) {
  return {
    type: LOGIN_LOADING,
    payload: loading,
  };
}
export function loginSetUser(params, token) {
  console.log("params", params, token);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      params: params,
      token: token,
    },
  };
}
export function loginRemoveToken() {
  return {
    type: LOGIN_REMOVE_TOKEN,
  };
}
// export const checkLogin = (formData) => (dispatch) => {
// 	return new Promise((resolve, reject) => {
// 		dispatch(loginSetLoading(true));
// 		loginWithPassword(formData).then(async (res) => {
// 			await dispatch(loginSetToken(res));
// 			resolve(res)
// 		}).catch((err) => {
// 			reject(err)
// 		}).finally(() => {
// 			dispatch(loginSetLoading(false));
// 		})
// 	})
// };
export const forgotPassword = (email) => (dispatch) => {
  return new Promise((resolve, reject) => {
    _forgotPassword(email)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const resetPassword = (data) => (dispatch) => {
  console.log("data====", data);
  return new Promise((resolve, reject) => {
    _resetPassword(data)
      .then(async (res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
