import {
    ADDTEAM,
    GETALLTEAM,
    OUR_TEAM_LOADING,
} from "./constants";

const initialState = {
    allOurTeam: [],
    loading: false,
};
export function ourTeamReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case OUR_TEAM_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADDTEAM:
            return {
                ...state,
                allOurTeam: [...state.allOurTeam, action.payload],
            };
        case GETALLTEAM:
            return {
                ...state,
                allOurTeam: action.payload,
            };
        default:
            return state;
    }
}
