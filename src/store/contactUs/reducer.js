import {
    ABOUT_US_LOADING,
    ADDABOUTUS,
    GETABOUTUS,
} from "./constants";

const initialState = {
    allAboutUs: [],
    loading: false,
};
export function aboutUsReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case ABOUT_US_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADDABOUTUS:
            return {
                ...state,
                allAboutUs: [...state.allAboutUs, action.payload],
            };
        case GETABOUTUS:
            return {
                ...state,
                allAboutUs: action.payload,
            };
        default:
            return state;
    }
}
