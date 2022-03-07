import {
  NOTIFICATION_LOADING,
  NOTIFICATION_SET_DATA,
} from "./constants";
const initialState = {
  notifications: [],
  loading: false,
};
export function notificationReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case NOTIFICATION_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case NOTIFICATION_SET_DATA:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
}
