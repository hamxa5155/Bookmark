import {
    ADDABLOG,
    GETBLOGS,
    DELETEBLOG,
    UPDATEBLOG,
    BLOG_LOADING,
} from "./constants";
import { _fetchBlogs, _createBlog } from "./services";

/* Login actions */
export function blogSetLoading(loading) {
    return {
        type: BLOG_LOADING,
        payload: loading,
    };
}

export function blogsSetData(res) {
    return {
        type: GETBLOGS,
        payload: res,
    };
}
export function pushCreateBlog(res) {
    return {
        type: ADDABLOG,
        payload: res,
    };
}
export const fetchBlog = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(blogSetLoading(true));
        _fetchBlogs().then(async (res) => {
            await dispatch(blogsSetData(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(blogSetLoading(false));
        })
    })
};

export const createBlog = (formData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(blogSetLoading(true));
        _createBlog(formData).then(async (res) => {
            dispatch(pushCreateBlog(res));
            resolve(res);
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            dispatch(blogSetLoading(false));
        })
    })
};
