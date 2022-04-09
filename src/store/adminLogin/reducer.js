import {
    ADMINLOGIN,
    ADMIN_LOADING
} from "./constants";

const initialState = {
    loading: false,
};
export function adminReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case ADMIN_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADMINLOGIN:
            return {
                ...state,
                allAboutUs: [...state.allAboutUs, action.payload],
            };
        default:
            return state;
    }
}
