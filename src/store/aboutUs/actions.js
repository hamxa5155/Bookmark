import {
    ADDABOUTUS,
    GETABOUTUS,
    ABOUT_US_LOADING
} from "./constants";
import { _fetchAboutUs, _createAboutUs } from "./services";

/* Login actions */
export function aboutUsSetLoading(loading) {
    return {
        type: ABOUT_US_LOADING,
        payload: loading,
    };
}

export function aboutUsSetData(res) {
    return {
        type: GETABOUTUS,
        payload: res,
    };
}
export function pushCreateAboutUs(res) {
    return {
        type: ADDABOUTUS,
        payload: res,
    };
}
export const fetchAboutUs = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(aboutUsSetLoading(true));
        _fetchAboutUs().then(async (res) => {
            await dispatch(aboutUsSetData(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(aboutUsSetLoading(false));
        })
    })
};

export const createAboutUs = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(aboutUsSetLoading(true));
        _createAboutUs(formData).then(async (res) => {
            dispatch(pushCreateAboutUs(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(aboutUsSetLoading(false));
        })
    })
};
