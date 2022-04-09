import {
    ADDABLOG,
    GETBLOGS,
    DELETEBLOG,
    UPDATEBLOG,
    BLOG_LOADING,
} from "./constants";

const initialState = {
    allBlogs: [],
    loading: false,
};
export function blogReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case BLOG_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADDABLOG:
            return {
                ...state,
                allBlogs: [...state.allBlogs, action.payload],
            };
        case GETBLOGS:
            return {
                ...state,
                allBlogs: action.payload,
            };
        default:
            return state;
    }
}
