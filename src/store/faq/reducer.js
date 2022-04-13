import {
    ADDFAQ,
    GETALLFAQ,
    DELETEFAQ,
    UPDATEFAQ,
    FAQ__LOADING,
} from "./constants";

const initialState = {
    allfaq: [],
    loading: false,
};
export function faqReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case FAQ__LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADDFAQ:
            return {
                ...state,
                allfaq: [...state.allfaq, action.payload],
            };
        case GETALLFAQ:
            return {
                ...state,
                allfaq: action.payload,
            };
        default:
            return state;
    }
}
