import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_REMOVE_TOKEN
} from "./constants";

const initialState = {
  token: null,
  user: {},
  role: "",
  loading: false,
  validating: false,
};
export function authReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        user: {},
        role: "",
      };
    default:
      return state;
  }
}
