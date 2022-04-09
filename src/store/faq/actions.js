import {
    ADDFAQ,
    GETALLFAQ,
    DELETEFAQ,
    UPDATEFAQ,
    FAQ__LOADING,
} from "./constants";
import { _fetchFaq, _createFaq } from "./services";

/* Login actions */
export function faqSetLoading(loading) {
    return {
        type: FAQ__LOADING,
        payload: loading,
    };
}

export function faqtData(res) {
    return {
        type: GETALLFAQ,
        payload: res,
    };
}
export function pushCreateAboutUs(res) {
    return {
        type: ADDFAQ,
        payload: res,
    };
}
export const fetchFaq = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(faqSetLoading(true));
        _fetchFaq().then(async (res) => {
            await dispatch(faqtData(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(faqSetLoading(false));
        })
    })
};

export const createFaq = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(faqSetLoading(true));
        _createFaq(formData).then(async (res) => {
            dispatch(pushCreateAboutUs(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(faqSetLoading(false));
        })
    })
};
