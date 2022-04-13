import {
    ADDTEAM,
    GETALLTEAM,
    OUR_TEAM_LOADING,
} from "./constants";

import { _fetchOurTeam, _createOurTeam } from "./services";

export function ourTeamSetLoading(loading) {
    return {
        type: OUR_TEAM_LOADING,
        payload: loading,
    };
}

export function ourTeamSetData(res) {
    console.log("vfvb", res)
    return {
        type: GETALLTEAM,
        payload: res,
    };
}
export function pushCreateOurTeam(res) {
    return {
        type: ADDTEAM,
        payload: res,
    };
}
export const fetchOurTeam = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(ourTeamSetLoading(true));
        _fetchOurTeam().then(async (res) => {
            await dispatch(ourTeamSetData(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(ourTeamSetLoading(false));
        })
    })
};

export const createOurTeam = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(ourTeamSetLoading(true));
        _createOurTeam(formData).then(async (res) => {
            dispatch(pushCreateOurTeam(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(ourTeamSetLoading(false));
        })
    })
};
