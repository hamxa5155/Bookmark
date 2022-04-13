import {
    ADDCONTACTUS,
    GETCONTACTUS,
    UPDATECONTACTUS,
    DELETECONTACTUS,
    CONTACT_US_LOADING
} from "./constants";

const initialState = {
    allContactUs: [],
    loading: false,
};
export function contactUsReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case CONTACT_US_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADDCONTACTUS:
            return {
                ...state,
                allContactUs: [...state.allContactUs, action.payload],
            };
        case GETCONTACTUS:
            return {
                ...state,
                allContactUs: action.payload,
            };
        default:
            return state;
    }
}
