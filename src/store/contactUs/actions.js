import {
    ADDCONTACTUS,
    GETCONTACTUS,
    UPDATECONTACTUS,
    DELETECONTACTUS,
    CONTACT_US_LOADING
} from "./constants";
import { _fetchContactUs, _createContactUs } from "./services";

/* Login actions */
export function contactUsSetLoading(loading) {
    return {
        type: CONTACT_US_LOADING,
        payload: loading,
    };
}

export function contactUsSetData(res) {
    return {
        type: GETCONTACTUS,
        payload: res,
    };
}
export function pushCreateContactUs(res) {
    return {
        type: ADDCONTACTUS,
        payload: res,
    };
}
export const fetchContactUs = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(contactUsSetLoading(true));
        _fetchContactUs().then(async (res) => {
            await dispatch(contactUsSetData(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(contactUsSetLoading(false));
        })
    })
};

export const createContactUs = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(contactUsSetLoading(true));
        _createContactUs(formData).then(async (res) => {
            dispatch(pushCreateContactUs(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(contactUsSetLoading(false));
        })
    })
};
