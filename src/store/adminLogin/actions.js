import {
    ADMINLOGIN,
    ADMIN_LOADING
} from "./constants";
import { _adminLogin, } from "./services";

/* Login actions */
export function adminLoginSetLoading(loading) {
    return {
        type: ADMIN_LOADING,
        payload: loading,
    };
}

export const adminLogin = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(adminLoginSetLoading(true));
        _adminLogin(formData).then(async (res) => {
            localStorage.setItem("admintoken", res.token)
            // dispatch(pushCreateAboutUs(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(adminLoginSetLoading(false));
        })
    })
};
